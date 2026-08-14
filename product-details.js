// Product details modal + admin navigation safety
(function(){
  const ADMIN_EMAIL='faishonnepal@gmail.com';
  const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  const money=n=>'Rs. '+Number(n||0).toLocaleString('en-IN');
  window.openProductDetails=function(index){
    const p=window.products?.[index] || window.demoProducts?.[index]; if(!p)return;
    const specs=p.specs||{Category:p.cat||'Product',Seller:p.seller||'Verified Seller',Price:money(p.price),Stock:'Available'};
    const features=p.features||[p.description||'Quality checked product','Seller information available','Nepal-wide delivery'];
    const box=document.getElementById('productDetails'); if(!box)return;
    box.innerHTML=`<div class="detail-grid"><div class="detail-image"><img src="${esc(p.image||'')}" alt="${esc(p.name)}"><span>${esc(p.emoji||'🛍️')}</span></div><div class="detail-info"><div class="product-cat">${esc(p.cat||'Product')}</div><h2>${esc(p.name)}</h2><div class="detail-seller">Sold by <strong>${esc(p.seller||'FaishonNepal Seller')}</strong> · ⭐ ${esc(p.rating||'—')}</div><div class="detail-price">${money(p.price)} ${p.old?`<del>${money(p.old)}</del>`:''}</div><div class="detail-section"><h3>Key Features</h3><ul>${features.map(x=>`<li>✓ ${esc(x)}</li>`).join('')}</ul></div><div class="detail-section"><h3>Specifications</h3><div class="spec-table">${Object.entries(specs).map(([k,v])=>`<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</div></div><div class="detail-actions"><button class="btn primary" id="detailAdd">Add to cart</button><button class="btn secondary" onclick="closeProductDetails()">Close</button></div></div></div>`;
    document.getElementById('detailAdd').onclick=()=>{window.addCart?.(p);window.closeProductDetails();};
    const m=document.getElementById('productModal');m?.classList.add('show');m?.setAttribute('aria-hidden','false');
  };
  window.closeProductDetails=function(){const m=document.getElementById('productModal');m?.classList.remove('show');m?.setAttribute('aria-hidden','true');};
  document.addEventListener('click',e=>{
    const card=e.target.closest('.product'); if(card && !e.target.closest('button')){
      const name=card.querySelector('h3')?.textContent; const p=(window.products||[]).find(x=>x.name===name); if(p)window.openProductDetails(window.products.indexOf(p));
    }
    if(e.target.id==='productModal')window.closeProductDetails();
  });
  async function adminOnly(){
    try{const client=window.faishonSupabase||window.supabaseClient;if(!client?.auth)return;const {data}=await client.auth.getSession();const email=(data?.session?.user?.email||'').toLowerCase();const tab=document.getElementById('adminTab');if(tab)tab.style.display=email===ADMIN_EMAIL?'inline-flex':'none';}
    catch(e){console.warn('Admin tab check failed',e);}
  }
  document.addEventListener('DOMContentLoaded',adminOnly);
  window.addEventListener('load',adminOnly);
  if(window.faishonSupabase?.auth)window.faishonSupabase.auth.onAuthStateChange(()=>setTimeout(adminOnly,0));
})();
