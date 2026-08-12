# CommuniCraft

CommuniCraft is a collaborative crafting platform designed to connect users through shared craft projects, skills, resources, and local partnerships.

## Backend

The backend is built using:

- **Node.js**
- **Express.js**
- **MySQL**
- **Postman** for API testing

The backend follows the **MVC (Model-View-Controller) architecture**:

- **Models** — handle database interaction and data structure.
- **Controllers** — handle application logic and business operations.
- **Routers** — define and organize the API endpoints.

## Main Features

- **Project Library** — browse and manage shared craft projects.
- **Skill Matching** — connect users based on their crafting skills.
- **Showcase and Sharing** — allow users to share and showcase their completed work.
- **Resource Sharing** — share useful crafting resources with the community.
- **Local Partnership Integration** — support collaboration with local partners.
- **Weather API Integration** — provide weather-related information within the platform.

## Project Structure

```text
backend/
├── controllers/       # Application and business logic
├── models/            # Database models
├── routes/            # API routes
├── middlewares/       # Express middleware
├── app.js             # Main application entry point
├── database.example.js # Example database configuration
├── package.json       # Project dependencies and scripts
└── package-lock.json
```

## Documentation

Detailed documentation about the project features, architecture, development tools, and other project information is available in the [CommuniCraft Wiki](../../wiki).

## Project Status

The project was developed collaboratively by four team members across multiple branches. The different branches contain the implemented parts of the project, while the Wiki provides detailed documentation about the project.

## Technologies

| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | Web framework and API development |
| MySQL | Database |
| Postman | API testing |
| Weather API | Weather data integration |
