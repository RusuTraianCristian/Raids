import { CHANGE_PRICE } from "../constants/action-types";
import { CHANGE_CHANNEL } from "../constants/action-types";

export function changePrice(price) {
    return {
        type: "CHANGE_PRICE",
        payload: price
    };
};

export function changeChannel(channel) {
    return {
        type: "CHANGE_CHANNEL",
        payload: channel
    };
};
