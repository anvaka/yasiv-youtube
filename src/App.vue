<template>
  <div id="app">
    <graph-view class='visualization' :graph='currentGraph' @selected='onVideoSelected'></graph-view>
    <form id='searchForm' @submit.prevent='searchFormSubmitHandler'>
        <input type='text' id='searchString' placeholder='Enter YouTube search query' autofocus v-model='searchString'/>
        <input type='submit' id='startSearch' title='Start visualization' value='Show Graph' />
    </form>

    <div id='log'></div>
    <video-preview :videoId='selectedVideo'></video-preview>
    <div id='footer'>
        <div id='footerLinks'>
            <ul style='text-align: center;'>
                <li>
                    <a id='aboutButton' href="">About</a>
                </li>
                <li>
                    <a href="https://twitter.com/#!/yasivcom">Twitter</a>
                </li>
                <li>
                    <a href="http://www.facebook.com/pages/Yasiv/234739739945193">Facebook</a>
                </li>
                <li>
                    <a href='mailto:anvaka@yasiv.com'>Contact</a>
                </li>
            </ul>
        </div>
    </div>
    <div id='copyText'>(C) 2012 Andrei Kashcha</div>


    <div id='about' v-if='showAbout'>
        <h2>About Yasiv</h2>
        <div style='text-align: left'>
            <p>This web site shows related videos from YouTube.</p>
            <p>Just enter a search term in the box above, and press the "Show Graph" button.</p>
            <p>Each icon is a YouTube video. Each connection means that videos are related (according to YouTube).</p>
            <p><a href='https://twitter.com/anvaka'>Andrei Kashcha</a></p>
        </div>
    </div>
  </div>
</template>

<script>
import queryState from 'query-state';
import GraphView from './components/GraphView.vue';
import VideoPreview from './components/VideoPreview.vue';

import { getVideoIdFromUrl } from './lib/utils.js';
import { buildGraphForSearchTerm } from './lib/graphBuilder.js';

const qs = queryState();

export default {
  name: 'app',
  data() {
    const searchString = qs.get('q') || '';

    return {
      request: null,
      logMessage: '',
      searchString,
      showAbout: searchString.length === 0,
      selectedVideo: null,
    };
  },

  created() {
    qs.onChange(this.onQueryChange, this);
    this.startSearch();
  },

  computed: {
    currentGraph() {
      if (this.request) {
        return this.request.graph;
      }
    }
  },

  methods: {
    searchFormSubmitHandler() {
      qs.set({ q: this.searchString });
      this.startSearch();
    },

    onVideoSelected(videoId) {
      this.selectedVideo = videoId;
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
        // TODO: Clean the scene.
      }

      this.request = buildGraphForSearchTerm(q);
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

  /* font info has to be applied to body so it applies to mouseovers and date picker */
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  color: #4183C4;
  text-decoration: none;
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
  margin: 14px;
  position: absolute;
  max-width: 400px;
  white-space: nowrap;
}
#searchString {
  width: 300px;
  height: 28px;
  padding-left: 10px;
  font-size: 14px;
  outline: none;
  border: 1px solid #999;
}

#searchString:focus {
  border: 1px solid #4183C4;
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
#footer {
  position: absolute;
  bottom : 0px;
  left : 50%;
  margin-left: -136px;
  margin-bottom: 5px;
  font-size: 14px;
}

#footerLinks ul {
  margin-top: 0px;
  margin-bottom: 3px;
  padding-left: 0px;
}
#footerLinks ul li {
  display: inline;
  margin-right: 10px;
  padding-right: 9px;
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
  left: 7px;
  padding: 14px;
  top: 50px;
  max-width: 400px;
}
</style>
