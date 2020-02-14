<template>
  <div id="app">
    <graph-view class='visualization' :graph='currentGraph' @selected='onVideoSelected' @loadMore='onLoadMore'></graph-view>
    <form id='searchForm' @submit.prevent='searchFormSubmitHandler'>
        <input type='text' id='searchString' placeholder='Enter YouTube search query' :autofocus='autofocus' v-model='searchString'/>
        <input type='submit' id='startSearch' title='Start visualization' value='Show Graph' />
    </form>

    <div class='log-message' v-if='logMessage'>{{logMessage}}</div>
    <video-preview :videoId='selectedVideo' @close='closeVideo' @ended='playNext'></video-preview>
    <div class='footer'>
        <a @click.prevent='showAbout = !showAbout' class='about-link'>About</a>
    </div>
    <div id='copyText'>Made with <span class='heart'>♥</span> by Andrei Kashcha</div>


    <div id='about' v-if='showAbout'>
        <h2>About Yasiv</h2>
        <div style='text-align: left'>
            <p>This web site shows related videos from the YouTube.</p>
            <p>Enter a search term in the box above, and press the "Show Graph" button.</p>
            <p>Each icon is a YouTube video. Each connection means that videos are related (according to YouTube).</p>
            <p><a href='https://twitter.com/anvaka'>Andrei Kashcha</a></p>
        </div>
        <ul>
            <li><a href="https://github.com/anvaka/yasiv-youtube">GitHub</a></li>
            <li><a href="https://twitter.com/#!/yasivcom">Twitter</a></li>
            <li><a href="http://www.facebook.com/pages/Yasiv/234739739945193">Facebook</a></li>
            <li><a href='mailto:anvaka@yasiv.com'>Email</a></li>
        </ul>
        <a href='#' @click.prevent='showAbout = false'  class='close-about' title='Close this message'>Close</a>
    </div>
  </div>
</template>

<script>
import queryState from 'query-state';
import GraphView from './components/GraphView.vue';
import VideoPreview from './components/VideoPreview.vue';

import { buildYouTubeVideoGraph } from './lib/graphBuilder.js';

const qs = queryState();

export default {
  name: 'app',
  data() {
    const searchString = qs.get('q') || '';
    // by default we always want to auto focus search input field,
    // however when our website is embedded into iframe, autofocusing would
    // cause stealing of the view (the page will scroll it into view).
    let autofocus = true;
    // So, if we are embedded into an iframe, we don't want to autofocus
    const isInIFrame = window.self !== window.top;
    if (isInIFrame) autofocus = false;
    // but what if someone still wants to have both iFrame and autofocus?
    // They can pass this intent in the query string as #...&autofocus=1
    const autofocusOverride = qs.get('autofocus');
    if (autofocusOverride !== undefined) {
      autofocus = !!autofocusOverride;
    }

    return {
      request: null,
      logMessage: 'Hello',
      autofocus,
      searchString,
      showAbout: searchString.length === 0,
      selectedVideo: null,
    };
  },

  created() {
    qs.onChange(this.onQueryChange, this);
  },

  computed: {
    currentGraph() {
      if (this.request) {
        return this.request.graph;
      }
    },
  },

  methods: {
    closeVideo() {
      this.selectedVideo = null;
    },
    playNext(endedVideoId) {
      this.lastPlaySession.add(endedVideoId);
      const graph = this.request.graph;
      if (!graph) return;

      let nextVideoId;

      graph.forEachLinkedNode(endedVideoId, (linkedNode) => {
        if (!this.lastPlaySession.has(linkedNode.id)) {
          nextVideoId = linkedNode.id;
          return true; // no need to iterate more
        }
      }, /* enumerateOutBoundOnly = */ true
      );

      if (nextVideoId) {
        this.selectedVideo = nextVideoId;
        return;
      }
      // otherwise, let's pick it random TODO: This could be improved
      graph.forEachNode(node => {
        if (!this.lastPlaySession.has(node.id)) {
          nextVideoId = node.id;
          return true; // no need to iterate more
        }
      });
      if (nextVideoId) {
        this.selectedVideo = nextVideoId;
      }

      // if we get here, it means we played the entire graph. What should we do?
    },
    searchFormSubmitHandler() {
      qs.set({ q: this.searchString });
      this.startSearch();
    },

    onVideoSelected(videoId) {
      this.showAbout = false;
      this.selectedVideo = videoId;
    },

    onLoadMore(videoId) {
      if (this.request) {
        this.request.loadMore(videoId);
      }
    },

    onQueryChange() {
      this.searchString = qs.get('q');
      this.startSearch();
    },

    startSearch() {
      const q = qs.get('q');
      if (!q) return;

      if (this.request) {
        this.request.progress.cancel();
      }

      this.lastPlaySession = new Set();

      this.showAbout = false;
      this.request = buildYouTubeVideoGraph(q);
      this.request.progress.onProgress((msg) => {
        this.logMessage = msg;
      });
    }
  },

  components: {
    GraphView,
    VideoPreview
  }
};
</script>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;

  /* font info has to be applied to body so it applies to mouse overs and date picker */
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.window {
  left: 8px;
  top: 64px;
  width: 420px;
  height: 290px; /* 248 - is golden ratio of 420 + 42px for the header */
  box-shadow: 0 2px 4px rgba(0,0,0,.2), 0 -1px 0 rgba(0,0,0,.02);
}
a.primary-action {
  color: #ff4081;
}
a {
  color: #4183C4;
  text-decoration: none;
  cursor: pointer;
}
a:hover {
  color: #ff4081;
}

.visualization {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#searchForm {
  padding: 0 14px;
  position: absolute;
  white-space: nowrap;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,.2), 0 -1px 0 rgba(0,0,0,.02);
  top: 8px;
  left: 8px;
  width: 420px;
  display: flex;
}
#searchString {
  height: 56px;
  padding-left: 10px;
  font-size: 18px;
  outline: none;
  border: none;
  flex: 1;
}

#searchString:focus {
  border: none;
}

#startSearch {
  color: #4183C4;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  margin-left: 4px;
}

#startSearch:hover {
  color: #ff4081;
}


#header {
    text-align: center;
    background: #6DAEE1;
    position: absolute;
    left: 0;
    width: 100%;
    height: 28px;
    color : white;
}

.footer {
  position: absolute;
  width: 100%;
  bottom : 9px;
  display: flex;
  justify-content: center;
}

#copyText {
  position: absolute;
  left: 10px;
  bottom: 9px;
  font-size: 9px;
  color: #999;
}

#about {
  position: absolute;
  left: 8px;
  padding: 14px;
  top: 64px;
  width: 420px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,.2), 0 -1px 0 rgba(0,0,0,.02);
}
.about-link {
  background: rgba(255, 255, 255, 0.8);
  padding: 0 14px;
}
.close-about {
  float: right;
  margin-right: 14px;
  font-size: 12px;
}

.log-message {
  position: absolute;
  bottom: 42px;
  width: 100%;
  text-align: center;
  color: #ff4081;
  padding: 4px;
  background: rgba(255, 255, 255, 0.8);
}

@media only screen and (max-width: 600px) {
  #searchForm {
    width: 100%;
    top: 0;
    left: 0;
  }
  .window {
    left: 0;
    top: 56px;
    height: 35vh;
    width: 100%;
  }
  #searchString {
    font-size: 14px;
  }

  #about {
    left: 0;
    top: 56px;
    width: 100%;
  }

  .footer {
    padding-right: 14px;
    justify-content: flex-end;
  }
}
.heart {
  color: #ff4081;
}
</style>
