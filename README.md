# Challenge4
This is the Repository for Challenge 4 in Techno Ready 

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

## 2) Installation and usage instructions

### Prerequisites
- MongoDB Community Server (includes `mongosh`, `mongoimport`, `mongodump`)
- MongoDB Compass (GUI)
- Git

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

## 3) Repository structure
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

## Versioning (XXX Guidelines)
Versions as **Major.NewFeatures.Revisions**:
- **Major**: breaking changes
- **New Features**: additions
- **Revisions**: minor fixes

Examples:
- `Version 1.0.0` – Initial structure and import scripts
- `Version 1.1.0` – Added text index in `articles.title`
- `Version 1.1.1` – Fixed CSV sample typo

## Access permissions
- Add collaborators (Digital NAO team) in **Settings → Collaborators**.
- If private, they must accept the invitation.
