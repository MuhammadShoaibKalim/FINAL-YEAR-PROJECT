import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../Services/ApiEndpoints.jsx';

export const updateUser = createAsyncThunk('auth/updateUser', async () => {
  const response = await get('/api/auth/checkuser');
  return response.data.user;
});

const initialState = {
  loading: null,
  error: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetUser: (state, action) => {
      if (!action.payload) {
        console.error('Attempting to set null user data');
        return;
      }

      console.log('Setting user in Redux:', action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    Logout: (state) => {
      state.user = null;
      state.loading = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          console.log('Updating user from checkuser:', action.payload);
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { SetUser, Logout } = authSlice.actions;
export default authSlice.reducer;
