<?php
require_once __DIR__ . '/../vendor/autoload.php';

use MongoDB\Client;

class Database {
    private static $instance = null;
    private $client;
    private $db;
    
    private function __construct() {
        $config = require __DIR__ . '/../config/config.php';
        
        $this->client = new Client($config['mongodb']['uri']);
        $this->db = $this->client->selectDatabase($config['mongodb']['database']);
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getDatabase() {
        return $this->db;
    }
    
    public function getCollection($name) {
        return $this->db->selectCollection($name);
    }
}
