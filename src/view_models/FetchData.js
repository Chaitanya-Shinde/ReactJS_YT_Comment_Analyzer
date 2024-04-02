import { fetchComments } from '../models/CommentsListModel';
import { fetchVideo } from '../models/VideoDetailsModel';

const apiKey = process.env.REACT_APP_YT_API_KEY

export async function fetchAllCommentsOfVideo(videoId) {
    const comments = await fetchComments(videoId, apiKey);
    //return comments.map((item) => item.snippet.topLevelComment.snippet);
    return comments
}


export async function fetchVideoDetails(videoId){
    const details = await fetchVideo(videoId, apiKey);
    return details
}
