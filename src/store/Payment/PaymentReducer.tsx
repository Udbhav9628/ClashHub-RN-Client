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

export const Transaction_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'GetUserTransaction_Request':
      return {
        loading: true,
      };
    case 'GetUserTransaction_Sucess':
      return {
        sucess: true,
        loading: false,
        Transactions: action.payload,
      };
    case 'GetUserTransaction_Fail':
      return {
        sucess: false,
        loading: false,
        Error: action.payload,
      };
    default:
      return State;
  }
};

export const PendingWithdrawls_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'GetPendingWithdrawls_Request':
      return {
        PWloading: true,
      };
    case 'GetPendingWithdrawls_Sucess':
      return {
        sucess: true,
        PWloading: false,
        Pending_Withdrawls: action.payload,
      };
    case 'GetPendingWithdrawls_Fail':
      return {
        sucess: false,
        PWloading: false,
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

export const Create_withdrawls_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'Create_withdrawls_Request':
      return {
        loading: true,
      };
    case 'Create_withdrawls_Sucess':
      return {
        sucess: true,
        loading: false,
        Sucess_Responce: action.payload,
      };
    case 'Create_withdrawls_Fail':
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

export const Razorpay_Token_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'Gernerate_Razorpay_Token_Request':
      return {
        Tloading: true,
      };
    case 'Gernerate_Razorpay_Token_Sucess':
      return {
        Tsucess: true,
        Tloading: false,
        RazorPay_Token: action.payload,
      };
    case 'Gernerate_Razorpay_Token_Fail':
      return {
        Tsucess: false,
        Tloading: false,
        TError: action.payload,
      };
    case 'Clear_Wallet_Sucess':
      return {
        ...State,
        Tsucess: false,
      };
    case 'Clear_Wallet_Error':
      return {
        ...State,
        TError: null,
      };
    default:
      return State;
  }
};

export const Money_Refund_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'GetMoneyRefund_Request':
      return {
        loading: true,
      };
    case 'GetMoneyRefund_Sucess':
      return {
        sucess: true,
        loading: false,
        Sucess_Message: action.payload,
      };
    case 'GetMoneyRefund_Fail':
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
