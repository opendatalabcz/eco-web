const { GraphQLList, GraphQLInt } = require('graphql');
const { HYDROMETEO_TYPE_RESOLVER, HYDROMETEO_TYPES_RESOLVER } = require('../Resolvers/hydrometeo_type');

module.exports = {
    GET_HYDROMETEO_TYPE: (HydroMeteoType) => ({
        type: HydroMeteoType,
        description: 'A single HydroMeteoType',
        args: {
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args) => {
            return HYDROMETEO_TYPE_RESOLVER(args.id);
        }
    }),
    GET_ALL_HYDROMETEO_TYPES: (HydroMeteoType) => ({
        type: new GraphQLList(HydroMeteoType),
        description: 'List of All HydroMeteoTypes',
        resolve: async () => {
            return HYDROMETEO_TYPES_RESOLVER();
        }
    })
};
