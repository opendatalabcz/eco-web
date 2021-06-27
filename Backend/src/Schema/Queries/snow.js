const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const {
    DAILY_SNOW_RESOLVER,
    MONTHLY_SNOW_RESOLVER,
    ANNUAL_SNOW_RESOLVER,
    REGIONAL_DAILY_SNOW_RESOLVER,
    REGIONAL_MONTHLY_SNOW_RESOLVER,
    REGIONAL_ANNUAL_SNOW_RESOLVER,
    DAILY_COUNTRY_SNOW_RESOLVER,
    MONTHLY_COUNTRY_SNOW_RESOLVER,
    ANNUAL_COUNTRY_SNOW_RESOLVER
} = require('../Resolvers/snow');

module.exports = {
    GET_DAILY_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of daily snow for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_SNOW_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_MONTHLY_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of monthly snow for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_SNOW_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_ANNUAL_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of annual snow for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_SNOW_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_DAILY_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of daily snow for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_DAILY_SNOW_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_MONTHLY_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of daily snow for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_MONTHLY_SNOW_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_ANNUAL_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of annual snow for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_ANNUAL_SNOW_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_COUNTRY_DAILY_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of daily snow for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_COUNTRY_SNOW_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_MONTHLY_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of monthly snow for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_COUNTRY_SNOW_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_ANNUAL_SNOW: (SnowType) => ({
        type: GraphQLList(GraphQLList(SnowType)),
        description: 'A list of annual snow for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_COUNTRY_SNOW_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
};
