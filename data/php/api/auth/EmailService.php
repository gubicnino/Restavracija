<?php
use PHPMailer\PHPMailer\PHPMailer;

require '../../vendor/autoload.php';

// Get environment variables from Docker
$smtpHost = getenv('SMTP_HOST');
$smtpPort = getenv('SMTP_PORT');
$smtpUsername = getenv('SMTP_USERNAME');
$smtpPassword = getenv('SMTP_PASSWORD');
$smtpFromEmail = getenv('SMTP_FROM_EMAIL');
$smtpFromName = getenv('SMTP_FROM_NAME');

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host       = $smtpHost;
$mail->SMTPAuth   = true;
$mail->Username   = $smtpUsername;
$mail->Password   = $smtpPassword;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port       = $smtpPort;

$mail->setFrom($smtpFromEmail, $smtpFromName);