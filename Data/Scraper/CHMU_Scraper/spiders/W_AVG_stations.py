import re
import scrapy
import unidecode


class AverageTemperatureStationsSpider(scrapy.Spider):
    name = 'W_AVG_stations'

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

    def generateURL(self, region: str) -> str:
        if region == 'Kralovehradecky':
            region = 'hradecky'
        return 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/HTML/' + region.lower() + '.html'
    
    def start_requests(self):
        """Function to start scraping given URL.

        Arguments:
            self -- instance of the class
        Yields parsed requests
        """
        regionID = 0
        for region in self.regions:
            # Calling pages for all regions and calls back parse function on them
            yield scrapy.Request(
                url=self.generateURL(region),
                callback=self.parse,
                cb_kwargs=dict(regionID=regionID),
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
        for hyperlink in response.xpath('//html/body/a'):
            self.id += 1
            stationName = hyperlink.xpath(".//text()").extract_first()
            fileName = re.search(r'^[0-9]{6}', stationName).group(0)
            result = re.sub(r'^[0-9]{6}, ', '', stationName)
            normalizedName = unidecode.unidecode(result).replace(" ", "")
            yield {
                'id': self.id,
                'region': self.regions[regionID],
                'station_name': result,
                'normalized_name': normalizedName,
                'file_name': fileName
            }
