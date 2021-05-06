const pool = require('../../db');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLFloat, GraphQLID } = require('graphql');

const StationType = (types) => new GraphQLObjectType({
    name: 'Station',
    description: 'This represents a station',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        regionID: { type: GraphQLNonNull(GraphQLInt) },
        stationType: { type: GraphQLNonNull(GraphQLInt) },
        locationName: { type: GraphQLNonNull(GraphQLString) },
        long: { type: GraphQLFloat },
        lat: { type: GraphQLFloat },
        height: { type: GraphQLFloat },
        region: {
            type: types.RegionType,
            resolve: async (entry) => {
                const region = await pool.query(
                    `SELECT *
                    FROM region
                    WHERE id = $1`,
                    [entry.regionID]
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
        }
    })
});

module.exports = StationType;
