
/**
 * Constructs an n-sided polygon given a width, offset and number of verices.
 * 
 * @param {number} width 
 * @param {number} vertices 
 * @param {number} xOffSet 
 * @param {number} yOffSet 
 */
const Ngon = function Ngon(width, vertices, xOffSet, yOffSet) {
  const _geometry = { vertices
    , vertexAngle: 360 / vertices
    , xOffSet
    , yOffSet
  };
  const _elementInfo = {
    svgNS: 'http://www.w3.org/2000/svg'
  };

  const _width = width / 2;
  
  let getXForAngle = theta => (2 * _width * Math.cos(theta)) / Math.sqrt(3);
  let getYForAngle = theta => (2 * _width * Math.sin(theta)) / Math.sqrt(3);
  let rad = deg => deg * Math.PI / 180
  const points = Array(_geometry.vertices)
    .fill(0)
    .map((val, index) => index)
    .map(index => _geometry.vertexAngle * index)
    .map(rad)
    .map(angle => { 
      let x = getXForAngle(angle);
      let y = getYForAngle(angle);
      return { x, y };
    })
    .map(vertex => {
      let x = Math.round(vertex.x)
      let y = Math.round(vertex.y)
      return { x, y };
    })
    .map(vertex => {
      let x = vertex.x + _geometry.xOffSet
      let y = vertex.y + _geometry.yOffSet
      return { x, y }
    });
  let _svgPoints = points
    .map(val => `${val.x},${val.y}`)
    .reduce((memo, point) => memo.length? `${memo} ${point}`: point, '')
    ;
  
  /**
   * A collection of Point objects representing the Ngon.
   * 
   * @property Ngon.Points
   */
  this.Points = points;
    
  /**
   * Generate a polygon element from the Hexagon.
   * 
   * @method Ngon.getPoly
   * @param {string} cssClass
   * @param {string} cssId
   */
  this.getPoly = function getPoly(cssClass = '', cssId = '') {
    let poly = document.createElementNS(_elementInfo.svgNS, 'polygon');
    poly.setAttributeNS(null, 'id', cssId);
    poly.setAttributeNS(null, 'class', cssClass);
    poly.setAttributeNS(null, 'points', _svgPoints);
    poly.setAttributeNS(null, 'style', 'fill: #ededed;stroke:black;stroke-width:5;');
    return poly;
  }
}
