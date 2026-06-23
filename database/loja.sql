CREATE DATABASE IF NOT EXISTS `loja`;
USE `loja`;

CREATE TABLE IF NOT EXISTS `categorias` (
  `id_categoria` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `idcategoria_UNIQUE` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `clientes` (
  `id_cliente` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `status` enum('bom','medio','ruim') DEFAULT 'medio',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `id_cliente_UNIQUE` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `criado_em` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `endereco` (
  `id_endereco` int unsigned NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(45) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `bairro` varchar(45) NOT NULL,
  `cep` varchar(12) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `clientes_id_cliente` int unsigned NOT NULL,
  PRIMARY KEY (`id_endereco`),
  UNIQUE KEY `id_endereco_UNIQUE` (`id_endereco`),
  KEY `fk_endereco_clientes_idx` (`clientes_id_cliente`),
  CONSTRAINT `fk_endereco_clientes` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `pedidos` (
  `id_pedido` int unsigned NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `clientes_id_cliente` int unsigned NOT NULL,
  PRIMARY KEY (`id_pedido`),
  UNIQUE KEY `id_pedido_UNIQUE` (`id_pedido`),
  KEY `fk_pedidos_clientes1_idx` (`clientes_id_cliente`),
  CONSTRAINT `fk_pedidos_clientes1` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `produtos` (
  `id_produto` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(120) NOT NULL,
  `valor` double NOT NULL,
  `estoque` int NOT NULL DEFAULT '1',
  `categorias_id_categoria` int unsigned NOT NULL,
  PRIMARY KEY (`id_produto`),
  UNIQUE KEY `id_produto_UNIQUE` (`id_produto`),
  KEY `fk_produtos_categorias1_idx` (`categorias_id_categoria`),
  CONSTRAINT `fk_produtos_categorias1` FOREIGN KEY (`categorias_id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `produtos_pedidos` (
  `produtos_id_produto` int unsigned NOT NULL,
  `pedidos_id_pedido` int unsigned NOT NULL,
  `quantidade` double NOT NULL,
  `valor` double NOT NULL,
  PRIMARY KEY (`produtos_id_produto`,`pedidos_id_pedido`),
  KEY `fk_produtos_has_pedidos_pedidos1_idx` (`pedidos_id_pedido`),
  KEY `fk_produtos_has_pedidos_produtos1_idx` (`produtos_id_produto`),
  CONSTRAINT `fk_produtos_has_pedidos_pedidos1` FOREIGN KEY (`pedidos_id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `fk_produtos_has_pedidos_produtos1` FOREIGN KEY (`produtos_id_produto`) REFERENCES `produtos` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
