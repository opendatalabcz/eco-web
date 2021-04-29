const pool = require('../../db');
const { GraphQLString, GraphQLList } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');

module.exports = {
    GET_DAILY_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(TemperatureType),
        description: 'A list of daily temperature for station between two dates',
        args: {
            station_id: { type: GraphQLString },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            const selectedTemperatures = await pool.query(
                `SELECT hydrometeo_measurement.id,
                        station_id,
                        hydrometeo_type,
                        hydrometeo_measurement.date,
                        avg_value,
                        min_value,
                        max_value,
                        last_updated
                FROM hydrometeo_measurement
                WHERE station_id = $1
                    AND hydrometeo_type =
                        (SELECT hydrometeo_types.id
                        FROM hydrometeo_types
                        WHERE hydrometeo_types.name = 'Temperature')
                    AND hydrometeo_measurement.date BETWEEN $2 AND $3
                ORDER BY hydrometeo_measurement.date ASC`, 
                [args.station_id, args.from, args.to]
            );
            return selectedTemperatures.rows;
        }
    })
}
