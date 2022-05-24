import { Ip_Address } from "../../constants/Data";
import axios from "axios";
import { Return_Token } from "../../utils/Utils";

function Fetch_All_Guild() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: "Fetch_All_Guild_Request",
      });
      const Token: string = (await Return_Token(
        "Fetch_All_Guild_Fail",
        dispatch
      )) as string;
      const parsedToken = JSON.parse(Token);
      const response = await axios.get(`${Ip_Address}/fetchallGuild`, {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authToken: parsedToken,
        },
      });
      dispatch({
        type: "Fetch_All_Guild_Sucess",
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: "Fetch_All_Guild_Fail",
        payload: error.message,
      });
    }
  };
}

function getUserGuildDetails() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: "get_User_Guild_Details_Request",
      });
      const Token: string = (await Return_Token(
        "get_User_Guild_Details_Fail",
        dispatch
      )) as string;
      const parsedToken = JSON.parse(Token);
      const response = await axios.get(`${Ip_Address}/getUserGuildDetails`, {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          authToken: parsedToken,
        },
      });
      dispatch({
        type: "get_User_Guild_Details_Sucess",
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: "get_User_Guild_Details_Fail",
        payload: error.message,
      });
    }
  };
}

function Get_Guild_Matches_Details(id: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: "Get_Guild_Matches_Details_Request",
      });

      const Token: string = (await Return_Token(
        "Get_Guild_Matches_Details_Fail",
        dispatch
      )) as string;
      const parsedToken = JSON.parse(Token);

      const response = await axios.get(
        `${Ip_Address}/getGuildtournaments/${id}`,
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            authToken: parsedToken,
          },
        }
      );
      dispatch({
        type: "Get_Guild_Matches_Details_Sucess",
        payload: response.data.Data,
      });
    } catch (error: any) {
      dispatch({
        type: "Get_Guild_Matches_Details_Fail",
        payload: error.message,
      });
    }
  };
}

//Create Guild
function Create_Guild(Data: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: "Create_Guild_Request",
      });
      const Token: string = (await Return_Token(
        "Create_Guild_Fail",
        dispatch
      )) as string;
      const parsedToken = JSON.parse(Token);

      const response = await axios.post(
        `${Ip_Address}/createUserUniqueGuild`,
        Data,
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            authToken: parsedToken,
          },
        }
      );
      dispatch({
        type: "Create_Guild_Sucess",
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: "Create_Guild_Fail",
        payload: error.message,
      });
    }
  };
}

function Clear_Guild_Reducer_Sucess() {
  return (dispatch: any) => {
    dispatch({
      type: "Clear_Guild_Reducer_Sucess",
    });
  };
}
function Clear_Guild_Reducer_Error() {
  return (dispatch: any) => {
    dispatch({
      type: "Clear_Guild_Reducer_Error",
    });
  };
}

export {
  Fetch_All_Guild,
  getUserGuildDetails,
  Create_Guild,
  Clear_Guild_Reducer_Error,
  Get_Guild_Matches_Details,
  Clear_Guild_Reducer_Sucess,
};
