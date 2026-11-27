const C='kt-v5';
const ASSETS=['./','index.html','manifest.webmanifest','icon-180.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));
});

// phone reminders
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json();}catch(_){d={body:e.data?e.data.text():''};}
  e.waitUntil(self.registration.showNotification(d.title||'Kitchen Table',{body:d.body||'',icon:'icon-180.png',badge:'icon-180.png',tag:d.tag||'kt-pickup',data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const u=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if('focus' in c){if(c.navigate)c.navigate(u);return c.focus();}}
    return self.clients.openWindow(u);
  }));
});
