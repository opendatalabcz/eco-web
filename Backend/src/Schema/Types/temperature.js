const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList, GraphQLInt, GraphQLFloat } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');

const TemperatureType = (types) => new GraphQLObjectType({
    name: 'DailyTemperatureType',
    description: 'This represents a daily temperature type',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        station_id: { type: GraphQLNonNull(GraphQLString) },
        hydrometeo_type: { type: GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLNonNull(GraphQLDate) },
        avg_value: { type: GraphQLFloat },
        min_value: { type: GraphQLFloat },
        max_value: { type: GraphQLFloat },
        last_updated: { type: GraphQLNonNull(GraphQLDate) }
    })
});

module.exports = TemperatureType;
