import { getCase, addCaseEntry } from './constant';
import { CaseActionProps, caseEntryModel } from './../types/caseentry.d';


export const initialCaseEntry:caseEntryModel ={
    phoneNum: "",
    injuryCount:0,
    severeInjuryCount: 0,
    landmark:"",
    data2:""
}


// console.log(initialCaseEntry.case)

const getCasReducer=()=>{
    return{
        type:getCase
    }
}

export const addCaseEntryReducer=(value:caseEntryModel)=>{
    return{
        type:addCaseEntry,
        payload:value
    }
}


export const caseReducer=(state=initialCaseEntry,action: CaseActionProps)=>{
    const {type,payload}:any = action;

    
    switch (type) {
        case getCase:
            return{
               ...state,
               isLoading: true
            }
        case addCaseEntry:
            return{
                ...state,
                [payload.fieldName]:payload.value
            }
        default:
            return state
        }
        
}