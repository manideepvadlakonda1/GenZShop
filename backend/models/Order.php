<?php
require_once __DIR__ . '/../config/database.php';

class Order {
    private $collection;
    
    public function __construct() {
        $db = Database::getInstance();
        $this->collection = $db->getCollection('orders');
    }
    
    public function create($data) {
        $data['status'] = 'pending';
        $data['createdAt'] = new MongoDB\BSON\UTCDateTime();
        $data['updatedAt'] = new MongoDB\BSON\UTCDateTime();
        return $this->collection->insertOne($data);
    }
    
    public function getAll($userId = null) {
        $query = [];
        if ($userId) {
            $query['userId'] = new MongoDB\BSON\ObjectId($userId);
        }
        return $this->collection->find($query, ['sort' => ['createdAt' => -1]])->toArray();
    }
    
    public function getUserOrders($userId, $userEmail = null) {
        // Get orders for specific user by email (works for both guest and authenticated)
        // This ensures all orders with the same email are returned
        
        $formattedOrders = [];
        
        if ($userEmail) {
            // Primary strategy: Find ALL orders with matching email
            try {
                error_log('Fetching orders for email: ' . $userEmail);
                $orders = $this->collection->find(
                    ['shippingAddress.email' => $userEmail],
                    ['sort' => ['createdAt' => -1]]
                )->toArray();
                
                error_log('Found ' . count($orders) . ' orders for email');
                
                foreach ($orders as $order) {
                    $formatted = [];
                    foreach ($order as $key => $value) {
                        if ($key === '_id' || $key === 'userId') {
                            $formatted[$key] = (string)$value;
                        } elseif ($value instanceof MongoDB\BSON\UTCDateTime) {
                            $formatted[$key] = $value->toDateTime()->format('Y-m-d H:i:s');
                        } else {
                            $formatted[$key] = $value;
                        }
                    }
                    $formattedOrders[] = $formatted;
                }
            } catch (Exception $e) {
                error_log('Error fetching orders by email: ' . $e->getMessage());
            }
        } elseif ($userId) {
            // Fallback: If no email, try userId only
            try {
                $orders = $this->collection->find(
                    ['userId' => new MongoDB\BSON\ObjectId($userId)],
                    ['sort' => ['createdAt' => -1]]
                )->toArray();
                
                foreach ($orders as $order) {
                    $formatted = [];
                    foreach ($order as $key => $value) {
                        if ($key === '_id' || $key === 'userId') {
                            $formatted[$key] = (string)$value;
                        } elseif ($value instanceof MongoDB\BSON\UTCDateTime) {
                            $formatted[$key] = $value->toDateTime()->format('Y-m-d H:i:s');
                        } else {
                            $formatted[$key] = $value;
                        }
                    }
                    $formattedOrders[] = $formatted;
                }
            } catch (Exception $e) {
                error_log('Error fetching orders by userId: ' . $e->getMessage());
            }
        }
        
        error_log('Returning ' . count($formattedOrders) . ' formatted orders');
        return $formattedOrders;
    }
    
    public function getAllOrders() {
        // Get all orders for admin panel
        $orders = $this->collection->find([], ['sort' => ['createdAt' => -1]])->toArray();
        
        // Format orders
        $formattedOrders = [];
        foreach ($orders as $order) {
            $formatted = [];
            foreach ($order as $key => $value) {
                if ($key === '_id' || $key === 'userId') {
                    $formatted[$key] = (string)$value;
                } elseif ($value instanceof MongoDB\BSON\UTCDateTime) {
                    $formatted[$key] = $value->toDateTime()->format('Y-m-d H:i:s');
                } else {
                    $formatted[$key] = $value;
                }
            }
            $formattedOrders[] = $formatted;
        }
        
        return $formattedOrders;
    }
    
    public function getById($id) {
        return $this->collection->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
    }
    
    public function update($id, $data) {
        $data['updatedAt'] = new MongoDB\BSON\UTCDateTime();
        return $this->collection->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($id)],
            ['$set' => $data]
        );
    }
    
    public function updateStatus($id, $status) {
        return $this->collection->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($id)],
            ['$set' => ['status' => $status, 'updatedAt' => new MongoDB\BSON\UTCDateTime()]]
        );
    }
}
