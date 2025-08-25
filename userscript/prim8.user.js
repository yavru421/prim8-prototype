// ==UserScript==
// @name         Prim8 AI Manager
// @namespace    https://github.com/yavru421/prim8-prototype
// @version      0.1
// @description  Floating AI chat box to generate and inject Tampermonkey scripts
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
(function() {
  'use strict';
  const hostKey = 'prim8_backend_host';
  const defaultHost = 'http://127.0.0.1:5000';
  const backendHost = GM_getValue(hostKey, defaultHost);

  function container(tag, styles) { const el = document.createElement(tag); Object.assign(el.style, styles); return el; }

  const box = container('div', { position:'fixed', bottom:'20px', right:'20px', width:'320px', height:'420px', background:'#fff', border:'2px solid #222', zIndex:'999999', resize:'both', overflow:'hidden', display:'flex', flexDirection:'column', fontFamily:'sans-serif', fontSize:'12px' });
  const header = container('div', { flex:'0 0 28px', background:'#222', color:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 6px', cursor:'move' });
  header.textContent = 'Prim8';
  const settingsBtn = document.createElement('button'); settingsBtn.textContent = '⚙'; settingsBtn.style.fontSize='12px'; header.appendChild(settingsBtn);
  const preview = container('pre', { flex:'1 1 auto', margin:0, padding:'6px', overflow:'auto', background:'#f7f7f7' });
  const input = document.createElement('textarea'); Object.assign(input.style, { flex:'0 0 70px', resize:'none' });
  const actions = container('div', { flex:'0 0 34px', display:'flex', gap:'6px', padding:'4px' });
  const genBtn = document.createElement('button'); genBtn.textContent='Generate';
  const injectBtn = document.createElement('button'); injectBtn.textContent='Inject'; injectBtn.disabled = true;
  actions.append(genBtn, injectBtn);
  box.append(header, preview, input, actions); document.body.appendChild(box);

  settingsBtn.onclick = () => {
    const newHost = prompt('Prim8 backend host', backendHost) || backendHost;
    GM_setValue(hostKey, newHost);
    alert('Saved host: ' + newHost);
  };

  genBtn.onclick = () => {
    const prompt = input.value.trim(); if (!prompt) return alert('Enter prompt');
    preview.textContent = 'Generating...';
    GM_xmlhttpRequest({
      method:'POST', url: (GM_getValue(hostKey, defaultHost) + '/generate'),
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ prompt, context: '' }),
      onload: resp => {
        try {
          const data = JSON.parse(resp.responseText);
          if (data.error) { preview.textContent = 'Error: ' + data.error; return; }
          preview.textContent = data.script;
          injectBtn.disabled = false;
        } catch(e){ preview.textContent = 'Parse error'; }
      },
      onerror: () => { preview.textContent = 'Request failed'; }
    });
  };

  injectBtn.onclick = () => {
    const code = preview.textContent;
    if (!code.startsWith('// Generated')) { if(!confirm('Script does not look generated. Inject anyway?')) return; }
    try {
      // eslint-disable-next-line no-eval
      eval(code);
      alert('Injected.');
    } catch(e) {
      alert('Injection error: ' + e.message);
    }
  };
})();
