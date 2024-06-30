import { injectable, inject } from 'tsyringe'
import { Playlist, PrismaClient, Video } from '@prisma/client'
import axios from 'axios'
import AppError, { ErroDefaut } from '../errors/AppError'
@injectable()
export class VideoService {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

    async getVideosByPlaylistId(playlistId: string): Promise<Video[]> {
        console.log(playlistId)
        return await this.createPlaylist(playlistId)
    }

    async generateRelatedVideos(id: number): Promise<any> {
        return await this.getRelationedVideo(id)
    }

    async createPlaylist(playlistId: string): Promise<any> {
        const isPlaylist = await this.verifyExistingPlaylist(playlistId)

        if (!isPlaylist) {
            console.log('creating playlist in database')
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.GOOGLE_KEY}&part=snippet&id=${playlistId}&maxResults=${process.env.MAX_RESULTS}`
            )

            const p = response.data.items[0].snippet
            const _playlist = {
                title: p.title,
                description: p.description,
                playlistId: playlistId,
                publishedAt: p.publishedAt,
            }

            await this.prisma.playlist.create({
                data: {
                    ..._playlist,
                },
            })

            return this.createVideos(playlistId)
        } else {
            console.log('getting data existing')
            try {
                const response: any = await this.prisma.video.findMany({
                    where: {
                        playlistId: playlistId,
                    },
                })
                console.log(response)
                if (!response[0].videoId) {
                    this.prisma.playlist.delete({
                        where: {
                            playlistId: playlistId,
                        },
                    })
                } else {
                    console.log('returning data existing')
                    return response
                }
            } catch (error) {
                console.log('deleting playlist corrupted')
                console.log(error)
                const response = this.prisma.playlist
                    .delete({
                        where: {
                            playlistId: playlistId,
                        },
                    })
                    .then((r) => {
                        // console.log(r)
                    })

                console.log(response.then)

                throw new AppError(ErroDefaut)
            }
        }
    }

    async createVideos(playlistId: string): Promise<Video[]> {
        console.log('getting videos and placing in database')
        const allVideos: any = []
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.GOOGLE_KEY}&part=snippet&playlistId=${playlistId}&maxResults=${process.env.MAX_RESULTS}`
        )

        for (let index = 0; index <= 6; index++) {
            const r = response.data.items[index].snippet
            const _video = {
                title: r.title,
                description: r.description,
                thumbnails: r.thumbnails,
                playlistId: playlistId,
                publishedAt: r.publishedAt,
                videoId: r.resourceId.videoId,
            }
            allVideos.push(_video)

            this.prisma.video
                .create({
                    data: {
                        ..._video,
                    },
                })
                .then((r) => {
                    console.log(r)
                })
        }
        return allVideos
    }

    async verifyExistingPlaylist(playlistId: string): Promise<boolean> {
        try {
            const response = await this.prisma.playlist.findUnique({
                where: {
                    playlistId: playlistId,
                },
            })
            return response == null ? false : true
        } catch (error) {
            throw new AppError(ErroDefaut)
        }
    }

    async getRelationedVideo(id: number) {
        const allVideos = this.prisma.video
            .findMany({
                where: {
                    id: {
                        not: id,
                    },
                },
            })
            .catch((e) => {
                console.error(e)
                process.exit(1)
            })
            .finally(async () => {
                await this.prisma.$disconnect()
            })

        return allVideos
    }
}
