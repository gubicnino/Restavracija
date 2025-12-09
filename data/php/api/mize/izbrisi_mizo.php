<?php

require_once '../../config/database.php';

header('Content-Type: application/json');
$allowed_origins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
};
header('Access-Control-Allow-Credentials: true');
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

if (empty($id)) {
    echo json_encode([
        'success' => false,
        'message' => 'ID je obvezen'
    ]);
    exit();
}

try {
    // Check if table has any reservations
    $checkSql = "SELECT COUNT(*) as count FROM reservation_table WHERE table_id = :id";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkStmt->execute();
    $result = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($result['count'] > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Mize ni mogoče izbrisati, ker ima rezervacije'
        ]);
        exit();
    }

    $sql = "DELETE FROM tableentity WHERE table_id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Miza uspešno izbrisana'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri brisanju mize',
        'error' => $e->getMessage()
    ]);
}
