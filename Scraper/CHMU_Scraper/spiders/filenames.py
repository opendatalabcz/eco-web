import scrapy
import unidecode
import re


class FilenamesSpider(scrapy.Spider):
    name = 'filenames'
    allowed_domains = ['chmi.cz']
    # Ulrs for all branches - because of page design, all branches can't be accessed easily by code
    start_urls = [
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.BR.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.CB.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.HK.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.OS.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.PL.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.PR.1.html',
        'https://www.chmi.cz/files/portal/docs/poboc/OS/KW/Captor/pobocka.UL.1.html',
    ]
    # Set custom settings so pages will be downloaded one by one with delay, so it doesn't load the server that much
    custom_settings = {
        'CONCURRENT_REQUESTS': 1,
        'DOWNLOAD_DELAY': 5
    }
    # Id counter for unique row identificator
    id = -1

    def parse(self, response):
        """Function to parse given response from URL
        
        Arguments:
            self -- instance of the class
            response -- response to parse
        Yields parsed given request
        """
        # Extract branch name, remove diacritics and change spaces to underscore
        branchName = unidecode.unidecode(response.xpath('/html/body/h1/text()').extract_first()).replace(" ", "_")

        # For each map point extract it's href atribut
        for hyperlink in response.xpath('//*[@id="CR"]/map/area'):
            self.id += 1
            # Extract href atribute and use regexp to identify end extract just a station code which will be used as filename
            output: str = hyperlink.xpath(".//@href").extract_first()
            fileName = re.search(r'(?<=\-)(.*?)(?=\.)', output)
            # Check if something was found and store that if yes
            if fileName:
                yield {
                    'id': self.id,
                    'branch': branchName,
                    'station_name': fileName.group(0)
                }
