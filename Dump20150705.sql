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
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
INSERT INTO `activity_log` VALUES (61,'2015-06-20 23:29:17','player','haley','zylka','Sophomore','insert','media',23,30),(62,'2015-06-22 00:50:14','admin','Coach','Bryan','Sophomore','insert','players',32,0),(63,'2015-06-22 00:50:45','admin','Coach','Bryan','Sophomore','insert','players',33,0),(64,'2015-06-22 00:51:04','admin','Coach','Bryan','Sophomore','insert','players',34,0),(65,'2015-06-22 00:51:26','admin','Coach','Bryan','Sophomore','insert','players',35,0),(66,'2015-06-22 00:51:57','admin','Coach','Bryan','Sophomore','insert','players',36,0),(67,'2015-06-22 00:52:21','admin','Coach','Bryan','Sophomore','insert','players',37,0),(68,'2015-06-22 00:53:41','admin','Coach','Bryan','Sophomore','insert','players',38,0),(69,'2015-06-22 00:54:09','admin','Coach','Bryan','Sophomore','insert','players',39,0),(70,'2015-06-22 01:12:28','player','haley','zylka','Sophomore','insert','media',24,30),(71,'2015-06-23 18:18:47','player','haley','zylka','Sophomore','insert','media',25,30),(72,'2015-06-23 18:18:51','player','haley','zylka','Sophomore','insert','media',26,30),(73,'2015-06-23 18:18:56','player','haley','zylka','Sophomore','insert','media',27,30),(74,'2015-06-23 18:18:59','player','haley','zylka','Sophomore','insert','media',28,30),(75,'2015-06-23 18:51:30','player','haley','zylka','Sophomore','insert','media',29,30),(76,'2015-06-23 23:55:29','admin','Coach','Bryan','Sophomore','insert','game_info',10,0),(77,'2015-06-23 23:55:29','admin','Coach','Bryan','Sophomore','insert','game_info_lines',10,0),(78,'2015-06-24 22:50:25','admin','Coach','Bryan','Sophomore','delete','players',33,0),(79,'2015-06-24 22:51:11','admin','Coach','Bryan','Sophomore','insert','players',40,0),(80,'2015-06-27 01:40:51','admin','Coach','Bryan','Sophomore','delete','players',37,0),(81,'2015-06-27 01:41:09','admin','Coach','Bryan','Sophomore','insert','players',41,0),(82,'2015-06-27 00:49:30','player','haley','zylka','Sophomore','insert','media',33,30),(83,'2015-07-04 17:06:14','admin','Coach','Bryan','Sophomore','insert','game_info',11,0),(84,'2015-07-04 19:43:51','admin','Coach','Bryan','Sophomore','insert','players',42,0),(85,'2015-07-04 19:44:13','admin','Coach','Bryan','Sophomore','insert','players',43,0),(86,'2015-07-04 19:44:26','admin','Coach','Bryan','Sophomore','insert','players',44,0),(87,'2015-07-04 19:44:44','admin','Coach','Bryan','Sophomore','insert','players',45,0),(88,'2015-07-04 19:45:00','admin','Coach','Bryan','Sophomore','insert','players',46,0),(89,'2015-07-04 19:45:19','admin','Coach','Bryan','Sophomore','insert','players',47,0),(90,'2015-07-04 19:45:47','admin','Coach','Bryan','Sophomore','insert','players',48,0),(91,'2015-07-04 19:46:10','admin','Coach','Bryan','Sophomore','insert','players',49,0),(92,'2015-07-04 19:46:31','admin','Coach','Bryan','Sophomore','insert','players',50,0),(93,'2015-07-04 19:46:47','admin','Coach','Bryan','Sophomore','insert','players',51,0),(94,'2015-07-04 19:47:35','admin','Coach','Bryan','Sophomore','insert','game_info',12,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_info`
--

LOCK TABLES `game_info` WRITE;
/*!40000 ALTER TABLE `game_info` DISABLE KEYS */;
INSERT INTO `game_info` VALUES (11,'2015-07-04 00:45:00','','CT','','','','',0,'',0,'','Sophomore',1,NULL),(12,'2015-07-01 01:15:00','','DC','','','','',0,'',0,'','Sophomore',1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_lines`
--

LOCK TABLES `game_lines` WRITE;
/*!40000 ALTER TABLE `game_lines` DISABLE KEYS */;
INSERT INTO `game_lines` VALUES (31,11,1,4,2,4,0,0,0,0,3,0,2,2,0,1,2,0,1),(32,11,5,8,3,3,0,0,2,2,0,0,2,2,0,3,0,0,1),(33,11,21,12,4,7,0,0,4,4,1,1,0,1,0,0,0,0,2),(34,11,30,3,0,2,0,0,3,4,1,1,3,4,0,0,1,0,0),(35,11,50,8,4,7,0,0,0,0,2,2,0,2,0,2,0,0,3),(36,11,4,0,0,1,0,0,0,0,1,0,3,3,0,0,2,0,1),(37,11,11,0,0,1,0,0,0,0,2,1,3,4,0,1,1,0,1),(38,11,15,13,3,6,0,1,7,11,0,1,4,5,0,2,0,0,1),(39,11,32,1,0,1,0,1,1,2,1,0,1,1,0,1,2,0,2),(40,11,9999,6,3,3,0,0,0,0,0,0,0,0,0,4,0,0,0),(41,12,1,0,0,3,0,2,0,0,7,1,3,4,0,1,1,0,0),(42,12,5,10,1,5,2,3,2,2,1,2,1,3,0,2,2,0,0),(43,12,11,0,0,2,0,0,0,0,0,2,4,6,0,0,2,0,0),(44,12,21,12,4,7,1,1,1,2,1,1,3,4,0,0,2,0,2),(45,12,50,14,5,12,0,0,4,5,2,2,3,5,2,2,1,0,2),(46,12,4,6,2,4,0,0,2,3,4,1,3,4,0,4,4,0,1),(47,12,15,6,3,5,0,0,0,2,1,1,3,4,0,3,1,0,1),(48,12,30,0,0,4,0,0,0,0,1,2,1,3,0,0,2,0,0),(49,12,32,2,1,4,0,1,0,0,0,0,1,1,0,2,1,0,0),(50,12,9999,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (56,42,'/img/uploads/ex41436057300046.jpg','photo'),(57,42,'/img/uploads/ex51436057305526.jpg','photo'),(58,42,'/img/uploads/ex41436057310037.jpg','photo');
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (42,'Haley','Zylka',NULL,NULL,NULL,1,NULL,'PG','Sophomore','0','0','0'),(43,'Mariana','Ibanez-Baldor',NULL,NULL,NULL,4,NULL,'G','Sophomore','0','0','0'),(44,'Emma','Ralfs',NULL,NULL,NULL,5,NULL,'G','Sophomore','0','0','0'),(45,'Celina','Schwantes',NULL,NULL,NULL,11,NULL,'F','Sophomore','0','0','0'),(46,'Jenny','Cape',NULL,NULL,NULL,13,NULL,'PG','Sophomore','0','0','0'),(47,'Abby','Lownik',NULL,NULL,NULL,15,NULL,'PG','Sophomore','0','0','0'),(48,'Kassandra','Bartek',NULL,NULL,NULL,21,NULL,'G','Sophomore','0','0','0'),(49,'Michaela','Barrette',NULL,NULL,NULL,30,NULL,'F','Sophomore','0','0','0'),(50,'Adriana','Plavsic',NULL,NULL,NULL,32,NULL,'F','Sophomore','0','0','0'),(51,'Corrine','Kurz',NULL,NULL,NULL,50,NULL,'F','Sophomore','0','0','0');
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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (59,'coach1','$2a$10$bL.Q3fD6YP/xltiffH87Lu3MKY5j.W5X0c1To1N/IXF8g0v7VHWYW','floyd1985@hotmail.com','Coach','Bryan','admin',NULL),(63,'haley_zylka','$2a$10$q3TrBf8sBuoxOiRbBJl6Ju842skAcqRj4LtXM.0RwiEHrNClo/j9e','floyd1985@hotmail.com','haley','zylka','player',30),(64,'emma_ralfs','$2a$10$l.vmn4XKLFqiV5SQS4B5mua7922W0oWR2DFwOAv667A7uehX0iISS','floyd1985@hotmail.com','emma','ralfs','player',31),(65,'mariana_ibanez-baldor','$2a$10$ZPqGbQDx/Bw3xIaJPuH8Tus47jtAP.6qwiyXSPjLn7kMOwOsy1MXi','floyd1985@hotmail.com','mariana','ibanez-baldor','player',32),(66,'celina_schwantes','$2a$10$XKzhCU.Abx0HsLYFQdTR9.fwWHLKHvHoqCXs.J8DSUEVmpzKixXXW','floyd1985@hotmail.com','celina','schwantes','player',33),(67,'jenny_cape','$2a$10$URfaVvLFCzKKlC2n.BR0uOJqJTYMItyeoyBwzih8iYcGgBhRoFvvG','floyd1985@hotmail.com','jenny','cape','player',34),(68,'abby_lownik','$2a$10$9Q9wd5mFup9a.nDkw3U3sOO8lpz5p1JA10BJYiQ83GHBtX0L34vCK','floyd1985@hotmail.com','abby','lownik','player',35),(69,'kassandra_bartek','$2a$10$Ck77c7Jv0QQulbkqJmgRa.B.wHrUYRCV0U/qwnoXKDTkhgGIjYXGK','floyd1985@hotmail.com','kassandra','bartek','player',36),(70,'michaela_barrette','$2a$10$yxt/iE5vtXSMb4WzEEs4fu7jixgMxGU2Oin0Arf2vr1w3mPEeLTU.','floyd1985@hotmail.com','michaela','barrette','player',37),(71,'adriana_plavsic','$2a$10$URbQ5zf2ayUyK6j5vHOJauZ5FwawRqAXWfabEXPfesB8IjSMRxNDG','floyd1985@hotmail.com','adriana','plavsic','player',38),(72,'corrine_kurz','$2a$10$JBhzekbkC9p8PLiMGVyT3.MmNSZ4MxndPfBVhTrZYSWc2KB9tTAjm','floyd1985@hotmail.com','corrine','kurz','player',39),(73,'celina_schwantes','$2a$10$JAjCzJslF04JYXOeZjdGK.7aObSpMOksXY4cIHBrWLqmJysP.kQVm','floyd1985@hotmail.com','celina','schwantes','player',40),(74,'michaela_barrette','$2a$10$Y2Wa/ogNZ9R7KquCOPu.k.019OLF5bBTuv5Dp8U9TG1dJk1ypWgXG','floyd1985@hotmail.com','michaela','barrette','player',41),(75,'haley_zylka','$2a$10$4PyCsU6VsZzAsMOKvDxMvuc7ZMNXq0nUqx4.mWI4p3AwsvXNJH.5C','floyd1985@hotmail.com','haley','zylka','player',42),(76,'mariana_ibanez-baldor','$2a$10$skviVzQmdjKxTXtsdMyjj.LGY8InptT3xihfJaFF1aQLRijNNmO/6','floyd1985@hotmail.com','mariana','ibanez-baldor','player',43),(77,'emma_ralfs','$2a$10$M3MuGzQ9LvGMrjmKUD8qaeWY6/3bvKrR19gfT2iKNGzNWXLUJWZai','floyd1985@hotmail.com','emma','ralfs','player',44),(78,'celina_schwantes','$2a$10$FQarJbKZamT.2yNi8flXHeVzM3hfFeyu9BTkz5dMvB/t5J3JUOpDi','floyd1985@hotmail.com','celina','schwantes','player',45),(79,'jenny_cape','$2a$10$jPaO8yeOHIRDQCkgnz3dQ.oQGVF0dRZJPJtlTjJ0jy4STeRzVY3QS','floyd1985@hotmail.com','jenny','cape','player',46),(80,'abby_lownik','$2a$10$GGBO8JDqcJaLX2hSrVhOZOx.piGgibTukbNg0KPDThdq2VqGXaeBW','floyd1985@hotmail.com','abby','lownik','player',47),(81,'kassandra_bartek','$2a$10$NwCGNXYUvxkbEVH8ZxfPGO91j5FFQ3XXjxZAwB5j6Ut6RxJ3zpaTK','floyd1985@hotmail.com','kassandra','bartek','player',48),(82,'michaela_barrette','$2a$10$SkKlnTtHPRXvK5.nzGwwNuDONruL5DYCA0E/SgZsipBQ0i3FnnRWW','floyd1985@hotmail.com','michaela','barrette','player',49),(83,'adriana_plavsic','$2a$10$VCGkwh6kFEccb3Il329YAursFngjUwMaj6yubfp.YbstFjR1ow1tS','floyd1985@hotmail.com','adriana','plavsic','player',50),(84,'corrine_kurz','$2a$10$2/I3M.vm2SZYZ36Q90Mlj.nD2eHm.wfn1qVHS2u7B1YoJcIIpfdzG','floyd1985@hotmail.com','corrine','kurz','player',51);
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

-- Dump completed on 2015-07-05 23:27:02
