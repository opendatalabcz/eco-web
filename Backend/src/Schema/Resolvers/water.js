const pool = require('../../db');
const { makeDate } = require('../../helpers');
const {
    DAILY_WATER_SQL,
    MONTHLY_WATER_SQL,
    ANNUAL_WATER_SQL,
    REGIONAL_DAILY_WATER_SQL,
    REGIONAL_MONTHLY_WATER_SQL,
    REGIONAL_ANNUAL_WATER_SQL,
    DAILY_COUNTRY_WATER_SQL,
    MONTHLY_COUNTRY_WATER_SQL,
    ANNUAL_COUNTRY_WATER_SQL
} = require('../SQL/water');

module.exports = {
    /**
     * Function to get daily water for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_WATER_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(DAILY_WATER_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, avg_value, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg_value === 'NaN' ? null : avg_value,
                    lastUpdated: last_updated
                });
            });
        });
    },
    /**
     * Function to get monthly water for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_WATER_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(MONTHLY_WATER_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg
                });
            });
        });
    },
    /**
     * Function to get annual water for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_WATER_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(ANNUAL_WATER_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        });
    },
    /**
     * Function to get daily water for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_DAILY_WATER_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_DAILY_WATER_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { date, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        });
    },
    /**
     * Function to get monthly water for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_MONTHLY_WATER_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_MONTHLY_WATER_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg
                });
            });
        });
    },
    /**
     * Function to get annual water for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_ANNUAL_WATER_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_ANNUAL_WATER_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        });
    },
    /**
     * Function to get daily water for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_COUNTRY_WATER_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(DAILY_COUNTRY_WATER_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { date, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        });
    },
    /**
     * Function to get monthly water for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_COUNTRY_WATER_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(MONTHLY_COUNTRY_WATER_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg
                });
            });
        });
    },
    /**
     * Function to get annual water for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_COUNTRY_WATER_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(ANNUAL_COUNTRY_WATER_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg
                });
            });
        });
    }
};
