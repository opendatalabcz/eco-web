import { gql } from '@apollo/client';

export const DAILY_PRECIPITATION_QUERY = gql`
    query dailyPrecipitation($stationIDs: [String!], $from: Date!, $to: Date!) {
        dailyPrecipitation(stationIDs: $stationIDs from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const MONTHLY_PRECIPITATION_QUERY = gql`
    query monthlyPrecipitation($stationIDs: [String!], $from: Date!, $to: Date!) {
        monthlyPrecipitation(stationIDs: $stationIDs from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const ANNUAL_PRECIPITATION_QUERY = gql`
    query annualPrecipitation($stationIDs: [String!], $from: Date!, $to: Date!) {
        annualPrecipitation(stationIDs: $stationIDs from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const DAILY_REGIONAL_PRECIPITATION_QUERY = gql`
    query dailyRegionalPrecipitation($regionIDs: [Int!], $from: Date!, $to: Date!) {
        dailyRegionalPrecipitation(regionIDs: $regionIDs from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const MONTHLY_REGIONAL_PRECIPITATION_QUERY = gql`
    query monthlyRegionalPrecipitation($regionIDs: [Int!], $from: Date!, $to: Date!) {
        monthlyRegionalPrecipitation(regionIDs: $regionIDs from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const ANNUAL_REGIONAL_PRECIPITATION_QUERY = gql`
    query annualRegionalPrecipitation($regionIDs: [Int!], $from: Date!, $to: Date!) {
        annualRegionalPrecipitation(regionIDs: $regionIDs from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const DAILY_COUNTRY_PRECIPITATION_QUERY = gql`
    query dailyCountryPrecipitation($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        dailyCountryPrecipitation(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
        }
    }
`

export const MONTHLY_COUNTRY_PRECIPITATION_QUERY = gql`
    query monthlyCountryPrecipitation($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        monthlyCountryPrecipitation(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
        }
    }
`

export const ANNUAL_COUNTRY_PRECIPITATION_QUERY = gql`
    query annualCountryPrecipitation($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        annualCountryPrecipitation(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            avgHumidity
            totalPrecipitation
        }
    }
`
