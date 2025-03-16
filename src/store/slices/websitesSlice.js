import { createSlice } from '@reduxjs/toolkit';

// Initial state with mock websites data
const initialState = {
  items: [
    {
      id: 0,
      displayName: 'Naqla Sehia',
      websiteUrl: 'https://naqlasehia.com',
      icon: '/01naqla-sehia.webp',
      channels: [
        { type: 'facebook', username: 'naqlasehiaofficial', profileUrl: 'https://facebook.com/naqlasehiaofficial' },
        { type: 'instagram', username: 'naqlasehia', profileUrl: 'https://instagram.com/naqlasehia' }
      ],
      status: 'active'
    },
    {
      id: 1,
      displayName: 'Medipix',
      websiteUrl: 'https://medipix.com',
      icon: '/02medipix.webp',
      channels: [
        { type: 'facebook', username: 'medipixofficial', profileUrl: 'https://facebook.com/medipixofficial' },
        { type: 'instagram', username: 'medipix', profileUrl: 'https://instagram.com/medipix' }
      ],
      status: 'active'
    },
    {
      id: 2,
      displayName: 'Ivita',
      websiteUrl: 'https://ivita.org',
      icon: '/03-ivita.webp',
      channels: [
        { type: 'twitter', username: 'ivita_official', profileUrl: 'https://twitter.com/ivita_official' },
        { type: 'youtube', username: 'IvitaChannel', profileUrl: 'https://youtube.com/IvitaChannel' }
      ],
      status: 'active'
    },
    {
      id: 3,
      displayName: '3A Lab',
      websiteUrl: 'https://3alab.tech',
      icon: '/06-3a-lab.webp',
      channels: [
        { type: 'facebook', username: '3alabofficial', profileUrl: 'https://facebook.com/3alabofficial' },
        { type: 'instagram', username: '3alab', profileUrl: 'https://instagram.com/3alab' },
        { type: 'twitter', username: '3alab_tech', profileUrl: 'https://twitter.com/3alab_tech' }
      ],
      status: 'maintenance'
    },
    {
      id: 4,
      displayName: 'AM Care',
      websiteUrl: 'https://amcare.io',
      icon: '/03-amcare-group.webp',
      channels: [
        { type: 'youtube', username: 'am_care', profileUrl: 'https://youtube.com/amcareoficial' }
      ],
      status: 'active'
    },
    {
      id: 5,
      displayName: 'Dr Vitamin',
      websiteUrl: 'https://drvitamin.io',
      icon: '/04-dr-vitamin.webp',
      channels: [
        { type: 'youtube', username: 'dr_vitamin_m', profileUrl: 'https://youtube.com/drvitaminoficial' }
      ],
      status: 'active'
    }
  ],
  loading: false,
  error: null
};

const websitesSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    // Start loading websites
    fetchWebsitesStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Success fetching websites
    fetchWebsitesSuccess(state, action) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Failure fetching websites
    fetchWebsitesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add a new website
    addWebsite(state, action) {
      // Create a new ID based on the highest existing ID + 1
      const newId = state.items.length > 0 
        ? Math.max(...state.items.map(website => website.id)) + 1 
        : 0;
      
      // Add new website with generated ID
      state.items.push({
        ...action.payload,
        id: newId,
        status: 'active' // Default status for new websites
      });
    },
    // Delete a website
    deleteWebsite(state, action) {
      state.items = state.items.filter(website => website.id !== action.payload);
    },
    // Update a website
    updateWebsite(state, action) {
      const { id, ...updatedData } = action.payload;
      const index = state.items.findIndex(website => website.id === id);
      
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...updatedData
        };
      }
    }
  }
});

// Export actions
export const {
  fetchWebsitesStart,
  fetchWebsitesSuccess,
  fetchWebsitesFailed,
  addWebsite,
  deleteWebsite,
  updateWebsite
} = websitesSlice.actions;

// Export selectors
export const selectAllWebsites = state => state.websites.items;
export const selectWebsiteById = (state, websiteId) => 
  state.websites.items.find(website => website.id === websiteId);
export const selectWebsitesLoading = state => state.websites.loading;
export const selectWebsitesError = state => state.websites.error;

// Export reducer
export default websitesSlice.reducer;