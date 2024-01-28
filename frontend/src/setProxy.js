const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://13.125.254.98:3000',
            changeOrigin: true,
        })
    );
};
