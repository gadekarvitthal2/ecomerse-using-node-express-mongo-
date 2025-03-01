const sequelize = require('sequelize');
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



const sequelizeConn = new sequelize('ecomerse', 'root', 'your_password', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    port: 3306
});

    
// Function to fetch data
const fetchData = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.execute('SELECT * FROM product');
        return rows;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
};

// setData with query
const setData = async (query, data) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(query, data);
    } catch (err) {
        console.error('Error setting data:', err);
        throw err;
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
};

module.exports = {
    // pool,
    fetchData,
    setData,
    sequelizeConn
};