const express = require("express");
const useMiddleware = require("./middleware");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const challengesRouter = require("./routes/challenges");
const emailRouter = require("./routes/emailSubmit");
const useErrorHandlers = require("./middleware/error-handlers");

const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/challenges', challengesRouter);
app.use('/email', emailRouter);
useErrorHandlers(app);

module.exports = app;
