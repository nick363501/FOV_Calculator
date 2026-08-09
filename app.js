// ---------- Camera sensor specs ----------
var SENSORS = {
  asi585:  { label:"ZWO ASI585MC Pro",  widthMM:11.2, heightMM:6.3,  resX:3840, resY:2160, pixelUM:2.9  },
  asi2600: { label:"ZWO ASI2600MC Pro", widthMM:23.5, heightMM:15.7, resX:6248, resY:4176, pixelUM:3.76 }
};

// ---------- Telescope configurations: display label (equipment name) + actual focal length (mm) used in calculations ----------
var FOCAL_CONFIGS = [
  {focal:270, label:"60mm Reducer-270-f/4.5",  color:"#e6194B"},
  {focal:360, label:"60mm Flatter-360-f/6.0",   color:"#f58231"},
  {focal:446, label:"60mm Extender-446-f/7.4", color:"#ffd400"},
  {focal:384, label:"80mm Reducer-384-f/4.8",  color:"#3cb44b"},
  {focal:495, label:"80mm Flattner-495-f/6.8", color:"#4363d8"},
  {focal:600, label:"80mm Extender-600-f/7.l4", color:"#c14bf0"},
  {focal:1280,label:"C8 Reducer-1280-f/6.3", color:"#e67c19ff"}
];

function getFocalConfig(focal){
  for(var i=0;i<FOCAL_CONFIGS.length;i++){ if(FOCAL_CONFIGS[i].focal===focal) return FOCAL_CONFIGS[i]; }
  return null;
}

// ---------- Messier catalog (id -> common name) ----------
var MESSIER = [
["M1","Crab Nebula"],["M2","Globular cluster, Aquarius"],["M3","Globular cluster, Canes Venatici"],
["M4","Globular cluster, Scorpius"],["M5","Globular cluster, Serpens"],["M6","Butterfly Cluster"],
["M7","Ptolemy Cluster"],["M8","Lagoon Nebula"],["M9","Globular cluster, Ophiuchus"],
["M10","Globular cluster, Ophiuchus"],["M11","Wild Duck Cluster"],["M12","Globular cluster, Ophiuchus"],
["M13","Great Hercules Cluster"],["M14","Globular cluster, Ophiuchus"],["M15","Globular cluster, Pegasus"],
["M16","Eagle Nebula"],["M17","Omega / Swan Nebula"],["M18","Open cluster, Sagittarius"],
["M19","Globular cluster, Ophiuchus"],["M20","Trifid Nebula"],["M21","Open cluster, Sagittarius"],
["M22","Sagittarius Cluster"],["M23","Open cluster, Sagittarius"],["M24","Sagittarius Star Cloud"],
["M25","Open cluster, Sagittarius"],["M26","Open cluster, Scutum"],["M27","Dumbbell Nebula"],
["M28","Globular cluster, Sagittarius"],["M29","Open cluster, Cygnus"],["M30","Globular cluster, Capricornus"],
["M31","Andromeda Galaxy"],["M32","Andromeda satellite galaxy"],["M33","Triangulum Galaxy"],
["M34","Open cluster, Perseus"],["M35","Open cluster, Gemini"],["M36","Pinwheel Cluster, Auriga"],
["M37","Open cluster, Auriga"],["M38","Open cluster, Auriga"],["M39","Open cluster, Cygnus"],
["M40","Double star, Ursa Major"],["M41","Open cluster, Canis Major"],["M42","Orion Nebula"],
["M43","De Mairan's Nebula"],["M44","Beehive Cluster"],["M45","Pleiades"],
["M46","Open cluster, Puppis"],["M47","Open cluster, Puppis"],["M48","Open cluster, Hydra"],
["M49","Elliptical galaxy, Virgo"],["M50","Open cluster, Monoceros"],["M51","Whirlpool Galaxy"],
["M52","Open cluster, Cassiopeia"],["M53","Globular cluster, Coma Berenices"],["M54","Globular cluster, Sagittarius"],
["M55","Globular cluster, Sagittarius"],["M56","Globular cluster, Lyra"],["M57","Ring Nebula"],
["M58","Spiral galaxy, Virgo"],["M59","Elliptical galaxy, Virgo"],["M60","Elliptical galaxy, Virgo"],
["M61","Spiral galaxy, Virgo"],["M62","Globular cluster, Ophiuchus"],["M63","Sunflower Galaxy"],
["M64","Black Eye Galaxy"],["M65","Leo Triplet galaxy"],["M66","Leo Triplet galaxy"],
["M67","Open cluster, Cancer"],["M68","Globular cluster, Hydra"],["M69","Globular cluster, Sagittarius"],
["M70","Globular cluster, Sagittarius"],["M71","Globular cluster, Sagitta"],["M72","Globular cluster, Aquarius"],
["M73","Asterism, Aquarius"],["M74","Spiral galaxy, Pisces"],["M75","Globular cluster, Sagittarius"],
["M76","Little Dumbbell Nebula"],["M77","Cetus A galaxy"],["M78","Reflection nebula, Orion"],
["M79","Globular cluster, Lepus"],["M80","Globular cluster, Scorpius"],["M81","Bode's Galaxy"],
["M82","Cigar Galaxy"],["M83","Southern Pinwheel Galaxy"],["M84","Elliptical galaxy, Virgo"],
["M85","Lenticular galaxy, Coma Berenices"],["M86","Elliptical galaxy, Virgo"],["M87","Elliptical galaxy, Virgo"],
["M88","Spiral galaxy, Coma Berenices"],["M89","Elliptical galaxy, Virgo"],["M90","Spiral galaxy, Virgo"],
["M91","Spiral galaxy, Coma Berenices"],["M92","Globular cluster, Hercules"],["M93","Open cluster, Puppis"],
["M94","Spiral galaxy, Canes Venatici"],["M95","Spiral galaxy, Leo"],["M96","Spiral galaxy, Leo"],
["M97","Owl Nebula"],["M98","Spiral galaxy, Coma Berenices"],["M99","Spiral galaxy, Coma Berenices"],
["M100","Spiral galaxy, Coma Berenices"],["M101","Pinwheel Galaxy"],["M102","Spindle Galaxy"],
["M103","Open cluster, Cassiopeia"],["M104","Sombrero Galaxy"],["M105","Elliptical galaxy, Leo"],
["M106","Spiral galaxy, Canes Venatici"],["M107","Globular cluster, Ophiuchus"],["M108","Spiral galaxy, Ursa Major"],
["M109","Spiral galaxy, Ursa Major"],["M110","Andromeda satellite galaxy"]
];

// ---------- Popular NGC / IC targets ----------
var NGC_IC = [
["NGC 7000","North America Nebula"],["IC 5070","Pelican Nebula"],["IC 434","Horsehead Nebula"],
["NGC 2024","Flame Nebula"],["NGC 6960","Western Veil Nebula"],["NGC 6992","Eastern Veil Nebula"],
["NGC 2237","Rosette Nebula"],["IC 1396","Elephant's Trunk region"],["NGC 7635","Bubble Nebula"],
["NGC 6888","Crescent Nebula"],["NGC 281","Pacman Nebula"],["NGC 6543","Cat's Eye Nebula"],
["NGC 7293","Helix Nebula"],["NGC 891","Edge-on spiral, Andromeda"],["NGC 6946","Fireworks Galaxy"],
["NGC 253","Sculptor Galaxy"],["NGC 4565","Needle Galaxy"],["NGC 5128","Centaurus A"],
["NGC 3372","Carina Nebula"],["IC 405","Flaming Star Nebula"],["IC 410","Tadpoles Nebula region"],
["NGC 2359","Thor's Helmet"],["NGC 1499","California Nebula"],["NGC 6822","Barnard's Galaxy"],
["IC 63","Ghost of Cassiopeia"],["NGC 7331","Deer Lick Group"],["NGC 3324","Gabriela Mistral Nebula"]
];

// ---------- State ----------
var aladin, currentTarget = null;
var activeLabels = []; // {ra, dec, el}

function fovArcmin(focalMM, dimMM){ return (dimMM/focalMM)*3437.746771; }
function arcsecPerPixel(focalMM, pixelUM){ return (pixelUM/focalMM)*206.264806; }

function fmtArcmin(a){
  if(a>=60) return (a/60).toFixed(2)+"°";
  return a.toFixed(1)+"′";
}

function getSelectedSensor(){
  var v = document.querySelector('input[name=camera]:checked').value;
  return SENSORS[v];
}

function computeCorners(raDeg, decDeg, widthDeg, heightDeg){
  var decRad = decDeg*Math.PI/180;
  var cosDec = Math.cos(decRad);
  if(Math.abs(cosDec) < 1e-6) cosDec = 1e-6;
  var hw = widthDeg/2/cosDec;
  var hh = heightDeg/2;
  return [
    [raDeg-hw, decDeg-hh],
    [raDeg+hw, decDeg-hh],
    [raDeg+hw, decDeg+hh],
    [raDeg-hw, decDeg+hh]
  ];
}

function clearLabels(){
  var layer = document.getElementById('labelLayer');
  layer.innerHTML = "";
  activeLabels = [];
}

function addLabel(ra, dec, text, color){
  var layer = document.getElementById('labelLayer');
  var el = document.createElement('div');
  el.className = 'fov-label';
  el.textContent = text;
  el.style.color = color;
  el.style.borderColor = color;
  layer.appendChild(el);
  activeLabels.push({ra: ra, dec: dec, el: el});
}

// Keeps the custom text labels glued to their sky position as the user pans/zooms.
function updateLabelPositions(){
  if(!aladin || activeLabels.length === 0) return;
  activeLabels.forEach(function(item){
    var xy;
    try{ xy = aladin.world2pix(item.ra, item.dec); }catch(e){ xy = null; }
    if(xy && isFinite(xy[0]) && isFinite(xy[1])){
      item.el.style.left = xy[0]+'px';
      item.el.style.top = xy[1]+'px';
      item.el.style.display = 'block';
    } else {
      item.el.style.display = 'none';
    }
  });
}
(function labelLoop(){
  updateLabelPositions();
  requestAnimationFrame(labelLoop);
})();

function redraw(){
  var legendBody = document.getElementById('legendBody');
  legendBody.innerHTML = "";
  clearLabels();
  if(!aladin) return;
  aladin.removeLayers();

  if(!currentTarget){
    legendBody.innerHTML = '<tr><td colspan="4" style="color:var(--muted)">Search for a target first</td></tr>';
    return;
  }

  // marker for the target itself
  var markLayer = A.catalog({name:'target'});
  aladin.addCatalog(markLayer);
  markLayer.addSources([A.marker(currentTarget.ra, currentTarget.dec, {popupTitle: currentTarget.name, popupDesc:"Search target"})]);

  var sensor = getSelectedSensor();
  var checked = Array.prototype.slice.call(document.querySelectorAll('.fl-checkbox:checked')).map(function(cb){return parseInt(cb.value,10);});

  if(checked.length === 0){
    legendBody.innerHTML = '<tr><td colspan="4" style="color:var(--muted)">Check a focal length above</td></tr>';
    return;
  }

  checked.forEach(function(fl){
    // try/catch per item: one bad entry can never block the rest from drawing
    try{
      var cfg = getFocalConfig(fl) || {label: fl+'mm', color:'#5b9dff'};
      var wArc = fovArcmin(fl, sensor.widthMM);
      var hArc = fovArcmin(fl, sensor.heightMM);
      var wDeg = wArc/60, hDeg = hArc/60;
      var corners = computeCorners(currentTarget.ra, currentTarget.dec, wDeg, hDeg);
      var color = cfg.color;
      var overlay = A.graphicOverlay({color: color, lineWidth: 2});
      aladin.addOverlay(overlay);
      overlay.addFootprints([A.polygon(corners)]);

      // text label centered along the top (X-axis) edge of this box: equipment name first, then camera
      var topDec = currentTarget.dec + hDeg/2;
      addLabel(currentTarget.ra, topDec, cfg.label + ' — ' + sensor.label, color);

      var arcsecPx = arcsecPerPixel(fl, sensor.pixelUM);
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><span class="swatch" style="background:'+color+';display:inline-block;"></span></td>' +
        '<td>'+cfg.label+'</td>' +
        '<td>'+fmtArcmin(wArc)+' × '+fmtArcmin(hArc)+'</td>' +
        '<td>'+arcsecPx.toFixed(2)+'</td>';
      legendBody.appendChild(tr);
    }catch(err){
      console.error('Failed to draw FOV box for', fl, 'mm', err);
    }
  });
}

function setStatus(msg, cls){
  var el = document.getElementById('status');
  el.textContent = msg;
  el.className = cls || '';
}

function goTo(query){
  query = (query||'').trim();
  if(!query || !aladin) return;
  setStatus('Searching for "'+query+'"…', 'searching');
  aladin.gotoObject(query, {
    success: function(raDec){
      var ra, dec;
      if(Array.isArray(raDec)){ ra = raDec[0]; dec = raDec[1]; }
      else if(raDec && typeof raDec === 'object' && 'ra' in raDec){ ra = raDec.ra; dec = raDec.dec; }
      else { var c = aladin.getRaDec(); ra = c[0]; dec = c[1]; }
      currentTarget = {ra: ra, dec: dec, name: query};
      setStatus('Showing '+query+'  (RA '+ra.toFixed(4)+'°, Dec '+dec.toFixed(4)+'°)', 'ok');
      redraw();
    },
    error: function(){
      setStatus('Could not find "'+query+'". Try a designation like M42, NGC 7000, or IC 434.', 'error');
    }
  });
}

// ---------- Build UI ----------
function buildMessierSelect(){
  var sel = document.getElementById('messierSelect');
  MESSIER.forEach(function(m){
    var opt = document.createElement('option');
    opt.value = m[0];
    opt.textContent = m[0] + ' — ' + m[1];
    sel.appendChild(opt);
  });
}
function buildNgcSelect(){
  var sel = document.getElementById('ngcSelect');
  NGC_IC.forEach(function(n){
    var opt = document.createElement('option');
    opt.value = n[0];
    opt.textContent = n[0] + ' — ' + n[1];
    sel.appendChild(opt);
  });
}
function buildFlList(){
  var container = document.getElementById('flList');
  FOCAL_CONFIGS.forEach(function(cfg){
    var div = document.createElement('div');
    div.className = 'fl-item';
    var cbId = 'fl_'+cfg.focal;
    div.innerHTML =
      '<span class="swatch" style="background:'+cfg.color+'"></span>' +
      '<label for="'+cbId+'">'+cfg.label+'</label>' +
      '<input type="checkbox" class="fl-checkbox" id="'+cbId+'" value="'+cfg.focal+'" '+(cfg.focal===600?'checked':'')+'>';
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', function(){
  buildMessierSelect();
  buildNgcSelect();
  buildFlList();

  document.getElementById('messierSelect').addEventListener('change', function(){
    if(this.value){ document.getElementById('searchInput').value = this.value; goTo(this.value); }
  });
  document.getElementById('ngcSelect').addEventListener('change', function(){
    if(this.value){ document.getElementById('searchInput').value = this.value; goTo(this.value); }
  });
  document.getElementById('goBtn').addEventListener('click', function(){
    goTo(document.getElementById('searchInput').value);
  });
  document.getElementById('searchInput').addEventListener('keydown', function(e){
    if(e.key === 'Enter'){ goTo(this.value); }
  });
  document.getElementById('recenterBtn').addEventListener('click', function(){
    if(currentTarget) aladin.gotoRaDec(currentTarget.ra, currentTarget.dec);
  });
  document.querySelectorAll('input[name=camera]').forEach(function(r){
    r.addEventListener('change', redraw);
  });
  document.getElementById('flList').addEventListener('change', function(e){
    if(e.target.classList.contains('fl-checkbox')) redraw();
  });
  document.getElementById('surveySelect').addEventListener('change', function(){
    if(aladin) aladin.setImageSurvey(this.value);
  });

  A.init.then(function(){
    aladin = A.aladin('#aladin-lite-div', {
      survey: "P/DSS2/color",
      fov: 3,
      target: "M31",
      showFullscreenControl: true,
      showShareControl: false,
      showSimbadPointerControl: true,
      showContextMenu: true,
      cooFrame: "ICRS"
    });
    goTo('M31');
  });
});
