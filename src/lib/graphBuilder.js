/**
 * This file builds a graph of YouTube videos for a given search term.
 */
import createGraph from 'ngraph.graph';

import ProgressToken from './ProgressToken.js';
import { searchVideos, findRelatedVideos } from './youtubeClient.js';

const MAX_LEVELS = 1;
const similarPerNode = 10;
const similarPerRequest = 15;

export function buildYouTubeVideoGraph(searchTerm) {
  let root;
  const graph = createGraph({ uniqueLinkIds: false });
  const progress = new ProgressToken();

  // Save videos with processed related videos, s o that `loadMore` doesn't
  // do anythign for them.
  const loadedVideos = new Set();

  searchVideos(searchTerm, (result) => {
    onSearchVideoComplete(result.items && result.items[0], progress);
  }, () => { // error
    progress.complete('No video found for your request');
  });

  return {
    // The progress tells consumers about current status of the graph
    progress,
    // The graph is updated as we discover new vides.
    graph,

    // Load more videos for a given videoId
    loadMore
  };

  function loadMore(videoId) {
    // TODO: This code seem to be duplicated. Consider refactoring it.
    if (loadedVideos.has(videoId)) return;

    findRelatedVideos(videoId, similarPerRequest, (r) => {
      loadedVideos.add(videoId);

      if (progress.isCanceled()) {
        return;
      }

      const result = r.items;

      graph.beginUpdate();

      for (let i = 0; i < result.length; ++i) {
        const similar = result[i];
        const similarId = getVideoId(similar);
        let hasNode = graph.getNode(similarId);

        if (!hasNode && i < similarPerNode) {
          addNodeToGraph(similarId, similar);
          hasNode = similar;
        }

        // The node could be in the graph, but it's not among first top similarPerNode
        // nodes. Nevertheless, we track such relationship and display a link.
        if (!graph.hasLink(videoId, similarId) && hasNode) {
          addLinkToGraphFiltered(similarId, videoId);
        }
      }

      graph.endUpdate();
      progress.complete('');
    }, () => { // Error handler
      progress.update('Could not find related videos for one video.');
    });
  }

  function onSearchVideoComplete(video, progress) {
    if (progress.isCanceled()) {
      return;
    }

    if (video) {
      progress.update('Searching related videos...');

      root = video;
      root.isPinned = true;
      root.isRoot = true;
      const videoId = getVideoId(root);
      addNodeToGraph(videoId, root);

      findRelatedVideos(videoId, 10, (r) => {
        loadedVideos.add(videoId);

        onRelatedToRootFound(r, progress);
      }, () => {
        // TODO: this is error handling code. Could probably provide better
        // reporting
        progress.complete('Could not find related videos');
      });
    } else {
      progress.complete('No videos found for your request');
    }
  }

  function onRelatedToRootFound(relatedResponse, progress) {
    if (progress.isCanceled()) {
      return;
    }

    const result = relatedResponse.items;

    if (!result || result.length === 0) {
      progress.complete();
    }

    graph.beginUpdate();

    for (let i = 0; i < result.length; ++i) {
      const similar = result[i];
      addNodeToGraph(getVideoId(similar), similar);
      addLinkToGraphFiltered(getVideoId(similar), getVideoId(root));
      similar.level = 0;
    }

    graph.endUpdate();

    progress.update('Found ' + result.length + ' related videos. Searching more...');

    loadMissing(result, progress);
  }

  function loadMissing(itemsToProcess, progress) {
    if (progress.isCanceled()) {
      return;
    }

    if (itemsToProcess.length === 0) {
      progress.complete();
    }

    const item = itemsToProcess.shift();
    if (item.level >= MAX_LEVELS) {
      // We are beyond allowed level. Complete the graph building.
      progress.complete();
      return;
    }

    const videoId = getVideoId(item);
    findRelatedVideos(videoId, similarPerRequest, (r) => {
      loadedVideos.add(videoId);

      if (progress.isCanceled()) {
        return;
      }

      const result = r.items;
      graph.beginUpdate();

      for (let i = 0; i < result.length; ++i) {
        const similar = result[i];
        const similarId = getVideoId(similar);
        let hasNode = graph.getNode(similarId);

        if (!hasNode && i < similarPerNode) {
          addNodeToGraph(similarId, similar);
          similar.level = item.level + 1;
          itemsToProcess.push(similar);
          hasNode = similar;
        }

        // The node could be in the graph, but it's not among first top similarPerNode
        // nodes. Nevertheless, we track such relationship and display a link.
        if (!graph.hasLink(videoId, similarId) && hasNode) {
          addLinkToGraphFiltered(similarId, videoId);
        }
      }

      graph.endUpdate();
      progress.update('Found ' + graph.getNodesCount() + ' videos. Searching more...');
      loadMissing(itemsToProcess, progress);
    }, () => { // Error handler
      progress.update('Could not find related videos for one video. Skipping this one and searching for more...');
      loadMissing(itemsToProcess, progress);
    });
  }

  function addNodeToGraph(nodeId, data) {
    graph.addNode(nodeId, extractData(data));
  }

  function extractData(data) {
    const image = data.snippet.thumbnails.medium;

    const width = 60;
    const ratio = width / image.width;

    return {
      image,
      width,
      height: image.height * ratio,
      isPinned: data.isPinned,
      title: data.snippet.title
    };
  }

  function addLinkToGraphFiltered(linkId, rootId) {
    const link = graph.getNode(linkId);
    const root = graph.getNode(rootId);

    if (!link || !root) return;

    graph.addLink(rootId, linkId);
  }
}

function getVideoId(video) {
  return video.id.videoId;
}
