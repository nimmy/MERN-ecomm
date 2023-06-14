import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name: "Nimesh Mehra",
        email: 'nimesh.mehra@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name: "Nimmy Mehra",
        email: 'nimesh.mehra@hot.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]


export default users;