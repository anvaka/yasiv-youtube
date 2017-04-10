<template>
  <window :title='title' v-show='videoId' @close='closeVideo'>
    <div id='player'></div>
  </window>
</template>

<script>
import Window from './Window.vue';

/* globals YT */
export default {
  name: 'VideoPreview',
  props: ['videoId'],
  mounted() {
    if (this.videoId) this.play(this.videoId);
  },
  data() {
    return {
      title: 'Video Preview',
    };
  },

  components: {
    Window
  },

  watch: {
    videoId(newVideoId) {
      this.play(newVideoId);
    }
  },

  methods: {
    closeVideo() {
      this.$emit('close');
    },

    play(videoId) {
      if (this.player) {
        this.player.destroy();
        this.player = null;
      }

      if (!videoId) {
        return;
      }

      this.player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId,
        events: {
          onReady: () => {
            const data = this.player.getVideoData();
            this.title = data.title;
            this.player.playVideo();
          },
          // onError : () => { onPlayerError(); }
        }
      });
    }
  }
};
</script>
<style>
</style>
