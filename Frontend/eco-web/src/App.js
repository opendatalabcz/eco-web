import './App.css';
import { DarkProvider } from './Components/DarkContext';
import TopBar from './Components/TopBar';
import Sidebar from './Components/SideBar/SideBar';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'fontsource-roboto';

const useStyles = makeStyles(() => ({
  AppStyle: {
    display: 'flex'
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
    width: '100%'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={ classes.AppStyle }>
      <DarkProvider>
        <Router>
          <div className={ classes.SideBarContainer }>
            <Sidebar />
          </div>
          <div className={ classes.Container }>
            <div className={ classes.TopBarContainer }>
              <TopBar />
            </div>
            <div>
              <Switch>
                <Route path='/' exact />
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
          </div>
        </Router>
      </DarkProvider>
    </div>
  );
}

export default App;
