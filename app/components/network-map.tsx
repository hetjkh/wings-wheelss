export function NetworkMap() {
  const points = [
    { name: "Khartoum", x: 383, y: 109, dx: -13, dy: 4 },
    { name: "Juba", x: 378, y: 157, dx: -13, dy: 4 },
    { name: "Kampala", x: 381, y: 177, dx: -13, dy: 8 },
    { name: "Nairobi", x: 409, y: 185, dx: 13, dy: 4 },
    { name: "Tanzania", x: 397, y: 208, dx: 13, dy: 8 },
  ];
  return <svg className="j-map" viewBox="0 0 650 340" role="img" aria-label="Illustrated network connecting Dubai with Khartoum, Juba, Kampala, Nairobi and Tanzania">
    <image href="/images/journey/africa-map.svg" x="105" y="0" width="450" height="340" />
    {points.map((point, i) => <path className="j-map-route" key={point.name} d={`M${point.x} ${point.y} Q${390 + i * 19} ${-55 + i * 18} 503 66`} />)}
    {points.map(point => <g key={point.name}><circle cx={point.x} cy={point.y} r="5" /><text x={point.x + point.dx} y={point.y + point.dy} textAnchor={point.dx < 0 ? "end" : "start"}>{point.name}</text></g>)}
    <circle cx="503" cy="66" r="6" /><circle className="j-map-hub" cx="503" cy="66" r="13" /><text x="517" y="62">Dubai</text>
  </svg>;
}
