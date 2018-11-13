export default (state, all = true, modules = []) => {
  if (all) {
    return {
      app: state.get('app'),
      auth: state.get('authorisation'),
      userSettings: state.get('userSettings'),
      customerIndex: state.get('customerIndex'),
      customerProfile: state.get('customerProfile'),
      customerProducts: state.get('customerProducts'),
      customerNotes: state.get('customerNotes'),
      customerTransactions: state.get('customerTransactions'),
    };
  }

  let stateInProps = {};

  if (modules.includes('app')) {
    stateInProps = Object.assign({}, stateInProps, { app: state.get('app') });
  }

  if (modules.includes('authorisation')) {
    stateInProps = Object.assign({}, stateInProps, { auth: state.get('authorisation') });
  }

  if (modules.includes('userSettings')) {
    stateInProps = Object.assign({}, stateInProps, { userSettings: state.get('userSettings') });
  }

  if (modules.includes('customerIndex')) {
    stateInProps = Object.assign({}, stateInProps, { customerIndex: state.get('customerIndex') });
  }

  if (modules.includes('customerProfile')) {
    stateInProps = Object.assign({}, stateInProps, { customerProfile: state.get('customerProfile') });
  }

  if (modules.includes('customerProducts')) {
    stateInProps = Object.assign({}, stateInProps, { customerProducts: state.get('customerProducts') });
  }

  if (modules.includes('customerNotes')) {
    stateInProps = Object.assign({}, stateInProps, { customerNotes: state.get('customerNotes') });
  }

  if (modules.includes('customerTransactions')) {
    stateInProps = Object.assign({}, stateInProps, { customerTransactions: state.get('customerTransactions') });
  }

  return stateInProps;
};
