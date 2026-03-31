document.addEventListener('DOMContentLoaded', () => {
  const volumeElem = document.getElementById('volume');
  volumeElem.style.setProperty('--volume', '10%');

  const trackElem = document.getElementById("track");
  if (trackElem === null) return;

  const transcriptElem = document.getElementById('transcript');
  if (transcriptElem === null) return;
  
  // insert transcript
  trackElem.addEventListener('load', (e) => {
    if (trackElem.track === null) return;
    for (const cue of trackElem.track.cues) {
      const p = document.createElement('p');
      // p.innerText = `${cue.startTime}: ${cue.text}`;
      p.innerText = cue.text;
      p.dataset.startTime = cue.startTime;
      transcriptElem.appendChild(p);
    }
  });

  // highlight transcript
  trackElem.addEventListener('cuechange', (e) => {
    if (trackElem.track === null) return;
    const activeCues = trackElem.track.activeCues;
    
    for (const activeCue of activeCues) {
      const cueElem = transcriptElem.querySelector(`[data-start-time="${activeCue.startTime}"]`);
      if (cueElem === null) continue;

      cueElem.classList.add('bold');
      cueElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});