const pool = require('../../db');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLID } = require('graphql');

const RegionType = (types) => new GraphQLObjectType({
    name: 'Region',
    description: 'This represents a region',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        shortcut: { type: GraphQLNonNull(GraphQLString) },
        countryName: { type: GraphQLNonNull(GraphQLString) },
        countryShortcut: { type: GraphQLNonNull(GraphQLString) },
        stations: {
            type: new GraphQLList(types.StationType),
            resolve: async (entry) => {
                const allStations = await pool.query(
                    `SELECT *
                    FROM station
                    WHERE region_id = $1`,
                    [entry.id]);
                return allStations.rows.map((element) => {
                    const { id, region_id, station_type, location_name, longitude, latitude, height } = element;
                    return element = ({ 
                        id: id,
                        regionID: region_id,
                        stationType: station_type,
                        locationName: location_name,
                        long: longitude === 'NaN' ? null : longitude,
                        lat: latitude === 'NaN' ? null : latitude,
                        height: height === 'NaN' ? null : height
                    });
                });
            }
        }
    })
});

module.exports = RegionType;
