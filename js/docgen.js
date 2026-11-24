/* Marriage Code export: real .docx (no libraries) and print-to-PDF. */
(function (root) {
  var enc = typeof TextEncoder !== 'undefined' ? new TextEncoder() : new (require('util').TextEncoder)();

  function xesc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- minimal ZIP (store) ---------- */
  var CRC = null;
  function crc32(u8) {
    if (!CRC) { CRC = new Uint32Array(256); for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; CRC[n] = c >>> 0; } }
    var crc = 0xFFFFFFFF; for (var i = 0; i < u8.length; i++) crc = CRC[(crc ^ u8[i]) & 255] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function zip(files) {
    var parts = [], central = [], offset = 0;
    function w16(a, v) { a.push(v & 255, (v >> 8) & 255); }
    function w32(a, v) { a.push(v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >>> 24) & 255); }
    files.forEach(function (f) {
      var name = enc.encode(f.name), data = enc.encode(f.data), crc = crc32(data);
      var h = []; w32(h, 0x04034b50); w16(h, 20); w16(h, 0x0800); w16(h, 0); w16(h, 0); w16(h, 0x21); w32(h, crc); w32(h, data.length); w32(h, data.length); w16(h, name.length); w16(h, 0);
      parts.push(Uint8Array.from(h), name, data);
      var c = []; w32(c, 0x02014b50); w16(c, 20); w16(c, 20); w16(c, 0x0800); w16(c, 0); w16(c, 0); w16(c, 0x21); w32(c, crc); w32(c, data.length); w32(c, data.length); w16(c, name.length); w16(c, 0); w16(c, 0); w16(c, 0); w16(c, 0); w32(c, 0); w32(c, offset);
      central.push(Uint8Array.from(c), name);
      offset += h.length + name.length + data.length;
    });
    var cdSize = 0; central.forEach(function (p) { cdSize += p.length; });
    var e = []; w32(e, 0x06054b50); w16(e, 0); w16(e, 0); w16(e, files.length); w16(e, files.length); w32(e, cdSize); w32(e, offset); w16(e, 0);
    var all = parts.concat(central, [Uint8Array.from(e)]), total = 0; all.forEach(function (p) { total += p.length; });
    var out = new Uint8Array(total), pos = 0; all.forEach(function (p) { out.set(p, pos); pos += p.length; });
    return out;
  }

  /* ---------- DOCX ---------- */
  var FONT = 'Nirmala UI';
  function run(text, o) {
    o = o || {};
    return '<w:r><w:rPr><w:rFonts w:ascii="' + FONT + '" w:hAnsi="' + FONT + '" w:cs="' + FONT + '" w:eastAsia="' + FONT + '"/>' +
      (o.bold ? '<w:b/><w:bCs/>' : '') + (o.color ? '<w:color w:val="' + o.color + '"/>' : '') +
      '<w:sz w:val="' + (o.size || 24) + '"/><w:szCs w:val="' + (o.size || 24) + '"/></w:rPr><w:t xml:space="preserve">' + xesc(text) + '</w:t></w:r>';
  }
  function para(text, o) {
    o = o || {};
    return '<w:p><w:pPr>' + (o.keep ? '<w:keepNext/>' : '') + '<w:spacing w:before="' + (o.before || 0) + '" w:after="' + (o.after == null ? 140 : o.after) + '" w:line="320" w:lineRule="auto"/>' +
      (o.ind ? '<w:ind w:left="' + o.ind + '" w:hanging="' + (o.hang || 0) + '"/>' : '') +
      (o.align ? '<w:jc w:val="' + o.align + '"/>' : '') + '</w:pPr>' + (text === '' ? '' : run(text, o)) + '</w:p>';
  }

  function buildDocx(doc, siteName) {
    var b = [];
    b.push(para(siteName, { bold: true, size: 22, color: '7A1F2B', align: 'center', after: 60 }));
    b.push(para(doc.title, { bold: true, size: 40, color: '7A1F2B', align: 'center', after: 280 }));
    b.push(para(doc.bgTitle, { bold: true, size: 28, color: 'C2410C', keep: true, before: 120 }));
    doc.background.forEach(function (p) { b.push(para(p, { align: 'both' })); });
    b.push(para('', { after: 120 }));
    b.push(para(doc.title, { bold: true, size: 32, color: '7A1F2B', align: 'center', keep: true, before: 200 }));
    doc.addressee.forEach(function (l) { b.push(para(l, { bold: true, size: 26 })); });
    b.push(para(doc.intro, { align: 'both', before: 100 }));
    doc.statements.forEach(function (s, i) { b.push(para((i + 1) + '.  ' + s, { ind: 500, hang: 500, align: 'both' })); });
    b.push(para(doc.closing, { align: 'both', before: 160 }));
    b.push(para('', { after: 200 }));
    b.push(para(doc.sign.groom + ' ______________________', { before: 240 }));
    b.push(para(doc.sign.bride + ' ______________________', { before: 240 }));
    b.push(para(doc.sign.witnessTitle, { bold: true, before: 280, keep: true }));
    doc.sign.witnesses.forEach(function (w) { b.push(para(w + ' ______________________', { before: 200 })); });

    var NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
    var document_xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ' + NS + '><w:body>' + b.join('') +
      '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>';
    var styles_xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ' + NS + '><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="' + FONT + '" w:hAnsi="' + FONT + '" w:cs="' + FONT + '"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:rPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>';
    return zip([
      { name: '[Content_Types].xml', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>' },
      { name: '_rels/.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>' },
      { name: 'word/_rels/document.xml.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>' },
      { name: 'word/styles.xml', data: styles_xml },
      { name: 'word/document.xml', data: document_xml }
    ]);
  }

  /* ---------- Print / PDF ---------- */
  function buildHtml(doc, siteName, lang, title) {
    function e(s) { return xesc(s); }
    return '<!DOCTYPE html><html lang="' + lang + '"><head><meta charset="utf-8"><title>' + e(title || doc.title) + '</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">' +
      '<style>@page{size:A4;margin:18mm}body{font-family:"Noto Sans Kannada","Poppins",sans-serif;color:#2b1d16;line-height:1.75;font-size:12.5pt}' +
      'h1{text-align:center;color:#7a1f2b;font-size:22pt;margin:4px 0 14px}h2{color:#c2410c;font-size:15pt;margin:18px 0 6px;break-after:avoid}.site{text-align:center;color:#7a1f2b;font-weight:700;font-size:11pt}' +
      'p{margin:0 0 9px;text-align:justify}.ad{font-weight:700}ol{padding-left:26px;margin:8px 0}li{margin-bottom:8px;text-align:justify;break-inside:avoid}' +
      '.sig{margin-top:22px}.sig div{margin-top:22px;break-inside:avoid}.line{display:inline-block;border-bottom:1px solid #444;width:220px}</style></head><body>' +
      '<div class="site">' + e(siteName) + '</div><h1>' + e(doc.title) + '</h1>' +
      '<h2>' + e(doc.bgTitle) + '</h2>' + doc.background.map(function (p) { return '<p>' + e(p) + '</p>'; }).join('') +
      '<h2 style="text-align:center;font-size:17pt;color:#7a1f2b;margin-top:26px">' + e(doc.title) + '</h2>' +
      doc.addressee.map(function (l) { return '<p class="ad">' + e(l) + '</p>'; }).join('') + '<p>' + e(doc.intro) + '</p>' +
      '<ol>' + doc.statements.map(function (s) { return '<li>' + e(s) + '</li>'; }).join('') + '</ol><p>' + e(doc.closing) + '</p>' +
      '<div class="sig"><div>' + e(doc.sign.groom) + ' <span class="line"></span></div><div>' + e(doc.sign.bride) + ' <span class="line"></span></div>' +
      '<div><b>' + e(doc.sign.witnessTitle) + '</b></div>' + doc.sign.witnesses.map(function (w) { return '<div>' + e(w) + ' <span class="line"></span></div>'; }).join('') + '</div></body></html>';
  }

  function printPdf(doc, siteName, lang, filename) {
    var f = document.createElement('iframe');
    f.setAttribute('aria-hidden', 'true');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    document.body.appendChild(f);
    var d = f.contentWindow.document; d.open(); d.write(buildHtml(doc, siteName, lang, filename)); d.close();
    var done = false;
    function go() {
      if (done) return; done = true;
      var oldTitle = document.title;                       // browsers name the saved PDF after the page title
      if (filename) document.title = filename;
      try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {}
      if (filename) setTimeout(function () { document.title = oldTitle; }, 500);
      setTimeout(function () { if (f.parentNode) f.parentNode.removeChild(f); }, 60000);
    }
    var ready = d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve();
    ready.then(function () { setTimeout(go, 300); });
    setTimeout(go, 2500); // safety if fonts never resolve
  }

  function downloadDocx(doc, siteName, filename) {
    var bytes = buildDocx(doc, siteName);
    var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  root.MM_DOC = { buildDocx: buildDocx, buildHtml: buildHtml, downloadDocx: downloadDocx, printPdf: printPdf };
  if (typeof module !== 'undefined') module.exports = root.MM_DOC;
})(typeof window !== 'undefined' ? window : globalThis);
