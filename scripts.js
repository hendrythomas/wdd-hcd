let trackElem;
let transcriptElem;

document.addEventListener('DOMContentLoaded', () => {
  trackElem = document.getElementById('track');
  if (trackElem === null) return;

  transcriptElem = document.getElementById('transcript');
  if (transcriptElem === null) return;
  
  trackElem.addEventListener('load', insertTranscript);
  trackElem.addEventListener('cuechange', highlightScrollCue);

  transcriptElem.addEventListener('scroll', disableCueScroll);

  const volumeElem = document.getElementById('volume');
  volumeElem.style.setProperty('--volume', '10%');
});

function insertTranscript(e) {
  if (trackElem.track === null) return;

  for (const cue of trackElem.track.cues) {
    const p = document.createElement('p');
    p.innerText = cue.text;
    p.dataset.startTime = cue.startTime;
    transcriptElem.appendChild(p);
  }
}

function highlightScrollCue(e) {
  if (trackElem.track === null) return;
  const activeCues = trackElem.track.activeCues;
  
  for (const activeCue of activeCues) {
    const cueElem = transcriptElem.querySelector(`[data-start-time="${activeCue.startTime}"]`);
    if (cueElem === null) continue;

    cueElem.classList.add('bold');
    cueElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function disableCueScroll(e) {
  console.log('u scrolled')
}