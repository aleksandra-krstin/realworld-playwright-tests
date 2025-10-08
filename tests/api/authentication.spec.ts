import { test, expect } from '@playwright/test';



test('login with valid credentials', async ({ request }) => {

    const response = await request.post('http://localhost:3001/api/users/login', {
        data: {
            "user": {"email": "playwrightAutomation@testing.com", "password": "Pass1234"}
        },
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.user).toHaveProperty('token');
    expect(responseBody.user.email).toBe('playwrightAutomation@testing.com');
}); 


test('login with invalid password', async ({ request }) => {

    const response = await request.post('http://localhost:3001/api/users/login', {
        data: {
            "user": {"email": "playwrightAutomation@testing.com", "password": "TESTPass1234"}
        },
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(403);
    expect(responseBody).toMatchObject({
        "errors": {
            "email or password": expect.arrayContaining(['is invalid'])
        }
    });
});


test('login with invalid email', async ({ request }) => {

    const response = await request.post('http://localhost:3001/api/users/login', {
        data: {
            "user": {"email": "TESTplaywrightAutomation@testing.com", "password": "Pass1234"}
        },
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(403);
    expect(responseBody).toMatchObject({
        "errors": {
            "email or password": expect.arrayContaining(['is invalid'])
        }
    });
});


test('login with missing credentials', async ({ request }) => {

    const response = await request.post('http://localhost:3001/api/users/login', {
        data: {
            "user": {
                "email": "",
                "password": ""
            }
        }
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(422);
    expect(responseBody).toMatchObject({
        "errors":{"email": expect.arrayContaining(["can't be blank"])}
    })
});


test('login with missing email', async ({ request }) => {

    const response = await request.post('http://localhost:3001/api/users/login', {
        data: {
            "user": {
                "email": "",
                "password": "Pass1234"
            }
        }
    });

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(422);
    expect(responseBody).toMatchObject({
        "errors":{"email": expect.arrayContaining(["can't be blank"])}
    })
});


test('login with missing passoword', async ({ request }) => {

    const response = await request.post('http://localhost:3001/api/users/login', {
        data: {
            "user": {
                "email": "playwrightAutomation@testing.com",
                "password": "",
            }
        }

    });
    const responseBody = await response.json();
    expect(response.status()).toBe(422);
    console.log(response)
    expect(responseBody).toMatchObject({
        "errors":{"password": expect.arrayContaining(["can't be blank"])}
    });
});