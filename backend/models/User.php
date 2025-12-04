<?php
require_once __DIR__ . '/../config/database.php';

class User {
    private $collection;
    
    public function __construct() {
        $db = Database::getInstance();
        $this->collection = $db->getCollection('users');
    }
    
    public function create($data) {
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        $data['createdAt'] = new MongoDB\BSON\UTCDateTime();
        $data['updatedAt'] = new MongoDB\BSON\UTCDateTime();
        return $this->collection->insertOne($data);
    }
    
    public function findByEmail($email) {
        return $this->collection->findOne(['email' => $email]);
    }
    
    public function findById($id) {
        return $this->collection->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
    }
    
    public function update($id, $data) {
        $data['updatedAt'] = new MongoDB\BSON\UTCDateTime();
        return $this->collection->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($id)],
            ['$set' => $data]
        );
    }
    
    public function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }
}
