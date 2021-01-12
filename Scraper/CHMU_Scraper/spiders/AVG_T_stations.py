import re
import scrapy
import unidecode
from scrapy_splash import SplashRequest


class AverageTemperatureStationsSpider(scrapy.Spider):
    name = 'AVG_T_stations'

    # Set custom settings so pages will be downloaded one by one with delay, so it doesn't load the server that much
    custom_settings = {
        'CONCURRENT_REQUESTS': 1,
        'DOWNLOAD_DELAY': 5
    }
    # Row ID
    id = -1
    # List of regions from whcich comes stations
    regions = [
        'Praha',
        'Stredocesky',
        'Jihocesky',
        'Plzensky',
        'Karlovarsky',
        'Ustecky',
        'Liberecky',
        'Kralovehradecky',
        'Pardubicky',
        'Vysocina',
        'Jihomoravsky',
        'Olomoucky',
        'Moravskoslezsky',
        'Zlinsky',
    ]

    def start_requests(self):
        """Function to start scraping given URL.

        Arguments:
            self -- instance of the class
        Yields parsed requests
        """
        regionID = 0
        for row in range(1, 8):
            for column in range(1, 3):
                # Uses Splash by calling it in Docker image and calls parse function on returned requests. Using lua script to navigate through page
                yield SplashRequest(
                    url='http://portal.chmi.cz/historicka-data/pocasi/denni-data/Denni-data-dle-z.-123-1998-Sb#',
                    callback=self.parse,
                    cb_kwargs=dict(regionID=regionID),
                    endpoint='execute',
                    args={'wait': 30, 'lua_source': self.generateScript(row, column)}
                )
                regionID += 1

    def parse(self, response, regionID):
        """Function to parse given response from URL

        Arguments:
            self -- instance of the class
            response -- response to parse
        Yields parsed given request
        """
        # For each station it founds, it stores it's ID, name, convets name to normalized version (without spaces and diacritics) and region
        for hyperlink in response.xpath('//*[@id="loadedcontent"]/a'):
            self.id += 1
            stationName = hyperlink.xpath(".//text()").extract_first()
            result = re.split(r', [\d]*-[\d]*$', stationName)[0]
            normalizedName = unidecode.unidecode(result).replace(" ", "")
            yield {
                'id': self.id,
                'region': self.regions[regionID],
                'station_name': result,
                'normalized_name': normalizedName
            }

    def generateScript(self, row: int, column: int) -> str:
        """Function to generate lua script for navigation on page to retrieve needed html from table

        Arguments:
            self -- instance of the class
            row -- index of row in range from 1 to 15
            column -- index of column in range from 1 to 3
        Yields parsed given request
        """
        if row < 1 or row > 14 or column < 1 or column > 2:
            return None
        # Lua script for splash for navigation on webpage, because it's using JavaScript
        script = """
            function main(splash, args)
                assert(splash:go(args.url))
                assert(splash:wait(3))
                js = string.format("document.querySelector('#loadedcontent > ul > li:nth-child(1) > a').click()", args.page)
                splash:runjs(js)
                assert(splash:wait(3))
                js = string.format("document.querySelector('#loadedcontent > table > tbody > tr:nth-child(""" + str(row) + """) > td:nth-child(""" + str(column) + """) > a').click()", args.page)
                splash:runjs(js)
                assert(splash:wait(3))
                return {
                    html = splash:html(),
                }
            end
        """
        return script
