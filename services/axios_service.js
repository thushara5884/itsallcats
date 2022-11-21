// request has been deprecated, so using axios
const axios = require("axios").create({ baseURL: process.env.API_URL });

module.exports = axios;
