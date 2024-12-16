import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  riderIsSubscribed: false,
  userIsSubscribed: false,
  pusherInstance: null,
  riderChannelName: null,
  userChannelName: null,
  riderEvent: {},
  userEventData: {},
};

const socketSlice = createSlice({
  name: 'socketReducer',
  initialState: initialState,
  reducers: {
    setRiderIsSubscribed(state, action) {
      state.riderIsSubscribed = action.payload;
    },
    setUserIsSubscribed(state, action) {
      state.userIsSubscribed = action.payload;
    },
    setPusherInstance(state, action) {
      state.pusherInstance = action.payload;
    },
    setriderChannelName(state, action) {
      state.riderChannelName = action.payload;
      console.log('🚀 ~ setriderChannelName ~ action.payload:', action.payload);
    },
    setRiderEvent(state, action) {
      state.riderEvent = action.payload;
      console.log('🚀 ~ setRiderEvent ~ action.payload:', action.payload);
    },
    resetPusher: state => {
      state.pusherInstance = null;
      state.riderChannelName = null;
    },
    setUserChannelName(state, action) {
      state.userChannelName = action.payload;
      console.log('🚀 ~ setUserChannelName ~ action.payload:', action.payload);
    },
    setUserEventData(state, action) {
      state.userEventData = action.payload;
      console.log('🚀 ~ setUserEventData ~ action.payload:', action.payload);
    },
    
  },
});

export const {
  setRiderIsSubscribed,
  setUserIsSubscribed,
  setPusherInstance,
  resetPusher,
  setUserChannelName,
  setriderChannelName,
  setUserEventData,
  setRiderEvent,
} = socketSlice.actions;

export default socketSlice.reducer;
