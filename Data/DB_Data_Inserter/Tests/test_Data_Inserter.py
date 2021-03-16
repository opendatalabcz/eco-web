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
