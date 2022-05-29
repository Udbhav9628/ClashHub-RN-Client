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
      const parsedToken = JSON.parse(Token);

      const response = await axios.post(
        `${Ip_Address}/createtournament`,
        Data,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: parsedToken,
          },
        },
      );
      dispatch({
        type: 'Create_Match_Sucess',
        payload: response.data.data,
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
      const parsedToken = JSON.parse(Token);
      const response = await axios.get(
        `${Ip_Address}/fetchalltournament?Game_Name=`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: parsedToken,
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

function Fetch_All_Matchs(SelectedMenu: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Get_All_Matches_Request',
      });
      const Token: string = (await Return_Token(
        'Get_All_Matches_Fail',
        dispatch,
      )) as string;
      const parsedToken = JSON.parse(Token);
      const response = await axios.get(
        `${Ip_Address}/fetchalltournament?Game_Name=${SelectedMenu}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: parsedToken,
          },
        },
      );
      dispatch({
        type: 'Get_All_Matches_Sucess',
        payload: response.data.Data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Get_All_Matches_Fail',
        payload: error.message,
      });
    }
  };
}
function Get_Joined_Matchs(Guild_id: any, MatchType: any) {
  console.log(MatchType);
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Get_Joined_Matches_Request',
      });
      const Token: string = (await Return_Token(
        'Get_Joined_Matches_Fail',
        dispatch,
      )) as string;
      const parsedToken = JSON.parse(Token);
      const response = await axios.get(
        `${Ip_Address}/GetJoinedMatches?MatchType=${MatchType}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: parsedToken,
          },
        },
      );
      dispatch({
        type: 'Get_Joined_Matches_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Get_Joined_Matches_Fail',
        payload: error.message,
      });
    }
  };
}

function Join_Match_action(id: any, Amount_to_be_paid: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Join_Match_Request',
      });

      const Token: string = (await Return_Token(
        'Join_Match_Fail',
        dispatch,
      )) as string;
      const parsedToken = JSON.parse(Token);
      const response = await axios.put(
        `${Ip_Address}/Jointournament/${id}`,
        {Amount_to_be_paid: Amount_to_be_paid},
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: parsedToken,
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
  Fetch_All_Matchs,
  Clear_Match_Reducer_Error,
  Clear_Match_Reducer_Sucess,
  Join_Match_action,
  Get_Joined_Matchs,
  RemoveMatchItem,
  Clear_ReFetch_Joined_Matches,
  Fetch_Home_Page_Matchs,
};
