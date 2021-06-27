const pool = require('../../db');
const { makeDate } = require('../../helpers');
const {
    DAILY_SNOW_SQL,
    MONTHLY_SNOW_SQL,
    ANNUAL_SNOW_SQL,
    REGIONAL_DAILY_SNOW_SQL,
    REGIONAL_MONTHLY_SNOW_SQL,
    REGIONAL_ANNUAL_SNOW_SQL,
    DAILY_COUNTRY_SNOW_SQL,
    MONTHLY_COUNTRY_SNOW_SQL,
    ANNUAL_COUNTRY_SNOW_SQL
} = require('../SQL/snow');

module.exports = {
    /**
     * Function to get daily snow for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_SNOW_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(DAILY_SNOW_SQL, [id, from, to]
            );
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, value, symptom, total_value, total_symptom, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    fallen: value === 'NaN' ? null : value,
                    fallenSymptom: symptom,
                    totalHeight: total_value === 'NaN' ? null : total_value,
                    totalHeightSymptom: total_symptom,
                    lastUpdated: last_updated
                });
            });
        });
    },
    /**
     * Function to get monthly snow for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_SNOW_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(MONTHLY_SNOW_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        });
    },
    /**
     * Function to get annual snow for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_SNOW_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(ANNUAL_SNOW_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        });
    },
    /**
     * Function to get daily snow for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_DAILY_SNOW_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_DAILY_SNOW_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { date, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        });
    },
    /**
     * Function to get monthly snow for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_MONTHLY_SNOW_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_MONTHLY_SNOW_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        });
    },
    /**
     * Function to get annual snow for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_ANNUAL_SNOW_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_ANNUAL_SNOW_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        });
    },
    /**
     * Function to get daily snow for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_COUNTRY_SNOW_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(DAILY_COUNTRY_SNOW_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { date, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        });
    },
    /**
     * Function to get monthly snow for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_COUNTRY_SNOW_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(MONTHLY_COUNTRY_SNOW_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        });
    },
    /**
     * Function to get annual snow for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_COUNTRY_SNOW_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(ANNUAL_COUNTRY_SNOW_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, fallen, total_height, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    fallen: fallen === 'NaN' ? null : fallen,
                    totalHeight: total_height === 'NaN' ? null : total_height
                });
            });
        });
    }
};
