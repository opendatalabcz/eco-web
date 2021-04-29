const Pool = require('pg').Pool;
const types = require('pg').types
const Moment = require('moment');
require('dotenv').config()

// Work around for disabling convertion from date to timestampz,
// because by default it converts date to the local timezone timestapz
// and therefore wrong dates were send to the API  
const dateTypeID = 1082;
// Function for converting recived data to standard YYYY-MM-DD format
const parseDate = (value) => {
    return value === null ? null : Moment(value).format('YYYY-MM-DD')
};
// Setting custom parser for use when parsing date
types.setTypeParser(dateTypeID, (value) => {
    return value === null ? null : parseDate(value)
});

// Creates pool for comunication with database
const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
});

module.exports = pool;
