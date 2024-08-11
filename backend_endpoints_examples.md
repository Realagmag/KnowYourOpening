Usage examples:  
USER ENDPOINTS:  
Registration:  
POST http://localhost:8080/register  
{  
    "username" : "kkarpiuk", \
    "password" : "0123" \
}

Login:  
POST http://localhost:8080/login  
{  
    "username" : "kkarpiuk",  
    "password" : "0123"  
}  
WARNING: In response you'll get jwtToken:  
{  
    "jwtToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNaWNoYcWCIiwiaWF0IjoxNzE2NTc0MDUzLCJleHAiOjE3MTY2NjA0NTN9.O_DlLqnEu6dPsVmW3OFBs5SGGpAHA_seY8uFtUoHlLQ",  
    "username": "kkarpiuk",  
    "roles": []  
}  
You need to save it and attach with every next request in HTTP Authorization field like this:  
Bearer <token>  
In this particular scenario:  
Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNaWNoYcWCIiwiaWF0IjoxNzE2NTc0MDUzLCJleHAiOjE3MTY2NjA0NTN9.O_DlLqnEu6dPsVmW3OFBs5SGGpAHA_seY8uFtUoHlLQ  

GAME ENDPOINTS:  
Start random game:  
GET http://localhost:8080/game/new  

Start game with given id:  
GET http://localhost:8080/game/new/{id}  

Make a move. Should be in this format -> e2-e4:  
PUT http://localhost:8080/game/{move}  
Content-Type: application/x-www-form-urlencoded  

Inform about player making a mistake:  
PUT http://localhost:8080/game/mistake  

OPENING ENDPOINTS:  
Get all openings from database regardless of the authors:  
GET http://localhost:8080/opening  
    {  
        "id": 4,  
        "name": "Hiszpan",  
        "moveSequence": "e2-e4e7-e5g1-f3",  
        "description": "Mucho gusto",  
        "playerSide": "white",  
        "creationDate": "2024-05-24",  
        "createdBy": "Michał"  
    }  

Get all openings subscribed by a user:  
GET http://localhost:8080/opening/user  

Add new opening to the database (subscription is created automatically):  
POST http://localhost:8080/opening  
Content-Type: application/json  
{  
    "name" : "Włoch",  
    "moveSequence" : "d2-d4d7-d5g1-f3",  
    "description" : "Spod pach",  
    "playerSide" : "white"  
}  

Delete opening from database (Only user that added this opening can delete it):  
DELETE http://localhost:8080/opening/{id}  

Subscribe to opening:  
PUT http://localhost:8080/opening/subscribe/{id}  

Cancel opening's subscription:  
DELETE http://localhost:8080/opening/unsub/{id}  

Gives global openings that name starts with nameFrag:  
GET http://localhost:8080/opening/{nameFrag}  

Start to record move sequence to add it later as opening:  
GET http://localhost:8080/opening/new/start  

Make a move while recording new opening (move in format -> e2-e4):  
PUT http://localhost:8080/opening/new/{move}  

Save recorded opening. Give additional info. playerSide attribute should be "black" or "white":  
POST http://localhost:8080/opening/new/save  
{  
    "name" : "nagrany opening"  
    "description" : "projekt na piątkę"  
    "playerSide" : "black"  
}  

Get all stats about user's openings:  
GET http://localhost:8080/opening/stats  
{  
    "opening": 10,      // opening id  
    "correct": 0,  
    "incorrect": 0,  
    "lastTrained": 0    // days from lats training  
}  
