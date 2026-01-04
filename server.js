// Middleware to resolve CORS issues
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Proxy configuration
const apiProxy = createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
    secure: false,
    on: {
        proxyReq: (proxyReq, req, res) => {
            // to modify the request here if needed
        }
    }
});

// Use the proxy for all routes
app.use('/', apiProxy);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Proxying requests to ${process.env.API_URL}`);
});
