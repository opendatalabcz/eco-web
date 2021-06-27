const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql');

/**
 * Station List Type definition
 * 
 * @param {Object} types - collection of all types definitions
 */
const StationListType = (types) => new GraphQLObjectType({
    name: 'StationListType',
    description: 'This represents a list of stations of same HydroMeteo type',
    fields: () => ({
        hydroMeteoType: { type: GraphQLNonNull(GraphQLID) },
        hydroMeteoTypeName: { type: GraphQLNonNull(GraphQLString) },
        stations: { type: GraphQLList(types.StationType) }
    })
});

module.exports = StationListType;
