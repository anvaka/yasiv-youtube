/**
 * Finds a start and the end of an edge, given that the start/end nodes
 * are rectangles.
 */
import intersect from 'gintersect';

const nodeSize = {
  width: 60 * 1.2,
};

export function getFromTo(edge, fromHeight, toHeight) {
  const toPos = edge.to;
  const fromPos = edge.from;
  const halfFrom = (fromHeight / 2) * 1.2;

  const from = intersectRect(
      fromPos.x - nodeSize.width / 2, // left
      fromPos.y - halfFrom, // top
      fromPos.x + nodeSize.width / 2, // right
      fromPos.y + halfFrom, // bottom
      fromPos.x, fromPos.y, toPos.x, toPos.y) || fromPos;

  const halfTo = (toHeight / 2) * 1.2;
  const to = intersectRect(
      toPos.x - nodeSize.width / 2, // left
      toPos.y - halfTo, // top
      toPos.x + nodeSize.width / 2, // right
      toPos.y + halfTo, // bottom
      toPos.x, toPos.y, fromPos.x, fromPos.y) || toPos;

  return { from, to };
}

function intersectRect(left, top, right, bottom, x1, y1, x2, y2) {
  return intersect(left, top, left, bottom, x1, y1, x2, y2) ||
    intersect(left, bottom, right, bottom, x1, y1, x2, y2) ||
    intersect(right, bottom, right, top, x1, y1, x2, y2) ||
    intersect(right, top, left, top, x1, y1, x2, y2);
}
