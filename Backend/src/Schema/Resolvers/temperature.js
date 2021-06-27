const pool = require('../../db');
const { makeDate } = require('../../helpers');
const {
    DAILY_TEMPERATURE_SQL,
    MONTHLY_TEMPERATURE_SQL,
    ANNUAL_TEMPERATURE_SQL,
    REGIONAL_DAILY_TEMPERATURE_SQL,
    REGIONAL_MONTHLY_TEMPERATURE_SQL,
    REGIONAL_ANNUAL_TEMPERATURE_SQL,
    DAILY_COUNTRY_TEMPERATURE_SQL,
    MONTHLY_COUNTRY_TEMPERATURE_SQL,
    ANNUAL_COUNTRY_TEMPERATURE_SQL
} = require('../SQL/temperature');

module.exports = {
    /**
     * Function to get daily temperature for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_TEMPERATURE_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(DAILY_TEMPERATURE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, avg_value, min_value, max_value, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg_value === 'NaN' ? null : avg_value,
                    min: min_value === 'NaN' ? null : min_value,
                    max: max_value === 'NaN' ? null : max_value,
                    lastUpdated: last_updated
                });
            });
        });
    },
    /**
     * Function to get monthly temperature for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_TEMPERATURE_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(MONTHLY_TEMPERATURE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, min, max, avg, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    min: min === 'NaN' ? null : min,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get annual temperature for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_TEMPERATURE_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(ANNUAL_TEMPERATURE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, min, max, avg, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    min: min === 'NaN' ? null : min,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get daily temperature for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_DAILY_TEMPERATURE_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_DAILY_TEMPERATURE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { date, min, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg,
                    min: min === 'NaN' ? null : min,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get monthly temperature for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_MONTHLY_TEMPERATURE_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_MONTHLY_TEMPERATURE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, min, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    min: min === 'NaN' ? null : min,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get annual temperature for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_ANNUAL_TEMPERATURE_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_ANNUAL_TEMPERATURE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, min, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    min: min === 'NaN' ? null : min,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get daily temperature for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_COUNTRY_TEMPERATURE_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(DAILY_COUNTRY_TEMPERATURE_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { date, min, max, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg,
                    min: min === 'NaN' ? null : min,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get monthy temperature for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_COUNTRY_TEMPERATURE_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(MONTHLY_COUNTRY_TEMPERATURE_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, min, max, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    min: min === 'NaN' ? null : min,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get annual temperature for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_COUNTRY_TEMPERATURE_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(ANNUAL_COUNTRY_TEMPERATURE_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, min, max, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    min: min === 'NaN' ? null : min,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    }
};
