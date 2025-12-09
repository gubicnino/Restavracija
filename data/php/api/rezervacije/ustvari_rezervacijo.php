<?php
ob_start();
header('Content-Type: application/json');
$allowed_origins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dompdf\Dompdf;
use Dompdf\Options;

require '../../vendor/autoload.php';

// Load .env file
function loadEnv($path) {
    if (!file_exists($path)) {
        throw new Exception('.env file not found');
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

// Load environment variables
loadEnv(__DIR__ . '/../../.env');

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
    $pdo->beginTransaction();

    // Find available table
    $sql_table = '
        SELECT table_id, kapaciteta 
        FROM TableEntity 
        WHERE kapaciteta >= ?
        ORDER BY kapaciteta ASC
    ';
    $stmt_table = $pdo->prepare($sql_table);
    $stmt_table->execute([$stevilo_oseb]);
    $table = $stmt_table->fetch(PDO::FETCH_ASSOC);
    
    if (!$table) {
        $pdo->rollBack();
        echo json_encode([
            'success' => false,
            'message' => 'Ni prostih miz za izbrano število oseb'
        ]);
        exit();
    }

    $table_id = $table['table_id'];

    // Insert reservation
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
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

    $reservation_id = $pdo->lastInsertId();

    // Link reservation to table
    $sql_reservation_table = '
        INSERT INTO Reservation_Table (reservation_id, table_id)
        VALUES (?, ?)
    ';
    $stmt_reservation_table = $pdo->prepare($sql_reservation_table);
    $stmt_reservation_table->execute([$reservation_id, $table_id]);

    // Create HTML content for both email and PDF
    $htmlContent = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { 
                    font-family: 'DejaVu Sans', Arial, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    margin: 0;
                    padding: 20px;
                }
                .container { 
                    max-width: 600px; 
                    margin: 0 auto; 
                    border: 2px solid #d4af37;
                }
                .header { 
                    background: #1a1a1a; 
                    color: #d4af37; 
                    padding: 30px; 
                    text-align: center; 
                }
                .header h1 { 
                    margin: 0; 
                    font-size: 32px; 
                    font-weight: bold;
                }
                .header p { 
                    margin: 10px 0 0 0; 
                    font-size: 12px; 
                    letter-spacing: 3px;
                    font-weight: normal;
                }
                .content { 
                    background: #ffffff; 
                    padding: 30px; 
                }
                .confirmation-title {
                    color: #d4af37;
                    font-size: 24px;
                    margin: 0 0 20px 0;
                    border-bottom: 2px solid #d4af37;
                    padding-bottom: 10px;
                }
                .details { 
                    background: #f9f9f9; 
                    padding: 20px; 
                    margin: 20px 0; 
                    border-left: 4px solid #d4af37; 
                }
                .details h3 {
                    margin-top: 0;
                    color: #333;
                    font-size: 18px;
                }
                .detail-row { 
                    margin: 12px 0;
                    display: table;
                    width: 100%;
                }
                .label { 
                    font-weight: bold; 
                    color: #666; 
                    display: table-cell;
                    width: 180px;
                    padding-right: 10px;
                }
                .value { 
                    color: #333;
                    display: table-cell;
                }
                .important-box {
                    background: #fff9e6;
                    border: 1px solid #d4af37;
                    padding: 15px;
                    margin: 20px 0;
                }
                .important-box h4 {
                    margin: 0 0 10px 0;
                    color: #d4af37;
                }
                .important-box ul {
                    margin: 0;
                    padding-left: 20px;
                    color: #666;
                }
                .important-box li {
                    margin: 5px 0;
                }
                .footer { 
                    background: #f5f5f5;
                    text-align: center; 
                    padding: 20px; 
                    color: #666; 
                    font-size: 11px;
                    border-top: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>JACK & JOE</h1>
                    <p>STEAK & BURGER CLUB</p>
                </div>
                <div class='content'>
                    <h2 class='confirmation-title'>POTRDITEV REZERVACIJE</h2>
                    <p>Spoštovani/a <strong>{$polno_ime}</strong>,</p>
                    <p>Vaša rezervacija je bila uspešno potrjena! Veselimo se vašega obiska.</p>
                    
                    <div class='details'>
                        <h3>Podrobnosti rezervacije:</h3>
                        <div class='detail-row'>
                            <span class='label'>Rezervacijska številka:</span>
                            <span class='value'>#{$reservation_id}</span>
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Datum:</span>
                            <span class='value'>" . date('d.m.Y', strtotime($datum)) . "</span>
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Čas prihoda:</span>
                            <span class='value'>" . date('H:i', strtotime($cas_zacetek)) . "</span>
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Število oseb:</span>
                            <span class='value'>{$stevilo_oseb}</span>
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Miza številka:</span>
                            <span class='value'>{$table_id}</span>
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Kontakt telefon:</span>
                            <span class='value'>{$telefon}</span>
                        </div>
                        <div class='detail-row'>
                            <span class='label'>Email:</span>
                            <span class='value'>{$email}</span>
                        </div>";
    
    if ($posebna_priloznost) {
        $htmlContent .= "
                        <div class='detail-row'>
                            <span class='label'>Posebna priložnost:</span>
                            <span class='value'>{$posebna_priloznost}</span>
                        </div>";
    }
    
    if ($posebne_zelje) {
        $htmlContent .= "
                        <div class='detail-row'>
                            <span class='label'>Posebne želje:</span>
                            <span class='value'>{$posebne_zelje}</span>
                        </div>";
    }
    
    $htmlContent .= "
                    </div>
                    
                    <div class='important-box'>
                        <h4>POMEMBNO:</h4>
                        <ul>
                            <li>Prosimo prispite 10 minut pred rezerviranim časom</li>
                            <li>Miza je rezervirana za 2 uri</li>
                            <li>V primeru zamude ali odpovedi nas prosimo obvestite na +386 2 460 70 00</li>
                            <li>Pokažite to potrditev ob prihodu</li>
                        </ul>
                    </div>
                    
                    <p style='margin-top: 30px; text-align: center; font-size: 14px;'>
                        <strong>Veselimo se vašega obiska v Jack & Joe!</strong>
                    </p>
                </div>
                <div class='footer'>
                    <p><strong>Jack & Joe Steak & Burger Club</strong><br>
                    Limbuška cesta 110, 2341 Limbuš | Lent 11, 2000 Maribor<br>
                    Tel: +386 2 460 70 00 | Email: info@jackandjoe.si</p>
                </div>
            </div>
        </body>
        </html>
    ";

    // Generate PDF
    $options = new Options();
    $options->set('isRemoteEnabled', true);
    $options->set('isHtml5ParserEnabled', true);
    $options->set('defaultFont', 'DejaVu Sans');
    
    $dompdf = new Dompdf($options);
    $dompdf->loadHtml($htmlContent);
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->render();
    
    // Save PDF to file
    $pdfDirectory = __DIR__ . '/../confirmations/';
    if (!file_exists($pdfDirectory)) {
        mkdir($pdfDirectory, 0777, true);
    }
    
    $pdfFilename = "reservation_{$reservation_id}.pdf";
    $pdfPath = $pdfDirectory . $pdfFilename;
    file_put_contents($pdfPath, $dompdf->output());

    //shrani PDF v bazo
    $relativePdfPath = '/confirmations/' . $pdfFilename;
    $sql_pdf = 'INSERT INTO PDFConfirmation (reservation_id, pot_potrdila) VALUES (?, ?)';

    $stmt_pdf = $pdo->prepare($sql_pdf);
    $stmt_pdf->execute([$reservation_id, $relativePdfPath]);
    $pdf_id = $pdo->lastInsertId();

    $pdo->commit();

    // Send confirmation email with PDF attachment
    $mail = new PHPMailer(true);
    $emailSent = false;
    $emailError = '';
    
    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USERNAME'];
        $mail->Password   = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $_ENV['SMTP_PORT'];

        // Sender and recipient
        $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
        $mail->addAddress($email, $polno_ime);
        $mail->addReplyTo($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);

        // Attach PDF
        $mail->addAttachment($pdfPath, $pdfFilename);

        // Email content
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = "Potrditev rezervacije #{$reservation_id} - Jack & Joe";
        $mail->Body    = $htmlContent;

        $mail->send();
        $emailSent = true;
        
    } catch (Exception $e) {
        $emailError = $mail->ErrorInfo;
        // Log error but don't fail the reservation
        error_log("Email send failed: " . $e->getMessage());
    }
    ob_clean();

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Rezervacija uspešno ustvarjena',
        'reservation_id' => $reservation_id,
        'table_id' => $table_id,
        'pdf_id' => $pdf_id,
        'email_sent' => $emailSent,
        'email_error' => $emailError,
        'pdf_url' => $relativePdfPath
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
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri generiranju PDF ali pošiljanju emaila',
        'error' => $e->getMessage()
    ]);
}
ob_end_flush();
?>