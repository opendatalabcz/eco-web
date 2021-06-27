const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const {
    DAILY_SHINE_RESOLVER,
    MONTHLY_SHINE_RESOLVER,
    ANNUAL_SHINE_RESOLVER,
    REGIONAL_DAILY_SHINE_RESOLVER,
    REGIONAL_MONTHLY_SHINE_RESOLVER,
    REGIONAL_ANNUAL_SHINE_RESOLVER,
    DAILY_COUNTRY_SHINE_RESOLVER,
    MONTHLY_COUNTRY_SHINE_RESOLVER,
    ANNUAL_COUNTRY_SHINE_RESOLVER
} = require('../Resolvers/shine');

module.exports = {
    GET_DAILY_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of daily shine for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_SHINE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_MONTHLY_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of monthly shine for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_SHINE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_ANNUAL_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of annual shine for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_SHINE_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_DAILY_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of daily shine for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_DAILY_SHINE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_MONTHLY_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of daily shine for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_MONTHLY_SHINE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_ANNUAL_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of annual shine for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_ANNUAL_SHINE_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_COUNTRY_DAILY_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of daily shine for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_COUNTRY_SHINE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_MONTHLY_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of monthly shine for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_COUNTRY_SHINE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_ANNUAL_SHINE: (ShineType) => ({
        type: GraphQLList(GraphQLList(ShineType)),
        description: 'A list of annual shine for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_COUNTRY_SHINE_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
};
