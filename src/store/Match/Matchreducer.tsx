export const Create_matches_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Create_Match_Request':
      return {
        loading: true,
      };
    case 'Create_Match_Sucess':
      return {
        loading: false,
        Responce: action.payload,
        Sucess: true,
      };
    case 'Create_Match_Fail':
      return {
        loading: false,
        Error: action.payload,
        Sucess: false,
      };
    case 'Clear_Match_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Match_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};

export const Get_Home_Page_Matches = (state = [], action: any) => {
  switch (action.type) {
    case 'Get_Home_Page_Matches_Request':
      return {
        loading: true,
      };
    case 'Get_Home_Page_Matches_Sucess':
      return {
        loading: false,
        Home_Matchs: action.payload,
        Sucess: true,
      };
    case 'Get_Home_Page_Matches_Fail':
      return {
        loading: false,
        Error: action.payload,
        Sucess: false,
      };
    case 'Clear_Match_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Match_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};

export const Get_Matches_Videos = (state = [], action: any) => {
  switch (action.type) {
    case 'Fetch_All_Matchs_Videos_Request':
      return {
        loading: true,
      };
    case 'Fetch_All_Matchs_Videos_Sucess':
      return {
        loading: false,
        Matchs_Have_Vid: action.payload,
        Sucess: true,
      };
    case 'Fetch_All_Matchs_Videos_Fail':
      return {
        loading: false,
        Error: action.payload,
        Sucess: false,
      };
    case 'Clear_Match_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Match_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};

export const Join_Match_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Join_Match_Request':
      return {
        loading: true,
      };
    case 'Join_Match_Sucess':
      return {
        loading: false,
        ReFetch_Joined_Matches: true,
        Join_Sucess: true,
        Responce: action.payload,
      };
    case 'Join_Match_Fail':
      return {
        loading: false,
        Join_Sucess: false,
        ReFetch_Joined_Matches: false,
        Error: action.payload,
      };
    case 'Clear_Match_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_ReFetch_Joined_Matches':
      return {
        ...state,
        ReFetch_Joined_Matches: false,
      };
    case 'Clear_Match_Sucess':
      return {
        ...state,
        Join_Sucess: null,
      };
    default:
      return state;
  }
};

export const Update_Match_Result_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Update_Result_Request':
      return {
        loading: true,
      };
    case 'Update_Result_Sucess':
      return {
        loading: false,
        Sucess: true,
        Sucess_Responce: action.payload,
      };
    case 'Update_Result_Fail':
      return {
        loading: false,
        Sucess: false,
        Error: action.payload,
      };
    case 'Clear_Match_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Match_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};

export const Update_Room_Details_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Update_Room_Details_Request':
      return {
        loading: true,
      };
    case 'Update_Room_Details_Sucess':
      return {
        loading: false,
        Sucess: true,
        Sucess_Responce: action.payload,
      };
    case 'Update_Room_Details_Fail':
      return {
        loading: false,
        Sucess: false,
        Error: action.payload,
      };
    case 'Clear_Match_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Match_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};

export const Update_Video_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Update_Match_Video_Request':
      return {
        loading: true,
      };
    case 'Update_Match_Video_Sucess':
      return {
        loading: false,
        Sucess: true,
        Sucess_Responce: action.payload,
      };
    case 'Update_Match_Video_Fail':
      return {
        loading: false,
        Sucess: false,
        Error: action.payload,
      };
    case 'Clear_Match_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Match_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};

export const Fetch_Match_Room_Details = (state = [], action: any) => {
  switch (action.type) {
    case 'Fetch_Room_Details_Request':
      return {
        loading: true,
      };
    case 'Fetch_Room_Details_Sucess':
      return {
        loading: false,
        Sucess: true,
        Responce: action.payload,
      };
    case 'Fetch_Room_Details_Fail':
      return {
        loading: false,
        Sucess: false,
        Error: action.payload,
      };
    case 'Clear_Match_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Match_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};
