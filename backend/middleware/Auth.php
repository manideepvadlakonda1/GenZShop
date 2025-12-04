<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth {
    private $secret;
    private $expire;
    
    public function __construct() {
        $config = require __DIR__ . '/../config/config.php';
        $this->secret = $config['jwt']['secret'];
        $this->expire = $config['jwt']['expire'];
    }
    
    public function generateToken($userId) {
        $payload = [
            'userId' => $userId,
            'iat' => time(),
            'exp' => time() + $this->expire
        ];
        
        return JWT::encode($payload, $this->secret, 'HS256');
    }
    
    public function verify() {
        $headers = getallheaders();
        
        if (!isset($headers['Authorization'])) {
            return false;
        }
        
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            return $decoded->userId;
        } catch (Exception $e) {
            return false;
        }
    }
}
