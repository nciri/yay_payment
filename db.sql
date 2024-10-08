CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE user_roles (
    user_role_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    UNIQUE(user_id, role_id)
);
CREATE TABLE payment_methods (
    payment_method_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    method_type VARCHAR(50) NOT NULL,  -- (e.g., 'credit_card', 'paypal', etc.)
    provider VARCHAR(50),  -- (e.g., 'Visa', 'MasterCard', etc.)
    account_info JSONB NOT NULL,  -- (chiffrement nécessaire)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    payment_method_id INT REFERENCES payment_methods(payment_method_id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    status VARCHAR(20) NOT NULL,  -- (e.g., 'pending', 'completed', 'failed')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_reference VARCHAR(100) UNIQUE
);

CREATE TABLE transaction_logs (
    log_id SERIAL PRIMARY KEY,
    transaction_id INT REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    log_message TEXT NOT NULL,
    log_type VARCHAR(20) NOT NULL,  -- (e.g., 'info', 'warning', 'error')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    notification_type VARCHAR(20) NOT NULL,  -- (e.g., 'email', 'sms')
    status VARCHAR(20) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    transaction_id INT REFERENCES transactions(transaction_id) ON DELETE SET NULL,
    report_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);




