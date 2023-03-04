import { accessReucer } from './accessReucer';
import { vehicleFieldReducer } from './vehicleFieldReducer';
import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import snackbarReducer from './snackbarReducer';
import accountReducer from './accountReducer';
import kanbanReducer from './kanbanReducer';
import { caseReducer } from './caseEntry';
import { permissionAccessReducer } from './permissionReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    account: accountReducer,
    kanban: kanbanReducer,
    case:caseReducer,
    vehicleField:vehicleFieldReducer,
    accessReucer:accessReucer,
    permission: permissionAccessReducer
});

export default reducer;
