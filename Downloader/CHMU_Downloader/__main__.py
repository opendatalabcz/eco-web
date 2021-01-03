import os
from argparse import ArgumentParser
from CHMU_Downloader import helpers as h

# Script descrtiption
parser = ArgumentParser(description="Downloads and processes csv files from CHMU.")

# Argument for plotting output into graph
parser.add_argument("-g", "--graph", default=False, help="Plots a graph with downloaded output and stores it in given directory.")

# Argument to specify where to store data
parser.add_argument("-o", "--output", default=os.getcwd(), help="Specify path where data should be stored. Current directory is default.")

# Argument to specify region of interest
parser.add_argument("-r", "--region", default='all', help="Specify for which region you want to get data.")

# Argument to specify what kind of data you want to download
parser.add_argument("-t", "--type", default='all', help="Specify which type of data to download.")

# Argument to list all regions
parser.add_argument("-lr", "--list-regions", default=False, action='store_true', help="List all available regions.")

# Argument to list all data types
parser.add_argument("-lt", "--list-types", default=False, action='store_true', help="List all available data types.")

# Creates namespace with arguments
args = parser.parse_args()

# Script starts here
regions = {
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
}

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

# Prints out all regions if the flag is set
if args.list_regions is True:
    for region in regions:
        print(region)
    exit()

# Prints out all data types if the flag is set
if args.list_types is True:
    for dataType in dataTypes:
        print(dataType)
    exit()
