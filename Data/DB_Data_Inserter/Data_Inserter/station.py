class Station:
    id = None
    region = None
    stationType = None
    locationName = None
    longitude = None
    latitude = None
    height = None

    def __init__(
        self,
        id=None,
        region=None,
        stationType=None,
        locationName=None,
        longitude=None,
        latitude=None,
        height=None,
    ):
        """Constructor of the Station class.

            Arguments:
                id -- ID of the station
                region -- name of region
                stationType -- name of station type
                locationName -- name of location where station is located
                longitude -- longitude of station
                latitude -- latitude of station
                height -- altitude of the station
            Returns None
        """
        self.id = id
        self.region = region
        self.stationType = 0
        self.locationName = locationName
        self.longitude = longitude
        self.latitude = latitude
        self.height = height
        self.updateType(stationType)

    def updateType(self, type: str):
        """Method for updating station's type.

            Arguments:
                type -- type of station
            Returns None
        """
        if type == 'T-AVG':
            self.stationType += 1
        elif type == 'TMI':
            self.stationType += 1 << 1
        elif type == 'TMA':
            self.stationType += 1 << 2
        elif type == 'SRA':
            self.stationType += 1 << 3
        elif type == 'H-AVG':
            self.stationType += 1 << 4
        elif type == 'SNO':
            self.stationType += 1 << 5
        elif type == 'SCE':
            self.stationType += 1 << 6
        elif type == 'SSV':
            self.stationType += 1 << 7
        elif type == 'P-AVG':
            self.stationType += 1 << 8
        elif type == 'F-AVG':
            self.stationType += 1 << 9
        elif type == 'Fmax':
            self.stationType += 1 << 10
        elif type == 'W-AVG':
            self.stationType += 1 << 11

    def toCSV(self):
        """Function for getting formated data as csv line.

            Arguments:
                None
            Returns str
        """
        return (str(self.id) + ';' + 
                str(self.region) + ';' +
                str(self.stationType) + ';' +
                str(self.locationName) + ';' +
                str(self.longitude).replace(',', '.') + ';' +
                str(self.latitude).replace(',', '.') + ';' +
                str(self.height).replace(',', '.') + '\n')
