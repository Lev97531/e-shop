-- Adminer 5.4.0 SQLite 3.49.2 dump

DROP TABLE IF EXISTS "categories";
CREATE TABLE "categories" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"parent_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_parent" FOREIGN KEY("parent_id") REFERENCES "categories"("id")
);

INSERT INTO "categories" ("id", "name", "parent_id") VALUES (1,	'Phones',	NULL);
INSERT INTO "categories" ("id", "name", "parent_id") VALUES (2,	'Android',	1);
INSERT INTO "categories" ("id", "name", "parent_id") VALUES (3,	'IOS',	1);

DROP TABLE IF EXISTS "items";
CREATE TABLE "items" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"price"	INTEGER NOT NULL,
	"category_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_category" FOREIGN KEY("category_id") REFERENCES "categories"("id")
);

INSERT INTO "items" ("id", "name", "price", "category_id") VALUES (1,	'Samsung A52',	1,	2);
INSERT INTO "items" ("id", "name", "price", "category_id") VALUES (2,	'Iphone 16',	9999999,	3);
INSERT INTO "items" ("id", "name", "price", "category_id") VALUES (3,	'Chair',	13,	NULL);

DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE sqlite_sequence(name,seq);

INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('items',	3);
INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('users',	1);
INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('categories',	3);

DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE UNIQUE INDEX "sqlite_autoindex_users_1" ON "users" ("email");

INSERT INTO "users" ("id", "name", "email") VALUES (1,	'admin',	'admin@test.com');

-- 2025-10-15 16:31:46 UTC