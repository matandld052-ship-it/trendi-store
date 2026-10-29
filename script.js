// אב-טיפוס בלבד: אין חיבור לסליקה ואין יצירת הזמנה אמיתית.
const products = [
  {id:1,name:"מעמד שולחני לטלפון",desc:"לשיחות וידאו, צפייה ועבודה נוחה.",price:49,emoji:"📱",bg:"#e9f0df",tag:"לשולחן"},
  {id:2,name:"ארגונית קומפקטית",desc:"עוזרת לשמור על חפצים קטנים במקום.",price:59,emoji:"🧺",bg:"#f4e4d5",tag:"סדר וארגון"},
  {id:3,name:"מסיר שיער רב־פעמי",desc:"פתרון פשוט לניקוי ספות ובדים.",price:39,emoji:"🧹",bg:"#e1eaf3",tag:"לבית"}
];
const cart = [];
const money = n => new Intl.NumberFormat("he-IL",{style:"currency",currency:"ILS",maximumFractionDigits:0}).format(n);
const grid = document.querySelector("#product-grid");
grid.innerHTML = products.map(p => `
  <article class="product-card">
    <div class="product-visual" style="background:${p.bg}">
      <span class="tag">${p.tag}</span><span class="emoji" aria-hidden="true">${p.emoji}</span>
    </div>
    <div class="product-info">
      <h3>${p.name}</h3><p>${p.desc}</p>
      <div class="product-bottom"><span class="product-price">${money(p.price)}</span>
      <button class="add-button" data-add="${p.id}" type="button">הוספה לעגלה (הדגמה)</button></div>
    </div>
  </article>`).join("");

const panel = document.querySelector("#cart-panel");
function renderCart(){
  document.querySelector("#cart-count").textContent = cart.reduce((n,x)=>n+x.qty,0);
  document.querySelector("#cart-items").innerHTML = cart.length ? cart.map(x=>`
    <div class="cart-row"><span>${x.name} × ${x.qty}</span><span>${money(x.price*x.qty)} <button type="button" data-remove="${x.id}" aria-label="הסרת ${x.name}">הסר</button></span></div>`).join("") : "<p>העגלה ריקה כרגע.</p>";
  document.querySelector("#cart-total").textContent = money(cart.reduce((n,x)=>n+x.price*x.qty,0));
}
grid.addEventListener("click",e=>{
  const button=e.target.closest("[data-add]");
  if(!button) return;
  const p=products.find(x=>x.id===Number(button.dataset.add));
  const item=cart.find(x=>x.id===p.id);
  if(item)item.qty++;else cart.push({...p,qty:1});
  renderCart();
  panel.hidden=false;
});
document.querySelector("#cart-items").addEventListener("click",e=>{
  const button=e.target.closest("[data-remove]");
  if(!button)return;
  const index=cart.findIndex(x=>x.id===Number(button.dataset.remove));
  if(index>=0)cart.splice(index,1);
  renderCart();
});
document.querySelector("#cart-toggle").addEventListener("click",()=>{panel.hidden=!panel.hidden;renderCart();});
document.querySelector("#cart-close").addEventListener("click",()=>panel.hidden=true);
document.querySelector("#year").textContent=new Date().getFullYear();
renderCart();
