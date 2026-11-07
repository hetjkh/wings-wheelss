import fs from "fs";

const src = fs.readFileSync("public/images/home/clientele-paper-tear.svg", "utf8");
fs.writeFileSync("public/images/journey/torn-edge.svg", src);

const flipped = src
  .replace("<polygon", '<g transform="translate(0,150) scale(1,-1)"><polygon')
  .replace("</svg>", "</g></svg>");
fs.writeFileSync("public/images/journey/torn-edge-bottom.svg", flipped);
console.log("wrote torn-edge.svg + torn-edge-bottom.svg from clientele paper tear");
