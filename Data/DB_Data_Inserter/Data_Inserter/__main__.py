if __name__ == "__main__":
    import os
    import sys
    import psycopg2
    import helpers as h
    from decouple import config
    from argparse import ArgumentParser

    # Script descrtiption
    parser = ArgumentParser(
        description="Inserts downloaded data to the Postgres database.")

    # Argument to specify where to store data
    parser.add_argument("-p", "--path", default=os.path.join('..', 'Downloader', 'OutputData'),
                        help="Specify the path where the data is stored. Default path is ../Downloader/OutputData.")

    # Argument to disable removing helping structure files
    parser.add_argument("-ktf", "--keep_temporary_files", default=False, action='store_true',
                        help="An argument that prohibits deleting the temporary structure of helper files.")

    # Argument to enable debug info
    parser.add_argument("-d", "--debug", default=False, action='store_true',
                        help="Prints out debug info. False is default.")

    # Creates namespace with arguments
    args = parser.parse_args()

    # Script starts here

    # Checking if path is valid
    if not os.path.exists(args.path):
        print('ERROR: Given path is not valid.')
        sys.exit(1)

    # Checking, if path leads to correct structure with data for insert
    if not h.checkStructure(args.path, args.debug):
        print("ERROR: Given path does not contains data or structure is not valid.")
        sys.exit(1)

    # Creating helping structure, which later helps with inserting data to the database
    try:
        h.createHelpingStructure(args.path, args.debug)
    except:
        print("ERROR: Can not create directory or file.")
        h.removeHelpingStructure(args.debug)
        sys.exit(1)

    try:
        # Connecting to the database
        con = psycopg2.connect(
            host=config('HOST'),
            database=config('DATABASE'),
            user=config('USER'),
            password=config('PASSWORD'),
            port=config('PORT', cast=int, default=5432)
        )

        # Inserting basic data, so we can use their IDs later
        regions = h.insertRegions(con, args.debug)
        hydrometeoTypes = h.insertHydroMeteoTypes(con, args.debug)

        # Inserting station data from helping structure
        h.insertStations(con, regions, args.debug)
        h.insertTemperature(con, hydrometeoTypes, args.debug)
        h.insertWater(con, hydrometeoTypes, args.debug)
        h.insertPressure(con, hydrometeoTypes, args.debug)
        h.insertWind(con, hydrometeoTypes, args.debug)
        h.insertPrecipitation(con, hydrometeoTypes, args.debug)
        h.insertShine(con, hydrometeoTypes, args.debug)
        h.insertSnow(con, hydrometeoTypes, args.debug)

        # Closing conection to database
        con.close()

    except:
        print("ERROR: Can not connect to the database.")

    # Clearing used structure if flag is not set
    if not args.keep_temporary_files:
        h.removeHelpingStructure(args.debug)
    else:
        # Itarating and trying to rename tmp folder until its done
        for i in range(0, 999):
            # Unless first iteration, adds number to the DataStructure name
            if i == 0:
                if args.debug:
                    print('DEBUG: Trying to rename tmp directory to DataStructure.')
                if not os.path.exists(os.path.join(os.getcwd(), 'DataStructure')):
                    os.rename(os.path.join(os.getcwd(), 'tmp'),
                              os.path.join(os.getcwd(), 'DataStructure'))
                    if args.debug:
                        print(
                            'DEBUG: Try to rename tmp directory to DataStructure was successful.')
                    break
                if args.debug:
                    print(
                        'DEBUG: Try to rename tmp directory to DataStructure was not successful. Directory with this name already exists.')
            else:
                if args.debug:
                    print(
                        'DEBUG: Trying to rename tmp directory to DataStructure' + str(i) + '.')
                if not os.path.exists(os.path.join(os.getcwd(), 'DataStructure' + str(i))):
                    os.rename(os.path.join(os.getcwd(), 'tmp'), os.path.join(
                        os.getcwd(), 'DataStructure' + str(i)))
                    if args.debug:
                        print(
                            'DEBUG: Try to rename tmp directory to DataStructure' + str(i) + ' was successful.')
                    break
                if args.debug:
                    print('DEBUG: Try to rename tmp directory to DataStructure' + str(i) +
                          ' was not successful. Directory with this name already exists.')
                # Remove tmp directory, if all attempts were not successful
                if i == 999:
                    if args.debug:
                        print(
                            'DEBUG: Removing the structure because too many attempts were not successful.')
                    h.removeHelpingStructure(args.debug)
