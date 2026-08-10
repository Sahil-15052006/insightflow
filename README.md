# InsightFlow

**InsightFlow** is a data analytics platform designed to turn raw CSV/XLSX datasets into structured, meaningful insights.

The project is being built as a full-stack data processing system with a **Node.js/Express backend**, **PostgreSQL** for dataset metadata, and a **Python processing worker** for data validation, cleaning, analysis, and insight generation.

The goal is to build more than a simple file-upload application — InsightFlow is being designed around a proper asynchronous data-processing pipeline that can handle uploaded datasets independently from the API layer.

---

## 🚧 Project Status

**Current stage: Backend upload pipeline completed**

### ✅ Completed

- Node.js + Express backend setup
- TypeScript configuration
- File upload API
- Multer integration
- Disk-based temporary file storage
- CSV file support
- XLSX file support
- 100 MB upload limit
- File MIME-type validation
- Upload-specific error handling
- Unique uploaded file naming
- Upload testing with both CSV and XLSX files
- Git repository and project structure

### 🔨 Next

- PostgreSQL database integration
- Dataset metadata schema
- Dataset ID generation
- Store uploaded-file metadata in PostgreSQL
- Dataset status tracking
- Job/processing queue
- Python worker
- CSV/XLSX validation and cleaning
- Dataset profiling
- Statistical analysis
- Automatic insight generation
- Chart/KPI generation
- API for retrieving processed datasets and insights

---

## 🏗️ Planned Architecture

```text
                    ┌──────────────────┐
                    │   Client / App   │
                    └────────┬─────────┘
                             │
                             │ CSV / XLSX
                             ▼
                    ┌──────────────────┐
                    │   Node + Express │
                    │       API        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      Multer      │
                    │ Upload Validation│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Temporary Storage│
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
     ┌─────────────────┐           ┌─────────────────┐
     │   PostgreSQL    │           │   Job Queue     │
     │ Dataset Metadata│           │                 │
     └─────────────────┘           └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │  Python Worker  │
                                   │                 │
                                   │ Validate        │
                                   │ Clean           │
                                   │ Analyze         │
                                   │ Generate        │
                                   │ Insights        │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │ Processed Data  │
                                   │ & Insights      │
                                   └─────────────────┘
```

---

## 🔄 Dataset Processing Flow

The planned dataset lifecycle is:

```text
1. User uploads CSV/XLSX
          ↓
2. Express receives multipart request
          ↓
3. Multer validates the upload
          ↓
4. Generate dataset ID
          ↓
5. Store original file temporarily
          ↓
6. Store dataset metadata in PostgreSQL
          ↓
7. Create processing job
          ↓
8. Python worker picks up the job
          ↓
9. Validate dataset structure
          ↓
10. Clean and normalize data
          ↓
11. Profile the dataset
          ↓
12. Generate statistics
          ↓
13. Generate KPIs / charts / insights
          ↓
14. Store processing results
          ↓
15. API exposes the results
```

---

## 📁 Current Backend Structure

The backend is currently being organized around a modular Express architecture.

```text
backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   │   ├── upload.ts
│   │   └── upload.error.ts
│   ├── routes/
│   ├── services/
│   └── server.ts
│
├── uploads/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

The exact structure will evolve as PostgreSQL, queues, and the Python worker are introduced.

---

## 📤 File Upload System

InsightFlow currently uses **Multer** to handle multipart file uploads.

Supported formats:

- `.csv`
- `.xlsx`

Maximum upload size:

```text
100 MB
```

Uploaded files are currently stored temporarily in:

```text
./uploads
```

Uploaded filenames are given unique identifiers to avoid filename collisions.

Example:

```text
uploads/
└── 550e8400-e29b-41d4-a716-446655440000-sales.csv
```

### Upload Validation

The upload middleware currently validates:

- File MIME type
- Maximum file size
- Expected multipart field
- Multer-specific upload errors

Upload errors are handled separately through:

```text
middleware/upload.error.ts
```

This keeps upload-specific error handling isolated from the rest of the API.

---

## 🗄️ PostgreSQL — Next Development Stage

The next major milestone is introducing PostgreSQL.

The database will store **metadata about datasets rather than treating PostgreSQL as the raw-file storage layer**.

A future dataset record is expected to contain information such as:

```text
datasetId
originalFilename
storedFilename
fileType
fileSize
uploadStatus
processingStatus
createdAt
updatedAt
```

The exact schema will be designed during the PostgreSQL implementation stage.

---

## 🐍 Python Data Processing

Node.js is responsible for the API and application-level workflow.

Python will handle the data-heavy processing layer.

Planned responsibilities include:

- Dataset validation
- CSV/XLSX parsing
- Missing-value analysis
- Data type detection
- Data cleaning
- Duplicate detection
- Statistical summaries
- Column profiling
- Correlation analysis
- KPI generation
- Chart-ready data generation
- Automated insight generation

Planned Python stack:

```text
Python
├── pandas
├── NumPy
└── data-analysis utilities
```

---

## 🧩 Technology Stack

### Backend

- Node.js
- Express.js
- TypeScript
- Multer

### Database

- PostgreSQL

### Data Processing

- Python
- pandas
- NumPy

### Planned Infrastructure

- Redis / queue system
- Object storage
- Background workers

The infrastructure choices may evolve as the project moves toward production-scale processing.

---

## 🎯 Project Goals

InsightFlow is being developed to explore practical backend and data-engineering concepts including:

- REST API design
- Multipart file handling
- File validation
- Error handling
- Database design
- Asynchronous processing
- Job queues
- Background workers
- Dataset lifecycle management
- Data cleaning pipelines
- Analytics
- Scalable backend architecture

The project is intentionally being built incrementally, with each stage introducing a real backend engineering concept rather than putting everything into a single API endpoint.

---

## 🛣️ Roadmap

### Phase 1 — Upload Infrastructure

- [x] Express server
- [x] TypeScript
- [x] Multer integration
- [x] CSV uploads
- [x] XLSX uploads
- [x] File size limits
- [x] File validation
- [x] Upload error handling

### Phase 2 — Dataset Management

- [ ] PostgreSQL connection
- [ ] Dataset schema
- [ ] Dataset ID generation
- [ ] Dataset metadata persistence
- [ ] Dataset status management
- [ ] Dataset lifecycle APIs

### Phase 3 — Processing Pipeline

- [ ] Job queue
- [ ] Worker architecture
- [ ] Python worker
- [ ] Dataset validation
- [ ] Data cleaning
- [ ] Dataset profiling

### Phase 4 — Analytics

- [ ] Statistical summaries
- [ ] KPI generation
- [ ] Automatic chart configuration
- [ ] Correlation analysis
- [ ] Data quality reports
- [ ] Insight generation

### Phase 5 — Product

- [ ] Authentication
- [ ] Dataset dashboard
- [ ] Processing progress
- [ ] Interactive visualizations
- [ ] Dataset history
- [ ] Export functionality

---

## 📌 Current Development Milestone

> **Milestone 1 complete:** InsightFlow can successfully receive and validate CSV/XLSX files through an Express API using Multer, enforce a 100 MB upload limit, store files temporarily, and handle upload-specific errors.

**Next milestone:** Connect the upload pipeline to PostgreSQL and persist dataset metadata.

---

## ⚠️ Development Status

InsightFlow is currently an **active development project**.

The architecture, database schema, processing pipeline, and technology choices may change as implementation progresses.

This repository currently represents the backend development process and is not yet a production-ready analytics platform.
