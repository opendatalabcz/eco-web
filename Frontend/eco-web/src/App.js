import './App.css';
import { DarkProvider } from './Components/DarkContext';
import { SideBarVisibilityContext } from './Components/SideBar/SideBarVisibilityContext';
import { ButtonsVisibilityProvider } from './Components/TopBar/ButtonsVisibilityContext';
import TopBar from './Components/TopBar/TopBar';
import Sidebar from './Components/SideBar/SideBar';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import HomePage from './Pages/HomePage';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
  AppStyle: {
    display: 'flex',
    height: '100%'
  },
  SideBarContainer: {
    height: '100vh',
    width: '250px'
  },
  Container: {
    flex: '1',
    width: '100%'
  },
  TopBarContainer: {
    width: '100%',
    minWidth: '350px'
  },
  ContentContain5er: {
    width: '100%',
    height: '100%'
  }
}));

function App() {
  const classes = useStyles();
  const [isVisible] = useContext(SideBarVisibilityContext);

  return (
    <div className={ classes.AppStyle }>
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
              <div className={ classes.TopBarContainer }>
                <TopBar />
              </div>
              <div className={ classes.ContentContainer }>
                <Switch>
                  <Route path='/' exact component={ HomePage } />
                  <Route path='/meteo/daylight' exact />
                  <Route path='/meteo/precipitation' exact />
                  <Route path='/meteo/pressure' exact />
                  <Route path='/meteo/snow' exact />
                  <Route path='/meteo/temperature' exact />
                  <Route path='/meteo/wind' exact />
                  <Route path='/hydro/waterflow' exact />
                  <Route path='/forestry' exact />
                  <Route path='/legal' exact />
                  <Route path='/help' exact />
                </Switch>
              </div>
            </ButtonsVisibilityProvider>
          </div>
        </Router>
      </DarkProvider>
    </div>
  );
}

export default App;
