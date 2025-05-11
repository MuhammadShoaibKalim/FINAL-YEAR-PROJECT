import express from 'express';
import { searchAll } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/all', searchAll);

export default router; 