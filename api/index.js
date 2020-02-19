const { AppRunner } = require('./app/runner');
// import { AppRunner } from './src/app/runner';

if (process.env.DB_URL !== undefined) {
    AppRunner(process.env.DB_URL, {
        JWTOKEN: {
            secret: Buffer.from(Math.random().toString(36)).toString('base64'),
        },
        Name: 'Code Challenge',
        Port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
        Timezone: 'UTC',
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
} else {
    console.error('Database configuration required');
    process.exit(1);
}
