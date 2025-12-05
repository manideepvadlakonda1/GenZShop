<?php
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/database.php';

try {
    $db = Database::getInstance();
    
    echo "🚀 Starting complete product seeding...\n\n";

    // Clear existing data
    echo "🗑️  Clearing existing data...\n";
    $db->getCollection('categories')->deleteMany([]);
    $db->getCollection('subcategories')->deleteMany([]);
    $db->getCollection('products')->deleteMany([]);
    echo "✅ Data cleared!\n\n";

    // ==================== CATEGORIES ====================
    echo "📁 Creating Categories...\n";
    
    $categories = [
        [
            'name' => "Men's Fashion",
            'slug' => 'mens-fashion',
            'description' => 'Trendy fashion for modern men',
            'image' => 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800',
            'isActive' => true,
            'createdAt' => new MongoDB\BSON\UTCDateTime()
        ],
        [
            'name' => "Women's Fashion",
            'slug' => 'womens-fashion',
            'description' => 'Elegant and stylish clothing for women',
            'image' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
            'isActive' => true,
            'createdAt' => new MongoDB\BSON\UTCDateTime()
        ],
        [
            'name' => "Kid's Fashion",
            'slug' => 'kids-fashion',
            'description' => 'Comfortable and colorful clothes for kids',
            'image' => 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=800',
            'isActive' => true,
            'createdAt' => new MongoDB\BSON\UTCDateTime()
        ]
    ];

    $categoryIds = [];
    foreach ($categories as $category) {
        $result = $db->getCollection('categories')->insertOne($category);
        $categoryIds[$category['slug']] = $result->getInsertedId();
        echo "  ✓ Created: {$category['name']}\n";
    }
    echo "\n";

    // ==================== SUBCATEGORIES ====================
    echo "📂 Creating Subcategories...\n";
    
    $subcategories = [
        // Men's Fashion
        ['name' => 'Accessories', 'slug' => 'mens-accessories', 'category' => 'mens-fashion', 'image' => 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=500'],
        ['name' => 'T-Shirts', 'slug' => 'mens-tshirts', 'category' => 'mens-fashion', 'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
        ['name' => 'Shoes', 'slug' => 'mens-shoes', 'category' => 'mens-fashion', 'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
        
        // Women's Fashion
        ['name' => 'Dresses', 'slug' => 'womens-dresses', 'category' => 'womens-fashion', 'image' => 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'],
        ['name' => 'T-Shirts', 'slug' => 'womens-tshirts', 'category' => 'womens-fashion', 'image' => 'https://images.unsplash.com/photo-1503341733017-1901578f9f1e?w=500'],
        ['name' => 'Pants', 'slug' => 'womens-pants', 'category' => 'womens-fashion', 'image' => 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500'],
        ['name' => 'Jewellery', 'slug' => 'womens-jewellery', 'category' => 'womens-fashion', 'image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'],
        
        // Kid's Fashion
        ['name' => 'T-Shirts', 'slug' => 'kids-tshirts', 'category' => 'kids-fashion', 'image' => 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500'],
        ['name' => 'Shirts', 'slug' => 'kids-shirts', 'category' => 'kids-fashion', 'image' => 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500'],
        ['name' => 'Pants', 'slug' => 'kids-pants', 'category' => 'kids-fashion', 'image' => 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500'],
        ['name' => 'Shorts', 'slug' => 'kids-shorts', 'category' => 'kids-fashion', 'image' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500'],
        ['name' => 'Dresses', 'slug' => 'kids-dresses', 'category' => 'kids-fashion', 'image' => 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500']
    ];

    $subcategoryIds = [];
    foreach ($subcategories as $subcat) {
        $categoryId = $categoryIds[$subcat['category']];
        $data = [
            'name' => $subcat['name'],
            'slug' => $subcat['slug'],
            'categoryId' => $categoryId,
            'image' => $subcat['image'],
            'isActive' => true,
            'createdAt' => new MongoDB\BSON\UTCDateTime()
        ];
        $result = $db->getCollection('subcategories')->insertOne($data);
        $subcategoryIds[$subcat['slug']] = $result->getInsertedId();
        echo "  ✓ Created: {$subcat['name']} under {$subcat['category']}\n";
    }
    echo "\n";

    // ==================== PRODUCTS ====================
    echo "🛍️  Creating Products...\n";
    
    $products = [
        // MEN'S ACCESSORIES (5 products)
        ['name' => 'Leather Watch - Classic Brown', 'price' => 2499, 'subcategory' => 'mens-accessories', 'images' => ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'], 'stock' => 50],
        ['name' => 'Stylish Sunglasses', 'price' => 1299, 'subcategory' => 'mens-accessories', 'images' => ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'], 'stock' => 75],
        ['name' => 'Premium Leather Wallet', 'price' => 899, 'subcategory' => 'mens-accessories', 'images' => ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=500', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500'], 'stock' => 100],
        ['name' => 'Classic Leather Belt', 'price' => 699, 'subcategory' => 'mens-accessories', 'images' => ['https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=500'], 'stock' => 80],
        ['name' => 'Designer Backpack', 'price' => 1999, 'subcategory' => 'mens-accessories', 'images' => ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500'], 'stock' => 45],

        // MEN'S T-SHIRTS (5 products)
        ['name' => 'Classic White T-Shirt', 'price' => 499, 'subcategory' => 'mens-tshirts', 'images' => ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500'], 'stock' => 150],
        ['name' => 'Black Graphic T-Shirt', 'price' => 599, 'subcategory' => 'mens-tshirts', 'images' => ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500'], 'stock' => 120],
        ['name' => 'Navy Blue Polo T-Shirt', 'price' => 799, 'subcategory' => 'mens-tshirts', 'images' => ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500'], 'stock' => 90],
        ['name' => 'Grey V-Neck T-Shirt', 'price' => 549, 'subcategory' => 'mens-tshirts', 'images' => ['https://images.unsplash.com/photo-1622445275576-721325763afe?w=500'], 'stock' => 110],
        ['name' => 'Striped Casual T-Shirt', 'price' => 649, 'subcategory' => 'mens-tshirts', 'images' => ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500'], 'stock' => 85],

        // MEN'S SHOES (5 products)
        ['name' => 'White Sneakers', 'price' => 2999, 'subcategory' => 'mens-shoes', 'images' => ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'], 'stock' => 60],
        ['name' => 'Black Formal Shoes', 'price' => 3499, 'subcategory' => 'mens-shoes', 'images' => ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500'], 'stock' => 50],
        ['name' => 'Brown Casual Loafers', 'price' => 2499, 'subcategory' => 'mens-shoes', 'images' => ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500'], 'stock' => 70],
        ['name' => 'Sports Running Shoes', 'price' => 3999, 'subcategory' => 'mens-shoes', 'images' => ['https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500'], 'stock' => 55],
        ['name' => 'Canvas Slip-On Shoes', 'price' => 1799, 'subcategory' => 'mens-shoes', 'images' => ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500'], 'stock' => 80],

        // WOMEN'S DRESSES (5 products)
        ['name' => 'Floral Summer Dress', 'price' => 1999, 'subcategory' => 'womens-dresses', 'images' => ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'], 'stock' => 65],
        ['name' => 'Black Evening Dress', 'price' => 3499, 'subcategory' => 'womens-dresses', 'images' => ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500'], 'stock' => 40],
        ['name' => 'Casual Maxi Dress', 'price' => 2499, 'subcategory' => 'womens-dresses', 'images' => ['https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=500'], 'stock' => 55],
        ['name' => 'Red Party Dress', 'price' => 2999, 'subcategory' => 'womens-dresses', 'images' => ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500'], 'stock' => 45],
        ['name' => 'White Midi Dress', 'price' => 2299, 'subcategory' => 'womens-dresses', 'images' => ['https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=500'], 'stock' => 70],

        // WOMEN'S T-SHIRTS (5 products)
        ['name' => 'Basic White Tee', 'price' => 449, 'subcategory' => 'womens-tshirts', 'images' => ['https://images.unsplash.com/photo-1503341733017-1901578f9f1e?w=500'], 'stock' => 140],
        ['name' => 'Pink Crop Top', 'price' => 599, 'subcategory' => 'womens-tshirts', 'images' => ['https://images.unsplash.com/photo-1627225925683-5e8f8df481a6?w=500'], 'stock' => 95],
        ['name' => 'Striped Casual Tee', 'price' => 549, 'subcategory' => 'womens-tshirts', 'images' => ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500'], 'stock' => 100],
        ['name' => 'Black V-Neck T-Shirt', 'price' => 499, 'subcategory' => 'womens-tshirts', 'images' => ['https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500'], 'stock' => 115],
        ['name' => 'Graphic Print Tee', 'price' => 649, 'subcategory' => 'womens-tshirts', 'images' => ['https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=500'], 'stock' => 85],

        // WOMEN'S PANTS (5 products)
        ['name' => 'Black Skinny Jeans', 'price' => 1499, 'subcategory' => 'womens-pants', 'images' => ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500'], 'stock' => 80],
        ['name' => 'Blue Denim Jeans', 'price' => 1699, 'subcategory' => 'womens-pants', 'images' => ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500'], 'stock' => 90],
        ['name' => 'Beige Formal Trousers', 'price' => 1799, 'subcategory' => 'womens-pants', 'images' => ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'], 'stock' => 70],
        ['name' => 'White Palazzo Pants', 'price' => 1299, 'subcategory' => 'womens-pants', 'images' => ['https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=500'], 'stock' => 65],
        ['name' => 'Grey Jogger Pants', 'price' => 1199, 'subcategory' => 'womens-pants', 'images' => ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'], 'stock' => 75],

        // WOMEN'S JEWELLERY (5 products)
        ['name' => 'Gold Plated Necklace', 'price' => 1999, 'subcategory' => 'womens-jewellery', 'images' => ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500'], 'stock' => 45],
        ['name' => 'Silver Earrings Set', 'price' => 1299, 'subcategory' => 'womens-jewellery', 'images' => ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500'], 'stock' => 60],
        ['name' => 'Pearl Bracelet', 'price' => 1599, 'subcategory' => 'womens-jewellery', 'images' => ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500'], 'stock' => 50],
        ['name' => 'Diamond Ring', 'price' => 3999, 'subcategory' => 'womens-jewellery', 'images' => ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500'], 'stock' => 30],
        ['name' => 'Statement Pendant', 'price' => 1799, 'subcategory' => 'womens-jewellery', 'images' => ['https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500'], 'stock' => 55],

        // KIDS T-SHIRTS (5 products)
        ['name' => 'Cartoon Print Tee - Boys', 'price' => 399, 'subcategory' => 'kids-tshirts', 'images' => ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500'], 'stock' => 100],
        ['name' => 'Colorful Striped Tee', 'price' => 349, 'subcategory' => 'kids-tshirts', 'images' => ['https://images.unsplash.com/photo-1596834227983-37e1bf48c86e?w=500'], 'stock' => 120],
        ['name' => 'Superhero Graphic Tee', 'price' => 449, 'subcategory' => 'kids-tshirts', 'images' => ['https://images.unsplash.com/photo-1576016770956-debb63e4d0d2?w=500'], 'stock' => 95],
        ['name' => 'Pink Princess Tee - Girls', 'price' => 399, 'subcategory' => 'kids-tshirts', 'images' => ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500'], 'stock' => 110],
        ['name' => 'Basic White Kids Tee', 'price' => 299, 'subcategory' => 'kids-tshirts', 'images' => ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500'], 'stock' => 130],

        // KIDS SHIRTS (5 products)
        ['name' => 'Checkered Casual Shirt', 'price' => 599, 'subcategory' => 'kids-shirts', 'images' => ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500'], 'stock' => 75],
        ['name' => 'Denim Shirt - Boys', 'price' => 699, 'subcategory' => 'kids-shirts', 'images' => ['https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500'], 'stock' => 65],
        ['name' => 'White Formal Shirt', 'price' => 649, 'subcategory' => 'kids-shirts', 'images' => ['https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500'], 'stock' => 70],
        ['name' => 'Colorful Hawaiian Shirt', 'price' => 549, 'subcategory' => 'kids-shirts', 'images' => ['https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500'], 'stock' => 60],
        ['name' => 'Striped Button-Down', 'price' => 599, 'subcategory' => 'kids-shirts', 'images' => ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500'], 'stock' => 80],

        // KIDS PANTS (5 products)
        ['name' => 'Blue Denim Jeans - Kids', 'price' => 799, 'subcategory' => 'kids-pants', 'images' => ['https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500'], 'stock' => 85],
        ['name' => 'Black Track Pants', 'price' => 599, 'subcategory' => 'kids-pants', 'images' => ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500'], 'stock' => 100],
        ['name' => 'Grey Jogger Pants', 'price' => 649, 'subcategory' => 'kids-pants', 'images' => ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500'], 'stock' => 90],
        ['name' => 'Khaki Cargo Pants', 'price' => 749, 'subcategory' => 'kids-pants', 'images' => ['https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500'], 'stock' => 75],
        ['name' => 'Pink Leggings - Girls', 'price' => 449, 'subcategory' => 'kids-pants', 'images' => ['https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=500'], 'stock' => 110],

        // KIDS SHORTS (5 products)
        ['name' => 'Blue Denim Shorts', 'price' => 499, 'subcategory' => 'kids-shorts', 'images' => ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500'], 'stock' => 95],
        ['name' => 'Red Sports Shorts', 'price' => 399, 'subcategory' => 'kids-shorts', 'images' => ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500'], 'stock' => 120],
        ['name' => 'Cargo Shorts - Boys', 'price' => 549, 'subcategory' => 'kids-shorts', 'images' => ['https://images.unsplash.com/photo-1624378440070-7da1b89ea680?w=500'], 'stock' => 85],
        ['name' => 'Cotton Casual Shorts', 'price' => 449, 'subcategory' => 'kids-shorts', 'images' => ['https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500'], 'stock' => 100],
        ['name' => 'Printed Beach Shorts', 'price' => 479, 'subcategory' => 'kids-shorts', 'images' => ['https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500'], 'stock' => 90],

        // KIDS DRESSES (5 products)
        ['name' => 'Pink Princess Dress', 'price' => 1299, 'subcategory' => 'kids-dresses', 'images' => ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500'], 'stock' => 50],
        ['name' => 'Floral Summer Dress', 'price' => 999, 'subcategory' => 'kids-dresses', 'images' => ['https://images.unsplash.com/photo-1518711612840-6f1f1f2e5e6c?w=500'], 'stock' => 65],
        ['name' => 'Party Frock - Girls', 'price' => 1499, 'subcategory' => 'kids-dresses', 'images' => ['https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500'], 'stock' => 45],
        ['name' => 'Cotton Casual Dress', 'price' => 799, 'subcategory' => 'kids-dresses', 'images' => ['https://images.unsplash.com/photo-1621570074981-c2ea05bfcc79?w=500'], 'stock' => 70],
        ['name' => 'Blue Denim Dress', 'price' => 1099, 'subcategory' => 'kids-dresses', 'images' => ['https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=500'], 'stock' => 60]
    ];

    $productCount = 0;
    foreach ($products as $product) {
        $subcategoryId = $subcategoryIds[$product['subcategory']];
        
        // Find parent category
        $subcatDoc = $db->getCollection('subcategories')->findOne(['_id' => $subcategoryId]);
        $categoryId = $subcatDoc['categoryId'];
        
        $productData = [
            'name' => $product['name'],
            'slug' => strtolower(str_replace(' ', '-', $product['name'])),
            'description' => 'Premium quality ' . $product['name'] . ' - Best in class product with excellent features and comfort',
            'price' => $product['price'],
            'originalPrice' => $product['price'] + 500,
            'stock' => $product['stock'],
            'images' => $product['images'],
            'categoryId' => $categoryId,
            'subcategoryId' => $subcategoryId,
            'category' => (string)$categoryId,
            'subcategory' => (string)$subcategoryId,
            'colors' => ['Black', 'Blue', 'White', 'Grey'],
            'sizes' => ['S', 'M', 'L', 'XL'],
            'isActive' => true,
            'isFeatured' => $productCount % 3 === 0,
            'rating' => 4.5,
            'reviews' => [],
            'createdAt' => new MongoDB\BSON\UTCDateTime(),
            'updatedAt' => new MongoDB\BSON\UTCDateTime()
        ];
        
        $db->getCollection('products')->insertOne($productData);
        $productCount++;
        
        if ($productCount % 5 === 0) {
            echo "  ✓ Created {$productCount} products...\n";
        }
    }
    
    echo "\n✅ Complete! Total products created: {$productCount}\n\n";
    
    // Summary
    echo "📊 Summary:\n";
    echo "  • Categories: " . count($categories) . "\n";
    echo "  • Subcategories: " . count($subcategories) . "\n";
    echo "  • Products: {$productCount}\n\n";
    
    echo "🎉 Database seeding completed successfully!\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
