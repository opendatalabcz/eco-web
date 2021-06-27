const pool = require('../../db');
const { REGION_SQL, REGIONS_SQL } = require('../SQL/region')

module.exports = {
    /**
     * Function for retrieving specific region
     * 
     * @param {int} regionID ID of specific region
     * @returns {Object} data for specific region
     */
    REGION_RESOLVER: async (regionID) => {
        const region = await pool.query(REGION_SQL, [regionID]);
        const { id, name, shortcut, country_name, country_shortcut, longitude, latitude } = region.rows[0];
        return {
            id: id,
            name: name,
            shortcut: shortcut,
            countryName: country_name,
            countryShortcut: country_shortcut,
            lat: latitude,
            long: longitude
        };
    },
    /**
     * Function for reatrieving all regions
     * 
     * @returns {Object[]} data of all regions
     */
    ALL_REGIONS_RESOLVER: async () => {
        const allRegions = await pool.query(REGIONS_SQL);
        return allRegions.rows.map((element) => {
            const { id, name, shortcut, country_name, country_shortcut, longitude, latitude } = element;
            return element = ({
                id: id,
                name: name,
                shortcut: shortcut,
                countryName: country_name,
                countryShortcut: country_shortcut,
                lat: latitude,
                long: longitude
            });
        });
    }
}
