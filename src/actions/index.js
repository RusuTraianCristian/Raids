import { CHANGE_PRICE } from "../constants/action-types";

export function changePrice(price) {
    return {
        type: "CHANGE_PRICE",
        payload: price
    };
};
