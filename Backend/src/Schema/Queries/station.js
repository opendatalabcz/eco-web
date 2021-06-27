const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const {
    STATIONS_RESOLVER,
    STATION_RESOLVER,
    STATIONS_FOR_REGION_RESOLVER,
    STATIONS_FOR_REGION_OF_TYPE_RESOLVER
} = require('../Resolvers/station');

module.exports = {
    GET_STATION: (StationType) => ({
        type: StationType,
        description: 'A single Station',
        args: {
            id: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            return STATION_RESOLVER(args.id);
        }
    }),
    GET_ALL_STATION: (StationType) => ({
        type: new GraphQLList(StationType),
        description: 'List of all Stations',
        resolve: async () => {
            return STATIONS_RESOLVER();
        }
    }),
    GET_ALL_STATION_FOR_REGION: (StationType) => ({
        type: new GraphQLList(StationType),
        description: 'List of all Stations for given region',
        args: {
            regionID: { type: GraphQLInt }
        },
        resolve: async (parent, args) => {
            return STATIONS_FOR_REGION_RESOLVER(args.regionID);
        }
    }),
    GET_ALL_STATION_FOR_REGION_OF_GIVEN_TYPE: (StationType) => ({
        type: new GraphQLList(StationType),
        description: 'List of all station of given type in given region',
        args: {
            regionID: { type: GraphQLInt },
            dataType: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            return STATIONS_FOR_REGION_OF_TYPE_RESOLVER(args.regionID, args.dataType);
        }
    })
};
