import os
import utm
import shutil
import unidecode
import pandas as pd
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

# TODO: Add documentation comments

# TODO: Refactor this
def checkStructure(path: str):
    # Checking if root dir contains less or equal files as data types count
    if len(os.listdir(path)) > len(dataTypes):
        return False
    # Checking if dir's names are valid
    for dir in os.listdir(path):
        # Return false if dir name is not contained in data types
        if dir not in dataTypes:
            return False
        # Checking if dir contains less or equal files as regions count
        if len(os.listdir(path + '\\' + dir)) > len(regionList):
            return False
        for subDir in os.listdir(path + '\\' + dir):
            # Return false if dir name is not contained in regions
            if subDir not in regionList:
                return False
            # Checking if all dirs contains 1 or 3 files
            for subSubDir in os.listdir(path + '\\' + dir + '\\' + subDir):
                length = len(os.listdir(path + '\\' + dir + '\\' + subDir + '\\' + subSubDir))
                if length != 1 and length != 3:
                    return False
    return True

def parseNonWaterStation(path: str):
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

# TODO remove insertilg leading zero, when downloader is repaired
def createStationsStructure(sourcePath: str, regions: dict, debug: bool):
    if debug:
        print('DEBUG: Creating structure for stations data.')
    structure = dict()
    # Traverse through dir structure to get all desired station data
    for category in os.listdir(sourcePath):
        if debug:
            print('DEBUG: Reading stations data from ' + category + ' category.')
        for region in os.listdir(sourcePath + '\\' + category):
            if debug:
                print('DEBUG: Reading stations data from ' + region + ' region.')
            for stationID in os.listdir(sourcePath + '\\' + category + '\\' + region):
                if debug:
                    print('DEBUG: Reading stations data for ' + stationID + ' station.')
                # Checking if dir contains data
                if len(os.listdir(sourcePath + '\\' + category + '\\' + region + '\\' + stationID)) == 3:
                    # TEMPORARY HERE - insert back in if before data: None, when missing leading zero problem solved
                    path = sourcePath + '\\' + category + '\\' + region + '\\' + stationID + '\\' + 'station.csv'
                    # TEMPORARY - manualy insert leading zero for DB - will be remvoved later
                    if len(stationID) < 6:
                        for i in range (0 , 6 - len(stationID)):
                            stationID = '0' + stationID
                    # Check if station was already met, if yes, update category of station,
                    # else parse station.csv and insert new station to the structure
                    if not stationID in structure:
                        data: None
                        # Check what type of data it is. If W-AVG, call function for it, else use general station.csv parser
                        if category == dataTypes[-1]:
                            data = parseWaterStation(path)
                        else:
                            data = parseNonWaterStation(path)
                        structure[str(stationID)] = Station(stationID, regions[region], category, data[0], data[1], data[2], data[3])
                    else:
                        structure[str(stationID)].updateType(category)
    return structure

def writeStationsStructure(path: str, structure: dict, debug: bool):
    # Create station directory
    dest = path + '\\stations'
    if debug:
        print('DEBUG: Creating stations directory.')
    os.mkdir(dest)
    if debug:
        print('DEBUG: Writing stations data to the stations.csv file.')
    # Create new file and write data
    file = open(dest + '\\stations.csv', 'w', encoding='windows-1250')
    file.write('id;region_id;station_type;location_name;longitude;latitude;height\n')
    for station in structure.values():
        file.write(station.toCSV())
    file.close()
    if debug:
        print('DEBUG: Writing stations data Finished.')

def createTemperatureStructure(sourcePath: str, targetPath: str, hydrometeoTypes: dict, debug: bool):
    dest = targetPath + '\\Temperature'
    os.mkdir(dest)
    for region in regionList:
        avgStations = os.listdir(sourcePath + '\\' + dataTypes[0] + '\\' + region)
        minStations = os.listdir(sourcePath + '\\' + dataTypes[1] + '\\' + region)
        maxStations = os.listdir(sourcePath + '\\' + dataTypes[2] + '\\' + region)
        stations = set()
        for stationID in avgStations:
            stations.add(stationID)
        for stationID in minStations:
            stations.add(stationID)
        for stationID in maxStations:
            stations.add(stationID)
        for station in stations:
            
            avgDF = None
            minDF = None
            maxDF = None
            if os.path.exists(sourcePath + '\\' + dataTypes[0] + '\\' + region + '\\' + station + '\\data.csv'):
                avgDF = pd.read_csv(sourcePath + '\\' + dataTypes[0] + '\\' + region + '\\' + station + '\\data.csv', encoding='windows-1250', sep=';').drop(['Příznak'], axis = 1)
                avgDF = avgDF[avgDF['Hodnota'].notna()]
            if os.path.exists(sourcePath + '\\' + dataTypes[1] + '\\' + region + '\\' + station + '\\data.csv'):
                minDF = pd.read_csv(sourcePath + '\\' + dataTypes[1] + '\\' + region + '\\' + station + '\\data.csv', encoding='windows-1250', sep=';').drop(['Příznak'], axis = 1)
                minDF = minDF[minDF['Hodnota'].notna()]
            if os.path.exists(sourcePath + '\\' + dataTypes[2] + '\\' + region + '\\' + station + '\\data.csv'):
                maxFile = pd.read_csv(sourcePath + '\\' + dataTypes[2] + '\\' + region + '\\' + station + '\\data.csv', encoding='windows-1250', sep=';').drop(['Příznak'], axis = 1)
                maxFile = maxFile[maxFile['Hodnota'].notna()]

            outputFile = open(dest + '\\' + station, 'w')
            outputFile.close()

def createHelpingStructure(sourcePath: str, regions: dict, hydrometeoTypes: dict, debug: bool):
    # Get current directory and make path to temporary directory
    dest = os.getcwd() + '\\tmp'
    if debug:
        print('DEBUG: Creating tmp directory.')
    # Create temporary structure folder
    os.mkdir(dest)
    # Create and write down stations to csv
    stationStructure = createStationsStructure(sourcePath, regions, debug)
    writeStationsStructure(dest, stationStructure, debug)
    createTemperatureStructure(sourcePath, dest, hydrometeoTypes, debug)

def removeHelpingStructure():
    shutil.rmtree(os.getcwd() + '\\tmp')

def insertRegions(db):
    # Create new cursor for interaction with database
    cursor = db.cursor()

    # Checking, if database already contains regions
    cursor.execute('SELECT * FROM region')
    rows = cursor.fetchall()
    # If database doesn't contains regions, insert them
    if len(rows) == 0:
        # Insert regions
        for region in regions:
            cursor.execute('INSERT INTO region (id, name, shortcut, country_name, country_shortcut) VALUES (DEFAULT, %s, %s, %s, %s);', region)
            db.commit()
        # Fetch all new regions with their ID, so we can use them in adding stations
        cursor.execute('SELECT * FROM region')
        rows = cursor.fetchall()
    
    # Creating dictionary with IDs for regions and returns them
    toRet = dict()
    for row in rows:
        toRet[unidecode.unidecode(row[1])] = row[0]
    # Closing transaction
    cursor.close()
    return toRet

def insertHydroMeteoTypes(db):
    # Create new cursor for interaction with database
    cursor = db.cursor()

    # Checking, if database already contains hydrometeo types
    cursor.execute('SELECT * FROM hydrometeo_types')
    rows = cursor.fetchall()
    # If database doesn't contains hydrometeo types, insert them
    if len(rows) == 0:
        # Insert hydrometeo types
        for type in hydrometeo_types:
            cursor.execute('INSERT INTO hydrometeo_types (id, name, unit) VALUES (DEFAULT, %s, %s);', type)
            db.commit()
        # Fetch all new hydrometeo types with their ID, so we can use them in adding mesurements
        cursor.execute('SELECT * FROM hydrometeo_types')
        rows = cursor.fetchall()
    
    # Creating dictionary with IDs for hydrometeo types and returns them
    toRet = dict()
    for row in rows:
        toRet[row[1]] = row[0]
    # Closing transaction
    cursor.close()
    return toRet

# INSERT INTO public.station(
# 	id, region_id, station_type, location_name, longitude, latitude, height)
# 	VALUES (?, ?, ?, ?, ?, ?, ?);

def insertStations():
    pass

def insertMesurement():
    pass
