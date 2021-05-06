const pool = require('../../db');
const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { getMask } = require('../../helpers')

module.exports = {
    GET_STATION: (StationType) => ({
        type: StationType,
        description: 'A single Station',
        args: {
            id: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            const station = await pool.query(
                `SELECT *
                FROM station
                WHERE id = $1`,
                [args.id]
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
    }),
    GET_ALL_STATION: (StationType) => ({
        type: new GraphQLList(StationType),
        description: 'List of all Stations',
        resolve: async () => {
            const allStations = await pool.query(
                `SELECT * 
                FROM station`
            );
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
    }),
    GET_ALL_STATION_FOR_REGION: (StationType) => ({
        type: new GraphQLList(StationType),
        description: 'List of all Stations for given region',
        args: {
            regionID: { type: GraphQLInt }
        },
        resolve: async (parent, args) => {
            const allStations = await pool.query(
                `SELECT *
                FROM station
                WHERE region_id = $1`,
                [args.regionID]
            );
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
    }),
    GET_ALL_STATION_FOR_REGION_OF_GIVEN_TYPE: (StationType) => ({
        type: new GraphQLList(StationType),
        description: 'List of all station of given type in given region',
        args: {
            regionID: { type: GraphQLInt },
            dataType: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            const allStations = await pool.query(
                `SELECT *
                FROM station
                WHERE region_id = $1
                    AND (CAST(station_type AS int) & $2 > 0)`,
                [args.regionID, getMask(String(args.dataType).toLowerCase())]
            );
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
    })
};
