import { test as setup, expect } from 'playwright/test';
import path from 'path';

//import fs from 'fs';



const authFile = path.join(__dirname, '../.auth/user.json');

setup('authentication', async ({ request }) => {
    const response = await request.post(`http://localhost:3001/users/login`, {  
        data: {
            user: {
                email: 'playwrightAutomation@testing.com',
                password: 'Pass1234'
            }
        }
    });
    
    const responseBody = await response.json();
    const accessToken = responseBody.user.token;

    await request.storageState({ path: authFile });
});