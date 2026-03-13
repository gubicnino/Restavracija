-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: restavracija.mysql.database.azure.com:3306
-- Generation Time: Jan 02, 2026 at 07:32 PM
-- Server version: 8.0.42-azure
-- PHP Version: 8.3.26

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restavracija`
--
CREATE DATABASE IF NOT EXISTS `restavracija` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `restavracija`;

-- --------------------------------------------------------

--
-- Table structure for table `menu_category`
--

DROP TABLE IF EXISTS `menu_category`;
CREATE TABLE `menu_category` (
  `category_id` int NOT NULL,
  `ime` varchar(100) NOT NULL,
  `vrstni_red` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menu_category`
--

INSERT INTO `menu_category` (`category_id`, `ime`, `vrstni_red`) VALUES
(1, 'Predjedi', 1),
(2, 'Juhe', 2),
(4, 'Prigrizki', 4),
(5, 'Rebrca', 5),
(6, 'Perutničke', 6),
(7, 'Steaki', 7),
(8, 'Pulled meat', 8),
(9, 'Burgerji', 9),
(10, 'Pinsa', 10),
(11, 'Pizze', 11),
(12, 'Testenine', 12),
(13, 'Solate', 13),
(14, 'Sladice', 14),
(20, 'Azijske jedi', 20);

-- --------------------------------------------------------

--
-- Table structure for table `menu_item`
--

DROP TABLE IF EXISTS `menu_item`;
CREATE TABLE `menu_item` (
  `item_id` int NOT NULL,
  `category_id` int NOT NULL,
  `ime` varchar(200) NOT NULL,
  `opis` text,
  `cena` decimal(10,2) NOT NULL,
  `slika` varchar(500) DEFAULT NULL,
  `oznaka` varchar(50) DEFAULT NULL,
  `vrstni_red` int DEFAULT '0',
  `aktiven` tinyint(1) DEFAULT '1',
  `lokacija` enum('vse','lent','limbus') DEFAULT 'vse'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menu_item`
--

INSERT INTO `menu_item` (`item_id`, `category_id`, `ime`, `opis`, `cena`, `slika`, `oznaka`, `vrstni_red`, `aktiven`, `lokacija`) VALUES
(1, 1, 'Goveji carpaccio', 'tanke rezine pljučne, parmezan, rukola, balzamična redukcija, domač hlebček', 19.90, NULL, NULL, 0, 1, 'vse'),
(2, 1, 'Tatarski biftek', 'iz zorjene slovenske in irske govedine, domač hlebček', 20.90, NULL, NULL, 0, 1, 'vse'),
(3, 1, 'Tunina tartar', 'tartar iz sveže tune', 12.30, NULL, NULL, 0, 1, 'lent'),
(4, 1, 'Nacho chips gratinirani', 's šunko, sirom, salso in nacho sirom', 9.30, NULL, NULL, 0, 1, 'vse'),
(5, 1, 'Nacho chips košarica', 'salsa, kisla smetana, nacho sir', 8.50, NULL, NULL, 0, 1, 'vse'),
(7, 4, 'Polži gratinirani', '6 kosov, zeliščno maslo', 10.80, NULL, NULL, 0, 1, 'vse'),
(8, 4, 'Ocvrte mozzarella palčke', '8 kosov', 8.70, NULL, NULL, 0, 1, 'vse'),
(9, 4, 'Polnjene jalapeño paprike', '10 kosov', 9.80, NULL, NULL, 0, 1, 'vse'),
(10, 4, 'Čebulni obročki', '15 kosov, ocvrti', 9.90, NULL, NULL, 0, 1, 'vse'),
(11, 2, 'Paradižnikova juha', 'klasična juha iz pelatov', 5.50, NULL, NULL, 0, 1, 'vse'),
(12, 2, 'Bučna juha', 'novo', 5.50, NULL, NULL, 0, 1, 'vse'),
(13, 5, 'Dimljena rebrca 500g', 'BBQ in curry omaka, domač pomfri', 17.90, '2235ef10-e078-11ee-a1d8-66c0b97d56c7_jacknjoe_product_jurebanfi_1_xglxs1', NULL, 0, 1, 'vse'),
(14, 5, 'Dimljena rebrca 1000g', 'BBQ in curry omaka, domač pomfri', 34.90, '2235ef10-e078-11ee-a1d8-66c0b97d56c7_jacknjoe_product_jurebanfi_1_xglxs1', NULL, 0, 1, 'vse'),
(15, 5, 'Buffalo rebrca 500g', 'buffalo omaka, pomfri, kisla smetana', 19.90, '001ad214-e079-11ee-9683-5adb290a0999_jacknjoe_product_jurebanfi_7_zkghb2', NULL, 0, 1, 'vse'),
(16, 5, 'Buffalo rebrca 1000g', 'buffalo omaka, pomfri, kisla smetana', 36.90, '001ad214-e079-11ee-9683-5adb290a0999_jacknjoe_product_jurebanfi_7_zkghb2', NULL, 0, 1, 'vse'),
(17, 6, 'Perutničke 450g', 'BBQ in curry omaka, dollar chips', 14.20, 'a13330b6-e078-11ee-9270-c2d32515679a_jacknjoe_product_jurebanfi_3_agbzkz', NULL, 0, 1, 'vse'),
(18, 6, 'Perutničke 900g', 'BBQ in curry omaka, brez priloge', 24.20, 'a13330b6-e078-11ee-9270-c2d32515679a_jacknjoe_product_jurebanfi_3_agbzkz', NULL, 0, 1, 'vse'),
(19, 6, 'Buffalo perutničke 450g', 'buffalo omaka, dollar chips, kisla smetana', 15.20, '03d74fde-e07b-11ee-b8db-d2a737166b63_jacknjoe_product_jurebanfi_13_gtghow', NULL, 0, 1, 'vse'),
(20, 6, 'Buffalo perutničke 900g', 'buffalo omaka, dollar chips, kisla smetana', 26.20, '03d74fde-e07b-11ee-b8db-d2a737166b63_jacknjoe_product_jurebanfi_13_gtghow', NULL, 0, 1, 'vse'),
(21, 7, 'Steak slovensko meso 300-350g', 'pečen na žaru', 36.90, NULL, NULL, 0, 1, 'vse'),
(22, 7, 'Steak slovensko meso 200-250g', 'pečen na žaru', 29.90, NULL, NULL, 0, 1, 'vse'),
(23, 7, 'Steak pljučna ZDA 100g', 'USDA Prime', 19.00, NULL, NULL, 0, 1, 'vse'),
(24, 7, 'Steak Hugo', 'slovensko meso, Hugo maslo, priloge', 42.90, NULL, NULL, 0, 1, 'vse'),
(25, 7, 'Steak na rukoli', 'rukola, mozzarella, pršut', 42.90, NULL, NULL, 0, 1, 'vse'),
(26, 7, 'Pljučni medaljoni na vročem kamnu', 'file, gobova omaka, Hugo maslo, pomfri', 42.90, NULL, NULL, 0, 1, 'vse'),
(27, 7, 'Tomahawk steak', 'premium irska govedina Angus', 10.00, NULL, NULL, 0, 1, 'vse'),
(28, 7, 'Jack’s Ribeye', 'Black Angus ribeye, poprova omaka, krompir', 15.90, NULL, NULL, 0, 1, 'vse'),
(29, 7, 'Steak na sablji', 'pljučna medaljoni, tartufi, sladki krompir', 36.90, NULL, NULL, 0, 1, 'vse'),
(30, 8, 'Pulled chicken 100g', 'cufana kura', 14.90, NULL, NULL, 0, 1, 'vse'),
(31, 8, 'Pulled chicken 200g', 'cufana kura', 22.90, NULL, NULL, 0, 1, 'vse'),
(32, 8, 'Pulled pork 100g', 'cufana svinjina', 14.90, NULL, NULL, 0, 1, 'vse'),
(33, 8, 'Pulled pork 200g', 'cufana svinjina', 22.90, NULL, NULL, 0, 1, 'vse'),
(34, 8, 'Pulled beef 100g', 'cufana govedina', 14.90, NULL, NULL, 0, 1, 'vse'),
(35, 8, 'Pulled beef 200g', 'cufana govedina', 22.90, NULL, NULL, 0, 1, 'vse'),
(36, 9, 'Bud Spencer', '5x meso, cheddar, slanina, avokado, jalapeños', 25.90, NULL, NULL, 0, 1, 'vse'),
(37, 9, 'King Kong', '3x meso, cheddar, slanina', 19.90, '66967da0fd809433afa4431d_oy9h7r', NULL, 0, 1, 'vse'),
(38, 9, 'The Boss', '2x meso, cheddar, slanina, kumarica', 16.90, '66967e05f201896d876ec1dc_ll6zgg', NULL, 0, 1, 'vse'),
(39, 9, 'Cheese burger', 'meso, cheddar, slanina, kumarica', 12.90, '66967e7c69248341f91832c0_ucvhyd', NULL, 0, 1, 'vse'),
(40, 9, 'Cheese Junkie', 'črn hlebček, Bergkäse, BBQ omaka', 13.90, '66967f5669248341f91832c8_a45yq6', NULL, 0, 1, 'vse'),
(41, 9, 'The Chicken', 'piščančji dunajski, cheddar, solata', 12.90, '66967fcbf201896d876ec1e7_it0ml1', NULL, 0, 1, 'vse'),
(42, 9, 'Pulled pork burger', '100g ali 200g, BBQ omaka, coleslaw', 12.90, '6696803969248341f91832ce_a4iljw', NULL, 0, 1, 'vse'),
(43, 9, 'Pulled beef burger', '100g ali 200g, BBQ omaka, coleslaw', 12.90, '6696809369248341f91832d5_k0mfbp', NULL, 0, 1, 'vse'),
(44, 9, 'Pulled chicken burger', '100g ali 200g, BBQ omaka, coleslaw', 12.90, '669680ba69248341f91832d6_y4lgnz', NULL, 0, 1, 'vse'),
(45, 9, 'Pulled boss burger', 'cufana govedina, BBQ omaka, coleslaw', 17.90, NULL, NULL, 0, 1, 'vse'),
(46, 9, 'Swiss burger', 'raclette sir, slanina, solata', 13.90, NULL, NULL, 0, 1, 'vse'),
(47, 9, 'Smash burger', '2x ali 4x pleskavica, cheddar, slanina', 12.90, '66968189fd809433afa44339_zlncrp', NULL, 0, 1, 'vse'),
(48, 9, 'Smash tartuf burger', 'cheddar, gorgonzola, tartufata', 16.90, NULL, NULL, 0, 1, 'vse'),
(49, 9, 'Spicy beef & pork smash', 'govedina + salsiccia, cheddar, Bergkäse, pršut, nduja, sriracha, jalapeños', 13.90, NULL, NULL, 0, 1, 'vse'),
(50, 9, 'Jack&Joe burger', 'črn hlebček, pljučna na žaru, tartufi, cheddar, slanina, rukola', 18.90, '669681cfde1e96729097a08e_zz8sfz', NULL, 0, 1, 'vse'),
(51, 9, 'El Bandito', 'črn hlebček, dvojno meso, dvojna slanina, dvojni cheddar, avokado, jalapeños', 16.90, NULL, NULL, 0, 1, 'vse'),
(52, 9, 'Surf & Turf', 'pljučna na žaru + rakovi repki, cheddar, slanina, wasabi majoneza', 19.90, NULL, NULL, 0, 1, 'lent'),
(53, 9, 'Black Jack', 'črn hlebček, rakovi repki, wasabi majoneza, rukola', 14.90, '66968227c07c810afd6f34f0_xfnpqw', NULL, 0, 1, 'lent'),
(54, 9, 'Jack the Tartuf', 'meso, gorgonzola, tartufi, slanina, rukola, gorčična omaka', 15.90, '6696824d42ec4312a026b4ba_lzppbh', NULL, 0, 1, 'vse'),
(55, 9, 'Steak burger', 'pljučna na žaru, cheddar, slanina, rukola', 15.90, NULL, NULL, 0, 1, 'vse'),
(56, 9, 'Bad Hunter', 'halloumi ali ocvrti sir, čebulni obročki, avokado, rukola, hišna omaka', 11.90, '669682a669248341f91832ec_dmpjrs', NULL, 0, 1, 'vse'),
(57, 9, 'Good Hunter', 'meso + halloumi ali ocvrti sir, čebulni obročki, avokado, rukola', 14.90, NULL, NULL, 0, 1, 'vse'),
(58, 10, 'Pršuto pinsa', 'krema iz oliv, burrata, pršut San Daniele, olivno olje', 10.90, NULL, NULL, 0, 1, 'lent'),
(59, 10, 'Diavola pinsa', 'krema iz Nduje, mozzarella, pikantne salame, vložen chili', 10.90, NULL, NULL, 0, 1, 'lent'),
(60, 10, 'Ortolanao pinsa', 'krema s tartufato, mozzarella, artičoke, orehi, špinača', 9.90, NULL, NULL, 0, 1, 'lent'),
(61, 10, 'Mortadela pinsa', 'krema iz pistacij, mozzarella, mortadela, burrata, parmezan', 10.90, NULL, NULL, 0, 1, 'lent'),
(62, 10, 'Marinara pinsa', 'pelati San Marzano, sardele, buffalo mozzarella', 9.90, NULL, NULL, 0, 1, 'lent'),
(63, 10, 'Nagyu pinsa', 'wagyu pljučna, maslo z zelišči, sveži tartufi', 29.90, NULL, NULL, 0, 1, 'lent'),
(64, 10, 'Morska pinsa', 'rakovi repki, lignji, kapre, dagnje, olive, kremni sir', 15.90, NULL, NULL, 0, 1, 'lent'),
(65, 10, 'BBQ pinsa', 'svinjina/govedina/piščanec, BBQ omaka, gorčična omaka, sriracha', 13.90, NULL, NULL, 0, 1, 'lent'),
(66, 10, 'Jack&Joe pinsa', 'pljučna na žaru, tartufi, šampinjoni, parmezan', 17.90, NULL, NULL, 0, 1, 'lent'),
(67, 11, 'Margerita', 'pelati, Fior di Latte, bazilika', 11.90, '2308b8b0-7e20-11ee-96c7-f21f9a14a302_jacknjoe_product_jurebanfi_3_lp4puw', NULL, 0, 1, 'lent'),
(68, 11, 'Margerita burrata', 'pelati, burrata, parmezan, polsušeni paradižniki', 13.90, NULL, NULL, 0, 1, 'lent'),
(69, 11, 'Klasika', 'pelati, Fior di Latte, kuhan pršut, šampinjoni, kremni sir', 12.90, '4cd58830-7e20-11ee-9b49-2a991cec9862_jacknjoe_product_jurebanfi_4_f2uvhk', NULL, 0, 1, 'lent'),
(70, 11, 'Salami', 'pelati, Fior di Latte, salama, parmezan', 12.90, 'ea09e700-7e1f-11ee-a8c2-4ee429d3e3ba_jacknjoe_product_jurebanfi_2_zaxkrv', NULL, 0, 1, 'lent'),
(71, 11, 'Pikantna', 'zelena omaka, pikantne salame, nduja, jalapeño', 13.90, 'c89e1d2a-7e1f-11ee-8df3-3e3ce61a763e_jacknjoe_product_jurebanfi_1_mravuv', NULL, 0, 1, 'lent'),
(72, 11, 'Jack&Joe pizza', 'pljučna na žaru, tartufi, šampinjoni, parmezan', 17.90, '669e47b11186ff34e08805a7_r0mojg', NULL, 0, 1, 'lent'),
(73, 11, 'Pršut pizza', 'pelati, Fior di Latte, buffalo mozzarella, pršut San Daniele', 15.90, '8de3fca2-7e21-11ee-8841-fef5d495f460_jacknjoe_product_jurebanfi_18_qj7r16', NULL, 0, 1, 'lent'),
(74, 11, 'Fresh tuna pizza', 'zelena omaka, Fior di Latte, tuna, wasabi majoneza, teriyaki', 15.90, NULL, NULL, 0, 1, 'lent'),
(75, 11, 'Meat lover pizza', 'pelati, salsiccia, pršut, slanina, jajce', 13.90, '701565d4-7e22-11ee-bf54-5e8e4facc85b_jacknjoe_product_jurebanfi_25_y7tirq', NULL, 0, 1, 'lent'),
(76, 11, 'Jack wurst pizza', 'zelena omaka, slanina, salama, salsiccia, gorčična omaka', 13.50, 'a70ce1d4-7e22-11ee-ae97-ae66fa34b18e_jacknjoe_product_jurebanfi_28_ayfxoj', NULL, 0, 1, 'lent'),
(77, 11, 'Morska pizza', 'rakovi repki, lignji, kapre, dagnje, olive', 15.90, '74a76fa4-7e2a-11ee-b646-1e8c6a59ee84_jacknjoe_product_jurebanfi_54_cfnxbg', NULL, 0, 1, 'lent'),
(78, 11, 'BBQ pizza', 'svinjina/govedina/piščanec, BBQ omaka, sriracha', 13.50, NULL, NULL, 0, 1, 'lent'),
(79, 11, 'Mortadela in tartufi pizza', 'mortadela, burrata, pistacije, tartufovo olje', 15.90, '57e94690-7e24-11ee-929d-3af6ab8a891c_jacknjoe_product_jurebanfi_34_rl5wyt', NULL, 0, 1, 'lent'),
(80, 11, '4 siri pizza', 'gorgonzola, brie, paradižniki, pistacije, bazilika', 12.90, 'e2c03f8e-7e25-11ee-894a-527bbd1b8493_jacknjoe_product_jurebanfi_39_hdolqq', NULL, 0, 1, 'lent'),
(81, 11, 'Carpaccio pizza', 'goveji carpaccio, tartufata, mikro zelenjava', 14.90, '31da0ab0-7e2a-11ee-ad04-aeaf36b278c0_jacknjoe_product_jurebanfi_52_mc2hzh', NULL, 0, 1, 'lent'),
(82, 11, 'Veganska pizza', 'veganski sir, sladki krompir, šampinjoni, paradižniki', 13.50, '04162686-7e2a-11ee-85b5-fef5d495f460_jacknjoe_product_jurebanfi_50_yvi7tw', NULL, 0, 1, 'lent'),
(83, 12, 'Rigatoni paradižnik burrata', 'paradižnikova omaka, burrata, bazilika', 13.90, NULL, NULL, 0, 1, 'lent'),
(84, 12, 'Bucatini amatriciana', 'paradižnik, čebula, guanciale, peperoncino', 12.90, NULL, NULL, 0, 1, 'lent'),
(85, 12, 'Conchiglie pistacija', 'maslena omaka, krema pistacije, guanciale', 14.90, NULL, NULL, 0, 1, 'lent'),
(86, 12, 'Rigatoni Alfredo', 'smetanova omaka, šampinjoni, parmezan', 12.90, NULL, NULL, 0, 1, 'lent'),
(87, 12, 'Jack&Joe testenine', 'rezanci z bučno omako, pljučna, tartufi', 19.90, NULL, NULL, 0, 1, 'lent'),
(88, 12, 'Rigatoni Mamma Mia', 'salsiccia, nduja, jalapeño, parmezan', 12.90, NULL, NULL, 0, 1, 'lent'),
(89, 12, 'Conchiglie Tartufo', 'tartufata, šampinjoni, parmezan, sveži tartufi', 14.90, NULL, NULL, 0, 1, 'lent'),
(90, 12, 'Lasagna', 'mesna lazanja, slanina, bešamel, parmezan', 13.90, NULL, NULL, 0, 1, 'lent'),
(91, 13, 'Burrata na rukoli', 'mlada špinača, rukola, granatno jabolko, pistacije', 14.90, NULL, NULL, 0, 1, 'vse'),
(92, 13, 'Radič s krompirjem in ocvirki', 'mali/veliki', 5.20, NULL, NULL, 0, 1, 'vse'),
(93, 13, 'Solatni krožnik z govedino in piščancem', 'solata, radič, zelje, koruza, paradižnik, trakovi mesa', 14.20, NULL, NULL, 0, 1, 'vse'),
(94, 13, 'Motovilec sezonski', 'z jajcem', 6.20, NULL, NULL, 0, 1, 'vse'),
(95, 13, 'Burrata s popečenimi bučkami', 'rukola, polsušeni paradižniki', 14.20, NULL, NULL, 0, 1, 'vse'),
(96, 13, 'Solata Jack&Joe', 'kvinoja, čičerika, špinača, sladki krompir, mandlji', 14.20, '1700e710-e07a-11ee-81b3-d2895d8395f2_jacknjoe_product_jurebanfi_9_rkjcfb', NULL, 0, 1, 'vse'),
(97, 13, 'Cesarjeva solata', 'piščanec, slanina, parmezan, jajce, kruhki', 13.90, '772e575c-e07b-11ee-8c43-a207dc52ae02_jacknjoe_product_jurebanfi_17_uwwgwt', NULL, 0, 1, 'vse'),
(98, 13, 'Ameriška zeljna solata', 'zelje, korenček, majoneza', 5.20, NULL, NULL, 0, 1, 'vse'),
(99, 13, 'Mešana solata', 'zelena solata, radič, zelje, koruza, paradižnik', 5.20, NULL, NULL, 0, 1, 'vse'),
(100, 14, 'Chimichangas s čokolado in lešniki', 'ocvrta tortilja, polnjena s čokolado in lešniki', 6.90, NULL, NULL, 0, 1, 'limbus'),
(101, 14, 'Chimichangas z belo čokolado in lešniki', 'ocvrta tortilja, polnjena z belo čokolado in lešniki', 6.90, NULL, NULL, 0, 1, 'limbus'),
(102, 14, 'Chimichangas s Snickers čokolado', 'ocvrta tortilja, polnjena s Snickersom', 6.90, NULL, NULL, 0, 1, 'limbus'),
(103, 14, 'Chimichangas s Kinder čokolado', 'ocvrta tortilja, polnjena s Kinderjem', 6.90, NULL, NULL, 0, 1, 'limbus'),
(104, 14, 'Chimichangas s Twix čokolado', 'ocvrta tortilja, polnjena s Twixom', 6.90, NULL, NULL, 0, 1, 'limbus'),
(105, 14, 'Chimichangas z Bounty čokolado', 'ocvrta tortilja, polnjena z Bountyjem', 6.90, NULL, NULL, 0, 1, 'limbus'),
(106, 14, 'Čokoladni sufle', 'postrežen s kepico vanilijevega sladoleda', 7.90, NULL, NULL, 0, 1, 'limbus'),
(107, 14, 'Pistacijin sufle', 'postrežen s kepico pistacijinega sladoleda', 7.90, NULL, NULL, 0, 1, 'limbus'),
(108, 14, 'Vroča ljubezen', 'vanilijev sladoled, vroči gozdni sadeži', 6.90, NULL, NULL, 0, 1, 'limbus'),
(109, 14, 'Sladoled s smetano', '3 kepice po izbiri: čokolada, jagoda, vanilija', 6.00, NULL, NULL, 0, 1, 'limbus'),
(110, 14, 'Kepica sladoleda', '1 kepica po izbiri', 2.10, NULL, NULL, 0, 1, 'limbus'),
(111, 14, 'Tiramisu', 'hišni recept z mascarpone sirom', 7.20, NULL, NULL, 0, 1, 'limbus'),
(151, 20, 'Rdeči curry piščanec', 'piščanec, zelenjava, kokosovo mleko, riž', 15.90, NULL, NULL, 0, 1, 'limbus'),
(152, 20, 'Rdeči curry zelenjava', 'zelenjava, kokosovo mleko, riž', 15.90, NULL, NULL, 0, 1, 'limbus'),
(153, 20, 'Rdeči curry govedina', 'govedina, zelenjava, kokosovo mleko, riž', 17.90, NULL, NULL, 0, 1, 'limbus'),
(154, 20, 'Rdeči curry rakovi repki', 'rakovi repki, zelenjava, kokosovo mleko, riž', 19.90, NULL, NULL, 0, 1, 'limbus'),
(155, 20, 'Teriyaki zelenjava', 'zelenjava, gobe, teriyaki omaka, jasminov riž', 15.90, NULL, NULL, 0, 1, 'limbus'),
(156, 20, 'Teriyaki govedina', 'pljučna, teriyaki omaka, jasminov riž', 15.90, NULL, NULL, 0, 1, 'limbus'),
(157, 20, 'Teriyaki losos', 'škotski losos, teriyaki omaka, jasminov riž', 15.90, NULL, NULL, 0, 1, 'limbus'),
(158, 20, 'Teriyaki tofu', 'mariniran tofu, teriyaki omaka, jasminov riž', 15.90, NULL, NULL, 0, 1, 'limbus'),
(159, 20, 'Bami goreng zelenjava', 'praženi rezanci, sojina omaka, sweet chilli', 14.90, NULL, NULL, 0, 1, 'limbus'),
(160, 20, 'Bami goreng piščanec', 'rezanci, piščanec, zelenjava', 15.90, NULL, NULL, 0, 1, 'limbus'),
(161, 20, 'Bami goreng tofu', 'rezanci, tofu, zelenjava', 15.90, NULL, NULL, 0, 1, 'limbus');

-- --------------------------------------------------------

--
-- Table structure for table `pdfconfirmation`
--

DROP TABLE IF EXISTS `pdfconfirmation`;
CREATE TABLE `pdfconfirmation` (
  `pdf_id` int NOT NULL,
  `reservation_id` int DEFAULT NULL,
  `pot_potrdila` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pdfconfirmation`
--

INSERT INTO `pdfconfirmation` (`pdf_id`, `reservation_id`, `pot_potrdila`) VALUES
(3, 33, '/confirmations/reservation_33.pdf'),
(4, 34, '/confirmations/reservation_34.pdf'),
(5, 35, '/confirmations/reservation_35.pdf'),
(6, 36, '/confirmations/reservation_36.pdf'),
(7, 37, '/confirmations/reservation_37.pdf'),
(8, 38, '/confirmations/reservation_38.pdf'),
(9, 39, '/confirmations/reservation_39.pdf'),
(10, 40, '/confirmations/reservation_40.pdf'),
(11, 41, '/confirmations/reservation_41.pdf'),
(12, 42, '/confirmations/reservation_42.pdf'),
(13, 43, '/confirmations/reservation_43.pdf'),
(14, 44, '/confirmations/reservation_44.pdf'),
(15, 45, '/confirmations/reservation_45.pdf'),
(16, 46, '/confirmations/reservation_46.pdf'),
(17, 47, '/confirmations/reservation_47.pdf'),
(18, 48, '/confirmations/reservation_48.pdf'),
(19, 49, '/confirmations/reservation_49.pdf'),
(20, 50, '/confirmations/reservation_50.pdf'),
(21, 51, '/confirmations/reservation_51.pdf'),
(22, 52, '/confirmations/reservation_52.pdf'),
(23, 53, '/confirmations/reservation_53.pdf'),
(24, 54, '/confirmations/reservation_54.pdf'),
(25, 55, '/confirmations/reservation_55.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE `reservation` (
  `reservation_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `polno_ime` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefon` varchar(20) NOT NULL,
  `datum` date NOT NULL,
  `cas_zacetek` time NOT NULL,
  `cas_konec` time NOT NULL,
  `stevilo_oseb` int NOT NULL,
  `posebna_priloznost` varchar(100) DEFAULT NULL,
  `posebne_zelje` text,
  `status` enum('pending','confirmed','denied','cancelled','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`reservation_id`, `user_id`, `polno_ime`, `email`, `telefon`, `datum`, `cas_zacetek`, `cas_konec`, `stevilo_oseb`, `posebna_priloznost`, `posebne_zelje`, `status`, `created_at`) VALUES
(10, 1, 'Test User 1', 'test1@example.com', '040111111', '2025-12-15', '19:00:00', '21:00:00', 4, NULL, NULL, 'confirmed', '2025-12-05 19:45:29'),
(11, 2, 'Test User 2', 'test2@example.com', '040222222', '2025-12-15', '19:00:00', '21:00:00', 6, NULL, NULL, 'confirmed', '2025-12-05 19:45:29'),
(12, NULL, 'Test User 3', 'test3@example.com', '040333333', '2025-12-15', '19:00:00', '21:00:00', 2, NULL, NULL, 'pending', '2025-12-05 19:45:29'),
(13, 1, 'Kosilo Skupina', 'kosilo@example.com', '040444444', '2025-12-20', '12:30:00', '14:30:00', 6, NULL, NULL, 'confirmed', '2025-12-05 19:54:22'),
(22, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-11', '17:30:00', '19:30:00', 5, 'Praznovanje', '', 'confirmed', '2025-12-06 14:09:09'),
(23, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-12', '18:00:00', '20:00:00', 6, '', '', 'confirmed', '2025-12-06 16:17:49'),
(24, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '17:00:00', '19:00:00', 6, 'Obletnica', 'teaasdf', 'pending', '2025-12-06 22:03:20'),
(25, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '18:30:00', '20:30:00', 6, 'Obletnica', 'teaasdf', 'pending', '2025-12-06 22:19:04'),
(26, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '19:30:00', '21:30:00', 8, 'Obletnica', 'teaasdf', 'pending', '2025-12-06 22:21:21'),
(27, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '13:00:00', '15:00:00', 8, 'Obletnica', 'teaasdf', 'confirmed', '2025-12-06 22:21:41'),
(28, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '15:00:00', '17:00:00', 8, 'Obletnica', 'teaasdf', 'pending', '2025-12-06 22:33:39'),
(29, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '17:30:00', '19:30:00', 8, 'Obletnica', 'teaasdf', 'pending', '2025-12-06 22:39:58'),
(30, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Praznovanje', 'ff', 'confirmed', '2025-12-06 22:42:28'),
(33, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-20', '14:30:00', '16:30:00', 2, 'Obletnica', 'ggaga', 'confirmed', '2025-12-06 22:50:14'),
(34, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-11', '17:00:00', '19:00:00', 6, 'Poslovno kosilo', 'qwereq', 'confirmed', '2025-12-06 22:57:09'),
(35, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '21:30:00', '23:30:00', 8, NULL, NULL, 'pending', '2025-12-08 13:03:56'),
(36, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 7, 'Obletnica', 'fasdfa', 'confirmed', '2025-12-08 13:05:01'),
(37, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Zmenek', NULL, 'confirmed', '2025-12-08 13:08:27'),
(38, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Zmenek', NULL, 'pending', '2025-12-08 13:10:57'),
(39, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Obletnica', 'afsd', 'pending', '2025-12-08 13:22:01'),
(40, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Zmenek', 'adsf', 'pending', '2025-12-08 13:22:53'),
(41, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Zmenek', 'adsf', 'pending', '2025-12-08 13:25:04'),
(42, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Poslovno kosilo', 'adf', 'pending', '2025-12-08 13:25:44'),
(43, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Praznovanje', 'asdf', 'confirmed', '2025-12-08 13:30:29'),
(44, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-20', '12:00:00', '14:00:00', 8, 'Poslovno kosilo', 'asd', 'confirmed', '2025-12-08 13:34:47'),
(45, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-15', '22:00:00', '00:00:00', 8, 'Drugo', 'df', 'pending', '2025-12-08 13:56:12'),
(47, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-20', '16:00:00', '18:00:00', 8, 'Rojstni dan', 'adsf', 'confirmed', '2025-12-08 14:00:31'),
(48, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-12', '15:30:00', '17:30:00', 7, 'Rojstni dan', 'adsf', 'confirmed', '2025-12-08 22:22:24'),
(49, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-12', '15:30:00', '17:30:00', 7, 'Rojstni dan', 'adsf', 'confirmed', '2025-12-08 22:23:50'),
(50, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-12', '18:30:00', '20:30:00', 6, 'Poslovno kosilo', 'asdf', 'confirmed', '2025-12-08 22:24:18'),
(51, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-12', '17:30:00', '19:30:00', 7, 'Obletnica', 'dsfa', 'denied', '2025-12-08 22:33:50'),
(52, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-09', '14:00:00', '16:00:00', 4, 'Rojstni dan', 'dfa', 'denied', '2025-12-09 12:13:28'),
(54, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-20', '18:00:00', '20:00:00', 8, 'Rojstni dan', 'dsaf', 'pending', '2025-12-15 10:45:35'),
(55, NULL, 'Nino Gubič', 'gubicnino@gmail.com', '031686628', '2025-12-20', '21:00:00', '23:00:00', 8, 'Poslovno kosilo', 'asdsa', 'confirmed', '2025-12-15 12:14:46');

-- --------------------------------------------------------

--
-- Table structure for table `reservation_table`
--

DROP TABLE IF EXISTS `reservation_table`;
CREATE TABLE `reservation_table` (
  `id` int NOT NULL,
  `reservation_id` int NOT NULL,
  `table_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservation_table`
--

INSERT INTO `reservation_table` (`id`, `reservation_id`, `table_id`) VALUES
(4, 1, 2),
(5, 2, 1),
(6, 3, 3),
(7, 4, 1),
(9, 10, 1),
(10, 11, 3),
(11, 12, 2),
(12, 13, 3),
(13, 14, 1),
(14, 19, 6),
(15, 21, 6),
(16, 22, 3),
(17, 23, 3),
(18, 24, 3),
(19, 25, 3),
(20, 26, 6),
(21, 27, 6),
(22, 28, 6),
(23, 29, 6),
(24, 30, 6),
(27, 33, 2),
(28, 34, 3),
(29, 35, 6),
(30, 36, 6),
(31, 37, 6),
(32, 38, 6),
(33, 39, 6),
(34, 40, 6),
(35, 41, 6),
(36, 42, 6),
(37, 43, 6),
(38, 44, 6),
(39, 45, 6),
(40, 46, 6),
(41, 47, 6),
(42, 48, 6),
(43, 49, 6),
(44, 50, 3),
(45, 51, 6),
(46, 52, 1),
(47, 53, 1),
(48, 54, 6),
(49, 55, 6);

-- --------------------------------------------------------

--
-- Table structure for table `tableentity`
--

DROP TABLE IF EXISTS `tableentity`;
CREATE TABLE `tableentity` (
  `table_id` int NOT NULL,
  `stevilka` int NOT NULL,
  `kapaciteta` int DEFAULT NULL,
  `lokacija` varchar(50) DEFAULT NULL,
  `status` enum('available','reserved','occupied','maintenance') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tableentity`
--

INSERT INTO `tableentity` (`table_id`, `stevilka`, `kapaciteta`, `lokacija`, `status`) VALUES
(1, 1, 5, 'notranjost', 'available'),
(2, 2, 2, 'terasa', 'available'),
(3, 3, 6, 'notranjost', 'available'),
(4, 4, 2, 'ob oknu', 'available'),
(5, 5, 4, 'terasa', 'available'),
(6, 6, 8, 'zasebna soba', 'available'),
(7, 7, 2, 'notranjost', 'available'),
(8, 8, 4, 'ob oknu', 'available'),
(9, 9, 6, NULL, 'available'),
(10, 10, 2, NULL, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `ime` varchar(50) DEFAULT NULL,
  `priimek` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `geslo` varchar(255) DEFAULT NULL,
  `vloga` enum('brez','upravljalec','administrator') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'brez'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `ime`, `priimek`, `email`, `geslo`, `vloga`) VALUES
(13, 'tedstadsf', 'tset', 'test@gmail.com', '$2y$12$tVigSv3znWqkSG6.bcH42uq73EeOGehUlcJd9Pl3TzMUGrvB4jUIm', 'administrator'),
(14, 'nino', 'gubic', 'gubicnino@gmail.com', '$2y$12$EmnmWSCH7qhYQMYP1utNDOGU9ThFxgxxq/51hz.u1T3RJBeUBhyAq', 'administrator'),
(17, 'test', 'asfd', 'sdaf@gmail.com', '$2y$12$qQwHnEu25dzTnYQHNFSmNu1XWcDYweSKMEcTLHhe7rweZDJOMuKIG', 'upravljalec');

-- --------------------------------------------------------

--
-- Table structure for table `verification_codes`
--

DROP TABLE IF EXISTS `verification_codes`;
CREATE TABLE `verification_codes` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `code` varchar(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `ip_address` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `verification_codes`
--

INSERT INTO `verification_codes` (`id`, `user_id`, `code`, `created_at`, `expires_at`, `used`, `ip_address`) VALUES
(1, 14, '838991', '2025-12-13 12:56:14', '2025-12-13 13:06:14', 0, '172.18.0.1'),
(2, 14, '061515', '2025-12-13 12:56:58', '2025-12-13 13:06:58', 0, '172.18.0.1'),
(3, 14, '359165', '2025-12-13 13:04:56', '2025-12-13 13:14:56', 0, '172.18.0.1'),
(4, 14, '703544', '2025-12-13 13:24:27', '2025-12-13 13:34:27', 0, '172.18.0.1'),
(5, 14, '365443', '2025-12-13 13:26:11', '2025-12-13 13:36:11', 1, '172.18.0.1'),
(6, 14, '929689', '2025-12-13 13:27:46', '2025-12-13 13:37:46', 1, '172.18.0.1'),
(7, 14, '487823', '2025-12-13 13:30:52', '2025-12-13 13:40:52', 1, '172.18.0.1'),
(8, 14, '682160', '2025-12-13 13:34:54', '2025-12-13 13:44:54', 1, '172.18.0.1'),
(9, 14, '944575', '2025-12-13 13:36:58', '2025-12-13 13:46:58', 1, '172.18.0.1'),
(10, 14, '522236', '2025-12-13 13:43:12', '2025-12-13 13:53:12', 1, '172.18.0.1'),
(11, 14, '709957', '2025-12-15 10:19:13', '2025-12-15 10:29:13', 1, '172.18.0.1'),
(12, 14, '323264', '2025-12-15 12:16:33', '2025-12-15 12:26:33', 1, '172.18.0.1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu_category`
--
ALTER TABLE `menu_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `menu_item`
--
ALTER TABLE `menu_item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `pdfconfirmation`
--
ALTER TABLE `pdfconfirmation`
  ADD PRIMARY KEY (`pdf_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`);

--
-- Indexes for table `reservation_table`
--
ALTER TABLE `reservation_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tableentity`
--
ALTER TABLE `tableentity`
  ADD PRIMARY KEY (`table_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `verification_codes`
--
ALTER TABLE `verification_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_code` (`code`),
  ADD KEY `idx_expires` (`expires_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu_category`
--
ALTER TABLE `menu_category`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `menu_item`
--
ALTER TABLE `menu_item`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT for table `pdfconfirmation`
--
ALTER TABLE `pdfconfirmation`
  MODIFY `pdf_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `reservation_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `reservation_table`
--
ALTER TABLE `reservation_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `tableentity`
--
ALTER TABLE `tableentity`
  MODIFY `table_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `verification_codes`
--
ALTER TABLE `verification_codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menu_item`
--
ALTER TABLE `menu_item`
  ADD CONSTRAINT `menu_item_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `menu_category` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `verification_codes`
--
ALTER TABLE `verification_codes`
  ADD CONSTRAINT `verification_codes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
