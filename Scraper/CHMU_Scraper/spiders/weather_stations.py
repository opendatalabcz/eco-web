import scrapy
from scrapy_splash import SplashRequest
from CHMU_Scraper.items import StationItem

#tmp
from CHMU_Scraper.items import ChmuScraperItem

from scrapy.loader import ItemLoader


class WeatherStationsSpider(scrapy.Spider):
    name = 'weather_stations'
    i = 0

    def start_requests(self):
        """Function to start scraping given URL.
        
        Arguments:
            self -- instance of the class
        Yields parsed requests
        """
        # Uses Splash by calling it in Docker image and calls parse function on returned requests
        yield SplashRequest(url='http://portal.chmi.cz/historicka-data/pocasi/denni-data/Denni-data-dle-z.-123-1998-Sb#', callback=self.parse, args={'wait': 0.5})

    def parse(self, response):
        """Function to parse given response from URL
        
        Arguments:
            self -- instance of the class
            response -- response to parse
        Yields parsed given request
        """
        # Finds all hyperlinks for data type navigation and extracs its properties
        for hyperlink in response.xpath("//div[@id='loadedcontent']/ul/li"):
            yield {
                'hyperlink_name': hyperlink.xpath(".//a/text()").extract_first(),
                'hyperlink_url': hyperlink.xpath(".//a/@href").extract_first(),
            }
        # If 5 page treshold wasn't met, look for another page and if exists, scrape it
        #if self.i < 5:
        #    self.i += 1
        #    next_page = response.xpath('//*[@id="modern2019-list"]/nav/ul/li[11]/a/@href').extract_first()
        #    if next_page is not None:
        #        yield SplashRequest(url=self.base_url + next_page, callback=self.parse)
