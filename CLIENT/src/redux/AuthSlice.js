import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post, get, put } from '../Services/ApiEndpoints'; 

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await post('/api/auth/login', { email, password });
      const { authToken, data: userData } = response.data;

      if (rememberMe) {
        localStorage.setItem('authToken', authToken);
      } else {
        sessionStorage.setItem('authToken', authToken);
      }

      localStorage.setItem('userId', userData._id);

      return userData;
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.response?.data?.message || 'Login failed. Please try again.');
    }
  }
);

// export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
//   localStorage.removeItem('authToken');
//   localStorage.removeItem('userId');
//   sessionStorage.removeItem('authToken');
//   return;
// });
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  sessionStorage.removeItem('authToken');
  // dispatch(Logout());
});



export const checkUser = createAsyncThunk(
  'auth/checkUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await get('/api/auth/getuser');
      return response.data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ userId, updateData }, { rejectWithValue }) => {
    try {
      const response = await put(`/api/auth/profile/${userId}`, updateData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);


const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetUser: (state, action) => {
      const userData = action.payload;
      if (userData) {
        state.user = userData;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },    
    Logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      .addCase(checkUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { SetUser, Logout } = authSlice.actions;

export default authSlice.reducer;
