const pool = require('../../db');
const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const { makeDate } = require('../../helpers');

module.exports = {
    GET_DAILY_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of daily snow for station between two dates',
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
                    hydrometeo_measurement.value,
                    symptom,
                    hydrometeo_measurement.total_value,
                    total_symptom,
                    last_updated
                FROM hydrometeo_measurement
                WHERE station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Snow'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, value, symptom, total, total_symptom, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    fallen: value === 'NaN' ? null : value,
                    fallenSymptom: symptom,
                    totalHeight: total === 'NaN' ? null : total,
                    totalHeightSymptom: total_symptom,
                    lastUpdated: last_updated
                });
            });
        }
    }),
    GET_MONTHLY_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of monthly snow for station between two dates',
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
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN max_value ELSE NULL END) AS fallen,
                    SUM(CASE WHEN total_value <> 'NaN' THEN min_value ELSE NULL END) AS total_height,
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Snow'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        }
    }),
    GET_ANNUAL_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of annual snow for station between two dates',
        args: {
            stationID: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN max_value ELSE NULL END) AS fallen,
                    SUM(CASE WHEN total_value <> 'NaN' THEN min_value ELSE NULL END) AS total_height,
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Snow'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        }
    }),
    GET_REGIONAL_DAILY_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of daily snow for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN max_value ELSE NULL END) AS fallen,
                    SUM(CASE WHEN total_value <> 'NaN' THEN min_value ELSE NULL END) AS total_height,
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
                        WHERE hydrometeo_types.name = 'Snow'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY hydrometeo_measurement.date, hydrometeo_type
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        }
    }),
    GET_REGIONAL_MONTHLY_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of daily snow for region between two dates',
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
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN max_value ELSE NULL END) AS fallen,
                    SUM(CASE WHEN total_value <> 'NaN' THEN min_value ELSE NULL END) AS total_height,
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
                        WHERE hydrometeo_types.name = 'Snow'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        }
    }),
    GET_REGIONAL_ANNUAL_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of annual snow for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN max_value ELSE NULL END) AS fallen,
                    SUM(CASE WHEN total_value <> 'NaN' THEN min_value ELSE NULL END) AS total_height,
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
                        WHERE hydrometeo_types.name = 'Snow'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        }
    }),
    GET_COUNTRY_DAILY_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of daily snow for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN max_value ELSE NULL END) AS fallen,
                    SUM(CASE WHEN total_value <> 'NaN' THEN min_value ELSE NULL END) AS total_height,
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
                        WHERE hydrometeo_types.name = 'Snow'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY hydrometeo_measurement.date, hydrometeo_type
                ORDER BY hydrometeo_measurement.date ASC`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        }
    }),
    GET_COUNTRY_MONTHLY_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of monthly snow for country between two dates',
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
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN max_value ELSE NULL END) AS fallen,
                    SUM(CASE WHEN total_value <> 'NaN' THEN min_value ELSE NULL END) AS total_height,
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
                        WHERE hydrometeo_types.name = 'Snow'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        }
    }),
    GET_COUNTRY_ANNUAL_SNOW: (SnowType) => ({
        type: GraphQLList(SnowType),
        description: 'A list of annual snow for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN max_value ELSE NULL END) AS fallen,
                    SUM(CASE WHEN total_value <> 'NaN' THEN min_value ELSE NULL END) AS total_height,
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
                        WHERE hydrometeo_types.name = 'Snow'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        }
    }),
};
