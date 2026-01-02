<?php

require_once '../../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$sql = "
    SELECT * FROM user
    ";


try {
    $stmt = $pdo -> prepare($sql);
    $stmt->execute();
    $rezervacije = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'count' => count($rezervacije),
        'data' => $rezervacije
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri pridobivanju rezervacij',
        'error' => $e->getMessage()
    ]);
}