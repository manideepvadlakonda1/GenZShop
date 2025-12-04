<?php
require_once __DIR__ . '/../config/database.php';

class Category {
    private $collection;
    
    public function __construct() {
        $db = Database::getInstance();
        $this->collection = $db->getCollection('categories');
    }
    
    public function getAll() {
        try {
            $cursor = $this->collection->find([], ['sort' => ['name' => 1]]);
            $categories = [];
            
            foreach ($cursor as $doc) {
                $categories[] = $this->formatCategory($doc);
            }
            
            return $categories;
        } catch (Exception $e) {
            throw new Exception("Error fetching categories: " . $e->getMessage());
        }
    }
    
    public function getActive() {
        try {
            $cursor = $this->collection->find(['active' => true], ['sort' => ['name' => 1]]);
            $categories = [];
            
            foreach ($cursor as $doc) {
                $categories[] = $this->formatCategory($doc);
            }
            
            return $categories;
        } catch (Exception $e) {
            throw new Exception("Error fetching active categories: " . $e->getMessage());
        }
    }
    
    public function create($data) {
        try {
            $category = [
                'name' => $data['name'],
                'image' => $data['image'] ?? '',
                'link' => $data['link'] ?? '',
                'active' => $data['active'] ?? true,
                'createdAt' => new MongoDB\BSON\UTCDateTime()
            ];
            
            $result = $this->collection->insertOne($category);
            return (string)$result->getInsertedId();
        } catch (Exception $e) {
            throw new Exception("Error creating category: " . $e->getMessage());
        }
    }
    
    public function update($id, $data) {
        try {
            $updateData = [];
            
            if (isset($data['name'])) $updateData['name'] = $data['name'];
            if (isset($data['image'])) $updateData['image'] = $data['image'];
            if (isset($data['link'])) $updateData['link'] = $data['link'];
            if (isset($data['active'])) $updateData['active'] = $data['active'];
            
            $updateData['updatedAt'] = new MongoDB\BSON\UTCDateTime();
            
            $result = $this->collection->updateOne(
                ['_id' => new MongoDB\BSON\ObjectId($id)],
                ['$set' => $updateData]
            );
            
            return $result->getModifiedCount() > 0;
        } catch (Exception $e) {
            throw new Exception("Error updating category: " . $e->getMessage());
        }
    }
    
    public function delete($id) {
        try {
            $result = $this->collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
            return $result->getDeletedCount() > 0;
        } catch (Exception $e) {
            throw new Exception("Error deleting category: " . $e->getMessage());
        }
    }
    
    private function formatCategory($category) {
        if (!$category) return null;
        
        $formatted = [];
        foreach ($category as $key => $value) {
            if ($key === '_id') {
                $formatted['_id'] = (string)$value;
            } else {
                $formatted[$key] = $value;
            }
        }
        
        return $formatted;
    }
}
