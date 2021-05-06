const pool = require('../../db');
const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const { makeDate } = require('../../helpers');

module.exports = {
    GET_DAILY_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of daily shine for station between two dates',
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
                    last_updated
                FROM hydrometeo_measurement
                WHERE station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Shine'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, value, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    value: value === 'NaN' ? null : value,
                    lastUpdated: last_updated
                });
            });
        }
    }),
    GET_MONTHLY_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of monthly shine for station between two dates',
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
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END),
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Shine'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, sum, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    value: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_ANNUAL_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of annual shine for station between two dates',
        args: {
            stationID: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT 
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END),
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Shine'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, sum, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    value: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_REGIONAL_DAILY_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of daily shine for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Shine'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY hydrometeo_measurement.date, hydrometeo_type
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    value: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_REGIONAL_MONTHLY_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of daily shine for region between two dates',
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
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Shine'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    value: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_REGIONAL_ANNUAL_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of annual shine for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Shine'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    value: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_COUNTRY_DAILY_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of daily shine for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Shine'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY hydrometeo_measurement.date, hydrometeo_type
                ORDER BY hydrometeo_measurement.date ASC`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    value: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_COUNTRY_MONTHLY_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of monthly shine for country between two dates',
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
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Shine'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    value: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
    GET_COUNTRY_ANNUAL_SHINE: (ShineType) => ({
        type: GraphQLList(ShineType),
        description: 'A list of annual shine for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    SUM(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END),
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
                        WHERE hydrometeo_types.name = 'Shine'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    value: sum === 'NaN' ? null : sum
                });
            });
        }
    }),
};
