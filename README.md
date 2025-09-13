# Anvaya CRM

A full-stack CRM app where you can manage sales leads and sales agents. 
Built with a React frontend, Express/Node backend, MongoDB database.

---

## Demo Link
Watch a walkthrough (5–7 minutes) of all major features of this app:
[Video Link](https://drive.google.com/drive/folders/1OgSBxnrevRFsLiCMaXhPz7bwGXDh-lrP?usp=drive_link)


---

## Quick Start

```
git clone https://github.com/ravipatelctf/frontend-mp2.git
cd frontend-mp2
npm install
npm run dev
```
---

## Technologies
- React JS
- React Router
- chart.js
- Node.js
- Express
- MongoDB

---

## Features

**Home**
- Displays an overview of sales leads.

**Lead Listing**
- Displays all leads along with the status of the leads.
- “Add New Lead” button opens a form to add new lead.

**Lead Details**
- View full lead information (status, assigned sales agent, etc)
- "Edit Lead Details" to update name, sales agent, status, tags, etc.
- "Delete Lead" button deletes the lead
- Comment section lists all comments and a input box to add new comments

**Agent Listing**
- Displays a list of all the sales agent

**Reports**
- Displays analytics of leads data using charts

## API Reference

#### POST /leads 
**Description:** Add new lead<br>
**Sample Request Body:**
```json
{
  "name": "Acme Corp",
  "source": "Referral",
  "salesAgent": "68b296da56141baf97cae4b9",
  "status": "New",
  "tags": ["High Value", "Follow-up"],
  "timeToClose": 30,
  "priority": "High"
}
```
**Sample Response Body:**
```json
{
    "name": "Acme Corp",
    "source": "Referral",
    "salesAgent": {
        "_id": "68b296da56141baf97cae4b9",
        "name": "Simran Kaur",
        "email": "simran.kaur@anvaya.com",
        "createdAt": "2025-08-30T06:14:50.049Z",
        "updatedAt": "2025-08-30T06:14:50.049Z",
        "__v": 0
    },
    "status": "New",
    "tags": [
        "High Value",
        "Follow-up"
    ],
    "timeToClose": 30,
    "priority": "High",
    "_id": "68c51c3dae07c4dfda4d3e6a",
    "createdAt": "2025-09-13T07:24:45.315Z",
    "updatedAt": "2025-09-13T07:24:45.315Z",
    "__v": 0
}
```

#### **GET	/leads**<br>	 
**Description:** Get all leads<br> 
**Sample Response:**
```json
[
    {
        "_id": "68b6c7e80df5bff0bec3ff6e",
        "name": "EduKids International",
        "source": "Cold Call",
        "salesAgent": {
            "_id": "68b296d656141baf97cae4b6",
            "name": "Arjun Mehta",
            "email": "arjun.mehta@anvaya.com",
            "createdAt": "2025-08-30T06:14:46.392Z",
            "updatedAt": "2025-08-30T06:14:46.392Z",
            "__v": 0
        },
        "status": "Qualified",
        "tags": [
            "children",
            "educational"
        ],
        "timeToClose": 10,
        "priority": "High",
        "createdAt": "2025-09-02T10:33:12.716Z",
        "updatedAt": "2025-09-02T10:33:12.716Z",
        "__v": 0
    }, ...
]
```

#### **POST	/leads/:id**<br>	 	
**Description:** Update Lead details by id<br>		
**Sample Request Body:**
```json
{
    "name": "Indus Fabrics",
    "source": "Website",
    "salesAgent": "68b296d656141baf97cae4b6",
    "status": "New",
    "tags": ["fabrics", "fabrics trader"],
    "timeToClose": 10,
    "priority": "High"
  }
```
**Sample Response Body:**
```json
{
    "_id": "68b6c7e80df5bff0bec3ff6e",
    "name": "Indus Fabrics",
    "source": "Website",
    "salesAgent": {
        "_id": "68b296d656141baf97cae4b6",
        "name": "Arjun Mehta",
        "email": "arjun.mehta@anvaya.com",
        "createdAt": "2025-08-30T06:14:46.392Z",
        "updatedAt": "2025-08-30T06:14:46.392Z",
        "__v": 0
    },
    "status": "New",
    "tags": [
        "fabrics",
        "fabrics trader"
    ],
    "timeToClose": 10,
    "priority": "High",
    "createdAt": "2025-09-02T10:33:12.716Z",
    "updatedAt": "2025-09-13T09:56:14.878Z",
    "__v": 0
}
```

#### **DELETE	/leads/:id**<br> 	
**Description:** Create a new recipe (protected)<br>	
**Sample Response:**
```json
{
    "message": "Lead deleted successfully."
}
```


## Contact
For bugs or feature requests, please reach out to ravipatelctf@gmail.com