export const AuthReducer = (State = [], action: any) => {
  switch (action.type) {
    case 'Login_Request':
      return {
        loading: true,
      };
    case 'Login_Sucess':
      return {
        sucess: true,
        loading: false,
        User: action.payload,
      };
    case 'Login_Fail':
      return {
        sucess: false,
        loading: false,
        Error: action.payload,
      };
    case 'Clear_Error':
      return {
        ...State,
        Error: null,
      };
    case 'Make_Auth_Sucess_Null':
      return {
        ...State,
        sucess: null,
      };
    default:
      return State;
  }
};

export const FetchUser_reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'FetchUser_Request':
      return {
        sucess: null,
        User: null,
        Error: null,
      };
    case 'FetchUser_Sucess':
      return {
        sucess: true,
        User: action.payload,
      };
    case 'FetchUser_Fail':
      return {
        sucess: false,
        Error: action.payload,
      };
    default:
      return State;
  }
};
