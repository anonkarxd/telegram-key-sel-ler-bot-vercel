const basicAuth = require('basic-auth');
const db = require('../utils/db');
module.exports = async (req, res) => {
  const user = basicAuth(req);
  if (!user || user.pass !== process.env.ADMIN_PASSWORD) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
    return res.status(401).send('Access denied');
  }
  const { id } = req.body;
  if (!id) return res.status(400).send('Missing order ID');
  try {
    await db.query('UPDATE orders SET status=$1 WHERE id=$2', ['delivered', id]);
    res.status(200).send('Order marked delivered');
  } catch (err) {
    res.status(500).send('Error updating order');
  }
};
