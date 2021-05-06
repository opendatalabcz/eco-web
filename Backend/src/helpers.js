module.exports = {
    getMask: (dataType) => {
        // Returns correct bit mask for given dataType.
        // Used for retrieving stations for given dataType
        if (dataType === 'temperature') return 7
        if (dataType === 'precipitation') return 24
        if (dataType === 'snow') return 96
        if (dataType === 'shine') return 128
        if (dataType === 'pressure') return 256
        if (dataType === 'wind') return 1536
        if (dataType === 'water') return 2048
        return 0;
    },
    makeDate: (year, month) => {
        // Creates correct date in format YYYY-MM from separate 
        // month and year. If the leading zero is missing, it is added.
        var sMonth = month.toString();
        if (sMonth.length === 1) sMonth = '0' + sMonth;
        return year.toString() + '-' + sMonth;
    }
};
