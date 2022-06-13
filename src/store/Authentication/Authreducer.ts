export const FetchUser_reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'FetchUser_Request':
      return {
        loading: true,
        sucess: null,
        User: null,
        Error: null,
      };
    case 'FetchUser_Sucess':
      return {
        loading: false,
        sucess: true,
        User: action.payload,
      };
    case 'FetchUser_Fail':
      return {
        loading: false,
        sucess: false,
        Error: true,
        Message: action.payload,
      };
    case 'SignOut':
      return {
        loading: null,
        sucess: null,
        Error: true,
        User: null,
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
    case 'Make_Auth_Message_Null':
      return {
        ...State,
        Message: null,
      };
    default:
      return State;
  }
};
