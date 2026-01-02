<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';


$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? '';

if (empty($id)) {
    echo json_encode([
        'success' => false,
        'message' => 'ID rezervacije je obvezen'
    ]);
    exit();
}

$sql = "UPDATE reservation SET status = 'denied' WHERE reservation_id = :id";
try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Rezervacija je bila zavrnjena'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri zavrnitvi rezervacije',
        'error' => $e->getMessage()
    ]);
}