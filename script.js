const snowfall=document.getElementById('snowfall');
if(snowfall){
  const flakes=['❄','✦','·','❅'];
  for(let i=0;i<22;i++){
    const flake=document.createElement('span');
    flake.className='snowflake';
    flake.textContent=flakes[i%flakes.length];
    flake.style.left=(Math.random()*100)+'%';
    flake.style.setProperty('--size',(8+Math.random()*13)+'px');
    flake.style.setProperty('--duration',(10+Math.random()*14)+'s');
    flake.style.setProperty('--delay',(-Math.random()*20)+'s');
    flake.style.setProperty('--sway',(2.5+Math.random()*3.5)+'s');
    flake.style.setProperty('--drift',(-45+Math.random()*90)+'px');
    snowfall.appendChild(flake);
  }
}
const introText=`Это письмо я не хотел отправлять обычным сообщением.

Потому что есть слова, которым хочется дать немного больше времени.

Поэтому просто прочитай его до конца.`;
const secondText=`Иногда один человек появляется в твоей жизни совершенно неожиданно.

И вдруг привычные вещи начинают звучать иначе.

Это письмо — не попытка что-то изменить.

Это просто то, что мне хотелось однажды сказать тебе.`;
const $=id=>document.getElementById(id);
const envelope=$('envelope'),openLink=$('openLink'),envelopeScreen=$('envelopeScreen'),letterScreen=$('letterScreen'),letterText=$('letterText'),marker=$('continueMarker'),interlude=$('interlude'),secondLetter=$('secondLetter'),secondTextEl=$('secondText'),unlock=$('unlockArea'),videoButton=$('videoButton'),videoScreen=$('videoScreen'),closeVideo=$('closeVideo');
let opened=false,secondFinished=false;
function typeText(el,text,speed=38,done=()=>{}){el.textContent='';el.classList.remove('done');let i=0;function tick(){if(i<text.length){el.textContent+=text[i++];let d=text[i-1]==='\n'?650:/[.!?]/.test(text[i-1])?420:speed;setTimeout(tick,d)}else{el.classList.add('done');done()}}tick()}
function openLetter(){if(opened)return;opened=true;envelope.classList.add('open');setTimeout(()=>{envelopeScreen.classList.add('hide');letterScreen.classList.add('visible');letterScreen.setAttribute('aria-hidden','false');requestAnimationFrame(()=>{letterScreen.scrollIntoView({behavior:'smooth',block:'start'});});setTimeout(()=>typeText(letterText,introText,38,()=>{marker.classList.add('show');setTimeout(showInterlude,2200)}),1200)},900)}
function showInterlude(){interlude.classList.add('visible');interlude.setAttribute('aria-hidden','false');setTimeout(()=>{secondLetter.classList.add('visible');secondLetter.setAttribute('aria-hidden','false');setTimeout(()=>typeText(secondTextEl,secondText,38,()=>{secondFinished=true;setTimeout(()=>{unlock.classList.add('show');videoButton.disabled=false;videoButton.classList.add('unlocked');videoButton.textContent='✨ теперь можешь посмотреть'},1200)}),1000)},2800)}
envelope.onclick=openLetter;openLink.onclick=openLetter;envelope.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openLetter()};
videoButton.onclick=()=>{if(secondFinished){videoScreen.classList.add('visible');videoScreen.setAttribute('aria-hidden','false')}};
closeVideo.onclick=()=>{videoScreen.classList.remove('visible');videoScreen.setAttribute('aria-hidden','true')};