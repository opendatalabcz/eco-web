class Station:
    id = None
    regionID = None
    stationType = None
    locationName = None
    longitude = None
    latitude = None
    height = None

    def __init__(
        self,
        id,
        regionID,
        stationType,
        locationName,
        longitude,
        latitude,
        height,
    ):
        self.id = id
        self.regionID = regionID
        self.stationType = 0
        self.locationName = locationName
        self.longitude = longitude
        self.latitude = latitude
        self.height = height
        self.updateType(stationType)

    def updateType(self, type: str):
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

    def toCSV (self):
        return (str(self.id) + ';' + str(self.regionID) + ';' + str(self.stationType) 
            + ';' + str(self.locationName) + ';' + str(self.longitude) 
            + ';' + str(self.latitude) + ';' + str(self.height) + '\n')
