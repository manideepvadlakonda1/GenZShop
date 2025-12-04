<?php
require_once __DIR__ . '/../config/database.php';

class Subcategory {
    private $collection;
    
    public function __construct() {
        $db = Database::getInstance();
        $this->collection = $db->getCollection('subcategories');
    }
    
    public function getAll() {
        try {
            $cursor = $this->collection->find([], ['sort' => ['name' => 1]]);
            $subcategories = [];
            
            foreach ($cursor as $doc) {
                $subcategories[] = $this->formatSubcategory($doc);
            }
            
            return $subcategories;
        } catch (Exception $e) {
            throw new Exception("Error fetching subcategories: " . $e->getMessage());
        }
    }
    
    public function getByCategory($categoryId) {
        try {
            $cursor = $this->collection->find(['categoryId' => $categoryId, 'active' => true], ['sort' => ['name' => 1]]);
            $subcategories = [];
            
            foreach ($cursor as $doc) {
                $subcategories[] = $this->formatSubcategory($doc);
            }
            
            return $subcategories;
        } catch (Exception $e) {
            throw new Exception("Error fetching subcategories by category: " . $e->getMessage());
        }
    }
    
    public function getActive() {
        try {
            $cursor = $this->collection->find(['active' => true], ['sort' => ['name' => 1]]);
            $subcategories = [];
            
            foreach ($cursor as $doc) {
                $subcategories[] = $this->formatSubcategory($doc);
            }
            
            return $subcategories;
        } catch (Exception $e) {
            throw new Exception("Error fetching active subcategories: " . $e->getMessage());
        }
    }
    
    public function create($data) {
        try {
            $subcategory = [
                'name' => $data['name'],
                'categoryId' => $data['categoryId'],
                'categoryName' => $data['categoryName'] ?? '',
                'image' => $data['image'] ?? '',
                'active' => $data['active'] ?? true,
                'createdAt' => new MongoDB\BSON\UTCDateTime()
            ];
            
            $result = $this->collection->insertOne($subcategory);
            return (string)$result->getInsertedId();
        } catch (Exception $e) {
            throw new Exception("Error creating subcategory: " . $e->getMessage());
        }
    }
    
    public function update($id, $data) {
        try {
            $updateData = [];
            
            if (isset($data['name'])) $updateData['name'] = $data['name'];
            if (isset($data['categoryId'])) $updateData['categoryId'] = $data['categoryId'];
            if (isset($data['categoryName'])) $updateData['categoryName'] = $data['categoryName'];
            if (isset($data['image'])) $updateData['image'] = $data['image'];
            if (isset($data['active'])) $updateData['active'] = $data['active'];
            
            $updateData['updatedAt'] = new MongoDB\BSON\UTCDateTime();
            
            $result = $this->collection->updateOne(
                ['_id' => new MongoDB\BSON\ObjectId($id)],
                ['$set' => $updateData]
            );
            
            return $result->getModifiedCount() > 0;
        } catch (Exception $e) {
            throw new Exception("Error updating subcategory: " . $e->getMessage());
        }
    }
    
    public function delete($id) {
        try {
            $result = $this->collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
            return $result->getDeletedCount() > 0;
        } catch (Exception $e) {
            throw new Exception("Error deleting subcategory: " . $e->getMessage());
        }
    }
    
    private function formatSubcategory($subcategory) {
        if (!$subcategory) return null;
        
        $formatted = [];
        foreach ($subcategory as $key => $value) {
            if ($key === '_id') {
                $formatted['_id'] = (string)$value;
            } else {
                $formatted[$key] = $value;
            }
        }
        
        return $formatted;
    }
}
