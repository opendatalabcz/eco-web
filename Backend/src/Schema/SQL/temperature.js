module.exports = {
    DAILY_TEMPERATURE_SQL: `
        SELECT hydrometeo_measurement.id,
            station_id,
            hydrometeo_type,
            hydrometeo_measurement.date,
            avg_value,
            min_value,
            max_value,
            last_updated
        FROM hydrometeo_measurement
        WHERE station_id = $1
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Temperature'
            )
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        ORDER BY hydrometeo_measurement.date ASC
    `,
    MONTHLY_TEMPERATURE_SQL: `
        SELECT 
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
            MIN(CASE WHEN min_value <> 'NaN' THEN min_value ELSE NULL END),
            MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id = $1 
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id 
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Temperature'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, tmpMonth, hydrometeo_type
    `,
    ANNUAL_TEMPERATURE_SQL: `
        SELECT
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            MIN(CASE WHEN min_value <> 'NaN' THEN min_value ELSE NULL END),
            MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
            AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
            hydrometeo_type
        FROM hydrometeo_measurement
        WHERE hydrometeo_measurement.station_id = $1
            AND hydrometeo_type = (
                SELECT hydrometeo_types.id 
                FROM hydrometeo_types
                WHERE hydrometeo_types.name = 'Temperature'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, hydrometeo_type
    `,
    REGIONAL_DAILY_TEMPERATURE_SQL: `
        SELECT
            hydrometeo_measurement.date,
            MIN(CASE WHEN min_value <> 'NaN' THEN min_value ELSE NULL END),
            MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
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
                WHERE hydrometeo_types.name = 'Temperature'
            )
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY hydrometeo_measurement.date, hydrometeo_type
        ORDER BY hydrometeo_measurement.date ASC
    `,
    REGIONAL_MONTHLY_TEMPERATURE_SQL: `
        SELECT 
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
            MIN(CASE WHEN min_value <> 'NaN' THEN min_value ELSE NULL END),
            MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
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
                WHERE hydrometeo_types.name = 'Temperature'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, tmpMonth, hydrometeo_type
    `,
    REGIONAL_ANNUAL_TEMPERATURE_SQL: `
        SELECT
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            MIN(CASE WHEN min_value <> 'NaN' THEN min_value ELSE NULL END),
            MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
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
                WHERE hydrometeo_types.name = 'Temperature'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, hydrometeo_type
    `,
    DAILY_COUNTRY_TEMPERATURE_SQL: `
        SELECT
            hydrometeo_measurement.date,
            MIN(CASE WHEN min_value <> 'NaN' THEN min_value ELSE NULL END),
            MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
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
                WHERE hydrometeo_types.name = 'Temperature'
            )
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY hydrometeo_measurement.date, hydrometeo_type
        ORDER BY hydrometeo_measurement.date ASC
    `,
    MONTHLY_COUNTRY_TEMPERATURE_SQL: `
        SELECT 
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
            MIN(CASE WHEN min_value <> 'NaN' THEN min_value ELSE NULL END),
            MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
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
                WHERE hydrometeo_types.name = 'Temperature'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, tmpMonth, hydrometeo_type
    `,
    ANNUAL_COUNTRY_TEMPERATURE_SQL: `
        SELECT
            EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
            MIN(CASE WHEN min_value <> 'NaN' THEN min_value ELSE NULL END),
            MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
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
                WHERE hydrometeo_types.name = 'Temperature'
            ) 
            AND hydrometeo_measurement.date BETWEEN $2 AND $3
        GROUP BY tmpYear, hydrometeo_type
    `,
};
