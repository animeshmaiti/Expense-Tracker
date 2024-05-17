import './App.css';
import { Grid } from '@mui/material';

import { Details } from './components/Dtails/Details';

function App() {
  return (
    <div>
     <Grid container spacing={0} alignItems='center' justify='center' style={{height: '100vh'}}>
      <Grid item xs={12} sm={4}>
        <details />
      </Grid>
      <Grid item xs={12} sm={4}>
        Main
      </Grid>
      <Grid item xs={12} sm={4}>
        <details />
      </Grid>
     </Grid>
    </div>
  );
}

export default App;
