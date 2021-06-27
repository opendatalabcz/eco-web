import './App.css';
import { DarkProvider } from './Components/DarkContext';
import { SideBarVisibilityContext } from './Components/SideBar/SideBarVisibilityContext';
import { ButtonsVisibilityProvider } from './Components/TopBar/ButtonsVisibilityContext';
import TopBar from './Components/TopBar/TopBar';
import Sidebar from './Components/SideBar/SideBar';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import HomePage from './Pages/HomePage';
import TemperatureSelectionPage from './Pages/TemperatureSelectionPage';
import { DataOptionsProvider } from './Components/DataOptions/SelectedOptions';
import 'fontsource-roboto';
import GraphPage from './Pages/GraphsPage';
import LegalPage from './Pages/LegalPage';
import HelpPage from './Pages/HelpPage';
import PressureSelectionPage from './Pages/PressureSelectionPage';
import PrecipitationSelectionPage from './Pages/PrecipitationSelectionPage';
import ShineSelectionPage from './Pages/ShineSelectionPage';
import WaterSelectionPage from './Pages/WaterSelectionPage';
import SnowSelectionPage from './Pages/SnowSelectionPage';
import WindSelectionPage from './Pages/WindSelectionPage';
import CompareSelectPage from './Pages/CompareSelectPage';
import { CompareProvider } from './Components/DataOptions/Compare/CompareContext';
import CompareGraphPage from './Pages/CompareGraphPage';

const useStyles = makeStyles(() => ({
  AppStyle: {
    display: 'flex',
    height: '100%',
    overflow: 'clip'
  },
  SideBarContainer: {
    height: '100vh',
    width: '250px',
  },
  Container: {
    flex: '1',
    width: '100%',
    height: '100vh',
    overflowY: 'clip'
  },
  TopBarContainer: {
    width: '100%',
    minWidth: '360px',
    height: '55px',
    overflowX: 'clip'
  },
  ContentContainer: {
    width: '100%',
    height: 'calc(100% - 55px)',
    overflowY: 'auto',
    overflowX: 'clip'
  }
}));

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI,
  cache: new InMemoryCache()
});

function App() {
  const classes = useStyles();
  const [isVisible] = useContext(SideBarVisibilityContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={ classes.AppStyle }>
      <ApolloProvider client={ client }>
        <DarkProvider>
          <Router>
            { isVisible 
              ? (
                  <div className={ classes.SideBarContainer }>
                    <Sidebar />
                  </div>
                )
              : null 
            }
            <div className={ classes.Container }>
              <ButtonsVisibilityProvider>
                <DataOptionsProvider>
                  <div className={ classes.TopBarContainer }>
                    <TopBar />
                  </div>
                  <div className={ classes.ContentContainer }>
                    <CompareProvider>
                      <Switch>
                        <Route path='/' exact component={ HomePage } />
                        <Route path='/meteo/daylight' exact component={ ShineSelectionPage } />
                        <Route path='/meteo/precipitation' component={ PrecipitationSelectionPage } exact />
                        <Route path='/meteo/pressure' exact component={ PressureSelectionPage } />
                        <Route path='/meteo/snow' exact component={ SnowSelectionPage } />
                        <Route path='/meteo/temperature' exact component={ TemperatureSelectionPage } />
                        <Route path='/meteo/wind' exact component={ WindSelectionPage } />
                        <Route path='/hydro/waterflow' exact component={ WaterSelectionPage } />
                        <Route path='/legal' exact component={ LegalPage } />
                        <Route path='/help' exact component={ HelpPage } />
                        <Route path='/graph' exact component={ GraphPage } />
                        <Route path='/compare/select' exact component={ CompareSelectPage } />
                        <Route path='/compare/graph' exact component={ CompareGraphPage } />
                      </Switch>
                    </CompareProvider>
                  </div>
                </DataOptionsProvider>
              </ButtonsVisibilityProvider>
            </div>
          </Router>
        </DarkProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
