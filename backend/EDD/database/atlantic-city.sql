-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: mi_base_de_datos
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'activo',
  `id_segmento` int DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `email` (`email`),
  KEY `id_segmento` (`id_segmento`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_segmento`) REFERENCES `segmento` (`id_segmento`) ON DELETE SET NULL,
  CONSTRAINT `cliente_chk_1` CHECK ((`estado` in (_utf8mb4'activo',_utf8mb4'inactivo',_utf8mb4'suspendido')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidencia`
--

DROP TABLE IF EXISTS `incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidencia` (
  `id_incidencia` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `tipo_incidencia` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_resolucion` datetime DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'abierta',
  `solucion` text,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_incidencia`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `incidencia_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE,
  CONSTRAINT `incidencia_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL,
  CONSTRAINT `incidencia_chk_1` CHECK ((`estado` in (_utf8mb4'abierta',_utf8mb4'en_proceso',_utf8mb4'resuelta',_utf8mb4'cerrada')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidencia`
--

LOCK TABLES `incidencia` WRITE;
/*!40000 ALTER TABLE `incidencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interaccion`
--

DROP TABLE IF EXISTS `interaccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interaccion` (
  `id_interaccion` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_promocion` int DEFAULT NULL,
  `tipo_interaccion` varchar(50) NOT NULL,
  `fecha_interaccion` datetime DEFAULT CURRENT_TIMESTAMP,
  `canal` varchar(50) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `notas` text,
  PRIMARY KEY (`id_interaccion`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_promocion` (`id_promocion`),
  CONSTRAINT `interaccion_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE,
  CONSTRAINT `interaccion_ibfk_2` FOREIGN KEY (`id_promocion`) REFERENCES `promocion` (`id_promocion`),
  CONSTRAINT `interaccion_chk_1` CHECK ((`canal` in (_utf8mb4'email',_utf8mb4'sms',_utf8mb4'whatsapp',_utf8mb4'telefono',_utf8mb4'presencial',_utf8mb4'web'))),
  CONSTRAINT `interaccion_chk_2` CHECK ((`estado` in (_utf8mb4'enviado',_utf8mb4'entregado',_utf8mb4'leido',_utf8mb4'respondido',_utf8mb4'fallido')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interaccion`
--

LOCK TABLES `interaccion` WRITE;
/*!40000 ALTER TABLE `interaccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `interaccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_ejecucion`
--

DROP TABLE IF EXISTS `log_ejecucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_ejecucion` (
  `id_log` int NOT NULL AUTO_INCREMENT,
  `id_tarea` int NOT NULL,
  `fecha_ejecucion` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado_ejecucion` varchar(50) NOT NULL,
  `registros_procesados` int DEFAULT '0',
  `errores` text,
  PRIMARY KEY (`id_log`),
  KEY `id_tarea` (`id_tarea`),
  CONSTRAINT `log_ejecucion_ibfk_1` FOREIGN KEY (`id_tarea`) REFERENCES `tarea_automatica` (`id_tarea`) ON DELETE CASCADE,
  CONSTRAINT `log_ejecucion_chk_1` CHECK ((`estado_ejecucion` in (_utf8mb4'exitosa',_utf8mb4'fallida',_utf8mb4'parcial',_utf8mb4'cancelada'))),
  CONSTRAINT `log_ejecucion_chk_2` CHECK ((`registros_procesados` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_ejecucion`
--

LOCK TABLES `log_ejecucion` WRITE;
/*!40000 ALTER TABLE `log_ejecucion` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_ejecucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promocion`
--

DROP TABLE IF EXISTS `promocion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promocion` (
  `id_promocion` int NOT NULL AUTO_INCREMENT,
  `nombre_promocion` varchar(150) NOT NULL,
  `descripcion` text,
  `condiciones` text,
  `descuento_porcentaje` decimal(5,2) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` varchar(20) DEFAULT 'activa',
  `id_segmento` int DEFAULT NULL,
  PRIMARY KEY (`id_promocion`),
  KEY `id_segmento` (`id_segmento`),
  CONSTRAINT `promocion_ibfk_1` FOREIGN KEY (`id_segmento`) REFERENCES `segmento` (`id_segmento`) ON DELETE SET NULL,
  CONSTRAINT `promocion_chk_1` CHECK (((`descuento_porcentaje` >= 0) and (`descuento_porcentaje` <= 100))),
  CONSTRAINT `promocion_chk_2` CHECK ((`estado` in (_utf8mb4'activa',_utf8mb4'inactiva',_utf8mb4'finalizada'))),
  CONSTRAINT `promocion_chk_3` CHECK ((`fecha_fin` >= `fecha_inicio`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promocion`
--

LOCK TABLES `promocion` WRITE;
/*!40000 ALTER TABLE `promocion` DISABLE KEYS */;
/*!40000 ALTER TABLE `promocion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reporte`
--

DROP TABLE IF EXISTS `reporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte` (
  `id_reporte` int NOT NULL AUTO_INCREMENT,
  `tipo_reporte` varchar(50) NOT NULL,
  `id_promocion` int NOT NULL,
  `fecha_generacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `total_enviados` int DEFAULT '0',
  `total_abiertos` int DEFAULT '0',
  `total_conversiones` int DEFAULT '0',
  `tasa_efectividad` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_reporte`),
  KEY `id_promocion` (`id_promocion`),
  CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`id_promocion`) REFERENCES `promocion` (`id_promocion`) ON DELETE CASCADE,
  CONSTRAINT `reporte_chk_1` CHECK ((`total_enviados` >= 0)),
  CONSTRAINT `reporte_chk_2` CHECK ((`total_abiertos` >= 0)),
  CONSTRAINT `reporte_chk_3` CHECK ((`total_conversiones` >= 0)),
  CONSTRAINT `reporte_chk_4` CHECK (((`tasa_efectividad` >= 0) and (`tasa_efectividad` <= 100)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte`
--

LOCK TABLES `reporte` WRITE;
/*!40000 ALTER TABLE `reporte` DISABLE KEYS */;
/*!40000 ALTER TABLE `reporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `segmento`
--

DROP TABLE IF EXISTS `segmento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `segmento` (
  `id_segmento` int NOT NULL AUTO_INCREMENT,
  `nombre_segmento` varchar(100) NOT NULL,
  `descripcion` text,
  `criterios` text,
  `fecha_creacion` date DEFAULT NULL,
  PRIMARY KEY (`id_segmento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `segmento`
--

LOCK TABLES `segmento` WRITE;
/*!40000 ALTER TABLE `segmento` DISABLE KEYS */;
/*!40000 ALTER TABLE `segmento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarea_automatica`
--

DROP TABLE IF EXISTS `tarea_automatica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarea_automatica` (
  `id_tarea` int NOT NULL AUTO_INCREMENT,
  `nombre_tarea` varchar(150) NOT NULL,
  `tipo_tarea` varchar(50) NOT NULL,
  `frecuencia` varchar(50) DEFAULT NULL,
  `hora_ejecucion` time DEFAULT NULL,
  `proxima_ejecucion` datetime DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'activa',
  `id_promocion` int DEFAULT NULL,
  `id_segmento` int DEFAULT NULL,
  PRIMARY KEY (`id_tarea`),
  KEY `id_promocion` (`id_promocion`),
  KEY `id_segmento` (`id_segmento`),
  CONSTRAINT `tarea_automatica_ibfk_1` FOREIGN KEY (`id_promocion`) REFERENCES `promocion` (`id_promocion`) ON DELETE CASCADE,
  CONSTRAINT `tarea_automatica_ibfk_2` FOREIGN KEY (`id_segmento`) REFERENCES `segmento` (`id_segmento`) ON DELETE CASCADE,
  CONSTRAINT `tarea_automatica_chk_1` CHECK ((`tipo_tarea` in (_utf8mb4'envio_email',_utf8mb4'envio_sms',_utf8mb4'segmentacion',_utf8mb4'notificacion'))),
  CONSTRAINT `tarea_automatica_chk_2` CHECK ((`frecuencia` in (_utf8mb4'diaria',_utf8mb4'semanal',_utf8mb4'mensual',_utf8mb4'unica'))),
  CONSTRAINT `tarea_automatica_chk_3` CHECK ((`estado` in (_utf8mb4'activa',_utf8mb4'inactiva',_utf8mb4'pausada')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarea_automatica`
--

LOCK TABLES `tarea_automatica` WRITE;
/*!40000 ALTER TABLE `tarea_automatica` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarea_automatica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `nivel_acceso` varchar(50) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'activo',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `usuario_chk_1` CHECK ((`rol` in (_utf8mb4'admin',_utf8mb4'gerente_operaciones',_utf8mb4'gerente_marketing',_utf8mb4'gerente_servicio',_utf8mb4'gerente_rrhh',_utf8mb4'gerente_ti',_utf8mb4'gerente_negocios'))),
  CONSTRAINT `usuario_chk_2` CHECK ((`nivel_acceso` in (_utf8mb4'completo',_utf8mb4'lectura',_utf8mb4'escritura',_utf8mb4'limitado'))),
  CONSTRAINT `usuario_chk_3` CHECK ((`estado` in (_utf8mb4'activo',_utf8mb4'inactivo',_utf8mb4'bloqueado')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-07 14:25:41
