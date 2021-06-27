module.exports = {
    DAILY_PRESSURE_SQL: `
        SELECT hydrometeo_measurement.id,
            station_id,
            hydrometeo_type,
            hydrometeo_measurement.date,
            avg_value,
            last_updated
        FROM hydrometeo_measurement
        WHERE station_id = $1
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            )
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        ORDER BY hydrometeo_measurement.date ASC
    `,
    MONTHLY_PRESSURE_SQL: `
        SELECT 
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id = $1
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id 
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, tmpMonth, hydrometeo_type
    `,
    ANNUAL_PRESSURE_SQL: `
        SELECT 
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id = $1
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id 
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, hydrometeo_type
    `,
    REGIONAL_DAILY_PRESSURE_SQL: `
        SELECT
            hydrometeo_measurement.date,
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id IN (
                SELECT station.id
                FROM station
                WHERE region_id = $1
            )
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            )
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY hydrometeo_measurement.date, hydrometeo_type
        ORDER BY hydrometeo_measurement.date ASC
    `,
    REGIONAL_MONTHLY_PRESSURE_SQL: `
        SELECT 
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id IN (
                SELECT station.id
                FROM station
                WHERE region_id = $1
            )
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id 
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, tmpMonth, hydrometeo_type
    `,
    REGIONAL_ANNUAL_PRESSURE_SQL: `
        SELECT
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id IN (
                SELECT station.id
                FROM station
                WHERE region_id = $1
            )
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id 
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, hydrometeo_type
    `,
    DAILY_COUNTRY_PRESSURE_SQL: `
        SELECT
            hydrometeo_measurement.date,
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id IN (
                SELECT station.id
                FROM station
                WHERE region_id IN (
                    SELECT region.id
                    FROM region
                    WHERE region.country_shortcut = $1
                )
            )
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            )
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY hydrometeo_measurement.date, hydrometeo_type
        ORDER BY hydrometeo_measurement.date ASC
    `,
    MONTHLY_COUNTRY_PRESSURE_SQL: `
        SELECT 
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id IN (
                SELECT station.id
                FROM station
                WHERE region_id IN (
                    SELECT region.id
                    FROM region
                    WHERE region.country_shortcut = $1
                )
            )
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id 
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, tmpMonth, hydrometeo_type
    `,
    ANNUAL_COUNTRY_PRESSURE_SQL: `
        SELECT
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id IN (
                SELECT station.id
                FROM station
                WHERE region_id IN (
                    SELECT region.id
                    FROM region
                    WHERE region.country_shortcut = $1
                )
            )
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id 
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Pressure'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, hydrometeo_type
    `,
};
