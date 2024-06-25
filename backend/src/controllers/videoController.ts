import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';
import { VideoService } from '../services/videoService';

const userService = container.resolve(VideoService);

export const getAllVideos= async (req: Request, res: Response): Promise<void> => {
  try {
    const videos = await userService.getAllVideos()
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


