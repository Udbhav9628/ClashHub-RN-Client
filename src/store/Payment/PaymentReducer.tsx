export const Add_Wallet_Ballance_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'Add_Wallet_Request':
      return {
        Addloading: true,
      };
    case 'Add_Wallet_Sucess':
      return {
        Addsucess: true,
        Addloading: false,
        Response: action.payload,
      };
    case 'Add_Wallet_Fail':
      return {
        Addsucess: false,
        Addloading: false,
        AddError: action.payload,
      };
    case 'Clear_Wallet_Sucess':
      return {
        ...State,
        Addsucess: false,
      };
    case 'Clear_Wallet_Error':
      return {
        ...State,
        AddError: null,
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

export const ClubWallet_Ballance_reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'ClubWallet_Ballance_Request':
      return {
        loading: true,
      };
    case 'ClubWallet_Ballance_Sucess':
      return {
        sucess: true,
        loading: false,
        Amount: action.payload,
      };
    case 'ClubWallet_Ballance_Fail':
      return {
        sucess: false,
        loading: false,
        Error: action.payload,
      };
    default:
      return State;
  }
};
