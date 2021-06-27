const pool = require('../../db');
const { getMask } = require('../../helpers');
const {
    STATION_SQL,
    STATIONS_SQL,
    STATIONS_FOR_REGION_SQL,
    STATIONS_FOR_REGION_OF_GIVEN_TYPE_SQL,
} = require('../SQL/station');
const { HYDROMETEO_TYPES_FOR_STATIONS_SQL } = require('../SQL/hydrometeo_type')

module.exports = {
    /**
     * Function to retrive specific station
     * 
     * @param {string} stationID id of specific station
     * @returns {Object} data for station
     */
    STATION_RESOLVER: async (stationID) => {
        const station = await pool.query(STATION_SQL, [stationID]);
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
    },
    /**
     * Function to retrive all stations
     * 
     * @returns {Object[]} data for stations
     */
    STATIONS_RESOLVER: async () => {
        const allStations = await pool.query(STATIONS_SQL);
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
    },
    /**
     * Function to retrieve all stations for give region
     * 
     * @param {int} regionID ID of specific region
     * @returns {Object[]} data for stations
     */
    STATIONS_FOR_REGION_RESOLVER: async (regionID) => {
        const allStations = await pool.query(STATIONS_FOR_REGION_SQL, [regionID]);
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
    },
    /**
     * Function to retrieve stations of givet type for region
     * 
     * @param {int} regionID id of specific region
     * @param {string} dataType name of data type
     * @returns {Object[]} data for all stations
     */
    STATIONS_FOR_REGION_OF_TYPE_RESOLVER: async (regionID, dataType) => {
        const allStations = await pool.query(
            STATIONS_FOR_REGION_OF_GIVEN_TYPE_SQL,
            [regionID, getMask(String(dataType).toLowerCase())]
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
    },
    /**
     * Function for retrieving all station by hydrometeo types for given region
     * 
     * @param {int} regionID ID of given region
     * @returns {Object[]} data for all stations
     */
    STATIONS_BY_HYDROMETEO_TYPES_RESOLVER: async (regionID) => {
        const allHydrometeTypes = await pool.query(HYDROMETEO_TYPES_FOR_STATIONS_SQL);
        return allHydrometeTypes.rows.map(async (element) => {
            const { id, name } = element;
            const allStations = await pool.query(
                STATIONS_FOR_REGION_OF_GIVEN_TYPE_SQL,
                [regionID, getMask(String(name).toLowerCase())]
            );
            return element = ({
                hydroMeteoType: id,
                hydroMeteoTypeName: name,
                stations: allStations.rows.map((element) => {
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
                })
            });
        });
    }
}
