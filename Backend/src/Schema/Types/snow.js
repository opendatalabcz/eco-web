const pool = require('../../db');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLFloat } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');

const SnowType = (types) => new GraphQLObjectType({
    name: 'SnowType',
    description: 'This represents a snow type',
    fields: () => ({
        id: { type: GraphQLID },
        stationID: { type: GraphQLString },
        regionID: { type: GraphQLInt },
        hydrometeoType: { type: GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLNonNull(GraphQLString) },
        fallen: { type: GraphQLFloat },
        fallenSymptom: { type: GraphQLString },
        totalHeight: { type: GraphQLFloat },
        totalHeightSymptom: { type: GraphQLString },
        lastUpdated: { type: GraphQLDate },
        station: {
            type: types.StationType,
            resolve: async (entry) => {
                const station = await pool.query(
                    `SELECT *
                    FROM station
                    WHERE id = $1`,
                    [entry.stationID]
                );
                const { id, region_id, station_type, location_name, longitude, latitude, height } = station.rows[0];
                return {
                    id: id,
                    regionID: region_id,
                    stationType: station_type,
                    locationName: location_name,
                    long: longitude === 'NaN' ? null : longitude,
                    lat: latitude === 'NaN' ? null : latitude,
                    height: height === 'NaN' ? null : height
                };
            }
        },
        region: {
            type: types.RegionType,
            resolve: async (entry) => {
                if (!entry.regionID) return null;
                const region = await pool.query(
                    `SELECT *
                    FROM region
                    WHERE id = $1`,
                    [entry.regionID]
                );
                const { id, name, shortcut, country_name, country_shortcut } = region.rows[0];
                return {
                    id: id,
                    name: name,
                    shortcut: shortcut,
                    countryName: country_name,
                    countryShortcut: country_shortcut
                };
            }
        },
        hydrometeoTypeInfo: {
            type: types.HydroMeteoType,
            resolve: async (entry) => {
                const hydrometeoType = await pool.query(
                    `SELECT *
                    FROM hydrometeo_types
                    WHERE id = $1`,
                    [entry.hydrometeoType]
                );
                const { id, name, unit } = hydrometeoType.rows[0];
                return { id: id, name: name, unit: unit.split(', ') };
            }
        }
    })
});

module.exports = SnowType;
