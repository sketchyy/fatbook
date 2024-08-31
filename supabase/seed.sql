-- Collections
INSERT INTO "public"."collections"
("name")
VALUES
('Shared - all users can view this collection. Only Admin user can modify the collection.');

-- Dishes
INSERT INTO "public"."dishes"
("createdAt", "defaultPortion", "cookedWeight", "proteins", "fats", "carbs", "calories", "updatedAt", "id", "name", "hasIngredients", "deleted", "icon", "collectionId")
VALUES
('2023-06-29 11:06:38+00', '55', null, '36', '17', '29', '386', '2024-04-21 08:53:30.168673+00', '387', 'Barebells salty peanut', 'false', 'false', '🥫', '1'),
('2023-10-04 20:09:01+00', '28', null, '76', '6', '5', '384', '2024-07-27 14:39:40.684+00', '304', 'Biotech whey protein - bourbon vanilla', 'false', 'false', '🍼', '1'),
('2023-12-16 12:49:13+00', '239', null, '14', '12', '20', '249', '2024-04-21 08:53:30.168673+00', '660', 'Cheese & Bacon Burger KFC', 'false', 'false', '🥫', '1'),
('2024-05-27 11:29:45.672521+00', '25', null, '5.1', '14.8', '68.4', '436', '2024-05-27 11:30:31.85+00', '1226', 'Corny Schoko Banane ', 'false', 'false', null, '1'),
('2023-10-28 11:57:30+00', '150', null, '3.5', '5.1', '16', '125', '2024-04-21 08:53:30.168673+00', '1100', 'Landliebe Grieß pudding zimt', 'false', 'false', '🥫', '1'),
('2023-11-23 20:25:03+00', '550', null, '17', '1', '3.7', '92', '2024-04-21 08:53:30.168673+00', '718', 'Pulled chicken edeka', 'false', 'false', '🥫', '1'),
('2023-11-13 16:51:22+00', '150', null, '10', '2', '5.7', '83', '2024-04-21 08:53:30.168673+00', '781', 'rewe protein mousse', 'false', 'false', '🥫', '1'),
('2023-02-06 13:33:25+00', '50', null, '7', '5', '0.5', '157', '2024-04-21 08:53:30.168673+00', '692', 'Egg', 'false', 'false', '🥫', '1'),
('2023-01-23 11:08:05+00', null, null, '12.4', '1.3', '72', '357', '2024-04-21 08:53:30.168673+00', '539', 'Flour 13%', 'false', 'false', '🥫', '1'),
('2021-03-10 20:19:21+00', null, null, '1', '0', '23', '89', '2024-07-21 10:47:48.74+00', '1035', 'Banana', 'false', 'false', '🍌', '1'),
('2024-08-29 10:44:53.690035+00', null, '262', '5.1374', '1.27672', '34.6374', '183.073', '2024-08-29 11:08:10.692+00', '1339', 'Banana Pancakes', 'true', 'false', '', '1');

-- Ingredients
INSERT INTO "public"."ingredients"
("portion", "proteins", "fats", "carbs", "calories", "id", "dishId", "createdAt", "parentDishId", "test")
VALUES
('190', '1.9', '0', '43.7', '169.1', '925', '1035', '2024-08-29 10:45:03.242841+00', '1339', null),
('50', '3.5', '2.5', '0.25', '78.5', '926', '692', '2024-08-29 10:46:22.590599+00', '1339', null),
('65', '8.06', '0.845', '46.8', '232.05', '927', '539', '2024-08-29 10:47:54.439137+00', '1339', null);
