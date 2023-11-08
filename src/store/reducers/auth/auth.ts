import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { IUser } from "../../../models/IUser";
import AuthService from "../../../API/AuthService";
import { setEvents } from "../event/event";


const initialState: AuthState = {
  isAuth: false,
  user: null,
  users: [] as IUser[],
  isLoading: false,
  error: '',

  isLoginError: false,
  isRegistrationError: false,

  isLoginPending: false,
  isRegistrationPending: false,

  isLoginSuccess: false,
  isRegistrationSuccess: false,
};

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthService.getUsers()
      console.log(response.data)

      dispatch(setUsers(response.data))
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (params: IUser, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(params)

      console.log(response.data)

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    } catch (error: any) {
      return rejectWithValue('login or password is incorrect')
    }
  }
)

export const registration = createAsyncThunk(
  "auth/registration",
  async (params: IUser, { rejectWithValue }) => {
    try {
      const response = await AuthService.registration(params)

      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setUser(null))
      dispatch(setIsAuth(false))
      dispatch(setEvents([]))
      localStorage.removeItem('user')
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)


export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action:PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action:PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setUsers: (state, action:PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setRegistrationError: (state, action:PayloadAction<boolean>) => {
      state.isRegistrationError = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoginPending = false;
      state.isLoginError = false;
      state.isAuth = true;
      state.user = action.payload;
    },
    [login.pending.type]: (state) => {
      state.isLoginPending = true;
    },
    [login.rejected.type]: (state) => {
      state.isLoginPending = false;
      state.isLoginError = true;
    },


    [registration.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isRegistrationPending = false;
      state.isRegistrationError = false;
      state.user = action.payload;
    },
    [registration.pending.type]: (state) => {
      state.isRegistrationPending = true;
    },
    [registration.rejected.type]: (state) => {
      state.isRegistrationPending = false;
      state.isRegistrationError = true;
    }
  }
})

export const
{
  setIsAuth,
  setUser,
  setUsers,
  setRegistrationError 
} = auth.actions

export default auth.reducer