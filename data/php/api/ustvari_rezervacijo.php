<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

// Validiraj podatke
$polno_ime = $data['polno_ime'] ?? '';
$email = $data['email'] ?? '';
$telefon = $data['telefon'] ?? '';
$datum = $data['datum'] ?? '';
$cas_zacetek = $data['cas_zacetek'] ?? '';
$stevilo_oseb = $data['stevilo_oseb'] ?? 0;
$posebna_priloznost = $data['posebna_priloznost'] ?? null;
$posebne_zelje = $data['posebne_zelje'] ?? null;

if (empty($polno_ime) || empty($email) || empty($telefon) || empty($datum) || empty($cas_zacetek) || $stevilo_oseb < 1) {
    echo json_encode([
        'success' => false,
        'message' => 'Vsa obvezna polja morajo biti izpolnjena'
    ]);
    exit();
}
$cas_konec = date('H:i:s', strtotime($cas_zacetek . ' + 2 hours'));


$sql = '
    INSERT INTO Reservation (polno_ime, email, telefon, datum, cas_zacetek, cas_konec, stevilo_oseb, posebna_priloznost, posebne_zelje)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
';


try {
    $pdo -> beginTransaction();

    $sql_table = '
        SELECT table_id, kapaciteta 
        FROM TableEntity 
        WHERE kapaciteta >= ?
        ORDER BY kapaciteta ASC
    ';
    $stmt_table = $pdo -> prepare($sql_table);
    $stmt_table -> execute([$stevilo_oseb]);
    $table = $stmt_table->fetch(PDO::FETCH_ASSOC);
    
    if (!$table) {
        $pdo->rollBack();
        echo json_encode([
            'success' => false,
            'message' => 'Ni prostih miz'
        ]);
        exit();
    }

    $table_id = $table['table_id'];


    $stmt = $pdo -> prepare($sql);

    $stmt -> execute([
        $polno_ime,
        $email,
        $telefon,
        $datum,
        $cas_zacetek,
        $cas_konec,
        $stevilo_oseb,
        $posebna_priloznost,
        $posebne_zelje
    ]);


    $reservation_id = $pdo -> lastInsertId();
    $sql_reservation_table = '
        INSERT INTO Reservation_Table (reservation_id, table_id)
        VALUES (?, ?)
    ';
    $stmt_reservation_table = $pdo -> prepare($sql_reservation_table);
    $stmt_reservation_table -> execute([$reservation_id, $table_id]);

    $pdo -> commit();

    echo json_encode([
        'success' => true,
        'message' => 'Rezervacija uspešno ustvarjena',
        'reservation_id' => $reservation_id,
        'table_id' => $table_id
    ]);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri ustvarjanju rezervacije',
        'error' => $e->getMessage()
    ]);
}