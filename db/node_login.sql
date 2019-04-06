-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.21-1 - (Debian)
-- Server OS:                    Linux
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for nodelogin
CREATE DATABASE IF NOT EXISTS `nodelogin` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `nodelogin`;

-- Dumping structure for table nodelogin.confirm
CREATE TABLE IF NOT EXISTS `confirm` (
  `user` varchar(50) DEFAULT NULL,
  `code` varchar(300) DEFAULT NULL,
  KEY `FK_confirm_users` (`user`),
  CONSTRAINT `FK_confirm_users` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table nodelogin.confirm: ~1 rows (approximately)
/*!40000 ALTER TABLE `confirm` DISABLE KEYS */;
REPLACE INTO `confirm` (`user`, `code`) VALUES
	('admin', 'sha1$84a7eaee$1$eeada8672da810dcb67e62c5324dd21ddfbaf635');
/*!40000 ALTER TABLE `confirm` ENABLE KEYS */;

-- Dumping structure for table nodelogin.users
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role` enum('admin','level1','level2','level0') DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `Index 2` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table nodelogin.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`email`, `username`, `password`, `role`) VALUES
	('xiparuwite@first-email.net', 'admin', 'sha1$fcd2a390$1$0993676238ac7f07208ae2d2bbdd657c9fbef448', 'admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
