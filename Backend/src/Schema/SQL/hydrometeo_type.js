module.exports = {
    HYDROMETEO_TYPE_SQL: `
        SELECT *
        FROM hydrometeo_types
        WHERE id = $1
    `,
    HYDROMETEO_TYPES_SQL: `
        SELECT *
        FROM hydrometeo_types
    `,
    HYDROMETEO_TYPES_FOR_STATIONS_SQL: `
        SELECT
            hydrometeo_types.id,
            hydrometeo_types.name
        FROM hydrometeo_types
    `
}
