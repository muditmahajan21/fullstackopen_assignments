const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("Blogs are returent as JSON", async () => {
  const response = await api.get("/api/blogs");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");
  expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

test("Check if a blog has id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("A blog can be added to the list", async () => {
  const testBlog = {
    title: "Test Blog",
    author: "Me",
    url: "http://example.com",
    likes: 21,
  };

  await api.post("/api/blogs").send(testBlog).expect(201);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain("Test Blog");
});

test("A blog with empty likes property defaults to zero", async () => {
  const testBlog = {
    title: "Test Blog",
    author: "Me",
    url: "http://example.com",
  };

  await api.post("/api/blogs").send(testBlog).expect(201);

  const response = await api.get("/api/blogs");
  const allLikes = response.body.map((r) => r.likes);

  expect(allLikes[2]).toBeDefined();
  expect(allLikes[2]).toBe(0);
});

test("A blog with empty title property return 400", async () => {
  const testBlog = {
    author: "Me",
    url: "http://example.com",
    likes: 0,
  };

  await api.post("/api/blogs").send(testBlog).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("A blog with empty url property return 400", async () => {
  const testBlog = {
    title: "Test Blog",
    author: "Me",
    likes: 0,
  };

  await api.post("/api/blogs").send(testBlog).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("Deletion of a blog returns 204", async () => {
  const responseBefore = await api.get("/api/blogs");
  const toDelete = responseBefore.body[0];

  await api.delete(`/api/blogs/${toDelete.id}`).expect(204);

  const responseAfter = await api.get("/api/blogs");
  expect(responseAfter.body).toHaveLength(initialBlogs.length - 1);
});

test("Updating the likes of a blog", async () => {
  const responseBefore = await api.get("/api/blogs");
  const toUpdate = responseBefore.body[0];

  const updatedBlog = {
    ...toUpdate,
    likes: toUpdate.likes + 1,
  };

  await api.put(`/api/blogs/${toUpdate.id}`).send(updatedBlog).expect(200);

  const responseAfter = await api.get("/api/blogs");
  expect(responseAfter.body[0].likes).toBe(initialBlogs[0].likes + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
