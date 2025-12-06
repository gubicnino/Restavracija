<?php
session_start();
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

require_once '../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$geslo = $data['geslo'] ?? '';

if (empty($email) || empty($geslo)) {
    echo json_encode([
        'success' => false,
        'message' => 'Email in geslo sta obvezna'
    ]);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM user WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($geslo, $user['geslo'])) {
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['ime'] = $user['ime'];
        $_SESSION['priimek'] = $user['priimek'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['logged_in'] = true;

        echo json_encode([
            'success' => true,
            'message' => 'Prijava uspešna',
            'user' => [
                'id' => $user['user_id'],
                'ime' => $user['ime'],
                'email' => $user['email']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Napačno uporabniško ime ali geslo'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri prijavi'
    ]);
}
?>
