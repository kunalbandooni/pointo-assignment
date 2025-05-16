<h1 align="center">📝 Task Management System</h1>

<p align="center">
  <strong>A full-stack task manager built with Java Spring Boot, PostgreSQL, React, and Docker.</strong><br />
</p>

<br />

<p align="center" style="background-color: #f0f0f0; padding: 1rem;">
  <img src="Task_management_system_architecture.png" alt="System Architecture" width="600"/>
</p>

---

<h2>🔧 Tech Stack</h2>

<table>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>React (Vite), CSS</td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>Spring Boot (Java 17), Gradle, REST APIs, JPA</td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td>PostgreSQL hosted on AWS RDS</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>Docker, Docker Compose</td>
  </tr>
</table>

---

<h2>📁 Project Structure</h2>

```bash
task-manager/
├── backend/              # Spring Boot backend
│   ├── src/
│   ├── build.gradle
│   ├── Dockerfile
├── frontend/             # Vite + React frontend
│   ├── src/
│   ├── Dockerfile
├── docker-compose.yml    # Multi-container setup
└── README.md
```

<h2>🚀 Features</h2> 
<ul> 
    <li>📌 Create, edit, delete tasks (with soft delete)</li> 
    <li>📥 Organize tasks by status: <code>TODO → IN PROGRESS → DONE</code></li> 
    <li>🎯 Filter tasks based on priority (LOW, MEDIUM, HIGH)</li> 
    <li>🕒 Track due dates, creation and update timestamps</li> 
    <li>📦 Fully dockerized setup for local or production deployment</li>
</ul>

<h2>🧪 API Endpoints</h2> 
    <table>
        <thead> 
            <tr> 
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>GET</td>
                <td>/tasks</td>
                <td>Fetch all active (not deleted) tasks</td>
            </tr>
            <tr><td>POST</td><td>/tasks</td><td>Create a new task</td></tr> 
            <tr><td>PUT</td><td>/tasks/{id}</td><td>Update title, description, priority, etc.</td></tr> 
            <tr><td>PATCH</td><td>/tasks/{id}?status</td><td>Update task status only</td></tr>
            <tr><td>DELETE</td><td>/tasks/{id}</td><td>Soft delete the task</td></tr> 
        </tbody>
    </table>



<h3>🔁 Run Entire Stack using Docker</h3>

#### NOTE: Make sure to setup application-dev.properties with db details.

```bash
./Backend/gradlew -p Backend build
docker-compose down --volumes --remove-orphans
docker-compose up --build
```

<h3>📍 App URLs</h3>
<ul>
    <li>Frontend: <a href="http://localhost:3000">http://localhost:3000</a></li>
    <li>Backend API: <a href="http://localhost:8080">http://localhost:8080</a></li>
</ul>

<h2>🧩 UI Overview</h2> 
<ul> 
    <li>🧱 Three-column layout: <strong>TODO | IN PROGRESS | DONE</strong></li> <li>📋 Task cards with truncate view and click-to-edit modal</li> 
    <li>📝 Create and Edit forms (title, description, priority, due date)</li> 
    <li>🧽 Actions: Edit, Delete, Move Next, Move Previous</li> 
    <li>🎛️ Priority-based filtering</li> 
</ul>


<h2>🗃️ Future Improvements</h2>
<ul>
    <li>✅ JWT-based authentication</li>
    <li>♻️ Restore soft-deleted tasks</li>
    <li>👥 Multiple Task boards for different people.</li>
</ul>

<h2>🛠️ Developer Notes</h2>
<ul>
    <li>Build Tool: Gradle was used for backend for faster builds and simplified dependency management.</li>
    <li>Deployment: Both frontend and backend are containerized for easy setup using Docker Compose.</li>
    <li>Design Consideration: Used soft delete to enable future archival or recovery features in version 2.</li>
    <li>Another feature for v2: Introducing multiple task boards.</li>
</ul>

[//]: # (<h2>🤝 Contact</h2>)
[//]: # (<p>Developed by <strong>[Kunal Bandooni]</strong> | <em>Software Engineer</em></p>)
[//]: # (<p>Connect with me on <a href="https://linkedin.com/in/your-profile" target="_blank">LinkedIn</a> or check out my other work on <a href="https://github.com/your-github">GitHub</a>.</p> ```)

[//]: # (```)
[//]: # (docker-compose down --volumes --remove-orphans)
[//]: # (docker-compose up --build)
[//]: # (docker-compose up --build)
[//]: # (```)