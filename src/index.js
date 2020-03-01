import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { 
    ThemeProvider as MuiThemeProvider,
    StylesProvider 
} from '@material-ui/core/styles';
import theme from './theme';
import configureStore from 'store/configureStore';

import App from 'components/App/App';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    </Provider>, 
    document.getElementById('root')
);

