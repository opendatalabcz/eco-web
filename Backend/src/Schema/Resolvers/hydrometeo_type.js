const pool = require('../../db');
const { HYDROMETEO_TYPE_SQL, HYDROMETEO_TYPES_SQL } = require('../SQL/hydrometeo_type')

module.exports = {
    /**
     * Function for retrieving Hydrometeo type from database
     * 
     * @param {int} hydrometeoTypeID - id of hydrometeo Type
     * @returns {Object} returns data for hydrometeo type
     */
    HYDROMETEO_TYPE_RESOLVER: async (hydrometeoTypeID) => {
        const hydrometeoType = await pool.query(HYDROMETEO_TYPE_SQL, [hydrometeoTypeID]);
        const { id, name, unit } = hydrometeoType.rows[0];
        return { id: id, name: name, unit: unit.split(', ') };
    },
    /**
     * Function for retrieving all Hydrometeo type from database
     * 
     * @returns {Object[]} retruns list of all hydrometeo types
     */
    HYDROMETEO_TYPES_RESOLVER: async () => {
        const allHydrometeoTypes = await pool.query(HYDROMETEO_TYPES_SQL);
        return allHydrometeoTypes.rows.map((element) => {
            const { id, name, unit } = element;
            return { id: id, name: name, unit: unit.split(', ') };
        });
    }
}
