import express from 'express'
import cors from 'cors'
import {
    getAllVideos,
    getVideosByTitle,
    getVideosByPlaylistId,
} from '../controllers/videoController'

const router = express.Router()

router.post('/videos/findbyPlaylistId', getVideosByPlaylistId)

router.post('/videos/findbyTitle', getVideosByTitle)

router.get('/videos/findAllVideos', getAllVideos)

export default router
