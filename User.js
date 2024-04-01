const db = require('../database');
const Joi = require('joi');

// Validation for user input during registration
function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        username: Joi.string().trim().min(2).max(100).required(),
        password: Joi.string().trim().min(6).required(),
        location: Joi.string().trim().min(2).max(100).required(),
        threshold: Joi.number().integer().min(0).required(),
        interests: Joi.string().valid('soap production', 'Water pollution', 'ACarpet industry', 'Basketry').required()
    });
    return schema.validate(user);
}

// Validation for user input during login
function validateLogin(credentials) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(credentials);
}

// Validation for user input during update
function validateUpdate(updates) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).email(),
        username: Joi.string().trim().min(2).max(200),
        password: Joi.string().trim().min(6),
    });
    return schema.validate(updates);
}

// Register User
function registerUser(user, callback) {
    const { error } = validateUser(user);
    if (error) return callback(error);

    const { email, username, password, location, threshold, interests } = user;

    db.query(
        'INSERT INTO users (email, username, password, location, threshold, interests) VALUES (?, ?, ?, ?, ?, ?)',
        [email, username, password, location, threshold, interests],
        (error, results, fields) => {
            if (error) return callback(error);
            callback(null, results);
        }
    );
}

// Login User
function loginUser(credentials, callback) {
    const { error } = validateLogin(credentials);
    if (error) return callback(error);

    const { email, password } = credentials;

    db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (error, results, fields) => {
            if (error) return callback(error);
            if (results.length === 0) return callback(null, null); // Return null if user not found
            const user = results[0];
            callback(null, user);
        }
    );
}

// Update User
function updateUser(id, updates, callback) {
    const { error } = validateUpdate(updates);
    if (error) return callback(error);

    const { email, username, password } = updates;

    db.query(
        'UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?',
        [email, username, password, id],
        (error, results, fields) => {
            if (error) return callback(error);
            callback(null, results);
        }
    );
}

// Delete User
function deleteUser(id, callback) {
    db.query(
        'DELETE FROM users WHERE id = ?',
        [id],
        (error, results, fields) => {
            if (error) return callback(error);
            callback(null, results);
        }
    );
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
};
