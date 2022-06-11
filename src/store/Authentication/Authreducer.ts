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

export const onAuthStateChanged_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'Firebase_Get_User_Sucess':
      return {
        sucess: true,
        loading: false,
        User_Phone: action.payload,
      };
    case 'Firebase_Get_User_Fail':
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

export const Userdetail_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'Userdetail_Reducer':
      return {
        Name: '',
        UserName: '',
        Phone_No: 0,
      };
    default:
      return State;
  }
};
