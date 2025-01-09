import aos from "aos";
import fs from "fs";
import path from "node:path";
import assert from "node:assert";
import { describe, test, before } from "node:test";
describe("AOS Tests", () => {
  let env: aos;

  before(async () => {
    const source = fs.readFileSync(
      path.join(__dirname, "./../src/main.lua"),
      "utf-8"
    );

    env = new aos(source);
    await env.init();
  });

  test("should register", async () => {
    const str = await env.send({
      Action: "register",
      Data: "default",
      Tags: [
        {
          id: "1",
        },
        {
          name: "test",
        },
        { design: "temp" },
      ],
    });
    console.log(str);
  });

  test("should get_state", async () => {
    const str = await env.send({
      Action: "get_state",
      Data: "default",
    });
    // assert.equal(JSON.parse(str.Messages[0].Data).status, 1);
    // assert.equal(
    //   JSON.parse(str.Messages[0].Data).data,
    //   JSON.stringify([{ data: "default", name: "test", id: "1" }])
    // );
  });

  test("should get multiple state", async () => {
    await env.send({
      Action: "register",
      Data: "default",
      Tags: [
        {
          id: "2",
        },
        {
          name: "test1",
        },
        { design: "temp1" },
      ],
    });
    await env.send({
      Action: "register",
      Data: "default",
      Tags: [
        {
          id: "3",
        },
        {
          name: "test2",
        },
        {
          design: "temp2",
        },
      ],
    });
    const str = await env.send({
      Action: "get_state",
      Data: "default",
    });
    // assert.equal(JSON.parse(str.Messages[0].Data).status, 1);
    // assert.equal(
    //   JSON.parse(str.Messages[0].Data).data,
    //   JSON.stringify([
    //     { data: "default", name: "test", id: "1" },
    //     { data: "default", name: "test1", id: "2" },
    //     { data: "default", name: "test2", id: "3" },
    //   ])
    // );
  });
  test("register view", async () => {
    //  assert(type(msg.Tags.id) ~= "nil","No id found")
    //   assert(type(msg.Tags.pageid) ~= "nil","No page id found")
    //   assert(type(msg.Tags.date) ~= "nil","No date found")
    //   assert(type(msg.Tags.browser) ~= "nil","No browser found")
    //   assert(type(msg.Tags.os) ~= "nil","No os found")
    //   assert(type(msg.Tags.ip) ~= "nil","No ip found")
    //   assert(type(msg.Tags.timezone) ~= "nil","No timezone found")
    //   assert(type(msg.Tags.loadtime) ~= "nil","No loadtime found")
    //   assert(type(msg.Tags.wallet) ~= "nil","No wallet found")
    //   assert(type(msg.Tags.name) ~= "nil","No name found")
    const str = await env.send({
      Action: "register_view",
      Tags: [
        { id: "1" },
        { pageid: "1" },
        { date: new Date().toTimeString() },
        { browser: "chrome" },
        { os: "windows" },
        { ip: "127.0.0.1" },
        { timezone: "GMT" },
        { loadtime: "132" },
        { wallet: `['arweave']` },
        { name: "test" },
      ],
    });
    assert.equal(str.Messages[0].Data, "Added");
  });
  test("Adding click", async () => {
    //    assert(type(msg.Tags.id) ~= "nil", "No id found")
    // assert(type(msg.Tags.viewid) ~= "nil", "No view id found")
    // assert(type(msg.Tags.date) ~= "nil", "No date found")
    // assert(type(msg.Tags.name) ~= "nil", "No name found")
    await env.send({
      Action: "register_click",
      Tags: [
        { id: "1" },
        { viewid: "1" },
        { date: new Date().toTimeString() },
        { name: "test" },
      ],
    });
    const str = await env.send({
      Action: "get_state",
      Data: "default",
    });
    console.log(str.Messages[0].Data);
  });
  test("Checking handles", async () => {
    const str = await env.send({
      Action: "check",
      Tags: [
        {
          name: "marcons",
        },
      ],
    });
    console.log(str.Messages);
  });
  test("getting handle", async () => {
    const str = await env.send({
      Action: "get_State",
      Tags: [{}],
    });
    console.log(str);
  });
});
