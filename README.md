# MongoDB Database Setup – Restaurant Directory Platform 

This README documents the **database layer** for the project where a traditional restaurant directory is transformed into a **personalized, dynamic experience**. The data is stored in a **non‑relational MongoDB** database (BSON/JSON documents). Later sprints will build a **RESTful API with Express.js** that interacts with this database.

<details> 
<summary>Sprint 1</summary>

> This document focuses on the **Sprint 1** requirements and references what will happen in Sprints 2 and 3 to give end‑to‑end context.

---

## Project Details (Challenge 4)

1) **Project**  
The project consists of transforming a restaurant directory platform to offer users a personalized and dynamic experience. To achieve this, **non‑relational databases—specifically MongoDB—**will be used to store data in JSON format. Additionally, a **RESTful API** will be developed using **Express.js** to enable interaction with this data.

2) **Project Deliverables**  
**Sprint 1**: Set up and develop the database in MongoDB, configure a GitHub repository with the basic structure of the project, and **upload a database backup file**, including **created collections** and **import scripts from CSV files**.  
**Sprint 2**: Develop a RESTful API using Express.js and MongoDB; test with Postman/Insomnia and upload it to the repository.  
**Sprint 3**: Extend the API with **search and filtering** features; demonstrate with Postman/Insomnia tests.  
**Final Submission**: Integrate all deliverables and present to Digital NAO evaluators in **two formats**: a **PDF** (analysis & results) and an **MP4** (video presentation).

---

## What this repository contains (Sprint 1)
# scholar-db-mongo

Database setup for the **Google Scholar** project (Sprint 1).  
This repo contains a MongoDB database example, CSV import scripts, a generated backup placeholder, and screenshots.

## 1) Description of the project
This repository initializes a MongoDB database named `scholar_db` with two collections:
- `authors`
- `articles`

It includes:
- Data samples in CSV (`/data`)
- Import scripts in PowerShell (`/scripts`)
- A backup **placeholder** created now (`/backup/dump-YYYYMMDD-HHmm/`) with instructions to generate a real dump
- Screenshots folder (`/screenshots`) for you to place your Compass captures

## Repository structure

```
scholar-db-mongo/
├─ data/
│  ├─ authors.csv
│  └─ articles.csv
├─ scripts/
│  └─ import.ps1
├─ backup/
│  └─ dump-YYYYMMDD-HHmm/   # replace with your real mongodump
├─ screenshots/
│  ├─ 01-database-and-collections.png       # (place yours here)
│  ├─ 02-authors-docs.png                   # (place yours here)
│  └─ 03-articles-indexes.png               # (place yours here)
├─ .gitignore
└─ README.md
```

---

## Installation & Usage

### 1) Prerequisites
- **MongoDB Community Server** (runs as a Windows service)
- **MongoDB Shell (`mongosh`)**
- **MongoDB Database Tools** (*provides `mongoimport`, `mongodump`, `mongorestore`*)
- **MongoDB Compass** (GUI)
- **Git** (to clone and commit to GitHub/GitLab)
- (Optional for later sprints) **Node.js 20+** and **VS Code**

> All have free Community/Free plans suitable for this project.

### 2) Verify tools (Windows PowerShell)
```powershell
sc query MongoDB           # Should show RUNNING
mongosh --version          # Shows the shell version
mongoimport --version      # From Database Tools
mongodump --version        # From Database Tools
```

If `mongoimport`/`mongodump` are not recognized, install **MongoDB Database Tools** or add their `bin` folder to your `PATH`
(e.g., `C:\Program Files\MongoDB\Tools\100\bin`).

![Instalación](Imágenes/1.%20Instalación%20MongoDB.png)



### 3) Create the database and collections

**Option A — MongoDB Compass (GUI):**
1. Connect to `mongodb://localhost:27017`
2. Click your connection (e.g., `localhost:27017`) → **Databases** → **Create database**
3. **Database name**: `restaurant_db`  
   **Collection name**: `restaurants` → **Create Database**
4. Create additional collection(s): `users`, `reviews` (optional for Sprint 1)

**Option B — Mongosh (CLI):**
```javascript
mongosh
use("restaurant_db")
db.createCollection("restaurants")
db.createCollection("users")
```

![Creation](Imágenes/2.%20Creación%20de%20colecciones%20MongoDB.png)

### 4) Definition of a minimal data model

### Steps
1. Open **Compass** and connect to `mongodb://localhost:27017`.
2. Create database `scholar_db` with collections `authors` and `articles` (or just run the import script which creates them automatically).
3. From the project root, run:
   ```powershell
   .\scripts\import.ps1
   ```
4. Verify documents in Compass.
5. Create indexes in Compass:
   - In `articles`: unique index on `articleId` (Ascending 1)
   - In `articles`: text index on `title`
   - (Optional) In `authors`: unique index on `authorId`

![DbCreated](Imágenes/3.%20DB%20created%20in%20MongoDB.png)

### Backup / Restore
A **placeholder** backup folder has been created now at `/backup/dump-20251008-0552/`.  
To generate a real dump on your machine, run:
```powershell
$stamp = Get-Date -Format "yyyyMMdd-HHmm"
mongodump --db scholar_db --out ".\backup\dump-$stamp"
```
To restore (if needed):
```powershell
mongorestore --db scholar_db ".\backup\dump-YYYYMMDD-HHmm\scholar_db"
```


---

## Skills Required

**Hard Skills — Knowledge of:**
- Database management systems
- Databases & data modeling
- Understanding of relational, non‑relational, and distributed databases
- MongoDB

**Technical:**
- Managing non‑relational databases
- JSON format handling
- Proficiency in MongoDB
- Proficiency in Studio 3T (optional alternative to Compass)

**Soft Skills:**
- Results‑oriented
- Quality‑focused
- Analytical thinking
- Teamwork

---

## Licenses / Tools Used

**Sprints 1, 2, and 3**
- **MongoDB**: creation of databases, collections, and indexes (use **Community** edition)
- **GitHub or GitLab**: code storage & version control
- **Visual Studio Code**: IDE

**Sprints 2 and 3**
- **Express.js**: RESTful API development
- **Postman or Insomnia**: API testing

**Note:**  
Visual Studio Code, Express.js, and GitHub are **free**.  
Postman, Insomnia, and MongoDB provide **permanently free** plans with the necessary features. For MongoDB, select **Community**.

---

## Versioning & Commit Style (suggested)

Use **Major.Minor.Patch** and mention it in commit messages, e.g.:
- `feat: initial CSVs and import script (Version 1.0.0)`
- `feat: add text index on restaurants.name (Version 1.1.0)`
- `fix: CSV typo (Version 1.1.1)`

---

## Troubleshooting

- **“mongoimport is not recognized”** → Install **MongoDB Database Tools** or add its `bin` to PATH.  
- **Case conflicts (`restaurant_db` vs `Restaurant_DB`)** → Keep a single, consistent name everywhere.  
- **No data appears in Compass** → Click **Refresh** (circular arrow) after import; ensure you’re viewing `restaurant_db`.  
- **Dump is too large for the repo** → Compress the folder before commit, or clean test data and re‑dump.

---

</details>

## Cost

- **Hourly rate :** $125/hour
- **Estimated effort:** 12 hours (scoping 2h · implementation 7h · verification & README 3h)
- **Estimated total (T&M):** $1,500(guardrail range: $1,125–$1,750 for 9–14h)

## Payment & milestones

- 50% on kickoff · 50% on delivery
- Validity: 14 days · Scope changes billed at $125/h

## Value summary
- Senior expertise (PhD/MSc) · Low-infra cost · Portable DB · Maintainable code


