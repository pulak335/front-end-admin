// import { value } from 'assets/scss/_themes-vars.module.scss';
import { getField, addField } from './constant';
import { CaseActionProps } from './../types/caseentry.d';
import {  fieldActionProps } from './../types/vehicaleField.d';


export const initialCaseEntry:any ={}        

export const getFieldReducer=(value:any)=>{
    return{
        type:getField
    }
}


export const addFieldReducer=( value:any )=>{
    return{
        type:addField,
        payload:value
    }
}


export const vehicleFieldReducer=(state=initialCaseEntry,action: fieldActionProps)=>{
    const {type,payload}:any = action;
    switch (type) {
        case getField:
            return{
               ...state,
               isLoading: true
            }
        case addField:
            return{
                ...state,
                [payload.fieldName]:payload.value
            }
        default:
            return state
        }
        
}