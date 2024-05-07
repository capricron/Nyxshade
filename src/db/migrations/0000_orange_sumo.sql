CREATE TABLE `host` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`ip` varchar(15),
	CONSTRAINT `host_id` PRIMARY KEY(`id`),
	CONSTRAINT `ip_idx` UNIQUE(`ip`)
);
