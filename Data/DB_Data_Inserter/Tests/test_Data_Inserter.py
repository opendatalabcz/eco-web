import os
import pytest
import pandas as pd
from Data_Inserter import helpers as h


# 1st decorator arg ~ argument name
# 2nd decorator arg ~ iterable
@pytest.mark.parametrize(
    'path, debug, expected',
    [
        ('./TestStructure', 'false', 'true'),
        ('./TestStructure2', 'false', 'false')
    ])
def test_checkStructure(path, debug, expected):
    assert expected == h.checkStructure(path, debug)
