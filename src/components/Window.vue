<template>
  <div class='window' :style='getStyle()'>
    <div class='header' ref='header'>
      <span class='title'>{{title}}</span>
      <a class='close-video no-drag' title="Close" @click.prevent='requestClose'>close</a>
    </div>
    <div class='content'>
      <slot></slot>
    </div>
    <div ref='left' class='left resize'></div>
    <div ref='right' class='right resize'></div>
    <div ref='top' class='top resize'></div>
    <div ref='bottom' class='bottom resize'></div>
    <div ref='leftTop' class='left-top resize'></div>
    <div ref='rightTop' class='right-top resize'></div>
    <div ref='leftBottom' class='left-bottom resize'></div>
    <div ref='rightBottom' class='right-bottom resize'></div>
  </div>
</template>

<script>

import createDrag from '../lib/drag.js';

export default {
  name: 'Window',
  props: ['title', 'width', 'height', 'x', 'y', 'noDrag'],
  data() {
    // 'c' stands for 'current'
    return {
      moved: false,
      cWidth: this.width || 420,
      cHeight: this.height || 290,
      cX: this.x || 0,
      cY: this.y || 0
    };
  },

  mounted() {
    initDefaultPos(this.$el, this);

    const drags = createMovers().map(mover => {
      return createDrag(this.$refs[mover.name], (dx, dy) => {
        const pos = mover.update(this, dx, dy);
        if (pos.cX !== undefined) {
          if (pos.cX >= 0) this.cX = pos.cX;
        }
        if (pos.cY !== undefined) {
          if (pos.cY >= 0) this.cY = pos.cY;
        }
        // TODO: This should not be really hardcoded.
        if (pos.cWidth !== undefined) {
          if (pos.cWidth >= 300) this.cWidth = pos.cWidth;
        }
        if (pos.cHeight !== undefined) {
          if (pos.cHeight >= 240) this.cHeight = pos.cHeight;
        }
        this.moved = true;
      });
    });

    this.drags = drags;
  },

  destroyed() {
    if (this.drags) {
      this.drags.forEach(drag => drag.dispose());
    }
  },

  methods: {
    getStyle() {
      if (this.moved) {
        return {
          left: this.cX + 'px',
          top: this.cY + 'px',
          width: this.cWidth + 'px',
          height: this.cHeight + 'px'
        };
      }
    },
    requestClose() {
      this.$emit('close', this);
    },
  }
};

function createMovers() {
  return [{
    name: 'header',
    update(pos, dx, dy) {
      return {
        cX: pos.cX + dx,
        cY: pos.cY + dy
      };
    }
  }, {
    name: 'right',
    update(pos, dx) {
      return {
        cWidth: pos.cWidth + dx
      };
    }
  }, {
    name: 'left',
    update(pos, dx) {
      return {
        cX: pos.cX + dx,
        cWidth: pos.cWidth - dx
      };
    }
  }, {
    name: 'top',
    update(pos, dx, dy) {
      return {
        cY: pos.cY + dy,
        cHeight: pos.cHeight - dy
      };
    }
  }, {
    name: 'bottom',
    update(pos, dx, dy) {
      return {
        cHeight: pos.cHeight + dy
      };
    }
  }, {
    name: 'leftBottom',
    update(pos, dx, dy) {
      return {
        cX: pos.cX + dx,
        cWidth: pos.cWidth - dx,
        cHeight: pos.cHeight + dy
      };
    }
  }, {
    name: 'rightBottom',
    update(pos, dx, dy) {
      return {
        cHeight: pos.cHeight + dy,
        cWidth: pos.cWidth + dx
      };
    }
  }, {
    name: 'leftTop',
    update(pos, dx, dy) {
      return {
        cY: pos.cY + dy,
        cX: pos.cX + dx,
        cHeight: pos.cHeight - dy,
        cWidth: pos.cWidth - dx
      };
    }
  }, {
    name: 'rightTop',
    update(pos, dx, dy) {
      return {
        cY: pos.cY + dy,
        cHeight: pos.cHeight - dy,
        cWidth: pos.cWidth + dx
      };
    }
  }];
}

function initDefaultPos(el, pos) {
  const style = window.getComputedStyle(el);
  pos.cX = parsePx(style.left);
  pos.cY = parsePx(style.top);
  pos.cHeight = parsePx(style.height);
  pos.cWidth = parsePx(style.width);
}

function parsePx(str) {
  if (!str) return 0;

  return Number.parseInt(str, 10);
}
</script>

<style scoped>
.window {
  position: absolute;
  background: RGB(51, 182, 121);
}

.content {
  position: absolute;
  top: 42px;
  left: 2px;
  right: 2px;
  bottom: 2px;
}

.resize {
  position: absolute;
}

.resize.top, .resize.bottom {
  width: 100%;
  height: 4px;
  cursor: ns-resize;
}

.resize.top {
  top: -2px;
}
.resize.bottom {
  bottom: -2px;
}
.resize.left {
  right: -2px;
}
.resize.left {
  left: -2px;
}

.resize.left, .resize.right {
  height: 100%;
  width: 4px;
  cursor: ew-resize;
  top: 0;
}

.resize.right {
  right: -1px;
}

.left-top, .right-top, .left-bottom, .right-bottom {
  width: 16px;
  height: 16px;
}
.right-top {
  cursor: nesw-resize;
  right: -8px;
  top: -8px;
}

.left-top {
  cursor: nwse-resize;
  top: -8px;
  left: -8px;
}

.right-bottom {
  cursor: nwse-resize;
  right: -8px;
  bottom: -8px;
}
.left-bottom {
  cursor: nesw-resize;
  bottom: -8px;
  left: -8px;
}
.close-video {
  color: white;
  cursor: pointer;
}

.header {
  height: 42px;
  align-items: center;
  display: flex;
  padding: 0 14px;
  justify-content: space-between;
  color: white;
  cursor: move;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  margin-right: 20px;
  text-overflow: ellipsis;
}
</style>
