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
  {focal:1422,label:"Edge Reducer-1422-f/7", color:"#e67c19ff"},
  {focal:2032,label:"Edge Native-2032-f/10", color:"#198ae6ff"}
];

function getFocalConfig(focal){
  for(var i=0;i<FOCAL_CONFIGS.length;i++){ if(FOCAL_CONFIGS[i].focal===focal) return FOCAL_CONFIGS[i]; }
  return null;
}

// ---------- Messier catalog (id, common name, RA deg J2000, Dec deg J2000) ----------
// Coordinates are standard published J2000 catalog values, arcminute-level precision.
// Used for the "tonight's best" ranking/graph only — actual FOV framing still uses the
// live Sesame resolver (see goTo()) for accuracy.
var MESSIER = [
["M1","Crab Nebula",83.625,22.0167],["M2","Globular cluster, Aquarius",323.375,-0.8167],["M3","Globular cluster, Canes Venatici",205.55,28.3833],
["M4","Globular cluster, Scorpius",245.9,-26.5333],["M5","Globular cluster, Serpens",229.65,2.0833],["M6","Butterfly Cluster",265.025,-32.2167],
["M7","Ptolemy Cluster",268.475,-34.8167],["M8","Lagoon Nebula",270.95,-24.3833],["M9","Globular cluster, Ophiuchus",259.8,-18.5167],
["M10","Globular cluster, Ophiuchus",254.275,-4.1],["M11","Wild Duck Cluster",282.775,-6.2667],["M12","Globular cluster, Ophiuchus",251.8,-1.95],
["M13","Great Hercules Cluster",250.425,36.4667],["M14","Globular cluster, Ophiuchus",264.4,-3.25],["M15","Globular cluster, Pegasus",322.5,12.1667],
["M16","Eagle Nebula",274.7,-13.7833],["M17","Omega / Swan Nebula",275.2,-16.1833],["M18","Open cluster, Sagittarius",274.975,-17.1333],
["M19","Globular cluster, Ophiuchus",255.65,-26.2667],["M20","Trifid Nebula",270.65,-23.0333],["M21","Open cluster, Sagittarius",271.15,-22.5],
["M22","Sagittarius Cluster",279.1,-23.9],["M23","Open cluster, Sagittarius",269.2,-19.0167],["M24","Sagittarius Star Cloud",274.225,-18.4833],
["M25","Open cluster, Sagittarius",277.9,-19.25],["M26","Open cluster, Scutum",281.3,-9.4],["M27","Dumbbell Nebula",299.9,22.7167],
["M28","Globular cluster, Sagittarius",276.125,-24.8667],["M29","Open cluster, Cygnus",305.975,38.5333],["M30","Globular cluster, Capricornus",325.1,-23.1833],
["M31","Andromeda Galaxy",10.675,41.2667],["M32","Andromeda satellite galaxy",10.675,40.8667],["M33","Triangulum Galaxy",23.475,30.65],
["M34","Open cluster, Perseus",40.5,42.7833],["M35","Open cluster, Gemini",92.25,24.3333],["M36","Pinwheel Cluster, Auriga",84.075,34.1333],
["M37","Open cluster, Auriga",88.1,32.55],["M38","Open cluster, Auriga",82.175,35.85],["M39","Open cluster, Cygnus",323.05,48.4333],
["M40","Double star, Ursa Major",185.6,58.0833],["M41","Open cluster, Canis Major",101.75,-20.7333],["M42","Orion Nebula",83.825,-5.3833],
["M43","De Mairan's Nebula",83.9,-5.2667],["M44","Beehive Cluster",130.025,19.9833],["M45","Pleiades",56.75,24.1167],
["M46","Open cluster, Puppis",115.45,-14.8167],["M47","Open cluster, Puppis",114.15,-14.5],["M48","Open cluster, Hydra",123.45,-5.8],
["M49","Elliptical galaxy, Virgo",187.45,8.0],["M50","Open cluster, Monoceros",105.8,-8.3333],["M51","Whirlpool Galaxy",202.475,47.2],
["M52","Open cluster, Cassiopeia",351.05,61.5833],["M53","Globular cluster, Coma Berenices",198.225,18.1667],["M54","Globular cluster, Sagittarius",283.775,-30.4833],
["M55","Globular cluster, Sagittarius",295.0,-30.9667],["M56","Globular cluster, Lyra",289.15,30.1833],["M57","Ring Nebula",283.4,33.0333],
["M58","Spiral galaxy, Virgo",189.425,11.8167],["M59","Elliptical galaxy, Virgo",190.5,11.65],["M60","Elliptical galaxy, Virgo",190.925,11.55],
["M61","Spiral galaxy, Virgo",185.475,4.4667],["M62","Globular cluster, Ophiuchus",255.3,-30.1167],["M63","Sunflower Galaxy",198.95,42.0333],
["M64","Black Eye Galaxy",194.175,21.6833],["M65","Leo Triplet galaxy",169.725,13.0833],["M66","Leo Triplet galaxy",170.075,12.9833],
["M67","Open cluster, Cancer",132.825,11.8167],["M68","Globular cluster, Hydra",189.875,-26.75],["M69","Globular cluster, Sagittarius",277.85,-32.35],
["M70","Globular cluster, Sagittarius",280.8,-32.3],["M71","Globular cluster, Sagitta",298.45,18.7833],["M72","Globular cluster, Aquarius",313.375,-12.5333],
["M73","Asterism, Aquarius",314.725,-12.6333],["M74","Spiral galaxy, Pisces",24.175,15.7833],["M75","Globular cluster, Sagittarius",301.525,-21.9167],
["M76","Little Dumbbell Nebula",25.6,51.5667],["M77","Cetus A galaxy",40.675,-0.0167],["M78","Reflection nebula, Orion",86.675,0.05],
["M79","Globular cluster, Lepus",81.125,-24.55],["M80","Globular cluster, Scorpius",244.25,-22.9833],["M81","Bode's Galaxy",148.9,69.0667],
["M82","Cigar Galaxy",148.95,69.6833],["M83","Southern Pinwheel Galaxy",204.25,-29.8667],["M84","Elliptical galaxy, Virgo",186.275,12.8833],
["M85","Lenticular galaxy, Coma Berenices",186.35,18.1833],["M86","Elliptical galaxy, Virgo",186.55,12.95],["M87","Elliptical galaxy, Virgo",187.7,12.4],
["M88","Spiral galaxy, Coma Berenices",188.0,14.4167],["M89","Elliptical galaxy, Virgo",188.925,12.55],["M90","Spiral galaxy, Virgo",189.2,13.1667],
["M91","Spiral galaxy, Coma Berenices",188.85,14.5],["M92","Globular cluster, Hercules",259.275,43.1333],["M93","Open cluster, Puppis",116.15,-23.8667],
["M94","Spiral galaxy, Canes Venatici",192.725,41.1167],["M95","Spiral galaxy, Leo",161.0,11.7],["M96","Spiral galaxy, Leo",161.7,11.8167],
["M97","Owl Nebula",168.7,55.0167],["M98","Spiral galaxy, Coma Berenices",183.45,14.9],["M99","Spiral galaxy, Coma Berenices",184.7,14.4167],
["M100","Spiral galaxy, Coma Berenices",185.725,15.8167],["M101","Pinwheel Galaxy",210.8,54.35],["M102","Spindle Galaxy",226.625,55.75],
["M103","Open cluster, Cassiopeia",23.3,60.7],["M104","Sombrero Galaxy",190.0,-11.6167],["M105","Elliptical galaxy, Leo",161.95,12.5833],
["M106","Spiral galaxy, Canes Venatici",184.75,47.3],["M107","Globular cluster, Ophiuchus",248.125,-13.05],["M108","Spiral galaxy, Ursa Major",167.875,55.6667],
["M109","Spiral galaxy, Ursa Major",179.4,53.3833],["M110","Andromeda satellite galaxy",10.1,41.6833]
];

// ---------- Popular NGC / IC targets (id, common name, RA deg J2000, Dec deg J2000) ----------
var NGC_IC = [
["NGC 7000","North America Nebula",314.7,44.3333],["IC 5070","Pelican Nebula",312.7,44.35],["IC 434","Horsehead Nebula",85.25,-2.4667],
["NGC 2024","Flame Nebula",85.475,-1.85],["NGC 6960","Western Veil Nebula",311.425,30.7167],["NGC 6992","Eastern Veil Nebula",314.1,31.7167],
["NGC 2237","Rosette Nebula",98.075,5.05],["IC 1396","Elephant's Trunk region",324.775,57.5],["NGC 7635","Bubble Nebula",350.175,61.2],
["NGC 6888","Crescent Nebula",303.0,38.35],["NGC 281","Pacman Nebula",13.2,56.6167],["NGC 6543","Cat's Eye Nebula",269.65,66.6333],
["NGC 7293","Helix Nebula",337.4,-20.8333],["NGC 891","Edge-on spiral, Andromeda",35.65,42.35],["NGC 6946","Fireworks Galaxy",308.7,60.15],
["NGC 253","Sculptor Galaxy",11.9,-25.2833],["NGC 4565","Needle Galaxy",189.075,25.9833],["NGC 5128","Centaurus A",201.375,-43.0167],
["NGC 3372","Carina Nebula",161.275,-59.8667],["IC 405","Flaming Star Nebula",79.05,34.2667],["IC 410","Tadpoles Nebula region",80.65,33.5167],
["NGC 2359","Thor's Helmet",109.65,-13.2167],["NGC 1499","California Nebula",60.175,36.6167],["NGC 6822","Barnard's Galaxy",296.225,-14.8],
["IC 63","Ghost of Cassiopeia",14.875,60.9167],["NGC 7331","Deer Lick Group",339.275,34.4167],["NGC 3324","Gabriela Mistral Nebula",159.325,-58.65]
];

// ---------- Astronomy: sidereal time, sun position, alt/az, rise/transit/set ----------
var DEG = Math.PI/180;

function julianDate(date){ return date.getTime()/86400000 + 2440587.5; }

function normalizeDeg(d){ d = d % 360; if(d<0) d += 360; return d; }

function gmstDeg(jd){
  var d = jd - 2451545.0;
  return normalizeDeg(280.46061837 + 360.98564736629*d);
}
function lstDeg(jd, lonDeg){ return normalizeDeg(gmstDeg(jd) + lonDeg); }

// Low-precision (~0.01°) solar position, standard Astronomical Almanac approximation —
// accurate enough to find sunset/twilight/sunrise for ranking purposes.
function sunEquatorial(jd){
  var d = jd - 2451545.0;
  var g = normalizeDeg(357.529 + 0.98560028*d) * DEG;
  var q = normalizeDeg(280.459 + 0.98564736*d);
  var L = normalizeDeg(q + 1.915*Math.sin(g) + 0.020*Math.sin(2*g)) * DEG;
  var e = (23.439 - 0.00000036*d) * DEG;
  var ra = normalizeDeg(Math.atan2(Math.cos(e)*Math.sin(L), Math.cos(L)) / DEG);
  var dec = Math.asin(Math.sin(e)*Math.sin(L)) / DEG;
  return {ra: ra, dec: dec};
}

function altAz(raDeg, decDeg, latDeg, lstDegVal){
  var ha = normalizeDeg(lstDegVal - raDeg);
  if(ha > 180) ha -= 360;
  var haR = ha*DEG, decR = decDeg*DEG, latR = latDeg*DEG;
  var sinAlt = Math.sin(decR)*Math.sin(latR) + Math.cos(decR)*Math.cos(latR)*Math.cos(haR);
  sinAlt = Math.max(-1, Math.min(1, sinAlt));
  var altR = Math.asin(sinAlt);
  var cosAz = (Math.sin(decR) - Math.sin(altR)*Math.sin(latR)) / (Math.cos(altR)*Math.cos(latR) || 1e-9);
  cosAz = Math.max(-1, Math.min(1, cosAz));
  var azR = Math.acos(cosAz);
  if(Math.sin(haR) > 0) azR = 2*Math.PI - azR;
  return {alt: altR/DEG, az: azR/DEG};
}

function localNoon(date){ return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0); }

function altitudeCurve(raDeg, decDeg, lat, lon, fromDate, toDate, stepMin){
  var stepMs = stepMin*60000;
  var curve = [];
  for(var t=fromDate.getTime(); t<=toDate.getTime(); t+=stepMs){
    var d = new Date(t);
    var lst = lstDeg(julianDate(d), lon);
    curve.push({t:d, alt: altAz(raDeg, decDeg, lat, lst).alt});
  }
  return curve;
}

function sunAltitudeCurve(lat, lon, fromDate, toDate, stepMin){
  var stepMs = stepMin*60000;
  var curve = [];
  for(var t=fromDate.getTime(); t<=toDate.getTime(); t+=stepMs){
    var d = new Date(t);
    var jd = julianDate(d);
    var sun = sunEquatorial(jd);
    var lst = lstDeg(jd, lon);
    curve.push({t:d, alt: altAz(sun.ra, sun.dec, lat, lst).alt});
  }
  return curve;
}

function darkWindowFromSun(sunCurve, threshold){
  var start=null, end=null;
  for(var i=0;i<sunCurve.length;i++){
    if(sunCurve[i].alt < threshold){
      if(start===null) start = sunCurve[i].t;
      end = sunCurve[i].t;
    }
  }
  return start ? {start:start, end:end} : null;
}

// Astronomical dark (sun < -18°); falls back to civil dark (< -6°) or simply sun-down (< 0°)
// for high-latitude summer nights where true astronomical darkness never occurs.
function nightWindow(sunCurve){
  return darkWindowFromSun(sunCurve, -18) || darkWindowFromSun(sunCurve, -6) || darkWindowFromSun(sunCurve, 0);
}

function interpZeroCrossTime(a, b){
  var f = (0 - a.alt) / (b.alt - a.alt);
  return new Date(a.t.getTime() + f*(b.t.getTime() - a.t.getTime()));
}

// Sampling-based rise/transit/set — robust for circumpolar objects (rise/set stay null)
// without needing separate closed-form handling near the poles.
function findCrossings(curve){
  var transit = curve[0];
  for(var i=1;i<curve.length;i++){ if(curve[i].alt > transit.alt) transit = curve[i]; }
  var rise=null, set=null;
  for(var j=1;j<curve.length;j++){
    var a=curve[j-1], b=curve[j];
    if(a.alt<0 && b.alt>=0 && rise===null) rise = interpZeroCrossTime(a,b);
    if(a.alt>=0 && b.alt<0) set = interpZeroCrossTime(a,b);
  }
  return {rise:rise, transit:transit.t, transitAlt:transit.alt, set:set};
}

function peakInWindow(curve, win){
  var max = -90;
  for(var i=0;i<curve.length;i++){
    var t = curve[i].t.getTime();
    if(t>=win.start.getTime() && t<=win.end.getTime() && curve[i].alt>max) max = curve[i].alt;
  }
  return max;
}

function visibleSegmentInWindow(curve, win, minAlt){
  var first=null, last=null;
  for(var i=0;i<curve.length;i++){
    var t = curve[i].t.getTime();
    if(t<win.start.getTime() || t>win.end.getTime()) continue;
    if(curve[i].alt >= minAlt){
      if(first===null) first = t;
      last = t;
    }
  }
  return first===null ? null : {start:first, end:last};
}

// ---------- Tonight's best deep-sky objects ----------
// Meridian-transit altitude is cheap (no time sampling needed) and is always the ceiling on
// an object's peak altitude during the night, so it's used to discard hopeless candidates
// before paying for a full 10-min-step curve — necessary now that the pool is a few thousand
// objects rather than a couple hundred.
function maxPossibleAlt(decDeg, latDeg){ return 90 - Math.abs(latDeg - decDeg); }

function computeTonightBest(lat, lon, date, minAlt){
  var noon = localNoon(date);
  var nextNoon = new Date(noon.getTime() + 24*3600000);
  var sunCurve = sunAltitudeCurve(lat, lon, noon, nextNoon, 10);
  var win = nightWindow(sunCurve);
  var catalog = (typeof NGC_CATALOG !== 'undefined' && NGC_CATALOG.length) ? NGC_CATALOG : MESSIER.concat(NGC_IC);
  var results = [];
  catalog.forEach(function(row){
    if(maxPossibleAlt(row[3], lat) < minAlt) return;
    var curve = altitudeCurve(row[2], row[3], lat, lon, noon, nextNoon, 10);
    var peak = peakInWindow(curve, win);
    if(peak < minAlt) return;
    var crossings = findCrossings(curve);
    results.push({
      desig: row[0], name: row[1], ra: row[2], dec: row[3],
      peakAlt: peak, rise: crossings.rise, transit: crossings.transit, transitAlt: crossings.transitAlt, set: crossings.set,
      curve: curve, visSeg: visibleSegmentInWindow(curve, win, minAlt)
    });
  });
  results.sort(function(a,b){ return b.peakAlt - a.peakAlt; });
  return {list: results.slice(0,15), window: win, noon: noon, nextNoon: nextNoon, sunCurve: sunCurve};
}

// ---------- State ----------
var aladin, currentTarget = null;
var activeLabels = []; // {ra, dec, el}
var bestState = null;

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

// ---------- Tonight's Best panel ----------
function pad2(n){ return n<10 ? '0'+n : ''+n; }
function todayLocalISO(){
  var d = new Date();
  return d.getFullYear() + '-' + pad2(d.getMonth()+1) + '-' + pad2(d.getDate());
}
function parseDateInputValue(v){
  var parts = v.split('-');
  return new Date(parseInt(parts[0],10), parseInt(parts[1],10)-1, parseInt(parts[2],10), 12, 0, 0);
}
function fmtTime(d){
  if(!d) return '—';
  return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
}
function fmtAlt(a){ return Math.round(a) + '°'; }

function saveLocation(lat, lon){
  try{
    localStorage.setItem('fov_lat', lat);
    localStorage.setItem('fov_lon', lon);
  }catch(e){}
}
function loadStoredLocation(){
  try{
    var lat = parseFloat(localStorage.getItem('fov_lat'));
    var lon = parseFloat(localStorage.getItem('fov_lon'));
    if(isFinite(lat) && isFinite(lon)) return {lat:lat, lon:lon};
  }catch(e){}
  return null;
}

function setBestStatus(msg, cls){
  var el = document.getElementById('bestStatus');
  el.textContent = msg;
  el.className = 'sub' + (cls ? ' '+cls : '');
}

function requestGeolocation(onDone){
  if(!navigator.geolocation){
    setBestStatus('Geolocation not available in this browser — enter latitude/longitude manually.', 'error');
    return;
  }
  setBestStatus('Requesting your location…', 'searching');
  navigator.geolocation.getCurrentPosition(function(pos){
    var lat = pos.coords.latitude, lon = pos.coords.longitude;
    document.getElementById('latInput').value = lat.toFixed(4);
    document.getElementById('lonInput').value = lon.toFixed(4);
    saveLocation(lat, lon);
    if(onDone) onDone();
  }, function(){
    setBestStatus('Could not get your location — enter latitude/longitude manually.', 'error');
  }, {timeout:8000});
}

function refreshBestPanel(){
  var lat = parseFloat(document.getElementById('latInput').value);
  var lon = parseFloat(document.getElementById('lonInput').value);
  var minAlt = parseFloat(document.getElementById('minAltInput').value);
  if(!isFinite(minAlt)) minAlt = 20;
  if(!isFinite(lat) || !isFinite(lon)){
    setBestStatus('Enter your observing location (or click "Use my location") to see tonight\'s best targets.', '');
    document.getElementById('bestTableBody').innerHTML = '';
    bestState = null;
    drawAltGraph(null);
    return;
  }
  saveLocation(lat, lon);
  var dateVal = document.getElementById('dateInput').value || todayLocalISO();
  bestState = computeTonightBest(lat, lon, parseDateInputValue(dateVal), minAlt);
  setBestStatus(bestState.list.length + ' object(s) clear ' + minAlt + '° during darkness (' +
    fmtTime(bestState.window.start) + '–' + fmtTime(bestState.window.end) + ' local time).', 'ok');
  renderBestTable();
  if(bestState.list.length){
    selectBestRow(bestState.list[0].desig, dateVal === todayLocalISO(), false);
  } else {
    drawAltGraph(null);
  }
}

function renderBestTable(){
  var tbody = document.getElementById('bestTableBody');
  tbody.innerHTML = '';
  if(!bestState || !bestState.list.length){
    tbody.innerHTML = '<tr><td colspan="7" style="color:var(--muted)">No catalog objects clear the altitude threshold tonight.</td></tr>';
    return;
  }
  var winMs = bestState.window.end.getTime() - bestState.window.start.getTime();
  bestState.list.forEach(function(obj, i){
    var tr = document.createElement('tr');
    tr.setAttribute('data-desig', obj.desig);
    var barHtml = '<span class="vis-bar"></span>';
    if(obj.visSeg && winMs > 0){
      var left = (obj.visSeg.start - bestState.window.start.getTime()) / winMs * 100;
      var width = Math.max((obj.visSeg.end - obj.visSeg.start) / winMs * 100, 2);
      barHtml = '<span class="vis-bar"><span class="vis-bar-fill" style="left:'+left.toFixed(1)+'%;width:'+width.toFixed(1)+'%;"></span></span>';
    }
    tr.innerHTML =
      '<td>'+(i+1)+'</td>' +
      '<td><b>'+obj.desig+'</b><br><span style="color:var(--muted);font-size:11px;">'+obj.name+'</span></td>' +
      '<td>'+fmtAlt(obj.peakAlt)+'</td>' +
      '<td>'+fmtTime(obj.rise)+'</td>' +
      '<td>'+fmtTime(obj.transit)+'</td>' +
      '<td>'+fmtTime(obj.set)+'</td>' +
      '<td>'+barHtml+'</td>';
    tbody.appendChild(tr);
  });
}

function selectBestRow(desig, isToday, gotoTarget){
  if(!bestState) return;
  var obj = null;
  for(var i=0;i<bestState.list.length;i++){ if(bestState.list[i].desig===desig){ obj = bestState.list[i]; break; } }
  if(!obj) return;
  Array.prototype.forEach.call(document.querySelectorAll('#bestTableBody tr'), function(tr){
    var match = tr.getAttribute('data-desig')===desig;
    tr.classList.toggle('active', match);
  });
  drawAltGraph(obj, isToday);
  if(gotoTarget){
    document.getElementById('searchInput').value = desig;
    goTo(desig);
  }
}

var SVGNS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs){
  var el = document.createElementNS(SVGNS, tag);
  for(var k in attrs){ el.setAttribute(k, attrs[k]); }
  return el;
}

// Hand-rolled altitude-vs-time chart (no chart library dependency, matches the rest of the
// app's zero-build-step approach): twilight-shaded background, horizon line, altitude curve,
// transit peak label, "now" marker, and a hover crosshair+tooltip.
function drawAltGraph(obj, isToday){
  var svg = document.getElementById('altGraph');
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  var titleEl = document.getElementById('altGraphTitle');
  if(!obj || !bestState){
    titleEl.textContent = 'Select a target above to see its altitude curve tonight';
    return;
  }
  titleEl.textContent = 'Altitude tonight — ' + obj.desig + ' (' + obj.name + ')';

  var W=720, H=320, mL=42, mR=14, mT=14, mB=32;
  var plotW = W-mL-mR, plotH = H-mT-mB;
  var tStart = bestState.noon.getTime(), tEnd = bestState.nextNoon.getTime();
  var altMin=-30, altMax=90;

  function xPix(t){ return mL + (t-tStart)/(tEnd-tStart)*plotW; }
  function yPix(alt){ return mT + (altMax-alt)/(altMax-altMin)*plotH; }

  // twilight shading: lighter = brighter sky, darkest = astronomical night (single-hue ramp)
  var sc = bestState.sunCurve;
  for(var i=0;i<sc.length-1;i++){
    var a=sc[i], b=sc[i+1];
    var midAlt = (a.alt+b.alt)/2;
    var op = midAlt>=0 ? 0.16 : midAlt>=-6 ? 0.11 : midAlt>=-12 ? 0.06 : midAlt>=-18 ? 0.02 : 0;
    var x1=xPix(a.t.getTime()), x2=xPix(b.t.getTime());
    svg.appendChild(svgEl('rect', {x:x1.toFixed(2), y:mT, width:Math.max(x2-x1,0.5).toFixed(2), height:plotH, fill:'#ffffff', opacity:op}));
  }

  [0,30,60,90].forEach(function(altTick){
    var y = yPix(altTick);
    svg.appendChild(svgEl('line', {x1:mL, x2:W-mR, y1:y.toFixed(2), y2:y.toFixed(2), stroke:'var(--border)', 'stroke-width':altTick===0?1.5:1}));
    var lbl = svgEl('text', {x:mL-8, y:(y+3).toFixed(2), 'text-anchor':'end', 'font-size':10, fill:'var(--muted)'});
    lbl.textContent = altTick+'°';
    svg.appendChild(lbl);
  });

  for(var t=tStart; t<=tEnd; t+=3*3600000){
    var x = xPix(t);
    svg.appendChild(svgEl('line', {x1:x.toFixed(2), x2:x.toFixed(2), y1:mT, y2:H-mB, stroke:'var(--border)', 'stroke-width':1}));
    var td = new Date(t);
    var tlbl = svgEl('text', {x:x.toFixed(2), y:H-mB+16, 'text-anchor':'middle', 'font-size':10, fill:'var(--muted)'});
    tlbl.textContent = pad2(td.getHours())+':00';
    svg.appendChild(tlbl);
  }

  var pts = obj.curve.map(function(p){ return xPix(p.t.getTime()).toFixed(2)+','+yPix(p.alt).toFixed(2); }).join(' ');
  svg.appendChild(svgEl('polyline', {points:pts, fill:'none', stroke:'var(--accent)', 'stroke-width':2, 'stroke-linecap':'round', 'stroke-linejoin':'round'}));

  var peakX = xPix(obj.transit.getTime()), peakY = yPix(obj.transitAlt);
  svg.appendChild(svgEl('circle', {cx:peakX.toFixed(2), cy:peakY.toFixed(2), r:4, fill:'var(--accent)'}));
  var peakLbl = svgEl('text', {x:peakX.toFixed(2), y:Math.max(peakY-10,mT+10).toFixed(2), 'text-anchor':'middle', 'font-size':10, fill:'var(--text)'});
  peakLbl.textContent = Math.round(obj.transitAlt)+'° at '+fmtTime(obj.transit);
  svg.appendChild(peakLbl);

  if(isToday){
    var now = new Date().getTime();
    if(now>=tStart && now<=tEnd){
      var nx = xPix(now);
      svg.appendChild(svgEl('line', {x1:nx.toFixed(2), x2:nx.toFixed(2), y1:mT, y2:H-mB, stroke:'var(--ok)', 'stroke-width':1.5, 'stroke-dasharray':'4,3'}));
      var nowLbl = svgEl('text', {x:nx.toFixed(2), y:mT+10, 'text-anchor':'middle', 'font-size':10, fill:'var(--ok)'});
      nowLbl.textContent = 'now';
      svg.appendChild(nowLbl);
    }
  }

  var hoverLine = svgEl('line', {x1:0,x2:0,y1:mT,y2:H-mB, stroke:'var(--text)', 'stroke-width':1, opacity:0});
  var hoverDot = svgEl('circle', {r:3.5, fill:'var(--text)', opacity:0});
  var hoverText = svgEl('text', {'font-size':11, fill:'var(--text)', opacity:0});
  svg.appendChild(hoverLine); svg.appendChild(hoverDot); svg.appendChild(hoverText);

  var overlay = svgEl('rect', {x:mL, y:mT, width:plotW, height:plotH, fill:'transparent'});
  overlay.addEventListener('mousemove', function(e){
    var rect = svg.getBoundingClientRect();
    var mx = (e.clientX-rect.left) * (W/rect.width);
    var frac = Math.max(0, Math.min(1, (mx-mL)/plotW));
    var t = tStart + frac*(tEnd-tStart);
    var nearest = obj.curve[0], best = Infinity;
    for(var i=0;i<obj.curve.length;i++){
      var dt = Math.abs(obj.curve[i].t.getTime()-t);
      if(dt<best){ best=dt; nearest=obj.curve[i]; }
    }
    var hx = xPix(nearest.t.getTime()), hy = yPix(nearest.alt);
    hoverLine.setAttribute('x1',hx.toFixed(2)); hoverLine.setAttribute('x2',hx.toFixed(2)); hoverLine.setAttribute('opacity',0.5);
    hoverDot.setAttribute('cx',hx.toFixed(2)); hoverDot.setAttribute('cy',hy.toFixed(2)); hoverDot.setAttribute('opacity',1);
    hoverText.setAttribute('x', Math.min(Math.max(hx+8, mL), W-mR-90));
    hoverText.setAttribute('y', Math.max(hy-8, mT+10));
    hoverText.setAttribute('opacity',1);
    hoverText.textContent = fmtTime(nearest.t)+' — '+Math.round(nearest.alt)+'°';
  });
  overlay.addEventListener('mouseleave', function(){
    hoverLine.setAttribute('opacity',0); hoverDot.setAttribute('opacity',0); hoverText.setAttribute('opacity',0);
  });
  svg.appendChild(overlay);
}

// Lets the user drag the handle at the top of the panel to resize it vertically,
// remembering the chosen height across sessions.
function initBestPanelResize(){
  var handle = document.getElementById('bestPanelResizeHandle');
  var body = document.getElementById('bestPanelBody');
  var dragging = false, startY = 0, startHeight = 0;

  function clampHeight(h){
    var maxH = window.innerHeight * 0.85;
    return Math.max(140, Math.min(h, maxH));
  }
  function onMove(e){
    if(!dragging) return;
    body.style.height = clampHeight(startHeight - (e.clientY - startY)) + 'px';
  }
  function onUp(){
    if(!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
    try{ localStorage.setItem('fov_bestpanel_h', body.style.height); }catch(e){}
  }
  handle.addEventListener('pointerdown', function(e){
    dragging = true;
    startY = e.clientY;
    startHeight = body.getBoundingClientRect().height;
    handle.classList.add('dragging');
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    e.preventDefault();
  });

  try{
    var stored = localStorage.getItem('fov_bestpanel_h');
    if(stored) body.style.height = stored;
  }catch(e){}
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

  document.getElementById('dateInput').value = todayLocalISO();
  document.getElementById('useLocBtn').addEventListener('click', function(){
    requestGeolocation(refreshBestPanel);
  });
  document.getElementById('recomputeBtn').addEventListener('click', refreshBestPanel);
  document.getElementById('latInput').addEventListener('change', refreshBestPanel);
  document.getElementById('lonInput').addEventListener('change', refreshBestPanel);
  document.getElementById('dateInput').addEventListener('change', refreshBestPanel);
  document.getElementById('minAltInput').addEventListener('change', refreshBestPanel);
  document.getElementById('bestTableBody').addEventListener('click', function(e){
    var tr = e.target;
    while(tr && tr.tagName !== 'TR') tr = tr.parentNode;
    if(!tr || !tr.getAttribute) return;
    var desig = tr.getAttribute('data-desig');
    if(!desig) return;
    var dateVal = document.getElementById('dateInput').value || todayLocalISO();
    selectBestRow(desig, dateVal === todayLocalISO(), true);
  });
  document.getElementById('bestToggleBtn').addEventListener('click', function(){
    var panel = document.getElementById('bestPanel');
    var collapsed = panel.classList.toggle('collapsed');
    this.textContent = collapsed ? 'Show' : 'Hide';
  });
  initBestPanelResize();

  var stored = loadStoredLocation();
  if(stored){
    document.getElementById('latInput').value = stored.lat.toFixed(4);
    document.getElementById('lonInput').value = stored.lon.toFixed(4);
    refreshBestPanel();
  } else {
    requestGeolocation(refreshBestPanel);
  }

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
