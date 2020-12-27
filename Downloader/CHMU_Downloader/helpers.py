import requests
import zipfile
#import matplotlib.pyplot as plt

def downloadFromURL(url: str, path: str, chunkSize: int = 128):
    r = requests.get(url, stream = True)
    with open(path, mode='wb', encoding='utf-8') as file:
        for chunk in r.iter_content(chunk_size = chunkSize):
            file.write(chunk)

def processDataFromZIPFile(zipPath: str, destinationPath: str):
    zFile = zipfile.ZipFile(zipPath, 'r')
    #for fileName in zFile.namelist():
    #    print 'File:', fileName,
    #    bytes = z.read(fileName)
    #    print 'has', len(bytes),'bytes'

def generateFileName(region: str, station: str, dataType: str) -> str:
    result = ""

def generateURL(APIUrl: str, region: str, dataType: str, fileName: str) -> str:
    # datatype = denni_data/T-AVG

    #https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Praha/P1PKAR01_T_N.csv.zip
    result = "https://www.chmi.cz/files/portal/docs/meteo/ok/" + dataType + "/" + region + "/" + fileName 

#def plotData(data):
#    plt.plot([1, 2, 3, 4])
#    plt.ylabel('some numbers')
#    plt.show()