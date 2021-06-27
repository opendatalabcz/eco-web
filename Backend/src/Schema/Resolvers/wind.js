const pool = require('../../db');
const { makeDate } = require('../../helpers');
const {
    DAILY_WIND_SQL,
    MONTHLY_WIND_SQL,
    ANNUAL_WIND_SQL,
    REGIONAL_DAILY_WIND_SQL,
    REGIONAL_MONTHLY_WIND_SQL,
    REGIONAL_ANNUAL_WIND_SQL,
    DAILY_COUNTRY_WIND_SQL,
    MONTHLY_COUNTRY_WIND_SQL,
    ANNUAL_COUNTRY_WIND_SQL
} = require('../SQL/wind');

module.exports = {
    /**
     * Function to get daily wind for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_WIND_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(DAILY_WIND_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, avg_value, max_value, azimuth, max_time, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg_value === 'NaN' ? null : avg_value,
                    max: max_value === 'NaN' ? null : max_value,
                    maxTime: max_time === 'NaN' ? null : max_time,
                    maxAzimuth: azimuth === 'NaN' ? null : azimuth,
                    lastUpdated: last_updated
                });
            });
        });
    },
    /**
     * Function to get monthly wind for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_WIND_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(MONTHLY_WIND_SQL, [id, from, to]);
            return selectedRows.rows.map(async (element) => {
                const { tmpyear, tmpmonth, avg, max, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get annual wind for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_WIND_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(ANNUAL_WIND_SQL, [id, from, to]);
            return selectedRows.rows.map(async (element) => {
                const { tmpyear, avg, max, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get daily wind for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_DAILY_WIND_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_DAILY_WIND_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { date, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get monthly wind for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_MONTHLY_WIND_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_MONTHLY_WIND_SQL, [id, from, to]);
            return selectedRows.rows.map(async (element) => {
                const { tmpyear, tmpmonth, avg, max, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get annual wind for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_ANNUAL_WIND_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_ANNUAL_WIND_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, max, avg, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get daily wind for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_COUNTRY_WIND_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(DAILY_COUNTRY_WIND_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { date, max, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get monthly wind for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_COUNTRY_WIND_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(MONTHLY_COUNTRY_WIND_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, max, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    },
    /**
     * Function to get annual wind for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_COUNTRY_WIND_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(ANNUAL_COUNTRY_WIND_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, max, avg, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avg: avg === 'NaN' ? null : avg,
                    max: max === 'NaN' ? null : max
                });
            });
        });
    }
};
