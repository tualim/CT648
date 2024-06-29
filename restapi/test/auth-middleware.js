const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/is-auth");
const sinon = require("sinon");

describe("Auth middleware", function () {
  it("should throw error if no auth header is present", function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should throw an error if authorization is only use 1 string", function () {
    const req = {
      get: function (headerName) {
        return "xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield userId after decoded the token", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyz";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    jwt.verify.restore();
  });

  it("should throw an error if the token cannot be verify", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
