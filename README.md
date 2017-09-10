# TattooFormManager
Web app for tattoo artist to manage and store client invoices

## To Start Server
cd backend/
node app.js

## Endpoints

*Header MUST include bearer token
* *POST /auth/login/
Body:
```JSON
{
    "remember": 0
}
```
* *POST /api/user/
Body:
```JSON
{
    "un": "email@example.com", 
    "pw": "3xaMpleP@ssw0rd"
}
```
* *POST /api/invoice/
Body:
```JSON
{
    "user_id": "7f1493961fd74aa0d735edb0",
    "first_name": "Kid", 
    "last_name": "Nicetats", 
    "full_name": "Kid Nicetats",
    "age": 18, 
    "is_minor": false, 
    "addr_l1": "123 Example St. SE",
    "addr_l2": "",
    "addr_city": "Hancock",
    "addr_state": "Michigan",
    "zip": 49930,
    "phone_number": "9061234567",
    "email": "client@example.com",
    "tat_descr": "Nice tat on left ass",
    "tat_compl": "none",
    "comp_haem": false,
    "comp_skin": false,
    "comp_allerg": false,
    "comp_seiz": false,
    "comp_clot": false,
    "comp_preg": false,
    "comp_other": false,
    "tech_name": "Gordon Tatsey",
    "consent": true,
    "date": "08-31-2017"
}
```
* GET /api/search/:userid/
* GET /api/search/:userid/:lookup/
