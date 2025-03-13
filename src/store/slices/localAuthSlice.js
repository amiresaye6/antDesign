import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user database (stored in memory for simplicity)
// In a real app, this could be persisted in localStorage or an actual DB
const mockUsers = [
  {
    email: 'test@gmail.com',
    password: '123', // In production, this would be hashed
    firstName: 'Test',
    lastName: 'User',
    resetCode: null, // For password reset simulation
  },
];

// Utility to simulate async delay (mimics network latency)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await delay(1500); // Simulate network delay
      const user = mockUsers.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      return {
        authToken: `mock-authToken-${Math.random().toString(36).substring(2)}`, // Mock JWT-like authToken
        user: { email: user.email, firstName: user.firstName, lastName: user.lastName },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      await delay(1500); // Simulate network delay
      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      const newUser = { email, password, firstName, lastName, resetCode: null };
      mockUsers.push(newUser); // Add to mock DB
      return {
        authToken: `mock-authToken-${Math.random().toString(36).substring(2)}`,
        user: { email, firstName, lastName },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for requesting a reset code (step 1 of forgot password)
export const requestResetCode = createAsyncThunk(
  'auth/requestResetCode',
  async ({ email }, { rejectWithValue }) => {
    try {
      await delay(1500); // Simulate network delay
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        throw new Error('No user found with this email');
      }
      // Generate a mock 6-digit code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.resetCode = resetCode; // Store the code in mock DB
      console.log(`Reset code for ${email}: ${resetCode}`); // For testing, log it
      return { email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for resetting password (step 2 and 3 combined)
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
      // Request Reset Code
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
      // Reset Password
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