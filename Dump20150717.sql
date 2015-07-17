CREATE DATABASE  IF NOT EXISTS `havoc` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `havoc`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: localhost    Database: havoc
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_log` (
  `activity_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `team` varchar(45) DEFAULT NULL,
  `action` varchar(45) DEFAULT NULL,
  `table_changed` varchar(45) DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`activity_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
INSERT INTO `activity_log` VALUES (98,'2015-07-11 22:20:31','admin','Coach','Bryan','Sophomore','insert','players',54,0),(99,'2015-07-11 22:21:55','admin','Coach','Bryan','Sophomore','insert','players',55,0),(100,'2015-07-11 22:23:25','admin','Coach','Bryan','Sophomore','insert','players',56,0),(101,'2015-07-11 22:39:05','admin','Coach','Bryan','Sophomore','insert','game_info',13,0),(102,'2015-07-11 22:41:15','admin','Coach','Bryan','Sophomore','delete','game_info',13,0),(103,'2015-07-11 22:41:16','admin','Coach','Bryan','Sophomore','delete','game_info',13,0),(104,'2015-07-11 22:45:16','admin','Coach','Bryan','Freshman','insert','players',57,0),(105,'2015-07-11 22:45:41','admin','Coach','Bryan','Freshman','insert','players',58,0),(106,'2015-07-11 22:45:57','admin','Coach','Bryan','Freshman','insert','players',59,0),(107,'2015-07-11 22:46:26','admin','Coach','Bryan','Freshman','insert','players',60,0),(108,'2015-07-11 22:46:47','admin','Coach','Bryan','Freshman','insert','players',61,0),(109,'2015-07-12 18:30:09','admin','Coach','Bryan','Sophomore','insert','players',62,0),(110,'2015-07-12 18:30:41','admin','Coach','Bryan','Sophomore','insert','players',63,0),(111,'2015-07-12 18:30:57','admin','Coach','Bryan','Sophomore','insert','players',64,0),(112,'2015-07-12 18:31:15','admin','Coach','Bryan','Sophomore','insert','players',65,0),(113,'2015-07-12 18:31:39','admin','Coach','Bryan','Sophomore','insert','players',66,0),(114,'2015-07-12 18:32:04','admin','Coach','Bryan','Freshman','insert','players',67,0),(115,'2015-07-12 18:32:24','admin','Coach','Bryan','Sophomore','insert','players',68,0),(116,'2015-07-12 18:33:21','admin','Coach','Bryan','Sophomore','delete','players',68,0),(117,'2015-07-12 18:33:46','admin','Coach','Bryan','Freshman','insert','players',69,0),(118,'2015-07-12 18:34:16','admin','Coach','Bryan','Freshman','insert','players',70,0),(119,'2015-07-12 18:34:30','admin','Coach','Bryan','Sophomore','insert','players',71,0),(120,'2015-07-12 18:34:45','admin','Coach','Bryan','Sophomore','insert','players',72,0),(121,'2015-07-12 18:35:01','admin','Coach','Bryan','Sophomore','insert','players',73,0),(122,'2015-07-12 21:12:43','admin','Coach','Bryan','Sophomore','insert','game_info',1,0),(123,'2015-07-12 21:12:55','admin','Coach','Bryan','Freshman','insert','game_info',2,0),(124,'2015-07-12 21:16:31','admin','Coach','Bryan','sophomore','insert','game_info',3,0),(125,'2015-07-12 21:16:41','admin','Coach','Bryan','freshman','insert','game_info',4,0),(126,'2015-07-12 21:37:39','admin','Coach','Bryan','sophomore','insert','game_info',5,0),(127,'2015-07-12 21:38:01','admin','Coach','Bryan','freshman','insert','game_info',6,0),(128,'2015-07-12 23:01:35','admin','Coach','Bryan','7thgrade','insert','players',74,0),(129,'2015-07-15 18:04:39','admin','Coach','Bryan','sophomore','insert','players',75,0),(130,'2015-07-15 23:45:48','admin','Coach','Bryan','sophomore','insert','players',76,0),(131,'2015-07-17 14:43:13','admin','Coach','Bryan','freshman','delete','players',57,0),(132,'2015-07-17 15:10:41','admin','Coach','Bryan','sophomore','insert','players',77,0),(133,'2015-07-17 15:13:16','player','michaela','jordan','sophomore','insert','media',10,76),(134,'2015-07-17 15:13:19','player','michaela','jordan','sophomore','insert','media',11,76);
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_info`
--

DROP TABLE IF EXISTS `game_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_info` (
  `game_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `havoc_score` int(11) DEFAULT NULL,
  `opponent` varchar(255) DEFAULT NULL,
  `opponent_score` int(11) DEFAULT NULL,
  `game_result` varchar(2) DEFAULT NULL,
  `team` varchar(45) DEFAULT NULL,
  `has_box` tinyint(4) DEFAULT NULL,
  `season` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`game_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_info`
--

LOCK TABLES `game_info` WRITE;
/*!40000 ALTER TABLE `game_info` DISABLE KEYS */;
INSERT INTO `game_info` VALUES (3,'2015-07-02 00:45:00','','AL','','','','',0,'',0,'','sophomore',1,NULL),(4,'2015-07-01 00:45:00','','AK','','','','',0,'',0,'','freshman',1,NULL),(5,'2015-07-02 02:00:00','','AZ','','','','',0,'none',0,'','sophomore',1,NULL),(6,'2015-07-07 00:45:00','','IA','','','','',0,'iowa',0,'','freshman',1,NULL);
/*!40000 ALTER TABLE `game_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_lines`
--

DROP TABLE IF EXISTS `game_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_lines` (
  `game_line_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_info_id` int(11) DEFAULT NULL,
  `Jersey` int(11) DEFAULT NULL,
  `Points` int(11) DEFAULT NULL,
  `TwoPointsMade` int(11) DEFAULT NULL,
  `TwoPointAttempts` int(11) DEFAULT NULL,
  `ThreePointsMade` int(11) DEFAULT NULL,
  `ThreePointAttempts` int(11) DEFAULT NULL,
  `FreeThrowsMade` int(11) DEFAULT NULL,
  `FreeThrowAttempts` int(11) DEFAULT NULL,
  `Assists` int(11) DEFAULT NULL,
  `OffensiveRebounds` int(11) DEFAULT NULL,
  `DefensiveRebounds` int(11) DEFAULT NULL,
  `Rebounds` int(11) DEFAULT NULL,
  `BlockedShots` int(11) DEFAULT NULL,
  `Steals` int(11) DEFAULT NULL,
  `Turnovers` int(11) DEFAULT NULL,
  `Charges` int(11) DEFAULT NULL,
  `PersonalFouls` int(11) DEFAULT NULL,
  PRIMARY KEY (`game_line_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_lines`
--

LOCK TABLES `game_lines` WRITE;
/*!40000 ALTER TABLE `game_lines` DISABLE KEYS */;
INSERT INTO `game_lines` VALUES (1,3,1,4,2,4,0,0,0,0,3,0,2,2,0,1,2,0,1),(2,3,5,8,3,3,0,0,2,2,0,0,2,2,0,3,0,0,1),(3,3,21,12,4,7,0,0,4,4,1,1,0,1,0,0,0,0,2),(4,3,30,3,0,2,0,0,3,4,1,1,3,4,0,0,1,0,0),(5,3,50,8,4,7,0,0,0,0,2,2,0,2,0,2,0,0,3),(6,3,4,0,0,1,0,0,0,0,1,0,3,3,0,0,2,0,1),(7,3,11,0,0,1,0,0,0,0,2,1,3,4,0,1,1,0,1),(8,3,15,13,3,6,0,1,7,11,0,1,4,5,0,2,0,0,1),(9,3,32,1,0,1,0,1,1,2,1,0,1,1,0,1,2,0,2),(10,3,9999,6,3,3,0,0,0,0,0,0,0,0,0,4,0,0,0),(11,4,4,0,0,1,0,0,0,0,1,1,1,2,0,0,2,0,1),(12,4,15,7,3,3,0,0,1,2,1,1,3,4,0,1,3,0,4),(13,4,21,7,3,8,0,0,1,4,2,1,2,3,0,1,2,0,0),(14,4,30,5,2,3,0,0,1,2,0,0,4,4,0,1,2,0,1),(15,4,32,2,1,2,0,1,0,0,0,0,2,2,0,1,1,0,1),(16,4,1,6,2,7,0,2,2,4,6,0,4,4,0,1,3,0,1),(17,4,5,3,1,3,0,2,1,2,1,1,1,2,0,1,0,0,1),(18,4,11,5,2,2,0,0,1,2,0,0,2,2,0,2,0,0,0),(19,4,50,8,2,6,0,0,4,5,0,2,2,4,0,5,0,0,1),(20,4,9999,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),(21,5,1,0,0,3,0,2,0,0,7,1,3,4,0,1,1,0,0),(22,5,5,10,1,5,2,3,2,2,1,2,1,3,0,2,2,0,0),(23,5,11,0,0,2,0,0,0,0,0,2,4,6,0,0,2,0,0),(24,5,21,12,4,7,1,1,1,2,1,1,3,4,0,0,2,0,2),(25,5,50,14,5,12,0,0,4,5,2,2,3,5,2,2,1,0,2),(26,5,4,6,2,4,0,0,2,3,4,1,3,4,0,4,4,0,1),(27,5,15,6,3,5,0,0,0,2,1,1,3,4,0,3,1,0,1),(28,5,30,0,0,4,0,0,0,0,1,2,1,3,0,0,2,0,0),(29,5,32,2,1,4,0,1,0,0,0,0,1,1,0,2,1,0,0),(30,5,9999,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0),(31,6,4,0,0,1,0,1,0,0,0,0,0,0,0,0,3,0,0),(32,6,5,9,3,7,1,2,0,0,0,2,1,3,0,2,0,0,0),(33,6,21,12,4,9,0,1,4,4,0,3,6,9,1,1,4,0,1),(34,6,30,0,0,3,0,0,0,0,1,1,2,3,0,0,2,0,1),(35,6,50,4,2,4,0,0,0,0,2,0,4,4,0,0,3,0,1),(36,6,1,5,1,6,1,3,0,0,2,0,3,3,0,0,3,0,4),(37,6,11,3,1,2,0,0,1,2,3,1,3,4,0,0,0,2,5),(38,6,15,4,2,3,0,0,0,0,0,1,0,1,0,0,4,1,3),(39,6,32,0,0,2,0,0,0,0,0,1,1,2,0,0,0,0,1),(40,6,9999,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1);
/*!40000 ALTER TABLE `game_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `media_id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `media_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`media_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,63,'/img/uploads/ex51436921137984.jpg','photo'),(2,63,'/img/uploads/ex41436921143166.jpg','photo'),(3,63,'/img/uploads/ex41436921146770.jpg','photo'),(4,63,'/img/uploads/ex51436921196184.jpg','photo'),(5,63,'/img/uploads/ex41436921202490.jpg','photo'),(6,63,'/img/uploads/ex51436921210027.jpg','photo'),(7,63,'/img/uploads/ex41436921213852.jpg','photo'),(8,63,'/img/uploads/ex41436921220647.jpg','photo'),(9,63,'/img/uploads/ex41436927393303.jpg','photo'),(10,76,'/img/uploads/ex51437163996107.jpg','photo'),(11,76,'/img/uploads/ex41437163999319.jpg','photo'),(12,65,'/img/uploads/ex51437164059830.jpg','photo'),(13,65,'/img/uploads/ex51437164064773.jpg','photo'),(14,65,'/img/uploads/ex41437164087746.jpg','photo');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `high_school` varchar(255) DEFAULT NULL,
  `grad_year` int(11) DEFAULT NULL,
  `jersey_number` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `team` varchar(45) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (65,'Sophomore','Player',NULL,NULL,NULL,4,NULL,'F','sophomore','http://www.youtube.com','',''),(66,'Sophomore','Player',NULL,NULL,NULL,5,NULL,'C','sophomore','','',''),(67,'Frosh','Player',NULL,NULL,NULL,6,NULL,'F','freshman','','',''),(69,'Frosh','Player',NULL,NULL,NULL,7,NULL,'C','freshman','','',''),(70,'Frosh','Player',NULL,NULL,NULL,8,NULL,'G','freshman','','',''),(71,'Soph','Player',NULL,NULL,NULL,6,NULL,'G','sophomore','','',''),(72,'Sophomore','Player',NULL,NULL,NULL,7,NULL,'G','sophomore','','',''),(73,'Sophomore','Player',NULL,NULL,NULL,8,NULL,'G','sophomore','','',''),(75,'Soph','Playa',NULL,NULL,NULL,9,NULL,'C','sophomore','','',''),(76,'Michaela','Jordan',NULL,NULL,NULL,23,NULL,'G','sophomore','https://www.youtube.com/embed/4Re4znDb6eE','http://www.instagram.com','0'),(77,'Soph','Playa',NULL,NULL,NULL,44,NULL,'F','sophomore','','','');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) DEFAULT NULL,
  `team_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (4,3,'7th Grade'),(5,2,'Freshman'),(6,1,'Sophomore');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (110,'coach_bryan','$2a$10$olVD6/.LVH8F6FMXAprhKewmCyJn3DSLWFhh0K7rXZ16erqyIV9QC','floyd1985@hotmail.com','coach','bryan','admin',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-07-17 16:20:13
