import {Ip_Address} from '../../constants/Data';
import axios from 'axios';
import {Return_Token} from '../../utils/Utils';

function Create_Match(Data: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Create_Match_Request',
      });
      const Token: string = (await Return_Token(
        'Create_Match_Fail',
        dispatch,
      )) as string;
      const response = await axios.post(
        `${Ip_Address}/createtournament`,
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
        type: 'Create_Match_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Create_Match_Fail',
        payload: error.message,
      });
    }
  };
}

function Fetch_Home_Page_Matchs() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Get_Home_Page_Matches_Request',
      });
      const Token: string = (await Return_Token(
        'Get_Home_Page_Matches_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/fetchalltournament?Game_Name=`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Get_Home_Page_Matches_Sucess',
        payload: response.data.Data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Get_Home_Page_Matches_Fail',
        payload: error.message,
      });
    }
  };
}

//Update Match Result
function Update_Match(Data: any, id: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Update_Result_Request',
      });
      const Token: string = (await Return_Token(
        'Update_Result_Fail',
        dispatch,
      )) as string;
      const response = await axios.put(
        `${Ip_Address}/UpdateResult/${id}`,
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
        type: 'Update_Result_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Update_Result_Fail',
        payload: error.message,
      });
    }
  };
}

//Update Match Room Details
function Update_Match_Room_Details(Room_Details_Data: any, Matchid: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Update_Room_Details_Request',
      });
      const Token: string = (await Return_Token(
        'Update_Room_Details_Fail',
        dispatch,
      )) as string;
      const response = await axios.put(
        `${Ip_Address}/UpdateRoom_Details/${Matchid}`,
        Room_Details_Data,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Update_Room_Details_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Update_Room_Details_Fail',
        payload: error.message,
      });
    }
  };
}

//Update Match Video
function Update_Match_Video(Video_Data: any, Matchid: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Update_Match_Video_Request',
      });
      const Token: string = (await Return_Token(
        'Update_Match_Video_Fail',
        dispatch,
      )) as string;
      const response = await axios.put(
        `${Ip_Address}/UpdateVideo_Details/${Matchid}`,
        Video_Data,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Update_Match_Video_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Update_Match_Video_Fail',
        payload: error.message,
      });
    }
  };
}

function Join_Match_action(
  id: any,
  InGameName: String,
  MatchIdLast2_char: String,
) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Join_Match_Request',
      });

      const Token: string = (await Return_Token(
        'Join_Match_Fail',
        dispatch,
      )) as string;
      const response = await axios.put(
        `${Ip_Address}/Jointournament/${id}`,
        {
          InGameName,
          MatchIdLast2_char,
        },
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Join_Match_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Join_Match_Fail',
        payload: error.message,
      });
    }
  };
}

function Fetch_Match_Room_Details(Match_id: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Fetch_Room_Details_Request',
      });
      const Token: string = (await Return_Token(
        'Fetch_Room_Details_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/Fetch_Match_Room_Details/${Match_id}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Fetch_Room_Details_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Fetch_Room_Details_Fail',
        payload: error.message,
      });
    }
  };
}

function Push_In_Array(Match: any, Data: any) {
  return function (dispatch: any) {
    const Duplicate_match = Match;
    if (Duplicate_match) {
      let User = Duplicate_match.Joined_User.find(
        (Element: any) => Element._id === Data.Id,
      );
      if (User) {
        User.Kills = Data.Kills;
      }
    }
    dispatch({
      type: 'Push In an Array',
    });
  };
}

function RemoveMatchItem(All_Matches: any[], Match_id: any) {
  return (dispatch: any) => {
    const Filtered_Match = All_Matches.filter(Item => {
      return Item._id !== Match_id;
    });
    dispatch({
      type: 'Get_Home_Page_Matches_Sucess',
      payload: Filtered_Match,
    });
  };
}

function Clear_Match_Reducer_Error() {
  return (dispatch: any) => {
    dispatch({
      type: 'Clear_Match_Error',
    });
  };
}

function Clear_ReFetch_Joined_Matches() {
  return (dispatch: any) => {
    dispatch({
      type: 'Clear_ReFetch_Joined_Matches',
    });
  };
}

function Clear_Match_Reducer_Sucess() {
  return (dispatch: any) => {
    dispatch({
      type: 'Clear_Match_Sucess',
    });
  };
}

export {
  Create_Match,
  Clear_Match_Reducer_Error,
  Clear_Match_Reducer_Sucess,
  Join_Match_action,
  RemoveMatchItem,
  Clear_ReFetch_Joined_Matches,
  Fetch_Home_Page_Matchs,
  Push_In_Array,
  Update_Match,
  Update_Match_Room_Details,
  Fetch_Match_Room_Details,
  Update_Match_Video,
};
