/**
 * Super simple ajax client
 */
export default function get(url) {
  return new Promise((resolve, reject) => {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', resolveBound);
    oReq.addEventListener('error', reject);
    oReq.open('GET', url);
    oReq.send();

    function resolveBound() {
      resolve(this.responseText);
    }
  });
}
