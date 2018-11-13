import { mainReducer, mainRouter, mainSaga } from '../../app/services';
import configureStore from '../store/configureStore';

export default (history) => {
  const configs = {
    store: {},
    routes: {},
  };

  configs.store = configureStore(history, mainReducer, mainSaga);
  configs.routes = mainRouter();

  return configs;
};
