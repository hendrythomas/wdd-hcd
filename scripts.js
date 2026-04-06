// source:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The minimum is inclusive and the maximum is exclusive 
}

// source:
// https://stackoverflow.com/questions/3733227#41395231
function secondsToMins(seconds){
  return `${Math.floor(seconds / 60)}:${('0' + Math.floor(seconds % 60)).slice(-2)}`;
}

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
    updateTranscript(e);
    updateCaption(e);
    updatePeakmeter(e);
  });

  // transcriptElem.addEventListener('scroll', unsyncTranscript);
  
  transcriptSyncElem.addEventListener('change', onTranscriptSyncChange);
});

function setPlayerTime(startTime) {
  const audioElem = document.getElementById('audio');
  if (audioElem === null) return;

  audioElem.currentTime = startTime;
}

function insertTranscript(e) {
  if (trackElem.track === null) return;

  for (const cue of trackElem.track.cues) {
    const captionElem = document.createElement('p');
    captionElem.innerText = cue.text;
    captionElem.dataset.startTime = cue.startTime;

    const timestampElem = document.createElement('button');
    timestampElem.classList.add('timestamp');
    timestampElem.ariaHidden = true;
    timestampElem.innerText = secondsToMins(cue.startTime);
    timestampElem.setAttribute("onclick", `setPlayerTime(${cue.startTime});`);

    captionElem.prepend(timestampElem);
    transcriptElem.append(captionElem);
  }
}

function updateTranscript(e) {
  if (trackElem.track === null) return;
  const activeCues = trackElem.track.activeCues;

  if (transcriptElem === null) return;

  // remove highlight
  //TODO: probably not the way to do it
  const highlightElems = transcriptElem.querySelectorAll('.highlight');
  for (const highlightElem of highlightElems) {
    highlightElem.classList.remove('highlight');
  }
  
  for (const activeCue of activeCues) {
    const cueElem = transcriptElem.querySelector(`[data-start-time="${activeCue.startTime}"]`);
    if (cueElem === null) continue;

    // highlight cue
    cueElem.classList.add('highlight');

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
    updateTranscript(e);
  }
}

function updatePeakmeter(e) {
  const peakmeterElem = document.getElementById('peakmeter');
  if (peakmeterElem === null) return;

  const samplePeak = randInt(25, 76);
  peakmeterElem.style.setProperty('--volume', samplePeak);
  
  // animate
  peakmeterElem.classList.remove('anim-fall');
  requestAnimationFrame(() => {
    peakmeterElem.classList.add('anim-fall');
  });
}