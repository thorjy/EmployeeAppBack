import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
    dialect:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'postgres',
    database:'employee_db'
});

export default sequelize;

