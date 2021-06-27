CREATE TABLE "hydrometeo_measurement" (
  "id" SERIAL NOT NULL,
  "station_id" varchar NOT NULL,
  "hydrometeo_type" int NOT NULL,
  "date" date NOT NULL,
  "value" numeric,
  "min_value" numeric,
  "max_value" numeric,
  "avg_value" numeric,
  "azimuth" numeric,
  "time" time,
  "symptom" varchar,
  "total_value" numeric,
  "total_symptom" varchar,
  "last_updated" timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT "hydrometeo_measurement_pkey" PRIMARY KEY ("id", "hydrometeo_type")
) PARTITION BY LIST ("hydrometeo_type");

CREATE TABLE "Temperature"
PARTITION OF "hydrometeo_measurement"
FOR VALUES IN (1);

CREATE TABLE "Water"
PARTITION OF "hydrometeo_measurement"
FOR VALUES IN (2);

CREATE TABLE "Pressure"
PARTITION OF "hydrometeo_measurement"
FOR VALUES IN (3);

CREATE TABLE "Wind"
PARTITION OF "hydrometeo_measurement"
FOR VALUES IN (4);

CREATE TABLE "Precipitation"
PARTITION OF "hydrometeo_measurement"
FOR VALUES IN (5);

CREATE TABLE "Shine"
PARTITION OF "hydrometeo_measurement"
FOR VALUES IN (6);

CREATE TABLE "Snow"
PARTITION OF "hydrometeo_measurement"
FOR VALUES IN (7);

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
  "country_shortcut" varchar NOT NULL,
  "longitude" numeric NOT NULL,
  "latitude" numeric NOT NULL
);

ALTER TABLE "hydrometeo_measurement" ADD FOREIGN KEY ("station_id") REFERENCES "station" ("id");

ALTER TABLE "hydrometeo_measurement" ADD FOREIGN KEY ("hydrometeo_type") REFERENCES "hydrometeo_types" ("id");

ALTER TABLE "station" ADD FOREIGN KEY ("region_id") REFERENCES "region" ("id");

CREATE INDEX "idx_hydrometeo_measurements_date" ON "hydrometeo_measurement" USING btree ("date" ASC NULLS LAST);

CREATE INDEX "idx_station_region" ON "station" USING btree ("region_id" ASC NULLS LAST) TABLESPACE pg_default;
