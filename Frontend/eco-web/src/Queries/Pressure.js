import { gql } from '@apollo/client';

export const DAILY_PRESSURE_QUERY = gql`
    query dailyPressure($stationIDs: [String!], $from: Date!, $to: Date!) {
        dailyPressure(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const MONTHLY_PRESSURE_QUERY = gql`
    query monthlyPressure($stationIDs: [String!], $from: Date!, $to: Date!) {
        monthlyPressure(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const ANNUAL_PRESSURE_QUERY = gql`
    query annualPressure($stationIDs: [String!], $from: Date!, $to: Date!) {
        annualPressure(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const DAILY_REGIONAL_PRESSURE_QUERY = gql`
    query dailyRegionalPressure($regionIDs: [Int!], $from: Date!, $to: Date!) {
        dailyRegionalPressure(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const MONTHLY_REGIONAL_PRESSURE_QUERY = gql`
    query monthlyRegionalPressure($regionIDs: [Int!], $from: Date!, $to: Date!) {
        monthlyRegionalPressure(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const ANNUAL_REGIONAL_PRESSURE_QUERY = gql`
    query annualRegionalPressure($regionIDs: [Int!], $from: Date!, $to: Date!) {
        annualRegionalPressure(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const DAILY_COUNTRY_PRESSURE_QUERY = gql`
    query dailyCountryPressure($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        dailyCountryPressure(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
        }
    }
`

export const MONTHLY_COUNTRY_PRESSURE_QUERY = gql`
    query monthlyCountryPressure($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        monthlyCountryPressure(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
        }
    }
`

export const ANNUAL_COUNTRY_PRESSURE_QUERY = gql`
    query annualCountryPressure($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        annualCountryPressure(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
        }
    }
`
