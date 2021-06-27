import { gql } from '@apollo/client';

export const DAILY_TEMPERATURE_QUERY = gql`
    query dailyTemperature($stationIDs: [String!], $from: Date!, $to: Date!) {
        dailyTemperature(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            min
            max
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const MONTHLY_TEMPERATURE_QUERY = gql`
    query monthlyTemperature($stationIDs: [String!], $from: Date!, $to: Date!) {
        monthlyTemperature(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            min
            max
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const ANNUAL_TEMPERATURE_QUERY = gql`
    query annualTemperature($stationIDs: [String!], $from: Date!, $to: Date!) {
        annualTemperature(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            min
            max
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const DAILY_REGIONAL_TEMPERATURE_QUERY = gql`
    query dailyRegionalTemperature($regionIDs: [Int!], $from: Date!, $to: Date!) {
        dailyRegionalTemperature(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
            min
            max
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const MONTHLY_REGIONAL_TEMPERATURE_QUERY = gql`
    query monthlyRegionalTemperature($regionIDs: [Int!], $from: Date!, $to: Date!) {
        monthlyRegionalTemperature(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
            min
            max
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const ANNUAL_REGIONAL_TEMPERATURE_QUERY = gql`
    query annualRegionalTemperature($regionIDs: [Int!], $from: Date!, $to: Date!) {
        annualRegionalTemperature(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
            min
            max
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const DAILY_COUNTRY_TEMPERATURE_QUERY = gql`
    query dailyCountryTemperature($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        dailyCountryTemperature(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
            min
            max
        }
    }
`

export const MONTHLY_COUNTRY_TEMPERATURE_QUERY = gql`
    query monthlyCountryTemperature($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        monthlyCountryTemperature(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
            min
            max
        }
    }
`

export const ANNUAL_COUNTRY_TEMPERATURE_QUERY = gql`
    query annualCountryTemperature($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        annualCountryTemperature(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
            min
            max
        }
    }
`
