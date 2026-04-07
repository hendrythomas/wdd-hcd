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
  
  const audioElem = document.getElementById('audio');
  if (audioElem === null) return;

  const playPauseElem = document.getElementById('playPause');
  if (playPauseElem === null) return;
  
  trackElem.addEventListener('load', insertTranscript);
  trackElem.addEventListener('cuechange', (e) => {
    updateTranscript(e);
    updateCaption(e);
    updatePeakmeter(e);
  });

  // transcriptElem.addEventListener('scroll', unsyncTranscript);
  
  transcriptSyncElem.addEventListener('change', onTranscriptSyncChange);

  playPauseElem.addEventListener('change', playPause);

  audioElem.addEventListener('play', iconPlay);
  audioElem.addEventListener('pause', iconPause);
});

function setPlayerTime(startTime) {
  const audioElem = document.getElementById('audio');
  if (audioElem === null) return;

  audioElem.currentTime = startTime;
}

function insertTranscript(e) {
  if (trackElem.track === null) return;

  for (const cue of trackElem.track.cues) {
    const cueElem = document.createElement('p');
    cueElem.innerText = cue.text;
    cueElem.dataset.startTime = cue.startTime;

    const timestampElem = document.createElement('button');
    timestampElem.classList.add('timestamp');
    timestampElem.ariaHidden = true;
    timestampElem.innerText = secondsToMins(cue.startTime);
    timestampElem.setAttribute("onclick", `setPlayerTime(${cue.startTime});`);

    cueElem.prepend(timestampElem);
    transcriptElem.append(cueElem);

    const twst = randInt(0, 30);
    if (twst < 10) {
      cueElem.classList.add('happy');
    }
    if (twst === 11) {
      cueElem.classList.add('angry');
    }
    if (twst === 12) {
      cueElem.classList.add('sad');
    }
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
    const syncTranscriptElemChecked = document.querySelector('#syncTranscript :checked');
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
  const syncTranscriptElemChecked = document.querySelector('#syncTranscript :checked');
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
  setTimeout(function(){
    peakmeterElem.classList.add('anim-fall');
  }, 10);
}

function playPause(e) {
  const audioElem = document.getElementById('audio');
  if (audioElem === null) return;
  
  const isPlaying = (!audioElem.paused && audioElem.duration > 0);
  if (isPlaying) {
    audioElem.pause();
  } else {
    audioElem.play();
  }
}

function iconPlay(e) {
  const checkbox = document.querySelector('#playPause input');
  if (checkbox === null) return;

  checkbox.checked = true;
}
function iconPause(e) {
  const checkbox = document.querySelector('#playPause input');
  if (checkbox === null) return;
  
  checkbox.checked = false;
}