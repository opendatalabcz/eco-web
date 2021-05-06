const pool = require('../../db');
const { GraphQLDate } = require('graphql-iso-date');
const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLID } = require('graphql');

const WoodsMeasurementType = (types) => new GraphQLObjectType({
    name: 'Woods_Measurement',
    description: 'This represents a woods measurement',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        regionID: { type: GraphQLNonNull(GraphQLInt) },
        etc: { type: GraphQLInt },
        lastUpdate: { type: GraphQLNonNull(GraphQLDate) },
        region: {
            type: types.RegionType,
            resolve: async (entry) => {
                const region = await pool.query(
                    `SELECT *
                    FROM region
                    WHERE id = $1`,
                    [entry.regionID]
                );
                const { id, region_id, station_type, location_name, longitude, latitude, height } = region.rows[0];
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
        }
    })
});

module.exports = WoodsMeasurementType;
