const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql');

/**
 * Hydrometeo Type definition
 * 
 * @param {Object} types - collection of all types definitions
 */
const HydroMeteoType = (types) => new GraphQLObjectType({
    name: 'HydroMeteoType',
    description: 'This represents a hydrometeo type',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        unit: { type: GraphQLList(GraphQLString) }
    })
});

module.exports = HydroMeteoType;
