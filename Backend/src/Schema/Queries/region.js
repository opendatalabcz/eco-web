const pool = require('../../db');
const { GraphQLList, GraphQLInt } = require('graphql');

module.exports = {
    GET_REGION: (RegionType) => ({
        type: RegionType,
        description: 'A single Region',
        args: {
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args) => {
            const region = await pool.query(
                `SELECT * 
                FROM region 
                WHERE id = $1`,
                [args.id]
            );
            const { id, name, shortcut, country_name, country_shortcut } = region.rows[0];
            return {
                id: id,
                name: name,
                shortcut: shortcut,
                countryName: country_name,
                countryShortcut: country_shortcut
            };
        }
    }),

    GET_ALL_REGIONS: (RegionType) => ({
        type: new GraphQLList(RegionType),
        description: 'List of All Regions',
        resolve: async () => {
            const allRegions = await pool.query(
                `SELECT * 
                FROM region`
            );
            return allRegions.rows.map((element) => {
                const { id, name, shortcut, country_name, country_shortcut } = element;
                return element = ({
                    id: id,
                    name: name,
                    shortcut: shortcut,
                    countryName: country_name,
                    countryShortcut: country_shortcut
                });
            });
        }
    })
};
