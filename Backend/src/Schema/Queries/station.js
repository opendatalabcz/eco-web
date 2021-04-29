const pool = require('../../db');
const { GraphQLString, GraphQLList } = require('graphql');

module.exports = {
    GET_STATION: (StationType) => ({
        type: StationType,
        description: 'A single Station',
        args: {
            id: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            const station = await pool.query('SELECT * FROM station WHERE id = $1', [args.id]);
            return station.rows[0];
        }
    }),
    GET_ALL_STATION: (StationType) => ({
        type: new GraphQLList(StationType),
        description: 'List of All Stations',
        resolve: async () => {
            const allStations = await pool.query('SELECT * FROM station');
            return allStations.rows;
        }
    }),
    GET_ALL_STATION_FOR_REGION: (StationType) => ({
        type: new GraphQLList(StationType),
        description: 'List of All Stations for given region',
        args: {
            region_id: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            const allStations = await pool.query('SELECT * FROM station WHERE region_id = $1', [args.region_id]);
            return allStations.rows;
        }
    })
}