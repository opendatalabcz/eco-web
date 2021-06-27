const pool = require('../../db');
const { makeDate } = require('../../helpers');
const {
    DAILY_SHINE_SQL,
    MONTHLY_SHINE_SQL,
    ANNUAL_SHINE_SQL,
    REGIONAL_DAILY_SHINE_SQL,
    REGIONAL_MONTHLY_SHINE_SQL,
    REGIONAL_ANNUAL_SHINE_SQL,
    DAILY_COUNTRY_SHINE_SQL,
    MONTHLY_COUNTRY_SHINE_SQL,
    ANNUAL_COUNTRY_SHINE_SQL
} = require('../SQL/shine');

module.exports = {
    /**
     * Function to get daily shine for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_SHINE_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(DAILY_SHINE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, value, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    value: value === 'NaN' ? null : value,
                    lastUpdated: last_updated
                });
            });
        });
    },
    /**
     * Function to get monthly shine for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_SHINE_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(MONTHLY_SHINE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, sum, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    value: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get annual shine for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_SHINE_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(ANNUAL_SHINE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, sum, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    value: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get daily shine for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_DAILY_SHINE_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_DAILY_SHINE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { date, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    value: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get monthly shine for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_MONTHLY_SHINE_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_MONTHLY_SHINE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    value: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get annual shine for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_ANNUAL_SHINE_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_ANNUAL_SHINE_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    value: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get daily shine for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_COUNTRY_SHINE_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(DAILY_COUNTRY_SHINE_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { date, sum, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    value: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get monthly shine for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_COUNTRY_SHINE_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(MONTHLY_COUNTRY_SHINE_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, sum, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    value: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get annual shine for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_COUNTRY_SHINE_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(ANNUAL_COUNTRY_SHINE_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, sum, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    value: sum === 'NaN' ? null : sum
                });
            });
        });
    }
};
