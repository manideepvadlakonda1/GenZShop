<?php
require_once __DIR__ . '/../models/Product.php';

class ProductController {
    private $productModel;
    
    public function __construct() {
        $this->productModel = new Product();
    }
    
    public function getAll() {
        $filters = $_GET;
        $products = $this->productModel->getAll($filters);
        
        echo json_encode([
            'success' => true,
            'products' => $products,
            'count' => count($products)
        ]);
    }
    
    public function getById($id) {
        try {
            $product = $this->productModel->getById($id);
            
            if ($product) {
                echo json_encode([
                    'success' => true,
                    'data' => $product
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Product not found'
                ]);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function getByCategory($category) {
        $products = $this->productModel->getByCategory($category);
        
        echo json_encode([
            'success' => true,
            'products' => $products
        ]);
    }
    
    public function search() {
        $query = $_GET['q'] ?? '';
        $products = $this->productModel->search($query);
        
        echo json_encode([
            'success' => true,
            'products' => $products
        ]);
    }
    
    public function create() {
        try {
            $rawInput = file_get_contents('php://input');
            error_log("Raw input length: " . strlen($rawInput));
            
            $data = json_decode($rawInput, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Invalid JSON: ' . json_last_error_msg());
            }
            
            $result = $this->productModel->create($data);
            
            echo json_encode([
                'success' => true,
                'id' => (string)$result->getInsertedId()
            ]);
        } catch (Exception $e) {
            error_log("Create product error: " . $e->getMessage());
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function update($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->productModel->update($id, $data);
            
            echo json_encode([
                'success' => true,
                'modified' => $result->getModifiedCount()
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function delete($id) {
        try {
            $result = $this->productModel->delete($id);
            
            echo json_encode([
                'success' => true,
                'deleted' => $result->getDeletedCount()
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
