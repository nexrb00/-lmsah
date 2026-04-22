CREATE TABLE `salla_integrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sallaStoreId` varchar(128) NOT NULL,
	`sallaAccessToken` text NOT NULL,
	`sallaRefreshToken` text,
	`storeName` varchar(256),
	`storeEmail` varchar(320),
	`storePhone` varchar(32),
	`isConnected` boolean NOT NULL DEFAULT false,
	`lastSyncAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `salla_integrations_id` PRIMARY KEY(`id`),
	CONSTRAINT `salla_integrations_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `salla_integrations_sallaStoreId_unique` UNIQUE(`sallaStoreId`)
);
--> statement-breakpoint
CREATE TABLE `salla_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sallaOrderId` bigint NOT NULL,
	`customerName` varchar(256) NOT NULL,
	`customerEmail` varchar(320),
	`totalAmount` int NOT NULL,
	`status` varchar(64) NOT NULL,
	`itemsCount` int DEFAULT 0,
	`orderDate` timestamp,
	`lastSyncAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `salla_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `salla_products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sallaProductId` bigint NOT NULL,
	`productName` varchar(256) NOT NULL,
	`productDescription` text,
	`price` int NOT NULL,
	`quantity` int DEFAULT 0,
	`imageUrl` text,
	`sallaUrl` text,
	`lastSyncAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `salla_products_id` PRIMARY KEY(`id`)
);
