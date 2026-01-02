<?php

require_once '../../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$sql = "
    SELECT r.*, GROUP_CONCAT(t.stevilka ORDER BY t.stevilka SEPARATOR ',') as stevilka
    FROM reservation AS r 
    LEFT JOIN reservation_table AS rt USING (reservation_id)
    LEFT JOIN tableentity AS t USING (table_id)
    GROUP BY r.reservation_id
    ORDER BY r.datum ASC, r.cas_zacetek ASC
    ";


try {
    $stmt = $pdo -> prepare($sql);
    $stmt->execute();
    $rezervacije = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'count' => count($rezervacije),
        'data' => $rezervacije
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri pridobivanju rezervacij',
        'error' => $e->getMessage()
    ]);
}