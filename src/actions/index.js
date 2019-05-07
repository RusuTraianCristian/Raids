import { CHANGE_PRICE } from "../constants/action-types";
import { CHANGE_TARGET } from "../constants/action-types";

export function changePrice(price) {
    return {
        type: "CHANGE_PRICE",
        payload: price
    };
};

export function changeTarget(target) {
    return {
        type: "CHANGE_TARGET",
        payload: target
    };
};
