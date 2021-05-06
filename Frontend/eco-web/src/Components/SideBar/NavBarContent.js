import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandMoreSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandLessSharp';

export const NavBarContent = [
    {
        title: 'homePage',
        path: '/'
    },
    {
        title: 'meteo',
        expandIcon: <ExpandMoreIcon />,
        colapseIcon: <ExpandLessIcon />,
        subNav: [
            {
                title: 'daylight',
                path: '/meteo/daylight'
            },
            {
                title: 'precipitation',
                path: '/meteo/precipitation'
            },
            {
                title: 'pressure',
                path: '/meteo/pressure'
            },
            {
                title: 'snow',
                path: '/meteo/snow'
            },
            {
                title: 'temperature',
                path: '/meteo/temperature'
            },
            {
                title: 'wind',
                path: '/meteo/wind'
            }
        ]
    },
    {
        title: 'hydro',
        expandIcon: <ExpandMoreIcon />,
        colapseIcon: <ExpandLessIcon />,
        subNav: [
            {
                title: 'waterflow',
                path: '/hydro/waterflow'
            }
        ]
    },
    {
        title: 'forestry',
        path: '/forestry'
    },
    {
        title: 'legal',
        path: '/legal'
    },
    {
        title: 'help',
        path: '/help'
    }
]
