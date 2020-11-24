import scrapy
from scrapy_splash import SplashRequest

class AAAautoScraper(scrapy.Spider):
    name = 'AAAAuto2'

    def start_requests(self):
        """Function to start scraping given URL.
        
        Arguments:
            self -- instance of the class

        Yields parsed requests
        """
        # Uses Splash by calling it in Docker image and calls parse function on returned requests
        yield SplashRequest(url='https://www.aaaauto.cz/4x4-offroad-suv/?srclp=hp4x4&category=15&pmin=150000&pmax=500000', callback=self.parse)

    def parse(self, response):
        """Function to parse given response from URL
        
        Arguments:
            self -- instance of the class
            response -- response to parse

        Yields parsed given request
        """
        # Finds all cars container and extracs its properties
        for car in response.xpath("//div[@class='card box']"):
            yield {
                'car_name': car.xpath(".//div[2]/h2/a/text()").extract_first(),
                'year': car.xpath(".//div[2]/h2/a/span/text()").extract_first(),
                'mileage': car.xpath('.//div[2]/ul/li[1]/text()').extract_first(),
                'gearbox': car.xpath('.//div[2]/ul/li[2]/text()').extract_first(),
                'fuel_type': car.xpath('.//div[2]/ul/li[3]/text()').extract_first(),
                'engine': car.xpath('.//div[2]/ul/li[4]/text()').extract_first(),
            }
