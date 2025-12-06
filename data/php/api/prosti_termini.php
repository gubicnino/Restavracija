<?php
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

require_once '../config/database.php';

$datum = $_GET['datum'];
$stevilo_oseb = $_GET['stevilo_oseb'];

if (empty($datum) || $stevilo_oseb < 1) {
    echo json_encode([
        'success' => false,
        'message' => 'Datum in število oseb sta obvezna'
    ]);
    exit();
}

$sql2 = '
    SELECT 
        t.table_id,
        t.stevilka,
        t.kapaciteta,
        r.reservation_id,
        TIME_FORMAT(r.cas_zacetek, "%H:%i") AS cas_zacetek,
        TIME_FORMAT(r.cas_konec, "%H:%i") AS cas_konec,
        r.status
    FROM TableEntity t
    LEFT JOIN Reservation_Table rt ON t.table_id = rt.table_id
    LEFT JOIN Reservation r ON rt.reservation_id = r.reservation_id 
        AND r.datum = :datum 
        AND r.status IN ("pending", "confirmed")
    WHERE t.kapaciteta >= :stevilo_oseb
    ORDER BY t.table_id
';
try {
    $stmt = $pdo->prepare($sql2);
    $stmt->bindParam(':stevilo_oseb', $stevilo_oseb, PDO::PARAM_INT);
    $stmt->bindParam(':datum', $datum, PDO::PARAM_STR);
    $stmt->execute();
    $rezervacije = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri pridobivanju rezervacij za mizo',
        'error' => $e->getMessage()
    ]);
    exit();
};

$mize_z_rezervacijami = [];

foreach($rezervacije as $rezervacija) {
    $table_id = $rezervacija['table_id'];
    
    // Če miza še ne obstaja, ustvari entry
    if (!isset($mize_z_rezervacijami[$table_id])) {
        $mize_z_rezervacijami[$table_id] = [
            'table_id' => $table_id,
            'rezervacije' => []
        ];
    };
    
    // Dodaj rezervacijo (če obstaja)
    if ($rezervacija['reservation_id'] !== null) {
        $mize_z_rezervacijami[$table_id]['rezervacije'][] = [
            'reservation_id' => $rezervacija['reservation_id'],
            'cas_zacetek' => $rezervacija['cas_zacetek'],
            'cas_konec' => $rezervacija['cas_konec'],
            'status' => $rezervacija['status']
        ];
    };
};
function sePrekriva($nov_zacetek, $nov_konec, $obstojen_zacetek, $obstojen_konec) {
    $nz = strtotime($nov_zacetek);
    $nk = strtotime($nov_konec);
    $oz = strtotime($obstojen_zacetek);
    $ok = strtotime($obstojen_konec);

    return ($nz < $ok && $nk > $oz);
}

$mozni_termini = [
    "12:00", "12:30",
    "13:00", "13:30",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
    "21:00", "21:30",
    "22:00", "22:30",
    "23:00", "23:30"
];

$prosti_termini = [];

foreach($mozni_termini as $termin){
    $cas_konec = date('H:i', strtotime($termin . ' + 2 hours'));


    $je_prost = false;

    foreach($mize_z_rezervacijami as $rezervacije_miza){
        if (count($rezervacije_miza['rezervacije']) === 0) {
            $je_prost = true;
            break;
        };
        $je_miza_prosta = true;

        foreach($rezervacije_miza['rezervacije'] as $rez ){
            if (sePrekriva($termin, $cas_konec, $rez['cas_zacetek'], $rez['cas_konec'])){
                $je_miza_prosta = false;
                break;
            };
        };
        if ($je_miza_prosta){
            $je_prost = true;
            break;
        };
    };
    if ($je_prost){
        $prosti_termini[] = $termin;
    };
};

echo json_encode ([
    'success' => true,
    'prosti_termini' => $prosti_termini,
    'datum' => $datum,
    'stevilo_oseb' => $stevilo_oseb
]);
