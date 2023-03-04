import { getAccess, addAccess } from './constant';


const initialState: any = [];

export interface AccessReducerActionProps {
    type: string;
    payload?: any;
}

const getAccessReducer=()=>{
    return{
        type:getAccess
    }
}

export const addAccessReducer=(value:any)=>{

    return{
        type:addAccess,
        payload:value
    }
}


export const accessReucer = (state=initialState,action: any) =>{
    const {type,payload}:any = action;

    switch (type) {
        case getAccess:
            return{
               ...state,
            }
        case addAccess:
            return{
                ...state,
                [payload.fieldName]: payload.value
            }
        default:
            return state
        }

}