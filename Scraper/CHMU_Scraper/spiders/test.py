import scrapy
from CHMU_Scraper.items import TestItem
from scrapy.loader import ItemLoader


class TestSpider(scrapy.Spider):
    name = 'test'
    start_urls = [
        'http://quotes.toscrape.com/'
    ]

    def parse(self, response):
        for dataType in response.xpath("//div[@class='quote']"):
            l = ItemLoader(item=TestItem(), selector=dataType)
            l.add_xpath('text', ".//span[@class='text']/text()")
            yield l.load_item()

        next_page = response.xpath("//li[@class='next']/a/@href").extract_first()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback = self.parse)