
// COUNTDOWN
const eventDate = new Date();
eventDate.setDate(eventDate.getDate() + 30);
function updateCountdown() {
 let now = new Date().getTime();
 let diff = eventDate - now;
 let d=Math.floor(diff/(1000*60*60*24));
 let h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
 let m=Math.floor((diff%(1000*60*60))/(1000*60));
 let s=Math.floor((diff%(1000*60))/1000);
 document.getElementById("countdown").innerHTML = d+" Tage "+h+":"+m+":"+s;
}
setInterval(updateCountdown,1000);

// Play sound manually for some browsers
document.addEventListener("click",()=>{
 document.getElementById("bgmusic").play();
},{once:true});
