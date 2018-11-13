import { default as app } from 'apps/modules/app/AppReducer';
import { default as authorisation } from 'apps/modules/authorisation/AuthReducer';
import { default as userSettings } from 'apps/modules/userSettings/UserSettingsReducer';
import { default as customerIndex } from 'apps/modules/customerIndex/CustomerIndexReducer';
import { default as customerProfile } from 'apps/modules/customerProfile/CustomerProfileReducer';
import { default as customerProducts } from 'apps/modules/customerProducts/CustomerProductsReducer';
import { default as customerNotes } from 'apps/modules/customerNotes/CustomerNotesReducer';
import { default as customerTransactions } from 'apps/modules/customerTransactions/CustomerTransactionsReducer';

import { combineReducers } from 'redux-immutable';

export default combineReducers({
  app,
  authorisation,
  userSettings,
  customerIndex,
  customerProfile,
  customerProducts,
  customerNotes,
  customerTransactions,
});
