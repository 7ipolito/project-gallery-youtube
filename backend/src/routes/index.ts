import express from 'express'
import cors from 'cors'
import { generateRelatedVideos, getVideosByPlaylistId } from '../controllers/videoController'

const router = express.Router()

router.get('/videos/findbyPlaylistId', getVideosByPlaylistId)

router.get('/videos/relatedVideos', generateRelatedVideos)

export default router
