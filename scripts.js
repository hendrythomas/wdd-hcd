let trackElem;
let transcriptElem;
let transcriptIsScrolling = true;
let prevScrollTop = 0;

document.addEventListener('DOMContentLoaded', () => {
  trackElem = document.getElementById('track');
  if (trackElem === null) return;

  transcriptElem = document.getElementById('transcript');
  if (transcriptElem === null) return;
  
  trackElem.addEventListener('load', insertTranscript);
  trackElem.addEventListener('cuechange', highlightScrollCue);

  transcriptElem.addEventListener('scroll', unsyncTranscript);

  const volumeElem = document.getElementById('volume');
  volumeElem.style.setProperty('--volume', '10%');
});

function insertTranscript() {
  if (trackElem.track === null) return;

  for (const cue of trackElem.track.cues) {
    const p = document.createElement('p');
    p.innerText = cue.text;
    p.dataset.startTime = cue.startTime;
    transcriptElem.appendChild(p);
  }
}

function highlightScrollCue() {
  if (trackElem.track === null) return;
  const activeCues = trackElem.track.activeCues;
  
  for (const activeCue of activeCues) {
    const cueElem = transcriptElem.querySelector(`[data-start-time="${activeCue.startTime}"]`);
    if (cueElem === null) continue;

    // highlight
    cueElem.classList.add('bold');

    // scroll
    if (transcriptIsScrolling) {
      cueElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function unsyncTranscript(e) {
  const scrollTop = e.target.scrollTop;
  const scrollDelta = scrollTop - prevScrollTop;

  // only on up scroll
  if (scrollDelta < 0) {
    const transcriptHoverElem = document.querySelector('#transcript:hover');
    if (transcriptHoverElem !== null) {
      console.log('disable transcript scroll')
      transcriptIsScrolling = false;
    }
  }

  prevScrollTop = scrollTop;
}

function syncTranscript() {
  console.log('enable transcript scroll')
  transcriptIsScrolling = true;
  highlightScrollCue();
}