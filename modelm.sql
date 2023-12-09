-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 09, 2023 at 01:25 AM
-- Server version: 8.2.0
-- PHP Version: 7.4.26

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
  `name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fileType` enum('mp3','mp4') NOT NULL,
  `path` varchar(99) NOT NULL,
  `duration` int DEFAULT NULL,
  PRIMARY KEY (`contentID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`contentID`, `name`, `fileType`, `path`, `duration`) VALUES
(1, 'Bakuretsu Bakur', 'mp4', 'videos/Bakuretsu Bakuretsu Bakuretsu - La La La.mp4', 39),
(2, 'bear', 'mp4', 'videos/bear.mp4', 31),
(3, 'earth', 'mp4', 'videos/earth.mp4', 14),
(4, 'gojo vs n', 'mp4', 'videos/gojo vs n.mp4', 134),
(5, 'Hitori no Shita', 'mp4', 'videos/Hitori no Shita - The Outcast 3 - Fight Scene [4K].mp4', 74),
(6, 'Levi vs Kenny F', 'mp4', 'videos/Levi vs Kenny Fight Scene 4k _ Attack On Titan 4k.mp4', 332),
(7, 'Maki vs Miwa an', 'mp4', 'videos/Maki vs Miwa and Mai│Fight Scene│Jujutsu Kaisen Episode 17.mp4', 171),
(8, 'Live Stream', '', '', NULL),
(9, 'ni', 'mp4', 'videos/Bleach is God Tier.mp4', 2748);

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
-- Table structure for table `queue`
--

DROP TABLE IF EXISTS `queue`;
CREATE TABLE IF NOT EXISTS `queue` (
  `sched_ID` int NOT NULL AUTO_INCREMENT,
  `content_ID` int NOT NULL,
  `position` int NOT NULL,
  `liveDuration` int DEFAULT NULL,
  PRIMARY KEY (`sched_ID`),
  KEY `content` (`content_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `queue`
--

INSERT INTO `queue` (`sched_ID`, `content_ID`, `position`, `liveDuration`) VALUES
(29, 1, 1, NULL),
(41, 4, 2, NULL),
(44, 5, 3, NULL),
(45, 6, 4, NULL);

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
('a', 'a', 'a', 'a', 'Manager', 'Offline'),
('admin', 'admin', '', '', '', 'Offline');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `fileid` FOREIGN KEY (`fileID`) REFERENCES `record` (`fileID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `queue`
--
ALTER TABLE `queue`
  ADD CONSTRAINT `content` FOREIGN KEY (`content_ID`) REFERENCES `content` (`contentID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
