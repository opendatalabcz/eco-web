const RegionTypeInject = require('./Types/region');
const StationTypeInject = require('./Types/station');
const HydroMeteoTypeInject = require('./Types/hydrometeo_types');
const WoodsMeasurementTypeInject = require('./Types/woods_measurement');
const TemperatureTypeInject = require('./Types/temperature');
const ShineTypeInject = require('./Types/shine');
const PressureTypeInject = require('./Types/pressure');
const WaterTypeInject = require('./Types/water');
const PrecipitationTypeInject = require('./Types/precipitation');
const WindTypeInject = require('./Types/wind');
const SnowTypeInject = require('./Types/snow');
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
const {
    GET_DAILY_PRESSURE,
    GET_MONTHLY_PRESSURE,
    GET_ANNUAL_PRESSURE,
    GET_REGIONAL_DAILY_PRESSURE,
    GET_REGIONAL_MONTHLY_PRESSURE,
    GET_REGIONAL_ANNUAL_PRESSURE,
    GET_COUNTRY_DAILY_PRESSURE,
    GET_COUNTRY_MONTHLY_PRESSURE,
    GET_COUNTRY_ANNUAL_PRESSURE
} = require('./Queries/pressure');
const {
    GET_DAILY_WATER,
    GET_MONTHLY_WATER,
    GET_ANNUAL_WATER,
    GET_REGIONAL_DAILY_WATER,
    GET_REGIONAL_MONTHLY_WATER,
    GET_REGIONAL_ANNUAL_WATER,
    GET_COUNTRY_DAILY_WATER,
    GET_COUNTRY_MONTHLY_WATER,
    GET_COUNTRY_ANNUAL_WATER
} = require('./Queries/water');
const {
    GET_DAILY_PRECIPITATION,
    GET_MONTHLY_PRECIPITATION,
    GET_ANNUAL_PRECIPITATION,
    GET_REGIONAL_DAILY_PRECIPITATION,
    GET_REGIONAL_MONTHLY_PRECIPITATION,
    GET_REGIONAL_ANNUAL_PRECIPITATION,
    GET_COUNTRY_DAILY_PRECIPITATION,
    GET_COUNTRY_MONTHLY_PRECIPITATION,
    GET_COUNTRY_ANNUAL_PRECIPITATION
} = require('./Queries/precipitation');
const {
    GET_DAILY_SNOW,
    GET_MONTHLY_SNOW,
    GET_ANNUAL_SNOW,
    GET_REGIONAL_DAILY_SNOW,
    GET_REGIONAL_MONTHLY_SNOW,
    GET_REGIONAL_ANNUAL_SNOW,
    GET_COUNTRY_DAILY_SNOW,
    GET_COUNTRY_MONTHLY_SNOW,
    GET_COUNTRY_ANNUAL_SNOW,
} = require('./Queries/snow');
const {
    GET_DAILY_WIND,
    GET_MONTHLY_WIND,
    GET_ANNUAL_WIND,
    GET_REGIONAL_DAILY_WIND,
    GET_REGIONAL_MONTHLY_WIND,
    GET_REGIONAL_ANNUAL_WIND,
    GET_COUNTRY_DAILY_WIND,
    GET_COUNTRY_MONTHLY_WIND,
    GET_COUNTRY_ANNUAL_WIND,
} = require('./Queries/wind');



const types = {};
types.RegionType = RegionTypeInject(types);
types.StationType = StationTypeInject(types);
types.HydroMeteoType = HydroMeteoTypeInject(types);
types.WoodsMeasurementType = WoodsMeasurementTypeInject(types);
types.TemperatureType = TemperatureTypeInject(types);
types.ShineType = ShineTypeInject(types);
types.PressureType = PressureTypeInject(types);
types.WaterType = WaterTypeInject(types);
types.PrecipitationType = PrecipitationTypeInject(types)
types.WindType = WindTypeInject(types)
types.SnowType = SnowTypeInject(types)

const RegionType = types.RegionType;
const StationType = types.StationType;
const HydroMeteoType = types.HydroMeteoType;
const WoodsMeasurementType = types.WoodsMeasurementType;
const TemperatureType = types.TemperatureType;
const ShineType = types.ShineType;
const PressureType = types.PressureType;
const WaterType = types.WaterType;
const PrecipitationType = types.PrecipitationType;
const WindType = types.WindType;
const SnowType = types.SnowType;

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
        annualCountryShine: GET_COUNTRY_ANNUAL_SHINE(ShineType),
        dailyPressure: GET_DAILY_PRESSURE(PressureType),
        monthlyPressure: GET_MONTHLY_PRESSURE(PressureType),
        annualPressure: GET_ANNUAL_PRESSURE(PressureType),
        dailyRegionalPressure: GET_REGIONAL_DAILY_PRESSURE(PressureType),
        monthlyRegionalPressure: GET_REGIONAL_MONTHLY_PRESSURE(PressureType),
        annualRegionalPressure: GET_REGIONAL_ANNUAL_PRESSURE(PressureType),
        dailyCountryPressure: GET_COUNTRY_DAILY_PRESSURE(PressureType),
        monthlyCountryPressure: GET_COUNTRY_MONTHLY_PRESSURE(PressureType),
        annualCountryPressure: GET_COUNTRY_ANNUAL_PRESSURE(PressureType),
        dailyWater: GET_DAILY_WATER(WaterType),
        monthlyWater: GET_MONTHLY_WATER(WaterType),
        annualWater: GET_ANNUAL_WATER(WaterType),
        dailyRegionalWater: GET_REGIONAL_DAILY_WATER(WaterType),
        monthlyRegionalWater: GET_REGIONAL_MONTHLY_WATER(WaterType),
        annualRegionalWater: GET_REGIONAL_ANNUAL_WATER(WaterType),
        dailyCountryWater: GET_COUNTRY_DAILY_WATER(WaterType),
        monthlyCountryWater: GET_COUNTRY_MONTHLY_WATER(WaterType),
        annualCountryWater: GET_COUNTRY_ANNUAL_WATER(WaterType),
        dailyPrecipitation: GET_DAILY_PRECIPITATION(PrecipitationType),
        monthlyPrecipitation: GET_MONTHLY_PRECIPITATION(PrecipitationType),
        annualPrecipitation: GET_ANNUAL_PRECIPITATION(PrecipitationType),
        dailyRegionalPrecipitation: GET_REGIONAL_DAILY_PRECIPITATION(PrecipitationType),
        monthlyRegionalPrecipitation: GET_REGIONAL_MONTHLY_PRECIPITATION(PrecipitationType),
        annualRegionalPrecipitation: GET_REGIONAL_ANNUAL_PRECIPITATION(PrecipitationType),
        dailyCountryPrecipitation: GET_COUNTRY_DAILY_PRECIPITATION(PrecipitationType),
        monthlyCountryPrecipitation: GET_COUNTRY_MONTHLY_PRECIPITATION(PrecipitationType),
        annualCountryPrecipitation: GET_COUNTRY_ANNUAL_PRECIPITATION(PrecipitationType),
        dailySnow: GET_DAILY_SNOW(SnowType),
        monthlySnow: GET_MONTHLY_SNOW(SnowType),
        annualSnow: GET_ANNUAL_SNOW(SnowType),
        dailyRegionalSnow: GET_REGIONAL_DAILY_SNOW(SnowType),
        monthlyRegionalSnow: GET_REGIONAL_MONTHLY_SNOW(SnowType),
        annualRegionalSnow: GET_REGIONAL_ANNUAL_SNOW(SnowType),
        dailyCountrySnow: GET_COUNTRY_DAILY_SNOW(SnowType),
        monthlyCountrySnow: GET_COUNTRY_MONTHLY_SNOW(SnowType),
        annualCountrySnow: GET_COUNTRY_ANNUAL_SNOW(SnowType),
        dailyWind: GET_DAILY_WIND(WindType),
        monthlyWind: GET_MONTHLY_WIND(WindType),
        annualWind: GET_ANNUAL_WIND(WindType),
        dailyRegionalWind: GET_REGIONAL_DAILY_WIND(WindType),
        monthlyRegionalWind: GET_REGIONAL_MONTHLY_WIND(WindType),
        annualRegionalWind: GET_REGIONAL_ANNUAL_WIND(WindType),
        dailyCountryWind: GET_COUNTRY_DAILY_WIND(WindType),
        monthlyCountryWind: GET_COUNTRY_MONTHLY_WIND(WindType),
        annualCountryWind: GET_COUNTRY_ANNUAL_WIND(WindType)
    })
});

const Schema = new GraphQLSchema({
    query: RootQueryType
});

module.exports = Schema;
