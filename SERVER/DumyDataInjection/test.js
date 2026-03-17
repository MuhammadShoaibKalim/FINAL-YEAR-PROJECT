import bcrypt from 'bcrypt';

const password = "Hello@12345678900";
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
console.log(hashedPassword);