<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../middleware/Auth.php';

class AuthController {
    private $userModel;
    private $auth;
    
    public function __construct() {
        $this->userModel = new User();
        $this->auth = new Auth();
    }
    
    public function register() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate input
        if (!isset($data['email']) || !isset($data['password']) || !isset($data['name'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Missing required fields'
            ]);
            return;
        }
        
        // Check if user exists
        $existingUser = $this->userModel->findByEmail($data['email']);
        if ($existingUser) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'User already exists'
            ]);
            return;
        }
        
        // Create user
        $result = $this->userModel->create($data);
        
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully',
            'userId' => (string)$result->getInsertedId()
        ]);
    }
    
    public function login() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Missing email or password'
            ]);
            return;
        }
        
        $user = $this->userModel->findByEmail($data['email']);
        
        if (!$user || !$this->userModel->verifyPassword($data['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid credentials'
            ]);
            return;
        }
        
        $token = $this->auth->generateToken((string)$user['_id']);
        
        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => [
                '_id' => (string)$user['_id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
    }
    
    public function getProfile() {
        $userId = $this->auth->verify();
        
        if (!$userId) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]);
            return;
        }
        
        $user = $this->userModel->findById($userId);
        
        echo json_encode([
            'success' => true,
            'user' => [
                '_id' => (string)$user['_id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
    }
}
