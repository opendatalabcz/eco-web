module.exports = {
    REGION_SQL: `
        SELECT *
        FROM region
        WHERE id = $1
    `,
    REGIONS_SQL: `
        SELECT *
        FROM region
    `
}
