const display = document.getElementById('display');
const input   = document.getElementById('hiddenInput');
const timerEl = document.getElementById('timer');
const modes   = document.querySelectorAll('input[name="mode"]');
const customF = document.getElementById('custom');
const cBox    = document.getElementById('customBox');
const startBtn= document.getElementById('startBtn');

let current='',limit=1500,interval;

function rndLetter(){return String.fromCharCode(97+Math.floor(Math.random()*26));}
function applyMode(){
  const m=document.querySelector('input[name="mode"]:checked').value;
  if(m==='easy')   limit=1500;
  else if(m==='normal') limit=1000;
  else if(m==='hard')   limit=500;
  else                  limit=Math.min(Math.max(customF.value*1000,200),5000);
}
function next(){
  clearInterval(interval);
  current=rndLetter();
  display.textContent=current;
  let left=limit;
  timerEl.textContent=(left/1000).toFixed(1);
  interval=setInterval(()=>{
     left-=100;
     timerEl.textContent=(left/1000).toFixed(1);
     if(left<=0){
       gameOver();
     }
  },100);
}
function gameOver(){
  clearInterval(interval);
  alert('⏱ Time up!');
  timerEl.textContent='0.0';
}
startBtn.addEventListener('click',()=>{
  applyMode();
  input.value='';
  input.focus();
  next();
});
input.addEventListener('input',e=>{
  if(e.target.value.toLowerCase()===current){
     e.target.value='';
     next();
  }
});
// UI tweaks
modes.forEach(r=>r.addEventListener('change',()=>{
  cBox.style.display=r.value==='custom'?'flex':'none';
}));