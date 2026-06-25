import { toast } from "react-toastify";
import { axiosClient } from "./apiClient";
import { Urls } from "./urls";

export async function addUser(formData) {
    try {
        let { data } = await axiosClient.post(Urls.users, formData);
        if (data.status) {
            toast.success(data.message);
            return data;
        }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
}

export async function loginUser(formData) {
    try {
        let { data } = await axiosClient.post(Urls.login, formData);
        if (data.status) {
            toast.success(data.message);
            return data;
        }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
}

export async function getUserProfile() {
    try {
        let { data } = await await axiosClient.get(Urls.profile);
        return data;
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
}

export async function changePassword(formData) {
    try {
        let { data } = await axiosClient.post(Urls.changePass, formData);
        if (data.status) {
            return data;
        }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
}

export async function uploadUserProfile(formData) {
    try {
        let { data } = await axiosClient.post(Urls.uploadImage, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (data.status) {
            toast.success(data.message);
            return data;
        }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
}

export async function updateUserInfo(formData) {
    try {
        let { data } = await axiosClient.patch(Urls.users, formData);
        if (data.status) {
            toast.success(data.message)
            return data.data;
        }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
}