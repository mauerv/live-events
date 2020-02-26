import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { StylesProvider } from '@material-ui/styles';
import configureStore from './store/configureStore';

const store = configureStore();

const rootEl = document.getElementById('root')

let render = () => {
    const App = require('./components/App/App').default;

    ReactDOM.render(
        <Provider store={store}>
            <StylesProvider injectFirst>
                <MuiThemeProvider theme={theme}>
                    <App />
                </MuiThemeProvider>
            </StylesProvider>
        </Provider>, 
        rootEl
    );
}

if (module.hot) {
    module.hot.accept('./components/App/App', () => {
        setTimeout(render)
    })
}

render()