import scrapy
from scrapy_splash import SplashRequest
from CHMU_Scraper.items import StationItem

#tmp
from CHMU_Scraper.items import ChmuScraperItem

from scrapy.loader import ItemLoader


class WeatherStationsSpider(scrapy.Spider):
    name = 'weather_stations'

    # Lua script for splash for navigation on webpage, because it's using JavaScript
    script="""
        function main(splash, args)
            assert(splash:go(args.url))
            assert(splash:wait(1))
            js = string.format("document.querySelector('#loadedcontent > ul > li:nth-child(1) > a').click()", args.page)
            splash:runjs(js)
            assert(splash:wait(1))
            js = string.format("document.querySelector('#loadedcontent > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').click()", args.page)
            splash:runjs(js)
            assert(splash:wait(1))
            return {
                html = splash:html(),
            }
        end
    """

    def start_requests(self):
        """Function to start scraping given URL.
        
        Arguments:
            self -- instance of the class
        Yields parsed requests
        """
        # Uses Splash by calling it in Docker image and calls parse function on returned requests. Using lua script to navigate through page
        yield SplashRequest(url='http://portal.chmi.cz/historicka-data/pocasi/denni-data/Denni-data-dle-z.-123-1998-Sb#', callback=self.parse, endpoint='execute', args={'wait': 20, 'lua_source': self.script})

    def parse(self, response):
        """Function to parse given response from URL
        
        Arguments:
            self -- instance of the class
            response -- response to parse
        Yields parsed given request
        """
        # Finds all stations and extracs its name
        for hyperlink in response.xpath('//*[@id="loadedcontent"]/a'):
            yield {
                'station_name': hyperlink.xpath(".//text()").extract_first(),
            }