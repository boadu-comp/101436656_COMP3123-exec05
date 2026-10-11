const express = require('express');
const path = require('path');

const app = express();
const userRouter = require('./routes/users');

// Middleware
app.use(express.json());

// User Router
app.use('/api/v1/user', userRouter);

// Home Route
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Test route to verify error-handling middleware
app.get('/test-error', (req, res, next) => {
    next(new Error('Test error'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
});

const PORT = process.env.PORT || process.env.port || 8081;

app.listen(PORT, () => {
    console.log('Web Server is listening at port ' + PORT);
});