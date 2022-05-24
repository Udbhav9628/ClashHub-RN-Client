const AuthReducer = (State = [], action: any) => {
  switch (action.type) {
    case "Login_Request":
      return {
        loading: true,
      };
    case "Login_Sucess":
      return {
        sucess: true,
        loading: false,
        User: action.payload,
      };
    case "Login_Fail":
      return {
        sucess: false,
        loading: false,
        Error: action.payload,
      };
    case "Clear_Error":
      return {
        ...State,
        Error: null,
      };
    case "Make_Auth_Sucess_Null":
      return {
        ...State,
        sucess: null,
      };
    default:
      return State;
  }
};

export default AuthReducer;
