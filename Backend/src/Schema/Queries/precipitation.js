const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const {
    DAILY_PRECIPITATION_RESOLVER,
    MONTHLY_PRECIPITATION_RESOLVER,
    ANNUAL_PRECIPITATION_RESOLVER,
    REGIONAL_DAILY_PRECIPITATION_RESOLVER,
    REGIONAL_MONTHLY_PRECIPITATION_RESOLVER,
    REGIONAL_ANNUAL_PRECIPITATION_RESOLVER,
    DAILY_COUNTRY_PRECIPITATION_RESOLVER,
    MONTHLY_COUNTRY_PRECIPITATION_RESOLVER,
    ANNUAL_COUNTRY_PRECIPITATION_RESOLVER
} = require('../Resolvers/precipitation');

module.exports = {
    GET_DAILY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of daily precipitation for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_PRECIPITATION_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_MONTHLY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of monthly precipitation for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_PRECIPITATION_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_ANNUAL_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of annual precipitation for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_PRECIPITATION_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_DAILY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of daily precipitation for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_DAILY_PRECIPITATION_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_MONTHLY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of daily precipitation for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_MONTHLY_PRECIPITATION_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_ANNUAL_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of annual precipitation for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_ANNUAL_PRECIPITATION_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_COUNTRY_DAILY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of daily precipitation for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_COUNTRY_PRECIPITATION_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_MONTHLY_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of monthly precipitation for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_COUNTRY_PRECIPITATION_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_ANNUAL_PRECIPITATION: (PrecipitationType) => ({
        type: GraphQLList(GraphQLList(PrecipitationType)),
        description: 'A list of annual precipitation for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_COUNTRY_PRECIPITATION_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
};
