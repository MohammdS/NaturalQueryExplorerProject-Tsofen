// middlewares/errorMiddleware.js

function notFound(req, res, next) {
    res.status(404).json({ error: 'Not Found', path: req.originalUrl });
}
  
function errorMiddleware(err, req, res, next) {
   const status = err.status || err.code || 500;
   const message = err.message || 'Internal Server Error';
   const details = process.env.NODE_ENV !== 'production' ? err.stack : undefined;
 
   console.error('Error:', message, details || '');
   res.status(status).json({ error: message, status, details });
}
  
module.exports = { notFound, errorMiddleware };
