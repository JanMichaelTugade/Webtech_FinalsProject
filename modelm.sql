-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 15, 2023 at 10:06 AM
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
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fileType` enum('mp3','mp4') NOT NULL,
  `path` varchar(99) NOT NULL,
  `duration` int DEFAULT NULL,
  PRIMARY KEY (`contentID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`contentID`, `name`, `fileType`, `path`, `duration`) VALUES
(1, '100+ JavaScript Concepts you Need to Know.mp4', 'mp4', 'videos/100+ JavaScript Concepts you Need to Know.mp4', 743),
(2, 'PHP in 100 Seconds.mp4', 'mp4', 'videos/PHP in 100 Seconds.mp4', 141),
(3, 'Saint Louis University Hymn (SLU Hymn) Baguio City.mp4', 'mp4', 'videos/Saint Louis University Hymn (SLU Hymn) Baguio City.mp4', 114),
(4, 'Saint Louis University Prayer v2.mp4', 'mp4', 'videos/Saint Louis University Prayer v2.mp4', 123),
(5, 'Lupang Hinirang.mp4', 'mp4', 'videos/Lupang Hinirang.mp4', 72),
(6, '3pm prayer.mp4', 'mp4', 'videos/3pm prayer.mp4', 60);

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
(1, '2023-12-13', '00:24:14', 14, 'streamed'),
(2, '2023-12-14', '15:54:26', 1, 'streamed');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `queue`
--

INSERT INTO `queue` (`sched_ID`, `content_ID`, `position`, `liveDuration`) VALUES
(2, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `start_end_time`
--

DROP TABLE IF EXISTS `start_end_time`;
CREATE TABLE IF NOT EXISTS `start_end_time` (
  `startTime` time NOT NULL,
  `endTime` time NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `start_end_time`
--

INSERT INTO `start_end_time` (`startTime`, `endTime`) VALUES
('21:07:00', '22:07:00');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `fname`, `lname`, `role`) VALUES
('admin', 'admin', 'admin', 'admin', 'Admin'),
('manager', 'manager', 'Manager', 'Manager', 'Manager');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_logs`
--

INSERT INTO `user_logs` (`session_id`, `username`, `login_time`, `logout_time`) VALUES
('657ab467285b4', 'manager', '2023-12-14 07:53:11', '2023-12-14 07:57:56'),
('657ab5890b56b', 'manager', '2023-12-14 07:58:01', NULL);

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
