<?php

require_once '../../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

$stevilka = $data['stevilka'] ?? '';
$kapaciteta = $data['kapaciteta'] ?? '';

if (empty($stevilka) || empty($kapaciteta)) {
    echo json_encode([
        'success' => false,
        'message' => 'Številka in kapaciteta sta obvezna'
    ]);
    exit();
}

try {
    $sql = "INSERT INTO tableentity (stevilka, kapaciteta) VALUES (:stevilka, :kapaciteta)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':stevilka', $stevilka, PDO::PARAM_INT);
    $stmt->bindParam(':kapaciteta', $kapaciteta, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Miza uspešno dodana',
        'table_id' => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri dodajanju mize',
        'error' => $e->getMessage()
    ]);
}
