import './App.css';
import { LanguageProvider } from './Components/LanguageContext';
import { DarkProvider } from './Components/DarkContext';
import TopBar from './Components/TopBar';
import Sidebar from './Components/SideBar';
import { Grid } from '@material-ui/core';
import 'fontsource-roboto';

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <DarkProvider>
          <Grid container direction='row' justify='flex-start' alignItems='center'>
            <Grid item xs={ false } md={ 2 } >
              <Sidebar />
            </Grid>
            <Grid item xs={ 12 } md={ 10 }>
              <TopBar />
            </Grid>
          </Grid>
        </DarkProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
