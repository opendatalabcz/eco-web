const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLFloat } = require('graphql');
const { STATIONS_FOR_REGION_RESOLVER, STATIONS_BY_HYDROMETEO_TYPES_RESOLVER } = require('../Resolvers/station');

/**
 * Region Type definition
 * 
 * @param {Object} types - collection of all types definitions
 */
const RegionType = (types) => new GraphQLObjectType({
    name: 'Region',
    description: 'This represents a region',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        shortcut: { type: GraphQLNonNull(GraphQLString) },
        countryName: { type: GraphQLNonNull(GraphQLString) },
        countryShortcut: { type: GraphQLNonNull(GraphQLString) },
        long: { type: GraphQLNonNull(GraphQLFloat) },
        lat: { type: GraphQLNonNull(GraphQLFloat) },
        stations: {
            type: new GraphQLList(types.StationType),
            resolve: async (entry) => {
                return STATIONS_FOR_REGION_RESOLVER(entry.id);
            }
        },
        stationsByHydroMeteoTypes: {
            type: new GraphQLList(types.StationListType),
            resolve: async (entry) => {
                return STATIONS_BY_HYDROMETEO_TYPES_RESOLVER(entry.id);
            }
        }
    })
});

module.exports = RegionType;
