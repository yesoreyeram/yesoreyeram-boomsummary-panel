import _ from "lodash";
import { isMatch } from "./../src/utils/BoomUtils";

describe("MatchUtils isMatch Tests", () => {
  let PASS = true;
  let FAIL = false;
  describe("String test", () => {
    describe("string equals", () => {
      it("foo equals foo", () => {
        expect(isMatch("foo", "equals", "foo", "")).toBe(PASS);
      });
      it("foo equals Foo", () => {
        expect(isMatch("foo", "equals", "Foo", "")).toBe(FAIL);
      });
      it("foo equals Foo ignorecase", () => {
        expect(isMatch("foo", "equals ignorecase", "Foo", "")).toBe(PASS);
      });
      it("foo equals boo", () => {
        expect(isMatch("foo", "equals", "boo", "")).toBe(FAIL);
      });
      it("foo is foo", () => {
        expect(isMatch("foo", "is", "foo", "")).toBe(PASS);
      });
      it("foo is boo", () => {
        expect(isMatch("foo", "is", "boo", "")).toBe(FAIL);
      });
    });
    describe("string not equals", () => {
      it("foo not equals foo", () => {
        expect(isMatch("foo", "not equals", "foo", "")).toBe(FAIL);
      });
      it("foo not equals Foo", () => {
        expect(isMatch("foo", "not equals", "Foo", "")).toBe(PASS);
      });
      it("foo not equals Foo ignorecase", () => {
        expect(isMatch("foo", "not equals ignorecase", "Foo", "")).toBe(FAIL);
      });
      it("foo not equals boo", () => {
        expect(isMatch("foo", "not equals", "boo", "")).toBe(PASS);
      });
    });
    describe("string contains", () => {
      it("foo contains fo", () => {
        expect(isMatch("foo", "contains", "fo", "")).toBe(PASS);
      });
      it("foo contains Fo", () => {
        expect(isMatch("foo", "contains", "Fo", "")).toBe(FAIL);
      });
      it("foo contains bo", () => {
        expect(isMatch("foo", "contains", "bo", "")).toBe(FAIL);
      });
    });
  });
  describe("Numbers test", () => {
    describe("number =", () => {
      it("123 = 123", () => {
        expect(isMatch("123", "=", "123", "")).toBe(PASS);
      });
      it("123 = 0123", () => {
        expect(isMatch("123", "=", "0123", "")).toBe(PASS);
      });
      it("123 = 124", () => {
        expect(isMatch("123", "=", "124", "")).toBe(FAIL);
      });
      it("foo = foo", () => {
        expect(isMatch("foo", "=", "foo", "")).toBe(FAIL);
      });
      it("foo = boo", () => {
        expect(isMatch("foo", "=", "boo", "")).toBe(FAIL);
      });
    });
    describe("number !=", () => {
      it("123 != 123", () => {
        expect(isMatch("123", "!=", "123", "")).toBe(FAIL);
      });
      it("123 != 0123", () => {
        expect(isMatch("123", "!=", "0123", "")).toBe(FAIL);
      });
      it("124 != 123", () => {
        expect(isMatch("124", "!=", "123", "")).toBe(PASS);
      });
      it("124 != 0123", () => {
        expect(isMatch("124", "!=", "0123", "")).toBe(PASS);
      });
      it("foo != foo", () => {
        expect(isMatch("foo", "!=", "foo", "")).toBe(FAIL);
      });
    });
    describe("number >", () => {
      it("123 > 123", () => {
        expect(isMatch("123", ">", "123", "")).toBe(FAIL);
      });
      it("123 > 124", () => {
        expect(isMatch("123", ">", "124", "")).toBe(FAIL);
      });
      it("123 > 121", () => {
        expect(isMatch("123", ">", "121", "")).toBe(PASS);
      });
      it("123 > 0121", () => {
        expect(isMatch("123", ">", "0121", "")).toBe(PASS);
      });
      it("0123 > 121", () => {
        expect(isMatch("0123", ">", "121", "")).toBe(PASS);
      });
      it("0123 > 0121", () => {
        expect(isMatch("0123", ">", "0121", "")).toBe(PASS);
      });
    });
    describe("number <", () => {
      it("123 < 123", () => {
        expect(isMatch("123", "<", "123", "")).toBe(FAIL);
      });
      it("123 < 124", () => {
        expect(isMatch("123", "<", "124", "")).toBe(PASS);
      });
      it("123 < 121", () => {
        expect(isMatch("123", "<", "121", "")).toBe(FAIL);
      });
      it("123 < 0121", () => {
        expect(isMatch("123", "<", "0121", "")).toBe(FAIL);
      });
      it("0123 < 121", () => {
        expect(isMatch("0123", "<", "121", "")).toBe(FAIL);
      });
      it("0123 < 0121", () => {
        expect(isMatch("0123", "<", "0121", "")).toBe(FAIL);
      });
      it("0123 < 0124", () => {
        expect(isMatch("0123", "<", "0124", "")).toBe(PASS);
      });
    });
    describe("number <=", () => {
      it("123 <= 123", () => {
        expect(isMatch("123", "<=", "123", "")).toBe(PASS);
      });
      it("123 <= 124", () => {
        expect(isMatch("123", "<=", "124", "")).toBe(PASS);
      });
      it("123 <= 121", () => {
        expect(isMatch("123", "<=", "121", "")).toBe(FAIL);
      });
      it("0123 <= 0124", () => {
        expect(isMatch("0123", "<=", "0124", "")).toBe(PASS);
      });
    });
    describe("number >=", () => {
      it("123 >= 123", () => {
        expect(isMatch("123", ">=", "123", "")).toBe(PASS);
      });
      it("123 >= 124", () => {
        expect(isMatch("123", ">=", "124", "")).toBe(FAIL);
      });
      it("123 >= 121", () => {
        expect(isMatch("123", ">=", "121", "")).toBe(PASS);
      });
      it("0123 >= 0124", () => {
        expect(isMatch("0123", ">=", "0121", "")).toBe(PASS);
      });
      it("0123 >= 0124", () => {
        expect(isMatch("0123", ">=", "0124", "")).toBe(FAIL);
      });
    });
  });
});
