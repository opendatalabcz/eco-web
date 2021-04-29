const pool = require('../db');
const RegionTypeInject = require('./Types/region');
const StationTypeInject = require('./Types/station');
const HydroMeteoTypeInject = require('./Types/hydrometeo_types')
const WoodsMeasurementTypeInject = require('./Types/woods_measurement')
const TemperatureTypeInject = require('./Types/temperature')
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { GET_REGION, GET_ALL_REGIONS } = require('./Queries/region')
const { GET_ALL_STATION, GET_ALL_STATION_FOR_REGION, GET_STATION } = require('./Queries/station')
const { GET_ALL_WOODS_MEASUREMENTS, GET_ALL_WOODS_MEASUREMENTS_FOR_REGION, GET_WOODS_MEASUREMENT } = require('./Queries/woods_measurement')
const { GET_ALL_HYDROMETEO_TYPES, GET_HYDROMETEO_TYPE } = require('./Queries/hydrometeo_types')
const { GET_DAILY_TEMPERATURE } = require('./Queries/temperature')


const types = {};
types.RegionType = RegionTypeInject(types);
types.StationType = StationTypeInject(types);
types.HydroMeteoType = HydroMeteoTypeInject(types);
types.WoodsMeasurementType = WoodsMeasurementTypeInject(types);
types.TemperatureType = TemperatureTypeInject(types)

const RegionType = types.RegionType;
const StationType = types.StationType;
const HydroMeteoType = types.HydroMeteoType;
const WoodsMeasurementType = types.WoodsMeasurementType;
const TemperatureType = types.TemperatureType

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        region: GET_REGION(RegionType),
        regions: GET_ALL_REGIONS(RegionType),
        station: GET_STATION(StationType),
        stations: GET_ALL_STATION(StationType),
        stationsInRegion: GET_ALL_STATION_FOR_REGION(StationType),
        woodsMeasurement: GET_WOODS_MEASUREMENT(WoodsMeasurementType),
        woodsMeasurements: GET_ALL_WOODS_MEASUREMENTS(WoodsMeasurementType),
        woodsMeasurementsForRegion: GET_ALL_WOODS_MEASUREMENTS_FOR_REGION(WoodsMeasurementType),
        hydrometeoType: GET_HYDROMETEO_TYPE(HydroMeteoType),
        hydrometeoTypes: GET_ALL_HYDROMETEO_TYPES(HydroMeteoType),
        dailyTemperature: GET_DAILY_TEMPERATURE(TemperatureType)
    })
});

const Schema = new GraphQLSchema ({
    query: RootQueryType
})

module.exports = Schema;
