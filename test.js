const { spec, sleep } = require('pactum');
const headers = require('./variables/headers');
const endpoint = require('./variables/endpoints');
const requestBody = require('./variables/requestBodies');

describe('DummyAPI tests', () => {

    it('User should be created', async () => {
        await spec()
            .post(endpoint.forUser.creation)
                .withHeaders(headers.appId)
                .withJson(requestBody.ofAUser.thatIsValid)
            .expectStatus(200)
            .stores('CreatedUserId', 'id');
    })

    it('Post should be created with the same user', async () => {
        await spec()
            .post(endpoint.forPost.creation)
                .withHeaders(headers.appId)
                .withJson({ 'owner': '$S{CreatedUserId}', 'text': 'A brief description for the post.' })
            .expectStatus(200);
    })

    /*it('Same post should be deleted', async () => {

    })

    it('Same user should be deleted', async () => {

    })*/

});