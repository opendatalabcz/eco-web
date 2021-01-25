# Eco-web
Eco web based on open data as a goal of bachelor thesis

## What is this project about?

Reason for this project is to implement a web page, which is user friendly and modern looking, to visualize data about temperature and water from Czech Republic.
But it is not just about visualising, but also about getting data from Czech Hydrometeorological Institute and processing them so the web can show them. Whole this project
is created as a bachelor thesis on Czech Technical University, Faculty of Information Technology and author is Roman Soběslav, <sobesrom@fit.cvut.cz>.

## Data source and disclaimer

All data used in this project comes from Czech Hydrometeorological Institute. They are open data and usable by law 123/1998 Sb. 
with this **[license](http://portal.chmi.cz/files/portal/docs/meteo/ok/denni_data/Podminky_uziti_udaju.pdf)**. Also this project is not sponsored by 
Czech Hydrometeorological Institute or supported in any way. This project just uses their open data.

## What does this repository contain?

The repository contains a web scraper for downloading data from Czech Hydrometeorological Institute.

## How to install

###### Scraper
**1.)** First step is to install Python and Conda on your machine. You can use this link for **[Miniconda](https://docs.conda.io/en/latest/miniconda.html)**.\
**2.)** Open CMD on Windows or Terminal on Linux and macOS and in eco-web/Scraper directory run this command **conda env update**.\
**3.)** Install **[Docker](https://www.docker.com/products/docker-desktop)**.\
**4.)** Start Docker.\
**5.)** Run **docker pull scrapinghub/splash** command in PowerShell if using Windows or in terminal on macOS. In case of using Linux, run **sudo docker pull scrapinghub/splash**
in terminal.\
**6.)** If you are using **Docker Desktop**, open **images** tab and run Splash container on port **8050**. Later you can just start Splash container from Containers tab. On Linux, use **docker run -p 8050:8050 scrapinghub/splash** command in Terminal.\
**7.)** Run command **conda activate eco-web** to start environment which contains all needed libraries and plugins for Python.\
**8.)** Run command **scrapy crawl [spider_name] -o [output_name]** from the Spider directory to start the selected spider.

###### Downloader
**1.)** First step is to install Python and Conda on your machine, if not already done. You can use this link for **[Miniconda](https://docs.conda.io/en/latest/miniconda.html)**.\
**2.)** Open CMD on Windows or Terminal on Linux and macOS and in eco-web/Downloader directory run this command **conda env update** if not already done *(Scraper and Downloader uses the same environment)*.\
**3.)** Run command **conda activate eco-web** to start environment which contains all needed libraries and plugins for Python.\
**4.)** *Optional* - Run command **python CHMI_Downloader -h** from Downloader directory to get help  *(recommended if using first time)* and to list all the options you can use.\
**5.)** Run command **python CHMI_Downloader** or **python CHMU_Downloader [your_chosen_options]** from the Downloader directory to use the downloader.
