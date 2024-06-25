import express from 'express';
import cors from 'cors';
import { getAllVideos } from "../controllers/videoController"

const router = express.Router();

router.get('/videos', getAllVideos)

export default router;