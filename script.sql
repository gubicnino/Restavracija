-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: podatkovna-baza
-- Generation Time: Dec 04, 2025 at 02:04 PM
-- Server version: 9.5.0
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dsr_projekt`
--

-- --------------------------------------------------------

--
-- Table structure for table `PDFConfirmation`
--
DROP TABLE IF EXISTS `PDFConfirmation`;
DROP TABLE IF EXISTS `Reservation_Table`;
DROP TABLE IF EXISTS `Reservation`;
DROP TABLE IF EXISTS `TableEntity`;
DROP TABLE IF EXISTS `User`;
CREATE TABLE `PDFConfirmation` (
  `pdf_id` int NOT NULL,
  `reservation_id` int DEFAULT NULL,
  `pot_potrdila` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PDFConfirmation`
--

INSERT INTO `PDFConfirmation` (`pdf_id`, `reservation_id`, `pot_potrdila`) VALUES
(1, 1, '/pdf/potrdilo_1.pdf'),
(2, 2, '/pdf/potrdilo_2.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `Reservation`
--

CREATE TABLE `Reservation` (
  `reservation_id` int NOT NULL,
  `user_id` int NOT NULL,
  `datum` date DEFAULT NULL,
  `ura` time DEFAULT NULL,
  `stevilo_oseb` int DEFAULT NULL,
  `status` enum('potrjena','cakajoca','zavrnjen') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Reservation`
--

INSERT INTO `Reservation` (`reservation_id`, `user_id`, `datum`, `ura`, `stevilo_oseb`, `status`) VALUES
(1, 1, '2025-11-10', '18:00:00', 2, 'potrjena'),
(2, 2, '2025-11-11', '19:30:00', 4, 'cakajoca'),
(3, 1, '2025-11-12', '12:00:00', 6, 'zavrnjen');

-- --------------------------------------------------------

--
-- Table structure for table `Reservation_Table`
--

CREATE TABLE `Reservation_Table` (
  `reservation_id` int NOT NULL,
  `table_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Reservation_Table`
--

INSERT INTO `Reservation_Table` (`reservation_id`, `table_id`) VALUES
(1, 2),
(2, 1),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `TableEntity`
--

CREATE TABLE `TableEntity` (
  `table_id` int NOT NULL,
  `stevilka` int NOT NULL,
  `kapaciteta` int DEFAULT NULL,
  `lokacija` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `TableEntity`
--

INSERT INTO `TableEntity` (`table_id`, `stevilka`, `kapaciteta`, `lokacija`) VALUES
(1, 1, 4, 'notranjost'),
(2, 2, 2, 'terasa'),
(3, 3, 6, 'notranjost');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` int NOT NULL,
  `ime` varchar(50) DEFAULT NULL,
  `priimek` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `geslo` varchar(255) DEFAULT NULL,
  `vloga` enum('uporabnik','administrator') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`user_id`, `ime`, `priimek`, `email`, `geslo`, `vloga`) VALUES
(1, 'Ana', 'Novak', 'ana.novak@example.com', 'geslo123', 'uporabnik'),
(2, 'Marko', 'Kralj', 'marko.kralj@example.com', 'geslo456', 'uporabnik'),
(3, 'Admin', 'Sistem', 'admin@example.com', 'adminpass', 'administrator'),
(4, 'Janez', 'Novak', 'janez.novak@example.com', 'geslo123', 'uporabnik'),
(5, 'test', 'test', 'test@gmail.com', 'test', 'uporabnik'),
(6, 'fasdfadsf', 'fasdfadsf', 'aa@gmail.com', 'aa', 'uporabnik');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `PDFConfirmation`
--
ALTER TABLE `PDFConfirmation`
  ADD PRIMARY KEY (`pdf_id`),
  ADD UNIQUE KEY `reservation_id` (`reservation_id`);

--
-- Indexes for table `Reservation`
--
ALTER TABLE `Reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Reservation_Table`
--
ALTER TABLE `Reservation_Table`
  ADD KEY `table_id` (`table_id`),
  ADD KEY `reservation_table_ibfk_1` (`reservation_id`);

--
-- Indexes for table `TableEntity`
--
ALTER TABLE `TableEntity`
  ADD PRIMARY KEY (`table_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `PDFConfirmation`
--
ALTER TABLE `PDFConfirmation`
  MODIFY `pdf_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Reservation`
--
ALTER TABLE `Reservation`
  MODIFY `reservation_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `TableEntity`
--
ALTER TABLE `TableEntity`
  MODIFY `table_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `PDFConfirmation`
--
ALTER TABLE `PDFConfirmation`
  ADD CONSTRAINT `pdfconfirmation_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `Reservation` (`reservation_id`);

--
-- Constraints for table `Reservation`
--
ALTER TABLE `Reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `Reservation_Table`
--
ALTER TABLE `Reservation_Table`
  ADD CONSTRAINT `reservation_table_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `Reservation` (`reservation_id`),
  ADD CONSTRAINT `reservation_table_ibfk_2` FOREIGN KEY (`table_id`) REFERENCES `TableEntity` (`table_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
