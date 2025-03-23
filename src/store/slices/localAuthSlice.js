import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../Links';

// Async thunk for login with API
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or password');
      }

      const data = await response.json();
      return {
        authToken: data.token,
        user: data.user_id,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signup with API
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'User creation failed');
      }

      const data = await response.json();
      return {
        authToken: data.token,
        user: data.user_id,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mock utility to simulate async delay (used for mock thunks)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock user database (for reset password flow simulation)
const mockUsers = [
  {
    email: 'test@gmail.com',
    password: '123', // In production, this would be hashed
    firstName: 'Test',
    lastName: 'User',
    resetCode: null,
  },
];

// Async thunk for requesting a reset code (mock implementation)
export const requestResetCode = createAsyncThunk(
  'auth/requestResetCode',
  async ({ email }, { rejectWithValue }) => {
    try {
      await delay(1500); // Simulate network delay
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        throw new Error('No user found with this email');
      }
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.resetCode = resetCode; // Store the code in mock DB
      console.log(`Reset code for ${email}: ${resetCode}`); // For testing
      return { email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for resetting password (mock implementation)
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, code, newPassword }, { rejectWithValue }) => {
    try {
      await delay(1500); // Simulate network delay
      const user = mockUsers.find((u) => u.email === email);
      if (!user || user.resetCode !== code) {
        throw new Error('Invalid or expired reset code');
      }
      user.password = newPassword; // Update password in mock DB
      user.resetCode = null; // Clear reset code after use
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: localStorage.getItem('authToken') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('authToken'),
    loading: false,
    error: null,
    resetStep: 0, // For forgot password flow
    resetEmail: null, // Store email during reset flow
  },
  reducers: {
    logout: (state) => {
      state.authToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
    setResetStep: (state, action) => {
      state.resetStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authToken = action.payload.authToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('authToken', action.payload.authToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authToken = action.payload.authToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('authToken', action.payload.authToken);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Request Reset Code (mock)
      .addCase(requestResetCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestResetCode.fulfilled, (state, action) => {
        state.loading = false;
        state.resetEmail = action.payload.email;
        state.resetStep = 1; // Move to verification step
      })
      .addCase(requestResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password (mock)
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetStep = 3; // Success step
        state.resetEmail = null; // Clear email after success
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setResetStep } = authSlice.actions;
export default authSlice.reducer;