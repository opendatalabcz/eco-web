const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLFloat, GraphQLID } = require('graphql');
const { REGION_RESOLVER } = require('../Resolvers/region');

/**
 * Station Type definition
 * 
 * @param {Object} types - collection of all types definitions
 */
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
                return REGION_RESOLVER(entry.regionID);
            }
        }
    })
});

module.exports = StationType;
