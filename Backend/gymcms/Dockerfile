FROM maven:latest AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN ["mvn", "-f", "/home/app/pom.xml", "clean"]
RUN ["mvn", "-f", "/home/app/pom.xml", "package", "-Dmaven.test.skip=true"]

FROM eclipse-temurin:17-jre-alpine
COPY --from=build /home/app/target/gymCms-0.0.1-SNAPSHOT.jar ./gymcms.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "gymcms.jar"]