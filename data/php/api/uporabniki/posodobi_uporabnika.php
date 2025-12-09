<?php
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

require_once '../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? '';
$ime = $data['ime'] ?? '';
$priimek = $data['priimek'] ?? '';
$email = $data['email'] ?? '';
$vloga = $data['vloga'] ?? '';


if (empty($id)) {
    echo json_encode([
        'success' => false,
        'message' => 'ID uporabnika je obvezen'
    ]);
    exit();
}

$sql = "
    UPDATE user
    SET ime = :ime, priimek = :priimek, email = :email, vloga = :vloga WHERE user_id = :id";
try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':ime', $ime, PDO::PARAM_STR);
    $stmt->bindParam(':priimek', $priimek, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':vloga', $vloga, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();


    echo json_encode([
        'success' => true,
        'message' => 'Uporabnik je bil posodobljen'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri posodabljanju uporabnika',
        'error' => $e->getMessage()
    ]);
}