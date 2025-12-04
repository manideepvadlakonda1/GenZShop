<?php
require_once __DIR__ . '/../models/Subcategory.php';

class SubcategoryController {
    private $subcategoryModel;
    
    public function __construct() {
        $this->subcategoryModel = new Subcategory();
    }
    
    public function getAll() {
        try {
            $subcategories = $this->subcategoryModel->getAll();
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $subcategories]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function getByCategory($categoryId) {
        try {
            $subcategories = $this->subcategoryModel->getByCategory($categoryId);
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $subcategories]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function getActive() {
        try {
            $subcategories = $this->subcategoryModel->getActive();
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $subcategories]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function create() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data['name']) || empty($data['categoryId'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Subcategory name and category are required']);
                return;
            }
            
            $subcategoryId = $this->subcategoryModel->create($data);
            http_response_code(201);
            echo json_encode(['success' => true, 'message' => 'Subcategory created successfully', 'id' => $subcategoryId]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function update($id) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            $success = $this->subcategoryModel->update($id, $data);
            
            if ($success) {
                http_response_code(200);
                echo json_encode(['success' => true, 'message' => 'Subcategory updated successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Subcategory not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        try {
            $success = $this->subcategoryModel->delete($id);
            
            if ($success) {
                http_response_code(200);
                echo json_encode(['success' => true, 'message' => 'Subcategory deleted successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Subcategory not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
