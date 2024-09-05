import axios from 'axios';
import { getToken } from '../Utillity/auth.utill';
// import {API_URL} from '@env';

const API_URL = 'https://fba1-103-138-50-45.ngrok-free.app';

export async function getApiRequestHeader(isFormData = false) {
    const token = await getToken();
    return {
        Accept: 'application/json',
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        token,
    };
}
const instance = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    withCredentials: false,
});

export async function updateHeaders(isFormData = false) {
    const header = await getApiRequestHeader(isFormData);
    instance.defaults.headers = header;
}

export async function request({
    method,
    url,
    data,
    headers,
    isFormData = false,
}) {
    console.log(url, 'urllllllllllllllllll')
    if (headers === undefined) {
        await updateHeaders(isFormData);
    }
    const promise = instance[method](url, data);
    let response;
    try {
        response = await promise;
    } catch (error) {
        throw error.response;
    }
    return response?.data;
}

export async function newRequest({
    method,
    url,
    data,
    isFormData = false,
    headers,
}) {
    if (headers === undefined) {
        await updateHeaders(isFormData);
    }
    const promise = instance[method](url, data);
    let response;
    try {
        response = await promise;
    } catch (error) {
        throw error.response;
    }
    if (
        response.status
            ? response.status.toString().indexOf('2') !== 0
            : response.data.status.toString().indexOf('2') !== 0
    ) {
        // eslint-disable-next-line
        throw { response };
    } else {
        return response.data;
    }
}

export async function get(url, params, featureAndAction) {
    for (var key in params) {
        url = url + '' + params[key];
    }
    return request({ method: 'get', url, data: { featureAndAction } });
}

export async function del(url, params) {
    return request({ method: 'delete', url, data: { params } });
}

export async function post(url, data, isFormData = false, config) {
    return request({ method: 'post', url, data, isFormData });
}

export async function put(url, data, isFormData = false) {
    return request({ method: 'put', url, data, isFormData });
}
export async function patch(url, data, isFormData = false) {
    return request({ method: 'patch', url, data, isFormData });
}
export const independentRequest = async (url, method, data) => {
    const promise = axios[method](url, data);
    let response;
    try {
        response = await promise;
    } catch (error) {
        throw error.response;
    }
    const payload = response;
    return payload;
};
