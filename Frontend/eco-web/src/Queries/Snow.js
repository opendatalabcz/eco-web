import { gql } from '@apollo/client';

export const DAILY_SNOW_QUERY = gql`
    query dailySnow($stationIDs: [String!], $from: Date!, $to: Date!) {
        dailySnow(stationIDs: $stationIDs from: $from to: $to) {
            date
            fallen
            totalHeight
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const MONTHLY_SNOW_QUERY = gql`
    query monthlySnow($stationIDs: [String!], $from: Date!, $to: Date!) {
        monthlySnow(stationIDs: $stationIDs from: $from to: $to) {
            date
            fallen
            totalHeight
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const ANNUAL_SNOW_QUERY = gql`
    query annualSnow($stationIDs: [String!], $from: Date!, $to: Date!) {
        annualSnow(stationIDs: $stationIDs from: $from to: $to) {
            date
            fallen
            totalHeight
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const DAILY_REGIONAL_SNOW_QUERY = gql`
    query dailyRegionalSnow($regionIDs: [Int!], $from: Date!, $to: Date!) {
        dailyRegionalSnow(regionIDs: $regionIDs from: $from to: $to) {
            date
            fallen
            totalHeight
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const MONTHLY_REGIONAL_SNOW_QUERY = gql`
    query monthlyRegionalSnow($regionIDs: [Int!], $from: Date!, $to: Date!) {
        monthlyRegionalSnow(regionIDs: $regionIDs from: $from to: $to) {
            date
            fallen
            totalHeight
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const ANNUAL_REGIONAL_SNOW_QUERY = gql`
    query annualRegionalSnow($regionIDs: [Int!], $from: Date!, $to: Date!) {
        annualRegionalSnow(regionIDs: $regionIDs from: $from to: $to) {
            date
            fallen
            totalHeight
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const DAILY_COUNTRY_SNOW_QUERY = gql`
    query dailyCountrySnow($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        dailyCountrySnow(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            fallen
            totalHeight
        }
    }
`

export const MONTHLY_COUNTRY_SNOW_QUERY = gql`
    query monthlyCountrySnow($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        monthlyCountrySnow(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            fallen
            totalHeight
        }
    }
`

export const ANNUAL_COUNTRY_SNOW_QUERY = gql`
    query annualCountrySnow($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        annualCountrySnow(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            fallen
            totalHeight
        }
    }
`
