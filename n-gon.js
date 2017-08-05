
/**
 * Constructs an n-sided polygon given a width, offset and number of verices.
 * 
 * @param {number} width 
 * @param {number} vertices 
 * @param {number} xOffSet 
 * @param {number} yOffSet 
 */
const Ngon = function Ngon(width, vertices) {
  const _width = width / 2;
  const getXForAngle = theta => (2 * _width * Math.cos(theta)) / Math.sqrt(3);
  const getYForAngle = theta => (2 * _width * Math.sin(theta)) / Math.sqrt(3);
  const max = 
  array => 
    field => 
      array.reduce((max, point) => field(point) > max ? field(point): max, field(points[0]));
  const min = 
  array => 
    field => 
      array.reduce((min, point) => field(point) < min ? field(point): min, field(points[0]));

  const radius = Math.floor(getXForAngle(0));
  const rad = deg => deg * Math.PI / 180;

  const _geometry = { vertices
    , vertexAngle: 360 / vertices
  };
  
  const _elementInfo = {
    svgNS: 'http://www.w3.org/2000/svg'
  };

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
      let x = vertex.x + radius;
      let y = vertex.y + radius;
      return { x, y };
    });
  
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
   */
  this.getPoly = function getPoly() {
    let pointsAttr = points
    .map(val => `${val.x},${val.y}`)
    .reduce((memo, point) => memo.length? `${memo} ${point}`: point, '');

    let poly = document.createElementNS(_elementInfo.svgNS, 'polygon');
    poly.setAttributeNS(null, 'points', pointsAttr);
    return poly;
  }

  /**
   * Generate a path element from the Hexagon.
   * 
   * @method Ngon.getPath
   * @param {string} cssClass
   */
  this.getPath = function getPath(cssClass) {
    let path = document.createElementNS(_elementInfo.svgNS, 'path');
    let seed = `M ${points[0].x} ${points[1].y}`;
    let d = points
    .map(val => `L ${val.x} ${val.y}`)
    .reduce((memo, point) => `${memo} ${point}`, seed);
    
    path.setAttributeNS(null, 'class', cssClass);
    path.setAttributeNS(null, 'd', d);
    return path;
  }

  this.getSvg = function getSvg() {
      let preview = document.createElementNS(_elementInfo.svgNS, "svg");
      
      let maxPoint = max(points);
      let x_max = maxPoint(point => point.x);
      let y_max = maxPoint(point => point.y);

      preview.setAttributeNS(null, 'viewBox', `0 0 ${x_max} ${y_max}`);
      preview.setAttributeNS(null, 'width', x_max);
      preview.setAttributeNS(null, 'height', y_max);
      preview.appendChild(this.getPoly());
      return preview;
  }
}
