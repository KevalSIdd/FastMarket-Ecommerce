-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 31, 2024 at 12:43 PM
-- Server version: 8.0.36-0ubuntu0.20.04.1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecomm`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int NOT NULL,
  `vAddressName` varchar(150) NOT NULL,
  `vAddressLine1` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `vAddressLine2` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `vCity` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `vState` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `vCountry` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `vPhone` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `iPincode` int DEFAULT NULL,
  `iUserId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `vAddressName`, `vAddressLine1`, `vAddressLine2`, `vCity`, `vState`, `vCountry`, `vPhone`, `iPincode`, `iUserId`) VALUES
(170, 'home', '121-Sachet', 'dfghdfg', 'aaaqq', 'gujratsdsd', 'indiafdf', NULL, 345323, 28),
(171, 'office', 'KevalSiddhpura', 'asasasassdsdsdsd12323', 'VVVVVV', 'gujrathh', 'indiassssdfdf', NULL, 123456, 28),
(172, 'office', 'KevalSiddhpura', 'asasasassdsdsdsd12323', 'khambhalia3434343', 'gujratsf', 'indiassssdfdf', NULL, 234545, 28),
(173, 'home', 'KevalSiddhpura', 'asasasassdsdsdsd12323', 'khambhalia3434343', 'gujrathh', 'indiafdf', NULL, 233333, 28),
(174, 'office', '121-Sachet', 'optional-122', 'aaaqq', 'gujratsdsd', 'india', NULL, 111111, 28),
(175, 'home', 'KevalSiddhpura', 'dfghdfg', 'khambhalia3434343', 'gujratsdsd', 'indiafdf', NULL, 234545, 28),
(176, 'home', '121-london', 'asasasassdsdsdsd12323', 'khambhalia3434343', 'gujratsdsd', 'indiafdf', NULL, 234545, 28),
(178, 'home', 'KevalSiddhpura', 'asasasassdsdsdsd12323', 'aaaqq', 'gujratsdsd', 'indiafdf', NULL, 111111, 28),
(179, 'office', '121-Sachet', 'optional-122', 'ahmedabad', 'gujratwwew', 'indiafdf', NULL, 234545, 28),
(180, 'home', 'KevalSiddhpura', 'asasasassdsdsdsd12323', 'khambhaliadfdfd', 'gujratsdsd', 'indiassssdfdf', NULL, 345323, 28),
(181, 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', NULL, 234545, 28);

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `iUserCartId` int DEFAULT NULL,
  `iProductId` int DEFAULT NULL,
  `iQty` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'Shoes'),
(2, 'Electronics'),
(3, 'watch'),
(5, 'footware'),
(6, 'spacks');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `iOrderNumber` varchar(255) DEFAULT NULL,
  `dtOrderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dSubTotal` decimal(10,2) DEFAULT '0.00',
  `dDiscount` decimal(10,2) DEFAULT '0.00',
  `eStatus` enum('Pending','Accepted','Rejected') NOT NULL DEFAULT 'Pending',
  `vShippingAddress` int DEFAULT NULL,
  `dNetPayable` decimal(10,2) NOT NULL DEFAULT '0.00',
  `ePayoutStatus` enum('Pending','Processing','Paid','Failed','Cancelled','OnHold') NOT NULL DEFAULT 'Pending',
  `dPayoutDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `BillingName` varchar(255) NOT NULL,
  `BillingAddress1` varchar(255) NOT NULL,
  `BillingAddress2` varchar(255) NOT NULL,
  `BillingCity` varchar(255) NOT NULL,
  `BillingState` varchar(255) NOT NULL,
  `BillingCountry` varchar(255) NOT NULL,
  `ShippingName` varchar(255) NOT NULL,
  `ShippingAddress1` varchar(255) NOT NULL,
  `ShippingAddress2` varchar(255) NOT NULL,
  `ShippingCity` varchar(255) NOT NULL,
  `ShippingState` varchar(255) NOT NULL,
  `ShippingCountry` varchar(255) NOT NULL,
  `dtAddedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `iOrderNumber`, `dtOrderDate`, `dSubTotal`, `dDiscount`, `eStatus`, `vShippingAddress`, `dNetPayable`, `ePayoutStatus`, `dPayoutDate`, `BillingName`, `BillingAddress1`, `BillingAddress2`, `BillingCity`, `BillingState`, `BillingCountry`, `ShippingName`, `ShippingAddress1`, `ShippingAddress2`, `ShippingCity`, `ShippingState`, `ShippingCountry`, `dtAddedDate`) VALUES
(272, 28, 'ORD-20240508000001', '2024-05-08 11:11:31', '240.99', '0.00', 'Pending', NULL, '240.99', 'Pending', '2024-05-08 11:11:31', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', '2024-05-08 11:11:31'),
(273, 28, 'ORD-20240521000002', '2024-05-21 10:33:37', '39.99', '0.00', 'Pending', NULL, '39.99', 'Pending', '2024-05-21 10:33:37', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', '2024-05-21 10:33:37'),
(274, 28, 'ORD-20240521000003', '2024-05-21 10:35:38', '100.00', '0.00', 'Pending', NULL, '100.00', 'Pending', '2024-05-21 10:35:38', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', '2024-05-21 10:35:38'),
(275, 28, 'ORD-20240521000004', '2024-05-21 10:44:36', '250.00', '0.00', 'Pending', NULL, '250.00', 'Pending', '2024-05-21 10:44:36', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', '2024-05-21 10:44:36'),
(276, 28, 'ORD-20240521000005', '2024-05-21 10:48:57', '446.77', '0.00', 'Pending', NULL, '446.77', 'Pending', '2024-05-21 10:48:57', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', 'office', 'Keval1231212', 'optional-122', 'khambhalia', 'gujratsdsd', 'indiafdf', '2024-05-21 10:48:57');

-- --------------------------------------------------------

--
-- Table structure for table `orders_details`
--

CREATE TABLE `orders_details` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `dTotalAmount` decimal(10,2) DEFAULT '0.00',
  `dtAddedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `vName` varchar(255) DEFAULT NULL,
  `tImage` text,
  `tDescription` text,
  `tShortDescription` text,
  `dSubTotal` decimal(10,2) DEFAULT NULL,
  `dPrice` decimal(10,2) NOT NULL DEFAULT '0.00',
  `isRated` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `orders_details`
--

INSERT INTO `orders_details` (`id`, `order_id`, `product_id`, `quantity`, `dTotalAmount`, `dtAddedDate`, `vName`, `tImage`, `tDescription`, `tShortDescription`, `dSubTotal`, `dPrice`, `isRated`) VALUES
(181, 272, 1, 1, '240.99', '2024-05-08 05:41:31', 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Gaming console', '240.99', '240.99', 1),
(182, 273, 3, 1, '39.99', '2024-05-21 05:03:37', 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://m.media-amazon.com/images/I/71Lg9MyMoEL._SY625_.jpg', 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'SPORTS SHOES', '39.99', '39.99', 1),
(183, 274, 55, 1, '100.00', '2024-05-21 05:05:38', 'EvoFox Blaze Programmable Gaming Mouse with 1000Hz Polling Rate ', 'https://m.media-amazon.com/images/I/516kq12OmmL._SX569_.jpg', 'Elevate your gaming experience with the EvoFox Blaze Programmable RGB Gaming Mouse, offering customizable DPI settings from 200 to 12800 for precise control and a 7000 FPS, 500Hz polling rate for ultra-responsiveness.', 'Gaming Mouse', '100.00', '100.00', 1),
(184, 275, 4, 1, '250.00', '2024-05-21 05:14:36', 'Xbox Series X', 'https://m.media-amazon.com/images/I/61-jjE67uqL._SX569_.jpg', 'ntroducing Xbox series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox series X', 'Gaming console', '250.00', '250.00', 1),
(185, 276, 56, 1, '446.77', '2024-05-21 05:18:57', 'HP Laptop 15s, 12th Gen Intel Core i3, 15.6-inch (39.6 cm)', 'https://m.media-amazon.com/images/I/71f2lQ3ESWL._SX569_.jpg', '6-core 12th Gen Intel Core i3-1215U? 8 threads and 10MB L3 cache deliver high performance and instant responsiveness. The Intel UHD graphics help you dive into crisp, stunning visuals.;?Upgraded memory and storage? 8GB DDR4 RAM and 512GB SSD help you undertake improved multitasking with ample of storage and higher-bandwidth memory. Now, create, browse, and work as you please.', '8GB DDR4, 512GB SSD, Thin & Light, Dual Speakers (Win 11, MSO 2021, Silver, 1.69 kg), fq5007TU / FQ5327TU', '446.77', '446.77', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productReview`
--

CREATE TABLE `productReview` (
  `ProductReviewId` int NOT NULL,
  `productId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `rating` decimal(10,2) NOT NULL DEFAULT '0.00',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `AddedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ModifiedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productReview`
--

INSERT INTO `productReview` (`ProductReviewId`, `productId`, `userId`, `rating`, `description`, `AddedDate`, `ModifiedDate`) VALUES
(60, 1, 28, '5.00', 'vbbbbb', '2024-05-08 11:11:55', '2024-05-08 11:11:55'),
(61, 3, 28, '4.00', 'nice shoes', '2024-05-21 10:33:54', '2024-05-21 10:33:54'),
(62, 55, 28, '4.00', 'nice', '2024-05-21 10:36:00', '2024-05-21 10:36:00'),
(63, 4, 28, '4.00', 'nice!!!', '2024-05-21 10:45:11', '2024-05-21 10:45:11'),
(64, 56, 28, '4.00', 'nn', '2024-05-21 10:49:27', '2024-05-21 10:49:27');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `images` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `quantity` int NOT NULL,
  `short_desc` varchar(255) NOT NULL,
  `cat_id` int DEFAULT NULL,
  `iUserId` int NOT NULL,
  `eStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `dtAddedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dtModifiedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dRating` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avgRating` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `images`, `description`, `price`, `quantity`, `short_desc`, `cat_id`, `iUserId`, `eStatus`, `dtAddedDate`, `dtModifiedDate`, `dRating`, `avgRating`) VALUES
(1, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd;https://img.etimg.com/thumb/width-640,height-480,imgsize-76492,resizemode-1,msid-52464286/46.jpg', 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', '240.99', 58, 'Gaming console', 2, 0, 'Active', '2024-03-15 09:35:34', '2024-03-15 09:35:34', '0.00', '5.0'),
(2, 'NIKE Pegasus 38 Men\'s Road Running Shoes', 'https://m.media-amazon.com/images/I/412ePZlZ1HL._SY625_.jpg', 'https://m.media-amazon.com/images/I/412ePZlZ1HL._SY625_.jpg;https://m.media-amazon.com/images/I/41+MjoeCNBL._SY625_.jpg;https://m.media-amazon.com/images/I/51TX1FmXJvL._SY625_.jpg', 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training', '59.99', 65, 'SPORTS SHOES', 1, 0, 'Active', '2024-03-15 09:35:34', '2024-03-15 09:35:34', '2.00', '0.0'),
(3, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://m.media-amazon.com/images/I/71Lg9MyMoEL._SY625_.jpg', 'https://m.media-amazon.com/images/I/71Lg9MyMoEL._SY625_.jpg;https://m.media-amazon.com/images/I/818Ps66h+DL._SY625_.jpg;https://m.media-amazon.com/images/I/81pUTjWpOfL._SY625_.jpg', 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', '39.99', 43, 'SPORTS SHOES', 1, 0, 'Active', '2024-03-15 09:35:34', '2024-03-15 09:35:34', '0.00', '4.0'),
(4, 'Xbox Series X', 'https://m.media-amazon.com/images/I/61-jjE67uqL._SX569_.jpg', 'https://m.media-amazon.com/images/I/61-jjE67uqL._SX569_.jpg;https://m.media-amazon.com/images/I/61t5fwwB0zL._SX569_.jpg;https://m.media-amazon.com/images/I/71NmQrmK3iL._SX569_.jpg', 'ntroducing Xbox series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox series X', '250.00', 177, 'Gaming console', 2, 0, 'Active', '2024-03-15 09:35:34', '2024-03-15 09:35:34', '0.00', '4.0'),
(55, 'EvoFox Blaze Programmable Gaming Mouse with 1000Hz Polling Rate ', 'https://m.media-amazon.com/images/I/516kq12OmmL._SX569_.jpg', 'https://m.media-amazon.com/images/I/516kq12OmmL._SX569_.jpg;https://m.media-amazon.com/images/I/617OHWqClEL._SX569_.jpg;https://m.media-amazon.com/images/I/61P-PdYAZvL._SX569_.jpg', 'Elevate your gaming experience with the EvoFox Blaze Programmable RGB Gaming Mouse, offering customizable DPI settings from 200 to 12800 for precise control and a 7000 FPS, 500Hz polling rate for ultra-responsiveness.', '100.00', 13, 'Gaming Mouse', 2, 0, 'Active', '2024-03-15 10:23:40', '2024-03-15 10:23:40', '0.00', '4.0'),
(56, 'HP Laptop 15s, 12th Gen Intel Core i3, 15.6-inch (39.6 cm)', 'https://m.media-amazon.com/images/I/71f2lQ3ESWL._SX569_.jpg', 'https://m.media-amazon.com/images/I/71f2lQ3ESWL._SX569_.jpg;https://m.media-amazon.com/images/I/81kkL7JWhWL._SX569_.jpg;https://m.media-amazon.com/images/I/81x4iV5bK0L._SX569_.jpg', '6-core 12th Gen Intel Core i3-1215U? 8 threads and 10MB L3 cache deliver high performance and instant responsiveness. The Intel UHD graphics help you dive into crisp, stunning visuals.;?Upgraded memory and storage? 8GB DDR4 RAM and 512GB SSD help you undertake improved multitasking with ample of storage and higher-bandwidth memory. Now, create, browse, and work as you please.', '446.77', 17, '8GB DDR4, 512GB SSD, Thin & Light, Dual Speakers (Win 11, MSO 2021, Silver, 1.69 kg), fq5007TU / FQ5327TU', 2, 0, 'Active', '2024-03-15 10:33:25', '2024-03-15 10:33:25', '0.00', '4.0'),
(57, 'VIRALKA Birla E-Bike JF Sport Electric Bike', 'https://m.media-amazon.com/images/I/51n+OG3t0VL._SX466_.jpg', 'https://m.media-amazon.com/images/I/51n+OG3t0VL._SX466_.jpg;https://m.media-amazon.com/images/I/51lBsOxxwKL._SX522_.jpg;https://m.media-amazon.com/images/I/717xouMB7+L._SX522_.jpg', 'Performance : Peak power of 5000 W BLDC HUB Motor with IP67 Rating | Top Speed : 100 km/h | Range : 130-150 kms | Acceleration 0-100 km/hr : 12 seconds | Reverse Mode : Yes | Speedometer : Digital Console | Water Wading Limit : 250 mm | Body Type : Fibre Body | Wheel Size : 430 mm (17 inch)', '2000.00', 27, '72V60ah Power Electric Battery | Top Speed 120 KM/H | 110KM Range in One Hour Charge | Color Blue', 2, 0, 'Active', '2024-04-26 06:36:49', '2024-04-26 06:36:49', '0.00', '0.0'),
(58, 'OnePlus Nord Buds 2r True Wireless in Ear Earbuds with Mic, 12.4mm Drivers', 'https://m.media-amazon.com/images/I/51oMWaW7tKL._SX522_.jpg', 'https://m.media-amazon.com/images/I/51oMWaW7tKL._SX522_.jpg;https://m.media-amazon.com/images/I/51Ibbe7YqQL._SX569_.jpg;https://m.media-amazon.com/images/I/61oTsqcJ7JL._SX569_.jpg;https://m.media-amazon.com/images/I/51FVoU9tJ+L._SX569_.jpg', 'The buds comes with 12.4mm driver unit, which delivers crisp clear and enhanced bass quality sound experience', '23.90', 16, 'Upto 38hr case,4-Mic Design, IP55 Rating [Deep Grey]', 2, 0, 'Active', '2024-04-26 06:46:28', '2024-04-26 06:46:28', '0.00', '0.0'),
(59, 'OnePlus 11R 5G', 'https://m.media-amazon.com/images/I/61u9zN1HYCL._SX522_.jpg', 'https://m.media-amazon.com/images/I/61u9zN1HYCL._SX522_.jpg;https://m.media-amazon.com/images/I/51rFpiGJFRL._SX569_.jpg;https://m.media-amazon.com/images/I/71klFSrkIOL._SX522_.jpg', 'Camera: Sensor: 50MP Main Camera with Sony IMX890 (OIS supported), 8MP Ultrawide Camera (FOV: 120 degree) and Macro Lens; 16MP Front (Selfie) Camera with EIS support', '390.88', 17, '(Sonic Black, 8GB RAM, 128GB Storage)', 2, 0, 'Active', '2024-04-26 06:53:41', '2024-04-26 06:53:41', '0.00', '0.0'),
(60, 'Fastrack All Nighters Analog Black', 'https://m.media-amazon.com/images/I/61eML4d7skL._SX679_.jpg', 'https://m.media-amazon.com/images/I/61eML4d7skL._SX679_.jpg;https://m.media-amazon.com/images/I/51FoL0yT3QL._SX679_.jpg', 'Dial Color: Black, Case Shape: Round, Dial Glass Material: Mineral\r\nBand Color: Black,\r\nBand Material: Stainless Steel', '85.77', 7, 'Dial Men\'s Watch-NN3193KM01/NP3193KM01', 2, 0, 'Active', '2024-04-26 06:57:46', '2024-04-26 06:57:46', '0.00', '0.0'),
(61, 'boAt Stone 1200 14W Bluetooth Speaker with Upto 9 Hours Battery, RGB LEDs, IPX7 and TWS Feature(Maroon)', 'https://m.media-amazon.com/images/I/61vuhPqnVaL._SX522_.jpg', 'https://m.media-amazon.com/images/I/61vuhPqnVaL._SX522_.jpg;https://m.media-amazon.com/images/I/81ndaMTJQpL._SX522_.jpg;https://m.media-amazon.com/images/I/81yMnQCuTGL._SX522_.jpg', 'Playback- Leave all charging worries at bay as the Rockerz 255 Pro+ comes with a humongous battery back up of upto 40 hours(@50% volume', '61.00', 8, 'RGB LEDs, IPX7 and TWS Feature & Rockerz 255 Pro+ in-Ear Bluetooth Neckband with Upto 40 Hours Playback, ASAP Charge, IPX7', 2, 0, 'Active', '2024-04-26 07:34:39', '2024-04-26 07:34:39', '0.00', '0.0'),
(62, 'Campus Men\'s SL-423 Sliders', 'https://m.media-amazon.com/images/I/61X9yJHk8YL._SY575_.jpg', 'https://m.media-amazon.com/images/I/61X9yJHk8YL._SY575_.jpg;https://m.media-amazon.com/images/I/613Y7gHQPrL._SY575_.jpg;https://m.media-amazon.com/images/I/61aUVuPixTL._SY575_.jpg;https://m.media-amazon.com/images/I/71xA4DKxVHL._SY575_.jpg', 'Features- Enjoy the sunny summer with these high-quality PU men\'s outdoor slides. Durable and versatile, they\'re a perfect fit for all summer occasions. Whether you\'re hitting the beach, lounging by the pool, or grabbing a coffee downtown – these slides have got you covered.', '7.77', 8, 'Men\'s SL-423 Sliders', 5, 0, 'Active', '2024-04-26 07:38:42', '2024-04-26 07:38:42', '0.00', '0.0'),
(63, 'KINESIS Advantage360 Split Ergonomic Keyboard - USB-C', 'https://m.media-amazon.com/images/I/61eWzSs-f2L._SX522_.jpg', 'https://m.media-amazon.com/images/I/61eWzSs-f2L._SX522_.jpg;https://m.media-amazon.com/images/I/61BwnUFw10L._SX522_.jpg;https://m.media-amazon.com/images/I/61LoeMcrgxL._SX522_.jpg', 'MECHANICAL SWITCHES AND PBT KEYCAPS PROVIDE A PREMIUM TYPING EXPERIENCE: Gateron Brown stem switches feature low activation force, popular tactile \"bump\", and incredible durability (50M presses). New and improved PBT keycaps resist shine and improve look, sound, and feel.', '1083.00', 8, 'Mechanical Switches | Fully Programmable | Contoured Shape | Adjustable Tenting | PBT Keycaps', 2, 0, 'Active', '2024-04-26 07:55:54', '2024-04-26 07:55:54', '0.00', '0.0'),
(64, 'Sony Alpha ILCE-7RM3A Full-Frame 42.4MP Mirrorless Camera Body', 'https://m.media-amazon.com/images/I/71VnF6UiESL._SX569_.jpg', 'https://m.media-amazon.com/images/I/71VnF6UiESL._SX569_.jpg;https://m.media-amazon.com/images/I/71v3VLUCldL._SX569_.jpg;https://m.media-amazon.com/images/I/71eEM297ebL._SX569_.jpg', '35mm full-frame “Exmor R” CMOS sensor with approx 42.4 effective megapixels,\r\n Enhanced BIONZ X image processing engine with front end LSI,ISO sensitivity: 100 – 32000 (expandable 50 – 102400),14bit RAW format (ARW).', '2000.00', 7, '(4K Full Frame, Real-Time Eye Auto Focus, Animal Eye AF, Tiltable LCD, 2.7 Optical Zoom) - Black', 2, 0, 'Active', '2024-04-26 08:01:07', '2024-04-26 08:01:07', '0.00', '0.0'),
(65, 'Tenda AC21 2100Mbps Dual Band Gigabit Wireless Router', 'https://m.media-amazon.com/images/I/71Y9bJYj4uL._SX522_.jpg', 'https://m.media-amazon.com/images/I/71Y9bJYj4uL._SX522_.jpg;https://m.media-amazon.com/images/I/61lJ6yPcjeL._SX522_.jpg;https://m.media-amazon.com/images/I/71l7Xkjo+4L._SX522_.jpg', 'Dual Band Gigabit Wireless Router: Adopted with 802.11 ac wave 2 technology and provides speed up to 2033Mbps(1733Mbps/5GHz+300Mbps/2.3GHz);Powerful Antennas: 6*6dBi external antennas and four data streams of 5Ghz band, the AC21 can provide optimized Wi-Fi coverage and better 5GHz Wi-Fi signal.', '50.44', 9, 'MU-MIMO, Easy Setup, Supports Guest Network, Parental Control, Client Filter, IPv6 (Black)', 2, 0, 'Active', '2024-04-26 08:05:37', '2024-04-26 08:05:37', '0.00', '0.0'),
(66, 'CREEK Square Premium Blue Cut Spectacles', 'https://m.media-amazon.com/images/I/61LreMkfOYL._SX679_.jpg', 'https://m.media-amazon.com/images/I/61LreMkfOYL._SX679_.jpg;https://m.media-amazon.com/images/I/71ff2Xn1jFS._SX679_.jpg;https://m.media-amazon.com/images/I/71GW7nmC9mS._SX679_.jpg', '【Protection for Your Eyes】: reflect and filter blue light, prevent color distortion, 7-layer anti-reflective coating to reflect and filter blue light, reduce eyestrain and sleep better. High light transmittance with no noticeable yellow tint to prevent color distortion, minimize glare from digital screens.', '4.55', 19, 'Frame Anti-glare UV Computer Glasses for Eye Protection Blue Light Filter Glasses for Men Women (TRANSPARENT)', 6, 0, 'Active', '2024-04-26 08:12:49', '2024-04-26 08:12:49', '0.00', '0.0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'not set',
  `lname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'not set',
  `age` int DEFAULT '18',
  `role` int DEFAULT '555',
  `photoUrl` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `type` varchar(255) NOT NULL DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `fname`, `lname`, `age`, `role`, `photoUrl`, `type`) VALUES
(26, 'sanket jadhav', 'f91e15dbec69fc40f81f0876e7009648', 'sanket.jadhav@hiddenbrains.in', 'sanket jadhav', 'not set', 18, 555, NULL, 'local'),
(28, 'Keval Siddhpura', '25d55ad283aa400af464c76d713c07ad', 'kevalkumar.siddhapura@hiddenbrains.in', 'Keval Siddhpura', 'not set', 18, 555, NULL, 'local');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addresses_users1_idx` (`iUserId`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD UNIQUE KEY `iUserCartId` (`iUserCartId`,`iProductId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users1_idx` (`user_id`);

--
-- Indexes for table `orders_details`
--
ALTER TABLE `orders_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_has_products_products1_idx` (`product_id`),
  ADD KEY `fk_orders_has_products_orders1_idx` (`order_id`);

--
-- Indexes for table `productReview`
--
ALTER TABLE `productReview`
  ADD PRIMARY KEY (`ProductReviewId`),
  ADD KEY `productReview` (`productId`),
  ADD KEY `userReview` (`userId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`cat_id`);
ALTER TABLE `products` ADD FULLTEXT KEY `description` (`description`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=277;

--
-- AUTO_INCREMENT for table `orders_details`
--
ALTER TABLE `orders_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `productReview`
--
ALTER TABLE `productReview`
  MODIFY `ProductReviewId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `fk_addresses_users1` FOREIGN KEY (`iUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders_details`
--
ALTER TABLE `orders_details`
  ADD CONSTRAINT `fk_orders_has_products_orders1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orders_has_products_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productReview`
--
ALTER TABLE `productReview`
  ADD CONSTRAINT `productReview` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `userReview` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
