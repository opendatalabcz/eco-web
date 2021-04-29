const pool = require('../../db');
const { GraphQLString, GraphQLList } = require('graphql');

module.exports = {
    GET_REGION: (RegionType) => ({
        type: RegionType,
        description: 'A single Region',
        args: {
            id: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            const region = await pool.query('SELECT * FROM region WHERE id = $1', [args.id]);
            return region.rows[0];
        }
    }),

    GET_ALL_REGIONS: (RegionType) => ({
        type: new GraphQLList(RegionType),
        description: 'List of All Regions',
        resolve: async () => {
            const allRegions = await pool.query('SELECT * FROM region');
            return allRegions.rows;
        }
    })
}
