const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');
const {
    DAILY_WIND_RESOLVER,
    MONTHLY_WIND_RESOLVER,
    ANNUAL_WIND_RESOLVER,
    REGIONAL_DAILY_WIND_RESOLVER,
    REGIONAL_MONTHLY_WIND_RESOLVER,
    REGIONAL_ANNUAL_WIND_RESOLVER,
    DAILY_COUNTRY_WIND_RESOLVER,
    MONTHLY_COUNTRY_WIND_RESOLVER,
    ANNUAL_COUNTRY_WIND_RESOLVER
} = require('../Resolvers/wind');

module.exports = {
    GET_DAILY_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of daily wind for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_WIND_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_MONTHLY_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of monthly wind for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_WIND_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_ANNUAL_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of annual wind for station between two dates',
        args: {
            stationIDs: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_WIND_RESOLVER(args.stationIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_DAILY_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of daily wind for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_DAILY_WIND_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_MONTHLY_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of daily wind for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_MONTHLY_WIND_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_REGIONAL_ANNUAL_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of annual wind for region between two dates',
        args: {
            regionIDs: { type: GraphQLList(GraphQLInt) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return REGIONAL_ANNUAL_WIND_RESOLVER(args.regionIDs, args.from, args.to);
        }
    }),
    GET_COUNTRY_DAILY_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of daily wind for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return DAILY_COUNTRY_WIND_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_MONTHLY_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of monthly wind for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return MONTHLY_COUNTRY_WIND_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
    GET_COUNTRY_ANNUAL_WIND: (WindType) => ({
        type: GraphQLList(GraphQLList(WindType)),
        description: 'A list of annual wind for country between two dates',
        args: {
            countryShortcuts: { type: GraphQLList(GraphQLString) },
            from: { type: GraphQLDate },
            to: { type: GraphQLDate }
        },
        resolve: async (parent, args) => {
            return ANNUAL_COUNTRY_WIND_RESOLVER(args.countryShortcuts, args.from, args.to);
        }
    }),
};
