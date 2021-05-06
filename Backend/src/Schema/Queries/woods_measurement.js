const pool = require('../../db');
const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

module.exports = {
    GET_WOODS_MEASUREMENT: (WoodsMeasurementType) => ({
        type: WoodsMeasurementType,
        description: 'A single Woods Measuremnet',
        args: {
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args) => {
            const woodsMeasurements = await pool.query(
                `SELECT *
                FROM woods_measurement
                WHERE id = $1`,
                [args.id]
            );
            const { id, region_id, etc, last_update } = woodsMeasurements.rows[0];
            return {
                id: id,
                regionID: region_id,
                etc: etc,
                lastUpdate: last_update
            };
        }
    }),
    GET_ALL_WOODS_MEASUREMENTS: (WoodsMeasurementType) => ({
        type: new GraphQLList(WoodsMeasurementType),
        description: 'List of All Woods Measurements',
        resolve: async () => {
            const allWoodsMeasurements = await pool.query(
                `SELECT *
                FROM woods_measurement`
            );
            return allWoodsMeasurements.rows.map((element) => {
                const { id, region_id, etc, last_update } = element;
                return element = ({
                    id: id,
                    regionID: region_id,
                    etc: etc,
                    lastUpdate: last_update
                });
            });
        }
    }),
    GET_ALL_WOODS_MEASUREMENTS_FOR_REGION: (WoodsMeasurementType) => ({
        type: new GraphQLList(WoodsMeasurementType),
        description: 'List of All Woods Measurements for given region',
        args: {
            region_id: { type: GraphQLInt }
        },
        resolve: async (parent, args) => {
            const allWoodsMeasurements = await pool.query(
                `SELECT *
                FROM woods_measurement
                WHERE region_id = $1`,
                [args.region_id]
            );
            return allWoodsMeasurements.rows.map((element) => {
                const { id, region_id, etc, last_update } = element;
                return element = ({
                    id: id,
                    regionID: region_id,
                    etc: etc,
                    lastUpdate: last_update
                });
            });
        }
    })
};
