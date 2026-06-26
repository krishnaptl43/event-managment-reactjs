import { axiosClient } from "./apiClient";
import { Urls } from "./urls";

export async function bookTicket(formData) {
    try {
        let { data } = await axiosClient.post(Urls.booking,formData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getMyBookings() {
    try {
        let { data } = await axiosClient.get(Urls.booking);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
