// Add the verified business WhatsApp number in international format, digits only.
const BUSINESS_WHATSAPP_NUMBER = ""; // Example: 919876543210 (India +91 followed by 10-digit mobile)

const defaultProducts = [
  {id:1,name:"Wheat Flour (Atta)",price:35,unit:"1 kg",symbol:"🌾"},
  {id:2,name:"Rice",price:55,unit:"1 kg",symbol:"🍚"},
  {id:3,name:"Toor Dal",price:120,unit:"1 kg",symbol:"🫘"},
  {id:4,name:"Sugar",price:45,unit:"1 kg",symbol:""},
  {id:5,name:"Cooking Oil",price:145,unit:"1 litre",symbol:"🫗"},
  {id:6,name:"Salt",price:20,unit:"1 kg",symbol:"🧂"},
  {id:7,name:"Tea",price:120,unit:"250 g",symbol:"🍵"},
  {id:8,name:"Bath Soap",price:35,unit:"1 piece",symbol:"🧼"},
  {id:9,name:"Washing Powder",price:65,unit:"1 kg",symbol:"🫧"},
  {id:10,name:"Biscuits",price:10,unit:"1 pack",symbol:"🍪"},
  {id:11,name:"Spices",price:40,unit:"100 g",symbol:"🌶️"},
  {id:12,name:"Milk",price:30,unit:"500 ml",symbol:"🥛"}
];
const gateDesigns = [
  ["Contemporary Lines","modern","photo-1600566753086-00f18fb6b3ea"],["Double Leaf Classic","classic","photo-1600607687939-ce8a6c25118c"],["Minimal Square Grid","simple","photo-1600585154340-be6161a56a0c"],["Decorative Floral","premium","photo-1600607687920-4e2a09cf159d"],
  ["Horizontal Slat Gate","modern","photo-1600566753190-17f0baa2a6c3"],["Traditional Motif","classic","photo-1600607687644-c7171b42498f"],["Simple Vertical Bar","simple","photo-1600566752355-35792bedcfea"],["Geometric Premium","premium","photo-1600607687920-4e2a09cf159d"],
  ["Modern Privacy Gate","modern","photo-1600566753086-00f18fb6b3ea"],["Heritage Panel Gate","classic","photo-1600607687939-ce8a6c25118c"],["Straight Bar Entry","simple","photo-1600585154340-be6161a56a0c"],["Ornamental Arch","premium","photo-1600607687644-c7171b42498f"],
  ["Asymmetric Modern","modern","photo-1600566753190-17f0baa2a6c3"],["Classic Border Panel","classic","photo-1600607687920-4e2a09cf159d"],["Compact Single Gate","simple","photo-1600566752355-35792bedcfea"],["Decorative Scrollwork","premium","photo-1600607687939-ce8a6c25118c"],
  ["Wood Finish Look","modern","photo-1600585154340-be6161a56a0c"],["Traditional Ironwork","classic","photo-1600607687644-c7171b42498f"],["Utility Side Gate","simple","photo-1600566753086-00f18fb6b3ea"],["Premium Laser Pattern","premium","photo-1600607687920-4e2a09cf159d"],
  ["Wide Driveway Gate","modern","photo-1600566753190-17f0baa2a6c3"],["Classic Double Gate","classic","photo-1600607687939-ce8a6c25118c"],["Garden Entry Gate","simple","photo-1600566752355-35792bedcfea"],["Statement Entrance","premium","photo-1600607687644-c7171b42498f"]
];
const doorPhotos=[["Modern steel door","photo-1600607687939-ce8a6c25118c"],["Classic panel door","photo-1600566753086-00f18fb6b3ea"],["Decorative entry","photo-1600607687644-c7171b42498f"],["Minimal metal finish","photo-1600585154340-be6161a56a0c"]];
const windowPhotos=[["Simple safety grill","photo-1600566753190-17f0baa2a6c3"],["Geometric window pattern","photo-1600607687920-4e2a09cf159d"],["Classic window grill","photo-1600566752355-35792bedcfea"],["Decorative grill style","photo-1600607687939-ce8a6c25118c"]];
const img=(id,w=700)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
let products=loadProducts();

function loadProducts(){try{return JSON.parse(localStorage.getItem("munnaProducts"))||defaultProducts.map(p=>({...p}));}catch{return defaultProducts.map(p=>({...p}));}}
function saveProducts(){localStorage.setItem("munnaProducts",JSON.stringify(products));renderProducts();renderAdminProducts();}
function renderGates(filter="all"){
 const grid=document.getElementById("gateGrid");
 grid.innerHTML=gateDesigns.filter(d=>filter==="all"||d[1]===filter).map((d,i)=>`<article class="design-card"><img loading="lazy" src="${img(d[2],600)}" alt="${d[0]} reference"><div class="design-info"><b>${String(gateDesigns.indexOf(d)+1).padStart(2,"0")} · ${d[0]}</b><span>${d[1][0].toUpperCase()+d[1].slice(1)} style · Reference image</span><button type="button" data-enquire="${d[0]}">ENQUIRE ABOUT THIS ↗</button></div></article>`).join("");
}
function renderPhotoGrid(id,items){document.getElementById(id).innerHTML=items.map(([name,photo])=>`<div class="photo-card"><img loading="lazy" src="${img(photo,700)}" alt="${name} reference"><span>${name}</span></div>`).join("");}
function renderProducts(query=""){
 const filtered=products.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()));
 document.getElementById("productCount").textContent=`${filtered.length} items`;
 document.getElementById("productGrid").innerHTML=filtered.length?filtered.map(p=>`<article class="product-card"><div class="product-symbol">${p.symbol||"🛍️"}</div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.unit)}</p><strong>₹${Number(p.price).toFixed(2)}</strong><button type="button" data-enquire="${escapeHTML(p.name)}">Enquire</button></article>`).join(""):`<div class="empty-state">No products found.</div>`;
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
document.getElementById("gateFilters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderGates(b.dataset.filter);});
document.addEventListener("click",e=>{const b=e.target.closest("[data-enquire]");if(!b)return;document.querySelector("#enquiryForm select").value=b.dataset.enquire.toLowerCase().includes("gate")?"Iron gate design":"Other enquiry";document.querySelector("#enquiryForm textarea").value=`I am interested in: ${b.dataset.enquire}. Please share details and price.`;document.getElementById("contact").scrollIntoView({behavior:"smooth"});});
document.getElementById("productSearch").addEventListener("input",e=>renderProducts(e.target.value));
document.getElementById("year").textContent=new Date().getFullYear();

const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const toTop=document.getElementById("toTop");window.addEventListener("scroll",()=>toTop.classList.toggle("show",window.scrollY>450));toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

document.getElementById("enquiryForm").addEventListener("submit",e=>{
 e.preventDefault();const data=new FormData(e.currentTarget);
 const message=`Hello Munna Kirana Store & Building Works,%0AName: ${encodeURIComponent(data.get("name"))}%0APhone: ${encodeURIComponent(data.get("phone"))}%0ARequirement: ${encodeURIComponent(data.get("interest"))}%0AMessage: ${encodeURIComponent(data.get("message")||"Please contact me.")}`;
 if(/^[0-9]{10,15}$/.test(BUSINESS_WHATSAPP_NUMBER)){window.open(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${message}`,"_blank","noopener");}
 else{document.getElementById("formHint").textContent="WhatsApp is not active yet. Add your verified business WhatsApp number (country code + number, digits only) in js/script.js. Your enquiry has not been sent.";alert("Please call the store directly. WhatsApp is awaiting a verified business number.");}
});

// Demo admin: client-side password is only a convenience gate, not secure authentication.
const modal=document.getElementById("adminModal"),login=document.getElementById("adminLogin"),editor=document.getElementById("adminEditor");
document.getElementById("adminOpen").addEventListener("click",()=>{modal.classList.add("open");modal.setAttribute("aria-hidden","false");});
function closeAdmin(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");}
document.getElementById("adminClose").addEventListener("click",closeAdmin);
modal.addEventListener("click",e=>{if(e.target===modal)closeAdmin();});
document.getElementById("loginBtn").addEventListener("click",()=>{if(document.getElementById("adminPassword").value==="munna123"){login.hidden=true;editor.hidden=false;renderAdminProducts();}else alert("Incorrect demo password.");});
function renderAdminProducts(){
 const list=document.getElementById("adminProductList");
 list.innerHTML=products.map(p=>`<div class="admin-product-row" data-id="${p.id}"><input class="edit-name" aria-label="Product name" value="${escapeHTML(p.name)}"><input class="edit-price" aria-label="Product price" type="number" min="0" step=".01" value="${Number(p.price)}"><input class="edit-unit" aria-label="Product unit" value="${escapeHTML(p.unit)}"><button type="button" class="delete-product">Delete</button></div>`).join("")||'<p>No products. Add one below.</p>';
 list.querySelectorAll(".admin-product-row").forEach(row=>{row.querySelectorAll("input").forEach(input=>input.addEventListener("change",()=>{const p=products.find(x=>x.id===Number(row.dataset.id));p.name=row.querySelector(".edit-name").value.trim();p.price=Math.max(0,Number(row.querySelector(".edit-price").value)||0);p.unit=row.querySelector(".edit-unit").value.trim();saveProducts();}));row.querySelector(".delete-product").addEventListener("click",()=>{products=products.filter(x=>x.id!==Number(row.dataset.id));saveProducts();});});
}
document.getElementById("addProductForm").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);products.push({id:Date.now(),name:f.get("name").trim(),price:Number(f.get("price")),unit:f.get("unit").trim(),symbol:"🛍️"});saveProducts();e.currentTarget.reset();});
document.getElementById("resetBtn").addEventListener("click",()=>{if(confirm("Reset grocery products to sample data?")){products=defaultProducts.map(p=>({...p}));saveProducts();}});
document.getElementById("exportBtn").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(products,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="munna-grocery-products.json";a.click();URL.revokeObjectURL(url);});
document.getElementById("logoutBtn").addEventListener("click",()=>{editor.hidden=true;login.hidden=false;document.getElementById("adminPassword").value="";});
renderGates();renderPhotoGrid("doorGrid",doorPhotos);renderPhotoGrid("windowGrid",windowPhotos);renderProducts();
