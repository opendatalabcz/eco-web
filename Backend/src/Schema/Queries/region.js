const { GraphQLList, GraphQLInt } = require('graphql');
const { REGION_RESOLVER, ALL_REGIONS_RESOLVER } = require('../Resolvers/region');

module.exports = {
    GET_REGION: (RegionType) => ({
        type: RegionType,
        description: 'A single Region',
        args: {
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args) => {
            return REGION_RESOLVER(args.id);
        }
    }),

    GET_ALL_REGIONS: (RegionType) => ({
        type: new GraphQLList(RegionType),
        description: 'List of All Regions',
        resolve: ALL_REGIONS_RESOLVER
    })
};
