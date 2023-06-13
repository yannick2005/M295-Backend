# LB2 - Prüfung M295

## Endpunkte
Es gibt insgesamt 5 Endpunkte bezügliche den Tasks:
    GET `/tasks`
    POST `/tasks`
    GET `/tasks/{id}`
    PUT `/tasks/{id}`
    DELETE `/tasks/{id}`

Bezüglich der Authorisierung gibt es 3 Endpunkte:
    GET `/verify`
    POST `/login`
    DELETE `/logout`

Get `tasks`, wird verwendet um alle Tasks anzeigen zu lassen
POST `tasks`, wird verwendet um einen Task zu erstellen mit den Inhalt von id, Titel, Beschreibung, erlidigungsdatum und ob es gemacht wurde.
GET `/tasks/{id}`, wird verwendet um ein einzelnen Task anzeigen zu lassen.
PUT `/tasks/{id}`, wird verwendet um ein bereits bestehendes Task zu updaten.
DELETE `/tasks/{id}`, wird verwendet um ein Task zu löschen.

GET `/verify`, anzeigen zu lassen ob man eingeloggt ist oder nicht.
POST `/login`, um sich einloggen zu können.
DELETE `/logout`, um sich auszuloggen.

Ohne sich einzuloggen kann man keine der oben genannten Endpunkte abfragen.

Mehr informationen finden Sie hier: [Swagger description](./swagger-description.yaml)

Written by: Yannick Schönhaar