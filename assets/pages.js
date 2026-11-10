(function(){var d=document,b=d.querySelector('.burger'),n=d.getElementById('nav'),t=d.querySelector('[data-cat]'),p=d.getElementById('catpanel');
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
t.addEventListener('click',function(e){e.stopPropagation();var o=p.classList.toggle('open');t.setAttribute('aria-expanded',o)});
d.addEventListener('click',function(e){if(!p.contains(e.target)){p.classList.remove('open');t.setAttribute('aria-expanded','false')}});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){p.classList.remove('open');n.classList.remove('open')}});
function categoryLink(suffix){return [].slice.call(p.querySelectorAll('a')).filter(function(a){return a.getAttribute('href').slice(-suffix.length)===suffix})[0]}
function groupLinks(parent,children,label){
if(!parent||children.some(function(item){return !item[0]}))return;
var group=d.createElement('div');group.className='cat-group';group.setAttribute('role','group');
parent.textContent=label;group.appendChild(parent);
children.forEach(function(item){item[0].textContent=item[1];item[0].className='cat-subcategory';group.appendChild(item[0])});
p.insertBefore(group,p.firstChild)
}
groupLinks(categoryLink('home-appliances/'),[[categoryLink('aircon/'),'Aircon'],[categoryLink('air-purifier/'),'Air Purifier']],'Home Appliances');
var speakerLink=categoryLink('speakers/');
if(speakerLink){
var theaterLink=speakerLink.cloneNode(),karaokeLink=speakerLink.cloneNode();
theaterLink.href=speakerLink.getAttribute('href')+'#home-theater';karaokeLink.href=speakerLink.getAttribute('href')+'#karaoke';
groupLinks(speakerLink,[[theaterLink,'Home Theater Sound System'],[karaokeLink,'Karaoke Sound System']],'Sound Systems')
}
var wallLink=categoryLink('wall-stickers/');if(wallLink)wallLink.textContent='Wallpaper';
var h=d.querySelector('.hdr');addEventListener('scroll',function(){h.classList.toggle('sc',scrollY>20)},{passive:true});
var categoryGrid=d.querySelector('#categories .grid');
if(categoryGrid){
var applianceCard=categoryGrid.querySelector('.card[href="home-appliances/"]'),airconCard=categoryGrid.querySelector('.card[href="aircon/"]'),purifierCard=categoryGrid.querySelector('.card[href="air-purifier/"]');
if(applianceCard&&airconCard&&purifierCard){
var tile=d.createElement('article'),imageLink=d.createElement('a'),title=d.createElement('h3'),titleLink=d.createElement('a'),description=d.createElement('p'),links=d.createElement('div');
tile.className='card';description.textContent='Fridges, washing machines, aircon and air purifiers.';
imageLink.href='home-appliances/';imageLink.setAttribute('aria-label','View Home Appliances');imageLink.appendChild(applianceCard.querySelector('figure'));
titleLink.href='home-appliances/';titleLink.textContent='Home Appliances';title.appendChild(titleLink);
links.className='category-sub-links';
[['Fridges & Washing Machines','home-appliances/'],['Aircon','aircon/'],['Air Purifier','air-purifier/']].forEach(function(item){var link=d.createElement('a');link.href=item[1];link.textContent=item[0];links.appendChild(link)});
tile.appendChild(imageLink);tile.appendChild(title);tile.appendChild(description);tile.appendChild(links);
categoryGrid.replaceChild(tile,applianceCard);airconCard.parentNode.removeChild(airconCard);purifierCard.parentNode.removeChild(purifierCard)
}
var speakerCard=categoryGrid.querySelector('.card[href="speakers/"]');
if(speakerCard){
var karaokeCard=speakerCard.cloneNode(true),theaterTitle=speakerCard.querySelector('h3'),karaokeTitle=karaokeCard.querySelector('h3'),theaterImage=speakerCard.querySelector('img'),karaokeImage=karaokeCard.querySelector('img');
speakerCard.href='speakers/#home-theater';theaterTitle.textContent='Home Theater Sound System';speakerCard.querySelector('p').textContent='Immersive sound for your home entertainment.';
karaokeCard.href='speakers/#karaoke';karaokeTitle.textContent='Karaoke Sound System';karaokeCard.querySelector('p').textContent='Sound systems for singing and entertaining.';
if(theaterImage)theaterImage.alt='Home theater sound system';if(karaokeImage){karaokeImage.src='images/speakers-2.webp';karaokeImage.alt='Karaoke sound system'}
categoryGrid.insertBefore(karaokeCard,speakerCard.nextSibling)
}
var wallpaperCard=categoryGrid.querySelector('.card[href="wall-stickers/"]');
if(wallpaperCard){wallpaperCard.querySelector('h3').textContent='Wallpaper';wallpaperCard.querySelector('p').textContent='Patterns and colours to refresh your walls.';var wallpaperImage=wallpaperCard.querySelector('img');if(wallpaperImage)wallpaperImage.alt='Wallpaper design in a living room'}
}
d.querySelectorAll('.sec .wrap>*:not(.stage):not(.rv),.phead .ph>div:first-child').forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08});
d.querySelectorAll('.rv,.card,.post,.product-card').forEach(function(e){e.classList.add('rv');var siblings=e.parentNode.children,index=0;for(var i=0;i<siblings.length;i++){if(siblings[i]===e)break;if(siblings[i].classList.contains('rv'))index++}e.style.setProperty('--reveal-delay',Math.min(index,5)*80+'ms');io.observe(e)});
var productCounts={carpets:12,'home-furniture':2,lights:12,'artificial-plants':20};
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
card.className='product-card rv';card.style.setProperty('--reveal-delay',Math.min(grid.children.length,5)*80+'ms');photo.src=image.src;photo.alt=name+' product image '+index;photo.width=1200;photo.height=800;photo.loading='lazy';photo.decoding='async';
button.type='button';button.className='product-photo';button.setAttribute('aria-label','View larger image: '+photo.alt);button.appendChild(photo);figure.appendChild(button);card.appendChild(figure);grid.appendChild(card);
if(!inserted){productParent.insertBefore(section,productAnchor);inserted=true}
io.observe(card);loadProduct(index+1)
};
image.onerror=function(){image.onload=null;image.onerror=null};
image.src='../images/'+productSlug+'-product-'+index+'.webp'
}
loadProduct(1)
}
addProductGallery(category,productSlug)
}
var f=d.getElementById('appt');if(f){f.addEventListener('submit',function(e){e.preventDefault();var g=function(i){return(f.elements[i].value||'').trim()};
var m='Hi WOW Lifestyle, I would like to make an appointment.\nName: '+g('name')+'\nPhone: '+g('phone')+'\nInterested in: '+g('cat')+'\nPreferred date: '+g('date')+'\nPreferred time: '+g('time')+(g('msg')?'\nMessage: '+g('msg'):'');
window.open('https://wa.me/6587887589?text='+encodeURIComponent(m),'_blank','noopener')})}})();