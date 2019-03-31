import { createStore } from "redux";
import reducer from "../reducers/index";

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const store = createStore(reducer, persistedState);

export default store;
