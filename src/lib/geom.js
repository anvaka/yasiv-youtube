/**
 * Finds a start and the end of an edge, given that the start/end nodes
 * are rectangles.
 */
import intersect from 'gintersect';

const nodeSize = {
  width: 60,
  height: 45
};

export function getFromTo(edge) {
  const toPos = edge.to;
  const fromPos = edge.from;

  const from = intersectRect(
      fromPos.x - nodeSize.width / 2, // left
      fromPos.y - nodeSize.height / 2, // top
      fromPos.x + nodeSize.width / 2, // right
      fromPos.y + nodeSize.height / 2, // bottom
      fromPos.x, fromPos.y, toPos.x, toPos.y) || fromPos;

  const to = intersectRect(
      toPos.x - nodeSize.width / 2, // left
      toPos.y - nodeSize.height / 2, // top
      toPos.x + nodeSize.width / 2, // right
      toPos.y + nodeSize.height / 2, // bottom
      toPos.x, toPos.y, fromPos.x, fromPos.y) || toPos;

  return { from, to };
}

function intersectRect(left, top, right, bottom, x1, y1, x2, y2) {
  return intersect(left, top, left, bottom, x1, y1, x2, y2) ||
    intersect(left, bottom, right, bottom, x1, y1, x2, y2) ||
    intersect(right, bottom, right, top, x1, y1, x2, y2) ||
    intersect(right, top, left, top, x1, y1, x2, y2);
}
