# Anvaya CRM

A full-stack CRM app where you can manage sales leads and sales agents. 
Built with a React frontend, Express/Node backend, MongoDB database.

---

## Demo Link

[Live Demo](https://drive.google.com/drive/folders/1yDD9mhJzygoMbtzXZZC14kA7ukLaHFED?usp=sharing)  

---

## Quick Start

```
git clone https://github.com/ravipatelctf/frontend-mp2.git
cd frontend-mp2
npm install
npm run dev
```

## Technologies
- React JS
- React Router
- chart.js
- Node.js
- Express
- MongoDB

## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://drive.google.com/drive/folders/1OgSBxnrevRFsLiCMaXhPz7bwGXDh-lrP?usp=drive_link)

## Features

**Sidebar**
- Lists links to all major parts of webapp.

**Home**
- Displays an overview of sales leads.

**Leads Listing**
- Display all leads along with the status of the leads.
- “Add New Lead” button opens a form to add new lead.

**Lead Details**
- View full lead information (status, assigned sales agent, etc)
- "Edit Lead Details" to update name, sales agent, status, tags, etc.
- "Delete Lead" button deletes the lead
- Comment section lists all comments and a input box to add new comments

## API Reference

### **POST	/leads**<br>	 
Add new lead<br>	 
Sample Request Body:<br>
```{ name: "Adventurous Fabwears", status: "New", ... }```
Sample Response Body:<br>
```{ _id, name, salesAgent, ... }```

### **GET	/leads**<br>	 
List all leads<br>	 
Sample Response:<br>
```[{ _id, name, salesAgent, ... }, …]```

### **POST	/leads/:id**<br>	 	
Update Lead details by id<br>		
Sample Request Body:<br>
```{ name: "Bright Mind Publishers", status: "Closed", ... }```
Sample Response Body:<br>
```{ _id, name, salesAgent, ... }```

### **DELETE	/leads/:id**<br> 	
Create a new recipe (protected)<br>	
Sample Response:<br>
```{ _id, title, summary, ... }```

## Contact
For bugs or feature requests, please reach out to ravipatelctf@gmail.com