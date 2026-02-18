const db = require('../database/db');
const bcrypt = require('bcrypt');

const { logAudit } = require('../helper/audit.helper');

// Helper function to hash password
function hashPassword(password) {
  return bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt));
}
// Create a new user
async function createUser(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await hashPassword(password);

    // better-sqlite3: synchronous
    const stmt = db.prepare(
      `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`
    );
    const result = stmt.run(username, email, hashedPassword, role || 'user');

    const newUser = db
      .prepare(
        `SELECT id, username, email, role, status, created_at, updated_at FROM users WHERE id = ?`
      )
      .get(result.lastInsertRowid);

    // ✅ Log the successful creation
    logAudit({
      user_id: req.user?.id || null,   // if you have authentication
      action: 'create_user',
      table_name: 'users',
      record_id: newUser.id,
      new_data: JSON.stringify(newUser),
      status: 'success'
    });

    res.status(201).json(newUser);

  } catch (err) {
    // ✅ Log the failure
    logAudit({
      user_id: req.user?.id || null,
      action: 'create_user',
      table_name: 'users',
      status: 'fail'
    });

    res.status(500).json({ error: err.message });
  }
}



// Get all users
function getAllUsers(req, res) {
  try {
    const users = db
      .prepare(
        `SELECT id, username, email, role, status, created_at, updated_at FROM users`
      )
      .all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Get single user by ID
function getUserById(req, res) {
  try {
    const user = db
      .prepare(
        `SELECT id, username, email, role, status, created_at, updated_at FROM users WHERE id = ?`
      )
      .get(req.params.id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Update user
function updateUser(req, res) {
  try {
    const { username, email, role, status } = req.body;

    // 1️⃣ Get old data for audit
    const oldUser = db
      .prepare(
        `SELECT id, username, email, role, status FROM users WHERE id = ?`
      )
      .get(req.params.id);

    if (!oldUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 2️⃣ Perform update
    db.prepare(
      `UPDATE users SET 
        username = COALESCE(?, username),
        email = COALESCE(?, email),
        role = COALESCE(?, role),
        status = COALESCE(?, status)
      WHERE id = ?`
    ).run(username, email, role, status, req.params.id);

    // 3️⃣ Get new data for audit
    const updatedUser = db
      .prepare(
        `SELECT id, username, email, role, status, created_at, updated_at FROM users WHERE id = ?`
      )
      .get(req.params.id);

    // 4️⃣ Log audit
    logAudit({
      user_id: req.user?.id || null,       // from authentication
      action: 'update_user',
      table_name: 'users',
      record_id: updatedUser.id,
      old_data: JSON.stringify(oldUser),
      new_data: JSON.stringify(updatedUser),
      status: 'success'
    });

    res.json(updatedUser);

  } catch (err) {
    // 5️⃣ Log failure
    logAudit({
      user_id: req.user?.id || null,
      action: 'update_user',
      table_name: 'users',
      record_id: req.params.id,
      status: 'fail'
    });

    res.status(500).json({ error: err.message });
  }
}



// Soft-delete user
function deleteUser(req, res) {
  try {
    // 1️⃣ Get old data for audit
    const oldUser = db
      .prepare(`SELECT id, username, email, role, status FROM users WHERE id = ?`)
      .get(req.params.id);

    if (!oldUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 2️⃣ Perform soft-delete
    db.prepare(`UPDATE users SET status = 'deleted' WHERE id = ?`).run(req.params.id);

    // 3️⃣ Log audit
    logAudit({
      user_id: req.user?.id || null,       // from authentication
      action: 'delete_user',
      table_name: 'users',
      record_id: oldUser.id,
      old_data: JSON.stringify(oldUser),
      new_data: JSON.stringify({ ...oldUser, status: 'deleted' }),
      status: 'success'
    });

    res.json({ message: 'User marked as deleted' });

  } catch (err) {
    // 4️⃣ Log failure
    logAudit({
      user_id: req.user?.id || null,
      action: 'delete_user',
      table_name: 'users',
      record_id: req.params.id,
      status: 'fail'
    });

    res.status(500).json({ error: err.message });
  }
}
// Export functions using CommonJS
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};