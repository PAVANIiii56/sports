/*
  # Add Demo Products and Data
  
  1. Demo Products
    - Adding 24 demo products across all categories:
      - Badminton: Rackets, shuttlecocks, nets
      - Cricket: Bats, balls, gloves, pads
      - Football: Balls, boots, shin guards
      - Basketball: Balls, hoops, jerseys
      - Tennis: Rackets, balls, grips
      - Fitness: Dumbbells, yoga mats, resistance bands
      - Sports Clothing: Jerseys, shorts, tracksuits
      - Accessories: Water bottles, bags, wristbands
    
  2. Demo Data Details
    - Each product includes:
      - Realistic title and description
      - Appropriate pricing in INR
      - Stock quantities
      - High-quality product images from Pexels
      - Proper category assignments
    
  3. Notes
    - All products use stock photos from Pexels
    - Stock levels vary to demonstrate inventory tracking
    - Products ready for immediate testing
*/

-- Badminton Products
INSERT INTO products (title, description, price, stock, category_id, images) VALUES
(
  'Yonex Nanoray Professional Badminton Racket',
  'Professional-grade badminton racket with carbon fiber construction. Lightweight design for maximum speed and control. Perfect for intermediate to advanced players.',
  3499.00,
  25,
  (SELECT id FROM categories WHERE slug = 'badminton'),
  '["https://images.pexels.com/photos/5739398/pexels-photo-5739398.jpeg"]'
),
(
  'Victor Premium Feather Shuttlecocks (Pack of 12)',
  'Tournament-grade feather shuttlecocks. Durable and consistent flight performance. Ideal for competitive play and training sessions.',
  899.00,
  50,
  (SELECT id FROM categories WHERE slug = 'badminton'),
  '["https://images.pexels.com/photos/8007461/pexels-photo-8007461.jpeg"]'
),
(
  'Portable Badminton Net Set',
  'Complete badminton net set with poles and carrying case. Easy to set up anywhere. Perfect for backyard games and outdoor fun.',
  1299.00,
  15,
  (SELECT id FROM categories WHERE slug = 'badminton'),
  '["https://images.pexels.com/photos/5739398/pexels-photo-5739398.jpeg"]'
);

-- Cricket Products
INSERT INTO products (title, description, price, stock, category_id, images) VALUES
(
  'MRF Genius Elite English Willow Cricket Bat',
  'Premium English willow cricket bat with excellent balance and stroke play. Hand-picked willow for professional players. Perfect middle and sweet spot.',
  8999.00,
  12,
  (SELECT id FROM categories WHERE slug = 'cricket'),
  '["https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg"]'
),
(
  'SG Test Red Leather Cricket Ball',
  'Professional test match quality leather cricket ball. Four-piece construction with excellent seam strength. Ideal for competitive matches.',
  599.00,
  40,
  (SELECT id FROM categories WHERE slug = 'cricket'),
  '["https://images.pexels.com/photos/5761857/pexels-photo-5761857.jpeg"]'
),
(
  'Professional Cricket Batting Gloves',
  'High-quality batting gloves with superior grip and protection. Reinforced finger guards and breathable mesh panels. Maximum comfort and safety.',
  1499.00,
  30,
  (SELECT id FROM categories WHERE slug = 'cricket'),
  '["https://images.pexels.com/photos/5761858/pexels-photo-5761858.jpeg"]'
),
(
  'Cricket Batting Pads - Professional Grade',
  'Lightweight and protective batting pads. Advanced shock absorption technology. Comfortable straps and ergonomic design for extended wear.',
  2199.00,
  20,
  (SELECT id FROM categories WHERE slug = 'cricket'),
  '["https://images.pexels.com/photos/5761858/pexels-photo-5761858.jpeg"]'
);

-- Football Products
INSERT INTO products (title, description, price, stock, category_id, images) VALUES
(
  'Nike Strike Pro Match Football',
  'FIFA-approved match football with superior touch and durability. High-contrast graphics for better visibility. Perfect for competitive matches and training.',
  2499.00,
  35,
  (SELECT id FROM categories WHERE slug = 'football'),
  '["https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg"]'
),
(
  'Adidas Predator Professional Football Boots',
  'Premium football boots with enhanced control and striking power. Lightweight synthetic upper with superior grip. Firm ground studs for optimal traction.',
  4999.00,
  18,
  (SELECT id FROM categories WHERE slug = 'football'),
  '["https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg"]'
),
(
  'Professional Shin Guards with Ankle Protection',
  'Lightweight shin guards with extended ankle protection. Breathable design with secure straps. Maximum safety without compromising mobility.',
  799.00,
  45,
  (SELECT id FROM categories WHERE slug = 'football'),
  '["https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg"]'
);

-- Basketball Products
INSERT INTO products (title, description, price, stock, category_id, images) VALUES
(
  'Spalding NBA Official Game Basketball',
  'Official NBA game basketball with genuine leather construction. Superior grip and consistent bounce. Tournament-ready performance.',
  3299.00,
  22,
  (SELECT id FROM categories WHERE slug = 'basketball'),
  '["https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg"]'
),
(
  'Portable Basketball Hoop System',
  'Adjustable height basketball system with shatterproof backboard. Weather-resistant construction. Easy to assemble and move. Perfect for driveways and courts.',
  12999.00,
  8,
  (SELECT id FROM categories WHERE slug = 'basketball'),
  '["https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg"]'
),
(
  'Professional Basketball Jersey',
  'Premium basketball jersey with moisture-wicking fabric. Breathable mesh construction. Available in multiple sizes. Team-ready design.',
  1299.00,
  40,
  (SELECT id FROM categories WHERE slug = 'basketball'),
  '["https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg"]'
);

-- Tennis Products
INSERT INTO products (title, description, price, stock, category_id, images) VALUES
(
  'Wilson Pro Staff Tennis Racket',
  'Professional tennis racket with precision control. Graphite composite frame for power and stability. Perfect for advanced players seeking tournament performance.',
  4299.00,
  15,
  (SELECT id FROM categories WHERE slug = 'tennis'),
  '["https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg"]'
),
(
  'Penn Championship Tennis Balls (Can of 3)',
  'USTA approved championship tennis balls. Consistent performance and durability. Ideal for practice and competitive matches.',
  399.00,
  60,
  (SELECT id FROM categories WHERE slug = 'tennis'),
  '["https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg"]'
),
(
  'Professional Tennis Racket Overgrip (Pack of 6)',
  'High-quality overgrips for enhanced comfort and control. Moisture-absorbing material with tacky feel. Easy to apply and replace.',
  499.00,
  50,
  (SELECT id FROM categories WHERE slug = 'tennis'),
  '["https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg"]'
);

-- Fitness Products
INSERT INTO products (title, description, price, stock, category_id, images) VALUES
(
  'Adjustable Dumbbell Set (20kg Pair)',
  'Professional adjustable dumbbells with secure locking mechanism. Space-saving design with multiple weight options. Perfect for home gym workouts.',
  3999.00,
  20,
  (SELECT id FROM categories WHERE slug = 'fitness'),
  '["https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg"]'
),
(
  'Premium Yoga Mat with Carrying Strap',
  'Extra-thick yoga mat with superior cushioning and grip. Non-slip surface for safe practice. Eco-friendly and easy to clean. Includes carrying strap.',
  1299.00,
  35,
  (SELECT id FROM categories WHERE slug = 'fitness'),
  '["https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg"]'
),
(
  'Resistance Bands Set (5 Levels)',
  'Complete resistance band set with varying strengths. Durable latex construction. Includes door anchor and carrying pouch. Perfect for full-body workouts.',
  899.00,
  45,
  (SELECT id FROM categories WHERE slug = 'fitness'),
  '["https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg"]'
);

-- Sports Clothing Products
INSERT INTO products (title, description, price, stock, category_id, images) VALUES
(
  'Nike Dri-FIT Training Jersey',
  'Moisture-wicking performance jersey. Lightweight and breathable fabric. Available in multiple colors and sizes. Perfect for all sports activities.',
  1499.00,
  50,
  (SELECT id FROM categories WHERE slug = 'sports-clothing'),
  '["https://images.pexels.com/photos/8007461/pexels-photo-8007461.jpeg"]'
),
(
  'Adidas Sports Performance Shorts',
  'Comfortable athletic shorts with elastic waistband. Quick-dry technology and side pockets. Ideal for running, gym, and sports training.',
  999.00,
  60,
  (SELECT id FROM categories WHERE slug = 'sports-clothing'),
  '["https://images.pexels.com/photos/8007461/pexels-photo-8007461.jpeg"]'
),
(
  'Premium Sports Tracksuit Set',
  'Complete tracksuit with jacket and pants. Soft fleece lining for warmth. Stylish design with zippered pockets. Perfect for warm-ups and casual wear.',
  2999.00,
  25,
  (SELECT id FROM categories WHERE slug = 'sports-clothing'),
  '["https://images.pexels.com/photos/8007461/pexels-photo-8007461.jpeg"]'
);

-- Accessories Products
INSERT INTO products (title, description, price, stock, category_id, images) VALUES
(
  'Insulated Sports Water Bottle (1 Liter)',
  'Double-wall insulated water bottle. Keeps drinks cold for 24 hours. Leak-proof design with easy-carry handle. BPA-free and dishwasher safe.',
  599.00,
  70,
  (SELECT id FROM categories WHERE slug = 'accessories'),
  '["https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg"]'
),
(
  'Professional Sports Duffle Bag',
  'Spacious duffle bag with multiple compartments. Water-resistant material with reinforced stitching. Includes shoe compartment and adjustable shoulder strap.',
  1799.00,
  30,
  (SELECT id FROM categories WHERE slug = 'accessories'),
  '["https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg"]'
),
(
  'Sweatband Wristband Set (Pack of 4)',
  'Absorbent cotton wristbands for sports activities. Comfortable elastic fit. Available in multiple colors. Perfect for tennis, basketball, and gym workouts.',
  299.00,
  80,
  (SELECT id FROM categories WHERE slug = 'accessories'),
  '["https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg"]'
);
