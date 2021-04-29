const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql');

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
