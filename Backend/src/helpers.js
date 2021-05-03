module.exports = {
    getMask: (dataType) => {
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
        var sMonth = month.toString();
        if (sMonth.length === 1) sMonth = '0' + sMonth;
        return year.toString() + '-' + sMonth;
    }
};
