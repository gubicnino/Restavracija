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

$id = $data['id'] ?? '';
$stevilka = $data['stevilka'] ?? '';
$kapaciteta = $data['kapaciteta'] ?? '';

if (empty($id) || empty($stevilka) || empty($kapaciteta)) {
    echo json_encode([
        'success' => false,
        'message' => 'ID, številka in kapaciteta so obvezni'
    ]);
    exit();
}

try {
    $sql = "UPDATE tableentity SET stevilka = :stevilka, kapaciteta = :kapaciteta WHERE table_id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':stevilka', $stevilka, PDO::PARAM_INT);
    $stmt->bindParam(':kapaciteta', $kapaciteta, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Miza uspešno posodobljena'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri posodabljanju mize',
        'error' => $e->getMessage()
    ]);
}
