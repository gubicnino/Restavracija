<?php
require_once '../../config/database.php';
require '../../vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;


$allowed_origins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
ini_set('display_errors', 0);
error_reporting(0);
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$year = isset($_GET['year']) ? intval($_GET['year']) : date('Y');

$sql = "
    SELECT 
        r.*,
        GROUP_CONCAT(t.stevilka ORDER BY t.stevilka SEPARATOR ', ') as stevilke_miz,
        r.created_at,
        YEAR(r.datum) as leto,
        MONTH(r.datum) as mesec,
        DAYOFWEEK(r.datum) as dan_v_tednu
    FROM reservation AS r 
    LEFT JOIN reservation_table AS rt USING (reservation_id)
    LEFT JOIN tableentity AS t USING (table_id)
    WHERE YEAR(r.datum) = :year
    GROUP BY r.reservation_id
    ORDER BY r.datum DESC, r.cas_zacetek DESC
";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':year', $year, PDO::PARAM_INT);
    $stmt->execute();
    $rezervacije = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stats = [
        'total_rezervacij' => count($rezervacije),
        'total_gostov' => array_sum(array_column($rezervacije, 'stevilo_oseb')),
        'po_statusu' => [
            'confirmed' => 0,
            'pending' => 0,
            'cancelled' => 0
        ],
        'po_mesecih' => array_fill(1, 12, 0),
        'po_dnevih' => array_fill(1, 7, 0), // 1=Sunday, 7=Saturday
        'najpogostejsi_cas' => [],
        'povprecno_oseb' => 0
    ];

    foreach ($rezervacije as $rez) {
        // Status
        $stats['po_statusu'][$rez['status']]++;
        
        // Po mesecih
        $stats['po_mesecih'][$rez['mesec']]++;
        
        // Po dnevih (1=Ned, 2=Pon, 3=Tor, ...)
        $stats['po_dnevih'][$rez['dan_v_tednu']]++;
        
        // Po času (ura)
        $hour = date('H:00', strtotime($rez['cas_zacetek']));
        if (!isset($stats['najpogostejsi_cas'][$hour])) {
            $stats['najpogostejsi_cas'][$hour] = 0;
        }
        $stats['najpogostejsi_cas'][$hour]++;
    }

    if ($stats['total_rezervacij'] > 0) {
        $stats['povprecno_oseb'] = round($stats['total_gostov'] / $stats['total_rezervacij'], 1);
    }
    $spreadsheet = new Spreadsheet();

    $sheet = $spreadsheet -> getActiveSheet();

    $sheet->setCellValue('A1', 'Skupaj Rezervacij:');
    $sheet->setCellValue('B1', $stats['total_rezervacij']);

    $sheet->setCellValue('A2', 'Skupaj Gostov:');
    $sheet->setCellValue('B2', $stats['total_gostov']);

    $sheet->setCellValue('A3', 'Povprečno oseb:');
    $sheet->setCellValue('B3', $stats['povprecno_oseb']);

    // Status tabela
    $row = 5;
    $sheet->setCellValue('A' . $row, 'STATUS');
    $sheet->setCellValue('B' . $row, 'Število');
    $row++;
    foreach ($stats['po_statusu'] as $status => $stevilo) {
        $sheet->setCellValue('A' . $row, $status);
        $sheet->setCellValue('B' . $row, $stevilo);
        $row++;
    }
    $row++;
    $sheet->setCellValue('A' . $row, 'MESEC');
    $sheet->setCellValue('B' . $row, 'Rezervacij');
    $row++;

    $meseci = ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 
            'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'];

    for ($i = 1; $i <= 12; $i++) {
        $sheet->setCellValue('A' . $row, $meseci[$i-1]);
        $sheet->setCellValue('B' . $row, $stats['po_mesecih'][$i]);
        $row++;
    }
    $row++;
    $sheet->setCellValue('A' . $row, 'VSE REZERVACIJE');
    $row++;
    $sheet->setCellValue('A' . $row, 'ID');
    $sheet->setCellValue('B' . $row, 'Polno Ime');
    $sheet->setCellValue('C' . $row, 'Email');  
    $sheet->setCellValue('D' . $row, 'Telefon');
    $sheet->setCellValue('E' . $row, 'Datum');
    $sheet->setCellValue('F' . $row, 'Čas Začetek');
    $sheet->setCellValue('G' . $row, 'Čas Konec');
    $sheet->setCellValue('H' . $row, 'Število Oseb');
    $sheet->setCellValue('I' . $row, 'Status');
    $sheet->setCellValue('J' . $row, 'Številke Miz');
    $sheet->setCellValue('K' . $row, 'Posebna Priloznost');
    $sheet->setCellValue('L' . $row, 'Posebne Želje');
    $sheet->setCellValue('M' . $row, 'Ustvarjeno At');
    $row++;
    foreach ($rezervacije as $rez) {
        $sheet->setCellValue('A' . $row, $rez['reservation_id']);
        $sheet->setCellValue('B' . $row, $rez['polno_ime']);
        $sheet->setCellValue('C' . $row, $rez['email']);
        $sheet->setCellValue('D' . $row, $rez['telefon']);
        $sheet->setCellValue('E' . $row, date('d.m.Y', strtotime($rez['datum'])));
        $sheet->setCellValue('F' . $row, date('H:i', strtotime($rez['cas_zacetek'])));
        $sheet->setCellValue('G' . $row, date('H:i', strtotime($rez['cas_konec'])));
        $sheet->setCellValue('H' . $row, $rez['stevilo_oseb']);
        $sheet->setCellValue('I' . $row, $rez['status']);
        $sheet->setCellValue('J' . $row, $rez['stevilke_miz']);
        $sheet->setCellValue('K' . $row, $rez['posebna_priloznost'] ?? '-');
        $sheet->setCellValue('L' . $row, $rez['posebne_zelje'] ?? '-');
        $sheet->setCellValue('M' . $row, date('d.m.Y H:i', strtotime($rez['created_at'])));
        $row++;
    }

    foreach(range('A','M') as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }

    $filename = 'rezervacije_' . date('Y-m-d_His') . '.xlsx';

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="' . $filename . '"');
    header('Cache-Control: max-age=0');

    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
    exit();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    exit();
}