<?php
require_once __DIR__ . '/../config/database.php';

class Product {
    private $collection;
    
    public function __construct() {
        $db = Database::getInstance();
        $this->collection = $db->getCollection('products');
    }
    
    public function getAll($filters = []) {
        $query = [];
        $options = ['limit' => 50];
        
        if (isset($filters['category']) && !empty($filters['category'])) {
            $query['category'] = $filters['category'];
        }
        
        if (isset($filters['subcategory']) && !empty($filters['subcategory'])) {
            $query['subcategory'] = $filters['subcategory'];
        }
        
        if (isset($filters['limit'])) {
            $options['limit'] = (int)$filters['limit'];
        }
        
        if (isset($filters['sortBy'])) {
            switch ($filters['sortBy']) {
                case 'price-low':
                    $options['sort'] = ['price' => 1];
                    break;
                case 'price-high':
                    $options['sort'] = ['price' => -1];
                    break;
                case 'newest':
                    $options['sort'] = ['createdAt' => -1];
                    break;
                default:
                    $options['sort'] = ['popularity' => -1];
            }
        }
        
        $products = $this->collection->find($query, $options)->toArray();
        return array_map([$this, 'formatProduct'], $products);
    }
    
    public function getById($id) {
        $product = $this->collection->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
        return $product ? $this->formatProduct($product) : null;
    }
    
    public function getByCategory($category) {
        $products = $this->collection->find(['category' => $category])->toArray();
        return array_map([$this, 'formatProduct'], $products);
    }
    
    private function formatProduct($product) {
        if (!$product) return null;
        
        $formatted = [];
        foreach ($product as $key => $value) {
            if ($key === '_id') {
                $formatted['_id'] = (string)$value;
            } else {
                $formatted[$key] = $value;
            }
        }
        
        // Ensure backwards compatibility: add 'image' field from first image in images array
        if (isset($formatted['images']) && is_array($formatted['images']) && count($formatted['images']) > 0) {
            if (!isset($formatted['image'])) {
                $formatted['image'] = $formatted['images'][0];
            }
        }
        
        // If only 'image' exists, create 'images' array
        if (isset($formatted['image']) && !isset($formatted['images'])) {
            $formatted['images'] = [$formatted['image']];
        }
        
        return $formatted;
    }
    
    public function search($query) {
        return $this->collection->find([
            '$or' => [
                ['name' => new MongoDB\BSON\Regex($query, 'i')],
                ['description' => new MongoDB\BSON\Regex($query, 'i')]
            ]
        ])->toArray();
    }
    
    public function create($data) {
        $data['createdAt'] = new MongoDB\BSON\UTCDateTime();
        $data['updatedAt'] = new MongoDB\BSON\UTCDateTime();
        return $this->collection->insertOne($data);
    }
    
    public function update($id, $data) {
        $data['updatedAt'] = new MongoDB\BSON\UTCDateTime();
        return $this->collection->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($id)],
            ['$set' => $data]
        );
    }
    
    public function delete($id) {
        return $this->collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
    }
}
