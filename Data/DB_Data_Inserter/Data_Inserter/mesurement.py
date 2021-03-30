class Mesurement:
    station_id = None
    hydrometeo_type = None
    date = None
    value = None
    min_value = None 
    max_value = None 
    avg_value = None
    azimuth = None 
    time = None
    symptom = None
    total_value = None 
    total_symptom = None

    def __init__(
        self,
        station_id=None,
        hydrometeo_type=None,
        date=None,
        value=None,
        min_value=None,
        max_value=None,
        avg_value=None,
        azimuth=None,
        time=None,
        symptom=None,
        total_value=None, 
        total_symptom=None,
    ):
        self.station_id = station_id
        self.hydrometeo_type = hydrometeo_type
        self.date = date
        self.value = value
        self.min_value = min_value 
        self.max_value = max_value 
        self.avg_value = avg_value
        self.azimuth = azimuth 
        self.time = time
        self.symptom = symptom
        self.total_value = total_value 
        self.total_symptom = total_symptom

    def toCSV(self):
        return (
            str(self.station_id) + ';' + 
            str(self.hydrometeo_type) + ';' + 
            str(self.date) + ';' + 
            str(self.value) + ';' + 
            str(self.min_value)  + ';' + 
            str(self.max_value)  + ';' + 
            str(self.avg_value) + ';' + 
            str(self.azimuth)  + ';' + 
            str(self.time) + ';' + 
            str(self.symptom) + ';' + 
            str(self.total_value)  + ';' + 
            str(self.total_symptom) + '\n'
        )
        