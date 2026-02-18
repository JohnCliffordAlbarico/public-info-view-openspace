const db = require('../database/db');

function logAudit({ user_id, action, table_name, record_id = null, old_data = null, new_data = null, status = 'success' }) {
    const stmt = db.prepare(`
        INSERT INTO audit_logs
        (user_id, action, table_name, record_id, old_data, new_data, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(user_id, action, table_name, record_id, old_data, new_data, status);
}

module.exports = { logAudit };