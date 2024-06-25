import { injectable, inject } from 'tsyringe';
import { Playlist, PrismaClient, Video } from '@prisma/client';
import axios from "axios";
@injectable()
export class VideoService {
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  async getVideosByPlaylistId(playlistId:string): Promise<any> {
    // return this.prisma.video.findMany();
   
   
    
    return await this.createPlaylist(playlistId);
  }
  

  async createPlaylist(playlistId: string):Promise<any>{
    const isPlaylist = await this.verifyExistingPlaylist(playlistId);
    if(!isPlaylist){
      console.log("creating playlist in database")

    axios.get(`https://www.googleapis.com/youtube/v3/playlists?key=${process.env.GOOGLE_KEY}&part=snippet&id=${playlistId}&maxResults=${process.env.MAX_RESULTS}`)
    .then(r => {
      const response=r.data.items[0].snippet;
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
        this.createVideos(playlistId)
      })
      .catch(error=>{
        throw new Error(error)
      })


    })
    .catch(error => {
      throw new Error(error)
    });
     
    }else{
      console.log("getting data existing")
      return this.prisma.video.findMany({where:{
        playlistId:playlistId
      }})
    }
    }

    async createVideos(playlistId: string){
      console.log("getting videos and placing in database")
      axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.GOOGLE_KEY}&part=snippet&playlistId=${playlistId}&maxResults=${process.env.MAX_RESULTS}`)
      .then(r => {
        for (let index = 0; index < r.data.pageInfo.totalResults; index++) {
        
          const response=r.data.items[index].snippet;
        const _video ={
          title:response.title,
          description:response.description,
          thumbnails:response.thumbnails,
          playlistId:playlistId,
          publishedAt:response.publishedAt
        }
  
      this.prisma.video.create({
          data:{
            ..._video,

          }
        }).then(r=>{
          console.log(r)
        })
        
        .catch(error=>{
          throw new Error(error)
        })
  
        }
        
  
      })
      .catch(error => {
        throw new Error(error)
      });
     

      }

      async verifyExistingPlaylist(playlistId: string):Promise<boolean>{
       
        const response = await this.prisma.playlist.findUnique({where:{
          playlistId:playlistId
        }})
        return response==null?false:true;
      }
}
