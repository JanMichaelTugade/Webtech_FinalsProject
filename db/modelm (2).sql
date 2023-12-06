-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 06, 2023 at 01:23 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `modelm`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE IF NOT EXISTS `content` (
  `contentID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `fileType` enum('mp3','mp4') NOT NULL,
  `path` varchar(99) NOT NULL,
  `startTime` time(6) DEFAULT NULL,
  `endTime` time(6) DEFAULT NULL,
  PRIMARY KEY (`contentID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`contentID`, `name`, `fileType`, `path`, `startTime`, `endTime`) VALUES
(1, 'Hitori no Shita', 'mp4', 'videos/Hitori no Shita - The Outcast 3 - Fight Scene [4K].mp4', '08:30:00.000000', '09:00:00.000000'),
(2, '73c1d826-57d3-4', 'mp4', 'videos/73c1d826-57d3-45af-bc25-897dc7373c86.mp4', NULL, NULL),
(3, 'bear.mp4', 'mp4', 'videos/bear.mp4', NULL, NULL),
(4, 'earth.mp4', 'mp4', 'videos/earth.mp4', NULL, NULL),
(5, 'Maki vs Miwa an', 'mp4', 'videos/Maki vs Miwa and Mai│Fight Scene│Jujutsu Kaisen Episode 17.mp4', NULL, NULL),
(6, 'Levi vs Kenny F', 'mp4', 'videos/Levi vs Kenny Fight Scene 4k _ Attack On Titan 4k.mp4', NULL, NULL),
(7, 'Bakuretsu Bakur', 'mp4', 'videos/Bakuretsu Bakuretsu Bakuretsu - La La La.mp4', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `livestream`
--

DROP TABLE IF EXISTS `livestream`;
CREATE TABLE IF NOT EXISTS `livestream` (
  `title` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `startTime` time(6) NOT NULL,
  `endTime` time(6) NOT NULL,
  PRIMARY KEY (`startTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `histID` int NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `fileID` int NOT NULL,
  `ifLive` enum('live','streamed') NOT NULL,
  PRIMARY KEY (`histID`),
  UNIQUE KEY `fileID` (`fileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
CREATE TABLE IF NOT EXISTS `record` (
  `fileID` int NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`fileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `role` enum('Manager','Admin') NOT NULL,
  `status` enum('Online','Offline') NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `fname`, `lname`, `role`, `status`) VALUES
('a', 'a', 'a', 'a', 'Manager', 'Online'),
('admin', 'admin', '', '', '', 'Offline'),
('cms', 'manager', 'toogadi', 'janmaykol', '', 'Offline');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `fileid` FOREIGN KEY (`fileID`) REFERENCES `record` (`fileID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
