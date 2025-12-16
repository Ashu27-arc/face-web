// Migration script to move data from JSON files to MongoDB
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({
    path: '.env.local'
});
require('dotenv').config({
    path: '.env'
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/faceauth';
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// User Schema
const UserSchema = new mongoose.Schema({
    userData: {
        name: String,
        email: String,
        phone: String,
    },
    faceDescriptors: [
        [Number]
    ],
    capturedImages: [String],
    registeredAt: Date,
    lastLogin: Date,
    loginCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function migrate() {
    try {
        console.log('🔄 Starting migration...');
        console.log('📡 Connecting to MongoDB:', MONGODB_URI);

        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if users.json exists
        if (!fs.existsSync(USERS_FILE)) {
            console.log('⚠️  No users.json file found. Nothing to migrate.');
            process.exit(0);
        }

        // Read existing users
        const usersData = fs.readFileSync(USERS_FILE, 'utf-8');
        const users = JSON.parse(usersData);

        if (users.length === 0) {
            console.log('⚠️  No users found in users.json');
            process.exit(0);
        }

        console.log(`📊 Found ${users.length} users to migrate`);

        // Migrate each user
        let migrated = 0;
        let skipped = 0;

        for (const user of users) {
            try {
                // Check if user already exists
                const existing = await User.findOne({
                    'userData.email': user.userData.email
                });

                if (existing) {
                    console.log(`⏭️  Skipping ${user.userData.email} (already exists)`);
                    skipped++;
                    continue;
                }

                // Create new user in MongoDB
                await User.create({
                    userData: user.userData,
                    faceDescriptors: user.faceDescriptors,
                    capturedImages: user.capturedImages || [],
                    registeredAt: user.registeredAt || new Date(),
                    loginCount: 0,
                    isActive: true,
                });

                console.log(`✅ Migrated: ${user.userData.email}`);
                migrated++;
            } catch (err) {
                console.error(`❌ Error migrating ${user.userData.email}:`, err.message);
            }
        }

        console.log('\n📈 Migration Summary:');
        console.log(`   ✅ Migrated: ${migrated}`);
        console.log(`   ⏭️  Skipped: ${skipped}`);
        console.log(`   📊 Total: ${users.length}`);

        // Backup old file
        const backupFile = USERS_FILE.replace('.json', `.backup.${Date.now()}.json`);
        fs.copyFileSync(USERS_FILE, backupFile);
        console.log(`\n💾 Backup created: ${backupFile}`);

        console.log('\n✨ Migration completed successfully!');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Disconnected from MongoDB');
    }
}

// Run migration
migrate();