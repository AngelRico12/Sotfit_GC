-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS `outfit_gc` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Seleccionar la base de datos
USE `outfit_gc`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8mb4;

CREATE TABLE `almacen` (
  `id_almacen` int(11) NOT NULL,
  `id_sucursal` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha_entrada` date DEFAULT NULL,
  `fecha_salida` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `detalle_venta` (
  `id_producto` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `empleado` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `id_puesto` int(11) DEFAULT NULL,
  `id_sucursal` int(11) DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `contraseña` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `id_sucursal` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha_ultima_actualizacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `estado` enum('disponible','agotado','en stand by') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `puesto` (
  `id_puesto` int(11) NOT NULL,
  `nombre_puesto` varchar(255) DEFAULT NULL,
  `descripcion_puesto` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `reporte` (
  `id_reporte` int(11) NOT NULL,
  `id_sucursal` int(11) DEFAULT NULL,
  `tipo_reporte` enum('ventas','inventario','productividad') DEFAULT NULL,
  `fecha_generacion` date DEFAULT NULL,
  `url_reporte` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `sucursal` (
  `id_sucursal` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `transferencia` (
  `id_transferencia` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_sucursal_origen` int(11) DEFAULT NULL,
  `id_sucursal_destino` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha_transferencia` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `venta` (
  `id_venta` int(11) NOT NULL,
  `id_empleado` int(11) DEFAULT NULL,
  `id_sucursal` int(11) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `metodo_pago` enum('efectivo','tarjeta','transferencia') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `almacen`
  ADD PRIMARY KEY (`id_almacen`),
  ADD KEY `id_sucursal` (`id_sucursal`),
  ADD KEY `id_producto` (`id_producto`);

ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_producto`,`id_venta`),
  ADD KEY `id_venta` (`id_venta`);

ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `id_puesto` (`id_puesto`),
  ADD KEY `id_sucursal` (`id_sucursal`);

ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `id_sucursal` (`id_sucursal`),
  ADD KEY `id_producto` (`id_producto`);

ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

ALTER TABLE `puesto`
  ADD PRIMARY KEY (`id_puesto`);

ALTER TABLE `reporte`
  ADD PRIMARY KEY (`id_reporte`),
  ADD KEY `id_sucursal` (`id_sucursal`);

ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id_sucursal`);

ALTER TABLE `transferencia`
  ADD PRIMARY KEY (`id_transferencia`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_sucursal_origen` (`id_sucursal_origen`),
  ADD KEY `id_sucursal_destino` (`id_sucursal_destino`);

ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_empleado` (`id_empleado`),
  ADD KEY `id_sucursal` (`id_sucursal`);

ALTER TABLE `almacen`
  ADD CONSTRAINT `almacen_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id_sucursal`),
  ADD CONSTRAINT `almacen_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`);

ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_puesto`) REFERENCES `puesto` (`id_puesto`),
  ADD CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id_sucursal`);

ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id_sucursal`),
  ADD CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

ALTER TABLE `reporte`
  ADD CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id_sucursal`);

ALTER TABLE `transferencia`
  ADD CONSTRAINT `transferencia_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `transferencia_ibfk_2` FOREIGN KEY (`id_sucursal_origen`) REFERENCES `sucursal` (`id_sucursal`),
  ADD CONSTRAINT `transferencia_ibfk_3` FOREIGN KEY (`id_sucursal_destino`) REFERENCES `sucursal` (`id_sucursal`);

ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`),
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id_sucursal`);

COMMIT;

SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS;
SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION;

