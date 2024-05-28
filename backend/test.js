require('dotenv').config();
const JWT_SECRET = process.env.SECRET_KEY;
console.log(JWT_SECRET);