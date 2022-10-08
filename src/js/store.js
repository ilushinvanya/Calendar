import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    gender: 0,
    birthday: null,
    allYears: 90,
    measure: 'weeks', // months weeks moments
  },
  getters: {
    gender({ state }) {
      return state.gender;
    },
    birthday({ state }) {
      return state.birthday;
    },
    allYears({ state }) {
      return state.allYears;
    },
    measure({ state }) {
      return state.measure;
    },
  },
  actions: {
    setBirthday({ state }, date) {
      state.birthday = date;
    },
    setGender({ state }, sex) {
      state.gender = sex;
    },
    setAllYears({ state }, years) {
      state.allYears = years;
    },
    setMeasure({ state }, measure) {
      state.measure = measure;
    }
  },
})
export default store;
