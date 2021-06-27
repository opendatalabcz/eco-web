import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { DarkContext } from '../../DarkContext';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    Container: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex'
    },
}));

function Graph(props) {
    const classes = useStyles();
    const [isDark] = useContext(DarkContext);

    return (
        <div className={ classes.Container }>
            <Plot
                data={ props.data }
                layout={ {
                    showlegend: true,
                    height: 500,
                    width: 1000,
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    font: {
                        family: 'Roboto',
                        color: isDark ? 'white' : 'black'
                    },
                    title: {
                        text: props.title,
                        font: {
                          family: 'Roboto',
                          size: 24,
                          color: isDark ? 'white' : 'black'
                        }
                    },
                    xaxis: {
                        title: {
                            text: props.axisLabels.x,
                            font: {
                                family: 'Roboto',
                                size: 18,
                                color: isDark ? 'white' : 'black'
                            }
                        },
                    },
                    yaxis: {
                        title: {
                            text: props.axisLabels.y,
                            font: {
                                family: 'Roboto',
                                size: 18,
                                color: isDark ? 'white' : 'black'
                            }
                        }
                    }
                } }
                config={ { responsive: true } }
            />
        </div>
    )
}

export default Graph
