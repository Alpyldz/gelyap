const express=require("express");
const bodyParser=require("body-parser");
const twilio=require("twilio");
const app=express();
app.use(bodyParser.json());
const client=twilio("ACCOUNT_SID","AUTH_TOKEN");
app.post("/webhook",async(req,res)=>{
 const {telefon,mesaj}=req.body;
 await client.messages.create({
  from:"whatsapp:+14155238886",
  to:`whatsapp:+${telefon}`,
  body:mesaj
 });
 res.send("ok");
});
app.listen(3000);
