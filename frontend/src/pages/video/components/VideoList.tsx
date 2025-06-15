import { Link } from "react-router-dom"
import { formatterDate } from "../../../utils/utils"

export const VideoList = ({ videos }: { videos: any }) => {
        return videos.map( ( video: any) => (
            <div key={video.videoId._id} className="overflow-hidden rounded-md border-1 border-gray-600 shadow-md">
                <video src={video.videoId.url_video} ></video>
                <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <Link to={"/dashboard/videos/" + video.videoId._id} className="hover:underline">{video.videoId.nombre}</Link>
                        <p className="text-sm text-gray-300">{formatterDate(video.videoId.fecha)}</p>
                    </div>
                    <div>
                        <p className="bg-[#2266C5] inline-block rounded-full p-1 px-3 text-sm">{video.playerId.nombre} {video.playerId.apellido}</p>
                    </div>
                </div>
            </div>
        )
    )
}