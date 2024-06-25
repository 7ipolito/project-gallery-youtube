import { container } from 'tsyringe'
import { PrismaClient } from '@prisma/client'
import { VideoService } from './services/videoService'

// Register PrismaClient
container.register<PrismaClient>('PrismaClient', {
    useValue: new PrismaClient(),
})

// Register Services
container.register<VideoService>('VideoService', {
    useClass: VideoService,
})
