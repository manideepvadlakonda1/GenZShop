<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

return [
    'mongodb' => [
        'uri' => $_ENV['MONGODB_URI'],
        'database' => $_ENV['DB_NAME']
    ],
    'jwt' => [
        'secret' => $_ENV['JWT_SECRET'],
        'expire' => 3600 * 24 * 7 // 7 days
    ],
    'cors' => [
        'origin' => $_ENV['CORS_ORIGIN']
    ]
];
