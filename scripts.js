let trackElem;
let transcriptElem;
let prevScrollTop = 0;

document.addEventListener('DOMContentLoaded', () => {
  trackElem = document.getElementById('track');
  if (trackElem === null) return;

  transcriptElem = document.getElementById('transcript');
  if (transcriptElem === null) return;

  const syncTranscriptElem = document.getElementById('syncTranscript');
  if (syncTranscriptElem === null) return;
  
  trackElem.addEventListener('load', insertTranscript);
  trackElem.addEventListener('cuechange', highlightScrollCue);

  transcriptElem.addEventListener('scroll', unsyncTranscript);
  
  syncTranscriptElem.addEventListener('change', updateTranscriptSync)

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
    let transcriptIsSynced = false;
    const syncTranscriptElemChecked = document.querySelector('#syncTranscript:checked');
    if (syncTranscriptElemChecked !== null) {
      transcriptIsSynced = true;
    }
    if (transcriptIsSynced) {
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
      const syncTranscriptElem = document.getElementById('syncTranscript');
      if (syncTranscriptElem === null) return;

      syncTranscriptElem.checked = false;
      console.log('disable transcript scroll')
    }
  }

  prevScrollTop = scrollTop;
}

function updateTranscriptSync() {
  let transcriptIsSynced = false;
  const syncTranscriptElemChecked = document.querySelector('#syncTranscript:checked');
  if (syncTranscriptElemChecked !== null) {
    transcriptIsSynced = true;
  }
  
  if (transcriptIsSynced) {
    console.log('enable transcript scroll')
    highlightScrollCue();
  }
}