require("dotenv").config();
// const bcrypt = require("bcrypt");
const { pool } = require("../../libs/db/pool");

const express = require("express");
const {
  generateUserUpdateQuery,
} = require("../../sql_query/user-insert-query");
const authRoute = express.Router();
const { createPagination } = require("../../controller/pagination");

const {
  insertUserQuery,
  getUserRow,
  getUser,
} = require("../../sql_query/user-insert-query"); // insert-query
const {
  jwtAuthenticate,
} = require("../../middlewares/auth-token/authenticate-token");
const {
  signupUserValidation,
} = require("../../middlewares/signup/middleware-signup"); //
const {
  loginUserValidation,
} = require("../../middlewares/login/middleware-login");
const { loginQuery } = require("../../sql_query/login-query"); // login-query
const {
  updatedUserBodyData,
} = require("../../middlewares/signup/update-user-middleware");
const {
  getUserBodyData,
} = require("../../middlewares/signup/update-user-validator");

const jwt = require("jsonwebtoken");

// User Sign Up Function

authRoute.post("/signup", signupUserValidation, async (req, res) => {
  // validate user information by userValidation middleware
  // Insert user in the database

  const user = req.body.user;

  console.log(user);

  // Convert normal password in bcrypt hash formate

  let _password;
  try {
    _password = await bcrypt.hash(user.USER_PASSWORD, 10);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }

  const _values = [user.USER_NAME, user.USER_EMAIL, _password];

  try {
    const [result] = await pool.query(insertUserQuery, _values);

    if (result.affectedRows === 1) {
      return res.status(201).send({
        status: "success",
        message: "user-created-successfully",
      });
    } else {
      return res.status(400).send({
        status: "failed",
        message: "failed-to-create-user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }
});

// User Log In Function

authRoute.post("/login", loginUserValidation, async (req, res) => {
  // loginUserValidation is the middleware for login-validation

  const user = req.body.user;

  try {
    const [result] = await pool.query(loginQuery, [user.username]);

    if (result.length > 0) {
      const hashPassword = result[0].USER_PASSWORD; // Collect bcrypted password

      const isPasswordCorrect = await bcrypt.compare(
        user.password,
        hashPassword
      ); //compare passwords

      if (!isPasswordCorrect) {
        return res.status(400).send({
          status: "failed",
          message: "username-or-password-is-not-valid",
        });
      } else {
        const token = jwt.sign(
          {
            username: result[0].USER_NAME,
            email: result[0].USER_EMAIL,
            role: result[0].USER_ROLE,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "90d",
          }
        );

        return res.status(202).send({
          status: "success",
          token: token,
          message: "user-successfully-login",
        });
      }
    } else {
      return res.status(400).send({
        status: "failed",
        message: "username-or-password-is-not-valid",
      });
    }
  } catch (err) {
    // console.log({ err })
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }
});

authRoute.put(
  "/update/:id",
  jwtAuthenticate,
  getUserBodyData,
  updatedUserBodyData,
  async (req, res) => {
    const userData = req.body.userData;

    try {
      const [userUpdateQuery, userUpdateValue] =
        generateUserUpdateQuery(userData);
      console.log(userUpdateValue);

      if (userUpdateValue.length < 2) {
        return res.status(304).send({
          status: "failed",
          message: "you-have-to-pass-at-least-one-value",
        });
      } else {
        const [result] = await pool.query(userUpdateQuery, userUpdateValue);
        if (result.affectedRows === 1) {
          return res.status(200).send({
            status: "success",
            message: "user-data-updated-successfully",
          });
        }
      }
    } catch {
      return res.status(400).send({
        status: "failed",
        message: "internal-server-error",
      });
    }
  }
);

authRoute.get(
  "/get-user",
  jwtAuthenticate,
  createPagination,
  async (req, res) => {
    const paginationData = req.body.paginationData;
    try {
      const [rows] = await pool.query(getUserRow);
      const [result] = await pool.query(getUser, [
        paginationData.itemsPerPage,
        paginationData.offset,
      ]);
      let totalRows = 0;
      if (rows.length <= 0) {
        return res.status(506).send({
          status: "failed",
          message: "user-data-not-found",
        });
      } else {
        totalRows = rows[0].TOTAL_ROWS;
        return res.status(200).send({
          metadata: {
            pageNo: paginationData.currentPageNumber + 1,
            printItemNo: paginationData.itemsPerPage,
            totalRows: totalRows,
          },
          data: { result },
          status: "success",
        });
      }
    } catch (error) {
      // console.log(error);
      return res.status(500).send({
        status: "failed",
        message: "internal-server-error",
      });
    }
  }
);

module.exports = {
  authRoute,
};
