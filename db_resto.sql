-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:4306
-- Generation Time: Sep 27, 2024 at 06:11 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_resto`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `idAdmin` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`idAdmin`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(6, 'Admin User', 'admin.user@example.com', 'test', 'superadmin', '2024-09-26 15:36:16', '2024-09-26 15:36:16');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `idCustomer` int(11) NOT NULL,
  `tableNumber` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`idCustomer`, `tableNumber`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'John Doe', '2024-09-26 13:29:09', '2024-09-26 13:29:09'),
(2, 3, 'test', '2024-09-27 15:03:41', '2024-09-27 15:03:41'),
(3, 3, 'test', '2024-09-27 15:03:41', '2024-09-27 15:03:41'),
(4, 3, 'test', '2024-09-27 15:03:50', '2024-09-27 15:03:50'),
(5, 3, 'test', '2024-09-27 15:04:21', '2024-09-27 15:04:21'),
(6, 3, 'test', '2024-09-27 15:06:04', '2024-09-27 15:06:04'),
(7, 5, 'test2', '2024-09-27 15:12:35', '2024-09-27 15:12:35'),
(8, 6, 'test', '2024-09-27 15:14:44', '2024-09-27 15:14:44'),
(9, 7, 'test4', '2024-09-27 15:26:06', '2024-09-27 15:26:06'),
(10, 7, 'test', '2024-09-27 15:28:46', '2024-09-27 15:28:46');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `idMenu` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `menuName` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `slug` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `adminId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`idMenu`, `stock`, `menuName`, `category`, `price`, `image`, `slug`, `createdAt`, `updatedAt`, `adminId`) VALUES
(1, 10, 'Pizza Margherita', 'Italian', '53000.00', 'https://au.ooni.com/cdn/shop/articles/20220211142645-margherita-9920.jpg', '', '2024-09-26 13:41:04', '2024-09-26 13:41:04', NULL),
(12, 12, 'Nasi Goreng', 'Main Course', '50000.00', 'https://www.blibli.com/friends-backend/wp-content/uploads/2023/04/B300026-Cover-resep-nasi-goreng-scaled.jpg', 'nasi-goreng', '2024-09-27 08:36:03', '2024-09-27 16:07:34', NULL),
(13, 20, 'Sate Ayam', 'Main Course', '60000.00', 'https://img-global.cpcdn.com/recipes/a6ca9f36b02b089b/680x482cq70/sate-ayam-khas-madura-foto-resep-utama.jpg', 'sate-ayam', '2024-09-27 08:36:36', '2024-09-27 08:36:36', NULL),
(14, 15, 'Rendang', 'Main Course', '70000.00', 'https://www.astronauts.id/blog/wp-content/uploads/2023/03/Resep-Rendang-Daging-Sapi-Untuk-Lebaran-Gurih-dan-Nikmat-1024x683.jpg', 'rendang', '2024-09-27 08:36:53', '2024-09-27 08:36:53', NULL),
(15, 30, 'Spring Rolls', 'Appetizer', '25000.00', 'https://static01.nyt.com/images/2023/12/21/multimedia/AS-Spring-Rolls-bzjt/AS-Spring-Rolls-bzjt-superJumbo.jpg', 'spring-rolls', '2024-09-27 08:37:14', '2024-09-27 08:37:14', NULL),
(16, 26, 'French Fries', 'Appetizer', '15000.00', 'https://images.themodernproper.com/billowy-turkey/production/posts/2022/Homemade-French-Fries_8.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1662474181&s=3b2f5e70873746d98cd312c67bc50bfe', 'french-fries', '2024-09-27 08:37:37', '2024-09-27 15:55:01', NULL),
(17, 26, 'Es Teh', 'Drinks', '10000.00', 'https://asset.kompas.com/crops/toOljW__-UqEVhGAJe8UyPdZWnU=/92x67:892x600/750x500/data/photo/2023/08/23/64e59deb79bfb.jpg', 'es-teh', '2024-09-27 08:37:53', '2024-09-27 15:55:40', NULL),
(18, 12, 'Jus Jeruk', 'Drinks', '12000.00', 'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/11/21085338/ini-cara-mudah-membuat-jus-jeruk-segar-dan-kaya-nutrisi-halodoc.jpg.webp', 'jus-jeruk', '2024-09-27 08:38:08', '2024-09-27 08:38:08', NULL),
(19, 15, 'Kwetiau Goreng', 'Main Course', '55000.00', 'https://asset.kompas.com/crops/1g9P4L73NLmOshdRUptmBe_oQgQ=/0x0:698x465/750x500/data/photo/2020/12/07/5fce3837c4f6d.jpg', 'kwetiau-goreng', '2024-09-27 08:38:45', '2024-09-27 08:38:45', NULL),
(20, 8, 'Bakso', 'Main Course', '40000.00', 'https://cdn0-production-images-kly.akamaized.net/VTDiAj5ffuLCm1CEjR9VExObwkQ=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2763419/original/071857300_1553761217-shutterstock_1148354906.jpg', 'bakso', '2024-09-27 08:39:10', '2024-09-27 08:39:10', NULL),
(21, 21, 'Air Mineral', 'Drinks', '5000.00', 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-11639163/oasis_air_mineral_oasis_botol_pet_-_600_ml_-kemasan_satuan-_full01_mnn0m767.jpg', 'air-mineral', '2024-09-27 08:39:25', '2024-09-27 16:02:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ordermenus`
--

CREATE TABLE `ordermenus` (
  `idOrderMenu` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderIdOrder` int(11) DEFAULT NULL,
  `MenuIdMenu` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordermenus`
--

INSERT INTO `ordermenus` (`idOrderMenu`, `quantity`, `createdAt`, `updatedAt`, `OrderIdOrder`, `MenuIdMenu`) VALUES
(23, 1, '2024-09-27 08:18:08', '2024-09-27 08:18:08', 16, 1),
(25, 1, '2024-09-27 15:12:36', '2024-09-27 15:12:36', 22, NULL),
(26, 1, '2024-09-27 15:12:36', '2024-09-27 15:12:36', 22, NULL),
(27, 1, '2024-09-27 15:14:44', '2024-09-27 15:14:44', 23, 14),
(28, 1, '2024-09-27 15:14:44', '2024-09-27 15:14:44', 23, 13),
(29, 1, '2024-09-27 15:26:06', '2024-09-27 15:26:06', 24, 14),
(30, 1, '2024-09-27 15:26:06', '2024-09-27 15:26:06', 24, 13),
(31, 1, '2024-09-27 15:28:46', '2024-09-27 15:28:46', 25, 14),
(32, 1, '2024-09-27 15:28:46', '2024-09-27 15:28:46', 25, 13);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `idOrder` int(11) NOT NULL,
  `idCustomer` int(11) DEFAULT NULL,
  `idMenu` int(11) DEFAULT NULL,
  `orderTime` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CustomerIdCustomer` int(11) DEFAULT NULL,
  `MenuIdMenu` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`idOrder`, `idCustomer`, `idMenu`, `orderTime`, `createdAt`, `updatedAt`, `CustomerIdCustomer`, `MenuIdMenu`) VALUES
(3, 1, 1, '2024-09-27 10:00:00', '2024-09-26 13:53:11', '2024-09-26 13:53:11', NULL, NULL),
(16, 1, NULL, '2024-09-27 06:53:56', '2024-09-27 08:18:08', '2024-09-27 08:18:08', NULL, NULL),
(21, 6, NULL, '2024-09-27 15:06:04', '2024-09-27 15:06:04', '2024-09-27 15:06:04', NULL, NULL),
(22, 7, NULL, '2024-09-27 15:12:35', '2024-09-27 15:12:36', '2024-09-27 15:12:36', NULL, NULL),
(23, 8, NULL, '2024-09-27 15:14:44', '2024-09-27 15:14:44', '2024-09-27 15:14:44', NULL, NULL),
(24, 9, NULL, '2024-09-27 15:26:06', '2024-09-27 15:26:06', '2024-09-27 15:26:06', NULL, NULL),
(25, 10, NULL, '2024-09-27 15:28:46', '2024-09-27 15:28:46', '2024-09-27 15:28:46', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('-aBPaH4FJMwkGHb4DR9RcukxEOYUADuT', '2024-09-28 11:36:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:36:00', '2024-09-27 11:36:00'),
('-JmhPTpFl2kEYACvzQe_5uY0udehB9NX', '2024-09-28 11:59:18', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:59:18', '2024-09-27 11:59:18'),
('1EUN-KujtY68wT4-GpS_SvAp7wvkqWlB', '2024-09-28 10:07:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:07:55', '2024-09-27 10:07:55'),
('1mxTXlXaUYmJLiQoEoCsKWBAfNnC5A3g', '2024-09-28 10:08:44', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:08:44', '2024-09-27 10:08:44'),
('1ursmAXUVvHLE90sy0BD8_7aD2ENerC7', '2024-09-28 16:02:04', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 06:46:39', '2024-09-27 16:02:04'),
('1yD3EHQO0LD-mnN1JC_NjAVrUWV-oGCJ', '2024-09-28 10:08:43', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:08:43', '2024-09-27 10:08:43'),
('7ZuXFDpYi9-NFpH8xH07ihLhwAaizVhH', '2024-09-28 10:08:43', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:08:43', '2024-09-27 10:08:43'),
('dJLVEO4R60n6B-TgbK6WTnIUuyMfMSuz', '2024-09-28 10:08:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:08:47', '2024-09-27 10:08:47'),
('EN1HZt6oh2RVDyke06QVw2CY88QA0mKc', '2024-09-28 11:35:26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:35:26', '2024-09-27 11:35:26'),
('gZ_12n5hepGSHBW_1ggX9rXis7gs-RPz', '2024-09-28 10:13:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:13:37', '2024-09-27 10:13:37'),
('kaZnhbaFQqB5hCeM2Z1vQAQ_uXtV9w9B', '2024-09-28 11:36:31', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:36:31', '2024-09-27 11:36:31'),
('LAqWKUNJuRlt42OsROiOsbLJrXcBiSzx', '2024-09-28 11:59:18', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:59:18', '2024-09-27 11:59:18'),
('mhh_jCH--FsVd6pLZdWI8lOFJJUB9ZhM', '2024-09-28 11:35:26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:35:26', '2024-09-27 11:35:26'),
('nJBU9PbgwDgHnabMUdI6sXwXg_3EE20f', '2024-09-28 10:07:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:07:55', '2024-09-27 10:07:55'),
('O7X9nxPbRuPKfCiQjeo5OWnyoPo0o-wV', '2024-09-28 10:08:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:08:47', '2024-09-27 10:08:47'),
('pa1o9tx8nEA03E8ieB5x5Zu2SQUzJEOp', '2024-09-28 11:59:18', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:59:18', '2024-09-27 11:59:18'),
('R0MJa5qWl8Q50lC7KiBlxefYr6cCKLTW', '2024-09-28 11:36:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:36:02', '2024-09-27 11:36:02'),
('RDcS6Ql4Xzb1ImED--kPRlBo_OEMFtt2', '2024-09-28 10:13:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:13:37', '2024-09-27 10:13:37'),
('tgoa_dBYXU_zffdaNgH1aN0QLTaJJ__s', '2024-09-28 11:34:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:34:52', '2024-09-27 11:34:52'),
('TxSI9N26UFwG8NTxNdCOoMGr1yRRq2eg', '2024-09-28 10:06:53', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:06:53', '2024-09-27 10:06:53'),
('uqqcl_4immiqO45Pc02SGn6HxZOuyHV6', '2024-09-28 11:35:26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:35:26', '2024-09-27 11:35:26'),
('WhDcmB_J13v0iAYkLGUpkpQ_-TGaXhDP', '2024-09-28 11:34:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:34:52', '2024-09-27 11:34:52'),
('xxm-fB1rThukf1fWUFF0F728PIeRg4p5', '2024-09-28 11:34:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 11:34:52', '2024-09-27 11:34:52'),
('YNjifNpL-ZJofIdxQd53ivYF8DoWNNKe', '2024-09-28 10:13:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:13:37', '2024-09-27 10:13:37'),
('Z5MwhPpH5wnL3SodF44sIGYGv7x3-yON', '2024-09-28 10:04:22', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:04:22', '2024-09-27 10:04:22'),
('za4fW75Ulqgz4rA8R71_mCeHc_6OmQj5', '2024-09-28 10:08:13', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:08:13', '2024-09-27 10:08:13'),
('ZeaE_L6ddzx22SztexyFZvmV4B9Mpo1d', '2024-09-28 10:07:38', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:07:38', '2024-09-27 10:07:38'),
('zKrxlr0sN0s2S3dYAWOdy6e7Qof0JBDs', '2024-09-28 16:07:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"adminId\":6}', '2024-09-27 11:59:25', '2024-09-27 16:07:34'),
('znBBdI0BRWsv7ZI1IIT-Exw2BgW-me9H', '2024-09-28 10:08:44', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-09-27 10:08:44', '2024-09-27 10:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `transactionreports`
--

CREATE TABLE `transactionreports` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `totalTransaction` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactionreports`
--

INSERT INTO `transactionreports` (`id`, `date`, `totalTransaction`, `createdAt`, `updatedAt`) VALUES
(1, '2024-09-27 00:00:00', '1234.56', '2024-09-26 13:33:29', '2024-09-26 13:33:29');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `idTransaction` int(11) NOT NULL,
  `idOrder` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `paymentMethod` varchar(20) NOT NULL,
  `cardNumber` varchar(16) DEFAULT NULL,
  `cardHolderName` varchar(100) DEFAULT NULL,
  `cardExpiryDate` varchar(7) DEFAULT NULL,
  `cardCvv` varchar(4) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderIdOrder` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`idTransaction`, `idOrder`, `total`, `paymentMethod`, `cardNumber`, `cardHolderName`, `cardExpiryDate`, `cardCvv`, `createdAt`, `updatedAt`, `OrderIdOrder`) VALUES
(1, NULL, '25.99', 'Credit Card', NULL, NULL, NULL, NULL, '2024-09-26 14:19:44', '2024-09-26 14:19:44', NULL),
(2, 3, '25.99', 'Credit Card', NULL, NULL, NULL, NULL, '2024-09-26 14:21:27', '2024-09-26 14:21:27', NULL),
(3, 3, '25.99', 'Credit Card', NULL, NULL, NULL, NULL, '2024-09-26 14:27:10', '2024-09-26 14:27:10', NULL),
(5, 3, '150.00', 'card', '1234567812345678', 'John Doe', '12/2025', '123', '2024-09-27 14:39:41', '2024-09-27 14:39:41', NULL),
(6, 21, '390000.00', 'cash', NULL, NULL, NULL, NULL, '2024-09-27 15:06:04', '2024-09-27 15:06:04', NULL),
(7, 22, '390000.00', 'cash', NULL, NULL, NULL, NULL, '2024-09-27 15:12:36', '2024-09-27 15:12:36', NULL),
(8, 23, '390000.00', 'cash', NULL, NULL, NULL, NULL, '2024-09-27 15:14:44', '2024-09-27 15:14:44', NULL),
(9, 24, '390000.00', 'cash', NULL, NULL, NULL, NULL, '2024-09-27 15:26:07', '2024-09-27 15:26:07', NULL),
(10, 25, '390000.00', 'cash', NULL, NULL, NULL, NULL, '2024-09-27 15:28:46', '2024-09-27 15:28:46', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`idCustomer`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`idMenu`),
  ADD KEY `adminId` (`adminId`);

--
-- Indexes for table `ordermenus`
--
ALTER TABLE `ordermenus`
  ADD PRIMARY KEY (`idOrderMenu`),
  ADD UNIQUE KEY `OrderMenus_MenuIdMenu_OrderIdOrder_unique` (`OrderIdOrder`,`MenuIdMenu`),
  ADD KEY `MenuIdMenu` (`MenuIdMenu`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`idOrder`),
  ADD KEY `idCustomer` (`idCustomer`),
  ADD KEY `idMenu` (`idMenu`),
  ADD KEY `CustomerIdCustomer` (`CustomerIdCustomer`),
  ADD KEY `MenuIdMenu` (`MenuIdMenu`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `transactionreports`
--
ALTER TABLE `transactionreports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`idTransaction`),
  ADD KEY `idOrder` (`idOrder`),
  ADD KEY `OrderIdOrder` (`OrderIdOrder`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `idCustomer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `idMenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `ordermenus`
--
ALTER TABLE `ordermenus`
  MODIFY `idOrderMenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `idOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `transactionreports`
--
ALTER TABLE `transactionreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `idTransaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`adminId`) REFERENCES `admins` (`idAdmin`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ordermenus`
--
ALTER TABLE `ordermenus`
  ADD CONSTRAINT `ordermenus_ibfk_1` FOREIGN KEY (`OrderIdOrder`) REFERENCES `orders` (`idOrder`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ordermenus_ibfk_2` FOREIGN KEY (`MenuIdMenu`) REFERENCES `menus` (`idMenu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customers` (`idCustomer`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`idMenu`) REFERENCES `menus` (`idMenu`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`CustomerIdCustomer`) REFERENCES `customers` (`idCustomer`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`MenuIdMenu`) REFERENCES `menus` (`idMenu`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`idOrder`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`OrderIdOrder`) REFERENCES `orders` (`idOrder`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
