if __name__ == "__main__":
    import os
    from argparse import ArgumentParser
    import helpers as h

    # Script descrtiption
    parser = ArgumentParser(description="Downloads and processes csv files from CHMU.")

    # Argument to specify where to store data
    parser.add_argument("-o", "--output", default=os.getcwd(), help="Specify path where data should be stored. Current directory is default.")

    # Argument to specify region of interest
    parser.add_argument("-r", "--region", default='All', help="Specify for which region you want to get data.")

    # Argument to specify what kind of data you want to download
    parser.add_argument("-t", "--type", default='All', help="Specify which type of data to download.")

    # Argument to list all regions
    parser.add_argument("-lr", "--list-regions", default=False, action='store_true', help="List all available regions.")

    # Argument to list all data types
    parser.add_argument("-lt", "--list-types", default=False, action='store_true', help="List all available data types.")

    # Creates namespace with arguments
    args = parser.parse_args()

    # Script starts here

    # Prints out all regions if the flag is set
    if args.list_regions is True:
        print('Available regions are: ')
        for region in h.regions:
            print(region)
        print('All - default\n')

    # Prints out all data types if the flag is set
    if args.list_types is True:
        print('Available data types are: ')
        for dataType in h.dataTypes:
            print(dataType)
        print('All - default\n')

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

    testZip = args.output + '\\Tests\\QD_169000.zip'
    outputDirPath = args.output + '\\Tests\\Output'
    outputPath = outputDirPath + '\\QD_169000'
    if not os.path.isdir(outputDirPath):
        os.mkdir(outputDirPath)
    if not os.path.isdir(outputPath):
        os.mkdir(outputPath)
    h.processHydroDataFromZIPFile(testZip, outputPath)

    testZip = args.output + '\\Tests\\P1PKAR01_T_N.csv.zip'
    outputDirPath = args.output + '\\Tests\\Output'
    outputPath = outputDirPath + '\\P1PKAR01_T_N'
    if not os.path.isdir(outputDirPath):
        os.mkdir(outputDirPath)
    if not os.path.isdir(outputPath):
        os.mkdir(outputPath)
    h.processMeteoDataFromZIPFile(testZip, outputPath)
