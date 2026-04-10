const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Load the User model
const User = require('./models/User');

async function promoteAdmin() {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/masala';
        console.log(`Connecting to: ${uri}`);

        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const email = 'allredz@gmail.com';
        const password = 'AllredzPassword123'; // Default single admin password

        let user = await User.findOne({ email });

        if (!user) {
            console.log(`\nUser not found. Creating new admin user: ${email}`);
            user = new User({
                name: 'Main Admin',
                email: email,
                password: password, // The pre-save hook in User.js will hash this
                isAdmin: true
            });
            await user.save();
            console.log(`\n✅ Success! Created new Admin: ${email}`);
        } else {
            console.log(`\nUser found. Updating permissions and password for: ${email}`);
            user.isAdmin = true;
            user.password = password; // The pre-save hook in User.js will hash this
            await user.save();
            console.log(`\n✅ Success! ${email} is now an Admin with updated password.`);
        }

        console.log(`🔑 Login Credentials:`);
        console.log(`📧 Email: ${email}`);
        console.log(`🔒 Password: ${password}`);
        console.log(`\nLogin here: http://localhost:5173/admin-login`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Promotion script error:', err);
        process.exit(1);
    }
}

promoteAdmin();
