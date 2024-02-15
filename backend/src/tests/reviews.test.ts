import request from 'supertest';
import app from '../app';

describe('Review APIs', () => {
    let userToken: string;
    let userId: string;
    let movieId: string;
    let reviewId: string;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                name: "user",
                email: "user@gmail.com",
                password: "user.123",
                phoneNumber: "920000000000",
            });

        userToken = res.body.token;
        userId = res.body.data.id;

        const movieRes = await request(app)
            .post('/api/v1/movies')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                name: `Movie`,
                description: "A good movie",
                year: "2022",
                genre: "Drama",
                image: "",
                video: "",
            });
        movieId = movieRes.body.data._id;
    });

    afterAll(async () => {
        if (reviewId) {
            await request(app)
                .delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .set('Authorization', `Bearer ${userToken}`);
        }

        await request(app)
            .delete(`/api/v1/movies/${movieId}`)
            .set('Authorization', `Bearer ${userToken}`);

        await request(app)
            .delete(`/api/v1/user`)
            .set('Authorization', `Bearer ${userToken}`);
    });

    describe('POST /api/v1/movies/:movieId/reviews', () => {
        it('returns 201 Created for creation of a review', async () => {
            const response = await request(app)
                .post(`/api/v1/movies/${movieId}/reviews`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    rating: 4,
                    comment: 'Excellent movie!',
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('data');
            reviewId = response.body.data._id;
        });
    });

    describe('GET /api/v1/movies/:movieId/reviews', () => {
        it('returns 200 OK for all the reviews of a movie', async () => {
            const response = await request(app)
                .get(`/api/v1/movies/${movieId}/reviews`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(response.body.data[0]).toHaveProperty('rating', 4);
            expect(response.body.data[0]).toHaveProperty('comment', 'Excellent movie!');
        });
    });


    describe('PATCH /api/v1/movies/:movieId/reviews/reviewId', () => {
        it('returns 200 OK for editing own review of a movie', async () => {
            const response = await request(app)
                .patch(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    rating: 2,
                    comment: 'Bad movie!',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('rating', 2);
            expect(response.body.data).toHaveProperty('comment', 'Bad movie!');
        });

        it('returns 401 Unauthorized for updating a review without token', async () => {
            const response = await request(app)
                .patch(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .send({
                    rating: 3,
                    comment: 'Good movie!',
                });

            expect(response.status).toBe(401);
        });
    });

    describe('DELETE /api/v1/movies/:movieId/reviews/reviewId', () => {

        it('returns 204 No Content after successfully deleting a comment', async () => {
            const response = await request(app)
                .delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(204);
        });

        it('returns 401 Unauthorized for deleting a review without a token', async () => {
            const response = await request(app)
                .delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`);

            expect(response.status).toBe(401);
        });
    });
});
