<?php

require_once '../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$table_id = $_GET['table_id'] ?? null;

if (!$table_id) {
    echo json_encode([
        'success' => false,
        'message' => 'Table ID je obvezen'
    ]);
    exit;
}

$sql = "
    SELECT * 
    FROM reservation_table
    LEFT JOIN reservation ON reservation_table.reservation_id = reservation.reservation_id
    WHERE reservation_table.table_id = :table_id
";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':table_id', $table_id, PDO::PARAM_INT);
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
        'message' => 'Napaka pri pridobivanju rezervacij za mizo',
        'error' => $e->getMessage()
    ]);
}
?>
