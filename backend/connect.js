import mysql from "mysql";


export const db = mysql.createConnection({
    host: 'brdzmfylp6d909rvbx69-mysql.services.clever-cloud.com',
    user: 'uhqnmjcw9vwendil',
    password: 'D5LwPORTgOBxS6foCTjY',
    database: 'brdzmfylp6d909rvbx69',
    port: '3306'
  });