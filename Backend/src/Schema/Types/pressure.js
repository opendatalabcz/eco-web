const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLFloat } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const { REGION_RESOLVER } = require('../Resolvers/region');
const { STATION_RESOLVER } = require('../Resolvers/station');
const { HYDROMETEO_TYPE_RESOLVER } = require('../Resolvers/hydrometeo_type');

/**
 * Pressure Type definition
 * 
 * @param {Object} types - collection of all types definitions
 */
const PressureType = (types) => new GraphQLObjectType({
    name: 'PressureType',
    description: 'This represents a pressure type',
    fields: () => ({
        id: { type: GraphQLID },
        stationID: { type: GraphQLString },
        regionID: { type: GraphQLInt },
        hydrometeoType: { type: GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLNonNull(GraphQLString) },
        avg: { type: GraphQLFloat },
        lastUpdated: { type: GraphQLDate },
        station: {
            type: types.StationType,
            resolve: async (entry) => {
                return STATION_RESOLVER(entry.stationID);
            }
        },
        region: {
            type: types.RegionType,
            resolve: async (entry) => {
                if (!entry.regionID) return null;
                return REGION_RESOLVER(entry.regionID);
            }
        },
        hydrometeoTypeInfo: {
            type: types.HydroMeteoType,
            resolve: async (entry) => {
                return HYDROMETEO_TYPE_RESOLVER(entry.hydrometeoType);
            }
        }
    })
});

module.exports = PressureType;
