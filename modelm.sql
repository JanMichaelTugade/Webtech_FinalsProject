-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 12, 2023 at 04:24 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`contentID`, `name`, `fileType`, `path`, `duration`) VALUES
(10, '100+ JavaScript Concepts you Need to Know.mp4', 'mp4', 'videos/100+ JavaScript Concepts you Need to Know.mp4', 743),
(11, 'PHP in 100 Seconds.mp4', 'mp4', 'videos/PHP in 100 Seconds.mp4', 141),
(12, 'Saint Louis University Hymn (SLU Hymn) Baguio City.mp4', 'mp4', 'videos/Saint Louis University Hymn (SLU Hymn) Baguio City.mp4', 114),
(13, 'Saint Louis University Prayer v2.mp4', 'mp4', 'videos/Saint Louis University Prayer v2.mp4', 123),
(14, 'Lupang Hinirang.mp4', 'mp4', 'videos/Lupang Hinirang.mp4', 72),
(15, '3pm prayer.mp4', 'mp4', 'videos/3pm prayer.mp4', 60);

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
  `ifLive` enum('streamed','live') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`histID`),
  UNIQUE KEY `fileID` (`fileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`histID`, `date`, `time`, `fileID`, `ifLive`) VALUES
(1, '2023-12-13', '00:24:14', 14, 'streamed');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `queue`
--

INSERT INTO `queue` (`sched_ID`, `content_ID`, `position`, `liveDuration`) VALUES
(1, 14, 1, NULL);

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
-- Table structure for table `start_end_time`
--

DROP TABLE IF EXISTS `start_end_time`;
CREATE TABLE IF NOT EXISTS `start_end_time` (
  `startTime` time NOT NULL,
  `endTime` time NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `start_end_time`
--

INSERT INTO `start_end_time` (`startTime`, `endTime`) VALUES
('23:35:00', '00:35:00');

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
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `fname`, `lname`, `role`) VALUES
('a', 'a', 'a', 'a', 'Manager'),
('kas', '123', 'kasimaaa', 'mendoza', 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `user_logs`
--

DROP TABLE IF EXISTS `user_logs`;
CREATE TABLE IF NOT EXISTS `user_logs` (
  `session_id` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `login_time` timestamp NOT NULL,
  `logout_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_logs`
--

INSERT INTO `user_logs` (`session_id`, `username`, `login_time`, `logout_time`) VALUES
('65781ae998e89', 'a', '2023-12-12 08:33:45', '2023-12-12 08:34:00'),
('65781b89bb869', 'a', '2023-12-12 08:36:25', '2023-12-12 08:36:55'),
('65781bc48d988', 'a', '2023-12-12 08:37:24', '2023-12-12 08:37:31'),
('65782a416ddbc', 'a', '2023-12-12 09:39:13', '2023-12-12 09:40:07'),
('65782ab94f572', 'a', '2023-12-12 09:41:13', '2023-12-12 10:06:32'),
('657830af3ef7a', 'a', '2023-12-12 10:06:39', NULL),
('657848cab7025', 'a', '2023-12-12 11:49:30', NULL),
('65785d13ac550', 'a', '2023-12-12 13:16:03', NULL),
('65787883c0ab9', 'a', '2023-12-12 15:13:07', NULL),
('65787a04b10fe', 'a', '2023-12-12 15:19:32', NULL),
('65787da28a1bf', 'a', '2023-12-12 15:34:58', NULL),
('65788430127df', 'a', '2023-12-12 16:02:56', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `queue`
--
ALTER TABLE `queue`
  ADD CONSTRAINT `content` FOREIGN KEY (`content_ID`) REFERENCES `content` (`contentID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `user_logs`
--
ALTER TABLE `user_logs`
  ADD CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
