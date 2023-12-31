const baseUrl = "https://dummyapi.io/data/v1/"

module.exports = {
    forUser: {
        creation: baseUrl + "user/create/",
        deletion: baseUrl + "user/"
    },
    forPost: {
        creation: baseUrl + "post/create/",
        deletion: baseUrl + "post/"
    }
};