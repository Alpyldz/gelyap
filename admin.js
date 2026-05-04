let ustalar=[];
db.collection("ustalar").onSnapshot(s=>{
 ustalar=[];s.forEach(d=>ustalar.push({id:d.id,...d.data()}));
 ustalariGoster();listeyiYenile();
});

function ustaEkle(){
 const isim=document.getElementById("ustaIsim").value;
 const email=document.getElementById("ustaEmail").value;
 const telefon=document.getElementById("ustaTelefon").value;
 db.collection("ustalar").add({isim,email,telefon,online:false});
}

function ustalariGoster(){
 let html="";
 ustalar.forEach(u=>{
  html+=`<div class="card">
  <h3>${u.isim}</h3>
  <p>${u.email}</p>
  <span class="durum ${u.online?"tamamlandı":"bekliyor"}">${u.online?"Online":"Offline"}</span>
  </div>`;
 });
 document.getElementById("ustalarListe").innerHTML=html;
}

db.collection("talepler").onSnapshot(()=>listeyiYenile());

function listeyiYenile(){
 db.collection("talepler").get().then(s=>{
  let html="";
  s.forEach(d=>{
   const t=d.data();
   html+=`<div class="card">
   <h3>${t.ad}</h3>
   <p>${t.telefon}</p>
   <button class="btn primary" onclick="akilliAta('${d.id}')">⚡ Ata</button>
   </div>`;
  });
  document.getElementById("liste").innerHTML=html;
 });
}

function akilliAta(id){
 db.collection("ustalar").where("online","==",true).get().then(s=>{
  if(s.empty)return alert("Online usta yok");
  const u=s.docs[0];const uData=u.data();
  db.collection("talepler").doc(id).update({ustaId:u.id});
  fetch("https://YOUR_BACKEND_URL/mesaj",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({telefon:uData.telefon,mesaj:"Yeni iş atandı"})
  });
 });
}
