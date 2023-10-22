const { spec } = require('pactum');
const headers = require('./variables/headers');
const endpoint = require('./variables/endpoints');
const requestBody = require('./variables/requestBodies');

describe('Successfully creating a user, a post, and then deleting them both', () => {

    it('User should be created', async () => {
        await spec()
            .post(endpoint.forUser.creation)
                .withHeaders(headers.appId)
                .withJson(requestBody.ofAUser.thatIsValid)
            .expectStatus(200)
            .stores('CreatedUserId', 'id');
    });

    it('Post should be created with the same user', async () => {
        var bodyToSend = requestBody.ofAPost.whoseProperty.owner.isEmpty;
        bodyToSend.owner = '$S{CreatedUserId}'

        await spec()
            .post(endpoint.forPost.creation)
                .withHeaders(headers.appId)
                .withJson(bodyToSend)
            .expectStatus(200)
            .stores('CreatedPostId', 'id');
    });

    it('Same post should be deleted', async () => {
        await spec()
            .delete(endpoint.forPost.deletion + '$S{CreatedPostId}')
                .withHeaders(headers.appId)
            .expectStatus(200);
    });

    it('Same user should be deleted', async () => {
        await spec()
            .delete(endpoint.forUser.deletion + '$S{CreatedUserId}')
                .withHeaders(headers.appId)
            .expectStatus(200);
    });

});