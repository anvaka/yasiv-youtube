<template>
  <div id='preview' v-if='videoId'>
    <table>
        <tbody>
            <tr>
              <td>
                <div id='videoHeader' class='subtitle'>Video Preview</div>
                <a class="closeVideo" title="Close">close</a>
              </td>
            </tr>
            <tr>
              <td height="100%">
              <div id='videoContent'>
                <div ref='player'></div>
              </div>
              </td>
            </tr>
            <tr>
                <td>
                <div id='status'>
                    <span id='repeatMode'></span>
                    <span id='viewsCount'></span>
                </div>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VideoPreview',
  props: ['videoId'],
  mounted() {
    // if (this.videoId) {
    // }
  }
}
</script>
