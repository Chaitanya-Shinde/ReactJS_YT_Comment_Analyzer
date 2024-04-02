export async function fetchVideo(videoId, apiKey) {
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    let data = await fetch(url)
    let parsedData = await data.json();
    return parsedData.items[0].snippet;
  }