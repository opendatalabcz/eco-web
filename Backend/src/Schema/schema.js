const RegionTypeInject = require('./Types/region');
const StationTypeInject = require('./Types/station');
const HydroMeteoTypeInject = require('./Types/hydrometeo_types');
const WoodsMeasurementTypeInject = require('./Types/woods_measurement');
const TemperatureTypeInject = require('./Types/temperature');
const ShineTypeInject = require('./Types/shine');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { GET_REGION, GET_ALL_REGIONS } = require('./Queries/region');
const {
    GET_ALL_STATION,
    GET_ALL_STATION_FOR_REGION,
    GET_STATION,
    GET_ALL_STATION_FOR_REGION_OF_GIVEN_TYPE
} = require('./Queries/station');
const {
    GET_ALL_WOODS_MEASUREMENTS,
    GET_ALL_WOODS_MEASUREMENTS_FOR_REGION,
    GET_WOODS_MEASUREMENT
} = require('./Queries/woods_measurement');
const { GET_ALL_HYDROMETEO_TYPES, GET_HYDROMETEO_TYPE } = require('./Queries/hydrometeo_types');
const { 
    GET_DAILY_TEMPERATURE, 
    GET_MONTHLY_TEMPERATURE, 
    GET_ANNUAL_TEMPERATURE, 
    GET_REGIONAL_DAILY_TEMPERATURE, 
    GET_REGIONAL_MONTHLY_TEMPERATURE,
    GET_REGIONAL_ANNUAL_TEMPERATURE,
    GET_COUNTRY_ANNUAL_TEMPERATURE,
    GET_COUNTRY_DAILY_TEMPERATURE,
    GET_COUNTRY_MONTHLY_TEMPERATURE
} = require('./Queries/temperature');
const {
    GET_DAILY_SHINE,
    GET_MONTHLY_SHINE,
    GET_ANNUAL_SHINE,
    GET_REGIONAL_DAILY_SHINE,
    GET_REGIONAL_MONTHLY_SHINE,
    GET_REGIONAL_ANNUAL_SHINE,
    GET_COUNTRY_DAILY_SHINE,
    GET_COUNTRY_MONTHLY_SHINE,
    GET_COUNTRY_ANNUAL_SHINE
} = require('./Queries/shine');


const types = {};
types.RegionType = RegionTypeInject(types);
types.StationType = StationTypeInject(types);
types.HydroMeteoType = HydroMeteoTypeInject(types);
types.WoodsMeasurementType = WoodsMeasurementTypeInject(types);
types.TemperatureType = TemperatureTypeInject(types);
types.ShineType = ShineTypeInject(types);

const RegionType = types.RegionType;
const StationType = types.StationType;
const HydroMeteoType = types.HydroMeteoType;
const WoodsMeasurementType = types.WoodsMeasurementType;
const TemperatureType = types.TemperatureType;
const ShineType = types.ShineType;

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        region: GET_REGION(RegionType),
        regions: GET_ALL_REGIONS(RegionType),
        station: GET_STATION(StationType),
        stations: GET_ALL_STATION(StationType),
        stationsInRegion: GET_ALL_STATION_FOR_REGION(StationType),
        stationInRegionForDataType: GET_ALL_STATION_FOR_REGION_OF_GIVEN_TYPE(StationType),
        woodsMeasurement: GET_WOODS_MEASUREMENT(WoodsMeasurementType),
        woodsMeasurements: GET_ALL_WOODS_MEASUREMENTS(WoodsMeasurementType),
        woodsMeasurementsForRegion: GET_ALL_WOODS_MEASUREMENTS_FOR_REGION(WoodsMeasurementType),
        hydrometeoType: GET_HYDROMETEO_TYPE(HydroMeteoType),
        hydrometeoTypes: GET_ALL_HYDROMETEO_TYPES(HydroMeteoType),
        dailyTemperature: GET_DAILY_TEMPERATURE(TemperatureType),
        monthlyTemperature: GET_MONTHLY_TEMPERATURE(TemperatureType),
        annualTemperature: GET_ANNUAL_TEMPERATURE(TemperatureType),
        dailyRegionalTemperature: GET_REGIONAL_DAILY_TEMPERATURE(TemperatureType),
        monthlyRegionalTemperature: GET_REGIONAL_MONTHLY_TEMPERATURE(TemperatureType),
        annualRegionalTemperature: GET_REGIONAL_ANNUAL_TEMPERATURE(TemperatureType),
        dailyCountryTemperature: GET_COUNTRY_DAILY_TEMPERATURE(TemperatureType),
        monthlyCountryTemperature: GET_COUNTRY_MONTHLY_TEMPERATURE(TemperatureType),
        annualCountryTemperature: GET_COUNTRY_ANNUAL_TEMPERATURE(TemperatureType),
        dailyShine: GET_DAILY_SHINE(ShineType),
        monthlyShine: GET_MONTHLY_SHINE(ShineType),
        annualShine: GET_ANNUAL_SHINE(ShineType),
        dailyRegionalShine: GET_REGIONAL_DAILY_SHINE(ShineType),
        monthlyRegionalShine: GET_REGIONAL_MONTHLY_SHINE(ShineType),
        annualRegionalShine: GET_REGIONAL_ANNUAL_SHINE(ShineType),
        dailyCountryShine: GET_COUNTRY_DAILY_SHINE(ShineType),
        monthlyCountryShine: GET_COUNTRY_MONTHLY_SHINE(ShineType),
        annualCountryShine: GET_COUNTRY_ANNUAL_SHINE(ShineType)
    })
});

const Schema = new GraphQLSchema ({
    query: RootQueryType
});

module.exports = Schema;
