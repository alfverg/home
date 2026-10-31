/**
 * Home Page · backend en Google Apps Script
 *
 * Lee Notion (📋 Pendientes), Google Calendar y Gmail (etiqueta "Home"),
 * arma UN solo JSON compacto y lo guarda en caché. La página lo pide al abrir.
 * Los hábitos (lista y ✓ de cada día) viven en un Google Sheet que el script crea solo.
 *
 * Configuración (una sola vez):
 *   1. Pega este archivo en script.google.com (proyecto nuevo).
 *   2. Ejecuta `setup()` y acepta los permisos.
 *   3. En Configuración del proyecto > Propiedades del script, pon:
 *        NOTION_TOKEN = secret_xxx   (tu integración de Notion)
 *      La KEY se crea sola; la ves en el registro de `setup()`.
 *   4. Implementar > Nueva implementación > Aplicación web
 *        Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario
 */

const NOTION_DB = '2767c8edbe0e8045a5fbdc6e359a8f6f'; // 📋 Pendientes
const NOTION_VERSION = '2022-06-28';
const GMAIL_QUERY = 'label:Home in:inbox';
const CAL_DAYS = 7;
const CACHE_KEY = 'home_v2';
const HAB_DIAS = 3; // días de ✓ que viajan a la página

// Hábitos iniciales (copiados de las tarjetas "Hábitos Mañana" y "Hábitos Noche").
// Solo se usan la primera vez; después la lista vive en el Sheet y se edita desde la página.
const HAB_INICIAL = {
  man: [
    ['🚿 Despertar', ['Mirror Stare', '🥶 Regaderazo agua fría', '🛏️ Hacer cama']],
    ['🧘🏾‍♂️ Cuerpo y mente', ['🤸🏾‍♂️ Estirar', 'Partes', '🧘🏾‍♂️ Meditación', '🧎🏾‍➡️ Oración chica']],
    ['🍏 Comer', ['🍏 Comer algo', '🚰 Agua']],
    ['💊 Pastillas', ['Kefir', 'Creatina', 'Propóleos y Jalea Real', 'Magnesio']],
  ],
  si: [],
  no: [],
  noc: [
    '📵 No celular',
    ['🙄 Casa', ['🙄 Recoger casa', '👔 Ropa día siguiente']],
    ['🌬️ Calma', ['🧎🏾 Meditar', '🤸🏾‍♂️ Estirar', '🌬️ Respirar']],
    ['📖 Cerrar el día', ['📋 Actualizar hábitos', '📖 Leer']],
  ],
};

const DONE_STATES = ['✅ Done✅', 'Done Limpiar'];
const PROGRESO_100 = '100% - ⬤⬤⬤⬤⬤';

// ---------- Setup ----------

function setup() {
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('KEY')) {
    props.setProperty('KEY', Utilities.getUuid().replace(/-/g, ''));
  }
  Logger.log('Tu KEY (pégala en la página): ' + props.getProperty('KEY'));
  Logger.log('Sheet de hábitos: ' + habSheet_().getUrl());

  // Trigger cada hora (borra los anteriores para no duplicar)
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'refreshCache')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('refreshCache').timeBased().everyHours(1).create();

  refreshCache();
  Logger.log('Listo. Caché inicial creada.');
}

// ---------- Web app ----------

function doGet(e) {
  const p = e.parameter || {};
  if (!authorized_(p.k)) return json_({ error: 'unauthorized' });

  const snap = p.fresh === '1' ? refreshCache() : getSnapshot_();
  // Ahorro de datos: si la página ya tiene esta versión, no se reenvía nada
  if (p.h && p.h === snap.h) return json_({ same: true, h: snap.h });
  return json_(snap);
}

/** Escrituras. La página manda text/plain para evitar preflight CORS. */
function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ error: 'bad json' }); }
  if (!authorized_(body.k)) return json_({ error: 'unauthorized' });

  try {
    if (body.action === 'setEstado') {
      const props = { Estado: { status: { name: body.estado } } };
      if (body.estado === DONE_STATES[0]) props.Progreso = { select: { name: PROGRESO_100 } };
      notion_('patch', '/pages/' + body.id, { properties: props });
    } else if (body.action === 'setTiempo') {
      notion_('patch', '/pages/' + body.id, {
        properties: { Tiempo: body.tiempo ? { select: { name: body.tiempo } } : { select: null } },
      });
    } else if (body.action === 'habSet') {
      // Un ✓ (o su quitada) de un hábito en un día: se agrega un renglón, el último manda
      habSheet_().getSheetByName('Registro').appendRow([body.f, body.llave, body.v ? 1 : 0, new Date()]);
      return json_({ ok: true, snap: refreshHab_() });
    } else if (body.action === 'habEst') {
      // La lista de hábitos (orden, módulos, nombres) completa
      habSheet_().getSheetByName('Estructura').getRange('A1').setValue(JSON.stringify(body.s));
      return json_({ ok: true, snap: refreshHab_() });
    } else {
      return json_({ error: 'unknown action' });
    }
    return json_({ ok: true, snap: refreshCache() });
  } catch (err) {
    return json_({ error: String(err) });
  }
}

// ---------- Snapshot ----------

function refreshCache() {
  const data = {
    t: new Date().toISOString(),
    tasks: safe_(getTasks_, []),
    events: safe_(getEvents_, []),
    mail: safe_(getMail_, []),
    hab: safe_(getHab_, null),
  };
  return guardar_(data);
}

/** Solo rehace la parte de hábitos (rápido: no vuelve a leer Notion). */
function refreshHab_() {
  const data = getSnapshot_();
  data.hab = getHab_();
  data.t = new Date().toISOString();
  return guardar_(data);
}

function guardar_(data) {
  data.h = hash_(JSON.stringify([data.tasks, data.events, data.mail, data.hab]));
  CacheService.getScriptCache().put(CACHE_KEY, JSON.stringify(data), 21600); // 6 h, máx. permitido
  return data;
}

function getSnapshot_() {
  const raw = CacheService.getScriptCache().get(CACHE_KEY);
  return raw ? JSON.parse(raw) : refreshCache();
}

// ---------- Notion ----------

function getTasks_() {
  const filter = {
    and: DONE_STATES.map(s => ({ property: 'Estado', status: { does_not_equal: s } })),
  };
  const out = [];
  let cursor;
  do {
    const res = notion_('post', '/databases/' + NOTION_DB + '/query', {
      filter, page_size: 100, start_cursor: cursor,
    });
    res.results.forEach(pg => out.push(compactTask_(pg)));
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return out;
}

function compactTask_(pg) {
  const p = pg.properties;
  const sel = x => (x && x.select ? x.select.name : '');
  const multi = x => (x && x.multi_select ? x.multi_select.map(o => o.name) : []);
  const t = {
    id: pg.id.replace(/-/g, ''),
    n: (p.Nombre.title || []).map(r => r.plain_text).join(''),
    e: p.Estado.status ? p.Estado.status.name : '',
    ti: sel(p.Tiempo),
    v: sel(p.Vivo),
    sz: sel(p['Tamaño']),
    c: multi(p.Categoria),
    pr: p.Prioridad.number,
    d: p.Deadline.date ? p.Deadline.date.start : null,
    o: sel(p.Obligatorio),
    pg: sel(p.Progreso),
    sc: multi(p.Subcategoria),
  };
  // Quita campos vacíos para ahorrar bytes
  Object.keys(t).forEach(k => {
    if (t[k] === '' || t[k] === null || (Array.isArray(t[k]) && !t[k].length)) delete t[k];
  });
  return t;
}

function notion_(method, path, payload) {
  const token = PropertiesService.getScriptProperties().getProperty('NOTION_TOKEN');
  if (!token) throw new Error('Falta NOTION_TOKEN');
  const res = UrlFetchApp.fetch('https://api.notion.com/v1' + path, {
    method,
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token, 'Notion-Version': NOTION_VERSION },
    payload: payload ? JSON.stringify(payload) : undefined,
    muteHttpExceptions: true,
  });
  const code = res.getResponseCode();
  if (code >= 300) throw new Error('Notion ' + code + ': ' + res.getContentText().slice(0, 200));
  return JSON.parse(res.getContentText());
}

// ---------- Hábitos (Google Sheet) ----------

/** El Sheet "Home · Hábitos": se crea solo la primera vez. Hojas: Estructura (A1 = JSON) y Registro. */
function habSheet_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('HAB_SHEET');
  if (id) return SpreadsheetApp.openById(id);
  const ss = SpreadsheetApp.create('Home · Hábitos');
  ss.getSheets()[0].setName('Estructura').getRange('A1').setValue(JSON.stringify(HAB_INICIAL));
  const reg = ss.insertSheet('Registro');
  reg.getRange('A:A').setNumberFormat('@'); // la fecha va como texto AAAA-MM-DD, sin que Sheets la convierta
  reg.appendRow(['fecha', 'llave', 'valor', 'cuando']);
  props.setProperty('HAB_SHEET', ss.getId());
  return ss;
}

/** { s: lista de hábitos, d: { 'AAAA-MM-DD': { llave: 1 } } } con los últimos días */
function getHab_() {
  const ss = habSheet_();
  const s = JSON.parse(ss.getSheetByName('Estructura').getRange('A1').getValue() || 'null') || HAB_INICIAL;
  const reg = ss.getSheetByName('Registro');
  const last = reg.getLastRow();
  const d = {};
  if (last > 1) {
    const desde = Utilities.formatDate(new Date(Date.now() - HAB_DIAS * 864e5), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    // Solo las últimas filas: con ~40 ✓ diarios, 600 alcanzan para varios días
    const start = Math.max(2, last - 599);
    const filas = reg.getRange(start, 1, last - start + 1, 3).getDisplayValues();
    filas.forEach(([f, llave, v]) => {
      if (f < desde) return;
      (d[f] = d[f] || {})[llave] = v === '1' ? 1 : 0;
    });
    Object.keys(d).forEach(f => Object.keys(d[f]).forEach(k => { if (!d[f][k]) delete d[f][k]; }));
  }
  return { s, d };
}

// ---------- Calendar ----------

function getEvents_() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start.getTime() + CAL_DAYS * 864e5);
  const out = [];
  CalendarApp.getAllCalendars()
    .filter(c => c.isSelected() && !c.isHidden())
    .forEach(cal => {
      cal.getEvents(start, end).forEach(ev => {
        out.push({
          n: ev.getTitle(),
          s: ev.getStartTime().toISOString(),
          e: ev.getEndTime().toISOString(),
          ad: ev.isAllDayEvent() ? 1 : undefined,
          l: ev.getLocation() || undefined,
          col: cal.getColor(),
        });
      });
    });
  return out.sort((a, b) => a.s.localeCompare(b.s));
}

// ---------- Gmail ----------

function getMail_() {
  return GmailApp.search(GMAIL_QUERY, 0, 8).map(th => {
    const m = th.getMessages().pop();
    return {
      s: th.getFirstMessageSubject(),
      f: m.getFrom().replace(/<.*>/, '').replace(/"/g, '').trim(),
      d: th.getLastMessageDate().toISOString(),
      u: th.isUnread() ? 1 : undefined,
      id: th.getId(),
    };
  });
}

// ---------- Utilidades ----------

function authorized_(k) {
  const key = PropertiesService.getScriptProperties().getProperty('KEY');
  return key && k === key;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function hash_(s) {
  return Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, s, Utilities.Charset.UTF_8)
  ).slice(0, 12);
}

function safe_(fn, fallback) {
  try { return fn(); } catch (err) { console.error(fn.name, err); return fallback; }
}
