<?php
require_once __DIR__ . '/config/database.php';

$db = Database::getInstance();
$productsCollection = $db->getCollection('products');

// Sample products
$sampleProducts = [
    [
        'name' => 'Classic T-Shirt',
        'description' => 'Comfortable cotton t-shirt perfect for everyday wear',
        'price' => 6.48,
        'originalPrice' => 16.48,
        'category' => 'men',
        'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        'colors' => ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
        'stock' => 100,
        'popularity' => 95,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'updatedAt' => new MongoDB\BSON\UTCDateTime()
    ],
    [
        'name' => 'Denim Jacket',
        'description' => 'Stylish denim jacket for all seasons',
        'price' => 49.99,
        'originalPrice' => 89.99,
        'category' => 'women',
        'image' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
        'colors' => ['#4A90E2', '#252B42'],
        'stock' => 50,
        'popularity' => 88,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'updatedAt' => new MongoDB\BSON\UTCDateTime()
    ],
    [
        'name' => 'Summer Dress',
        'description' => 'Light and breezy summer dress',
        'price' => 39.99,
        'originalPrice' => 69.99,
        'category' => 'women',
        'image' => 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
        'colors' => ['#FF6B9D', '#23A6F0', '#2DC071'],
        'stock' => 75,
        'popularity' => 92,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'updatedAt' => new MongoDB\BSON\UTCDateTime()
    ],
    [
        'name' => 'Sports Sneakers',
        'description' => 'High-performance sports sneakers',
        'price' => 79.99,
        'originalPrice' => 129.99,
        'category' => 'accessories',
        'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        'colors' => ['#252B42', '#FFFFFF', '#E74C3C'],
        'stock' => 60,
        'popularity' => 90,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'updatedAt' => new MongoDB\BSON\UTCDateTime()
    ],
    [
        'name' => 'Kids Hoodie',
        'description' => 'Warm and cozy hoodie for kids',
        'price' => 24.99,
        'originalPrice' => 44.99,
        'category' => 'kids',
        'image' => 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400',
        'colors' => ['#FFD700', '#23A6F0', '#E74C3C'],
        'stock' => 80,
        'popularity' => 85,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'updatedAt' => new MongoDB\BSON\UTCDateTime()
    ],
    [
        'name' => 'Leather Wallet',
        'description' => 'Premium leather wallet with multiple card slots',
        'price' => 29.99,
        'originalPrice' => 59.99,
        'category' => 'accessories',
        'image' => 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
        'colors' => ['#8B4513', '#252B42'],
        'stock' => 120,
        'popularity' => 78,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'updatedAt' => new MongoDB\BSON\UTCDateTime()
    ],
    [
        'name' => 'Casual Pants',
        'description' => 'Comfortable casual pants for everyday wear',
        'price' => 34.99,
        'originalPrice' => 64.99,
        'category' => 'men',
        'image' => 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',
        'colors' => ['#2C3E50', '#8B4513', '#708090'],
        'stock' => 90,
        'popularity' => 82,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'updatedAt' => new MongoDB\BSON\UTCDateTime()
    ],
    [
        'name' => 'Floral Blouse',
        'description' => 'Elegant floral pattern blouse',
        'price' => 27.99,
        'originalPrice' => 49.99,
        'category' => 'women',
        'image' => 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400',
        'colors' => ['#FFB6C1', '#FFFFFF', '#FF69B4'],
        'stock' => 65,
        'popularity' => 87,
        'createdAt' => new MongoDB\BSON\UTCDateTime(),
        'updatedAt' => new MongoDB\BSON\UTCDateTime()
    ]
];

try {
    // Clear existing products (optional)
    $productsCollection->deleteMany([]);
    
    // Insert sample products
    $result = $productsCollection->insertMany($sampleProducts);
    
    echo "Successfully inserted " . count($result->getInsertedIds()) . " products!\n";
    echo "Product IDs:\n";
    foreach ($result->getInsertedIds() as $id) {
        echo "- " . (string)$id . "\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
