import express from 'express';
import { login, register } from '../services/userservices.js';
const router = express.Router();

router.post('/register', async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body;
        const result = await register({ firstName, lastName, email, password });
        response.status(result.statuscode).send(result.data);
    } catch (error) {
        console.error('Error registering user:', error);
        response.status(500).send({ error: 'Internal server error' });
    }
});
router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        const result = await login({ email, password });
        response.status(result.statuscode).send(result.data);
    } catch (error) {
        console.error('Error logging in user:', error);
        response.status(500).send({ error: 'Internal server error' });
    }
});
export default router;
