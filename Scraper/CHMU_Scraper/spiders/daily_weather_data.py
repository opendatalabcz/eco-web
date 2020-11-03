import scrapy
from CHMU_Scraper.items import ChmuScraperItem
from scrapy.loader import ItemLoader


class DailyWeatherDataSpider(scrapy.Spider):
    name = 'daily_weather_data'
    start_urls = [
        'http://portal.chmi.cz/historicka-data/pocasi/denni-data/Denni-data-dle-z.-123-1998-Sb#'
    ]

    def parse(self, response):
        for dataType in response.xpath("//div[@id='loadedcontent']/ul/li"):
            l = ItemLoader(item=ChmuScraperItem(), selector=dataType)
            l.add_xpath('text', ".//a")
            yield l.load_item()