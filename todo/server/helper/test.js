// helper/test.js
import fs from 'fs';
import path from 'path';
import { pool } from './db.js';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const __dirname = import.meta.dirname;

const initializeTestDb = () => {
    const sqlFilePath = path.resolve(__dirname, '../db.sql'); 
    
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    pool.connect((err, client, done) => {
        if (err) return console.error('Error fetching client from pool:', err);

        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);
        
        const executeStatements = (index) => {
            if (index >= statements.length) {
                console.log('Test database initialized successfully');
                done();
                return;
            }

            client.query(statements[index], (err) => {
                if (err) {
                    console.error('Error initializing test database:', err, 'Statement:', statements[index]);
                    done();
                    return;
                }
                executeStatements(index + 1);
            });
        };

        executeStatements(0);
    });
};

const insertTestUser = (user) => {
    hash(user.password, 10, (err, hashedPassword) => {
        if (err) return console.error(err);
        pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', [user.email, hashedPassword], (err) => {
            if (err) console.error(err);
            else console.log('Test user inserted successfully');
        });
    });
};

const getToken = (email) => jwt.sign({ email }, process.env.JWT_SECRET);

export { initializeTestDb, insertTestUser, getToken };