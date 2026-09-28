<?php
// Set CORS headers jika diperlukan
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Method Not Allowed";
    exit();
}

// 1. Proteksi Honeypot Anti-Spam
if (!empty($_POST['_gotcha'])) {
    // Jika field jebakan diisi oleh bot, hentikan proses tanpa info error
    http_response_code(200);
    echo "Spam detected.";
    exit();
}

// 2. Ambil data form
$form_type = isset($_POST['form_type']) ? sanitize_input($_POST['form_type']) : 'contact';
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : 'Anonim';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '-';
$company = isset($_POST['company']) ? sanitize_input($_POST['company']) : '-';
$category = isset($_POST['category']) ? sanitize_input($_POST['category']) : '-';
$meeting_date = isset($_POST['meeting_date']) ? sanitize_input($_POST['meeting_date']) : '-';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '-';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Format email tidak valid.";
    exit();
}

// 3. Tentukan penerima & subjek berdasarkan form_type
$to = "customerrelation@cetrofarm.com";
$subject = "[Cetrofarm Website] Pesan Baru";

if ($form_type === 'investor') {
    $to = "investor@cetrofarm.com";
    $subject = "[Cetrofarm Website] Inkuiri Investor / Meeting Prospectus";
} elseif ($form_type === 'newsletter') {
    $to = "customerrelation@cetrofarm.com";
    $subject = "[Cetrofarm Website] Pendaftaran Newsletter Baru";
} else {
    if (strpos($category, 'B2B') !== false) {
        $subject = "[Cetrofarm B2B] Penawaran Kerja Sama: " . $name;
    } else {
        $subject = "[Cetrofarm Website] Pesan Kontak dari " . $name;
    }
}

// 4. Susun isi email
$email_content = "DAFTAR PESAN MASUK DARI WEBSITE CETROFARM\n";
$email_content .= "=============================================\n\n";
$email_content .= "Tipe Form     : " . strtoupper($form_type) . "\n";
$email_content .= "Nama Lengkap  : " . $name . "\n";
$email_content .= "Email         : " . $email . "\n";
$email_content .= "No. Telepon   : " . $phone . "\n";
$email_content .= "Perusahaan    : " . $company . "\n";
if ($form_type === 'contact') {
    $email_content .= "Kategori      : " . $category . "\n";
}
if ($form_type === 'investor') {
    $email_content .= "Jadwal Meeting: " . $meeting_date . "\n";
}
$email_content .= "\nPesan / Catatan:\n" . $message . "\n\n";
$email_content .= "=============================================\n";
$email_content .= "Waktu Pengiriman: " . date("Y-m-d H:i:s") . " WIB\n";
$email_content .= "IP Pengirim: " . $_SERVER['REMOTE_ADDR'] . "\n";

// 5. Header Email
$headers = "From: Cetrofarm Website <no-reply@cetrofarm.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 6. Kirim email via PHP mail()
$mail_success = @mail($to, $subject, $email_content, $headers);

// Helper Sanitasi
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// 7. Halaman Response Sukses
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terima Kasih | Cetrofarm</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FAF7F0; color: #173D2B; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 10px 25px rgba(23,61,43,0.1); text-align: center; max-width: 480px; width: 100%; border-top: 5px solid #173D2B; }
        h1 { font-size: 24px; color: #173D2B; margin-bottom: 12px; }
        p { font-size: 14px; color: #4A5568; line-height: 1.6; margin-bottom: 24px; }
        .btn { display: inline-block; background-color: #173D2B; color: #FAF7F0; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 14px; transition: background 0.3s; }
        .btn:hover { background-color: #21563D; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Pesan Anda Berhasil Terkirim!</h1>
        <p>Terima kasih telah menghubungi <strong>PT. Cetro Tama Indonesia (Cetrofarm)</strong>. Tim kami akan meninjau pesan Anda dan memberikan respons dalam waktu 1x24 jam kerja.</p>
        <a href="/" class="btn">Kembali ke Beranda</a>
    </div>
</body>
</html>
