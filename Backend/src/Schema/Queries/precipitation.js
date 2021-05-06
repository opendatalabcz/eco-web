const pool = require('../../db');
const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const { makeDate } = require('../../helpers');

module.exports = {
    GET_DAILY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of daily precipitation for station between two dates',
        args: {
            stationID: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT hydrometeo_measurement.id,
                    station_id,
                    hydrometeo_type,
                    hydrometeo_measurement.date,
                    avg_value,
                    total_value,
                    total_symptom,
                    last_updated
                FROM hydrometeo_measurement
                WHERE station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Precipitation'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, avg_value, total_value, total_symptom, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avgHumidity: avg_value === 'NaN' ? null : avg_value,
                    totalPrecipitation: total_value === 'NaN' ? null : total_value,
                    totalPrecipitationSymptom: total_symptom,
                    lastUpdated: last_updated
                });
            });
        }
    }),
    GET_MONTHLY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of monthly precipitation for station between two dates',
        args: {
            stationID: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT 
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,0),
                    SUM(CASE WHEN total_value <> 'NaN' THEN total_value ELSE NULL END),
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1 
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Precipitation'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, sum, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_ANNUAL_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of annual precipitation for station between two dates',
        args: {
            stationID: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT 
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,0),
                    SUM(CASE WHEN total_value <> 'NaN' THEN total_value ELSE NULL END),
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1 
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Precipitation'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, sum, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_REGIONAL_DAILY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of daily precipitation for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,0),
                    SUM(CASE WHEN total_value <> 'NaN' THEN total_value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Precipitation'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY hydrometeo_measurement.date, hydrometeo_type
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_REGIONAL_MONTHLY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of daily precipitation for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT 
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,0),
                    SUM(CASE WHEN total_value <> 'NaN' THEN total_value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Precipitation'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_REGIONAL_ANNUAL_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of annual precipitation for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,0),
                    SUM(CASE WHEN total_value <> 'NaN' THEN total_value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Precipitation'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_COUNTRY_DAILY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of daily precipitation for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,0),
                    SUM(CASE WHEN total_value <> 'NaN' THEN total_value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Precipitation'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY hydrometeo_measurement.date, hydrometeo_type
                ORDER BY hydrometeo_measurement.date ASC`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_COUNTRY_MONTHLY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of monthly precipitation for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT 
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    EXTRACT(MONTH FROM hydrometeo_measurement.date) AS tmpMonth,
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,0),
                    SUM(CASE WHEN total_value <> 'NaN' THEN total_value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Precipitation'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_COUNTRY_ANNUAL_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(PrecipitationType),
        description: 'A list of annual precipitation for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,0),
                    SUM(CASE WHEN total_value <> 'NaN' THEN total_value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Precipitation'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
};
