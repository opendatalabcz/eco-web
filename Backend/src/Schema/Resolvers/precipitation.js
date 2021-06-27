const pool = require('../../db');
const { makeDate } = require('../../helpers');
const {
    DAILY_PRECIPITATION_SQL,
    MONTHLY_PRECIPITATION_SQL,
    ANNUAL_PRECIPITATION_SQL,
    REGIONAL_DAILY_PRECIPITATION_SQL,
    REGIONAL_MONTHLY_PRECIPITATION_SQL,
    REGIONAL_ANNUAL_PRECIPITATION_SQL,
    DAILY_COUNTRY_PRECIPITATION_SQL,
    MONTHLY_COUNTRY_PRECIPITATION_SQL,
    ANNUAL_COUNTRY_PRECIPITATION_SQL
} = require('../SQL/precipitation');

module.exports = {
    /**
     * Function to get daily precipitation for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_PRECIPITATION_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(DAILY_PRECIPITATION_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { id, station_id, hydrometeo_type, date, avg_value, total_value, total_symptom, last_updated } = element;
                return element = ({
                    id: id,
                    stationID: station_id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avgHumidity: avg_value === 'NaN' ? null : avg_value,
                    totalPrecipitation: total_value === 'NaN' ? null : total_value,
                    totalPrecipitationSymptom: total_symptom,
                    lastUpdated: last_updated
                });
            });
        });
    },
    /**
     * Function to get monthly precipitation for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_PRECIPITATION_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(MONTHLY_PRECIPITATION_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, sum, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get annual precipitation for given station in given date range
     * 
     * @param {string[]} stationIDs ids of stations
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_PRECIPITATION_RESOLVER: async (stationIDs, from, to) => {
        return stationIDs.map(async (id) => {
            const selectedRows = await pool.query(ANNUAL_PRECIPITATION_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, sum, hydrometeo_type } = element;
                return element = ({
                    stationID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get daily precipitation for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_DAILY_PRECIPITATION_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_DAILY_PRECIPITATION_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { date, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get monthly precipitation for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_MONTHLY_PRECIPITATION_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_MONTHLY_PRECIPITATION_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get annual precipitation for given region in given date range
     * 
     * @param {int[]} regionIDs ids of regions
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    REGIONAL_ANNUAL_PRECIPITATION_RESOLVER: async (regionIDs, from, to) => {
        return regionIDs.map(async (id) => {
            const selectedRows = await pool.query(REGIONAL_ANNUAL_PRECIPITATION_SQL, [id, from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, sum, hydrometeo_type } = element;
                return element = ({
                    regionID: id,
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get daily precipitation for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    DAILY_COUNTRY_PRECIPITATION_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(DAILY_COUNTRY_PRECIPITATION_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { date, avg, sum, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: date,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get monthly precipitation for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    MONTHLY_COUNTRY_PRECIPITATION_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(MONTHLY_COUNTRY_PRECIPITATION_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, tmpmonth, avg, sum, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: makeDate(tmpyear, tmpmonth),
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        });
    },
    /**
     * Function to get annual precipitation for given country in given date range
     * 
     * @param {string[]} countryShortcuts shortucts of countries
     * @param {string} from starting date of measuring
     * @param {string} to ending date of measuring
     * @returns {Object[]} returns data from database
     */
    ANNUAL_COUNTRY_PRECIPITATION_RESOLVER: async (countryShortcuts, from, to) => {
        return countryShortcuts.map(async (countryShortcut) => {
            const selectedRows = await pool.query(ANNUAL_COUNTRY_PRECIPITATION_SQL, [String(countryShortcut).toUpperCase(), from, to]);
            return selectedRows.rows.map((element) => {
                const { tmpyear, avg, sum, hydrometeo_type } = element;
                return element = ({
                    hydrometeoType: hydrometeo_type,
                    date: tmpyear,
                    avgHumidity: avg === 'NaN' ? null : avg,
                    totalPrecipitation: sum === 'NaN' ? null : sum
                });
            });
        });
    }
};
