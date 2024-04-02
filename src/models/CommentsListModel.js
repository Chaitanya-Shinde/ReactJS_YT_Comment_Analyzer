export async function fetchComments(videoId, apiKey){
    let allComments = [];
    let nextPageToken = null;		
    do {
        const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&pageToken=${nextPageToken ? nextPageToken : ''}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Collect comments from current page
            const comments = data.items.map(item => item.snippet.topLevelComment.snippet);
            
            // Add comments to the array
            allComments = allComments.concat(comments);

            // Update nextPageToken for pagination
            nextPageToken = data.nextPageToken;
        } catch (error) {
            console.error("Error fetching comments:", error);
            return null;
        }
    } while (nextPageToken && allComments.length < 100); // Continue fetching until 100 comments are reached

    // Return only the first 100 comments
    return allComments.slice(0, 100);
}



