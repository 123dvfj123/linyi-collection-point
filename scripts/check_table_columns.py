#!/usr/bin/env python3
r"""Check that every markdown table row has as many cells as its header.

Why this exists
---------------
A change record in `change-log.md` was written with ten cells where the table has
eleven. One separator was missing, so every column from `Reason` onward shifted
one place left and `Status` fell off the end of the row. Nothing caught it: the
document version check looks at version headers, and no tool counted cells.

It is the same root cause CR-012 records, one fact written in two places drifting
apart, in its smallest form: a table's shape is declared once in the header and
then restated by every row.

What it looks for
-----------------
A markdown pipe table: a row whose next line is the delimiter row (`|---|---|`),
followed by rows that start with `|`. Each of those rows must split into the same
number of cells as the header. A pipe inside a code span or escaped as `\|` does
not split a cell, so a cell may contain either.

Usage
-----
    python3 scripts/check_table_columns.py            # whole repository
    python3 scripts/check_table_columns.py docs/      # one subtree

Exit code 0 when every table agrees, 1 otherwise.
"""
import os
import re
import sys

SKIP_DIRS = {'.git', 'node_modules', 'dist', 'build', 'target', '.github', '.vscode'}
DELIMITER = re.compile(r'^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$')


def split_cells(line):
    """Split a table row on the pipes that really separate cells."""
    text = line.strip()
    if text.startswith('|'):
        text = text[1:]
    if text.endswith('|') and not text.endswith('\\|'):
        text = text[:-1]

    cells, buf, in_code, i = [], '', False, 0
    while i < len(text):
        ch = text[i]
        if ch == '\\' and i + 1 < len(text) and text[i + 1] == '|':
            buf += '|'
            i += 2
            continue
        if ch == '`':
            in_code = not in_code
        elif ch == '|' and not in_code:
            cells.append(buf)
            buf = ''
            i += 1
            continue
        buf += ch
        i += 1
    cells.append(buf)
    return cells


def markdown_files(root):
    if os.path.isfile(root):
        yield root
        return
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in sorted(filenames):
            if name.endswith('.md'):
                yield os.path.join(dirpath, name)


def check(path, root):
    try:
        lines = open(path, encoding='utf-8').read().split('\n')
    except OSError:
        return []
    rel = os.path.relpath(path, root).replace('\\', '/')
    problems = []
    i = 0
    while i < len(lines):
        starts_row = lines[i].lstrip().startswith('|')
        has_delimiter = i + 1 < len(lines) and bool(DELIMITER.match(lines[i + 1]))
        if not (starts_row and has_delimiter):
            i += 1
            continue
        width = len(split_cells(lines[i]))
        j = i + 2
        while j < len(lines) and lines[j].lstrip().startswith('|'):
            cells = len(split_cells(lines[j]))
            if cells != width:
                problems.append((rel, j + 1, width, cells))
            j += 1
        i = j
    return problems


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else '.'
    found, rows = [], 0
    for path in markdown_files(root):
        problems = check(path, root)
        rows += 0
        for rel, line, width, cells in problems:
            found.append((rel, line, width, cells))
    if not found:
        print('check_table_columns: every table row matches its header')
        return 0
    for rel, line, width, cells in found:
        print('{0}:{1}: the header has {2} cells and this row has {3}'.format(rel, line, width, cells))
    print('check_table_columns: {0} row(s) do not match their header'.format(len(found)))
    return 1


if __name__ == '__main__':
    sys.exit(main())