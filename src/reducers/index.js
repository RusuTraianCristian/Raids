import { CHANGE_PRICE } from "../constants/action-types";
import { CHANGE_CHANNEL } from "../constants/action-types";

const initialState = {
    price: "0",
    channel: "sbdasdadsaSUGEPULA"
};

function reducer (state = initialState, action) {
    if (action.type === "CHANGE_PRICE") {
        return Object.assign(state, {price: action.payload});
    }
    else if (action.type === "CHANGE_CHANNEL") {
        return Object.assign(state, {channel: action.payload});
    }
    return state;
}

export default reducer;
