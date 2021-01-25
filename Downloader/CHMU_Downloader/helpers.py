import os
import re
import random
import zipfile
import requests


MIN_DELAY = 3
MAX_DELAY = 10

# List of all regions available
regions = [
    'Praha',
    'Jihocesky',
    'Jihomoravsky',
    'Karlovarsky',
    'Vysocina',
    'Kralovehradecky',
    'Liberecky',
    'Moravskoslezsky',
    'Olomoucky',
    'Pardubicky',
    'Plzensky',
    'Stredocesky',
    'Ustecky',
    'Zlinsky',
]

# List of all datatypes available
dataTypes = {
    'Average_temperature': 'T-AVG',
    'Minimal_temperature': 'TMI',
    'Maximal_temperature': 'TMA',
    'Daily_total_precipitation': 'SRA',
    'Average_daily_relative_humidity': 'H-AVG',
    'Height_of_newly_fallen_snow': 'SNO',
    'The_total_height_of_the_snow_cover': 'SCE',
    'Dailytotal_duration_of_sunshine': 'SSV',
    'Average_pressure': 'P-AVG',
    'Average_daily_wind_speed': 'F-AVG',
    'Maximum_wind_speed': 'Fmax',
    'Average_daily_water_flow': 'W-AVG',
}


def generateDelay() -> int:
    """Function to generate delay based in MIN and MAX constants.

        Arguments:
        Returns delay in seconds
        """
    return random.randint(MIN_DELAY, MAX_DELAY)


def downloadFromURL(url: str, path: str, chunkSize: int = 128):
    """Function to start scraping given URL.

        Arguments:
            self -- instance of the class
        Yields parsed requests
        """
    r = requests.get(url, stream=True)
    with open(path, mode='wb') as file:
        for chunk in r.iter_content(chunk_size=chunkSize):
            file.write(chunk)


def processMeteoDataFromZIPFile(zipPath: str, destinationPath: str):
    """Method to process downloaded meteo file to the standardized output.

        Arguments:
            zipPath -- path to downloaded zip file
            destinationPath -- path where the output should be stored
        Returns none
        """
    # Check if file exists
    if not os.path.exists(zipPath):
        return None
    # Opens zipfile, extracts file as tmp file
    zipFile = zipfile.ZipFile(zipPath, 'r')
    # Check if the zipfile contains right count of files - if not, propably not the file we want
    if len(zipFile.namelist()) != 1:
        return None
    f = open(destinationPath + '\\tmp.csv', 'w+b')
    for fileName in zipFile.namelist():
        with zipFile.open(fileName) as dataFile:
            for line in dataFile:
                f.write(line)
    f.close()
    # Creates 2 final files - stations and data files
    tmpFile = open(destinationPath + '\\tmp.csv', 'r')
    dataFile = open(destinationPath + '\\data.csv', 'w')
    stationFile = open(destinationPath + '\\station.csv', 'w')
    # Reads tmp file line by line and splits content of it into 2 files
    line = tmpFile.readline()
    while line != 'DATA\n':
        stationFile.write(line)
        line = tmpFile.readline()
    while True:
        line = tmpFile.readline()
        if not line:
            break
        dataFile.write(line)
    # Clean up
    tmpFile.close()
    dataFile.close()
    stationFile.close()
    os.remove(destinationPath + '\\tmp.csv')


def processHydroDataFromZIPFile(zipPath: str, destinationPath: str):
    """Method to process downloaded hydro file to the standardized output.

        Arguments:
            zipPath -- path to downloaded zip file
            destinationPath -- path where the output should be stored
        Returns none
        """
    # Check if file exists
    if not os.path.exists(zipPath):
        return None
    # Opening zip file for reading
    zipFile = zipfile.ZipFile(zipPath, 'r')
    # Check if the zipfile contains right count of files - if not, propably not the file we want
    if len(zipFile.namelist()) != 3:
        return None
    for fileName in zipFile.namelist():
        # If data file is found, read it line by line in binary and write it to the new data file
        if re.search('Data', fileName):
            f = open(destinationPath + '\\data.csv', 'w+b')
            f.write(str.encode('ID;Typ;Rok;Měsíc;Den;Hodnota\n', encoding='windows-1250'))
            with zipFile.open(fileName) as dataFile:
                for line in dataFile:
                    f.write(line)
            f.close()
        # If metadata file is found, read it line by line in binary and write it to the new station file
        if re.search('Metadata_CZE', fileName):
            f = open(destinationPath + '\\station.csv', 'w+b')
            with zipFile.open(fileName) as dataFile:
                for line in dataFile:
                    f.write(line)
            f.close()


def generateFileName(stationCode: str, dataType: str) -> str:
    """Function to generate filename for desired datafile.

        Arguments:
            stationCode -- code of the station, from which data will be downloaded
            dataType -- specify data type to generate right name for
        Returns filename of desired file
        """
    # Datatype validation
    if dataType not in dataTypes and dataType not in dataTypes.values():
        return None
    # Create filename for Average daily water flow
    if dataType == dataTypes['Average_daily_water_flow']:
        return 'QD_' + stationCode + '.zip'
    # Remove -AVG from datatypes since filename does not contains it
    if re.search(r'-AVG', dataType):
        dataType = re.sub(r'-AVG', '', dataType)
    # Return filename for rest of the data types
    return stationCode + '_' + dataType + '_N.csv.zip'


def generateURL(region: str, dataType: str, fileName: str) -> str:
    """Function to generate URL from which desired file will be downloaded.

        Arguments:
            region -- specify region from which station comes
            dataType -- specify for which data type URL will be generated
            filename -- filename of desired file
        Returns URL
        """
    # Region validation
    if region not in regions:
        return None
    # Datatype validation
    if dataType not in dataTypes and dataType not in dataTypes.values():
        return None
    # Modifying datatype to reflect data types in urls
    if re.search(r'^TM', dataType):
        dataType += '-21.00'
    if re.search(r'^S.[AEO]', dataType):
        dataType += '-07.00'
    if dataType == dataTypes['Dailytotal_duration_of_sunshine'] or dataType == dataTypes['Maximum_wind_speed']:
        dataType += '-00.00'
    url = 'https://www.chmi.cz/files/portal/docs/'
    # If data type is Average daily water flow, return url for it. If not, return url for meteo data
    if dataType == dataTypes['Average_daily_water_flow']:
        return url + 'hydro/denni_data/QD/' + region + '/' + fileName
    else:
        return url + 'meteo/ok/denni_data/' + dataType + "/" + region + "/" + fileName
