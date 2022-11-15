process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "slinky", price:2 }

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items.length = 0;
});
// end afterEach

/** GET /cats - returns `{cats: [cat, ...]}` */

describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(items[0]).toEqual({ name: "slinky", price:2 });
  });
});
// end

/** GET /cats/[name] - return data about one cat: `{cat: cat}` */

describe("GET /items/:name", function() {
  test("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function() {
    const resp = await request(app).get(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** POST /cats - create cat from data; return `{cat: cat}` */

describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "salad",
        price:5
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.item.name).toEqual("salad");
    expect(resp.body.item.price).toEqual(5);
  });
});
// end

/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Troll"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({name: "Troll"});
  });

  test("Responds with 404 if can't find item", async function() {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /items/:name", function() {
  test("Deletes a single a item", async function() {
    const resp = await request(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
// end
