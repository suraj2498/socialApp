import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import {logoutUser, getUserData } from './redux/actions/userActions';

// pages
import Home from './pages/home';
import Register from './pages/register';
import Login  from './pages/login';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute'; 


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#030304',
      contrastText: '#fff'
    },
    secondary: {
      main: '#1A73E8',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
})

const token = localStorage.FBToken;
if(token){
  const decodedToken = jwtDecode(token);
  // How to convert exp time to date format
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = "/login"; 
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home}/>
                <AuthRoute exact path='/register' component={Register}/>
                <AuthRoute exact path='/login' component={Login}/>
              </Switch>
            </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
