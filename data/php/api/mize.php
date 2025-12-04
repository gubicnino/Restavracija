<?php

require_once '../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $sql = "
        SELECT * FROM TableEntity
            ";
    $stmt = $pdo->query($sql);
    $mize = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'count' => count($mize),
        'data' => $mize
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri pridobivanju miz',
        'error' => $e->getMessage()
    ]);
}