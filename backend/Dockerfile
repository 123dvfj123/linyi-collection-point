# 階段一：Build stage (使用 JDK 與 Maven wrapper 建置專案)
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app

# 複製 maven wrapper 相關檔案與 pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# 賦予 mvnw 執行權限並下載依賴套件 (利用快取機制)
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# 複製原始碼並打包 (略過測試以加速)
COPY src ./src
RUN ./mvnw clean package -DskipTests

# 階段二：Run stage (使用輕量級 JRE 運行專案)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# 從 builder 階段把打包好的 jar 檔複製過來
COPY --from=builder /app/target/*.jar app.jar

# 宣告對外暴露的 port (Spring Boot 預設為 8080)
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]