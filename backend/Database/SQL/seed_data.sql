-- Сиды: магазины
INSERT INTO Shops (Name, Address, Latitude, Longitude)
VALUES ('Rose Paradise', '123 Main St, City A', 55.751244, 37.618423),
       ('Tulip Dreams', '45 Garden Ave, City B', 56.838011, 60.597465),
       ('Lily Valley', '78 River Rd, City C', 59.934280, 30.335099),
       ('Sunflower House', '12 Sunshine Blvd, City D', 50.450100, 30.523400),
       ('Orchid Elegance', '9 Orchid St, City E', 48.379433, 31.165579),
       ('Daisy Corner', '101 Bloom Ln, City F', 49.993500, 36.230385),
       ('Peony Garden', '67 Peony Rd, City G', 47.838800, 35.139600),
       ('Camellia Studio', '88 Sakura St, City H', 46.482526, 30.723309),
       ('Violet Dreams', '11 Purple Ave, City I', 50.907700, 34.798100),
       ('Magnolia Charm', '5 Magnolia Way, City J', 51.505500, -0.075400);


-- Сиды: цветы
INSERT INTO Flowers (ShopId, Name, Description, Price, ImageUrl)
VALUES
-- Магазин 1
(1, 'Red Rose', 'Classic red rose', 5.50, 'rose_red.jpg'),
(1, 'White Rose', 'Elegant white rose', 5.20, 'rose_white.jpg'),
(1, 'Pink Rose', 'Romantic pink rose', 5.30, 'rose_pink.jpg'),
(1, 'Yellow Rose', 'Sunny yellow rose', 5.10, 'rose_yellow.jpg'),
(1, 'Rose Bouquet', 'Mixed rose bouquet', 25.00, 'rose_bouquet.jpg'),
(1, 'Mini Rose', 'Small rose stem', 3.50, 'rose_mini.jpg'),
(1, 'Rose with Baby''s Breath', 'Rose with gypsophila', 8.00, 'rose_mix.jpg'),
(1, 'Rose Basket', 'Basket with roses', 40.00, 'rose_basket.jpg'),
(1, 'Rose Heart', 'Heart-shaped rose arrangement', 50.00, 'rose_heart.jpg'),
(1, 'Luxury Rose Box', 'Premium roses in box', 70.00, 'rose_box.jpg'),

-- Магазин 2
(2, 'Red Tulip', 'Fresh red tulip', 4.00, 'tulip_red.jpg'),
(2, 'Yellow Tulip', 'Bright yellow tulip', 4.20, 'tulip_yellow.jpg'),
(2, 'Pink Tulip', 'Soft pink tulip', 4.10, 'tulip_pink.jpg'),
(2, 'White Tulip', 'Snow-white tulip', 4.00, 'tulip_white.jpg'),
(2, 'Orange Tulip', 'Vibrant orange tulip', 4.30, 'tulip_orange.jpg'),
(2, 'Tulip Mix', 'Mixed tulip bouquet', 20.00, 'tulip_mix.jpg'),
(2, 'Mini Tulip', 'Small tulip stem', 2.50, 'tulip_mini.jpg'),
(2, 'Tulip Basket', 'Tulips in basket', 35.00, 'tulip_basket.jpg'),
(2, 'Tulip Heart', 'Heart arrangement with tulips', 45.00, 'tulip_heart.jpg'),
(2, 'Luxury Tulip Box', 'Premium tulips in box', 60.00, 'tulip_box.jpg'),

-- Магазин 3
(3, 'White Lily', 'Elegant white lily', 6.00, 'lily_white.jpg'),
(3, 'Pink Lily', 'Romantic pink lily', 6.20, 'lily_pink.jpg'),
(3, 'Yellow Lily', 'Bright yellow lily', 6.10, 'lily_yellow.jpg'),
(3, 'Orange Lily', 'Exotic orange lily', 6.50, 'lily_orange.jpg'),
(3, 'Lily Bouquet', 'Mixed lily bouquet', 30.00, 'lily_bouquet.jpg'),
(3, 'Mini Lily', 'Small lily stem', 4.50, 'lily_mini.jpg'),
(3, 'Lily Basket', 'Lily basket', 45.00, 'lily_basket.jpg'),
(3, 'Lily Heart', 'Heart-shaped lily design', 55.00, 'lily_heart.jpg'),
(3, 'Lily Deluxe Box', 'Premium lily box', 65.00, 'lily_box.jpg'),
(3, 'Exotic Lily Mix', 'Special lily arrangement', 75.00, 'lily_exotic.jpg'),

-- Магазин 4
(4, 'Sunflower', 'Large sunflower stem', 3.50, 'sunflower.jpg'),
(4, 'Mini Sunflower', 'Small sunflower stem', 2.50, 'sunflower_mini.jpg'),
(4, 'Sunflower Bunch', 'Bouquet of sunflowers', 15.00, 'sunflower_bunch.jpg'),
(4, 'Sunflower Basket', 'Basket with sunflowers', 30.00, 'sunflower_basket.jpg'),
(4, 'Sunflower Heart', 'Heart of sunflowers', 40.00, 'sunflower_heart.jpg'),
(4, 'Sunflower Mix', 'Mixed bouquet with sunflowers', 25.00, 'sunflower_mix.jpg'),
(4, 'Sunflower Deluxe', 'Premium sunflower bouquet', 50.00, 'sunflower_deluxe.jpg'),
(4, 'Sunflower Box', 'Gift box with sunflowers', 35.00, 'sunflower_box.jpg'),
(4, 'Sunflower Charm', 'Special sunflower design', 45.00, 'sunflower_charm.jpg'),
(4, 'Golden Sunflower', 'Rare golden sunflower', 55.00, 'sunflower_golden.jpg'),

-- Магазин 5
(5, 'White Orchid', 'Elegant orchid stem', 12.00, 'orchid_white.jpg'),
(5, 'Pink Orchid', 'Beautiful pink orchid', 12.50, 'orchid_pink.jpg'),
(5, 'Purple Orchid', 'Royal purple orchid', 13.00, 'orchid_purple.jpg'),
(5, 'Blue Orchid', 'Rare blue orchid', 15.00, 'orchid_blue.jpg'),
(5, 'Orchid Bouquet', 'Mixed orchid bouquet', 45.00, 'orchid_bouquet.jpg'),
(5, 'Mini Orchid', 'Miniature orchid stem', 9.00, 'orchid_mini.jpg'),
(5, 'Orchid Basket', 'Basket of orchids', 60.00, 'orchid_basket.jpg'),
(5, 'Orchid Heart', 'Heart with orchids', 75.00, 'orchid_heart.jpg'),
(5, 'Luxury Orchid Box', 'Premium orchids in box', 90.00, 'orchid_box.jpg'),
(5, 'Exotic Orchid Mix', 'Special orchid design', 100.00, 'orchid_exotic.jpg'),

-- Магазин 6
(6, 'White Daisy', 'Fresh white daisy', 2.50, 'daisy_white.jpg'),
(6, 'Yellow Daisy', 'Cheerful yellow daisy', 2.80, 'daisy_yellow.jpg'),
(6, 'Pink Daisy', 'Cute pink daisy', 3.00, 'daisy_pink.jpg'),
(6, 'Daisy Mix', 'Bouquet of mixed daisies', 12.00, 'daisy_mix.jpg'),
(6, 'Daisy Basket', 'Basket of daisies', 20.00, 'daisy_basket.jpg'),
(6, 'Daisy Heart', 'Heart of daisies', 30.00, 'daisy_heart.jpg'),
(6, 'Daisy Deluxe', 'Premium daisy bouquet', 40.00, 'daisy_deluxe.jpg'),
(6, 'Mini Daisy', 'Small daisy stem', 1.50, 'daisy_mini.jpg'),
(6, 'Daisy Charm', 'Special daisy arrangement', 25.00, 'daisy_charm.jpg'),
(6, 'Golden Daisy', 'Rare golden daisy', 35.00, 'daisy_golden.jpg'),

-- Магазин 7
(7, 'Pink Peony', 'Soft pink peony', 7.00, 'peony_pink.jpg'),
(7, 'White Peony', 'Elegant white peony', 7.20, 'peony_white.jpg'),
(7, 'Red Peony', 'Bright red peony', 7.30, 'peony_red.jpg'),
(7, 'Peony Mix', 'Bouquet of peonies', 30.00, 'peony_mix.jpg'),
(7, 'Peony Basket', 'Basket of peonies', 50.00, 'peony_basket.jpg'),
(7, 'Peony Heart', 'Heart-shaped peonies', 65.00, 'peony_heart.jpg'),
(7, 'Mini Peony', 'Small peony stem', 5.00, 'peony_mini.jpg'),
(7, 'Peony Deluxe', 'Premium peony bouquet', 80.00, 'peony_deluxe.jpg'),
(7, 'Peony Charm', 'Special peony design', 55.00, 'peony_charm.jpg'),
(7, 'Golden Peony', 'Rare golden peony', 95.00, 'peony_golden.jpg'),

-- Магазин 8
(8, 'White Camellia', 'Pure white camellia', 10.00, 'camellia_white.jpg'),
(8, 'Pink Camellia', 'Soft pink camellia', 10.50, 'camellia_pink.jpg'),
(8, 'Red Camellia', 'Bright red camellia', 11.00, 'camellia_red.jpg'),
(8, 'Camellia Mix', 'Bouquet of camellias', 35.00, 'camellia_mix.jpg'),
(8, 'Camellia Basket', 'Basket of camellias', 55.00, 'camellia_basket.jpg'),
(8, 'Camellia Heart', 'Heart with camellias', 70.00, 'camellia_heart.jpg'),
(8, 'Mini Camellia', 'Small camellia stem', 8.00, 'camellia_mini.jpg'),
(8, 'Camellia Deluxe', 'Premium camellia bouquet', 85.00, 'camellia_deluxe.jpg'),
(8, 'Camellia Charm', 'Special camellia design', 60.00, 'camellia_charm.jpg'),
(8, 'Golden Camellia', 'Rare golden camellia', 95.00, 'camellia_golden.jpg'),

-- Магазин 9
(9, 'Purple Violet', 'Deep purple violet', 3.50, 'violet_purple.jpg'),
(9, 'White Violet', 'Elegant white violet', 3.70, 'violet_white.jpg'),
(9, 'Pink Violet', 'Soft pink violet', 3.60, 'violet_pink.jpg'),
(9, 'Blue Violet', 'Rare blue violet', 4.00, 'violet_blue.jpg'),
(9, 'Violet Mix', 'Mixed violet bouquet', 15.00, 'violet_mix.jpg'),
(9, 'Mini Violet', 'Small violet stem', 2.00, 'violet_mini.jpg'),
(9, 'Violet Basket', 'Basket of violets', 28.00, 'violet_basket.jpg'),
(9, 'Violet Heart', 'Heart arrangement of violets', 38.00, 'violet_heart.jpg'),
(9, 'Violet Deluxe', 'Premium violet bouquet', 45.00, 'violet_deluxe.jpg'),
(9, 'Golden Violet', 'Rare golden violet', 55.00, 'violet_golden.jpg'),

-- Магазин 10
(10, 'White Magnolia', 'Elegant white magnolia', 8.00, 'magnolia_white.jpg'),
(10, 'Pink Magnolia', 'Soft pink magnolia', 8.50, 'magnolia_pink.jpg'),
(10, 'Purple Magnolia', 'Royal purple magnolia', 9.00, 'magnolia_purple.jpg'),
(10, 'Magnolia Mix', 'Mixed magnolia bouquet', 28.00, 'magnolia_mix.jpg'),
(10, 'Magnolia Basket', 'Basket of magnolias', 45.00, 'magnolia_basket.jpg'),
(10, 'Magnolia Heart', 'Heart-shaped magnolia design', 60.00, 'magnolia_heart.jpg'),
(10, 'Mini Magnolia', 'Small magnolia stem', 6.00, 'magnolia_mini.jpg'),
(10, 'Magnolia Deluxe', 'Premium magnolia bouquet', 75.00, 'magnolia_deluxe.jpg'),
(10, 'Magnolia Charm', 'Special magnolia arrangement', 55.00, 'magnolia_charm.jpg'),
(10, 'Golden Magnolia', 'Rare golden magnolia', 95.00, 'magnolia_golden.jpg');


-- Сиды: заказы
INSERT INTO Orders (Id, Email, Phone, DeliveryAddress, DeliveryLatitude, DeliveryLongitude, TotalPrice, UserTimezone)
VALUES ('ord-0001', 'alice@example.com', '+380111111111', 'Kyiv, Main St 1', 50.4501, 30.5234, 25.50, 'Europe/Kiev'),
       ('ord-0002', 'bob@example.com', '+380222222222', 'Lviv, Market Sq 5', 49.8397, 24.0297, 40.00, 'Europe/Kiev'),
       ('ord-0003', 'carol@example.com', '+380333333333', 'Odesa, Sea St 7', 46.4825, 30.7233, 15.00, 'Europe/Kiev'),
       ('ord-0004', 'dave@example.com', '+380444444444', 'Dnipro, River 12', 48.4670, 35.0400, 55.00, 'Europe/Kiev'),
       ('ord-0005', 'eva@example.com', '+380555555555', 'Kharkiv, Freedom 3', 49.9935, 36.2304, 33.00, 'Europe/Kiev'),
       ('ord-0006', 'frank@example.com', '+380666666666', 'Kyiv, Park Ave 9', 50.4547, 30.5238, 20.00, 'Europe/Kiev'),
       ('ord-0007', 'grace@example.com', '+380777777777', 'Lutsk, Flower 2', 50.7472, 25.3254, 65.00, 'Europe/Kiev'),
       ('ord-0008', 'henry@example.com', '+380888888888', 'Rivne, Garden 10', 50.6199, 26.2516, 48.00, 'Europe/Kiev'),
       ('ord-0009', 'irina@example.com', '+380999999999', 'Poltava, Center 8', 49.5883, 34.5514, 27.00, 'Europe/Kiev'),
       ('ord-0010', 'jack@example.com', '+380101010101', 'Sumy, Street 6', 50.9077, 34.7981, 19.50, 'Europe/Kiev'),
       ('ord-0011', 'kate@example.com', '+380111122233', 'Chernihiv, Road 4', 51.4982, 31.2893, 29.00, 'Europe/Kiev'),
       ('ord-0012', 'leo@example.com', '+380121212121', 'Zaporizhzhia, St 7', 47.8388, 35.1396, 42.00, 'Europe/Kiev'),
       ('ord-0013', 'mila@example.com', '+380131313131', 'Vinnytsia, Blvd 2', 49.2331, 28.4682, 36.00, 'Europe/Kiev'),
       ('ord-0014', 'nick@example.com', '+380141414141', 'Zhytomyr, St 5', 50.2547, 28.6587, 50.00, 'Europe/Kiev'),
       ('ord-0015', 'olga@example.com', '+380151515151', 'Chernivtsi, Road 11', 48.2915, 25.9403, 22.00, 'Europe/Kiev'),
       ('ord-0016', 'peter@example.com', '+380161616161', 'Uzhhorod, St 9', 48.6208, 22.2879, 18.00, 'Europe/Kiev'),
       ('ord-0017', 'quinn@example.com', '+380171717171', 'Ternopil, Sq 3', 49.5535, 25.5948, 45.00, 'Europe/Kiev'),
       ('ord-0018', 'rita@example.com', '+380181818181', 'Ivano-Frankivsk 7', 48.9226, 24.7111, 39.00, 'Europe/Kiev'),
       ('ord-0019', 'steve@example.com', '+380191919191', 'Kherson, Port 12', 46.6354, 32.6169, 31.00, 'Europe/Kiev'),
       ('ord-0020', 'tina@example.com', '+380202020202', 'Mykolaiv, River 8', 46.9750, 31.9946, 26.00, 'Europe/Kiev');


-- Сиды: позиции заказов
INSERT INTO OrderItems (OrderId, FlowerId, Quantity)
VALUES ('ord-0001', 1, 3),
       ('ord-0001', 5, 1),
       ('ord-0002', 11, 5),
       ('ord-0002', 15, 2),
       ('ord-0003', 21, 2),
       ('ord-0003', 25, 1),
       ('ord-0004', 31, 4),
       ('ord-0004', 35, 1),
       ('ord-0005', 41, 3),
       ('ord-0005', 45, 2),
       ('ord-0006', 51, 1),
       ('ord-0006', 55, 2),
       ('ord-0007', 61, 5),
       ('ord-0007', 65, 1),
       ('ord-0008', 71, 3),
       ('ord-0008', 75, 2),
       ('ord-0009', 81, 2),
       ('ord-0009', 85, 1),
       ('ord-0010', 91, 3),
       ('ord-0010', 95, 1),
       ('ord-0011', 2, 2),
       ('ord-0011', 6, 1),
       ('ord-0012', 12, 4),
       ('ord-0012', 16, 1),
       ('ord-0013', 22, 3),
       ('ord-0013', 26, 1),
       ('ord-0014', 32, 2),
       ('ord-0014', 36, 2),
       ('ord-0015', 42, 1),
       ('ord-0015', 46, 2),
       ('ord-0016', 52, 3),
       ('ord-0016', 56, 1),
       ('ord-0017', 62, 2),
       ('ord-0017', 66, 2),
       ('ord-0018', 72, 3),
       ('ord-0018', 76, 1),
       ('ord-0019', 82, 2),
       ('ord-0019', 86, 2),
       ('ord-0020', 92, 1),
       ('ord-0020', 96, 2);


INSERT INTO Coupons (Code, Discount)
VALUES ('WELCOME10', 10.0),
       ('SPRING20', 20.0),
       ('LOVE5', 5.0),
       ('VIP30', 30.0);
