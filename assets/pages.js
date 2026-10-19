(function(){var d=document,b=d.querySelector('.burger'),n=d.getElementById('nav'),t=d.querySelector('[data-cat]'),p=d.getElementById('catpanel');
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
t.addEventListener('click',function(e){e.stopPropagation();var o=p.classList.toggle('open');t.setAttribute('aria-expanded',o)});
d.addEventListener('click',function(e){if(!p.contains(e.target)){p.classList.remove('open');t.setAttribute('aria-expanded','false')}});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){p.classList.remove('open');n.classList.remove('open')}});
var h=d.querySelector('.hdr');addEventListener('scroll',function(){h.classList.toggle('sc',scrollY>20)},{passive:true});
d.querySelectorAll('.sec .wrap>*:not(.stage):not(.rv),.phead .ph>div:first-child').forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08});
d.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
var categoryPage=d.querySelector('.phead'),categoryImage=d.querySelector('.pics img'),faq=d.querySelector('.faq');
var categoryMatch=categoryImage&&categoryImage.getAttribute('src').match(/\/images\/([^/]+)-1\.webp$/);
if(categoryPage&&categoryMatch&&faq){
var category=categoryPage.querySelector('h1').textContent.replace(/\s+at our Ubi showroom$/i,'');
var slug=categoryMatch[1],section=d.createElement('section'),wrap=d.createElement('div'),head=d.createElement('div'),title=d.createElement('h2'),intro=d.createElement('p'),grid=d.createElement('div'),empty=d.createElement('p'),emptyLink=d.createElement('a');
section.className='sec alt products';wrap.className='wrap';head.className='head';grid.className='grid product-grid';
title.textContent='Products in '+category;intro.textContent='Ask us for prices and availability.';empty.className='product-empty';empty.textContent='Product photos will appear here as they are added. ';
emptyLink.className='more';emptyLink.href='https://wa.me/6587887589?text='+encodeURIComponent('Hi WOW Lifestyle, I would like to ask about prices and availability for '+category+'.');emptyLink.target='_blank';emptyLink.rel='noopener noreferrer';emptyLink.textContent='Contact us for price';empty.appendChild(emptyLink);
head.appendChild(title);head.appendChild(intro);grid.appendChild(empty);wrap.appendChild(head);wrap.appendChild(grid);section.appendChild(wrap);faq.closest('.sec').parentNode.insertBefore(section,faq.closest('.sec'));
function loadProduct(index){
var image=new Image();
image.onload=function(){
var card=d.createElement('article'),figure=d.createElement('figure'),photo=d.createElement('img'),name=d.createElement('h3'),price=d.createElement('p'),link=d.createElement('a');
if(index===1&&empty.parentNode)empty.parentNode.removeChild(empty);
card.className='product-card';photo.src=image.src;photo.alt=category+' product '+index;photo.loading='lazy';photo.decoding='async';
name.textContent='Product '+index;price.textContent='Contact us for price';
link.className='more';link.href='https://wa.me/6587887589?text='+encodeURIComponent('Hi WOW Lifestyle, I would like to know the price of '+category+' product '+index+'.');link.target='_blank';link.rel='noopener noreferrer';link.textContent='Ask on WhatsApp';
figure.appendChild(photo);card.appendChild(figure);card.appendChild(name);card.appendChild(price);card.appendChild(link);grid.appendChild(card);loadProduct(index+1)
};
image.onerror=function(){image.onload=null;image.onerror=null};
image.src='../images/'+slug+'-product-'+index+'.webp'
}
loadProduct(1)
}
var f=d.getElementById('appt');if(f){f.addEventListener('submit',function(e){e.preventDefault();var g=function(i){return(f.elements[i].value||'').trim()};
var m='Hi WOW Lifestyle, I would like to make an appointment.\nName: '+g('name')+'\nPhone: '+g('phone')+'\nInterested in: '+g('cat')+'\nPreferred date: '+g('date')+'\nPreferred time: '+g('time')+(g('msg')?'\nMessage: '+g('msg'):'');
window.open('https://wa.me/6587887589?text='+encodeURIComponent(m),'_blank','noopener')})}})();