import { gql } from '@apollo/client';

export const DAILY_SHINE_QUERY = gql`
    query dailyShine($stationIDs: [String!], $from: Date!, $to: Date!) {
        dailyShine(stationIDs: $stationIDs from: $from to: $to) {
            date
            value
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const MONTHLY_SHINE_QUERY = gql`
    query monthlyShine($stationIDs: [String!], $from: Date!, $to: Date!) {
        monthlyShine(stationIDs: $stationIDs from: $from to: $to) {
            date
            value
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const ANNUAL_SHINE_QUERY = gql`
    query annualShine($stationIDs: [String!], $from: Date!, $to: Date!) {
        annualShine(stationIDs: $stationIDs from: $from to: $to) {
            date
            value
            station {
                locationName
                lat
                long
            }
        }
    }
`

export const DAILY_REGIONAL_SHINE_QUERY = gql`
    query dailyRegionalShine($regionIDs: [Int!], $from: Date!, $to: Date!) {
        dailyRegionalShine(regionIDs: $regionIDs from: $from to: $to) {
            date
            value
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const MONTHLY_REGIONAL_SHINE_QUERY = gql`
    query monthlyRegionalShine($regionIDs: [Int!], $from: Date!, $to: Date!) {
        monthlyRegionalShine(regionIDs: $regionIDs from: $from to: $to) {
            date
            value
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const ANNUAL_REGIONAL_SHINE_QUERY = gql`
    query annualRegionalShine($regionIDs: [Int!], $from: Date!, $to: Date!) {
        annualRegionalShine(regionIDs: $regionIDs from: $from to: $to) {
            date
            value
            region {
                name
                shortcut
                lat
                long
            }
        }
    }
`

export const DAILY_COUNTRY_SHINE_QUERY = gql`
    query dailyCountryShine($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        dailyCountryShine(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            value
        }
    }
`

export const MONTHLY_COUNTRY_SHINE_QUERY = gql`
    query monthlyCountryShine($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        monthlyCountryShine(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            value
        }
    }
`

export const ANNUAL_COUNTRY_SHINE_QUERY = gql`
    query annualCountryShine($countryShortcuts: [String!], $from: Date!, $to: Date!) {
        annualCountryShine(countryShortcuts: $countryShortcuts from: $from to: $to) {
            date
            value
        }
    }
`
