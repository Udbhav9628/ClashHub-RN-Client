import {Ip_Address} from '../../constants/Data';
import axios from 'axios';
import {Return_Token} from '../../utils/Utils';

function Fetch_All_Guild() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Fetch_All_Guild_Request',
      });
      const Token: string = (await Return_Token(
        'Fetch_All_Guild_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(`${Ip_Address}/fetchallGuild`, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: Token,
        },
      });
      dispatch({
        type: 'Fetch_All_Guild_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Fetch_All_Guild_Fail',
        payload: error.message,
      });
    }
  };
}

function getUserGuildDetails() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'get_User_Guild_Details_Request',
      });
      const Token: string = (await Return_Token(
        'get_User_Guild_Details_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(`${Ip_Address}/getUserGuildDetails`, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: Token,
        },
      });
      dispatch({
        type: 'get_User_Guild_Details_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'get_User_Guild_Details_Fail',
        payload: error.message,
      });
    }
  };
}

function Check_Is_Club_Joined(Club_id: string) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Check_Is_Club_Joined_Request',
      });
      const Token: string = (await Return_Token(
        'Check_Is_Club_Joined_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/Is_Club_Joined/${Club_id}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Check_Is_Club_Joined_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Check_Is_Club_Joined_Fail',
        payload: error.message,
      });
    }
  };
}

function getUserGuild_FollW_Details(Club_Id: string) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'get_Guild_Followers_Details_Request',
      });
      const Token: string = (await Return_Token(
        'get_Guild_Followers_Details_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/getUserGuildFollowDetails/${Club_Id}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'get_Guild_Followers_Details_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'get_Guild_Followers_Details_Fail',
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
        type: 'Create_Guild_Request',
      });
      const Token: string = (await Return_Token(
        'Create_Guild_Fail',
        dispatch,
      )) as string;
      const response = await axios.post(
        `${Ip_Address}/createUserUniqueGuild`,
        Data,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Create_Guild_Sucess',
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Create_Guild_Fail',
        payload: error.message,
      });
    }
  };
}

function Join_Guild(Guildid: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Join_Guild_Request',
      });
      const Token: string = (await Return_Token(
        'Join_Guild_Fail',
        dispatch,
      )) as string;
      const response = await axios.put(
        `${Ip_Address}/Join_Guild/${Guildid}`,
        {Usertojoin: 'me'},
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Join_Guild_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Join_Guild_Fail',
        payload: error.message,
      });
    }
  };
}

function Get_Specific_Club_Details(Club_id: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Get_Specific_Club_Request',
      });

      const Token: string = (await Return_Token(
        'Get_Specific_Club_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/getSpecificClubDetails/${Club_id}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Get_Specific_Club_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Get_Specific_Club_Fail',
        payload: error.message,
      });
    }
  };
}

function Update_Club_Pic(Data: object) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Update_Club_Pic_Request',
      });
      const Token: string = (await Return_Token(
        'Update_Club_Pic_Fail',
        dispatch,
      )) as string;
      await axios.put(`${Ip_Address}/Update_Club_Pic`, Data, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: Token,
        },
      });
      dispatch({
        type: 'Update_Club_Pic_Sucess',
      });
    } catch (error: any) {
      dispatch({
        type: 'Update_Club_Pic_Fail',
        payload: error.message,
      });
    }
  };
}

function Clear_Guild_Reducer_Sucess() {
  return (dispatch: any) => {
    dispatch({
      type: 'Clear_Guild_Reducer_Sucess',
    });
  };
}
function Clear_Guild_Reducer_Error() {
  return (dispatch: any) => {
    dispatch({
      type: 'Clear_Guild_Reducer_Error',
    });
  };
}

export {
  Fetch_All_Guild,
  getUserGuildDetails,
  Create_Guild,
  Clear_Guild_Reducer_Error,
  Clear_Guild_Reducer_Sucess,
  Join_Guild,
  Get_Specific_Club_Details,
  Update_Club_Pic,
  getUserGuild_FollW_Details,
  Check_Is_Club_Joined,
};
