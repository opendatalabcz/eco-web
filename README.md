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

The repository contains a frontend directory, which contains source code for React.js web application. Next directory is Data, which contains a web scraper for downloading stations IDs for all Czech regions from Czech Hydrometeorological Institute, Downloader for downloading all daily historical data and Data inserter for inserting them into Postgres database. There is also a Create script for the database in Scripts directory.

## How to install

###### Scraper
**1.)** First step is to install Python and Conda on your machine. You can use this link for **[Miniconda](https://docs.conda.io/en/latest/miniconda.html)**.\
**2.)** Open CMD on Windows or Terminal on Linux and macOS and in eco-web/Data directory run this command **conda env update**.\
**3.)** Move to the Scraper directory.\
**4.)** Run command **conda activate eco-web** to start environment which contains all needed libraries and plugins for Python.\
**5.)** Run command **scrapy crawl [spider_name] -o [output_name]** from the Spider directory to start the selected spider.

###### Downloader
**1.)** First step is to install Python and Conda on your machine, if not already done. You can use this link for **[Miniconda](https://docs.conda.io/en/latest/miniconda.html)**.\
**2.)** Open CMD on Windows or Terminal on Linux and macOS and in eco-web/Data directory run this command **conda env update** if not already done *(Scraper, Downloader and Data inserter uses the same environment)*.\
**3.)** Move to the Downloader directory.\
**4.)** Run command **conda activate eco-web** to start environment which contains all needed libraries and plugins for Python.\
**5.)** *Optional* - Run command **python CHMI_Downloader -h** from Downloader directory to get help  *(recommended if using first time)* and to list all the options you can use.\
**6.)** Run command **python CHMI_Downloader** or **python CHMI_Downloader [your_chosen_options]** from the Downloader directory to use the downloader.

###### Data Inserter
**1.)** First step is to install Python and Conda on your machine, if not already done. You can use this link for **[Miniconda](https://docs.conda.io/en/latest/miniconda.html)**.\
**2.)** Open CMD on Windows or Terminal on Linux and macOS and in eco-web/Data directory run this command **conda env update** if not already done *(Scraper, Downloader and Data inserter uses the same environment)*.\
**3.)** Move to the DB_Data_Inserter directory.\
**4.)** Run command **conda activate eco-web** to start environment which contains all needed libraries and plugins for Python.\
**5.)** *Optional* - Run command **python Data_Inserter -h** from DB_Data_Inserter directory to get help  *(recommended if using first time)* and to list all the options you can use.\
**6.)** Run command **python Data_Inserter** or **python Data_Inserter [your_chosen_options]** from the DB_Data_Inserter directory to use the data inserter.

###### Database, Backend and Frontend with Docker
**1.)** Install [Docker](https://www.docker.com/) with Docker compose.\
**2.)** Install [pgAdmin](https://www.pgadmin.org/).\
**3.)** Create .env files in root, backend and frontend/eco-web directory. Fill in all informations.\
**4.)** Run command **Docker Compose up -d** in command line from projects root directory.\
**5.)** Open pgAdmin.\
**6.)** Add created database server.\
**7.)** Create new database server by pressing right button and then **create new database**.\
**8.)** Use Data Inserter with create script included in Data/Scripts or use dump file which is available [here](https://owncloud.cesnet.cz/index.php/s/qnZhs7KeP3eXaLr). In second case, press right button and use **Restore** option.\
**9.)** All done, enjoy your web application.

###### Database without Docker
Application was created primarily to run databases in Docker. If you want to use Your own database or Docker image, please follow instructions found in the official documentation.

###### Backend without Docker
**1.)** Install [NodeJS](https://nodejs.org/en/).\
**2.)** Move to the Backend folder.\
**3.)** Create and fill .env file.\
**4.)** Run **npm install** command.\
**5.)** Run **npm start** command.

###### Frontend without Docker
**1.)** Install [NodeJS](https://nodejs.org/en/).
**2.)** Move to the Frontend/eco-web folder.\
**3.)** Create and fill .env file.\
**4.)** Run **npm install** command.\
**5.)** Run **npm start** command.
