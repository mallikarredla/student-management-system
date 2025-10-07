
# Run the application
# Use Eclipse Temurin JDK 17
FROM eclipse-temurin:17-jdk

# Author info (optional)
LABEL authors="malli"

# Set working directory inside the container
WORKDIR /app

# Copy the Spring Boot jar
COPY target/student-app.jar app.jar

# Expose port
EXPOSE 9091

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

