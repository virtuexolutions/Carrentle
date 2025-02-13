import {createSlice, current} from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  userData: {},

  rideStart: false,
  rideData: {},

  riderEventData: {},
  userEventData: {},
  riderModalVisible: false,
  appIsInBackground: false,
  currentLocation: null,
  currentRideId: null,
};
console.log('🚀 ~ currentLocation:', initialState?.currentLocation);
console.log('🚀 ~ userData:', initialState.userData);

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setRideStart(state, action) {
      state.rideStart = action.payload;
    },
    setRideData(state, action) {
      state.rideData = action.payload;
    },
    setUserData(state, action) {
      state.userData = action?.payload;
      console.log('🚀 ~ setUserData ~ action?.payload:', action?.payload);
      // state.userData = action?.payload?.userData;
    },
    setUserLogOut(state, action) {
      state.userData = {};
      // console.log("🚀 ~ setUserLogOut ~ userData:", userData)
    },
    setEventDataRider(state, action) {
      state.riderEventData = action.payload;
      console.log('🚀 ~ setEventDataRider ~ action.payload:', action.payload);
    },
    setAppIsInBackground(state, action) {
      console.log('🚀 ~ setAppIsInBackground ~ action:', action.payload);
      state.appIsInBackground = action.payload;
    },
    setCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },
    setCurrentRideId(state, action) {
      state.currentRideId = action.payload;
    },
  },
});

export const {
  setRideStart,
  setUserData,
  setUserLogOut,
  setRideData,
  setEventDataRider,
  setUserEventData,
  setAppIsInBackground,
  setCurrentLocation,
  setCurrentRideId,
} = CommonSlice.actions;

export default CommonSlice.reducer;
