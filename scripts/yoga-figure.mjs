const ink = "#443d39";
const hair = "#332a2b";
const skin = ["#bd8164", "#d49a79"];
const pants = ["#426451", "#557c66"];
const shirt = "#dfa294";

const point = ([x, y]) => `${x} ${y}`;
const path = (points) => `M${points.map(point).join("L")}`;
const add = ([x, y], [dx, dy]) => [x + dx, y + dy];
const mix = (a, b, t) => a.map((n, i) => Math.round((n + (b[i] - n) * t) * 10) / 10);
const line = (d, color, width) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;

function extremity([x, y, angle = 0], color, kind) {
  const outline = kind === "foot"
    ? "M-8-5Q-3-9 1-5L7-1Q13 0 16 3Q19 6 15 8L-3 8Q-9 8-9 2Z"
    : "M-5-4Q0-6 4-4L7-6Q10-7 10-4L7-1L15-1Q18 0 16 3Q11 7 5 6L-4 5Z";
  return `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="${outline}" fill="${color}" stroke="${ink}" stroke-width="1.5" stroke-linejoin="round"/>${line(kind === "foot" ? "M11 3l2 1" : "M10 2l4-1", "#965e4e", 1)}</g>`;
}

function limb(root, [joint, tip], side, isLeg) {
  const color = isLeg ? pants[side] : skin[side];
  const upper = isLeg ? 23 : 15;
  const lower = isLeg ? 17 : 11;
  const end = mix(joint, tip, isLeg ? 0.91 : 0.96);
  return `${line(path([root, joint]), ink, upper + 2.6)}${line(path([joint, end]), ink, lower + 2.6)}${line(path([root, joint]), color, upper)}${line(path([joint, end]), color, lower)}${isLeg ? line(path([mix(root, joint, 0.22), mix(root, joint, 0.69)]), side ? "#7d9a83" : "#607c69", 1.5) : ""}${extremity(tip, skin[side], isLeg ? "foot" : "hand")}`;
}

function face([x, y, angle = 0], view, closedEyes) {
  const front = view === "front";
  const flip = view === "left" ? -1 : 1;
  return `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${flip} 1)">
    <circle cx="${front ? 13 : -13}" cy="-14" r="8" fill="${hair}" stroke="${ink}" stroke-width="1.5"/>
    <path d="${front ? "M-15-7Q-13-23 1-21Q15-21 16-5L14 6Q11 17 1 18Q-10 17-14 7Z" : "M-15-7Q-14-22 1-21Q14-22 15-8L19 0Q21 3 16 5L15 11Q13 18 5 18Q-7 18-13 7Z"}" fill="${skin[1]}" stroke="${ink}" stroke-width="1.5"/>
    <path d="${front ? "M-15 3Q-21-10-13-18Q-5-26 8-21Q21-17 15 4L12-8Q4-7-2-14Q-6-5-13-4Z" : "M-14 7Q-21-2-17-13Q-13-25 3-22Q16-22 16-8Q9-8 5-14Q0-5-9-4L-10 5Z"}" fill="${hair}"/>
    ${closedEyes ? line(front ? "M-9 1q3 2 6 0m6 0q3 2 6 0" : "M7-1q3 2 6 0", ink, 1.3) : front ? '<circle cx="-6" cy="1" r="1.35" fill="#443d39"/><circle cx="6" cy="1" r="1.35" fill="#443d39"/>' : '<ellipse cx="10" cy="-1" rx="1.4" ry="1.6" fill="#443d39"/><path d="M-11 1q-4-2-3 2t4 3" fill="none" stroke="#965e4e" stroke-width="1.2"/>'}
    ${line(front ? "M-3 9q3 2 6 0" : "M10 9q2 1 5 0", "#804d42", 1.25)}
  </g>`;
}

export function bolster(x, y, width, height, angle = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${angle})"><rect width="${width}" height="${height}" rx="${Math.min(height / 2, 12)}" fill="#d8b995" stroke="#9d7e64" stroke-width="1.5"/><path d="M8 ${height - 5}h${width - 16}" stroke="#bc9676" fill="none"/></g>`;
}

export function block(x, y, width, height) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="3" fill="#d8b995" stroke="#9d7e64" stroke-width="1.5"/>`;
}

function torso(hip, shoulder, front) {
  const dx = shoulder[0] - hip[0];
  const dy = shoulder[1] - hip[1];
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dx, -dy) * 180 / Math.PI;
  const top = front ? 24 : 16;
  const base = front ? 19 : 15;
  const shoulderY = -length;
  return `<g transform="translate(${point(hip)}) rotate(${angle.toFixed(2)})">
    <path d="M${-base - 2} 2Q${-base - 1} 13 0 13Q${base + 1} 13 ${base + 2} 2L${base} -14H${-base}Z" fill="${pants[1]}" stroke="${ink}" stroke-width="1.5"/>
    <path d="M${-base} -10Q${-base + 4} -28 ${-top} ${shoulderY + 11}Q${-top - 4} ${shoulderY - 3} 0 ${shoulderY - 5}Q${top + 4} ${shoulderY - 3} ${top} ${shoulderY + 11}Q${base - 4} -29 ${base} -10Q0 -5 ${-base} -10Z" fill="${shirt}" stroke="${ink}" stroke-width="1.5"/>
    ${line(`M-7 ${shoulderY - 3}Q0 ${shoulderY + 5} 7 ${shoulderY - 3}`, "#a9655c", 1.5)}
    ${line(`M${-base + 4} -13Q0 -9 ${base - 4} -13`, "#f0b9aa", 1.5)}
  </g>`;
}

export function renderFigure({ head, hip, shoulder, arms, legs, view = "right", front = view === "front", roots, props = "", ground = 300, mat = false, closedEyes = false }, description, { hero = false } = {}) {
  const armRoots = roots?.arms ?? (front ? [[-22, 3], [22, 3]] : [[-7, -4], [6, 4]]);
  const legRoots = roots?.legs ?? (front ? [[-14, 4], [14, 4]] : [[-6, -3], [7, 4]]);
  const neck = mix(shoulder, head, 0.84);
  let stage = `<ellipse cx="240" cy="${ground + 6}" rx="151" ry="8" fill="#e2e2d7"/>`;
  if (mat === "overhead") {
    stage = '<rect x="77" y="116" width="326" height="138" rx="11" fill="#a4b8a4" stroke="#819b84" stroke-width="1.4"/><rect x="83" y="122" width="314" height="126" rx="8" fill="none" stroke="#c6d2be" stroke-width="1.5"/>';
  } else if (mat) {
    stage = `<path d="M84 ${ground - 4}H396L420 ${ground + 13}Q422 ${ground + 16} 415 ${ground + 16}H65Q58 ${ground + 16} 60 ${ground + 13}Z" fill="#a4b8a4" stroke="#819b84" stroke-width="1.4"/><path d="M72 ${ground + 12}h336" fill="none" stroke="#c6d2be" stroke-width="1.5"/>`;
  }
  const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360" role="img">
  <title>${escape(description)}</title>
  <rect width="480" height="360" fill="#f1f1e8"/>
  <ellipse cx="${hero ? 350 : 240}" cy="187" rx="${hero ? 115 : 171}" ry="125" fill="#e9ede1"/>
  <g${hero ? ' transform="translate(184 26) scale(.72)"' : ""}>
    ${stage}${props}
    ${limb(add(hip, legRoots[0]), legs[0], 0, true)}
    ${limb(add(shoulder, armRoots[0]), arms[0], 0, false)}
    ${limb(add(hip, legRoots[1]), legs[1], 1, true)}
    ${line(path([shoulder, neck]), ink, 16)}${line(path([shoulder, neck]), skin[1], 13)}
    ${torso(hip, shoulder, front)}
    ${limb(add(shoulder, armRoots[1]), arms[1], 1, false)}
    ${face(head, view, closedEyes)}
  </g>
</svg>\n`;
}
