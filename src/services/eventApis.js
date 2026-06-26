import { axiosClient } from "./apiClient";
import { Urls } from "./urls";

export async function getAllEvents() {
    try {
        let { data } = await axiosClient.get(Urls.events);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getEventById(eventId) {
    try {
        let { data } = await axiosClient.get(Urls.events + "/" + eventId);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
