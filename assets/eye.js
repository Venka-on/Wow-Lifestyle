(function(){
var d=document,calm=matchMedia('(prefers-reduced-motion:reduce)').matches,st=[].slice.call(d.querySelectorAll('[data-stage]'));
var cv=d.getElementById('eye');if(!st.length||!cv||!window.THREE)return;
var hov=0,hovAt=-1,lastEl=null,lastY=scrollY,vel=0,px=0,py=0,lastMove=-1e5;
d.addEventListener('pointerover',function(e){var el=e.target.closest&&e.target.closest('.card,.post,.btn,.nav a,.nav button');
if(el&&el!==lastEl){lastEl=el;hovAt=performance.now();hov=el.matches('.card,.post')?2:1}else if(!el){lastEl=null;hov=0}},{passive:true});
addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;lastMove=performance.now()},{passive:true});
var R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.outputEncoding=THREE.sRGBEncoding;
var S=new THREE.Scene(),C=new THREE.OrthographicCamera(-1,1,1,-1,-3000,3000),eye=new THREE.Group();S.add(eye);
var lin=function(h){return new THREE.Color(h).convertSRGBToLinear()};
var sh=new THREE.Shape();sh.absarc(0,0,1.5,0,Math.PI*2,false);var hole=new THREE.Path();hole.absarc(.3,0,.72,0,Math.PI*2,true);sh.holes.push(hole);
var g=new THREE.ExtrudeGeometry(sh,{depth:.5,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:6,curveSegments:96});g.translate(0,0,-.25);
eye.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:lin(0xC2581F),roughness:.42,metalness:.1})));
var ball=new THREE.Mesh(new THREE.CircleGeometry(.72,64),new THREE.MeshBasicMaterial({color:0xffffff}));ball.position.set(.3,0,-.1);eye.add(ball);
var pup=new THREE.Mesh(new THREE.CircleGeometry(.3,48),new THREE.MeshBasicMaterial({color:lin(0x121110)}));pup.position.set(.3,0,-.05);eye.add(pup);
var hl=new THREE.Mesh(new THREE.CircleGeometry(.07,24),new THREE.MeshBasicMaterial({color:0xffffff}));hl.position.set(.09,.1,.01);pup.add(hl);
S.add(new THREE.AmbientLight(0xffffff,.55));var k1=new THREE.DirectionalLight(0xffffff,.85);k1.position.set(300,400,500);S.add(k1);var k2=new THREE.DirectionalLight(0xffd9bf,.35);k2.position.set(-400,-200,300);S.add(k2);
var W=0,H=0;function fit(){W=innerWidth;H=innerHeight;R.setPixelRatio(Math.min(devicePixelRatio,2));R.setSize(W,H,false);C.left=-W/2;C.right=W/2;C.top=H/2;C.bottom=-H/2;C.updateProjectionMatrix()}
fit();addEventListener('resize',fit);
var cur=null,pp={x:0,y:0},blinkAt=3000,blinkT=-1,seen=-1,ps=1,zTop=false,ry=0;
function frame(now){requestAnimationFrame(frame);
var sy=scrollY,vh=innerHeight,i,P=[],S0=[];vel=vel*.8+(sy-lastY)*.2;lastY=sy;
for(i=0;i<st.length;i++){var r=st[i].getBoundingClientRect();P.push({x:r.left+r.width/2,y:r.top+sy+r.height/2,s:Math.min(r.width,r.height)})}
for(i=0;i<P.length;i++)S0.push(i?Math.max(S0[i-1]+1,P[i].y-vh/2):0);
var j=0;while(j<P.length-1&&sy>=S0[j+1])j++;
var a=P[j],c=P[Math.min(j+1,P.length-1)],tt=0;
if(j<P.length-1)tt=Math.max(0,Math.min(1,(sy-S0[j])/(S0[j+1]-S0[j])));
var e=tt*tt*(3-2*tt),dir=c.x>a.x?-1:1;
var tg={x:a.x+(c.x-a.x)*e,y:a.y+(c.y-a.y)*e-sy,s:(a.s+(c.s-a.s)*e)*(1-.22*Math.sin(Math.PI*e))};
var onCard=hov===2&&lastEl&&lastEl.matches('.card,.post');
if(onCard!==zTop){zTop=onCard;cv.style.zIndex=onCard?'30':'1'}
if(onCard){var hr=lastEl.getBoundingClientRect();tg={x:hr.right-Math.min(52,hr.width*.2),y:hr.top+Math.min(52,hr.width*.2),s:Math.min(88,hr.width*.32)}}
if(!cur)cur=tg;else{var f=calm?1:(onCard?.22:.14);cur.x+=(tg.x-cur.x)*f;cur.y+=(tg.y-cur.y)*f;cur.s+=(tg.s-cur.s)*f}
eye.position.set(cur.x-W/2,H/2-cur.y,0);
var bump=calm?0:Math.max(0,1-(now-hovAt)/500);
if(hovAt!==seen){seen=hovAt;if(!calm&&hov){blinkT=now;blinkAt=now+300}}
eye.scale.setScalar(Math.max(1,cur.s)/3*(1+.1*Math.sin(bump*Math.PI)*(hov===2?1.3:.6)));
var mx=calm?0:(px/W-.5),my=calm?0:(py/vh-.5);
var rt=onCard?mx*.3:(calm?0:(j+e)*Math.PI*2)+mx*.5;ry+=(rt-ry)*(calm?1:.18);eye.rotation.y=ry;eye.rotation.x=my*.35;eye.rotation.z=dir*Math.sin(Math.PI*e)*.35;
var tx,ty;
if(now-lastMove<2500){var dx=px-cur.x,dy=py-cur.y,L=Math.hypot(dx,dy)||1,m=Math.min(1,L/(cur.s*.9));tx=dx/L*m;ty=-dy/L*m}
else{tx=Math.sin(now/1400)*.5;ty=Math.cos(now/1900)*.35}
ty-=Math.max(-1,Math.min(1,vel/30))*.6;var q=Math.hypot(tx,ty);if(q>1){tx/=q;ty/=q}
pp.x+=(tx-pp.x)*.2;pp.y+=(ty-pp.y)*.2;pup.position.set(.3+pp.x*.4,pp.y*.4,-.05);
var sc=1;if(!calm){if(now>blinkAt){blinkT=now;blinkAt=now+3500+Math.random()*3500}
if(blinkT>0){var u=(now-blinkT)/230;if(u>=1)blinkT=-1;else sc=Math.max(.04,Math.abs(1-2*u))}}
ps+=((hov===2?1.45:hov===1?1.2:1)-ps)*.15;ball.scale.y=sc;pup.scale.set(ps,ps*sc,1);R.render(S,C)}
requestAnimationFrame(frame)})();