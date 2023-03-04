// export type vehicaleField = {
//       legunaTempu?:string;
//       ambulance?:string;
//       coveredvanLorryContainer?:string;
//       tractors?:string;
//       pickup?:string;
//       trains?:string;
//       builtInformalMotorVehicle?:string;
//       bicycles?:string;
//       bicycleRickshaws?:string;
//       motorcyclesOrScooters?:string;
//       trucks?:string;
//       buses?:string;
//       minibusesOrVans?:string;
//       cars?:string;
//   };

export type RootState = ReturnType<typeof store.getState>; 


  export interface fieldActionProps {
    type: string;
    payload?: any;
}