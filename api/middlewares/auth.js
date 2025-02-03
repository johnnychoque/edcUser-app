export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    const accessToken = req.user.accessToken;
    req.customHeaders = {
      ...req.customHeaders,
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    };
    return next();
  }
  res.status(401).json({ error: 'Unauthorized: User not authenticated' });
};