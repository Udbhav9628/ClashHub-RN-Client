export const Make_Payment_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'Make_Payment_Request':
    case 'Update_Wallet_Request':
      return {
        loading: true,
      };
    case 'Make_Payment_Sucess':
    case 'Update_Wallet_Sucess':
      return {
        sucess: true,
        loading: false,
        Response: action.payload,
      };
    case 'Make_Payment_Fail':
    case 'Update_Wallet_Fail':
      return {
        sucess: false,
        loading: false,
        Error: action.payload,
      };
    case 'Clear_Wallet_Sucess':
      return {
        ...State,
        sucess: false,
      };
    case 'Clear_Wallet_Error':
      return {
        ...State,
        Error: null,
      };
    default:
      return State;
  }
};

export const Get_Ballance_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'GetUserWalletBallance_Request':
      return {
        loading: true,
      };
    case 'GetUserWalletBallance_Sucess':
      return {
        sucess: true,
        loading: false,
        Amount: action.payload,
      };
    case 'GetUserWalletBallance_Fail':
      return {
        sucess: false,
        loading: false,
        Error: action.payload,
      };
    default:
      return State;
  }
};
