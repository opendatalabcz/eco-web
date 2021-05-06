const pool = require('../../db');
const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const { makeDate } = require('../../helpers');

module.exports = {
    GET_DAILY_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of daily pressure for station between two dates',
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
                        WHERE hydrometeo_types.name = 'Pressure'
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
                    avg: value === 'NaN' ? null : value,
                    lastUpdated: last_updated
                });
            });
        }
    }),
    GET_MONTHLY_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of monthly pressure for station between two dates',
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
                    AVG(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END)::numeric(10,1),
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Pressure'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg
                });
            });
        }
    }),
    GET_ANNUAL_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of annual pressure for station between two dates',
        args: {
            stationID: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT 
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    AVG(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END)::numeric(10,1),
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Pressure'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        }
    }),
    GET_REGIONAL_DAILY_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of daily pressure for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
                    AVG(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END)::numeric(10,1),
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
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        }
    }),
    GET_REGIONAL_MONTHLY_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of daily pressure for region between two dates',
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
                    AVG(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END)::numeric(10,1),
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
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg
                });
            });
        }
    }),
    GET_REGIONAL_ANNUAL_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of annual pressure for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    AVG(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END)::numeric(10,1),
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
                GROUP BY tmpYear, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        }
    }),
    GET_COUNTRY_DAILY_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of daily pressure for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
                    AVG(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END)::numeric(10,1),
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
                ORDER BY hydrometeo_measurement.date ASC`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        }
    }),
    GET_COUNTRY_MONTHLY_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of monthly pressure for country between two dates',
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
                    AVG(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END)::numeric(10,1),
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
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg
                });
            });
        }
    }),
    GET_COUNTRY_ANNUAL_PRESSURE: (PressureType) => ({
        type: GraphQLList(PressureType),
        description: 'A list of annual pressure for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    AVG(CASE WHEN hydrometeo_measurement.value <> 'NaN' THEN hydrometeo_measurement.value ELSE NULL END)::numeric(10,1),
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
                GROUP BY tmpYear, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        }
    }),
};
