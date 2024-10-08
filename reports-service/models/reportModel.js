const pool = require('../db');

const Report = {
    createReport: async (reportData) => {
        const { user_id, report_type, report_data } = reportData;
        const result = await pool.query(
            'INSERT INTO reports (user_id, report_type, report_data) VALUES ($1, $2, $3) RETURNING *',
            [user_id, report_type, report_data]
        );
        return result.rows[0];
    },
    getReportsByUserId: async (userId) => {
        const result = await pool.query('SELECT * FROM reports WHERE user_id = $1', [userId]);
        return result.rows;
    },
    // Ajoutez d'autres méthodes selon vos besoins
};

module.exports = Report;
