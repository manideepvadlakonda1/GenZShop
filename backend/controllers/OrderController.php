<?php
require_once __DIR__ . '/../models/Order.php';
require_once __DIR__ . '/../middleware/Auth.php';

class OrderController {
    private $orderModel;
    private $auth;
    
    public function __construct() {
        $this->orderModel = new Order();
        $this->auth = new Auth();
    }
    
    public function create() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Try to get userId from JWT token or from the request data
            $authUserId = $this->auth->verify();
            error_log('Auth userId from JWT: ' . ($authUserId ? $authUserId : 'null'));
            error_log('UserId from request data: ' . ($data['userId'] ?? 'null'));
            
            if ($authUserId) {
                // Use authenticated user ID
                $data['userId'] = new MongoDB\BSON\ObjectId($authUserId);
            } elseif (isset($data['userId']) && !empty($data['userId'])) {
                // Use userId from request if provided
                try {
                    $data['userId'] = new MongoDB\BSON\ObjectId($data['userId']);
                } catch (Exception $e) {
                    error_log('Invalid userId format: ' . $data['userId']);
                    $data['userId'] = null;
                }
            } else {
                // Guest order
                $data['userId'] = null;
            }
            
            // Log the order data for debugging
            error_log('Creating order with userId: ' . ($data['userId'] ? (string)$data['userId'] : 'null'));
            error_log('Order email: ' . ($data['shippingAddress']['email'] ?? 'no email'));
            
            $result = $this->orderModel->create($data);
            
            echo json_encode([
                'success' => true,
                'orderId' => (string)$result->getInsertedId(),
                'message' => 'Order created successfully'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to create order: ' . $e->getMessage()
            ]);
        }
    }
    
    public function getAll() {
        // For admin panel - fetch all orders without authentication
        // In production, add admin role check here
        
        try {
            $orders = $this->orderModel->getAllOrders();
            
            echo json_encode([
                'success' => true,
                'orders' => $orders
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function update($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            error_log('Updating order ID: ' . $id . ' with data: ' . json_encode($data));
            
            $result = $this->orderModel->update($id, $data);
            
            error_log('Update result - Modified count: ' . $result->getModifiedCount());
            
            if ($result->getModifiedCount() > 0 || $result->getMatchedCount() > 0) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Order updated successfully',
                    'modifiedCount' => $result->getModifiedCount(),
                    'matchedCount' => $result->getMatchedCount()
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'No changes made or order not found'
                ]);
            }
        } catch (Exception $e) {
            error_log('Order update error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function getById($id) {
        $userId = $this->auth->verify();
        
        if (!$userId) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Unauthorized'
            ]);
            return;
        }
        
        $order = $this->orderModel->getById($id);
        
        if ($order && (string)$order['userId'] === $userId) {
            echo json_encode([
                'success' => true,
                'order' => $order
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Order not found'
            ]);
        }
    }
    
    public function getUserOrders() {
        error_log('getUserOrders called');
        $headers = getallheaders();
        error_log('Authorization header: ' . ($headers['Authorization'] ?? 'NOT SET'));
        
        $userId = $this->auth->verify();
        error_log('Verified userId: ' . ($userId ? $userId : 'NULL'));
        
        if (!$userId) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Unauthorized - Please login'
            ]);
            return;
        }
        
        try {
            // Get user's email to also fetch guest orders
            require_once __DIR__ . '/../models/User.php';
            $userModel = new User();
            $user = $userModel->findById($userId);
            $userEmail = $user['email'] ?? null;
            
            error_log('Fetching orders for userId: ' . $userId . ', email: ' . $userEmail);
            
            $orders = $this->orderModel->getUserOrders($userId, $userEmail);
            
            error_log('Found ' . count($orders) . ' orders');
            
            echo json_encode([
                'success' => true,
                'orders' => $orders
            ]);
        } catch (Exception $e) {
            error_log('getUserOrders error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
