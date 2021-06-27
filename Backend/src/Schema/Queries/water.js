const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const {
    DAILY_WATER_RESOLVER,
    MONTHLY_WATER_RESOLVER,
    ANNUAL_WATER_RESOLVER,
    REGIONAL_DAILY_WATER_RESOLVER,
    REGIONAL_MONTHLY_WATER_RESOLVER,
    REGIONAL_ANNUAL_WATER_RESOLVER,
    DAILY_COUNTRY_WATER_RESOLVER,
    MONTHLY_COUNTRY_WATER_RESOLVER,
    ANNUAL_COUNTRY_WATER_RESOLVER
} = require('../Resolvers/water');

module.exports = {
    GET_DAILY_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of daily water for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_WATER_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_MONTHLY_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of monthly water for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_WATER_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_ANNUAL_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of annual water for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_WATER_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_DAILY_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of daily water for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_DAILY_WATER_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_MONTHLY_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of daily water for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_MONTHLY_WATER_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_ANNUAL_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of annual water for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_ANNUAL_WATER_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_COUNTRY_DAILY_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of daily water for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_COUNTRY_WATER_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_MONTHLY_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of monthly water for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_COUNTRY_WATER_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_ANNUAL_WATER: (WaterType) => ({
        type: GraphQLList(GraphQLList(WaterType)),
        description: 'A list of annual water for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_COUNTRY_WATER_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
};
