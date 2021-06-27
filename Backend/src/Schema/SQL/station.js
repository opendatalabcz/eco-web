module.exports = {
    STATION_SQL: `
        SELECT *
        FROM station
        WHERE id = $1
    `,
    STATIONS_SQL: `
        SELECT *
        FROM station
    `,
    STATIONS_FOR_REGION_SQL: `
        SELECT *
        FROM station
        WHERE region_id = $1
    `,
    STATIONS_FOR_REGION_OF_GIVEN_TYPE_SQL: `
        SELECT *
        FROM station
        WHERE region_id = $1
        AND (CAST(station_type AS int) & $2 > 0)
    `
}
