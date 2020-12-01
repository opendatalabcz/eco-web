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
**1.)** First step is to install Python and Conda on your machine. You can use these links for **[Miniconda](https://docs.conda.io/en/latest/miniconda.html)** 
and **[VS Code IDE](https://code.visualstudio.com/)**.\
**2.)** *Optional* - If you are using VS Code, you have to install the Python module from the modules store in VS Code. For more help about installation process in VS Code,
follow this **[link](https://code.visualstudio.com/docs/python/python-tutorial)**.\
**3.)** Open CMD on Windows or Terminal on Linux and macOS in VS Code or standalone and in eco-web/Scraper directory run this command **conda env update**.\
**4.)** Install **[Docker](https://www.docker.com/products/docker-desktop)**.\
**5.)** Start Docker.\
**6.)** Run **docker pull scrapinghub/splash** command in PowerShell if using Windows or in terminal on macOS. In case of using Linux, run **sudo docker pull scrapinghub/splash**
in terminal.\
**7.)** If you are using **Docker Desktop**, open **images** tab and run Splash container on port **8050**. Later you can just start Splash container from Containers tab. On Linux, use **docker run -p 8050:8050 scrapinghub/splash** command in Terminal.\
**8.)** Run command **conda bakalarka activate** to start environment which contains all needed libraries and plugins for Python.\
**9.)** Run command **scrapy crawl [spider_name] -o [output_name]** to start the selected spider.
