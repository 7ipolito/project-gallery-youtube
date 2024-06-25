import { injectable, inject } from 'tsyringe';
import { Playlist, PrismaClient, Video } from '@prisma/client';
import axios from "axios";
@injectable()
export class VideoService {
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  async getVideosByPlaylistId(playlistId:string): Promise<Video[]> {
    // return this.prisma.video.findMany();
    await this.createPlaylist(playlistId);

    return []
  }
  

  async createPlaylist(playlistId: string){
    // `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.GOOGLE_KEY}&part=snippet&playlistId=${playlistId}&maxResults=${process.env.MAX_RESULTS}`
    axios.get(`https://www.googleapis.com/youtube/v3/playlists?key=${process.env.GOOGLE_KEY}&part=snippet&id=${playlistId}&maxResults=${process.env.MAX_RESULTS}`)
    .then(r => {
      const response=r.data.items[0].snippet;
      console.log(response)
      const _playlist ={
        title:response.title,
        description:response.description,
        playlistId:playlistId,
        publishedAt:response.publishedAt
      }

  this.prisma.playlist.create({
        data:{
          ..._playlist,
        }
      }).then(r=>{
        console.log(r)
      }).catch(error=>{
        console.log(error)
      })


    })
    .catch(error => {
      console.error('Axios error:', error);
    });
    }
}
