import os
import pytest
import pandas as pd
from CHMU_Downloader import helpers as h


# 1st decorator arg ~ argument name
# 2nd decorator arg ~ iterable
@pytest.mark.parametrize(
    'station, dataType, expected',
    [
        ('H3SKUT01', 'T-AVG', 'H3SKUT01_T_N.csv.zip'),
        ('C1SUSI01', 'TMI', 'C1SUSI01_TMI_N.csv.zip'),
        ('C1SUSI01', 'TMA', 'C1SUSI01_TMA_N.csv.zip'),
        ('C1SUSI01', 'SRA', 'C1SUSI01_SRA_N.csv.zip'),
        ('C1SUSI01', 'H-AVG', 'C1SUSI01_H_N.csv.zip'),
        ('C1SUSI01', 'SNO', 'C1SUSI01_SNO_N.csv.zip'),
        ('C1SUSI01', 'SCE', 'C1SUSI01_SCE_N.csv.zip'),
        ('L1PLZM01', 'SSV', 'L1PLZM01_SSV_N.csv.zip'),
        ('L1PLZD01', 'P-AVG', 'L1PLZD01_P_N.csv.zip'),
        ('C1SUSI01', 'F-AVG', 'C1SUSI01_F_N.csv.zip'),
        ('L1DOMA01', 'Fmax', 'L1DOMA01_Fmax_N.csv.zip'),
        ('370500', 'W-AVG', 'QD_370500.zip')
    ])
def test_generateFileName(station, dataType, expected):
    assert expected == h.generateFileName(station, dataType)


@pytest.mark.parametrize(
    'region, dataType, fileName, expected',
    [
        ('Praha', 'T-AVG', 'P1PKAR01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Praha/P1PKAR01_T_N.csv.zip'),
        ('Jihocesky', 'T-AVG', 'C2BYNO01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Jihocesky/C2BYNO01_T_N.csv.zip'),
        ('Jihomoravsky', 'T-AVG', 'B2BOSK01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Jihomoravsky/B2BOSK01_T_N.csv.zip'),
        ('Karlovarsky', 'T-AVG', 'L3FRAL01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Karlovarsky/L3FRAL01_T_N.csv.zip'),
        ('Vysocina', 'T-AVG', 'B2PUKL01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Vysocina/B2PUKL01_T_N.csv.zip'),
        ('Kralovehradecky', 'T-AVG', 'H3DOBC01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Kralovehradecky/H3DOBC01_T_N.csv.zip'),
        ('Liberecky', 'T-AVG', 'U2LIBC01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Liberecky/U2LIBC01_T_N.csv.zip'),
        ('Moravskoslezsky', 'T-AVG', 'O1KRNO01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Moravskoslezsky/O1KRNO01_T_N.csv.zip'),
        ('Olomoucky', 'T-AVG', 'O7BEAD01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Olomoucky/O7BEAD01_T_N.csv.zip'),
        ('Pardubicky', 'T-AVG', 'H3ZAJE01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Pardubicky/H3ZAJE01_T_N.csv.zip'),
        ('Plzensky', 'T-AVG', 'L1PLZD01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Plzensky/L1PLZD01_T_N.csv.zip'),
        ('Stredocesky', 'T-AVG', 'P3BENS01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Stredocesky/P3BENS01_T_N.csv.zip'),
        ('Ustecky', 'T-AVG', 'U1JIRK01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Ustecky/U1JIRK01_T_N.csv.zip'),
        ('Zlinsky', 'T-AVG', 'B1HOLE01_T_N.csv.zip', 'https://www.chmi.cz/files/portal/docs/meteo/ok/denni_data/T-AVG/Zlinsky/B1HOLE01_T_N.csv.zip'),
        ('Praha', 'W-AVG', 'QD_169000.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Praha/QD_169000.zip'),
        ('Jihocesky', 'W-AVG', 'QD_106000.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Jihocesky/QD_106000.zip'),
        ('Jihomoravsky', 'W-AVG', 'QD_397500.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Jihomoravsky/QD_397500.zip'),
        ('Karlovarsky', 'W-AVG', 'QD_188900.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Karlovarsky/QD_188900.zip'),
        ('Vysocina', 'W-AVG', 'QD_049000.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Vysocina/QD_049000.zip'),
        ('Kralovehradecky', 'W-AVG', 'QD_001000.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Kralovehradecky/QD_001000.zip'),
        ('Liberecky', 'W-AVG', 'QD_082700.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Liberecky/QD_082700.zip'),
        ('Moravskoslezsky', 'W-AVG', 'QD_247100.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Moravskoslezsky/QD_247100.zip'),
        ('Olomoucky', 'W-AVG', 'QD_304400.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Olomoucky/QD_304400.zip'),
        ('Pardubicky', 'W-AVG', 'QD_024000.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Pardubicky/QD_024000.zip'),
        ('Plzensky', 'W-AVG', 'QD_135000.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Plzensky/QD_135000.zip'),
        ('Stredocesky', 'W-AVG', 'QD_066000.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Stredocesky/QD_066000.zip'),
        ('Ustecky', 'W-AVG', 'QD_205020.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Ustecky/QD_205020.zip'),
        ('Zlinsky', 'W-AVG', 'QD_370000.zip', 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Zlinsky/QD_370000.zip')
    ])
def test_generateURL(region, dataType, fileName, expected):
    assert expected == h.generateURL(region, dataType, fileName)


def test_processHydroDataFromZIPFile():
    currentDir = os.getcwd()
    testZip = currentDir + '\\Tests\\QD_169000.zip'
    outputDirPath = currentDir + '\\Tests\\Output'
    outputPath = outputDirPath + '\\QD_169000'
    os.mkdir(outputDirPath)
    os.mkdir(outputPath)
    h.processHydroDataFromZIPFile(testZip, outputPath)
    assert os.path.exists(outputPath + '\\data.csv')
    assert os.path.exists(outputPath + '\\station.csv')
    with open(outputPath + '\\data.csv', 'r') as f:
        first_line = f.readline()
        assert first_line == 'ID;Typ;Rok;Měsíc;Den;Hodnota\n'
    os.remove(outputPath + '\\data.csv')
    os.remove(outputPath + '\\station.csv')
    os.rmdir(outputPath)
    os.rmdir(outputDirPath)


def test_processMeteoDataFromZIPFile():
    currentDir = os.getcwd()
    testZip = currentDir + '\\Tests\\P1PKAR01_T_N.csv.zip'
    outputDirPath = currentDir + '\\Tests\\Output'
    outputPath = outputDirPath + '\\P1PKAR01_T_N'
    os.mkdir(outputDirPath)
    os.mkdir(outputPath)
    h.processMeteoDataFromZIPFile(testZip, outputPath)
    assert os.path.exists(outputPath + '\\data.csv')
    assert os.path.exists(outputPath + '\\station.csv')
    with open(outputPath + '\\data.csv', 'r') as f:
        first_line = f.readline()
        assert first_line == 'Rok;Měsíc;Den;Hodnota;Příznak\n'
    os.remove(outputPath + '\\data.csv')
    os.remove(outputPath + '\\station.csv')
    os.rmdir(outputPath)
    os.rmdir(outputDirPath)


def test_downloadFromURL():
    url = 'https://www.chmi.cz/files/portal/docs/hydro/denni_data/QD/Praha/QD_169000.zip'
    currentDir = os.getcwd()
    path = currentDir + '\\Tests\\Output'
    os.mkdir(path)
    h.downloadFromURL(url, path + '\\QD_169000.zip')
    assert os.path.exists(path + '\\QD_169000.zip')
    h.processHydroDataFromZIPFile(path + '\\QD_169000.zip', path)
    assert os.path.exists(path + '\\data.csv')
    assert os.path.exists(path + '\\station.csv')
    with open(path + '\\data.csv', 'r') as f:
        first_line = f.readline()
        assert first_line == 'ID;Typ;Rok;Měsíc;Den;Hodnota\n'
    os.remove(path + '\\data.csv')
    os.remove(path + '\\station.csv')
    os.remove(path + '\\QD_169000.zip')
    os.rmdir(path)
