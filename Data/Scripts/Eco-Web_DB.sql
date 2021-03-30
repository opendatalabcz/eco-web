CREATE TABLE "hydrometeo_measurement" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "station_id" varchar NOT NULL,
  "hydrometeo_type" int,
  "date" date NOT NULL,
  "value" numeric,
  "min_value" numeric,
  "max_value" numeric,
  "avg_value" numeric,
  "azimuth" numeric,
  "time" time,
  "symptom" char,
  "total_value" numeric,
  "total_symptom" numeric,
  "last_updated" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "hydrometeo_types" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar,
  "unit" varchar
);

CREATE TABLE "station" (
  "id" varchar UNIQUE PRIMARY KEY NOT NULL,
  "region_id" int NOT NULL,
  "station_type" numeric NOT NULL,
  "location_name" varchar NOT NULL,
  "longitude" numeric,
  "latitude" numeric,
  "height" numeric
);

CREATE TABLE "region" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "shortcut" varchar NOT NULL,
  "country_name" varchar NOT NULL,
  "country_shortcut" varchar NOT NULL
);

CREATE TABLE "woods_measurement" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "region_id" int NOT NULL,
  "etc" numeric,
  "last_updated" timestamp NOT NULL DEFAULT (now())
);

ALTER TABLE "hydrometeo_measurement" ADD FOREIGN KEY ("station_id") REFERENCES "station" ("id");

ALTER TABLE "hydrometeo_measurement" ADD FOREIGN KEY ("hydrometeo_type") REFERENCES "hydrometeo_types" ("id");

ALTER TABLE "station" ADD FOREIGN KEY ("region_id") REFERENCES "region" ("id");

ALTER TABLE "woods_measurement" ADD FOREIGN KEY ("region_id") REFERENCES "region" ("id");
