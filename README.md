# Kwizzert

KWIZ BEHEER API CALLS MOGEN ALLEEN ALS MEESTERT IS INGELOGD. (IETS MET SESSIONS)


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

## Routes

### Team-app
/team

### KwizMeestert-app
/kwizmeestert

### Scorebord-app
/scorebord



## API

De meestert moet verifiëren via een sessionId.  
Dit moet via een HTTP header gebeuren maar wij weten nog niet hoe.

#### POST /api/v1/login
```
Body parameters:
{
    password: "..."
}
```

###Kwiz



#### GET /api/v1/kwiz/create
Maakt een nieuwe Kwiz aan en geeft de unieke Kwiz code terug.  
Hiervoor moet een session aangemaakt zijn door middel van /api/v1/login.
```
Response:
{
    code: "..."
}
```

####GET /api/v1/kwiz/:code/teams
Haal een op lijst van alle aangemelde teams bij een kwiz.  
Hiervoor moet een session aangemaakt zijn door middel van /api/v1/login.
```
Query parameters:
    code: De unieke code van een kwiz.

Response:
[
    { teamName: "..." },
    ...
]
```

####GET /api/v1/kwiz/:code/start 
Start de Kwiz met alle toegestane teams.  
Hiervoor moet een session aangemaakt zijn door middel van /api/v1/login.
```
Body parameters: 
[
    { teamName: "...", allowed: true/false },
    { ... }
]
```

#### POST /api/v1/kwiz/register
Meld een team aan bij een bestaande, nog niet gestartte Kwiz.
```
Body parameters:
{
    code: "...",
    teamName: "..."
}
```

###Categories
####GET /api/v1/categories
Vraag een lijst op met alle categorieën.
```
Response:
[
    { categoryName: "..." },
    { ... }
]
```

###Questions
####GET /api/v1/questions
Vraag een lijst op van alle vragen in gegeven categorie.
Hiervoor moet een session aangemaakt zijn door middel van /api/v1/login.
```
Query parameters:
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

####GET /api/v1/questions/