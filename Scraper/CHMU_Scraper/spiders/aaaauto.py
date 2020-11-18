import scrapy
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class AAAautoScraper(scrapy.Spider):
    name = 'AAAAuto'
    allowed_domains = ['https://www.aaaauto.cz/']

    def start_requests(self):
        url = "https://www.aaaauto.cz/"
        yield scrapy.Request(url=url, callback=self.parse_cars)

    def parse_cars(self, response):
        driver = webdriver.Chrome()

        #driver.get("https://www.aaaauto.cz/skoda/karoq/2011.html#!&make=109&model=36690&ymin=2011&kmmin=290000&pmin=60000&pmax=260000&ymax=2014")
        driver.get("https://www.aaaauto.cz/4x4-offroad-suv/?srclp=hp4x4&category=15&pmin=150000&pmax=500000")
        driver.implicitly_wait(10)

        wait = WebDriverWait(driver, 15)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "carFeatures")))

        cars = driver.find_elements_by_class_name("carFeatures")
        
        for car in cars:
            yield {
                "car name": car.text,
            }
        
        driver.quit()
        