(function(){var d=document,b=d.querySelector('.burger'),n=d.getElementById('nav'),t=d.querySelector('[data-cat]'),p=d.getElementById('catpanel');
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
t.addEventListener('click',function(e){e.stopPropagation();var o=p.classList.toggle('open');t.setAttribute('aria-expanded',o)});
d.addEventListener('click',function(e){if(!p.contains(e.target)){p.classList.remove('open');t.setAttribute('aria-expanded','false')}});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){p.classList.remove('open');n.classList.remove('open')}});
/* Bezzle-style mega-menu: rebuild the Categories panel as a 2-column
   grid of tiles (thumbnail + title + one-line description), in
   alphabetical order, with the old fly-out sub-links as small links
   under their parent tile. Hrefs and image paths are derived from the
   panel links already on the page, so this works at any folder depth. */
function categoryLink(suffix){return [].slice.call(p.querySelectorAll('a')).filter(function(a){return a.getAttribute('href').slice(-suffix.length)===suffix})[0]}
(function buildMegaMenu(){
var data=[
{suffix:'air-purifier/',title:'Air Purifier',desc:'Midea air purifiers',img:'air-purifier-card.webp'},
{suffix:'artificial-plants/',title:'Artificial Plants',desc:'Indoor greenery without the upkeep',img:'artificial-plants-product-1.webp'},
{suffix:'carpets/',title:'Carpets',desc:'Rugs for living rooms and bedrooms',img:'carpets-product-1.webp'},
{suffix:'curtains/',title:'Curtains',desc:'Fabrics and colours for every window',img:'curtains-card.webp'},
{suffix:'dining-table-chairs/',title:'Dining Table & Chairs',desc:'Round and oval tables with chairs for two to eight',img:'dining-table-chairs-1.webp'},
{suffix:'functional-sofa/',title:'Functional Sofa',desc:'Sofas with storage, pull-out beds and headrests',img:'functional-sofa-1.webp'},
{suffix:'high-back-chair/',title:'High Back Chair',desc:'High back bar stools and counter chairs',img:'high-back-chair-1.webp'},
{suffix:'home-furniture/',title:'Home Furniture',desc:'Sofas, beds, tables, wardrobes',img:'home-furniture-product-3.webp'},
{suffix:'lights/',title:'Lights',desc:'Track, decorative and LED lighting',img:'lights-product-1.webp'},
{suffix:'relaxing-chair/',title:'Relaxing Chair',desc:'Rocking, lounge and accent chairs',img:'relaxing-chair-1.webp'},
{suffix:'solid-wood-bed/',title:'Solid Wood Bed',desc:'Solid wood beds, some with storage',img:'solid-wood-bed-1.webp'},
{suffix:'wall-paintings/',title:'Wall Paintings',desc:'Wall art for living rooms and bedrooms',img:'wall-paintings-product-9.webp'},
{suffix:'wall-stickers/',title:'Wallpaper',desc:'Patterns and colours to refresh your walls.',img:'wallpaper-card.webp'}
];
var frag=d.createDocumentFragment();
data.forEach(function(item){
var link=categoryLink(item.suffix);if(!link)return;
var prefix=link.getAttribute('href').replace(/[^/]+\/$/,'');
var tile=d.createElement('div');tile.className='mega-item';
var main=d.createElement('a');main.className='mega-main';main.href=link.getAttribute('href');
if(item.img){var thumb=d.createElement('span');thumb.className='mega-thumb';
var photo=d.createElement('img');photo.src=prefix+'images/'+item.img;photo.alt='';photo.loading='lazy';photo.decoding='async';
thumb.appendChild(photo);main.appendChild(thumb)}
var text=d.createElement('span');text.className='mega-text';
var title=d.createElement('span');title.className='mega-title';title.textContent=item.title;
var desc=d.createElement('span');desc.className='mega-desc';desc.textContent=item.desc;
text.appendChild(title);text.appendChild(desc);main.appendChild(text);
tile.appendChild(main);
if(item.subs){
var subs=d.createElement('div');subs.className='mega-subs';
item.subs.forEach(function(s){
var sl=categoryLink(s.suffix);if(!sl)return;
var a=d.createElement('a');a.href=sl.getAttribute('href')+(s.anchor||'');a.textContent=s.label;subs.appendChild(a);
});
if(subs.childNodes.length)tile.appendChild(subs);
}
frag.appendChild(tile);
});
p.textContent='';p.appendChild(frag);
p.setAttribute('role','menu');
/* Start fetching the tile thumbnails on hover/focus intent, so the
   first open does not flash empty tiles while the largest image loads. */
var thumbsPreloaded=false;
function preloadThumbs(){if(thumbsPreloaded)return;thumbsPreloaded=true;var imgs=p.querySelectorAll('.mega-thumb img');for(var i=0;i<imgs.length;i++){imgs[i].loading='eager'}}
t.addEventListener('mouseenter',preloadThumbs);
t.addEventListener('focus',preloadThumbs);
})();

/* Bezzle-style pill nav: wrap the text links in a pill container with a
   sliding highlight. If measuring fails, the pill simply never appears
   and the CSS hover background is the fallback. */
(function pillNav(){
var btn=n.querySelector('.btn');
var wrap=d.createElement('div');wrap.className='nav-links';
var kids=[];for(var i=0;i<n.childNodes.length;i++){var c=n.childNodes[i];if(c.nodeType===1&&c!==btn)kids.push(c)}
kids.forEach(function(c){wrap.appendChild(c)});
n.insertBefore(wrap,btn||null);
var pill=d.createElement('i');pill.className='nav-pill';pill.setAttribute('aria-hidden','true');wrap.appendChild(pill);
var hovered=null;
function current(){return wrap.querySelector('a[aria-current]')}
function move(target){
try{
if(!target){pill.style.opacity='0';return}
var r=target.getBoundingClientRect(),w=wrap.getBoundingClientRect();
pill.style.left=(r.left-w.left)+'px';pill.style.width=r.width+'px';pill.style.opacity='1';
wrap.classList.add('has-pill');
}catch(e){/* CSS hover fallback */}
}
function navItem(el){var a=el.closest?el.closest('a,button'):null;if(!a)return null;if(a.parentNode===wrap||a.classList.contains('navlink'))return a;return null}
wrap.addEventListener('mouseover',function(e){var a=navItem(e.target);if(a){hovered=a;move(a)}});
wrap.addEventListener('mouseleave',function(){hovered=null;move(current())});
wrap.addEventListener('focusin',function(e){var a=navItem(e.target);if(a)move(a)});
wrap.addEventListener('focusout',function(){move(hovered||current())});
addEventListener('resize',function(){move(hovered||current())});
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){move(hovered||current())});
move(current());
})();
var h=d.querySelector('.hdr');addEventListener('scroll',function(){h.classList.toggle('sc',scrollY>20)},{passive:true});
var categoryGrid=d.querySelector('#categories .grid');
if(categoryGrid){
var wallpaperCard=categoryGrid.querySelector('.card[href="wall-stickers/"]');
if(wallpaperCard){wallpaperCard.querySelector('h3').textContent='Wallpaper';wallpaperCard.querySelector('p').textContent='Patterns and colours to refresh your walls.';var wallpaperImage=wallpaperCard.querySelector('img');if(wallpaperImage)wallpaperImage.alt='Wallpaper design in a living room'}
}
d.querySelectorAll('.sec .wrap>*:not(.stage):not(.rv),.phead .ph>div:first-child').forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08});
d.querySelectorAll('.rv,.card,.post,.product-card').forEach(function(e){e.classList.add('rv');var siblings=e.parentNode.children,index=0;for(var i=0;i<siblings.length;i++){if(siblings[i]===e)break;if(siblings[i].classList.contains('rv'))index++}e.style.setProperty('--reveal-delay',Math.min(index,5)*80+'ms');io.observe(e)});
var productCounts={carpets:12,'home-furniture':36,lights:12,'artificial-plants':20,'wall-paintings':16,'relaxing-chair':10,'functional-sofa':10,'solid-wood-bed':3,'high-back-chair':11,'dining-table-chairs':12};
var productNames={'relaxing-chair':{1:'Wooden rocking chair with cream cushions and ottoman',2:'Wooden rocking chair with cream cushion and ottoman',3:'Wooden rocking chair with cream cushion',4:'Pebble lounge chair in black bouclé',5:'Black metal loop chair with cream bouclé cushion',6:'Pair of orange tub chairs',7:'White and wood rocking chair with ottoman',8:'Cream bouclé rocking chair with wooden frame',9:'Grey fabric swivel chair with wooden frame',10:'Wingback chair in light beige fabric'},'functional-sofa':{1:'Curved beige sectional sofa',2:'Beige L-shaped sectional sofa',3:'Dark green L-shaped sectional sofa with storage',4:'Brown leather sofa with wooden base',5:'Light grey fabric sofa with wooden base',6:'Grey fabric sofa with adjustable headrests',7:'Grey two-seater sofa with adjustable headrests',8:'Curved sectional sofa in light grey',9:'Dark green sectional sofa with chaise',10:'Grey sectional sofa with chaise and storage'},'solid-wood-bed':{1:'Light wood double bed with tall headboard',2:'Dark walnut storage bed',3:'Light wood double bed'},'high-back-chair':{1:'Pair of high back bar stools with white seats',2:'Grey fabric bar stool with wooden legs',3:'Walnut bar stool with cream bouclé seat',4:'Four high back bar stools',5:'Grey leather bar stool with dark wood legs',7:'Dark walnut high back bar stool',8:'Pair of cream bouclé bar stools',9:'Pair of dark walnut bar stools',10:'Cream fabric bar stool with walnut legs',11:'Cream leather bar stool with gold footrest'},'dining-table-chairs':{1:'Round white marble dining table with beige chairs',2:'Two-person white marble dining set',3:'Round white marble dining table with bolster-back chairs',4:'White marble dining table with six chairs',5:'Round white marble dining table with six chairs',6:'White marble dining table with beige chairs',7:'Wooden dining table with four chairs',8:'Oval dining table with four chairs',9:'Oval walnut dining table with four curved chairs',10:'Oval dining table with six black chairs',11:'Black dining table with four chairs',12:'Round black dining table with four chairs'}};
var photoTrigger=null;
d.addEventListener('click',function(e){
var trigger=e.target.closest('.product-photo');if(!trigger)return;
var source=trigger.querySelector('img');if(!source)return;
var dialog=d.getElementById('product-viewer');
if(!dialog){
dialog=d.createElement('dialog');dialog.id='product-viewer';dialog.className='product-viewer';dialog.setAttribute('aria-label','Product image');
var close=d.createElement('button'),image=d.createElement('img');
close.type='button';close.className='product-viewer-close';close.setAttribute('aria-label','Close image');close.textContent='×';
image.className='product-viewer-image';dialog.appendChild(close);dialog.appendChild(image);d.body.appendChild(dialog);
close.addEventListener('click',function(){dialog.close()});
dialog.addEventListener('click',function(event){if(event.target===dialog)dialog.close()});
dialog.addEventListener('close',function(){if(photoTrigger)photoTrigger.focus()})
}
photoTrigger=trigger;
var viewerImage=dialog.querySelector('.product-viewer-image');viewerImage.src=source.src;viewerImage.alt=source.alt;
dialog.showModal()
});
var categoryPage=d.querySelector('.phead');
var productSlug=decodeURIComponent(location.pathname).replace(/\/index\.html$/i,'').replace(/\/+$/,'').split('/').pop();
if(categoryPage&&productCounts[productSlug]){
var category=categoryPage.querySelector('h1').textContent.replace(/\s+in Singapore$/i,''),productParent=categoryPage.parentNode,productAnchor=categoryPage.nextSibling;
function addProductGallery(name,productSlug,id){
if(!productCounts[productSlug])return;
var section=d.createElement('section'),wrap=d.createElement('div'),grid=d.createElement('div'),inserted=false;
section.className='sec products';if(id)section.id=id;wrap.className='wrap';grid.className='grid product-grid';wrap.appendChild(grid);section.appendChild(wrap);
function loadProduct(index){
if(index>productCounts[productSlug])return;
var image=new Image();
image.onload=function(){
var card=d.createElement('article'),figure=d.createElement('figure'),button=d.createElement('button'),photo=d.createElement('img');
card.className='product-card rv';card.style.setProperty('--reveal-delay',Math.min(grid.children.length,5)*80+'ms');photo.src=image.src;photo.alt=(productNames[productSlug]&&productNames[productSlug][index])||(name+' product image '+index);photo.width=1200;photo.height=800;photo.loading='lazy';photo.decoding='async';
button.type='button';button.className='product-photo';button.setAttribute('aria-label','View larger image: '+photo.alt);button.appendChild(photo);figure.appendChild(button);card.appendChild(figure);grid.appendChild(card);
if(!inserted){productParent.insertBefore(section,productAnchor);inserted=true}
io.observe(card);loadProduct(index+1)
};
image.onerror=function(){image.onload=null;image.onerror=null;loadProduct(index+1)};
image.src='../images/'+productSlug+'-product-'+index+'.webp'
}
loadProduct(1)
}
addProductGallery(category,productSlug)
}
var f=d.getElementById('appt');if(f){f.addEventListener('submit',function(e){e.preventDefault();var g=function(i){return(f.elements[i].value||'').trim()};
var m='Hi WOW Lifestyle, I would like to make an appointment.\nName: '+g('name')+'\nPhone: '+g('phone')+'\nInterested in: '+g('cat')+'\nPreferred date: '+g('date')+'\nPreferred time: '+g('time')+(g('msg')?'\nMessage: '+g('msg'):'');
window.open('https://wa.me/6587887589?text='+encodeURIComponent(m),'_blank','noopener')})}

var cs=d.querySelector('.cat-slider');
if(cs){var ct=cs.querySelector('.cat-track'),pv=cs.querySelector('.cat-prev'),nx=cs.querySelector('.cat-next');
function step(){var c=ct.querySelector('.card');return c?c.getBoundingClientRect().width+(parseFloat(getComputedStyle(ct).gap)||0):320}
function upd(){var m=ct.scrollWidth-ct.clientWidth;pv.disabled=ct.scrollLeft<=4;nx.disabled=ct.scrollLeft>=m-4}
pv.addEventListener('click',function(){ct.scrollBy({left:-step(),behavior:'smooth'})});
nx.addEventListener('click',function(){ct.scrollBy({left:step(),behavior:'smooth'})});
ct.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});
addEventListener('resize',upd);upd()}
})();
