import * as pageActions from '../actions/pageActions';

const pageHandler = (web3, engine, contracts, getState, dispatch, funcName, payload, tabId) => {
  switch (funcName) {
    case 'getBalanceForComponents':
    case 'checkIfUsernameVerified':
    case 'getGoldForComponents':
      return pageActions[funcName](web3, contracts.func, payload, tabId);
    case 'tip':
    case 'buyGold':
      return pageActions[funcName](web3, contracts.func, dispatch, getState);

    default:
      throw Error('Function in handler not defined', funcName);
  }
};

export default pageHandler;
