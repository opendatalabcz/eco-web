import { gql } from '@apollo/client';

export const HYDROMETEO_TYPES_QUERY = gql`
    query hydrometeoTypes {
        hydrometeoTypes {
            id
            name
            unit
        }
    }
`