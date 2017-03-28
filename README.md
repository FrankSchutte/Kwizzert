# Kwizzert
**KWIZ BEHEER API CALLS MOGEN ALLEEN ALS MEESTERT IS INGELOGD.(IETS MET SESSIONS)**

## Mappen structuur
Hieronder staat de mappen structuur van Kwizzert.
```
Kwizzert/
    build/
    node_modules/
    public/
    src/
        components/
        kwizmeestert-app/
        scorebord-app/
        server/
        team-app/
    .gitignore
    LICENSE
    package.json
    README.md
```
## Functionaliteiten
Hieronder zijn de functionaliteiten weergegeven die ondersteund worden door de verschillende apps.

### Team-app
- Aanmelden
- Huidige vraag weergeven
- Vraag beantwoorden

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
  
## Technische specificaties
Hieronder staat per onderdeel van de applicatie(clients en server) beschreven van welke technologieën gebruik wordt gemaakt.

### Clients
Alle clients maken gebruikt van react en redux. Communicatie tussen clients zal via websockets gaan, superagent wordt gebruikt om AJAX calls te doen naar de server.

### Server
Op de server wordt express gebruikt voor de routing van de client apps en de REST API. De REST API wordt vooral gebruikt om data uit de database te verzenden. Op de server zal ook een MongoDB draaien waarin vragen, categorieën en antwoorden staan.

## Routing
De index pagina toont een statische pagina met drie knoppen.Deze knoppen verwijzen naar de verschillende applicaties.

### Team-app
/team

### KwizMeestert-app
/kwizmeestert

### Scorebord-app
/scorebord

## Communicatie
Er is gekozen om de communicatie tussen de verschillende onderdelen van Kwizzert af te handelen via websocket en een API. Alle communicatie met de database gaat via een API op de server, alle overige communicatie gaat via websockets.

### API
##### POST /api/v1/login
De meestert moet zich authenticeren via een sessionId.  
**Dit moet via een HTTP header gebeuren maar wij weten nog niet hoe.**

```
Body parameters:
{
    password: "..."
}

Response 
    success: 200 OK
    failed : 401 Unauthorized
```

#### Kwiz
##### GET /api/v1/kwiz/create
Maakt een nieuwe Kwiz aan en geeft de unieke Kwiz code terug.  
*Hiervoor moet een session aangemaakt zijn door middel van /api/v1/login.*
```
Response:
{
    code: "..."
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

#### Questions
##### GET /api/v1/questions
Vraag een lijst op van alle vragen in gegeven categorie.  
*Hiervoor moet een session aangemaakt zijn door middel van /api/v1/login.*
```
Query parameters
    categoryName: Naam van de categorie. (required)

Response:
[
    { 
        _id: "...",
        question: "...",
        answer: "...",
        category: "..."
    },
    { ... }
]
```

##### GET /api/v1/kwizmeestert-questions/:id
Vraag alle informatie over een vraag op.  
*Hiervoor moet een session aangemaakt zijn door middel van /api/v1/login.*
```
Response:
{
    question: "...",
    answer: "...",
    category: "..."
}
```

##### GET /api/v1/questions/:id
Vraag een vraag op.
```
Response:
{
    question: "...",
    category: "..."
}
```

### Websocket
##### Client identificeren
Elke client moet aangeven wat zijn rol is: kwizmeestert, team of scorebord. 
```
{
    action: "REGISTER",
    code: "...",
    type: "quizmaster | team | scoreboard"
}
```

##### Team aanmelden
Een team kan zich aanmelden voor een kwiz.
```
{
    action: "ADD_TEAM",
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
            teamName: "...",
            allowed: true | false
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

##### Kwizmeestert start een vraag
Een kwizmeestert start een vraag.
```
{
    action: "START_QUESTION",
    code: "..."
}
```

##### Kwizmeestert sluit een vraag
Een kwizmeestert sluit een vraag.
```
{
    action: "CLOSE_QUESTION",
    code: "..."
}
```

##### Kwizmeestert beoordeeld een antwoord
De kwizmeestert keurt vragen goed of fout.
```
{
    action: "RATE_ANSWER",
    code: "...",
    answers: [
        {
            team: "...",
            answer: "...",
            approved: true | false
        }
    ]
}
```

##### Ronde afgelopen
Een kwizmeestert sluit een ronde.
```
{
    action: "ROUND_FINISHED",
    code: "..."
}
```

##### Kwiz afgelopen
Een kwizmeestert beëindigd een kwiz.
```
{
    action: "QUIZ_FINISHED",
    code: "..."
}
```
