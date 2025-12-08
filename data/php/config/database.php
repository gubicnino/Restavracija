<?php
// Preberi environment spremenljivke ali uporabi hardcoded vrednosti
$host = getenv('DB_HOST') ?: 'restavracija.mysql.database.azure.com';
$port = getenv('DB_PORT') ?: '3306';
$db   = getenv('DB_NAME') ?: 'dsr_projekt';
$user = getenv('DB_USER') ?: 'student';
$pass = getenv('DB_PASSWORD');

// Debug - preveri ali je geslo nastavljeno
if (!$pass) {
    error_log("ERROR: DB_PASSWORD environment variable not set!");
    die("Database configuration error: Password not found. Check Docker environment variables.");
}

try {
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        \Pdo\Mysql::ATTR_SSL_CA => true,
        \Pdo\Mysql::ATTR_SSL_VERIFY_SERVER_CERT => false,
    ];
    
    $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, $options);
    
} catch (PDOException $e) {
    // Več informacij za debugging
    error_log("Database connection failed: " . $e->getMessage());
    error_log("DSN: mysql:host=$host;port=$port;dbname=$db");
    error_log("User: $user");
    die("Database connection failed: " . $e->getMessage());
}
?>