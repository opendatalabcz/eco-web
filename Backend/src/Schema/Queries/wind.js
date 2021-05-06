const pool = require('../../db');
const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const { makeDate, getMonthStartAndEndDate } = require('../../helpers');

module.exports = {
    GET_DAILY_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of daily wind for station between two dates',
        args: {
            stationID: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.id,
                    station_id,
                    hydrometeo_type,
                    hydrometeo_measurement.date,
                    avg_value,
                    max_value,
                    azimuth,
                    TO_CHAR(hydrometeo_measurement.time, 'HH24:MI:SS"Z"') AS max_time,
                    last_updated
                FROM hydrometeo_measurement
                WHERE station_id = $1
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Wind'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, avg_value, max_value, azimuth, max_time, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg_value === 'NaN' ? null : avg_value,
                    max: max_value === 'NaN' ? null : max_value,
                    maxTime: max_time === 'NaN' ? null : max_time,
                    maxAzimuth: azimuth === 'NaN' ? null : azimuth,
                    lastUpdated: last_updated
                });
            });
        }
    }),
    GET_MONTHLY_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of monthly wind for station between two dates',
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
                    MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1 
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Wind'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map(async (element) => {
                const { tmpyear, tmpmonth, avg, max, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        }
    }),
    GET_ANNUAL_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of annual wind for station between two dates',
        args: {
            stationID: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
                    MAX(CASE WHEN max_value <> 'NaN' THEN max_value ELSE NULL END),
                    AVG(CASE WHEN avg_value <> 'NaN' THEN avg_value ELSE NULL END)::numeric(10,1),
                    hydrometeo_type
                FROM hydrometeo_measurement
                WHERE hydrometeo_measurement.station_id = $1 
                    AND hydrometeo_type = (
                        SELECT hydrometeo_types.id 
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Wind'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.stationID, args.from, args.to]
            );
            return selectedRows.rows.map(async (element) => {
                const { tmpyear, avg, max, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        }
    }),
    GET_REGIONAL_DAILY_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of daily wind for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
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
                        WHERE hydrometeo_types.name = 'Wind'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY hydrometeo_measurement.date, hydrometeo_type
                ORDER BY hydrometeo_measurement.date ASC`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, max, avg, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        }
    }),
    GET_REGIONAL_MONTHLY_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of daily wind for region between two dates',
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
                        WHERE hydrometeo_types.name = 'Wind'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map(async (element) => {
                const { tmpyear, tmpmonth, avg, max, hydrometeo_type } = element;
                return element = ({
                    stationID: args.stationID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        }
    }),
    GET_REGIONAL_ANNUAL_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of annual wind for region between two dates',
        args: {
            regionID: { type: GraphQLInt },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
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
                        WHERE hydrometeo_types.name = 'Wind'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [args.regionID, args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        }
    }),
    GET_COUNTRY_DAILY_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of daily wind for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    hydrometeo_measurement.date,
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
                        WHERE hydrometeo_types.name = 'Wind'
                    )
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY hydrometeo_measurement.date, hydrometeo_type
                ORDER BY hydrometeo_measurement.date ASC`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { date, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        }
    }),
    GET_COUNTRY_MONTHLY_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of monthly wind for country between two dates',
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
                        WHERE hydrometeo_types.name = 'Wind'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, tmpMonth, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        }
    }),
    GET_COUNTRY_ANNUAL_WIND: (WindType) => ({
        type: GraphQLList(WindType),
        description: 'A list of annual wind for country between two dates',
        args: {
            countryShortcut: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedRows = await pool.query(
                `SELECT
                    EXTRACT(YEAR FROM hydrometeo_measurement.date) AS tmpYear,
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
                        WHERE hydrometeo_types.name = 'Wind'
                    ) 
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                GROUP BY tmpYear, hydrometeo_type`,
                [String(args.countryShortcut).toUpperCase(), args.from, args.to]
            );
            return selectedRows.rows.map((element) => {
                const { tmpyear, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: args.regionID,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        }
    }),
};
