import { Request, Response } from "express";
("use strict");

const _hasOwnProperty = Object.prototype.hasOwnProperty;

const Status = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNSUPPORTED_ACTION: 405,
  VALIDATION_FAILED: 422,
  SERVER_ERROR: 500,
  CREATED: 201,
};

function statusMessage(status: any) {
  switch (status) {
    case Status.BAD_REQUEST:
      return "Bad Request";
    case Status.UNAUTHORIZED:
      return "Unauthorized";
    case Status.FORBIDDEN:
      return "Forbidden";
    case Status.NOT_FOUND:
      return "Not Found";
    case Status.UNSUPPORTED_ACTION:
      return "Unsupported Action";
    case Status.VALIDATION_FAILED:
      return "Validation Failed";
    case Status.SERVER_ERROR:
      return "Internal Server Error";
    case status.CREATED:
      return "Created";
  }
}

function jsonResponse(res: Response, body: any, options: any) {
  options = options || {};
  options.status = options.status || Status.OK;
  res.status(options.status).send(body || null);
}

const Api = {
  success(res: Response, message: string, data?: any) {
    jsonResponse(
      res,
      {
        success: true,
        message: message || "",
        data: data || {},
      },
      {
        status: Status.OK,
      }
    );
  },
  badRequest(res: Response, message: string, data?: any) {
    jsonResponse(
      res,
      {
        success: false,
        message: message || "",
      },
      {
        status: Status.BAD_REQUEST,
      }
    );
  },
  created(res: Response, message: string, data?: any) {
    jsonResponse(
      res,
      {
        success: true,
        message: message || "",
        data: data || {},
      },
      {
        status: Status.CREATED,
      }
    );
  },
  unAuthorized(res: Response, message: string, data?: any) {
    jsonResponse(
      res,
      {
        success: false,
        message: message || "",
      },
      {
        status: Status.UNAUTHORIZED,
      }
    );
  },

  ok(res: Response, message: string, data?: any) {
    jsonResponse(
      res,
      {
        success: true,
        message: message || "",
        data: data || {},
      },
      {
        status: Status.OK,
      }
    );
  },
  fail(res: Response, message: string, data?: any) {
    jsonResponse(
      res,
      {
        success: false,
        message: message || "",
        data: data || {},
      },
      {
        status: Status.BAD_REQUEST,
      }
    );
  },
};

export default Api;
