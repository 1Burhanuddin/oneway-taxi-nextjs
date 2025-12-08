-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: oneway_taxi
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Admin_username_key` (`username`),
  UNIQUE KEY `Admin_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES (3,'admin','$2b$10$6PKm68Yw/Q28JowRWGVT0ed36E296J2FQYWU2UflWbrpVANbN.2o2','admin@oneway-taxi.com','2025-12-05 06:17:40.349','2025-12-05 06:17:40.349');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cab`
--

DROP TABLE IF EXISTS `Cab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cab` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacityPassengers` int NOT NULL,
  `capacityLuggage` int NOT NULL,
  `baseImageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `features` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Cab_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cab`
--

LOCK TABLES `Cab` WRITE;
/*!40000 ALTER TABLE `Cab` DISABLE KEYS */;
INSERT INTO `Cab` VALUES (30,'Tata Winger','Van',12,8,'/onewaytaxicablogo/winger.jpg','12-seater van for group travel','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\", \"Group Travel\"]'),(31,'Toyota Innova','SUV',6,3,'/onewaytaxicablogo/innova.jpg','6-seater premium SUV','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\", \"Premium Interior\"]'),(32,'Tempo Traveler','Bus',17,10,'/onewaytaxicablogo/Tempo-traveler.jpg','17-seater bus for group travel','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\", \"Group Travel\"]'),(33,'Hyundai Xcent','Sedan',4,2,'/onewaytaxicablogo/hyundai-xcent.jpg','Reliable compact sedan','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\"]'),(34,'Swift Dzire','Sedan',4,2,'/onewaytaxicablogo/maruti-suzuki-swift-dzire.jpeg','Popular compact sedan','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\"]'),(35,'KIA Carens','SUV',4,4,'/onewaytaxicablogo/kia-carens.jpeg','Modern SUV with spacious interior','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\", \"Modern Interior\"]'),(36,'KIA Carnival','SUV',6,4,'/onewaytaxicablogo/Kia-Carnival.jpg','Luxury MPV with captain seats','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\", \"Premium Interior\", \"Captain Seats\"]'),(37,'Toyota Innova Crysta','SUV',6,3,'/onewaytaxicablogo/Toyota-Innova-Crysta.jpg','Luxury 6-seater SUV with premium features','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\", \"Premium Interior\", \"Leather Seats\"]'),(38,'Suzuki Ciaz','Sedan',4,3,'/onewaytaxicablogo/Maruti-Suzuki-Ciaz.jpg','Premium sedan with extra luggage space','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\"]'),(39,'Toyota Ertiga','SUV',7,3,'/onewaytaxicablogo/ertiga.jpg','7-seater SUV for family travel','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\", \"Extra Space\"]'),(40,'Honda Amaze','Sedan',4,2,'/onewaytaxicablogo/honda_amaze.jpg','Spacious and fuel-efficient sedan','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\"]'),(41,'Toyota Etios','Sedan',4,3,'/onewaytaxicablogo/etios-car-1.jpg','Comfortable sedan for city travel','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\"]'),(42,'Hyundai Aura','Sedan',4,2,'/onewaytaxicablogo/Hyundai_Aura.jpg','Modern sedan with premium features','2025-12-05 06:17:40.399','2025-12-05 06:17:40.399','[\"AC\", \"GPS\", \"Music System\"]');
/*!40000 ALTER TABLE `Cab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LocalPackage`
--

DROP TABLE IF EXISTS `LocalPackage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LocalPackage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cabId` int DEFAULT NULL,
  `hoursIncluded` int NOT NULL,
  `kmIncluded` int NOT NULL,
  `priceFixed` int NOT NULL,
  `extraKmRate` int DEFAULT NULL,
  `extraHourRate` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `LocalPackage_cabId_fkey` (`cabId`),
  CONSTRAINT `LocalPackage_cabId_fkey` FOREIGN KEY (`cabId`) REFERENCES `Cab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LocalPackage`
--

LOCK TABLES `LocalPackage` WRITE;
/*!40000 ALTER TABLE `LocalPackage` DISABLE KEYS */;
INSERT INTO `LocalPackage` VALUES (63,40,8,80,2000,12,150,'2025-12-05 06:17:40.464','2025-12-05 06:17:40.464'),(64,42,8,80,2000,12,150,'2025-12-05 06:17:40.464','2025-12-05 06:17:40.464'),(65,31,8,80,3500,16,250,'2025-12-05 06:17:40.464','2025-12-05 06:17:40.464'),(66,33,8,80,2000,12,150,'2025-12-05 06:17:40.464','2025-12-05 06:17:40.464'),(67,34,8,80,2000,12,150,'2025-12-05 06:17:40.464','2025-12-05 06:17:40.464'),(68,41,8,80,2000,12,150,'2025-12-05 06:17:40.464','2025-12-05 06:17:40.464'),(69,38,8,80,2000,12,150,'2025-12-05 06:17:40.464','2025-12-05 06:17:40.464'),(70,39,8,80,2700,14,200,'2025-12-05 06:17:40.464','2025-12-05 06:17:40.464');
/*!40000 ALTER TABLE `LocalPackage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cityName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `isAirport` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Location_cityName_key` (`cityName`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
INSERT INTO `Location` VALUES (12,'Surat','Gujarat','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,0),(13,'Surat Airport','Gujarat','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,1),(14,'Rajkot Airport','Gujarat','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,1),(15,'Ahmedabad','Gujarat','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,0),(16,'Ahmedabad Airport','Gujarat','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,1),(17,'Mumbai Airport','Maharashtra','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,1),(18,'Mumbai','Maharashtra','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,0),(19,'Pune','Maharashtra','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,0),(20,'Rajkot','Gujarat','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,0),(21,'Vadodara','Gujarat','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,0),(22,'Vadodara Airport','Gujarat','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,1),(23,'Pune Airport','Maharashtra','2025-12-05 06:17:40.364','2025-12-05 06:17:40.364',NULL,NULL,1);
/*!40000 ALTER TABLE `Location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OneWayPackage`
--

DROP TABLE IF EXISTS `OneWayPackage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OneWayPackage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sourceId` int NOT NULL,
  `destinationId` int NOT NULL,
  `cabId` int DEFAULT NULL,
  `priceFixed` int NOT NULL,
  `distanceKm` double DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `estimatedHours` int DEFAULT NULL,
  `estimatedMinutes` int DEFAULT NULL,
  `packageFeatures` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OneWayPackage_sourceId_fkey` (`sourceId`),
  KEY `OneWayPackage_destinationId_fkey` (`destinationId`),
  KEY `OneWayPackage_cabId_fkey` (`cabId`),
  CONSTRAINT `OneWayPackage_cabId_fkey` FOREIGN KEY (`cabId`) REFERENCES `Cab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `OneWayPackage_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Location` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `OneWayPackage_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Location` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OneWayPackage`
--

LOCK TABLES `OneWayPackage` WRITE;
/*!40000 ALTER TABLE `OneWayPackage` DISABLE KEYS */;
INSERT INTO `OneWayPackage` VALUES (144,13,12,37,5000,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(145,12,15,34,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(146,13,12,38,3500,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(147,13,12,34,3500,280,'2025-12-05 06:17:40.421','2025-12-05 06:17:40.421',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(148,12,15,40,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(149,12,15,38,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(150,12,13,38,3500,280,'2025-12-05 06:17:40.421','2025-12-05 06:17:40.421',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(151,13,12,33,3500,280,'2025-12-05 06:17:40.421','2025-12-05 06:17:40.421',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(152,12,13,41,3500,280,'2025-12-05 06:17:40.421','2025-12-05 06:17:40.421',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(153,12,13,40,3500,280,'2025-12-05 06:17:40.421','2025-12-05 06:17:40.421',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(154,12,13,34,3500,280,'2025-12-05 06:17:40.421','2025-12-05 06:17:40.421',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(155,12,15,42,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(156,13,12,39,4500,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(157,12,13,33,3500,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(158,12,13,37,5000,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(159,13,12,40,3500,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(160,15,13,42,3500,NULL,'2025-12-05 06:17:40.422','2025-12-05 06:54:26.557',4,30,'[\"Assured Cab (Confirmed Cab Arrival)\", \"Verified Driver\", \"Includes One Pick Up & One Drop Within City at Your Doorstep\", \"Hygiene & Clean Cabs\", \"Fixed Fare – No KMs Limitations\", \"24*7 Customer Support On Call\", \"Parking Charges Will Be Extra\"]'),(161,15,12,38,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(162,15,12,34,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(163,12,15,37,5000,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(164,13,12,41,3500,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(165,15,12,40,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(166,15,12,37,5000,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(167,15,12,33,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(168,12,15,39,4500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(169,12,15,33,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(170,15,12,39,4500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(171,12,15,41,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(172,12,13,39,4500,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(173,12,13,42,3500,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(174,13,12,42,3500,280,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',5,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]'),(175,15,12,41,3500,265,'2025-12-05 06:17:40.422','2025-12-05 06:17:40.422',4,30,'[\"Assured Cab\", \"Verified Driver\", \"Toll Parking Extra\"]');
/*!40000 ALTER TABLE `OneWayPackage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RoundTripRate`
--

DROP TABLE IF EXISTS `RoundTripRate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RoundTripRate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cabId` int DEFAULT NULL,
  `ratePerKm` int NOT NULL,
  `driverAllowancePerDay` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `dailyKmLimit` int NOT NULL DEFAULT '300',
  PRIMARY KEY (`id`),
  KEY `RoundTripRate_cabId_fkey` (`cabId`),
  CONSTRAINT `RoundTripRate_cabId_fkey` FOREIGN KEY (`cabId`) REFERENCES `Cab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoundTripRate`
--

LOCK TABLES `RoundTripRate` WRITE;
/*!40000 ALTER TABLE `RoundTripRate` DISABLE KEYS */;
INSERT INTO `RoundTripRate` VALUES (25,35,17,300,'2025-12-05 06:17:40.480','2025-12-05 06:42:51.228',300),(26,37,20,300,'2025-12-05 06:17:40.480','2025-12-05 06:43:29.285',300),(27,39,14,300,'2025-12-05 06:17:40.480','2025-12-05 06:43:16.213',300),(28,34,11,300,'2025-12-05 06:17:40.480','2025-12-05 06:17:40.480',300),(29,31,16,300,'2025-12-05 06:17:40.480','2025-12-05 06:43:23.198',300),(30,36,35,300,'2025-12-05 06:17:40.480','2025-12-05 06:42:59.521',300);
/*!40000 ALTER TABLE `RoundTripRate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TripBooking`
--

DROP TABLE IF EXISTS `TripBooking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TripBooking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('ONEWAY','ROUNDTRIP','LOCAL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cabId` int DEFAULT NULL,
  `oneWayPackageId` int DEFAULT NULL,
  `localPackageId` int DEFAULT NULL,
  `pickupLocationId` int DEFAULT NULL,
  `dropLocationId` int DEFAULT NULL,
  `pickupDate` datetime(3) DEFAULT NULL,
  `pickupTime` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `journeyDays` int DEFAULT NULL,
  `estimatedPrice` int DEFAULT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specialRequest` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alternativeNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flightNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TripBooking_cabId_fkey` (`cabId`),
  KEY `TripBooking_oneWayPackageId_fkey` (`oneWayPackageId`),
  KEY `TripBooking_localPackageId_fkey` (`localPackageId`),
  KEY `TripBooking_pickupLocationId_fkey` (`pickupLocationId`),
  KEY `TripBooking_dropLocationId_fkey` (`dropLocationId`),
  CONSTRAINT `TripBooking_cabId_fkey` FOREIGN KEY (`cabId`) REFERENCES `Cab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `TripBooking_dropLocationId_fkey` FOREIGN KEY (`dropLocationId`) REFERENCES `Location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `TripBooking_localPackageId_fkey` FOREIGN KEY (`localPackageId`) REFERENCES `LocalPackage` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `TripBooking_oneWayPackageId_fkey` FOREIGN KEY (`oneWayPackageId`) REFERENCES `OneWayPackage` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `TripBooking_pickupLocationId_fkey` FOREIGN KEY (`pickupLocationId`) REFERENCES `Location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TripBooking`
--

LOCK TABLES `TripBooking` WRITE;
/*!40000 ALTER TABLE `TripBooking` DISABLE KEYS */;
INSERT INTO `TripBooking` VALUES (8,'ONEWAY',42,NULL,NULL,15,12,'2025-12-05 00:00:00.000','12:21',NULL,3500,'Burhanuddin','111burhanuddin@gmail.com','1234567890',NULL,NULL,NULL,'CONFIRMED','2025-12-05 06:51:18.761','2025-12-05 06:52:32.325');
/*!40000 ALTER TABLE `TripBooking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-06 10:43:19
