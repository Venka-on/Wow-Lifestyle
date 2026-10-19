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
tile.className='card';title.textContent='Home Appliances';description.textContent='Fridges, washing machines, aircon and air purifiers.';
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
[].slice.call(d.querySelectorAll('.mi>div')).forEach(function(track){var names=['Home Furniture','Carpets','Curtains','Lights','Home Appliances','Artificial Plants','Wall Paintings','Wallpaper','Home Theater Sound System','Karaoke Sound System'];track.textContent='';names.forEach(function(name){var item=d.createElement('span');item.textContent=name;track.appendChild(item)})});
d.querySelectorAll('.sec .wrap>*:not(.stage):not(.rv),.phead .ph>div:first-child').forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08});
d.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
var categoryPage=d.querySelector('.phead'),categoryImage=d.querySelector('.pics img'),faq=d.querySelector('.faq');
var categoryMatch=categoryImage&&categoryImage.getAttribute('src').match(/\/images\/([^/]+)-1\.webp$/);
if(categoryPage&&categoryMatch&&faq){
var slug=categoryMatch[1],pageHeading=categoryPage.querySelector('h1'),pageIntro=categoryPage.querySelector('.ph>div>p:not(.crumbs)'),aboutHeading=d.querySelector('.wrap.two h2'),aboutIntro=d.querySelector('.wrap.two>div>p'),faqQuestion=faq.querySelector('summary'),faqAnswer=faq.querySelector('summary+p');
function setMeta(selector,value){var meta=d.querySelector(selector);if(meta)meta.setAttribute('content',value)}
function replaceStructuredText(from,to){[].slice.call(d.querySelectorAll('script[type="application/ld+json"]')).forEach(function(script){script.textContent=script.textContent.split(from).join(to)})}
if(slug==='home-appliances'){
var applianceDescription='Fridges, washing machines, aircon and air purifiers at our Ubi showroom.';
if(pageIntro)pageIntro.textContent=applianceDescription;if(aboutIntro)aboutIntro.textContent='Explore fridges and washing machines, plus aircon and air purifiers through our home appliance range. Visit our Ubi showroom to compare options and ask our team about availability.';
if(faqAnswer)faqAnswer.textContent='Fridges, washing machines, aircon and air purifiers. Range and availability vary.';
if(aboutIntro){var applianceLinks=d.createElement('div');applianceLinks.className='category-sub-links';[['Fridges & Washing Machines','./'],['Aircon','../aircon/'],['Air Purifier','../air-purifier/']].forEach(function(item){var link=d.createElement('a');link.href=item[1];link.textContent=item[0];applianceLinks.appendChild(link)});aboutIntro.parentNode.insertBefore(applianceLinks,aboutIntro.nextSibling)}
setMeta('meta[name="description"]',applianceDescription);setMeta('meta[property="og:description"]',applianceDescription)
}
if(slug==='wall-stickers'){
var wallDescription='Explore wallpaper designs at our Ubi showroom in Singapore.';
if(pageHeading)pageHeading.textContent='Wallpaper at our Ubi showroom';if(pageIntro)pageIntro.textContent='Wallpaper designs to refresh your walls.';
if(aboutHeading)aboutHeading.textContent='About our wallpaper range';if(aboutIntro)aboutIntro.textContent='Explore wallpaper designs for your home. Visit our showroom to compare patterns and talk to our team about styles for your walls.';
if(faqQuestion)faqQuestion.textContent='What wallpaper designs can I see?';if(faqAnswer)faqAnswer.textContent='A range of wallpaper designs for living rooms and bedrooms. Range and availability vary.';
var wallTips=d.querySelectorAll('.ticks li');if(wallTips[1])wallTips[1].textContent='Measure your wall carefully before choosing how many rolls you need.';
var crumbs=categoryPage.querySelector('.crumbs');if(crumbs&&crumbs.lastChild)crumbs.lastChild.nodeValue=' / Wallpaper';
[].slice.call(d.querySelectorAll('.pics img')).forEach(function(image){image.alt=image.alt.replace(/Wall Stickers/g,'Wallpaper')});
d.title=d.title.replace(/Wall Stickers/g,'Wallpaper');setMeta('meta[property="og:title"]',d.title);setMeta('meta[name="description"]',wallDescription);setMeta('meta[property="og:description"]',wallDescription);replaceStructuredText('Wall Stickers','Wallpaper');replaceStructuredText('wall stickers','wallpaper')
}
if(slug==='speakers'){
var soundDescription='Home theater and karaoke sound systems at our Ubi showroom.';
if(pageHeading)pageHeading.textContent='Sound Systems at our Ubi showroom';if(pageIntro)pageIntro.textContent='Home theater and karaoke sound systems.';
if(aboutHeading)aboutHeading.textContent='About our sound systems range';if(aboutIntro)aboutIntro.textContent='Explore home theater and karaoke sound systems for your home. Visit our Ubi showroom to see the range and ask our team about available options.';
if(faqQuestion)faqQuestion.textContent='Which sound systems can I see?';if(faqAnswer)faqAnswer.textContent='Home theater and karaoke sound systems. Range and availability vary.';
var crumbs=categoryPage.querySelector('.crumbs');if(crumbs&&crumbs.lastChild)crumbs.lastChild.nodeValue=' / Sound Systems';
[].slice.call(d.querySelectorAll('.pics img')).forEach(function(image){image.alt=image.alt.replace(/Speakers/g,'Sound Systems')});
d.title='Home Theater & Karaoke Sound Systems in Singapore | WOW Lifestyle, Ubi Showroom';setMeta('meta[property="og:title"]',d.title);setMeta('meta[name="description"]',soundDescription);setMeta('meta[property="og:description"]',soundDescription);replaceStructuredText('Speakers','Sound Systems');replaceStructuredText('speakers','sound systems')
}
var category=pageHeading.textContent.replace(/\s+at our Ubi showroom$/i,''),productParent=faq.closest('.sec').parentNode,productAnchor=faq.closest('.sec');
function addProductGallery(name,productSlug,id){
var section=d.createElement('section'),wrap=d.createElement('div'),head=d.createElement('div'),title=d.createElement('h2'),intro=d.createElement('p'),grid=d.createElement('div'),empty=d.createElement('p'),emptyLink=d.createElement('a');
section.className='sec alt products';if(id)section.id=id;wrap.className='wrap';head.className='head';grid.className='grid product-grid';
title.textContent='Products in '+name;intro.textContent='Ask us for prices and availability.';empty.className='product-empty';empty.textContent='Product photos will appear here as they are added. ';
emptyLink.className='more';emptyLink.href='https://wa.me/6587887589?text='+encodeURIComponent('Hi WOW Lifestyle, I would like to ask about prices and availability for '+name+'.');emptyLink.target='_blank';emptyLink.rel='noopener noreferrer';emptyLink.textContent='Contact us for price';empty.appendChild(emptyLink);
head.appendChild(title);head.appendChild(intro);grid.appendChild(empty);wrap.appendChild(head);wrap.appendChild(grid);section.appendChild(wrap);productParent.insertBefore(section,productAnchor);
function loadProduct(index){
var image=new Image();
image.onload=function(){
var card=d.createElement('article'),figure=d.createElement('figure'),photo=d.createElement('img'),productTitle=d.createElement('h3'),price=d.createElement('p'),link=d.createElement('a');
if(index===1&&empty.parentNode)empty.parentNode.removeChild(empty);
card.className='product-card';photo.src=image.src;photo.alt=name+' product '+index;photo.loading='lazy';photo.decoding='async';
productTitle.textContent='Product '+index;price.textContent='Contact us for price';
link.className='more';link.href='https://wa.me/6587887589?text='+encodeURIComponent('Hi WOW Lifestyle, I would like to know the price of '+name+' product '+index+'.');link.target='_blank';link.rel='noopener noreferrer';link.textContent='Ask on WhatsApp';
figure.appendChild(photo);card.appendChild(figure);card.appendChild(productTitle);card.appendChild(price);card.appendChild(link);grid.appendChild(card);loadProduct(index+1)
};
image.onerror=function(){image.onload=null;image.onerror=null};
image.src='../images/'+productSlug+'-product-'+index+'.webp'
}
loadProduct(1)
}
if(slug==='speakers'){
addProductGallery('Home Theater Sound System','home-theater-sound-system','home-theater');
addProductGallery('Karaoke Sound System','karaoke-sound-system','karaoke')
}else{
addProductGallery(category,slug)
}
}
var f=d.getElementById('appt');if(f){f.addEventListener('submit',function(e){e.preventDefault();var g=function(i){return(f.elements[i].value||'').trim()};
var m='Hi WOW Lifestyle, I would like to make an appointment.\nName: '+g('name')+'\nPhone: '+g('phone')+'\nInterested in: '+g('cat')+'\nPreferred date: '+g('date')+'\nPreferred time: '+g('time')+(g('msg')?'\nMessage: '+g('msg'):'');
window.open('https://wa.me/6587887589?text='+encodeURIComponent(m),'_blank','noopener')})}})();