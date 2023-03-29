import { default as axios } from 'axios';
import { formatApiUrl } from '../util';

export const add = (track) => {
    const url = formatApiUrl("/Tracks.add");
    const promise = axios.post(url, track, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return promise;
};

export const filter = async (title, categories) => {
    const url = formatApiUrl("/Tracks.filter");
    const response = await axios.post(url, { title, categories});
    const data = response.data;

    return data;
};

export const getById = async (id) => {
    const url = formatApiUrl("/Tracks.getById");
    const response = await axios.post(url, { id });
    const data = response.data;

    return data;
};

// export const getAll = () => {
//     const url = formatApiUrl("/Tracks.getAll");
//     const promise = axios.post(url);

//     return promise;
// };

export const removeOne = (id) => {
    const url = formatApiUrl("/Tracks.removeOne");
    const promise = axios.post(url, { id });

    return promise;
};

export const updateOne = (id, track) => {
    const url = formatApiUrl("/Tracks.updateOne");
    const promise = axios.post(url, { id, ...track });

    return promise;
};