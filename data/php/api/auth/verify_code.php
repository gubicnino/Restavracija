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

require_once '../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

$code = $data['code'] ?? '';
$user_id = $data['user_id'] ?? '';

if (empty($code) || empty($user_id)) {
    echo json_encode([
        'success' => false,
        'message' => 'Koda in ID uporabnika sta obvezna'
    ]);
    exit();
}

try {
    $stmt = $pdo->prepare("
        SELECT * FROM verification_codes 
        WHERE user_id = ? AND code = ? AND used = 0 AND expires_at > NOW()
    ");
    $stmt->execute([$user_id, $code]);
    $code = $stmt->fetch(PDO::FETCH_ASSOC);

    if ( $code ) {
        $stmt = $pdo->prepare("UPDATE verification_codes SET used = 1 WHERE id = ?");
        $stmt->execute([$code['id']]);
        // Prijava uporabnika
        try {
            $stmt = $pdo->prepare("SELECT * FROM user WHERE user_id = ?");
            $stmt->execute([$user_id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['ime'] = $user['ime'];
                $_SESSION['priimek'] = $user['priimek'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['logged_in'] = true;
                $_SESSION['vloga'] = $user['vloga'];

                echo json_encode([
                    'success' => true,
                    'message' => 'Uspešna prijava',
                    'user' => [
                        'id' => $user['user_id'],
                        'ime' => $user['ime'],
                        'priimek' => $user['priimek'],
                        'email' => $user['email'],
                        'vloga' => $user['vloga']
                    ]
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Uporabnik ni najden'
                ]);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Napaka pri prijavi uporabnika'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Neveljavna ali potekla koda'
        ]);
    };
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri prijavi'
    ]);
}


?>
