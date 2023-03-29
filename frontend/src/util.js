export const formatApiUrl = (route) => {
    const root = "http://localhost:8080/rpc";
    const url = root + route;

    return url;
};