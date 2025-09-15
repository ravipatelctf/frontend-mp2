# Anvaya CRM

A full-stack CRM app where you can manage sales leads and sales agents. 
Built with a React frontend, Express/Node backend, MongoDB database.

---

## Demo Link
Watch a walkthrough (5 minutes) of all major features of this app:
[Video Link](https://drive.google.com/drive/folders/1bXfdFuiQuG2VnTvE9CPctbqODyjZtsDb?usp=drive_link)


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

## 📖 API Reference

### 🌐 lead routes

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
**Description:** Update lead details by id<br>		
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

#### **DELETE	/leads/:id**
**Description:** Delete a lead by id<br>	
**Sample Response:**
```json
{
    "message": "Lead deleted successfully."
}
```

### 🌐 agent routes

#### POST /agents
**Description:** Add new agent<br>
**Sample Request Body:**
```json
{
    "name": "Price Kumar",
    "email": "kumar.price1@anvaya.com"
}
```
**Sample Response Body:**
```json
{
    "name": "Price Kumar",
    "email": "kumar.price1@anvaya.com",
    "_id": "68c7a5493880d38922bec4e3",
    "createdAt": "2025-09-15T05:34:01.635Z",
    "updatedAt": "2025-09-15T05:34:01.635Z",
    "__v": 0
}
```

#### **GET	/agents**<br>	 
**Description:** Get all agents<br> 
**Sample Response:**
```json
[
    {
        "_id": "68b296d656141baf97cae4b6",
        "name": "Arjun Mehta",
        "email": "arjun.mehta@anvaya.com",
        "createdAt": "2025-08-30T06:14:46.392Z",
        "updatedAt": "2025-08-30T06:14:46.392Z",
        "__v": 0
    }
]
```

#### **DELETE	/agents/:id**<br> 	
**Description:** Delete an agent by id<br>	
**Sample Response:**
```json
{
    "message": "Agent deleted successfully."
}
```

### 🌐 comment routes

#### POST /leads/:id/comments
**Description:** Add new comment by lead id<br>
**Sample Request Body:**
```json
{
    "agentId": "68b296da56141baf97cae4bb",
    "commentText": "This is test comment 2."
}
```
**Sample Response Body:**
```json
{
    "lead": null,
    "author": {
        "_id": "68b296da56141baf97cae4bb",
        "name": "Rakesh Verma",
        "email": "rakesh.verma@anvaya.com",
        "createdAt": "2025-08-30T06:14:50.250Z",
        "updatedAt": "2025-08-30T06:14:50.250Z",
        "__v": 0
    },
    "commentText": "This is test comment 2.",
    "_id": "68c7a6f93880d38922bec4e7",
    "createdAt": "2025-09-15T05:41:13.188Z",
    "updatedAt": "2025-09-15T05:41:13.188Z",
    "__v": 0
}
```

#### **GET	/leads/:id/comments**	 
**Description:** Get all comments by lead id<br> 
**Sample Response:**
```json
[
    {
        "_id": "68bc1a125fc9c385a6e7b2a3",
        "lead": null,
        "author": {
            "_id": "68b296da56141baf97cae4bb",
            "name": "Rakesh Verma",
            "email": "rakesh.verma@anvaya.com",
            "createdAt": "2025-08-30T06:14:50.250Z",
            "updatedAt": "2025-08-30T06:14:50.250Z",
            "__v": 0
        },
        "commentText": "This is a test comment 2.",
        "createdAt": "2025-09-06T11:25:06.889Z",
        "updatedAt": "2025-09-06T11:25:06.889Z",
        "__v": 0
    }
]
```

#### **DELETE	/leads/:id/comments**	
**Description:** Delete a comment by comment id<br>	
**Sample Response:**
```json
{
    "message": "Comment deleted successfully."
}
```

## Contact
For bugs or feature requests, please reach out to ravipatelctf@gmail.com