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


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// useErrorHandlers(app);

module.exports = app;
