import { CHANGE_PRICE } from "../constants/action-types";

const initialState = {
    price: "0",
    target: ""
};

function reducer (state = initialState, action) {
    if (action.type === "CHANGE_PRICE") {
        return Object.assign(state, {price: action.payload});
    }
    else if (action.type === "CHANGE_TARGET") {
        return Object.assign(state, {target: action.payload});
    }
    return state;
}

export default reducer;
