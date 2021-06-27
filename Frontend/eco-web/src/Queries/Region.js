import { gql } from '@apollo/client';

export const REGIONS_QUERY = gql`
    query regions {
        regions {
            id
            name
            stations {
                id
                locationName
            }
        }
    }
`

export const REGIONS_WITH_STATIONS_FOR_EACH_HYDROMETEO_TYPE_QUERY = gql`
    query regions {
        regions {
            id
            name
            stationsByHydroMeteoTypes {
                hydroMeteoType
                hydroMeteoTypeName
                stations {
                    id
                    locationName
                }
            }
        }
    }
`
