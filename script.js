// SOUND MANAGER

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();
const frequencies = [350, 300, 250, 200, 150];
const volumes = [0.04, 0.03, 0.02, 0.01, 0.01];

const Sound = {
  playTone(freq, volume = 0.03, duration = 0.5, type = 'sine') {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  },

  
  playMark(i = 0) {
    i = Math.min(i, 4);
    this.playTone(frequencies[4 - i], volumes[i], 0.5);
  },

  playUnmark(i = 0) {
    i = Math.min(i, 4);
    this.playTone(frequencies[i], volumes[i], 0.2);
  },

  playDrag(freq = 100) {
    this.playTone(freq);
  }
};


// SETUP 

const width = window.innerWidth;
const height = window.innerHeight;

const rawData = [
    {id:1,nombre:"Algoritmos y Resolución de Problemas",año:1,cuatrimestre:1,c1:"",c2:"",c3:""},
    {id:2,nombre:"Matemática Básica",año:1,cuatrimestre:1,c1:"",c2:"",c3:""},
    {id:3,nombre:"Estructura y Funcionamiento de Computadoras",año:1,cuatrimestre:1,c1:"",c2:"",c3:""},
    {id:4,nombre:"Programación Procedural",año:1,cuatrimestre:2,c1:"1;3",c2:"",c3:"1;3"},
    {id:5,nombre:"Álgebra Lineal",año:1,cuatrimestre:2,c1:"2",c2:"",c3:"2"},
    {id:6,nombre:"Sistemas Operativos",año:1,cuatrimestre:2,c1:"1;3",c2:"",c3:"1;3"},
    {id:7,nombre:"Programación Orientada a Objetos",año:2,cuatrimestre:1,c1:"4",c2:"1",c3:"4"},
    {id:8,nombre:"Teoría de la Computación",año:2,cuatrimestre:1,c1:"5",c2:"2",c3:"5"},
    {id:9,nombre:"Análisis Matemático I",año:2,cuatrimestre:1,c1:"5",c2:"2",c3:"5"},
    {id:10,nombre:"Ingeniería de Sistemas",año:2,cuatrimestre:2,c1:"4",c2:"1",c3:"4"},
    {id:11,nombre:"Estructuras de Datos y Algoritmos",año:2,cuatrimestre:2,c1:"7;8",c2:"4",c3:"7;8"},
    {id:12,nombre:"Programación Web",año:2,cuatrimestre:2,c1:"7",c2:"4",c3:"7"},
    {id:13,nombre:"Análisis Matemático II",año:2,cuatrimestre:2,c1:"9",c2:"5",c3:"9"},
    {id:14,nombre:"Inglés I",año:2,cuatrimestre:2,c1:"4",c2:"3",c3:"4"},
    {id:15,nombre:"Paradigmas de Lenguajes",año:3,cuatrimestre:1,c1:"8;11;12",c2:"7",c3:"8;11;12"},
    {id:16,nombre:"Base de Datos I",año:3,cuatrimestre:1,c1:"6;11",c2:"5",c3:"6;11"},
    {id:17,nombre:"Inglés II",año:3,cuatrimestre:1,c1:"14",c2:"",c3:"14"},
    {id:18,nombre:"Ingeniería de Software I",año:3,cuatrimestre:1,c1:"7",c2:"10",c3:"7"},
    {id:19,nombre:"Redes",año:3,cuatrimestre:1,c1:"8;14",c2:"6",c3:"8;14"},
    {id:20,nombre:"Aspectos Profesionales y Sociales",año:3,cuatrimestre:2,c1:"16",c2:"10",c3:"16"},
    {id:21,nombre:"Legislación Profesional",año:3,cuatrimestre:2,c1:"16",c2:"10",c3:"16"},
    {id:22,nombre:"Probabilidad y Estadística",año:3,cuatrimestre:2,c1:"13",c2:"9",c3:"13"},
    {id:23,nombre:"Algoritmos Numéricos",año:3,cuatrimestre:2,c1:"13",c2:"9",c3:"13"},
    {id:24,nombre:"Auditoría",año:4,cuatrimestre:1,c1:"18",c2:"10",c3:"18"},
    {id:25,nombre:"Ingeniería de Software II",año:4,cuatrimestre:1,c1:"18",c2:"7;10;12",c3:"18"},
    {id:26,nombre:"Computabilidad y Complejidad",año:4,cuatrimestre:1,c1:"23",c2:"8;11",c3:"23"},
    {id:27,nombre:"Teoría de la Información",año:4,cuatrimestre:2,c1:"22;23",c2:"11",c3:"22;23"},
    {id:28,nombre:"Sistemas Distribuidos y Paralelismos",año:4,cuatrimestre:2,c1:"19",c2:"11;13",c3:"19"},
    {id:29,nombre:"Base de Datos II",año:4,cuatrimestre:2,c1:"23",c2:"16",c3:"23"},
    {id:30,nombre:"Compiladores",año:4,cuatrimestre:2,c1:"26",c2:"15",c3:"26"},
    {id:31,nombre:"Inteligencia Artificial",año:5,cuatrimestre:1,c1:"29",c2:"15;23",c3:"29"},
    {id:32,nombre:"Ingeniería de Software III",año:5,cuatrimestre:1,c1:"25",c2:"16;17;18",c3:"25"},
    {id:33,nombre:"Computación Gráfica y Visualización",año:5,cuatrimestre:1,c1:"22;27",c2:"12;15",c3:"22;27"},
    {id:35,nombre:"Epistemología y Metodología de la Investigación Científica",año:5,cuatrimestre:2,c1:"24",c2:"20;21;22",c3:"24"},
    {id:36,nombre:"Lógica y Optimización Aplicada",año:5,cuatrimestre:2,c1:"26",c2:"15;27",c3:"26"},
    {id:37,nombre:"Proyectos de Innovación Tecnológica",año:5,cuatrimestre:2,c1:"29",c2:"20;21",c3:"29"}
];

const nodeById = new Map(rawData.map(d => [d.id.toString(), d]));

const g = d3.select("svg").append("g");
const zoom = d3.zoom()
  .scaleExtent([0.3, 2])
  .on("zoom", event => g.attr("transform", event.transform));

d3.select("svg").call(zoom);
d3.select(window).on("contextmenu", (event) => event.preventDefault());


// BUILD LINKS

const linksC1 = [];
const linksC2 = [];

rawData.forEach(d => {
  if (d.c1) d.c1.split(";").forEach(srcId => {
    srcId = srcId.trim();
    if (nodeById.has(srcId)) linksC1.push({ source: srcId, target: d.id.toString(), type: "c1" });
  });
  if (d.c2) d.c2.split(";").forEach(srcId => {
    srcId = srcId.trim();
    if (nodeById.has(srcId)) linksC2.push({ source: srcId, target: d.id.toString(), type: "c2" });
  });
});

const nodes = rawData.map(d => ({ ...d }));
const links = [...linksC1, ...linksC2];
const nodeIndex = new Map(nodes.map(d => [d.id.toString(), d]));

links.forEach(l => {
  l.source = nodeIndex.get(l.source);
  l.target = nodeIndex.get(l.target);
});

const link = g.append("g")
  .attr("stroke-width", 2)
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("class", d => `link link-${d.type}`);


// DRAW NODES

const node = g.append("g")
  .selectAll("g")
  .data(nodes)
  .join("g")
  .attr("class", "node-group")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
  );

node.append("rect")
  .attr("class", "node-rect")
  .attr("height", 30)
  .attr("rx", 6)
  .attr("ry", 6);

node.append("text")
  .attr("class", "node-text")
  .attr("dy", "20")
  .attr("x", 10)
  .text(d => d.nombre);

node.each(function(d) {
  const textElem = d3.select(this).select("text").node();
  const bbox = textElem.getBBox();
  d3.select(this).select("rect")
    .attr("width", bbox.width + 20)
    .attr("height", bbox.height + 10);
});


// CUSTOM FORCES

function forceXColumn(strength) {
  let nodes;
  function force(alpha) {
    for (const node of nodes) {
      const targetX = 150 + (node.año - 1) * 800 + (node.cuatrimestre - 1) * 400;
      node.vx += (targetX - node.x) * strength * alpha * 10;
    }
  }
  force.initialize = _ => { nodes = _; };
  return force;
}

function forceYPosition(strength) {
  let nodes;
  function force() {
    const groups = {};
    nodes.forEach(node => {
      const key = `${node.año}-${node.cuatrimestre}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(node);
    });

    Object.values(groups).forEach(group => {
      group.sort((a, b) => a.id - b.id);

      const margin = height * 0.2;
      const availableHeight = height - margin * 2;
      const spacing = availableHeight / (group.length - 1 || 1);
      const totalGroupHeight = spacing * (group.length - 1);
      const startY = (height - totalGroupHeight) / 2;

      group.forEach((node, i) => {
        const targetY = startY + spacing * i;
        node.vy += (targetY - node.y) * strength;
      });
    });
  }
  force.initialize = _ => { nodes = _; };
  return force;
}

// SIMULATION

const simulation = d3.forceSimulation(nodes).alphaTarget(0.02)
  .force("charge", d3.forceManyBody().strength(20))
  .force("xColumn", forceXColumn(0.4))
  .force("yPosition", forceYPosition(0.02))
  .force("collision", d3.forceCollide(25))
  .force("link", d3.forceLink(links).id(d => d.id).distance(400).strength(0.3))
  .on("tick", ticked);


function ticked() {
  node.attr("transform", d => {
    const rectWidth = d3.select(d3.selectAll(".node-group").nodes()[nodes.indexOf(d)])
      .select("rect").node().getBBox().width;
    return `translate(${d.x - rectWidth / 2},${d.y - 15})`;
  });

  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
}


// PERSISTENCE

function saveStatus() {
  const completedIds = nodes
    .filter(n => n.completed)
    .map(n => n.id);
  localStorage.setItem('career_progress', JSON.stringify(completedIds));
}

function loadStatus() {
  const saved = localStorage.getItem('career_progress');
  if (saved) {
    const completedIds = JSON.parse(saved);
    nodes.forEach(n => {
      if (completedIds.includes(n.id)) n.completed = true;
    });
  }
}


// HIGHLIGHTING LOGIC

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function cascadeStatus(d, isMarking, i = 0) {
    isMarking ? Sound.playMark(i) : Sound.playUnmark(i);

    const activeLinks = links.filter(l => 
        isMarking 
            ? l.target.id === d.id && !l.source.completed 
            : l.source.id === d.id && l.target.completed
    );

    for (const link of activeLinks) {
        await sleep(100);
        i += 1;
        
        const nextNode = isMarking ? link.source : link.target;
        nextNode.completed = isMarking;
        
        updateStatus();
        saveStatus();
        
        i = await cascadeStatus(nextNode, isMarking, i);
    }
    
    return i;
}

const markPrerequisites = (d) => cascadeStatus(d, true);
const unmarkDependents = (d) => cascadeStatus(d, false);

function updateStatus() {
  node.classed("completed", d => d.completed);
  link.classed("completed", d => d.source.completed || d.target.completed);
}

node.on("contextmenu", (event, d) => {
  event.preventDefault();
  
  d.completed = !d.completed;

  if (d.completed) {
    markPrerequisites(d);
  } else {
    unmarkDependents(d);
  }

  updateStatus();
  saveStatus();
});

loadStatus();
updateStatus();


function getRelatedNodes(d) {
  const relatedNodes = new Set();
  const relatedLinks = new Set();

  links.forEach(link => {
    if (link.source.id === d.id || link.target.id === d.id) {
      relatedNodes.add(link.source.id.toString());
      relatedNodes.add(link.target.id.toString());
      relatedLinks.add(link);
    }
  });

  return { nodes: Array.from(relatedNodes), links: Array.from(relatedLinks) };
}

function highlightRelated(d) {
  const related = getRelatedNodes(d);

  node.classed("inactive", true).classed("active", false);
  related.nodes.forEach(id => {
    d3.selectAll(`.node-group`).filter(d => d.id.toString() === id)
      .classed("inactive", false)
      .classed("active", true);
  });

  link.classed("inactive", true).classed("active", false);
  related.links.forEach(l => {
    link.filter(link => link === l)
      .classed("inactive", false)
      .classed("active", true);
  });
}

function resetHighlight() {
  node.classed("inactive", false).classed("active", false);
  link.classed("inactive", false).classed("active", false);
}


// DRAG HANDLERS

function dragstarted(event, d) {
  if (!event.active)  simulation.alphaTarget(0.02).restart();
  Sound.playDrag()
  d.fx = d.x;
  d.fy = d.y;
  highlightRelated(d);
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0.02);
  d.fx = null;
  d.fy = null;
  resetHighlight();
}


// CHECKBOX EVENTS

document.getElementById('c1-toggle').addEventListener('change', function() {
  d3.selectAll('.link-c1').style('display', this.checked ? null : 'none');
});

document.getElementById('c2-toggle').addEventListener('change', function() {
  d3.selectAll('.link-c2').style('display', this.checked ? null : 'none');
});


window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('mySvg').classList.add('loaded');
});