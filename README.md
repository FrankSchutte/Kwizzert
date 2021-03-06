# Kwizzert
## Mappen structuur
Hieronder staat de globale structuur van Kwizzert.
```
Kwizzert/
    team/
        build/
        node_modules/
        public/
        src/
            actions/
            components/
            containers/
            reducers/
            index.js
        package.json
    kwizmeestert/
        build/
        node_modules/
        public/
        src/
            actions/
            components/
            containers/
            reducers/
            index.js
        package.json
    scorebord/
        build/
        node_modules/
        public/
        src/
            actions/
            components/
            containers/
            reducers/
            index.js
        package.json
    server.js
    .gitignore
    LICENSE
    package.json
    README.md
```
## Mockups
Hieronder zijn de functionaliteiten weergegeven die ondersteund worden door de verschillende apps.

### Team-app
- Aanmelden
- Huidige vraag weergeven
- Vraag beantwoorden

Teams moeten zich kunnen aanmelden via het eerste scherm. Daarna moeten de teams op de kwizmeestert wachten, wanneer hij een vraag start wordt de vraag getoond met een veld voor een antwoord. Als extra is er een scherm bedacht die wordt getoond wanneer de kwiz wordt gesloten, dan krijgen de teams een bericht waarin staat hoe goed ze de kwiz hebben gemaakt.

![team-app mockup](./images/team.jpg)

### KwizMeestert-app
- Openstellen voor aanmeldingen
- Aanmeldingen goedkeuren
- Kwiz starten
- Ronde starten
- Categorieën kiezen
- Kwiz afsluiten
- Vraag kiezen
- Vraag starten
- Vraag sluiten
- Antwoord goedkeuren

De kwizmeestert kan in het eerste scherm een kwiz openstellen voor aanmeldingen, daarna kunnen teams zich aanmelden en kan de kwizmeestert teams toelaten of afwijzen.
De kwizmeestert moet na het starten van een kwiz drie categorieën selecteren om de ronde te starten. De kwizmeestert dan voorgaand aan iedere vraag een vraag kiezen uit de geselecteerde categorieën. De kwizmeestert bepaald bij iedere vraag hoelang teams een antwoord kunnen indienen. De kwizmeestert kan ook antwoorden van teams goedkeuren.
Als er 12 vragen zijn geweest kan de kwizmeestert kiezen om een nieuwe ronde te starten of om de kwiz te stoppen.

![kwizmeestert-app mockup](./images/meestert.jpg)

### Scorebord-app
- Voortgang weergeven
- Rondepunten weergeven
- Goede antwoorden per team in huidige ronde
- Als een vraag loopt:
  - geef vraag weer
  - geef categorie weer
  - geef huidige teamstatus weer
- Als er geen vraag loopt:
  - geef antwoorden per team weer
  - geef beoordeling kwizmeestert weer
  - werk teamscores bij
  
Het scorebord app geeft de voortgang van de kwiz weer. Er moet worden getoond welke teams meedoen, hoeveel vragen iederen team goed heeft en het aantal rondepunten. Daarnaast geeft het scorebord bij iedere vraag live weer welke teams een antwoord hebben ingedient. Wanneer de vraag is gesloten is op het scorebord live te zien of de kwizmeestert een antwoord heeft goedkeurd of afgekeurd.

![scorebord-app mockup](./images/scorebord.jpg)
  
## Technische specificatie
Hieronder staat per onderdeel van de applicatie beschreven van welke technologieën gebruik wordt gemaakt.

### Communicatie
Een eis aan de Kwizzert is dat een groot deel van de communicatie in near real-time is.  
Om dit te bereiken is er voor gekozen om websockets te gebruiken. Dit zal alleen worden toegepast voor de communicatie tussen de verschillende clients.  
Voor de overige communicatie is er gekozen voor een REST API, omdat deze niet in near real-time hoeft te gebeuren.

### Clients
Alle clients maken gebruikt van react en redux. Er wordt gebruik gemaakt van superagent om AJAX verzoeken naar de server te versturen.

### Server
Op de server wordt express gebruikt voor de routing van de client apps en de REST API.  
De REST API wordt vooral gebruikt om data uit de database te verzenden.  
Op de server zal ook een MongoDB draaien waarin vragen, categorieën en antwoorden staan.

## Routing
De index pagina toont een statische pagina met drie knoppen. Deze knoppen verwijzen naar de verschillende applicaties.

### Team-app
/team

### KwizMeestert-app
/kwizmeestert

### Scorebord-app
/scorebord

## Communicatie
### API

#### Kwiz
##### GET /api/v1/kwiz/create?:key
Maakt een nieuwe Kwiz aan en geeft de unieke Kwiz code terug.  
*Hiervoor moet een API key meegegeven worden in de URL.*
```
Response:
{
    code: "..."
}
```

##### GET /api/v1/kwiz/:code
Voordat clients zich bij een kwiz aanmelden moet er worden gecontroleerd of de kwiz bestaat, als de kwiz niet bestaat wordt _null_ gegeven, als de kwiz gestart of gestopt is wordt open of closed gegeven.
```
Response:
{
    status: null | open | closed
}
```

#### Categories
##### GET /api/v1/categories
Vraag een lijst op met alle categorieën.
```
Response:
[
    { categoryName: "..." },
    { ... }
]
```

##### GET /api/v1/categories/:categoryName/questions?:key
Vraag een lijst op van alle vragen in gegeven categorie.  
*Hiervoor moet een API key meegegeven worden in de URL.*
```
Response:
{
    category: "...",
    questions: [
        {
            _id: "...",
            question: "...",
            answer: "..."
        },
        { ... }
    ]
}
```

##### GET /api/v1/questions/:id?:key
Vraag een vraag op.  
Wanneer een team de vraag ophaalt wordt alleen de vraag en de categorie opgestuurd.
Als er een API key wordt meegestuurd in de url dan bevat de response ook het antwoord.
```
Response:
{
    question: "...",
    category: "...",
    answer: "...",
}
```

### Websocket
##### Client identificeren
Elke client moet aangeven wat zijn rol is: kwizmeestert, team of scorebord.  
Wanneer de client een team is moet er ook een teamName worden meegestuurd.
```
{
    action: "REGISTER",
    code: "...",
    type: "quizmaster | team | scoreboard",
    teamName: "..."
}
```

#### Kwizmeestert weigert team
Een kwizmeestert kan ervoor kiezen om een team af te keuren.
```
{
    action: "KICK_TEAM",
    code: "...",
    teamName: "..."
}
```

##### Kwizmeestert start een kwiz
Een kwizmeestert bepaald welke teams meedoen en start de kwiz met deze teams.
```
{
    action: "START_QUIZ",
    code: "...",
    teams: [
        {
            teamName: "..."
        },
        { ... }
    ]
}
```

##### Kwizmeestert kiest een vraag
Een kwizmeestert kiest een vraag, de andere clients halen de vraag op.
```
{
    action: "PICK_QUESTION",
    code: "...",
    questionId: "..."
}
```

##### Team bevestigd antwoord
Elk team moet een vraag kunnen bevestigen, het antwoord moet aangepast kunnen worden.
```
{
    action: "SEND_ANSWER",
    code: "...",
    teamName: "...",
    answer: "..."
}
```

##### Kwizmeestert start een vraag
Een kwizmeestert start een vraag.
```
{
    action: "START_QUESTION",
    code: "..."
}
```

##### Kwizmeestert stopt een vraag
Een kwizmeestert stopt een vraag.
```
{
    action: "STOP_QUESTION",
    code: "..."
}
```

##### Kwizmeestert beoordeeld een antwoord
De kwizmeestert keurt vragen goed of fout.
```
{
    action: "SEND_RATING",
    code: "...",
    teamName: "...",
    answer: "...",
    approved: true | false
}
```

##### Ronde afgelopen
Een kwizmeestert sluit een ronde.
```
{
    action: "FINISH_ROUND",
    code: "..."
}
```

##### Kwiz afgelopen
Een kwizmeestert sluit een kwiz.
```
{
    action: "FINISH_QUIZ",
    code: "..."
}
```

## Build process
### Lokaal
De kwizzert applicatie bestaat uit drie clients en een server. Elk onderdeel heeft zijn eigen node configuratie, daarom moeten de dependencies van iedere app afzonderlijk geïnstalleerd worden vanuit de root folder.
```
> npm install                       (voor de server)
> cd kwizmeestert && npm install    (voor de kwizmeestert)
> cd team && npm install            (voor de teams)
> cd scorebord && npm install       (voor het scorebord)
```
Om de clients te gebruiken met react-scripts kan iedere app afzonderlijk worden gestart met npm start.

### Heroku
De kwizzert applicatie kan op een Heroku server draaien. Als buildpack wordt heroku/nodejs gebruikt, om kwizzert te starten wordt het npm start commando door Heroku uitgevoerd.
Om ervoor te zorgen dat alle dependencies zijn gedownload en dat de react apps zijn gebuild is er een heroku-postbuild toegevoegd aan de package.json scripts.
Heroku is gekoppeld aan de git repository [https://github.com/FrankSchutte/Kwizzert]  
Na het deployen is kwizzert bereikbaard via [http://qwizzert.herokuapp.com/team]
