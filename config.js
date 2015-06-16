module.exports = {
    API_ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:3000',
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/tiles',
    PORT: process.env.PORT || 3000
};
