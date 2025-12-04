<?php
require_once __DIR__ . '/../models/Category.php';

class CategoryController {
    private $categoryModel;
    
    public function __construct() {
        $this->categoryModel = new Category();
    }
    
    public function getAll() {
        try {
            $categories = $this->categoryModel->getAll();
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $categories]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function getActive() {
        try {
            $categories = $this->categoryModel->getActive();
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $categories]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function create() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data['name'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Category name is required']);
                return;
            }
            
            $categoryId = $this->categoryModel->create($data);
            http_response_code(201);
            echo json_encode(['success' => true, 'message' => 'Category created successfully', 'id' => $categoryId]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function update($id) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            $success = $this->categoryModel->update($id, $data);
            
            if ($success) {
                http_response_code(200);
                echo json_encode(['success' => true, 'message' => 'Category updated successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Category not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
    
    public function delete($id) {
        try {
            $success = $this->categoryModel->delete($id);
            
            if ($success) {
                http_response_code(200);
                echo json_encode(['success' => true, 'message' => 'Category deleted successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Category not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
