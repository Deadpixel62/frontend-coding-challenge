import { create } from 'dva-core';
import { Provider } from 'react-redux';

let registered = false; 

export default function dva(options) {
  const app = create(options);

  if (!registered) {
    options.models.forEach((model) => app.model(model));
    registered = true; 
  }

  app.start();
  const store = app._store;

  app.start = (container) => () => <Provider store={store}>{container}</Provider>;
  app.getStore = () => store;

  return app;
}
