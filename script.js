const products=[
  {name:'Premium Kurti',seller:'Himalayan Fashion',price:'Rs. 1,299',old:'Rs. 1,799',off:'28% OFF',rating:'4.8',reviews:124,cat:'Fashion',emoji:'👗',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80'},
  {name:'Classic Sneakers',seller:'Style Nepal',price:'Rs. 2,499',old:'Rs. 3,200',off:'22% OFF',rating:'4.7',reviews:86,cat:'Fashion',emoji:'👟',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'},
  {name:'Handcrafted Necklace',seller:'Lumbini Lifestyle',price:'Rs. 899',old:'Rs. 1,200',off:'25% OFF',rating:'4.9',reviews:73,cat:'Accessories',emoji:'💍',image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'},
  {name:'Everyday Tote Bag',seller:'Style Nepal',price:'Rs. 1,150',old:'Rs. 1,500',off:'23% OFF',rating:'4.7',reviews:61,cat:'Accessories',emoji:'👜',image:'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80'},
  {name:'Silk Saree',seller:'Himalayan Fashion',price:'Rs. 3,499',old:'Rs. 4,500',off:'22% OFF',rating:'4.8',reviews:48,cat:'Fashion',emoji:'🥻',image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'},
  {name:'Classic Watch',seller:'Lumbini Lifestyle',price:'Rs. 1,799',old:'Rs. 2,400',off:'25% OFF',rating:'4.8',reviews:92,cat:'Accessories',emoji:'⌚',image:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'},
  {name:'Beauty Essentials',seller:'Nepal Beauty Hub',price:'Rs. 799',old:'Rs. 999',off:'20% OFF',rating:'4.7',reviews:137,cat:'Beauty',emoji:'💄',image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80'},
  {name:'Traditional Topi',seller:'Local Craft Nepal',price:'Rs. 650',old:'Rs. 850',off:'24% OFF',rating:'4.9',reviews:54,cat:'Traditional',emoji:'🧢',image:'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=80'}
];
let cart=0;
const grid=document.getElementById('productGrid');
function renderProducts(list=products){
  grid.innerHTML=list.map((p,i)=>`<article class="product">
    <span class="badge">${p.off}</span>
    <button class="heart" aria-label="Wishlist" onclick="showToast('${p.name} added to wishlist')">♡</button>
    <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback');this.parentElement.insertAdjacentText('beforeend','${p.emoji}')"></div>
    <div class="product-body"><div class="product-cat">${p.cat}</div><h3>${p.name}</h3><div class="seller-name">${p.seller}</div><div class="rating">⭐ ${p.rating} <span class="seller-name">(${p.reviews})</span></div><div class="price">${p.price} <span class="old">${p.old}</span></div><div class="product-actions"><button class="add" onclick="addCart('${p.name}')">Add to cart</button><button class="contact" onclick="contactSeller('${p.seller}')">Contact seller</button></div></div>
  </article>`).join('');
}
renderProducts();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const value=btn.textContent.trim();renderProducts(value==='All'?products:products.filter(p=>p.cat===value));
}));
function addCart(name){cart++;document.getElementById('cartCount').textContent=cart;showToast(name+' added to cart');}
function contactSeller(name){showToast('Seller chat for '+name+' will open after login');setTimeout(()=>{window.location.href='login.html';},900);}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
function focusSearch(){showToast('Search is ready — product search backend comes next');}
function openCart(){showToast(cart?`Your cart has ${cart} item${cart>1?'s':''}`:'Your cart is empty');}