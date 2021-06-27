const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const {
    DAILY_PRESSURE_RESOLVER,
    MONTHLY_PRESSURE_RESOLVER,
    ANNUAL_PRESSURE_RESOLVER,
    REGIONAL_DAILY_PRESSURE_RESOLVER,
    REGIONAL_MONTHLY_PRESSURE_RESOLVER,
    REGIONAL_ANNUAL_PRESSURE_RESOLVER,
    DAILY_COUNTRY_PRESSURE_RESOLVER,
    MONTHLY_COUNTRY_PRESSURE_RESOLVER,
    ANNUAL_COUNTRY_PRESSURE_RESOLVER
} = require('../Resolvers/pressure');

module.exports = {
    GET_DAILY_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of daily pressure for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_PRESSURE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_MONTHLY_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of monthly pressure for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_PRESSURE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_ANNUAL_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of annual pressure for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_PRESSURE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_DAILY_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of daily pressure for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_DAILY_PRESSURE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_MONTHLY_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of daily pressure for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_MONTHLY_PRESSURE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_ANNUAL_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of annual pressure for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_ANNUAL_PRESSURE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_COUNTRY_DAILY_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of daily pressure for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_COUNTRY_PRESSURE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_MONTHLY_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of monthly pressure for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_COUNTRY_PRESSURE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_ANNUAL_PRESSURE: (PressureType) => ({
        type: GraphQLList(GraphQLList(PressureType)),
        description: 'A list of annual pressure for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_COUNTRY_PRESSURE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
};
