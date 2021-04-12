import os
import utm
import shutil
import unidecode
import pandas as pd
import datetime as dt
from station import Station

regions = [
    ('Praha', 'PHA', 'Czech Republic', 'CZ'),
    ('Jihočeský', 'JHČ', 'Czech Republic', 'CZ'),
    ('Jihomoravský', 'JHM', 'Czech Republic', 'CZ'),
    ('Karlovarský', 'KVK', 'Czech Republic', 'CZ'),
    ('Vysočina', 'VYS', 'Czech Republic', 'CZ'),
    ('Královehradecký', 'HKK', 'Czech Republic', 'CZ'),
    ('Liberecký', 'LBK', 'Czech Republic', 'CZ'),
    ('Moravskoslezský', 'MSK', 'Czech Republic', 'CZ'),
    ('Olomoucký', 'OLK', 'Czech Republic', 'CZ'),
    ('Pardubický', 'PAK', 'Czech Republic', 'CZ'),
    ('Plzeňský', 'PLK', 'Czech Republic', 'CZ'),
    ('Středočeský', 'STČ', 'Czech Republic', 'CZ'),
    ('Ústecký', 'ULK', 'Czech Republic', 'CZ'),
    ('Zlínský', 'ZLK', 'Czech Republic', 'CZ')
]

hydrometeo_types = [
    ('Temperature', '°C'),
    ('Water', 'm3/s'),
    ('Pressure', 'hPa'),
    ('Wind', 'm/s'),
    ('Precipitation', '%, mm'),
    ('Shine', 'hour'),
    ('Snow', 'cm')
]

dataTypes = [
    'T-AVG',
    'TMI',
    'TMA',
    'SRA',
    'H-AVG',
    'SNO',
    'SCE',
    'SSV',
    'P-AVG',
    'F-AVG',
    'Fmax',
    'W-AVG',
]

regionList = [
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


def checkStructure(path: str, debug: bool):
    """Function to check if given path contains required structure.

        Arguments:
            path -- path to the directory structure with data
            debug -- flag to enable debug messages
        Returns bool
    """
    if debug:
        print('DEBUG: Starting to check given structure.')
    # Checking if root dir contains less or equal files as data types count
    if len(os.listdir(path)) > len(dataTypes):
        if debug:
            print('DEBUG: The contents of this directory are not as expected.')
        return False
    # Checking if dir's names are valid
    for type in os.listdir(path):
        if debug:
            print('DEBUG: Checking content of ' + type + ' directory.')
        # Return false if type is not contained in data types
        if type not in dataTypes:
            if debug:
                print('DEBUG: The contents of this directory are not as expected.')
            return False
        # Checking if type directory contains less or equal files as regions count
        if len(os.listdir(os.path.join(path, type))) > len(regionList):
            if debug:
                print('DEBUG: The contents of this directory are not as expected.')
            return False
        for region in os.listdir(os.path.join(path, type)):
            if debug:
                print('DEBUG: Checking content of ' + region + ' directory.')
            # Return false if region name is not contained in regions
            if region not in regionList:
                if debug:
                    print('DEBUG: The contents of this directory are not as expected.')
                return False
            # Checking if all stations contains 1 or 3 files
            for station in os.listdir(os.path.join(path, type, region)):
                if debug:
                    print('DEBUG: Checking content of ' +
                          station + ' directory.')
                length = len(os.listdir(
                    os.path.join(path, type, region, station)))
                if length != 1 and length != 3:
                    if debug:
                        print(
                            'DEBUG: The contents of this directory are not as expected.')
                    return False
    return True


def parseNonWaterStation(path: str):
    """Function to parse nonwater type stations metadata.

        Arguments:
            path -- path to the file which has to be parsed
        Returns list(str) of parsed data (location_name, logitude, latitude, height)
    """
    # Open file for reading
    file = open(path, 'r')
    # Read lines of file until desired data is found
    line = file.readline()
    while line != 'METADATA\n':
        line = file.readline()
    tmp = file.readline()
    while tmp != '\n':
        line = tmp
        tmp = file.readline()
    # Split founded data, because one line contains all data
    splitLine = line[:-1].split(';')
    file.close()
    # Return desired and selected data - location name, longitude, latitude and height
    return [splitLine[1], splitLine[4], splitLine[5], splitLine[6]]


def parseWaterStation(path: str):
    """Function to parse water type stations metadata.

        Arguments:
            path -- path to the file which has to be parsed
        Returns list(str) of parsed data (location_name, logitude, latitude, height)
    """
    # Open file for reading
    file = open(path, 'r')
    # Read lines of file until desired data is found
    line = file.readline()
    while line != '\n':
        line = file.readline()
    line = file.readline()
    # Split founded data, because one line contains all data
    splitLine = line.split(',')
    file.close()
    # If file doesn't contains coordinates, return with NULL, because there is no reason to process them
    if splitLine[6] == '' or splitLine[7] == '':
        return [splitLine[1], 'NULL', 'NULL', 'NULL']
    # Convert coordinates to longitude and latitude, because water station uses UTM coordinate standard
    latLong = utm.to_latlon(float(splitLine[6]), float(splitLine[7]), 33, 'N')
    # Return desired and selected data - location name, longitude, latitude and height
    return [splitLine[1], latLong[1], latLong[0], 'NULL']


def createStationsStructure(sourcePath: str, debug: bool):
    """Function to check if given path contains required structure.

        Arguments:
            sourcePath -- path to the directory with data
            debug -- flag to enable debug messages
        Returns dict(str, Station) which contains all stations metedata. Station id is key and Station class is value.
    """
    if debug:
        print('DEBUG: Creating structure for stations data.')
    structure = dict()
    # Traverse through dir structure to get all desired station data
    for category in os.listdir(sourcePath):
        if debug:
            print('\nDEBUG: Reading stations data from ' +
                  category + ' category.')
        for region in os.listdir(os.path.join(sourcePath, category)):
            if debug:
                print('\nDEBUG: Reading stations data from ' + region + ' region.')
            for stationID in os.listdir(os.path.join(sourcePath, category, region)):
                if debug:
                    print('DEBUG: Reading stations data for ' +
                          stationID + ' station.')
                # Checking if dir contains data
                if len(os.listdir(os.path.join(sourcePath, category, region, stationID))) == 3:
                    # Check if station was already met, if yes, update category of station,
                    # else parse station.csv and insert new station to the structure
                    if stationID not in structure:
                        path = os.path.join(
                            sourcePath, category, region, stationID, 'station.csv')
                        data = None
                        # Check what type of data it is. If W-AVG, call function for it, else use general station.csv parser
                        if category == dataTypes[-1]:
                            data = parseWaterStation(path)
                        else:
                            data = parseNonWaterStation(path)
                        structure[str(stationID)] = Station(
                            stationID, region, category, data[0], data[1], data[2], data[3])
                    else:
                        structure[str(stationID)].updateType(category)
    return structure


def writeStationsStructure(path: str, structure: dict, debug: bool):
    """Method to write all stations metadata to the file in given path.

        Arguments:
            path -- path to the directory where the station metedata will be written
            structure -- dictionary with structure containing all stations metedata
            debug -- flag to enable debug messages
        Returns None
    """
    # Create station directory
    dest = os.path.join(path, 'Stations')
    if debug:
        print('\nDEBUG: Creating stations directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Writing stations data to the stations.csv file.')
    # Create new file and write data
    file = open(os.path.join(dest, 'stations.csv'),
                'w', encoding='windows-1250')
    file.write(
        'id;region_id;station_type;location_name;longitude;latitude;height\n')
    for station in structure.values():
        file.write(station.toCSV())
    file.close()
    if debug:
        print('DEBUG: Writing stations data Finished.')


def createTemperatureStructure(sourcePath: str, targetPath: str, debug: bool):
    """Method for combining temperature data and then writing them to a file.

        Arguments:
            sourcePath -- path to the directory where are the data
            targetPath -- path to the directory where combined data will be stored
            debug -- flag to enable debug messages
        Returns None
    """
    # Setting path to new dir and creating it
    dest = os.path.join(targetPath, 'Temperature')
    if debug:
        print('\nDEBUG: Creating Temperature directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Starting to process temperature data.')
    # Processing files for each region
    for region in regionList:
        if debug:
            print('\nDEBUG: Processing ' + region + ' region.')
        # Listing all content for needed measurement types
        avgStations = os.listdir(os.path.join(
            sourcePath, dataTypes[0], region))
        minStations = os.listdir(os.path.join(
            sourcePath, dataTypes[1], region))
        maxStations = os.listdir(os.path.join(
            sourcePath, dataTypes[2], region))
        # Creating set of uniqes stations
        stations = set().union(avgStations, minStations, maxStations)
        # For each station load desired data, join them and store in new file
        for station in stations:
            if debug:
                print('DEBUG: Processing ' + station + ' station.')
            # Creting new empty dataframes with desired columns
            avgDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Průměrná_Hodnota'])
            minDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Minimální_Hodnota'])
            maxDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Maximální_Hodnota'])
            # Creating paths for source data
            avgPath = os.path.join(
                sourcePath, dataTypes[0], region, station, 'data.csv')
            minPath = os.path.join(
                sourcePath, dataTypes[1], region, station, 'data.csv')
            maxPath = os.path.join(
                sourcePath, dataTypes[2], region, station, 'data.csv')
            # Skipping if all data.csv does not exist
            if not os.path.exists(avgPath) and not os.path.exists(maxPath) and not os.path.exists(minPath):
                if debug:
                    print('DEBUG: Skipping ' + station +
                          ' station. No data found.')
                continue
            # Check if file exists, if yes, read it
            if os.path.exists(avgPath):
                avgDF = pd.read_csv(
                    avgPath, encoding='windows-1250', sep=';', decimal=',').drop(['Příznak'], axis=1)
                avgDF = avgDF[avgDF['Hodnota'].notna()].rename(
                    columns={'Hodnota': 'Průměrná_Hodnota'})
            if os.path.exists(minPath):
                minDF = pd.read_csv(
                    minPath, encoding='windows-1250', sep=';', decimal=',').drop(['Příznak'], axis=1)
                minDF = minDF[minDF['Hodnota'].notna()].rename(
                    columns={'Hodnota': 'Minimální_Hodnota'})
            if os.path.exists(maxPath):
                maxDF = pd.read_csv(
                    maxPath, encoding='windows-1250', sep=';', decimal=',').drop(['Příznak'], axis=1)
                maxDF = maxDF[maxDF['Hodnota'].notna()].rename(
                    columns={'Hodnota': 'Maximální_Hodnota'})
            # Merge data from 3 files to single file
            finalDF = pd.merge(pd.merge(avgDF, minDF, on=[
                               'Rok', 'Měsíc', 'Den'], how='outer'), maxDF, on=['Rok', 'Měsíc', 'Den'], how='outer')
            finalDF.to_csv(os.path.join(dest, station + '.csv'),
                           sep=';', index=False, encoding='windows-1250')
    if debug:
        print('DEBUG: All temperature data are processed.')


def createWaterStructure(sourcePath: str, targetPath: str, debug: bool):
    """Method for combining hydrological data and then writing them to a file.

        Arguments:
            sourcePath -- path to the directory where are the data
            targetPath -- path to the directory where combined data will be stored
            debug -- flag to enable debug messages
        Returns None
    """
    # Setting path to new dir and creating it
    dest = os.path.join(targetPath, 'Water')
    if debug:
        print('\nDEBUG: Creating Water directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Starting to process water data.')
    # Processing files for each region
    for region in regionList:
        if debug:
            print('\nDEBUG: Processing ' + region + ' region.')
        # Listing all content for needed measurement types
        stations = os.listdir(os.path.join(sourcePath, dataTypes[-1], region))
        # For each station load desired data, join them and store in new file
        for station in stations:
            if debug:
                print('DEBUG: Processing ' + station + ' station.')
            # Create path to the data, read them, update them and write them to the new file
            path = os.path.join(
                sourcePath, dataTypes[-1], region, station, 'data.csv')
            if not os.path.exists(path):
                if debug:
                    print('DEBUG: Skipping ' + station +
                          ' station, because data.csv file missing.')
                continue
            df = pd.read_csv(path, encoding='windows-1250',
                             sep=',', decimal='.').drop(['ID', 'Typ'], axis=1)
            df = df[df['Hodnota'].notna()]
            df.to_csv(os.path.join(dest, station + '.csv'),
                      sep=';', index=False, encoding='windows-1250')
    if debug:
        print('DEBUG: All temperature data are processed.')


def createPressureStructure(sourcePath: str, targetPath: str, debug: bool):
    """Method for combining pressure data and then writing them to a file.

        Arguments:
            sourcePath -- path to the directory where are the data
            targetPath -- path to the directory where combined data will be stored
            debug -- flag to enable debug messages
        Returns None
    """
    # Setting path to new dir and creating it
    dest = os.path.join(targetPath, 'Pressure')
    if debug:
        print('\nDEBUG: Creating Pressure directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Starting to process pressure data.')
    # Processing files for each region
    for region in regionList:
        if debug:
            print('\nDEBUG: Processing ' + region + ' region.')
        # Listing all content for needed measurement types
        stations = os.listdir(os.path.join(sourcePath, dataTypes[8], region))
        # For each station load desired data, join them and store in new file
        for station in stations:
            if debug:
                print('DEBUG: Processing ' + station + ' station.')
            # Create path to the data, read them, update them and write them to the new file
            path = os.path.join(
                sourcePath, dataTypes[8], region, station, 'data.csv')
            if not os.path.exists(path):
                if debug:
                    print('DEBUG: Skipping ' + station +
                          ' station, because data.csv file missing.')
                continue
            df = pd.read_csv(path, encoding='windows-1250',
                             sep=';', decimal=',').drop(['Příznak'], axis=1)
            df = df[df['Hodnota'].notna()]
            df.to_csv(os.path.join(dest, station + '.csv'),
                      sep=';', index=False, encoding='windows-1250')
    if debug:
        print('DEBUG: All pressure data are processed.')


def createWindStructure(sourcePath: str, targetPath: str, debug: bool):
    """Method for combining wind data and then writing them to a file.

        Arguments:
            sourcePath -- path to the directory where are the data
            targetPath -- path to the directory where combined data will be stored
            debug -- flag to enable debug messages
        Returns None
    """
    # Setting path to new dir and creating it
    dest = os.path.join(targetPath, 'Wind')
    if debug:
        print('\nDEBUG: Creating Wind directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Starting to process wind data.')
    # Processing files for each region
    for region in regionList:
        if debug:
            print('\nDEBUG: Processing ' + region + ' region.')
        # Listing all content for needed measurement types
        avgStations = os.listdir(os.path.join(
            sourcePath, dataTypes[-3], region))
        maxStations = os.listdir(os.path.join(
            sourcePath, dataTypes[-2], region))
        # Creating set of uniqes stations
        stations = set().union(avgStations, maxStations)
        # For each station load desired data, join them and store in new file
        for station in stations:
            if debug:
                print('DEBUG: Processing ' + station + ' station.')
            # Creting new empty dataframes with desired columns
            avgDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Průměrná_Hodnota'])
            maxDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Maximální_Hodnota', 'Směr', 'Čas'])
            # Creating paths for source data
            avgPath = os.path.join(
                sourcePath, dataTypes[-3], region, station, 'data.csv')
            maxPath = os.path.join(
                sourcePath, dataTypes[-2], region, station, 'data.csv')
            # Skipping if all data.csv does not exist
            if not os.path.exists(avgPath) and not os.path.exists(maxPath):
                if debug:
                    print('DEBUG: Skipping ' + station +
                          ' station. No data found.')
                continue
            # Check if file exists, if yes, read it
            if os.path.exists(avgPath):
                avgDF = pd.read_csv(
                    avgPath, encoding='windows-1250', sep=';', decimal=',').drop(['Příznak'], axis=1)
                avgDF = avgDF[avgDF['Hodnota'].notna()].rename(
                    columns={'Hodnota': 'Průměrná_Hodnota'})
            if os.path.exists(maxPath):
                maxDF = pd.read_csv(
                    maxPath, encoding='windows-1250', sep=';', decimal=',')
                maxDF = maxDF[maxDF['Fmax'].notna()].rename(
                    columns={'Fmax': 'Maximální_Hodnota', 'Dmax': 'Směr', 'Casmax': 'Čas'})
            # Merge data from 3 files to single file
            finalDF = pd.merge(avgDF, maxDF, on=[
                               'Rok', 'Měsíc', 'Den'], how='outer')
            finalDF.to_csv(os.path.join(dest, station + '.csv'),
                           sep=';', index=False, encoding='windows-1250')
    if debug:
        print('DEBUG: All wind data are processed.')


def createPrecipitationStructure(sourcePath: str, targetPath: str, debug: bool):
    """Method for combining precipitation data and then writing them to a file.

        Arguments:
            sourcePath -- path to the directory where are the data
            targetPath -- path to the directory where combined data will be stored
            debug -- flag to enable debug messages
        Returns None
    """
    # Setting path to new dir and creating it
    dest = os.path.join(targetPath, 'Precipitation')
    if debug:
        print('\nDEBUG: Creating Precipitation directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Starting to process precipitation data.')
    # Processing files for each region
    for region in regionList:
        if debug:
            print('\nDEBUG: Processing ' + region + ' region.')
        # Listing all content for needed measurement types
        avgHumidityStations = os.listdir(
            os.path.join(sourcePath, dataTypes[4], region))
        precipitationStations = os.listdir(
            os.path.join(sourcePath, dataTypes[3], region))
        # Creating set of uniqes stations
        stations = set().union(avgHumidityStations, precipitationStations)
        # For each station load desired data, join them and store in new file
        for station in stations:
            if debug:
                print('DEBUG: Processing ' + station + ' station.')
            # Creting new empty dataframes with desired columns
            humidityDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Průměrná_Hodnota'])
            precipitationDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Celková_Hodnota', 'Příznak_Celkové_Hodnoty'])
            # Creating paths for source data
            humidityPath = os.path.join(
                sourcePath, dataTypes[4], region, station, 'data.csv')
            precipitationPath = os.path.join(
                sourcePath, dataTypes[3], region, station, 'data.csv')
            # Skipping if all data.csv does not exist
            if not os.path.exists(humidityPath) and not os.path.exists(precipitationPath):
                if debug:
                    print('DEBUG: Skipping ' + station +
                          ' station. No data found.')
                continue
            # Check if file exists, if yes, read it
            if os.path.exists(humidityPath):
                humidityDF = pd.read_csv(
                    humidityPath, encoding='windows-1250', sep=';', decimal=',').drop(['Příznak'], axis=1)
                humidityDF = humidityDF[humidityDF['Hodnota'].notna()].rename(
                    columns={'Hodnota': 'Průměrná_Hodnota'})
            if os.path.exists(precipitationPath):
                precipitationDF = pd.read_csv(
                    precipitationPath, encoding='windows-1250', sep=';', decimal=',')
                precipitationDF = precipitationDF[precipitationDF['Hodnota'].notna()].rename(
                    columns={'Hodnota': 'Celková_Hodnota', 'Příznak': 'Příznak_Celkové_Hodnoty'})
                precipitationDF['Příznak_Celkové_Hodnoty'] = precipitationDF['Příznak_Celkové_Hodnoty'].map(
                    {'M': 'M-Total extra from the manual rain gauge', 'T': 'T-Unmeasurable amount'})
            # Merge data from 3 files to single file
            finalDF = pd.merge(precipitationDF, humidityDF, on=[
                               'Rok', 'Měsíc', 'Den'], how='outer')
            finalDF.to_csv(os.path.join(dest, station + '.csv'),
                           sep=';', index=False, encoding='windows-1250')
    if debug:
        print('DEBUG: All precipitation data are processed.')


def createShineStructure(sourcePath: str, targetPath: str, debug: bool):
    """Method for combining shine data and then writing them to a file.

        Arguments:
            sourcePath -- path to the directory where are the data
            targetPath -- path to the directory where combined data will be stored
            debug -- flag to enable debug messages
        Returns None
    """
    # Setting path to new dir and creating it
    dest = os.path.join(targetPath, 'Shine')
    if debug:
        print('\nDEBUG: Creating Shine directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Starting to process shine data.')
    # Processing files for each region
    for region in regionList:
        if debug:
            print('\nDEBUG: Processing ' + region + ' region.')
        # Listing all content for needed measurement types
        stations = os.listdir(os.path.join(sourcePath, dataTypes[7], region))
        # For each station load desired data, join them and store in new file
        for station in stations:
            if debug:
                print('DEBUG: Processing ' + station + ' station.')
            # Create path to the data, read them, update them and write them to the new file
            path = os.path.join(
                sourcePath, dataTypes[7], region, station, 'data.csv')
            if not os.path.exists(path):
                if debug:
                    print('DEBUG: Skipping ' + station +
                          ' station, because data.csv file missing.')
                continue
            df = pd.read_csv(path, encoding='windows-1250',
                             sep=';', decimal=',').drop(['Příznak'], axis=1)
            df = df[df['Hodnota'].notna()]
            df.to_csv(os.path.join(dest, station + '.csv'),
                      sep=';', index=False, encoding='windows-1250')
    if debug:
        print('DEBUG: All shine data are processed.')


def createSnowStructure(sourcePath: str, targetPath: str, debug: bool):
    """Method for combining snow data and then writing them to a file.

        Arguments:
            sourcePath -- path to the directory where are the data
            targetPath -- path to the directory where combined data will be stored
            debug -- flag to enable debug messages
        Returns None
    """
    # Setting path to new dir and creating it
    dest = os.path.join(targetPath, 'Snow')
    if debug:
        print('\nDEBUG: Creating Snow directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Starting to process snow data.')
    # Processing files for each region
    for region in regionList:
        if debug:
            print('\nDEBUG: Processing ' + region + ' region.')
        # Listing all content for needed measurement types
        newSnowStations = os.listdir(
            os.path.join(sourcePath, dataTypes[5], region))
        totalStations = os.listdir(os.path.join(
            sourcePath, dataTypes[6], region))
        # Creating set of uniqes stations
        stations = set().union(newSnowStations, totalStations)
        # For each station load desired data, join them and store in new file
        for station in stations:
            if debug:
                print('DEBUG: Processing ' + station + ' station.')
            # Creting new empty dataframes with desired columns
            newSnowDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Hodnota_Nového_Sněhu', 'Příznak_Nového_Sněhu'])
            totalDF = pd.DataFrame(
                columns=['Rok', 'Měsíc', 'Den', 'Celková_Hodnota', 'Příznak_Celkové_Hodnoty'])
            # Creating paths for source data
            newSnowPath = os.path.join(
                sourcePath, dataTypes[5], region, station, 'data.csv')
            totalPath = os.path.join(
                sourcePath, dataTypes[6], region, station, 'data.csv')
            # Skipping if all data.csv does not exist
            if not os.path.exists(newSnowPath) and not os.path.exists(totalPath):
                if debug:
                    print('DEBUG: Skipping ' + station +
                          ' station. No data found.')
                continue
            # Check if file exists, if yes, read it
            if os.path.exists(newSnowPath):
                newSnowDF = pd.read_csv(
                    newSnowPath, encoding='windows-1250', sep=';', decimal=',')
                newSnowDF = newSnowDF[newSnowDF['Hodnota'].notna()].rename(
                    columns={'Hodnota': 'Hodnota_Nového_Sněhu', 'Příznak': 'Příznak_Nového_Sněhu'})
                newSnowDF['Příznak_Nového_Sněhu'] = newSnowDF['Příznak_Nového_Sněhu'].map({
                    'A': 'A-Influenced by artificial snow',
                    'N': 'N-Discontinuous snow cover',
                    'P': 'P-Sprinkling of snow',
                    'R': 'R-Fell and melted',
                })
            if os.path.exists(totalPath):
                totalDF = pd.read_csv(
                    totalPath, encoding='windows-1250', sep=';', decimal=',')
                totalDF = totalDF[totalDF['Hodnota'].notna()].rename(
                    columns={'Hodnota': 'Celková_Hodnota', 'Příznak': 'Příznak_Celkové_Hodnoty'})
                totalDF['Příznak_Celkové_Hodnoty'] = totalDF['Příznak_Celkové_Hodnoty'].map({
                    'A': 'A-Influenced by artificial snow',
                    'N': 'N-Discontinuous snow cover',
                    'P': 'P-Sprinkling of snow',
                    'R': 'R-Fell and melted',
                    'U': 'U-Measurement is not possible'
                })
            # Merge data from 3 files to single file
            finalDF = pd.merge(totalDF, newSnowDF, on=[
                               'Rok', 'Měsíc', 'Den'], how='outer')
            finalDF.to_csv(os.path.join(dest, station + '.csv'),
                           sep=';', index=False, encoding='windows-1250')
    if debug:
        print('DEBUG: All snow data are processed.')


def createHelpingStructure(sourcePath: str, debug: bool):
    """Method for creating helping structure which contains stations metadata and combined data.

        Arguments:
            sourcePath -- path to the directory where are the data
            debug -- flag to enable debug messages
        Returns None
    """
    # Get current directory and make path to temporary directory
    dest = os.path.join(os.getcwd(), 'tmp')
    if debug:
        print('DEBUG: Creating tmp directory.')
    # Create temporary structure folder
    os.mkdir(dest)
    # Create and write down stations to csv
    stationStructure = createStationsStructure(sourcePath, debug)
    writeStationsStructure(dest, stationStructure, debug)
    createTemperatureStructure(sourcePath, dest, debug)
    createWaterStructure(sourcePath, dest, debug)
    createPressureStructure(sourcePath, dest, debug)
    createShineStructure(sourcePath, dest, debug)
    createWindStructure(sourcePath, dest, debug)
    createPrecipitationStructure(sourcePath, dest, debug)
    createSnowStructure(sourcePath, dest, debug)


def removeHelpingStructure(debug: bool):
    """Method for removing helping structure which contains stations metadata and combined data.

        Arguments:
            debug -- flag to enable debug messages
        Returns None
    """
    if debug:
        print('DEBUG: Removing tmp directory.')
    shutil.rmtree(os.path.join(os.getcwd(), 'tmp'))


def insertRegions(db, debug: bool):
    """Function for inserting regions to the database.

        Arguments:
            db -- postgress connection for database
            debug -- flag to enable debug messages
        Returns dict(str, int) which contains regions and their IDs in database. Region name is key and ID is value.
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching regions from database.')
    # Checking, if database already contains regions
    cursor.execute('SELECT * FROM region')
    rows = cursor.fetchall()
    # If database doesn't contains regions, insert them
    if len(rows) == 0:
        if debug:
            print(
                'DEBUG: Regions data not found. Starting to insert regions to the database.')
        # Insert regions
        for region in regions:
            if debug:
                print('DEBUG: Inserting ' + region[0] +
                      ' region to the database.')
            cursor.execute(
                'INSERT INTO region (id, name, shortcut, country_name, country_shortcut) VALUES (DEFAULT, %s, %s, %s, %s);', region)
            db.commit()
        if debug:
            print('DEBUG: All regions inserted to the database.')
            print('DEBUG: Fetching regions from database.')
        # Fetch all new regions with their ID, so we can use them in adding stations
        cursor.execute('SELECT * FROM region')
        rows = cursor.fetchall()
    elif debug:
        print('DEBUG: Regions found. Skipping this step.')

    # Creating dictionary with IDs for regions and returns them
    toRet = dict()
    for row in rows:
        toRet[unidecode.unidecode(row[1])] = row[0]
    # Closing transaction
    cursor.close()
    return toRet


def insertHydroMeteoTypes(db, debug: bool):
    """Function for inserting hydrometeo types to the database.

        Arguments:
            db -- postgress connection for database
            debug -- flag to enable debug messages
        Returns dict(str, int) which contains hydrometeo types and their IDs in database. Type name is key and ID is value.
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching hydrometeo data types from database.')
    # Checking, if database already contains hydrometeo types
    cursor.execute('SELECT * FROM hydrometeo_types')
    rows = cursor.fetchall()
    # If database doesn't contains hydrometeo types, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Hydrometeo data types not found. Starting to insert hydrometeo data types to the database.')
        # Insert hydrometeo types
        for type in hydrometeo_types:
            if debug:
                print('DEBUG: Inserting ' + type[0] + ' type to the database.')
            cursor.execute(
                'INSERT INTO hydrometeo_types (id, name, unit) VALUES (DEFAULT, %s, %s);', type)
            db.commit()
        if debug:
            print('DEBUG: All hydrometeo types inserted to the database.')
            print('DEBUG: Fetching hydrometeo data types from database.')
        # Fetch all new hydrometeo types with their ID, so we can use them in adding measurements
        cursor.execute('SELECT * FROM hydrometeo_types')
        rows = cursor.fetchall()
    elif debug:
        print('DEBUG: Hydrometeo data types found. Skipping this step.')

    # Creating dictionary with IDs for hydrometeo types and returns them
    toRet = dict()
    for row in rows:
        toRet[row[1]] = row[0]
    # Closing transaction
    cursor.close()
    return toRet


def insertStations(db, regions: dict, debug: bool):
    """Function for inserting stations to the database.

        Arguments:
            db -- postgress connection for database
            regions -- dictionary with regions and their database IDs
            debug -- flag to enable debug messages
        Returns None
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching station data from database.')
    # Check if database contains staions
    cursor.execute('SELECT * FROM station')
    rows = cursor.fetchall()
    # If database doesn't contains stations, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Station data not found. Starting to read station.csv file.')
        # If not, iterate over station file in temporary structure and insert it to the database
        path = os.path.join(os.getcwd(), 'tmp', 'stations', 'stations.csv')
        stationDF = pd.read_csv(path, encoding='windows-1250', sep=';')
        if debug:
            print('DEBUG: Starting to insert stations.')
        for row in stationDF.itertuples(index=False):
            if debug:
                print('DEBUG: Inserting ' +
                      row[0] + ' station to the database.')
            cursor.execute(
                '''INSERT INTO station (id, region_id, station_type, location_name, longitude, latitude, height)
                    VALUES (%s, %s, %s, %s, %s, %s, %s);''',
                (row[0], regions[row[1]], row[2], row[3], row[4], row[5], row[6]))
            db.commit()
        if debug:
            print('DEBUG: All stations inserted to the database.')
    elif debug:
        print('DEBUG: Station data found. Skipping this step.')

    # Closing transaction
    cursor.close()

def insertTemperature(db, hydrometeoTypes: dict, debug: bool):
    """Function for inserting temperature measurement to the database.

        Arguments:
            db -- postgress connection for database
            hydrometeoTypes -- dictionary with hydrometeo types and their database IDs
            debug -- flag to enable debug messages
        Returns None
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching temperature measurements from database.')
    # Check if database contains temperature measurements
    cursor.execute('SELECT * FROM hydrometeo_measurement WHERE hydrometeo_type = ' + str(hydrometeoTypes['Temperature']))
    rows = cursor.fetchall()
    # If database doesn't contains temperature measurements, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Temperature measurements not found. Starting to read temperature files.')
        # If not, iterate over temperature files in temporary structure and insert them to the database
        path = os.path.join(os.getcwd(), 'tmp', 'Temperature')
        for fileName in os.listdir(path):
            if debug:
                print('DEBUG: Inserting ' + fileName + ' file.')
            # Extract station ID, read station file and insert each row to the database
            stationID = fileName.split('.')[0]
            df = pd.read_csv(os.path.join(path, fileName), encoding='windows-1250', sep=';')
            for row in df.itertuples(index=False):
                # Join values from columns to create sing date - row[0] = year, row[1] = month, row[2] = day
                date = dt.date(row[0], row[1], row[2])
                if debug:
                    print('DEBUG: Inserting temperature measurement for date ' + str(date) + '.')
                cursor.execute(
                    '''INSERT INTO hydrometeo_measurement(
	                    id, station_id, hydrometeo_type, date, value, min_value, max_value, avg_value,
                        azimuth, "time", symptom, total_value, total_symptom, last_updated)
	                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);''',
                    (str(stationID), str(hydrometeoTypes['Temperature']), date, None, row[4], row[5], row[3], None, None, None, None, None, dt.datetime.now()))
                db.commit()
        if debug:
            print('DEBUG: All temperature measurements are inserted to the database.')
    elif debug:
        print('DEBUG: Temperature measurements found. Skipping this step.')

    # Closing transaction
    cursor.close()

def insertWater(db, hydrometeoTypes: dict, debug: bool):
    """Function for inserting water measurement to the database.

        Arguments:
            db -- postgress connection for database
            hydrometeoTypes -- dictionary with hydrometeo types and their database IDs
            debug -- flag to enable debug messages
        Returns None
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching water measurements from database.')
    # Check if database contains water measurements
    cursor.execute('SELECT * FROM hydrometeo_measurement WHERE hydrometeo_type = ' + str(hydrometeoTypes['Water']))
    rows = cursor.fetchall()
    # If database doesn't contains water measurements, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Water measurements not found. Starting to read water files.')
        # If not, iterate over water files in temporary structure and insert them to the database
        path = os.path.join(os.getcwd(), 'tmp', 'Water')
        for fileName in os.listdir(path):
            if debug:
                print('DEBUG: Inserting ' + fileName + ' file.')
            # Extract station ID, read station file and insert each row to the database
            stationID = fileName.split('.')[0]
            df = pd.read_csv(os.path.join(path, fileName), encoding='windows-1250', sep=';')
            for row in df.itertuples(index=False):
                # Join values from columns to create sing date - row[0] = year, row[1] = month, row[2] = day
                date = dt.date(row[0], row[1], row[2])
                if debug:
                    print('DEBUG: Inserting water measurement for date ' + str(date) + '.')
                cursor.execute(
                    '''INSERT INTO hydrometeo_measurement(
	                    id, station_id, hydrometeo_type, date, value, min_value, max_value, avg_value,
                        azimuth, "time", symptom, total_value, total_symptom, last_updated)
	                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);''',
                    (str(stationID), str(hydrometeoTypes['Water']), date, row[3], None, None, None, None, None, None, None, None, dt.datetime.now()))
                db.commit()
        if debug:
            print('DEBUG: All water measurements are inserted to the database.')
    elif debug:
        print('DEBUG: Watter measurements found. Skipping this step.')

    # Closing transaction
    cursor.close()

def insertPressure(db, hydrometeoTypes: dict, debug: bool):
    """Function for inserting pressure measurement to the database.

        Arguments:
            db -- postgress connection for database
            hydrometeoTypes -- dictionary with hydrometeo types and their database IDs
            debug -- flag to enable debug messages
        Returns None
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching pressure measurements from database.')
    # Check if database contains pressure measurements
    cursor.execute('SELECT * FROM hydrometeo_measurement WHERE hydrometeo_type = ' + str(hydrometeoTypes['Pressure']))
    rows = cursor.fetchall()
    # If database doesn't contains pressure measurements, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Pressure measurements not found. Starting to read pressure files.')
        # If not, iterate over pressure files in temporary structure and insert them to the database
        path = os.path.join(os.getcwd(), 'tmp', 'Pressure')
        for fileName in os.listdir(path):
            if debug:
                print('DEBUG: Inserting ' + fileName + ' file.')
            # Extract station ID, read station file and insert each row to the database
            stationID = fileName.split('.')[0]
            df = pd.read_csv(os.path.join(path, fileName), encoding='windows-1250', sep=';')
            for row in df.itertuples(index=False):
                # Join values from columns to create sing date - row[0] = year, row[1] = month, row[2] = day
                date = dt.date(row[0], row[1], row[2])
                if debug:
                    print('DEBUG: Inserting pressure measurement for date ' + str(date) + '.')
                cursor.execute(
                    '''INSERT INTO hydrometeo_measurement(
	                    id, station_id, hydrometeo_type, date, value, min_value, max_value, avg_value,
                        azimuth, "time", symptom, total_value, total_symptom, last_updated)
	                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);''',
                    (str(stationID), str(hydrometeoTypes['Pressure']), date, row[3], None, None, None, None, None, None, None, None, dt.datetime.now()))
                db.commit()
        if debug:
            print('DEBUG: All pressure measurements are inserted to the database.')
    elif debug:
        print('DEBUG: Pressure measurements found. Skipping this step.')

    # Closing transaction
    cursor.close()

def insertWind(db, hydrometeoTypes: dict, debug: bool):
    """Function for inserting wind measurement to the database.

        Arguments:
            db -- postgress connection for database
            hydrometeoTypes -- dictionary with hydrometeo types and their database IDs
            debug -- flag to enable debug messages
        Returns None
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching wind measurements from database.')
    # Check if database contains wind measurements
    cursor.execute('SELECT * FROM hydrometeo_measurement WHERE hydrometeo_type = ' + str(hydrometeoTypes['Wind']))
    rows = cursor.fetchall()
    # If database doesn't contains wind measurements, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Wind measurements not found. Starting to read wind files.')
        # If not, iterate over wind files in temporary structure and insert them to the database
        path = os.path.join(os.getcwd(), 'tmp', 'Wind')
        for fileName in os.listdir(path):
            if debug:
                print('DEBUG: Inserting ' + fileName + ' file.')
            # Extract station ID, read station file and insert each row to the database
            stationID = fileName.split('.')[0]
            df = pd.read_csv(os.path.join(path, fileName), encoding='windows-1250', sep=';')
            for row in df.itertuples(index=False):
                # Join values from columns to create sing date - row[0] = year, row[1] = month, row[2] = day
                date = dt.date(row[0], row[1], row[2])
                if debug:
                    print('DEBUG: Inserting wind measurement for date ' + str(date) + '.')
                time = None
                if not pd.isna(row[6]):
                    # Converting string time to time format for database
                    tmp = str(row[6]).split(':')
                    hour = int(tmp[0])
                    minute = int(tmp[1])
                    if hour == 24:
                        hour = 0
                    if hour > 24:
                        # TODO - write down some correcture of wrong times - currently can't read B1HOLE01 - 1996-11-18
                        tmp = str(hour)
                        if tmp[0] == tmp[1]:
                            hour = int('0' + tmp[1])
                    time = dt.time(hour, minute)
                cursor.execute(
                    '''INSERT INTO hydrometeo_measurement(
	                    id, station_id, hydrometeo_type, date, value, min_value, max_value, avg_value,
                        azimuth, "time", symptom, total_value, total_symptom, last_updated)
	                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);''',
                    (str(stationID), str(hydrometeoTypes['Wind']), date, None, None, row[4], row[3], row[5], time, None, None, None, dt.datetime.now()))
                db.commit()
        if debug:
            print('DEBUG: All wind measurements are inserted to the database.')
    elif debug:
        print('DEBUG: Wind measurements found. Skipping this step.')

    # Closing transaction
    cursor.close()

def insertPrecipitation(db, hydrometeoTypes: dict, debug: bool):
    """Function for inserting precipitation measurement to the database.

        Arguments:
            db -- postgress connection for database
            hydrometeoTypes -- dictionary with hydrometeo types and their database IDs
            debug -- flag to enable debug messages
        Returns None
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching precipitation measurements from database.')
    # Check if database contains precipitation measurements
    cursor.execute('SELECT * FROM hydrometeo_measurement WHERE hydrometeo_type = ' + str(hydrometeoTypes['Precipitation']))
    rows = cursor.fetchall()
    # If database doesn't contains precipitation measurements, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Precipitation measurements not found. Starting to read precipitation files.')
        # If not, iterate over precipitation files in temporary structure and insert them to the database
        path = os.path.join(os.getcwd(), 'tmp', 'Precipitation')
        for fileName in os.listdir(path):
            if debug:
                print('DEBUG: Inserting ' + fileName + ' file.')
            # Extract station ID, read station file and insert each row to the database
            stationID = fileName.split('.')[0]
            df = pd.read_csv(os.path.join(path, fileName), encoding='windows-1250', sep=';')
            for row in df.itertuples(index=False):
                # Join values from columns to create sing date - row[0] = year, row[1] = month, row[2] = day
                date = dt.date(row[0], row[1], row[2])
                if debug:
                    print('DEBUG: Inserting precipitation measurement for date ' + str(date) + '.')
                cursor.execute(
                    '''INSERT INTO hydrometeo_measurement(
	                    id, station_id, hydrometeo_type, date, value, min_value, max_value, avg_value,
                        azimuth, "time", symptom, total_value, total_symptom, last_updated)
	                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);''',
                    (str(stationID), str(hydrometeoTypes['Precipitation']), date, None, None, None, row[5], None, None, None, row[3], row[4], dt.datetime.now()))
                db.commit()
        if debug:
            print('DEBUG: All precipitation measurements are inserted to the database.')
    elif debug:
        print('DEBUG: Precipitation measurements found. Skipping this step.')

    # Closing transaction
    cursor.close()

def insertShine(db, hydrometeoTypes: dict, debug: bool):
    """Function for inserting shine measurement to the database.

        Arguments:
            db -- postgress connection for database
            hydrometeoTypes -- dictionary with hydrometeo types and their database IDs
            debug -- flag to enable debug messages
        Returns None
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching shine measurements from database.')
    # Check if database contains shine measurements
    cursor.execute('SELECT * FROM hydrometeo_measurement WHERE hydrometeo_type = ' + str(hydrometeoTypes['Shine']))
    rows = cursor.fetchall()
    # If database doesn't contains shine measurements, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Shine measurements not found. Starting to read shine files.')
        # If not, iterate over shine files in temporary structure and insert them to the database
        path = os.path.join(os.getcwd(), 'tmp', 'Shine')
        for fileName in os.listdir(path):
            if debug:
                print('DEBUG: Inserting ' + fileName + ' file.')
            # Extract station ID, read station file and insert each row to the database
            stationID = fileName.split('.')[0]
            df = pd.read_csv(os.path.join(path, fileName), encoding='windows-1250', sep=';')
            for row in df.itertuples(index=False):
                # Join values from columns to create sing date - row[0] = year, row[1] = month, row[2] = day
                date = dt.date(row[0], row[1], row[2])
                if debug:
                    print('DEBUG: Inserting shine measurement for date ' + str(date) + '.')
                cursor.execute(
                    '''INSERT INTO hydrometeo_measurement(
	                    id, station_id, hydrometeo_type, date, value, min_value, max_value, avg_value,
                        azimuth, "time", symptom, total_value, total_symptom, last_updated)
	                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);''',
                    (str(stationID), str(hydrometeoTypes['Shine']), date, row[3], None, None, None, None, None, None, None, None, dt.datetime.now()))
                db.commit()
        if debug:
            print('DEBUG: All shine measurements are inserted to the database.')
    elif debug:
        print('DEBUG: Shine measurements found. Skipping this step.')

    # Closing transaction
    cursor.close()

def insertSnow(db, hydrometeoTypes: dict, debug: bool):
    """Function for inserting snow measurement to the database.

        Arguments:
            db -- postgress connection for database
            hydrometeoTypes -- dictionary with hydrometeo types and their database IDs
            debug -- flag to enable debug messages
        Returns None
    """
    # Create new cursor for interaction with database
    cursor = db.cursor()

    if debug:
        print('DEBUG: Fetching snow measurements from database.')
    # Check if database contains snow measurements
    cursor.execute('SELECT * FROM hydrometeo_measurement WHERE hydrometeo_type = ' + str(hydrometeoTypes['Snow']))
    rows = cursor.fetchall()
    # If database doesn't contains snow measurements, insert them
    if len(rows) == 0:
        if debug:
            print('DEBUG: Snow measurements not found. Starting to read snow files.')
        # If not, iterate over snow files in temporary structure and insert them to the database
        path = os.path.join(os.getcwd(), 'tmp', 'Snow')
        for fileName in os.listdir(path):
            if debug:
                print('DEBUG: Inserting ' + fileName + ' file.')
            # Extract station ID, read station file and insert each row to the database
            stationID = fileName.split('.')[0]
            df = pd.read_csv(os.path.join(path, fileName), encoding='windows-1250', sep=';')
            for row in df.itertuples(index=False):
                # Join values from columns to create sing date - row[0] = year, row[1] = month, row[2] = day
                date = dt.date(row[0], row[1], row[2])
                if debug:
                    print('DEBUG: Inserting temperature measurement for date ' + str(date) + '.')
                cursor.execute(
                    '''INSERT INTO hydrometeo_measurement(
	                    id, station_id, hydrometeo_type, date, value, min_value, max_value, avg_value,
                        azimuth, "time", symptom, total_value, total_symptom, last_updated)
	                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);''',
                    (str(stationID), str(hydrometeoTypes['Snow']), date, row[5], None, None, None, None, None, row[6], row[3], row[4], dt.datetime.now()))
                db.commit()
        if debug:
            print('DEBUG: All snow measurements are inserted to the database.')
    elif debug:
        print('DEBUG: Snow measurements found. Skipping this step.')

    # Closing transaction
    cursor.close()
