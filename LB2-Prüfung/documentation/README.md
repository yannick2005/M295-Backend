# LB2 - Prüfung M295

## Endpunkte
Es gibt insgesamt 5 Endpunkte bezügliche den Tasks: <br>
    GET `/tasks` <br>
    POST `/tasks` <br>
    GET `/tasks/{id}` <br>
    PUT `/tasks/{id}` <br>
    DELETE `/tasks/{id}` <br>

Bezüglich der Authorisierung gibt es 3 Endpunkte: <br>
    GET `/verify` <br>
    POST `/login` <br>
    DELETE `/logout` <br>

Get `tasks`, wird verwendet um alle Tasks anzeigen zu lassen. <br>
POST `tasks`, wird verwendet um einen Task zu erstellen mit den Inhalt von id, Titel, Beschreibung, erlidigungsdatum und ob es gemacht wurde. <br>
GET `/tasks/{id}`, wird verwendet um ein einzelnen Task anzeigen zu lassen. <br>
PUT `/tasks/{id}`, wird verwendet um ein bereits bestehendes Task zu updaten. <br>
DELETE `/tasks/{id}`, wird verwendet um ein Task zu löschen. <br>
<br>
GET `/verify`, anzeigen zu lassen ob man eingeloggt ist oder nicht. <br>
POST `/login`, um sich einloggen zu können. <br>
DELETE `/logout`, um sich auszuloggen. <br>

Ohne sich einzuloggen kann man keine der oben genannten Endpunkte von Tasks abfragen.

Mehr Informationen finden Sie hier: [Swagger description](./swagger-description.yaml) <br>
<br>
<b>Written by:</b> <i>Yannick Schönhaar</i>