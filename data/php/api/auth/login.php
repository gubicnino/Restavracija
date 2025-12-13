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

$email = $data['email'] ?? '';
$geslo = $data['geslo'] ?? '';

if (empty($email) || empty($geslo)) {
    echo json_encode([
        'success' => false,
        'message' => 'Email in geslo sta obvezna'
    ]);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM user WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($geslo, $user['geslo'])) {
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        shrani_kodo($user['user_id'], $code);
        poslji_email_za_prijavo($user['email'], $code);

        echo json_encode([
            'success' => true,
            'message' => 'Koda poslana na email',
            'user_id' => $user['user_id']
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Napačno uporabniško ime ali geslo'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Napaka pri prijavi'
    ]);
}


function shrani_kodo($user_id, $code) {
    require '../../config/database.php';
    try {
        $stmt = $pdo->prepare("
            INSERT INTO verification_codes (user_id, code, expires_at, ip_address)
            VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE), ?)
            "
        );
        $stmt->execute([$user_id, $code, $_SERVER['REMOTE_ADDR']]);
    } catch (PDOException $e) {
        echo json_encode([
        'success' => false,
        'message' => 'Napaka pri shranjevanju kode'
    ]);
    }
}


function poslji_email_za_prijavo($email, $code) {
    require_once 'EmailService.php';

    try {
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Vaša koda za prijavo - Jack & Joe';
        $mail->Body    = "
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
                        padding: 40px 30px; 
                    }
                    .content > p { 
                        color: #333; 
                        font-size: 16px; 
                        line-height: 1.6; 
                        margin: 0 0 20px 0; 
                    }
                    .code-box { 
                        background: #f9f9f9; 
                        border: 2px dashed #d4af37; 
                        border-radius: 8px; 
                        padding: 30px; 
                        margin: 30px 0; 
                        text-align: center;
                    }
                    .code { 
                        font-size: 42px; 
                        font-weight: bold; 
                        letter-spacing: 12px; 
                        color: #1a1a1a; 
                        margin: 0 0 15px 0;
                    }
                    .expiry { 
                        color: #666; 
                        font-size: 14px; 
                        margin: 0;
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
                        font-size: 16px;
                    }
                    .important-box p {
                        margin: 0;
                        color: #666;
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    .footer { 
                        background: #f5f5f5;
                        text-align: center; 
                        padding: 20px; 
                        color: #666; 
                        font-size: 11px;
                        border-top: 1px solid #ddd;
                    }
                    .footer p {
                        margin: 5px 0;
                        line-height: 1.4;
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
                        <p>Spoštovani/a,</p>
                        <p>Prejeli ste zahtevo za prijavo v administrativni sistem Jack & Joe.</p>
                        <p>Uporabite spodnjo kodo za dokončanje prijave:</p>
                        
                        <div class='code-box'>
                            <div class='code'>$code</div>
                            <div class='expiry'>⏱️ Koda velja 10 minut</div>
                        </div>
                        
                        <div class='important-box'>
                            <h4>⚠️ VARNOSTNO OPOZORILO:</h4>
                            <p>Če niste zahtevali te kode, prosimo ignorirajte to sporočilo in takoj obvestite administratorja na +386 2 460 70 00.</p>
                        </div>

                        <p style='margin-top: 30px; text-align: center; font-size: 14px; color: #666;'>
                            Hvala za uporabo našega sistema.
                        </p>
                    </div>
                    <div class='footer'>
                        <p><strong>Jack & Joe Steak & Burger Club</strong><br>
                        Limbuška cesta 110, 2341 Limbuš | Lent 11, 2000 Maribor<br>
                        Tel: +386 2 460 70 00 | Email: info@jackandjoe.si</p>
                        <p style='margin-top: 10px; color: #999;'>
                            To je avtomatsko generirano sporočilo, prosimo ne odgovarjajte.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        ";
        
        $mail->AltBody = "Vaša koda za prijavo v Jack & Joe sistem je: $code\n\nKoda velja 10 minut.\n\nČe niste zahtevali te kode, ignorirajte to sporočilo in obvestite administratorja na +386 2 460 70 00.\n\n---\nJack & Joe Steak & Burger Club\nLimbuška cesta 110, 2341 Limbuš | Lent 11, 2000 Maribor\nTel: +386 2 460 70 00";
        
        $mail->send();
    } catch (Exception $e) {
        error_log("Email send failed: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'message' => 'Napaka pri pošiljanju emaila'
        ]);
    }
}
?>
