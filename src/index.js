import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { StylesProvider } from '@material-ui/styles';
import configureStore from './store/configureStore';

import App from './components/App/App';

const store = configureStore();

ReactDOM.render(
    <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </MuiThemeProvider>
    </StylesProvider>, 
    document.getElementById('root')
);
