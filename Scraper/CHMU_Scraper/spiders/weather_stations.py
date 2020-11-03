import scrapy
from CHMU_Scraper.items import StationItem

#tmp
from CHMU_Scraper.items import ChmuScraperItem

from scrapy.loader import ItemLoader


class WeatherStationsSpider(scrapy.Spider):
    name = 'weather_stations'
    start_urls = [
        'http://portal.chmi.cz/historicka-data/pocasi/denni-data/Denni-data-dle-z.-123-1998-Sb#'
    ]
    headers = {
        "Referer": "http://portal.chmi.cz/historicka-data/pocasi/denni-data/Denni-data-dle-z.-123-1998-Sb",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36"
    }

    def parse(self, response):
        url = 'http://portal.chmi.cz/files/portal/docs/meteo/ok/denni_data/denni_data_cs.html'

        yield scrapy.Request(url, callback=self.parse_api, headers=self.headers)

    def parse_api(self, response):
        for dataType in response.xpath("//html/body/ul/li"):
            l = ItemLoader(item=ChmuScraperItem(), selector=dataType)
            l.add_xpath('text', ".//a/@href")
            yield l.load_item()
