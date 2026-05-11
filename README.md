# HCD

## Dag 0

### Log

Vandaag heb ik [ideeën](#Ideeën) bedacht. Omdat ik de testpersoon nog niet heb ontmoet, ben ik begonnen aan een simpel prototype om feedback over te vragen.

Ik heb web captions onderzocht ([bron](#Bronnen)). Ik heb geleerd dat op het web VTT wordt gebruikt.

Ik heb met klasgenoten een testpodcast uitgezocht om te gebruiken. Hiervan gebruik ik het transcript, de cover en de omschrijving. Vandaag heb ik alvast de audio geïmplementeerd in HTML.

### Ideeën

1. ~~Ondertiteling-opties~~
   *  Bestaat al
   *  Alleen styling, geen JavaScript

2. Ondertiteling + opties/functies voor lezen + audio-effecten
   *  Ondertiteling / volledige tekst / document
   *  Visualisatie audio


### Iteratie 1

Voor deze iteratie heb ik vooral de testpersoon geobserveerd en om feedback gevraagd.

Feedback:
*  Gebruik een toggle voor video/cover
   *  De huidige cover staat altijd op het scherm. 
*  Onderzoek peak meters
   *  De huide peak meter is onduidelijk.

Observaties:

*  Context is belangrijk
*  Audio afspelen tijdens het lezen, maar het liefst handmatig scrollen
*  De tekst zelf moet simpel blijven
*  Het gebruk van emoji is toegestaan
*  Tijdens het afspelen de ondertiteling niet verplaatsen
*  Het liefst sans serif of monospace
*  Serif is oké voor lezen

Belangrijke informatie over de testpersoon:

*  Leesbaarheid en content is belangrijk
*  Lichte epilepsie; flitsen vermijden

### Volgende keer

*  Toggle voor cover toevoegen
*  Peak meter maken
*  Handmatige scroll toevoegen
*  Ondertiteling toevoegen

### Later

*  Tekst transcript stylen
*  Context toevoegen:
   *  Informatie podcast


## Dag 1

### Expert feedback

Volgende test kan ik meer experimenteren:

*  Transcript
*  Peak meter

### Volgende keer

Ik ben van plan om een A/B test te doen voor het transcript.


## Dag 2

### Log

*  Layout responsive gemaakt
*  Peak meter element
   *  Bestaan de peak meters krijgen een kleur gebaseerd op de volume. Hiervoor heb ik style queries gebruikt ([bronnen](#bronnen)).

### Volgende keer

*  Handmatige sync
*  Cover toggle

## Dag 3

### Log

Vandaag heb ik handmatige sync toegevoegd. Er bestaan meerdere manieren, zoals automatisch of met een toggle. Deze iteratie ga ik een toggle testen.

*  Handmatige sync
*  Cover toggle
*  Peak meter JavaScript
*  Timestamps
*  Ondertiteling
*  Monospace font

### Iteratie 2

#### Relevante feedback

*  Ondertiteling kan beter undercover
*  Peak meter is duidelijk
*  Aangeven welke persoon aan het praten is
*  Font size goed
*  Gebruikt soms mobile
*  Focus op content, geen drukke styling
*  Onafleidende kleuren in tekst zijn toegestaan
*  Tekst mag irritant zijn als audio irritant is, maar met toggle

### Volgende keer

*  Onderzoek vtt kleur
   *  Experimenteer met transcriptie styling
*  Video controls inklappen ipv weghalen
*  Ondertiteling onder cover

### Later

*  Indicatie pratende persoon
*  Font size instelling
*  Video

## Dag 4

### Expert feedback

*  Bestaande features testen (aannamens)
   *  


## Dag 5

### Iteratie 3

*  Info podcast
*  Kleuren zijn goed
*  Namen aan het begin van de eerste caption van de zin

## Volgende keer

*  Info podcast
*  Namen toevoegen (A/B test)

## Dag 6

experiment spreker

### Log

### Checkout

### Volgende keer


## Dag 7

### Iteratie 4

*  captions overbodig, misschien alleen aan in video modus
*  

### Volgende keer

*  settings popup ipv huidige


## Dag 8

### Expert feedback

*  settings popup is goed voor human
*  details, check vorige feedback
*  subtitles afleidende dingen weghalen


## Ontwerp

emotie tekst

geen achtergrond effecten


## Bronnen

*  https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API
*  https://developer.chrome.com/docs/css-ui/style-queries
*  MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript