export const notFound = (_req, res, _next) => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};
