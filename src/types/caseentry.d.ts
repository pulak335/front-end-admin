export interface caseEntryModel {
    phoneNum?: string;
    injuryCount:number;
    severeInjuryCount?: number;
    landmark?:string;
    data2?:string;
}

export interface CaseActionProps {
    type: string;
    payload?: caseEntryModel;
}


export interface initialCallRecived {
    isLoading: boolean;
    case?:any;
}
