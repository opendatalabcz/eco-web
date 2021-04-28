import os
import re
import random
import zipfile
import requests
import pandas as pd


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


def readInputData(dataType: str, debug: bool, silent: bool):
    """Function to read station file for given data type.

        Arguments:
            dataType -- specify for which data type stations will be readed
            debug -- sets flag to output debug notification to the console
            silent -- sets flag to output nothing to the console
        Returns Pandas DataFrame or None if file doesn't exists
    """
    # Validate requested dataType
    if dataType not in dataTypes:
        return None
    selectedType = re.sub(r'-', '_', dataTypes[dataType])
    if debug:
        print('DEBUG: Reading ' + selectedType + '_Stations.csv.')
    # Read Stations.csv if exists and return none if doesn't exists
    if not os.path.exists(os.path.join('.', 'InputData', selectedType + '_Stations.csv')):
        if not silent:
            print('WARNING! Skipping ' + dataType + ', because ' + selectedType + '_Stations.csv in input data is missing.')
        return None
    return pd.read_csv(os.path.join('.', 'InputData', selectedType + '_Stations.csv'), 
        dtype={'id': 'int', 'region': 'str', 'station_name': 'str', 'normalized_name': 'str', 'file_name': 'str'})


def generateDelay() -> int:
    """Function to generate delay based in MIN and MAX constants.

        Arguments:
        Returns delay in seconds
    """
    return random.randint(MIN_DELAY, MAX_DELAY)


def downloadFromURL(url: str, path: str, chunkSize: int = 128):
    """Function to download file from given URL and stores it on given location.

        Arguments:
            url -- URL from which data should be downloaded
            path -- location where downloaded  file should be stored
            chunkSize -- specify how big parts of file will be durring downloading, 128 is default
        Returns None

        If the specified URL is not available, an exception is thrown.
    """
    try:
        r = requests.get(url, stream=True)
        with open(path, mode='wb') as file:
            for chunk in r.iter_content(chunk_size=chunkSize):
                file.write(chunk)
    except:
        raise Exception('Given URL is unavailable.')


def processMeteoDataFromZIPFile(zipPath: str, destinationPath: str):
    """Method to process downloaded meteo file to the standardized output.

        Arguments:
            zipPath -- path to downloaded zip file
            destinationPath -- path where the output should be stored
        Returns none

        If downloaded file is not a zip file, an exception is thrown
    """
    # Check if file exists
    if not os.path.exists(zipPath):
        return None
    try:
        # Opens zipfile, extracts file as tmp file
        zipFile = zipfile.ZipFile(zipPath, 'r')
        # Check if the zipfile contains right count of files - if not, propably not the file we want
        if len(zipFile.namelist()) != 1:
            return None
        f = open(os.path.join(destinationPath, 'tmp.csv'), 'w+b')
        for fileName in zipFile.namelist():
            with zipFile.open(fileName) as dataFile:
                for line in dataFile:
                    f.write(line)
        f.close()
        # Creates 2 final files - stations and data files
        tmpFile = open(os.path.join(destinationPath, 'tmp.csv'), 'r')
        dataFile = open(os.path.join(destinationPath, 'data.csv'), 'w')
        stationFile = open(os.path.join(destinationPath, 'station.csv'), 'w')
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
        os.remove(os.path.join(destinationPath, 'tmp.csv'))
    except:
        tmp = os.path.split(zipPath)
        newName = os.path.join(tmp[0], tmp[1].split('.')[0] + '.html')
        os.rename(zipPath, newName)
        raise Exception('File is not available. Recived Error 404.')


def processHydroDataFromZIPFile(zipPath: str, destinationPath: str):
    """Method to process downloaded hydro file to the standardized output.

        Arguments:
            zipPath -- path to downloaded zip file
            destinationPath -- path where the output should be stored
        Returns none

        If downloaded file is not a zip file, an exception is thrown
    """
    # Check if file exists
    if not os.path.exists(zipPath):
        return None
    try:
        # Opening zip file for reading
        zipFile = zipfile.ZipFile(zipPath, 'r')
        # Check if the zipfile contains right count of files - if not, propably not the file we want
        if len(zipFile.namelist()) != 3:
            return None
        for fileName in zipFile.namelist():
            # If data file is found, read it line by line in binary and write it to the new data file
            if re.search('Data', fileName):
                f = open(os.path.join(destinationPath, 'data.csv'), 'w+b')
                f.write(str.encode('ID,Typ,Rok,Měsíc,Den,Hodnota\n', encoding='windows-1250'))
                with zipFile.open(fileName) as dataFile:
                    for line in dataFile:
                        f.write(line)
                f.close()
            # If metadata file is found, read it line by line in binary and write it to the new station file
            if re.search('Metadata_CZE', fileName):
                f = open(os.path.join(destinationPath, 'station.csv'), 'w+b')
                with zipFile.open(fileName) as dataFile:
                    for line in dataFile:
                        f.write(line)
                f.close()
    except:
        tmp = os.path.split(zipPath)
        newName = os.path.join(tmp[0], tmp[1].split('.')[0] + '.html')
        os.rename(zipPath, newName)
        raise Exception('File is not available. Recived Error 404.')


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
        if len(stationCode) < 6:
            for i in range (0, 6 - len(stationCode)):
                tmpStationCode = '0' + stationCode
                stationCode = tmpStationCode
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
