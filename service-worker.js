if(!self.define){let e,c={};const s=(s,i)=>(s=new URL(s+".js",i).href,c[s]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=c,document.head.appendChild(e)}else e=s,importScripts(s),c()})).then((()=>{let e=c[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,o)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(c[n])return;let r={};const f=e=>s(e,n),a={module:{uri:n},exports:r,require:f};c[n]=Promise.all(i.map((e=>a[e]||f(e)))).then((e=>(o(...e),r)))}}define(["./workbox-9a84fccb"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Framework7Icons-Regular-Db9RwDq_.woff2",revision:"4a39aba9fb8a2f831fa437780e1a058a"},{url:"assets/Framework7Icons-Regular-DocpuGSF.woff",revision:"d03b787b6492fa2b0141c43fb7e56689"},{url:"assets/index-BFrnZnhQ.js",revision:"b3bc348b1ec5a5a49b4bf2bdbf9851ef"},{url:"assets/index-JYMnRTiD.css",revision:"8cb2b468f84cce8891757990a64412f1"},{url:"assets/material-icons-Dr0goTwe.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/material-icons-kAwBdRge.woff2",revision:"53436aca8627a49f4deaaa44dc9e3c05"},{url:"icons/icons8-cloud-16.png",revision:"b6ab29403bb395f7b7d8b7ea7efbedf0"},{url:"icons/icons8-cloud-32.png",revision:"8f167a88cc98a1c77437c495290630a1"},{url:"icons/icons8-cloud-57.png",revision:"f9b32fdc04cdb1b24ffb31ed810f8bfe"},{url:"icons/icons8-cloud-60.png",revision:"c85c696be3e709bad2782a3dda2d988e"},{url:"icons/icons8-cloud-72.png",revision:"52f96374b146206701442e6b24946136"},{url:"icons/icons8-cloud-76.png",revision:"486980a136ec227471900dfe29bf36ac"},{url:"icons/icons8-cloud-96.png",revision:"4c3beb4ce7ca202b91c6ccf6ffce94ed"},{url:"index.html",revision:"cc20c9c5ce957b48f3097139ec3d59bf"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=service-worker.js.map