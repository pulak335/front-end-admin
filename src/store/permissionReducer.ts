import { permissionProps, permissonValue } from "types/permission";
import { ADD_PERMISSION, GET_PERMISSION } from "./actions";

export const initialStatePermission: permissonValue = {
    users: {},
};

export const getPermissionReducer=(value:any)=>{
    return{
        type:GET_PERMISSION,
        payload:value
    }
}

export const addPermissionReducer=(value:any)=>{
    return{
        type:ADD_PERMISSION,
        payload:value
    }
}

export const permissionAccessReducer=(state=initialStatePermission,action: permissionProps)=>{
    const {type,payload}:any = action;
    
    switch (action.type) {
        case ADD_PERMISSION:
            return{
                ...state,
            }
        case GET_PERMISSION:
            return{
                ...state,
                user:payload.value
            }
        default:
            return state
        }
        
}