const { pool } = require('../config/database');

class Contact {
  // Crear contacto
  static async create(contactData) {
    const { name, address, phone, email, facebook, gender, created_by } = contactData;

    const result = await pool.query(
      `INSERT INTO contacts (name, address, phone, email, facebook, gender, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [name, address, phone, email, facebook, gender, created_by]
    );

    return this.findById(result.rows[0].id);
  }

  // Buscar contacto por ID
  static async findById(id) {
    const result = await pool.query(
      `SELECT c.*, u.username as created_by_username
       FROM contacts c
       LEFT JOIN users u ON c.created_by = u.id
       WHERE c.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Obtener todos los contactos de un usuario
  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM contacts WHERE created_by = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  // Obtener contacto por ID y usuario
  static async findByIdAndUser(id, userId) {
    const result = await pool.query(
      'SELECT * FROM contacts WHERE id = $1 AND created_by = $2',
      [id, userId]
    );
    return result.rows[0];
  }

  // Obtener todos los contactos
  static async findAll() {
    const result = await pool.query(
      `SELECT c.*, u.username as created_by_username
       FROM contacts c
       LEFT JOIN users u ON c.created_by = u.id
       ORDER BY c.created_at DESC`
    );
    return result.rows;
  }

  // Actualizar contacto
  static async update(id, contactData) {
    const { name, address, phone, email, facebook, gender } = contactData;

    await pool.query(
      `UPDATE contacts SET name = $1, address = $2, phone = $3, email = $4, facebook = $5, gender = $6
       WHERE id = $7`,
      [name, address, phone, email, facebook, gender, id]
    );

    return this.findById(id);
  }

  // Eliminar contacto
  static async delete(id) {
    const result = await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    return result.rowCount > 0;
  }

  // Eliminar contacto por usuario
  static async deleteByIdAndUser(id, userId) {
    const result = await pool.query(
      'DELETE FROM contacts WHERE id = $1 AND created_by = $2',
      [id, userId]
    );
    return result.rowCount > 0;
  }
}

module.exports = Contact;