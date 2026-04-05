let trackElem;
let transcriptElem;
let prevScrollTop = 0;

document.addEventListener('DOMContentLoaded', () => {
  trackElem = document.getElementById('track');
  if (trackElem === null) return;

  transcriptElem = document.getElementById('transcript');
  if (transcriptElem === null) return;

  const transcriptSyncElem = document.getElementById('syncTranscript');
  if (transcriptSyncElem === null) return;
  
  trackElem.addEventListener('load', insertTranscript);
  trackElem.addEventListener('cuechange', (e) => {
    updateTranscription(e);
    updateCaption(e);
  });

  // transcriptElem.addEventListener('scroll', unsyncTranscript);
  
  transcriptSyncElem.addEventListener('change', onTranscriptSyncChange)

  const volumeElem = document.getElementById('volume');
  volumeElem.style.setProperty('--volume', '10%');
});

function insertTranscript(e) {
  if (trackElem.track === null) return;

  for (const cue of trackElem.track.cues) {
    const captionElem = document.createElement('p');
    captionElem.innerText = cue.text;
    captionElem.dataset.startTime = cue.startTime;

    const timestampElem = document.createElement('button');
    timestampElem.classList.add('timestamp');
    timestampElem.ariaHidden = true;
    const timestampMinute = cue.startTime.toFixed(0); //TODO: minute notation
    timestampElem.innerText = timestampMinute;
    
    captionElem.prepend(timestampElem);
    transcriptElem.append(captionElem);
  }
}

function updateTranscription(e) {
  if (trackElem.track === null) return;
  const activeCues = trackElem.track.activeCues;
  
  for (const activeCue of activeCues) {
    const cueElem = transcriptElem.querySelector(`[data-start-time="${activeCue.startTime}"]`);
    if (cueElem === null) continue;

    // highlight cue
    cueElem.classList.add('bold');

    // scroll to cue
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

function updateCaption(e) {
  if (trackElem.track === null) return;
  const activeCues = trackElem.track.activeCues;

  const captions = document.getElementById('captions');
  if (captions === null) return;

  captions.textContent = '';
  for (const activeCue of activeCues) {
    captions.textContent += activeCue.text;
  }
}

function unsyncTranscript(e) {
  const scrollTop = e.target.scrollTop;
  const scrollDelta = scrollTop - prevScrollTop;

  // only on user up scroll
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

function onTranscriptSyncChange(e) {
  let transcriptIsSynced = false;
  const syncTranscriptElemChecked = document.querySelector('#syncTranscript:checked');
  if (syncTranscriptElemChecked !== null) {
    transcriptIsSynced = true;
  }
  
  if (transcriptIsSynced) {
    console.log('enable transcript scroll')
    updateTranscription(e);
  }
}