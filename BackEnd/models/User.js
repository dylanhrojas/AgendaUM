const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Crear usuario
  static async create(userData) {
    const { username, email, password, role = 'user' } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [username, email, hashedPassword, role]
    );

    return this.findById(result.rows[0].id);
  }

  // Buscar usuario por ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  // Buscar usuario por username
  static async findByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }

  // Obtener todos los usuarios
  static async findAll() {
    const result = await pool.query(
      'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  }

  // Actualizar usuario
  static async update(id, userData) {
    const { username, email, role } = userData;

    await pool.query(
      'UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4',
      [username, email, role, id]
    );

    return this.findById(id);
  }

  // Eliminar usuario
  static async delete(id) {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount > 0;
  }

  // Comparar contraseña
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Verificar si email o username existen
  static async exists(email, username) {
    const result = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    return result.rows.length > 0;
  }
}

module.exports = User;