from os import error


if __name__ == "__main__":
    import os
    import sys
    import psycopg2
    import helpers as h
    from decouple import config
    from argparse import ArgumentParser

    # Script descrtiption
    parser = ArgumentParser(description="Inserts downloaded data to the Postgres database.")

    # Argument to specify where to store data
    parser.add_argument("-", "--path", default='..\\Downloader\\OutputData', help="Specify the path where the data is stored. Default path is ..\\Downloader\\OutputData.")

    # TODO: Better description
    # Argument to disable removing helping structure files
    parser.add_argument("-ktf", "--keep_temporary_files", default=False, action='store_true', help="Argument to disable deleting temporary helping file structure.")

    # Argument to enable debug info
    parser.add_argument("-d", "--debug", default=False, action='store_true', help="Prints out debug info. False is default.")

    # Creates namespace with arguments
    args = parser.parse_args()

    # Script starts here
    
    # Checking if path is valid
    if not os.path.exists(args.path):
        print('ERROR: Given path is not valid.')
        sys.exit(1)

    # Checking, if path leads to correct structure with data for insert
    if not h.checkStructure(args.path):
        print("ERROR: Given path does not contains data or structure is not valid.")
        sys.exit(1)

    try:
        # Connetction to database
        con = psycopg2.connect(
            host = config('HOST'),
            database = config('DATABASE'),
            user = config('USER'),
            password = config('PASSWORD'),
            port = config('PORT', cast=int, default=5432)
        )

        # Inserting basic data, so we can use their IDs later
        regions = h.insertRegions(con)
        hydrometeoTypes = h.insertHydroMeteoTypes(con)

        try:
            h.createHelpingStructure(args.path, regions, hydrometeoTypes, args.debug)
        except error:
            print(error)
            print("ERROR: Can not create directory or file.")
            h.removeHelpingStructure()
            sys.exit(1)

        h.insertStations(con, args.debug)

        # Closing conection to database
        con.close()
    except error:
        print("ERROR: Can not connect to the database.")
    
    # Clearing used structure if flag is not set
    if not args.keep_temporary_files:
        h.removeHelpingStructure()
    else:
        os.rename(os.getcwd() + '\\tmp', os.getcwd() + '\\DataStructure')
