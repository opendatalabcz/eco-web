const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const {
    DAILY_TEMPERATURE_RESOLVER,
    MONTHLY_TEMPERATURE_RESOLVER,
    ANNUAL_TEMPERATURE_RESOLVER,
    REGIONAL_DAILY_TEMPERATURE_RESOLVER,
    REGIONAL_MONTHLY_TEMPERATURE_RESOLVER,
    REGIONAL_ANNUAL_TEMPERATURE_RESOLVER,
    DAILY_COUNTRY_TEMPERATURE_RESOLVER,
    MONTHLY_COUNTRY_TEMPERATURE_RESOLVER,
    ANNUAL_COUNTRY_TEMPERATURE_RESOLVER
} = require('../Resolvers/temperature');

module.exports = {
    GET_DAILY_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of daily temperature for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_TEMPERATURE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_MONTHLY_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of monthly temperature for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_TEMPERATURE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_ANNUAL_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of annual temperature for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_TEMPERATURE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_DAILY_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of daily temperature for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_DAILY_TEMPERATURE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_MONTHLY_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of daily temperature for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_MONTHLY_TEMPERATURE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_ANNUAL_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of annual temperature for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_ANNUAL_TEMPERATURE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_COUNTRY_DAILY_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of daily temperature for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_COUNTRY_TEMPERATURE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_MONTHLY_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of monthly temperature for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_COUNTRY_TEMPERATURE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_ANNUAL_TEMPERATURE: (TemperatureType) => ({
        type: GraphQLList(GraphQLList(TemperatureType)),
        description: 'A list of annual temperature for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_COUNTRY_TEMPERATURE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
};
