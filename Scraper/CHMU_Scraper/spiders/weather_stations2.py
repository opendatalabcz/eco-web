import scrapy
from selenium import webdriver

from CHMU_Scraper.items import ChmuScraperItem

from scrapy.loader import ItemLoader

class WeatherStationsSpider(scrapy.Spider):
    # Scraper name
    name = "weather2"
    start_urls = ['http://portal.chmi.cz/historicka-data/pocasi/denni-data/Denni-data-dle-z.-123-1998-Sb#']

    def __init__(self):
        self.driver = webdriver.Chrome()

    def parse(self, response):
        self.driver.get(response.url)

        #//div[@id="loadedcontent"]/ul/li
        for data in self.driver.find_elements_by_xpath('//*[@id="loadedcontent"]/ul/li'):
            l = ItemLoader(item=ChmuScraperItem(), selector=data)
            l.add_xpath('text', ".//a/@href")
            yield l.load_item()

        self.driver.close()
