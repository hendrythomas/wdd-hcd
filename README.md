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

Notities:

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

*  Cover toggle
*  Handmatige scroll
*  Functionaliteit peak meter
*  Timestamps
*  Ondertiteling
*  Monospace font toggle

Vandaag heb ik handmatige transcript scroll toegevoegd. Er bestaan meerdere manieren, zoals automatisch of met een toggle. Deze iteratie ga ik een toggle testen.

### Iteratie 2

#### Relevante feedback

Deze iteratie wilde ik de sync toggle testen en meer feedback vragen.

Feedback:

*  Toggle voor sync is duidelijk
   *  Automatisch is inderdaad onhandig
*  Ondertiteling kan beter onder de cover
*  Peak meter is duidelijk
*  Font size goed

Notities:

*  Aangeven welke persoon aan het praten is
*  Focus op content, geen drukke styling
*  Onafleidende kleuren in tekst zijn toegestaan
*  Tekst mag irritant zijn als audio irritant is, maar met toggle
*  De tekstgrootte was te klein bij één persoon.

Informatie testpersoon:

*  Gebruikt soms mobile

### Volgende keer

*  Onderzoek vtt kleur
   *  Experimenteren met transcriptie styling
*  Ondertiteling undercover

### Later

*  Indicatie pratende persoon
   *  Hier kan ik ook mee experimenteren.
*  Instelling tekstgrootte

## Dag 4

### Expert feedback

*  Bestaande features testen (aannamens)
   *  Tekst transcript


## Dag 5

### Iteratie 3

Deze iteratie wilde ik bestaande features testen, zoals de informatie en kleuren van het transcript.

#### Feedback

*  De kleuren in het transcript zijn goed leesbaar en niet afleidend.
*  De timestamps zijn handig
*  Naam van de spreker
   *  Misschien aan het begin van de zin
*  De podcast mist informatie.

## Volgende keer

*  Info podcast
* Ik heb meer ideeën voor het aanduiden van de spreker. Hiervoor ga ik een A/B test doen.


## Dag 6

experiment spreker

### Log

### Checkout

### Volgende keer


## Dag 7

### Iteratie 4

#### Feedback

*  De captions zijn overbodig als transcript op het scherm staat.

#### Observaties

De testpersoon kon met gemak de tekst en sprekers voor een deel van de podcast volgen.

### Volgende keer

*  Captions toggle
   *  Ik wil de dingen die de testpersoon zelf niet gebruikt weghalen of standaard uitzetten ([exclusive design]()).
*  Settings popup om leesbaarheid te verbeteren.


## Dag 8

### Expert feedback

*  De popup voor settings lijkt een goed idee voor de testpersoon.
*  Verder werken aan de details

#### Volgende keer

*  subtitles afleidende dingen weghalen


## Ontwerp

emotie tekst

geen achtergrond effecten


## Bronnen

*  https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API
*  https://developer.chrome.com/docs/css-ui/style-queries
*  MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript