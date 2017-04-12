/**
 * Super simple YouTube ajax client
 */
import httpGet from './restClient.js';

const key = 'AIzaSyAb3ea-42-gpQf0-p9XdHbY30jI4ntqPNI';
const origin = 'https://www.googleapis.com/youtube/v3/';

function buildParameters(request) {
  request.key = key;
  request.type = 'video';

  return Object.keys(request).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(request[key]);
  }).join('&');
}

function makeRequestToOrigin(origin, request, callback, error) {
  const parameters = buildParameters(request);

  if (parameters.length === 0) {
    throw new Error('Invalid request arguments');
  }

  const dataUrl = origin + (origin.indexOf('?') === -1 ? '?' : '&') + parameters;

  return httpGet(dataUrl).then(msg => {
    callback(JSON.parse(msg));
  }).catch((err) => {
    console.log('Caught error', err);
    error(err);
  });
}

function makeRequest(request, callback, error) {
  return makeRequestToOrigin(origin + 'search', request, callback, error);
}

export function searchVideos(query, callback, error, extra) {
  const args = Object.assign({
    part: 'snippet',
    q: query,
    maxResults: 10
  }, extra);

  return makeRequest(args, callback, error);
}

export function findRelatedVideos(video, maxResults, callback, error) {
  return makeRequest({
    part: 'snippet',
    maxResults: (typeof maxResults === 'number' ? maxResults : 10),
    relatedToVideoId: video.id.videoId
  }, callback, error);
}
