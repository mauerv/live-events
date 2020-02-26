import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from '../reducers';

export default () => {
    const middlewares = [thunk]
    const middlewareEnhancer = applyMiddleware(...middlewares)
  
    const storeEnhancers = [middlewareEnhancer]
  
    const composedEnhancer = composeWithDevTools(...storeEnhancers)

    const store = createStore(
        rootReducer,
        composedEnhancer
    );
      
    if (module.hot && process.env.NODE_ENV !== 'production') {
        module.hot.accept('../reducers', () => {
            const newRootReducer = require('../reducers').default
            store.replaceReducer(newRootReducer)
        })
	}

    return store;
}