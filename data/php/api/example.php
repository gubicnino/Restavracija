<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');

require_once '../config/database.php';

try {
    $stmt = $pdo->query("SELECT * FROM user");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'count' => count($users),
        'users' => $users
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri branju uporabnikov',
        'error' => $e->getMessage()
    ]);
}
?>