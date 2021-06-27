import { gql } from '@apollo/client';

export const DAILY_WIND_QUERY = gql`
    query dailyWind($stationIDs: [String!], $from: Date!, $to: Date!) {
        dailyWind(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            max
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const MONTHLY_WIND_QUERY = gql`
    query monthlyWind($stationIDs: [String!], $from: Date!, $to: Date!) {
        monthlyWind(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            max
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const ANNUAL_WIND_QUERY = gql`
    query annualWind($stationIDs: [String!], $from: Date!, $to: Date!) {
        annualWind(stationIDs: $stationIDs from: $from to: $to) {
            date
            avg
            max
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const DAILY_REGIONAL_WIND_QUERY = gql`
    query dailyRegionalWind($regionIDs: [Int!], $from: Date!, $to: Date!) {
        dailyRegionalWind(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
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

export const MONTHLY_REGIONAL_WIND_QUERY = gql`
    query monthlyRegionalWind($regionIDs: [Int!], $from: Date!, $to: Date!) {
        monthlyRegionalWind(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
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

export const ANNUAL_REGIONAL_WIND_QUERY = gql`
    query annualRegionalWind($regionIDs: [Int!], $from: Date!, $to: Date!) {
        annualRegionalWind(regionIDs: $regionIDs from: $from to: $to) {
            date
            avg
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

export const DAILY_COUNTRY_WIND_QUERY = gql`
    query dailyCountryWind($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        dailyCountryWind(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
            max
        }
    }
`

export const MONTHLY_COUNTRY_WIND_QUERY = gql`
    query monthlyCountryWind($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        monthlyCountryWind(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
            max
        }
    }
`

export const ANNUAL_COUNTRY_WIND_QUERY = gql`
    query annualCountryWind($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        annualCountryWind(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
            max
        }
    }
`
