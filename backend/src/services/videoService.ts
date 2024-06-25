import { injectable, inject } from 'tsyringe';
import { PrismaClient, Video } from '@prisma/client';

@injectable()
export class VideoService {
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  async getAllVideos(): Promise<Video[]> {
    return this.prisma.video.findMany();
  }


}
