import axios from "axios";
import { Ip_Address } from "../../constants/Data";
import { storeToken } from "../../utils/Utils";

function Login_User(Data: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: "Login_Request",
      });
      const responce = await axios.post(`${Ip_Address}/Login`, Data);
      await storeToken("Token", responce.data.Auth_Token, dispatch);
      dispatch({
        type: "Login_Sucess",
        payload: responce.data,
      });
    } catch (error: any) {
      dispatch({
        type: "Login_Fail",
        payload: error.message,
      });
    }
  };
}

function Clear_Auth_Error() {
  return (dispatch: any) => {
    dispatch({
      type: "Clear_Error",
    });
  };
}

function Clear_Auth_Sucess() {
  return (dispatch: any) => {
    dispatch({
      type: "Make_Auth_Sucess_Null",
    });
  };
}

export { Login_User, Clear_Auth_Error, Clear_Auth_Sucess };
