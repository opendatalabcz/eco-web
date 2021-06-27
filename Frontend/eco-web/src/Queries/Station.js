import { gql } from '@apollo/client';

export const STATIONS_FOR_TYPE_IN_REGION_QUERY = gql`
    query stationInRegionForDataType($regionID: Int! $dataType: String!) {
        stationInRegionForDataType(regionID: $regionID dataType: $dataType) {
            id
            regionID
        }
    }
`
