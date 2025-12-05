<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// Path to .env file (local only)
$envPath = __DIR__ . '/../.env';

if (file_exists($envPath)) {
    $dotenv = Dotenv::createImmutable(dirname($envPath));
    $dotenv->load();
}

// Load environment variables (Render + Local)
$MONGODB_URI = getenv('MONGODB_URI') ?: ($_ENV['MONGODB_URI'] ?? null);
$DB_NAME     = getenv('DB_NAME')     ?: ($_ENV['DB_NAME'] ?? null);
$JWT_SECRET  = getenv('JWT_SECRET')  ?: ($_ENV['JWT_SECRET'] ?? null);
$CORS_ORIGIN = getenv('CORS_ORIGIN') ?: ($_ENV['CORS_ORIGIN'] ?? '*');

// If multiple CORS origins provided, convert to array
$corsAllowed = array_map('trim', explode(',', $CORS_ORIGIN));

return [
    'mongodb' => [
        'uri'      => $MONGODB_URI,
        'database' => $DB_NAME,
    ],
    'jwt' => [
        'secret' => $JWT_SECRET,
        'expire' => 3600 * 24 * 7,
    ],
    'cors' => [
        'origins' => $corsAllowed
    ]
];
