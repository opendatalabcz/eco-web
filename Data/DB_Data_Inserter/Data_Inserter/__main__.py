if __name__ == "__main__":
    import psycopg2
    import helpers as h

    regions = []

    hydrometeo_types = []

    # Connetction to database
    con = psycopg2.connect(
        host = 'localhost',
        database = 'eco-web',
        user = 'postgres',
        password = 'postgres',
        port=5432
    )

    cursor = con.cursor()

    # insert
    cursor.execute('INSERT INTO region (id, name, shortcut, country_name, country_shortcut) VALUES (DEFAULT, %s, %s, %s, %s);', ('Praha', 'PHA', 'Czech Republic', 'CZ'))
    con.commit()

    # select
    cursor.execute('SELECT * FROM region')

    rows = cursor.fetchall()

    for row in rows:
        print(row)

    cursor.close()

    # Closing conection to database
    con.close()
