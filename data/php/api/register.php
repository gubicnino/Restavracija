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

$ime = $data['ime'] ?? '';
$priimek = $data['priimek'] ?? '';
$email = $data['email'] ?? '';
$geslo = $data['geslo'] ?? '';

if (empty($ime) || empty($priimek) || empty($email) || empty($geslo)) {
    echo json_encode([
        'success' => false,
        'message' => 'Vsa polja so obvezna'
    ]);
    exit();
}

try {
    // Preveri ali email že obstaja
    $stmt = $pdo->prepare("SELECT user_id FROM user WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        echo json_encode([
            'success' => false,
            'message' => 'Email že obstaja'
        ]);
        exit();
    }

    // Ustvari novega uporabnika
    $hashedPassword = password_hash($geslo, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO user (ime, priimek, email, geslo) VALUES (?, ?, ?, ?)");
    $stmt->execute([$ime, $priimek, $email, $hashedPassword]);

    $userId = $pdo->lastInsertId();

    // Avtomatska prijava po registraciji
    $_SESSION['user_id'] = $userId;
    $_SESSION['ime'] = $ime;
    $_SESSION['priimek'] = $priimek;
    $_SESSION['email'] = $email;
    $_SESSION['logged_in'] = true;

    echo json_encode([
        'success' => true,
        'message' => 'Registracija uspešna',
        'user' => [
            'id' => $userId,
            'ime' => $ime,
            'priimek' => $priimek,
            'email' => $email
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri registraciji'
    ]);
}
?>
