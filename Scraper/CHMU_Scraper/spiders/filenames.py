import scrapy
import unidecode
import re


class FilenamesSpider(scrapy.Spider):
    name = 'filenames'
    allowed_domains = ['chmi.cz']
    start_urls = [
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.BR.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.CB.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.HK.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.OS.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.PL.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.PR.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.UL.1.html',
    ]
    custom_settings = {
        'CONCURRENT_REQUESTS': 1,
        'DOWNLOAD_DELAY': 5
    }
    id = -1

    def parse(self, response):
        for hyperlink in response.xpath('//*[@id="CR"]/map/area'):
            self.id += 1
            output: str = hyperlink.xpath(".//@href").extract_first()
            fileName = re.search(r'(?<=\-)(.*?)(?=\.)', output)
            if fileName:
                yield {
                    'id': self.id,
                    'branch': unidecode.unidecode(response.xpath('/html/body/h1/text()').extract_first()).replace(" ", "_"),
                    'station_name': fileName.group(0)
                }
