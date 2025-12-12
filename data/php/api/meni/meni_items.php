<?php

require_once '../../config/database.php';

header('Content-Type: application/json');
$allowed_origins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
};
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$sql = "
    SELECT 
        mi.item_id,
        mi.ime,
        mi.opis,
        mi.cena,
        mi.slika,
        mi.oznaka,
        mi.category_id,
        mi.lokacija,
        mc.ime as category_name
    FROM menu_item mi
    LEFT JOIN menu_category mc ON mi.category_id = mc.category_id
    WHERE mi.aktiven = TRUE
    ORDER BY mc.vrstni_red, mi.vrstni_red
";
try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $menu_items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $menu_items
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri pridobivanju meni itemov',
        'error' => $e->getMessage()
    ]);
}
