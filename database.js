const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'your_password',
    database: 'ecomerse',
    port: 3306,
    connectionLimit: 5
});

pool.getConnection()
    .then(conn => {
        console.log('Connected to MariaDB!');
        conn.release();
    })
    .catch(err => {
        console.error('Error connecting to MariaDB:', err);
    });

// Function to fetch data
const fetchData = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.execute('SELECT * FROM data');
        return rows;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
};

module.exports = {
    pool,
    fetchData
};