const basicAuth = require('basic-auth');
const db = require('../utils/db');
module.exports = async (req, res) => {
  const user = basicAuth(req);
  if (!user || user.pass !== process.env.ADMIN_PASSWORD) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
    return res.status(401).send('Access denied');
  }
  try {
    const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching orders');
  }
};
