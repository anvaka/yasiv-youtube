const YOUTUBE_LINK = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

export function getVideoIdFromUrl(url) {
  const match = url.match(YOUTUBE_LINK);
  if (match && match[7].length === 11) {
    return match[7];
  }
}

