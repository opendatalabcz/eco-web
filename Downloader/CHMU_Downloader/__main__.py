if __name__ == "__main__":
    import os
    import time
    import pandas as pd
    import helpers as h
    from argparse import ArgumentParser

    # Script descrtiption
    parser = ArgumentParser(description="Downloads and processes csv files from CHMU.")

    # Argument to specify where to store data
    parser.add_argument("-o", "--output", default=os.getcwd(), help="Specify path where data should be stored. Current directory is default.")

    # Argument to specify region of interest
    parser.add_argument("-r", "--region", default='All', help="Specify for which region you want to get data. All is default.")

    # Argument to specify what kind of data you want to download
    parser.add_argument("-t", "--type", default='All', help="Specify which type of data to download. All is default.")

    # Argument to list all regions
    parser.add_argument("-lr", "--list-regions", default=False, action='store_true', help="List all available regions and exits after. False is default.")

    # Argument to list all data types
    parser.add_argument("-lt", "--list-types", default=False, action='store_true', help="List all available data types and exits. False is default.")

    group = parser.add_mutually_exclusive_group()
    # Argumnet to disable all console printing
    group.add_argument("-s", "--silent", default=False, action='store_true', help="Prints nothing in console. Ingored by -lr and -lt arguments. False is default.")

    # Argument to enable debug info
    group.add_argument("-d", "--debug", default=False, action='store_true', help="Prints out debug info. False is default.")

    # Creates namespace with arguments
    args = parser.parse_args()

    # Script starts here

    if args.debug:
        print('DEBUG: Checking selected arguments.')
    # Prints out all regions if the flag is set
    if args.list_regions is True:
        if args.debug:
            print('DEBUG: Printing region list.')
        print('Available regions are: ')
        for region in h.regions:
            print(region)
        print('All - default\n')

    # Prints out all data types if the flag is set
    if args.list_types is True:
        if args.debug:
            print('DEBUG: Printing data type list.')
        print('Available data types are: ')
        for dataType in h.dataTypes:
            print(dataType)
        print('All - default\n')

    if args.debug:
        print('DEBUG: Validating selected arguments.')
    # End script if list option is detected
    if args.list_regions is True or args.list_types is True:
        exit()

    # Region validation
    if args.region != 'All' and args.region not in h.regions:
        print(args.region + ' is not valid region. Use -lr to list all available regions.')
        exit()

    # Datatype validation
    if args.type != 'All' and args.type not in h.dataTypes and args.type not in h.dataTypes.values():
        print(args.type + ' is not valid data type. Use - lt to list all available data types.')
        exit()

    if args.debug:
        print('DEBUG: Selecting requested regions.')
    # Selecting requested regions
    selectedRegions = []
    if args.region == 'All':
        selectedRegions = [0, 1, 2, 3, 4, 5, 6, 7 , 8, 9, 10, 11, 12, 13]
    else:
        selectedRegions = [h.regions.index(args.region)]

    if args.debug:
        print('DEBUG: Selecting requested data types.')
    # Selecting requested dataType
    selectedDataTypes = []
    if args.type == 'All':
        selectedDataTypes = h.dataTypes.values()
    else:
        # Decides if given type is key or value and select right type
        if args.type in h.dataTypes:
            selectedDataTypes = [h.dataTypes[args.type]]
        else:
            selectedDataTypes = [args.type]

    if not args.silent and not args.debug:
        print('\nATTENTION: To reduce server load, there is delay between downloads.\n')

    if args.debug:
        print('DEBUG: Starting to process data.')
    # Loop through all selected data types and regions, download files and process them
    for dataType in selectedDataTypes:
        if not args.silent and not args.debug:
            print('Starting to download data for ' + dataType + ' data type.\n')
        if args.debug:
            print('DEBUG: Checking output structure.')
        # Create output structure if doesn't exists
        outputDest =  args.output + '\\OutputData'
        if not os.path.isdir(outputDest):
            if args.debug:
                print('DEBUG: Creating output directory.')
            os.mkdir(outputDest)
        if not os.path.isdir(outputDest + '\\' + dataType):
            if args.debug:
                print('DEBUG: Creating data type directory.')
            os.mkdir(outputDest + '\\' + dataType)
        df = None
        # for each data type read corresponding file with stations
        if dataType == h.dataTypes['Average_temperature']:
            pass
        elif dataType == h.dataTypes['Minimal_temperature']:
            pass
        elif dataType == h.dataTypes['Maximal_temperature']:
            pass
        elif dataType == h.dataTypes['Daily_total_precipitation']:
            pass
        elif dataType == h.dataTypes['Average_daily_relative_humidity']:
            pass
        elif dataType == h.dataTypes['Height_of_newly_fallen_snow']:
            pass
        elif dataType == h.dataTypes['The_total_height_of_the_snow_cover']:
            pass
        elif dataType == h.dataTypes['Dailytotal_duration_of_sunshine']:
            pass
        elif dataType == h.dataTypes['Average_pressure']:
            pass
        elif dataType == h.dataTypes['Average_daily_wind_speed']:
            pass
        elif dataType == h.dataTypes['Maximum_wind_speed']:
            pass
        else:
            if args.debug:
                print('DEBUG: Reading W_AVG_Stations.csv.')
            # Read W_AVG_Stations.csv if exists and skip that data type if doesn't exists
            if not os.path.exists('.\\InputData\\W_AVG_Stations.csv'):
                if not args.silent:
                    print('WARNING! Skipping Average_daily_water_flow, because W_AVG_Stations.csv in input data missing.')
                continue
            df = pd.read_csv('.\\InputData\\W_AVG_Stations.csv')
        if args.debug:
            print('DEBUG: Starting to process selected regions.')
        # For each region select stations from it, download and process corresponding data
        for region in selectedRegions:
            if not args.silent and not args.debug:
                print('Starting to download data for region ' + h.regions[region] + '.\n')
            if args.debug:
                print('DEBUG: Procesing ' + dataType + ' data type for region ' + h.regions[region] + '.')
            # Create region directory if doesn't exists
            if not os.path.isdir(outputDest + '\\' + dataType + '\\' + h.regions[region]):
                if args.debug:
                    print('DEBUG: Creating region directory.')
                os.mkdir(outputDest + '\\' + dataType + '\\' + h.regions[region])
            # If data type is W-AVG, process differently
            if dataType == h.dataTypes['Average_daily_water_flow']:
                if args.debug:
                    print('DEBUG: Selecting stations from region' + h.regions[region] + '.')
                # Filter stations so it contains only stations from given region
                stations = df[df['region'] == h.regions[region]]
                stationList = stations['file_name'].tolist()
                # For each station, generate corresponding filename, URL. Then download that file from it and process it.
                for station in stationList:
                    if not args.silent and not args.debug:
                        print('Downloading data for station ' + str(station) + '.')
                    if args.debug:
                        print('DEBUG: Starting to process stations in region' + h.regions[region] + '.')
                    # Process station if directory doesn't exist, else skip
                    if not os.path.isdir(outputDest + '\\' + dataType + '\\' + h.regions[region] + '\\' + str(station)):
                        if args.debug:
                            print('DEBUG: Creating directory for station ' + str(station) + '.')
                        # Create directory for the station
                        os.mkdir(outputDest + '\\' + dataType + '\\' + h.regions[region] + '\\' + str(station))
                        if args.debug:
                            print('DEBUG: Preparing file name for station ' + str(station) + '.')
                        # Generate name and URL for given station
                        fileName = h.generateFileName(str(station), dataType)
                        if args.debug:
                            print('DEBUG: Creating URL for station ' + str(station) + '.')
                        url = h.generateURL(h.regions[region], dataType, fileName)
                        # Set up path to store downloaded file and where to put processed output
                        dest = outputDest + '\\' + dataType + '\\' + h.regions[region] + '\\' + str(station)
                        path = dest + '\\' + fileName
                        # Downloading and processing file
                        if args.debug:
                            print('DEBUG: Downloading data for station ' + str(station) + '.')
                        h.downloadFromURL(url=url, path=path)
                        if args.debug:
                            print('DEBUG: Processing data for station ' + str(station) + '.')
                        h.processHydroDataFromZIPFile(path, dest)
                        if args.debug:
                            print('DEBUG: Completed data processing for statation ' + str(station) + '.')
                        if not args.silent and not args.debug:
                            print('Data download for station ' + str(station) + ' completed.\n')
                        # Waiting some time before sending another request to reduce server load
                        delay = h.generateDelay()
                        if args.debug:
                            print('DEBUG: Due to server load reduction, waits ' + str(delay) + ' seconds before continuing.')
                        time.sleep(delay)
                    else:
                        if args.debug:
                            print('DEBUG: Skipping station ' + str(station) + ', because data already exists.')
                        if not args.silent and not args.debug:
                            print('WARNING! Skipping station ' + str(station) + ', because data already exists.\n')
            else:
                print(dataType + ' is not supported yet.')
            if not args.silent and not args.debug:
                print('Data download for region ' + h.regions[region] + ' finished!\n')
        if not args.silent and not args.debug:
            print('Data download for ' + dataType + ' data type Finished!\n')
    if args.debug:
        print('DEBUG: Processing of data finished.')
    if not args.silent and not args.debug:
        print('\nDownloading finished! All requested data downloaded.')

    # testZip = args.output + '\\Tests\\QD_169000.zip'
    # outputDirPath = args.output + '\\Tests\\Output'
    # outputPath = outputDirPath + '\\QD_169000'
    # if not os.path.isdir(outputDirPath):
    #     os.mkdir(outputDirPath)
    # if not os.path.isdir(outputPath):
    #     os.mkdir(outputPath)
    # h.processHydroDataFromZIPFile(testZip, outputPath)

    # testZip = args.output + '\\Tests\\P1PKAR01_T_N.csv.zip'
    # outputDirPath = args.output + '\\Tests\\Output'
    # outputPath = outputDirPath + '\\P1PKAR01_T_N'
    # if not os.path.isdir(outputDirPath):
    #     os.mkdir(outputDirPath)
    # if not os.path.isdir(outputPath):
    #     os.mkdir(outputPath)
    # h.processMeteoDataFromZIPFile(testZip, outputPath)
