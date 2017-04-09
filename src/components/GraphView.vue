<template>
  <div>
    <svg>
      <g ref='scene'>
        <g>
          <path stroke='#999'
            :data-from='edge.fromId'
            :data-to='edge.toId'
            :d='computeLinkPath(edge)' v-for='edge in edges'
            marker-end='url(#Triangle)'></path>
        </g>
        <g>
          <image width='60' height='45'
            class='video-thumbnail'
            :data-id='node.id'
            :xlink:href='node.data.imageUrl'
            :x='node.pos.x - 30' :y='node.pos.y - 22.5' v-for='node in nodes'/>
        </g>
        <g>
          <text text-anchor='middle' :x='tooltip.x' :y='tooltip.y' v-if='tooltip.visible'>{{tooltip.text}}</text>
        </g>
      </g>
      <defs>
        <marker id='Triangle' viewBox='0 0 10 10' refX='5' refY='5' markerUnits='strokeWidth' markerWidth='10' markerHeight='5' orient='auto'>
          <path d='M 0 0 L 10 5 L 0 10 z'></path>
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script>
import panZoom from 'panzoom';
import createLayout from 'ngraph.forcelayout';
import { getFromTo } from '../lib/geom.js';

export default {
  name: 'GraphView',
  props: ['graph'],
  data() {
    return {
      nodes: [],
      edges: [],
      tooltip: {
        visible: false,
        text: '',
        x: 0,
        y: 0
      }
    };
  },
  watch: {
    graph(newGraph, oldGraph) {
      if (oldGraph) {
        this.disposeGraph();
      }

      if (!newGraph) {
        return;
      }

      this.initializeGraph();
    }
  },

  mounted() {
    const { scene } = this.$refs;
    this.zoomHandle = panZoom(scene, { bounds: true });
    const rect = this.$el.getBoundingClientRect();
    this.zoomHandle.moveTo(rect.width / 2, rect.height / 2);
    this.initEvents(scene);
    this.initializeGraph(this.graph);
  },

  methods: {
    handleMouseEnter(e) {
      const nodeId = getNodeIdFromDOM(e.target);
      if (!nodeId) return;

      this.clearHighligh();

      forAll(this.$refs.scene, `path[data-from="${nodeId}"], path[data-to="${nodeId}"]`, addClass('hl'));

      const { title } = this.graph.getNode(nodeId).data;
      const position = this.layout.getNodePosition(nodeId);
      this.showTooltip(position, title);
    },

    handleMouseClick(e) {
      const nodeId = getNodeIdFromDOM(e.target);
      if (nodeId) this.$emit('selected', nodeId);
    },

    showTooltip(pos, text) {
      const { tooltip } = this;
      tooltip.text = text;
      tooltip.x = pos.x;
      tooltip.y = pos.y - 42 / 2;
      tooltip.visible = true;
    },

    handleMouseLeave() {
      this.clearHighligh();
    },

    clearHighligh() {
      forAll(this.$refs.scene, '.hl', removeClass('hl'));
    },

    computeLinkPath(edge) {
      const { from, to } = getFromTo(edge);
      let data = 'M';

      data += Math.round(from.x) + ',' + Math.round(from.y);
      data += 'L' + Math.round(to.x) + ',' + Math.round(to.y);

      return data;
    },
    onGraphChanged(changes) {
      this.iterations = 0;
      changes.forEach(change => {
        if (change.changeType === 'add') {
          if (change.node) this.addNode(change.node);
          if (change.link) this.addLink(change.link);
        } else {
          throw new Error('Not implemented');
        }
      });

      this.frame();
    },

    addNode(graphNode) {
      const { id, data } = graphNode;
      const pos = this.layout.getNodePosition(id);

      this.nodes.push({ pos, id, data });
    },

    addLink(graphLink) {
      const { id, fromId, toId } = graphLink;
      const pos = this.layout.getLinkPosition(id);

      this.edges.push({ pos, fromId, toId });
    },

    disposeGraph() {
      if (this.graph) {
        this.graph.off('changed', this.onGraphChanged, this);
        this.nodes = [];
        this.edges = [];
        this.graph = null;
      }
      if (this.layout) {
        this.layout.dispose();
        this.layout = null;
      }
      if (this.layoutLoop) {
        cancelAnimationFrame(this.layoutLoop);
        this.layoutLoop = null;
      }
    },

    initEvents(scene) {
      // TODO: This should be disposed properly
      scene.addEventListener('mouseenter', this.handleMouseEnter.bind(this), true);
      scene.addEventListener('mouseleave', this.handleMouseLeave.bind(this), true);
      // TODO: touch?
      scene.addEventListener('click', this.handleMouseClick.bind(this), true);
    },

    initializeGraph(newGraph) {
      this.layout = createLayout(newGraph, {
        springLength: 80,
        springCoeff: 0.0004,
        dragCoeff: 0.05,
        gravity: -50,
        theta: 0.5
      });
      this.nodes = [];
      this.edges = [];
      const graph = newGraph;

      graph.forEachNode((node) => {
        this.addNode(node);
      });

      graph.forEachLink((link) => {
        this.addLink(link);
      });

      this.graph.on('changed', this.onGraphChanged, this);
      this.boundFrame = this.frame.bind(this);
      this.frame();
    },

    frame() {
      if (!this.layout) return;

      this.layout.step();

      this.iterations += 1;
      if (this.layout.lastMove > 20 || this.iterations < 100) {
        // we assume we are note converged yet.
        this.layoutLoop = requestAnimationFrame(this.boundFrame);
      }
    }
  },

  destroyed() {
    if (this.zoomHandle) {
      this.zoomHandle.dispose();
    }
    this.disposeGraph();
  }
};

function getNodeIdFromDOM(el) {
  const isNode = (el && el.classList.contains('video-thumbnail'));
  if (!isNode) return;

  return el.getAttribute('data-id')
}

function forAll(scene, query, action) {
  (Array.from(scene.querySelectorAll(query))).forEach(action);
}

function addClass(className) {
  return el => el.classList.add(className);
}

function removeClass(className) {
  return el => el.classList.remove(className);
}
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
path.hl {
  stroke: orange;
}
</style>
