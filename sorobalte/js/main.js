(function(){
 const dict=window.SOROBALTE_TRANSLATIONS||{};
 const buttons=document.querySelectorAll(".lang-btn");
 function setLanguage(lang){
   const pack=dict[lang]||dict.fr;
   document.documentElement.lang=lang;
   document.querySelectorAll("[data-i18n]").forEach(el=>{
     const key=el.getAttribute("data-i18n");
     if(pack[key]!==undefined) el.innerHTML=pack[key];
   });
   buttons.forEach(b=>{const active=b.dataset.lang===lang;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
   try{localStorage.setItem("sorobalte-lang",lang);}catch(e){}
 }
 buttons.forEach(b=>b.addEventListener("click",()=>setLanguage(b.dataset.lang)));
 let saved="fr";try{saved=localStorage.getItem("sorobalte-lang")||"fr";}catch(e){}
 setLanguage(saved);
 const theme=document.getElementById("themeToggle");
 let dark=false;try{dark=localStorage.getItem("sorobalte-theme")==="dark";}catch(e){}
 function setTheme(value){document.body.classList.toggle("dark",value);theme.textContent=value?"☀":"☾";theme.setAttribute("aria-label",value?"Activer le thème clair":"Activer le thème sombre");try{localStorage.setItem("sorobalte-theme",value?"dark":"light");}catch(e){}}
 setTheme(dark);theme.addEventListener("click",()=>{dark=!dark;setTheme(dark);});
 document.getElementById("year").textContent=new Date().getFullYear();
 const form=document.getElementById("contactForm");
 form.addEventListener("submit",e=>{
   e.preventDefault();
   const recipient=""; // À renseigner avant publication : adresse e-mail de contact Sorobalte.
   if(!recipient){alert("Le formulaire est prêt, mais l'adresse e-mail de réception doit être renseignée dans js/main.js (const recipient).");return;}
   const data=new FormData(form);
   const subject=encodeURIComponent("Demande Sorobalte — "+data.get("subject"));
   const body=encodeURIComponent("Nom : "+data.get("name")+"\nE-mail : "+data.get("email")+"\n\n"+data.get("message"));
   window.location.href="mailto:"+recipient+"?subject="+subject+"&body="+body;
 });
})();