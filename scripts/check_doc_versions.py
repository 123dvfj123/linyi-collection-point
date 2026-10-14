#!/usr/bin/env python3
"""Check that a document's version header agrees with its own revision history.

Why this exists
---------------
Four times now a document in this repository has declared one version in its
header table and listed a newer one at the bottom of its revision history:

    glossary.md        header v1.0, history reached v1.1
    change-log.md      header v1.0, history reached v1.1
    risk-register.md   header v1.0, history reached v1.2
    change-log.md      header v1.1, history reached v1.2

It is the same root cause CR-012 records: one fact written in two places drifts.
The fix is not to remember harder, it is to check it.

What it looks for
-----------------
A versioned document carries two things:

    | Version | v1.2 |                     <- the header declaration

    ## Revision history
    | Version | Date | Change | Author |
    |---|---|---|---|
    | v1.0 | Week 1 | ... | R1 |         <- the revision history
    | v1.2 | Week 3 | ... | R1 |

If both exist, the header version must equal the last revision row, and no
revision label may appear twice. The check is deliberately scoped: it only
reports a problem when both parts are present, so a design document that carries
a `Status:` line instead of a numbered header is not flagged.

Usage
-----
    python3 scripts/check_doc_versions.py            # whole repository
    python3 scripts/check_doc_versions.py docs/      # one subtree

Exit code 0 when every versioned document agrees, 1 otherwise.
"""
import os
import re
import sys

HEADER = re.compile(r'^\|\s*Version\s*\|\s*(v[\d.]+)\s*\|', re.M)
REVISION_HEADING = re.compile(r'^#{1,4}\s*Revision history\s*$', re.M | re.I)
REVISION_ROW = re.compile(r'^\|\s*(v[\d.]+)\s*\|', re.M)

SKIP_DIRS = {'.git', 'node_modules', 'dist', 'build', 'target', '.github'}


def find_markdown(root):
    if os.path.isfile(root):
        yield root
        return
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in sorted(filenames):
            if name.endswith('.md'):
                yield os.path.join(dirpath, name)


def check(path):
    """Return (header, last, rows) or None when the file is not versioned."""
    with open(path, encoding='utf-8') as fh:
        text = fh.read()

    header = HEADER.search(text)
    if not header:
        return None

    heading = REVISION_HEADING.search(text)
    if not heading:
        # A header without a revision history is not this script's business.
        return None

    body = text[heading.end():]
    rows = [m.group(1) for m in REVISION_ROW.finditer(body)]
    if not rows:
        return None

    return header.group(1), rows[-1], rows


def main(argv):
    roots = argv[1:] or ['.']
    checked = 0
    problems = []

    for root in roots:
        if not os.path.exists(root):
            print('check_doc_versions: no such path: %s' % root)
            return 2
        for path in find_markdown(root):
            result = check(path)
            if result is None:
                continue
            checked += 1
            header, last, rows = result
            display = path.replace(os.sep, '/')

            if header != last:
                problems.append(
                    '%s\n    header says %s, the revision history reaches %s\n'
                    '    fix: set "| Version | %s |" in the header table'
                    % (display, header, last, last))

            duplicates = sorted({v for v in rows if rows.count(v) > 1})
            if duplicates:
                problems.append(
                    '%s\n    duplicated revision label(s): %s\n'
                    '    fix: give the later entry the next number'
                    % (display, ', '.join(duplicates)))

    if problems:
        print('check_doc_versions: %d versioned document(s) checked, %d problem(s)\n'
              % (checked, len(problems)))
        for p in problems:
            print('  ' + p)
            print()
        print('A document whose header disagrees with its own revision history is')
        print('the defect this check exists to catch. See change-log.md CR-012.')
        return 1

    print('check_doc_versions: %d versioned document(s) checked, all agree'
          % checked)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
