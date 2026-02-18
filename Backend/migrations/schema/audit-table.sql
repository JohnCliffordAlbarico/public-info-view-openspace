-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,              -- Who performed the action
    action TEXT NOT NULL,                  -- Action performed (e.g., 'create_user', 'delete_item')
    table_name TEXT NOT NULL,              -- Which table was affected
    record_id INTEGER,                     -- Optional: which record was affected
    old_data TEXT,                         -- Optional: JSON/text of previous data
    new_data TEXT,                         -- Optional: JSON/text of new data
    status TEXT NOT NULL DEFAULT 'success' CHECK(status IN ('success','fail')), -- Action outcome
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- When the action occurred
    FOREIGN KEY (user_id) REFERENCES users(id)
);