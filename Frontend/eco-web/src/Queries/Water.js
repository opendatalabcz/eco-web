import { gql } from '@apollo/client';

export const DAILY_WATER_QUERY = gql`
    query dailyWater($stationIDs: [String!], $from: Date!, $to: Date!) {
        dailyWater(stationIDs: $stationIDs from: $from to: $to) {
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

export const MONTHLY_WATER_QUERY = gql`
    query monthlyWater($stationIDs: [String!], $from: Date!, $to: Date!) {
        monthlyWater(stationIDs: $stationIDs from: $from to: $to) {
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

export const ANNUAL_WATER_QUERY = gql`
    query annualWater($stationIDs: [String!], $from: Date!, $to: Date!) {
        annualWater(stationIDs: $stationIDs from: $from to: $to) {
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

export const DAILY_REGIONAL_WATER_QUERY = gql`
    query dailyRegionalWater($regionIDs: [Int!], $from: Date!, $to: Date!) {
        dailyRegionalWater(regionIDs: $regionIDs from: $from to: $to) {
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

export const MONTHLY_REGIONAL_WATER_QUERY = gql`
    query monthlyRegionalWater($regionIDs: [Int!], $from: Date!, $to: Date!) {
        monthlyRegionalWater(regionIDs: $regionIDs from: $from to: $to) {
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

export const ANNUAL_REGIONAL_WATER_QUERY = gql`
    query annualRegionalWater($regionIDs: [Int!], $from: Date!, $to: Date!) {
        annualRegionalWater(regionIDs: $regionIDs from: $from to: $to) {
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

export const DAILY_COUNTRY_WATER_QUERY = gql`
    query dailyCountryWater($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        dailyCountryWater(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
        }
    }
`

export const MONTHLY_COUNTRY_WATER_QUERY = gql`
    query monthlyCountryWater($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        monthlyCountryWater(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
        }
    }
`

export const ANNUAL_COUNTRY_WATER_QUERY = gql`
    query annualCountryWater($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        annualCountryWater(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avg
        }
    }
`
