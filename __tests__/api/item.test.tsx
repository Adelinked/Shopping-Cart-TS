import data from "../../pages/api/items";
import { NextApiRequest, NextApiResponse } from "next";
import { createRequest, createResponse, RequestOptions } from "node-mocks-http";
import {
  toBeArray,
  toBeObject,
  toContainKey,
  toBeNumber,
  toBeString,
} from "jest-extended";
expect.extend({ toBeArray, toBeObject, toContainKey, toBeNumber, toBeString });
import { Item } from "../../interfaces";

test("a test", () => {
  expect(2 * 3).toEqual(6);
});

test("get data", () => {
  type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
  type APiResponse = NextApiResponse & ReturnType<typeof createResponse>;
  const req = createRequest<ApiRequest>();
  let res = createResponse<APiResponse>();

  const json = jest.fn();
  const status = jest.fn(() => ({
    json,
  }));
  res = { status };
  data(req, res);
  const arr = json.mock.calls[0][0];

  expect(arr).toBeArray();

  arr.forEach((e: Item) => {
    expect(e).toBeObject();
    expect(e).toContainKey("id");
    expect(e.id).toBeString();
    expect(e).toContainKey("title");
    expect(e.title).toBeString();
    //....
  });
});
