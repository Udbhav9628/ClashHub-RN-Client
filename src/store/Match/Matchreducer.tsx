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

export const Get_All_Matches = (state = [], action: any) => {
  switch (action.type) {
    case 'Get_All_Matches_Request':
      return {
        loading: true,
      };
    case 'Get_All_Matches_Sucess':
      return {
        loading: false,
        All_Matchs: action.payload,
        Sucess: true,
      };
    case 'Get_All_Matches_Fail':
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
        ReFetch_Joined_Matches: null,
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

export const Get_Joined_Match_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Get_Joined_Matches_Request':
      return {
        loading: true,
      };
    case 'Get_Joined_Matches_Sucess':
      return {
        loading: false,
        Sucess: true,
        Joined_Matches: action.payload,
      };
    case 'Get_Joined_Matches_Fail':
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
