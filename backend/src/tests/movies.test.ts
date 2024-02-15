import request from "supertest";
import app from "../app";

describe("Movie API testing...", () => {
  let userToken: string;
  let userToken_: string;
  let movie: string;
  let movie_: string;
  let userId: string;
  let userId_: string;

  beforeAll(async () => {
    const signupRes = await request(app).post("/api/v1/auth/signup").send({
      name: "user",
      email: "user@gmail.com",
      password: "user.123",
      phoneNumber: "920000000000",
    });

    userToken = signupRes.body.token;

    const signupRes_ = await request(app).post("/api/v1/auth/signup").send({
      name: "otheruser",
      email: `user1@hotmail.com`,
      password: "user.123",
      phoneNumber: "920000000000",
    });

    userToken_ = signupRes_.body.token;
  });

  afterAll(async () => {
    let movies = await request(app)
      .get("/api/v1/movies/me")
      .set("Authorization", `Bearer ${userToken}`);
    if (movies.body.length > 0) {
      await Promise.all(
        movies.body.map((movie: { _id: any }) =>
          request(app)
            .delete(`/api/v1/movies/${movie._id}`)
            .set("Authorization", `Bearer ${userToken}`)
        )
      );
    }

    await request(app)
      .delete(`/api/v1/user`)
      .set("Authorization", `Bearer ${userToken}`);

    movies = await request(app)
      .get("/api/v1/movies/me")
      .set("Authorization", `Bearer ${userToken_}`);

    if (movies.body.length > 0) {
      await Promise.all(
        movies.body.map((movie: { _id: any }) =>
          request(app)
            .delete(`/api/v1/movies/${movie._id}`)
            .set("Authorization", `Bearer ${userToken_}`)
        )
      );
    }

    await request(app)
      .delete(`/api/v1/user`)
      .set("Authorization", `Bearer ${userToken_}`);
  });

  describe("POST /api/v1/movies", () => {
    it("returns 201 Created after movie creation", async () => {
      const res = await request(app)
        .post("/api/v1/movies")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          name: `Movie`,
          description: "A good movie",
          year: "2022",
          genre: "Drama",
          image: "",
          video: "",
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      movie = res.body.data._id;
    });

    it("returns 409 Conflict if a movie with same name is present", async () => {
      const res = await request(app)
        .post("/api/v1/movies")
        .set("Authorization", `Bearer ${userToken_}`)
        .send({
          name: `Movie`,
          description: "A good movie",
          year: "2022",
          genre: "Drama",
          image: "",
          video: "",
        });

      expect(res.status).toBe(409);
    });

    it("returns 401 Unauthorized for creating a movie without a token", async () => {
      const res = await request(app).post("/api/v1/movies").send({
        name: `Movie Invalid`,
        description: "A good movie",
        year: "2022",
        genre: "Drama",
        image: "",
        video: "",
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/v1/movies", () => {
    it("returns 200 OK for all the movies the movies retreived sorted by rating", async () => {
      const res = await request(app)
        .get("/api/v1/movies")
        .query({ name: "Movie" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("GET /api/v1/movies/me", () => {
    it("returns 200 OK for all the movies of a particular user", async () => {
      const res = await request(app)
        .get("/api/v1/movies/me")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("DELETE /api/v1/movies/:id", () => {
    it("returns 401 Unauthorized for deleting a movie without a token", async () => {
      const movies = await request(app)
        .get("/api/v1/movies/me")
        .set("Authorization", `Bearer ${userToken}`);

      if (movies.body.data.length > 0) {
        const res = await request(app).delete(
          `/api/v1/movies/${movies.body.data[0]._id}`
        );
        expect(res.status).toBe(401);
      }
    });

    it("returns 204 No Content for deleting a movie", async () => {
      const movies = await request(app)
        .get("/api/v1/movies/me")
        .set("Authorization", `Bearer ${userToken}`);

      if (movies.body.data.length > 0) {
        const res = await request(app)
          .delete(`/api/v1/movies/${movies.body.data[0]._id}`)
          .set("Authorization", `Bearer ${userToken}`);

        expect(res.status).toBe(204);
      }
    });
  });
});
