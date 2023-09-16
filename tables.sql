create database world;

use world;

CREATE TABLE `customer` (
  `idcustomer` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  PRIMARY KEY (`idcustomer`)
);
/

CREATE TABLE `world`.`order` (
  `idorder` INT NOT NULL,
  `idcustomer` INT NULL,
  `item_order` varchar(45),
  `item_quantity` int,
  `item_unit_price` int,
  PRIMARY KEY (`idorder`),
  CONSTRAINT idcustomer
    FOREIGN KEY(idcustomer) REFERENCES customer(idcustomer));
/

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBillbyId`(in ID int)
BEGIN
	select idorder as 'order id', 
			item_order as 'item name' ,
            item_quantity as 'item Quantity',
            item_unit_price
				from `order` where idcustomer = ID;
END;
/

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAlloders`()
BEGIN
	select o.idorder as 'order id', 
			o.item_order as 'item name' ,
            o.item_quantity as 'item Quantity',
            o.item_unit_price,
            c.name,
            c.lastname,
            c.idcustomer
				from `order` o, customer c where c.idcustomer = o.idcustomer;
END;
/