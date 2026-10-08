import express from 'express'
import { register } from '../Controllers/user.js';

const router = express.Router();

// register 
// @api - /api/user/register
router.post('/register',register);

export default router;