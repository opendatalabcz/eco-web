from CHMU_Downloader import helpers as h
import pytest

# 1st decorator arg ~ argument name
# 2nd decorator arg ~ iterable
@pytest.mark.parametrize(
    'region, station, dataType, expected', 
    [
    ])
def test_generateFileName(region, station, dataType, expected):
    assert expected == h.generateFileName(region, station, dataType)

@pytest.mark.parametrize(
    'APIUrl, region, dataType, fileName, expected',
    [
    ])
def test_generateURL(APIUrl, region, dataType, fileName, expected):
    assert expected == h.generateURL(APIUrl, region, dataType, fileName)