
// Simple boss fight for a 3-year-old
const maxHP = 10; // easy for age 3
let hp = maxHP;
const hpBar = document.getElementById('hpBar');
const attackBtn = document.getElementById('attackBtn');
const cheerBtn = document.getElementById('cheerBtn');
const message = document.getElementById('message');
const bossSprite = document.querySelector('.boss-sprite');

function updateHP(){ 
  const pct = Math.max(0, hp) / maxHP * 100;
  hpBar.style.width = pct + '%';
  if(hp <= 0) {
    bossDefeated();
  }
}

attackBtn.addEventListener('click', ()=>{
  // play a little attack animation
  bossSprite.style.transform = 'translateY(8px) scale(0.98)';
  setTimeout(()=> bossSprite.style.transform = '', 120);
  // reduce hp by random 1~3 (keeps it exciting)
  const dmg = Math.floor(Math.random()*2)+1;
  hp -= dmg;
  message.textContent = '攻擊！- ' + dmg + ' 點';
  updateHP();
});

cheerBtn.addEventListener('click', ()=>{
  message.textContent = '加油！小奧特曼！🎉';
});

function bossDefeated(){
  message.textContent = '你打倒生日大魔王了！';
  // show cake & confetti
  showCakeAndConfetti();
  // disable buttons
  attackBtn.disabled = true;
  cheerBtn.disabled = true;
}

function showCakeAndConfetti(){
  // replace boss sprite with cake
  bossSprite.textContent = '🎂';
  document.querySelector('.boss-name').textContent = '生日蛋糕出現了！';
  // show a big happy message
  setTimeout(()=>{
    message.innerHTML = '生日快樂，侑熙！願你天天開心 🎈<br><strong>小小奧特曼守護世界</strong>';
  }, 300);
  startConfetti();
}

/* --- lightweight confetti --- */
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let W, H;
function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

const confetti = [];
function startConfetti(){
  for(let i=0;i<120;i++){
    confetti.push({
      x: Math.random()*W,
      y: Math.random()*H - H,
      r: 6 + Math.random()*8,
      d: Math.random()*40 + 10,
      color: ['#ff6b6b','#ffd166','#6bcB77','#6bd5ff','#c27dff'][Math.floor(Math.random()*5)],
      tilt: Math.random()*10
    });
  }
  runConfetti();
  setTimeout(()=> stopConfetti(), 6000);
}

let confettiRunning = true;
function runConfetti(){
  if(!confettiRunning) return;
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<confetti.length;i++){
    const p = confetti[i];
    p.y += Math.cos(p.d) + 1 + p.r/8;
    p.x += Math.sin(p.d/2);
    p.tilt += 0.1;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(Math.sin(p.tilt)*0.2);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r/1.6);
    ctx.restore();
    if(p.y > H + 20){ p.y = -20; p.x = Math.random()*W; }
  }
  requestAnimationFrame(runConfetti);
}

function stopConfetti(){ confettiRunning = false; ctx.clearRect(0,0,W,H); }

// init hp bar width
updateHP();
