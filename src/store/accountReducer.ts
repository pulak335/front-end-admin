// action - state management
import { LOGIN, LOGOUT, REGISTER } from './actions';
import { initialLoginContextProps } from 'types';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState: initialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: {},
    avater: "text"
};

export interface AccountReducerActionProps {
    type: string;
    payload?: initialLoginContextProps;
}

const accountReducer = (state = initialState, action: AccountReducerActionProps) => {

    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload!;
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
            };
        }
        case "TEST": {
            console.log(state)
            return {
                ...state,
                avater: "helloooooo"
            };
        }
        case LOGOUT: {
            console.log(action.payload)
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
