let uid=null;
firebase.auth().onAuthStateChanged(u=>{
 if(!u)return;
 db.collection("ustalar").where("email","==",u.email).get().then(r=>{
  uid=r.docs[0].id;
  db.collection("talepler").where("ustaId","==",uid).onSnapshot(s=>{
   let h="";s.forEach(d=>{const t=d.data();
    h+=`<div class="card"><h3>${t.ad}</h3><p>${t.telefon}</p></div>`;
   });
   document.getElementById("liste").innerHTML=h;
  });
 });
});
function online(){db.collection("ustalar").doc(uid).update({online:true});}
function offline(){db.collection("ustalar").doc(uid).update({online:false});}
