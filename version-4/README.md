📝 Writing a README
A well-written README helps others (and your future self!) understand, use, and appreciate your project. Here’s a quick guide to writing one.

📌 What is a README?
A README.md is usually the first thing someone sees in your repo. It gives an overview of what your project is about, how to use it, and how it works.

You spent hours on your project — spend at least 30 minutes writing a clear README. It’s your chance to tell the world what your hard work is all about!

🧹 Tips
Don’t overthink it! Just explain your project clearly
Use headers, bullet points, and links to keep it easy to read
Update the README if your project changes
🎨 Markdown Formatting Tips
README files use Markdown (.md) to style content.

Common Markdown formatting:
# H1 (Main title)
## H2 (Section)
### H3 (Subsection)

**bold text**  
_italic text_  
`inline code`  

- bullet points
1. numbered lists

[Link text](https://example.com)

![Alt text for image](./images/image.png)
Fill Out the Template Below ⬇️
Once you're done filling out the template, paste it into your Github repo's main README.md file!

📝 Your Project's Title — Replace this with your app's name!
📌 Project Description & Purpose
This project is ___________

🚀 Live Site
Here's the link to view the live app: ___________

🖼️ Screenshots
Here is where you'll include a screenshot of your project to show it off!

Instructions to include a screenshot into your README file:

Use Command + Control + Shift + 4 to take a screenshot of your site and copy the screenshot to your clipboard
Find your Github README.md file on the Github website
Edit the site by clicking on the Pencil icon on the top right of the page ✏️
Move your cursor to the position where you want to paste the screenshot, then paste it. Github will convert the pasted screenshot into an <img> tag
Select "Commit changes..." to save your changes
✨ Features
This is what you can do on the app:

🛠️ Tech Stack
Frontend

Languages: ___________
Framework: ___________
Deployment: ___________
Server/API

Languages: ___________
Framework: ___________
Deployment: ___________
Database

Languages: ___________
Deployment: ___________
🔹 API Documentation
These are the API endpoints I built:

Here's the link to the full API documentation: __________

🗄️ Database Schema
Here’s the SQL I used to create my tables:

Put your CREATE TABLE statements here!
If you have more than one table, include them all.
💭 Reflections
What I learned: ___________

What I'm proud of: ___________

What challenged me: ___________

Future ideas for how I'd continue building this project:

🙌 Credits & Shoutouts
If you used any resources for inspiration, tutorials, or documentation, you can mention them here. You can also give a shoutout to anyone who helped you along the way.


ANSWER:


# 🌎 Countries App — Version 4

## 📌 Project Description & Purpose

The Countries App is a full-stack web application that allows users to explore countries around the world and save a favorite country to their profile.

This Version 4 project focuses on deploying a complete full-stack application to the internet. The frontend is built with React and Vite, the backend uses Node.js and Express, and user profile data is stored in a PostgreSQL database.

The application demonstrates how a React frontend communicates with a REST API and a PostgreSQL database in a deployed production environment.

## 🚀 Live Site

View the deployed application here:

**https://cerulean-gnome-229116.netlify.app/**

## 🖼️ Screenshots

### Countries App

*Add a screenshot of the application's home page here.*

### Saved Countries

*Add a screenshot of the Saved Countries/profile page here.*

### Country Details

*Add a screenshot of a country detail page here.*

## ✨ Features

* 🌎 Browse countries from around the world
* 🔎 View country information and details
* 🏳️ View country flags
* 👥 Create and save a user profile
* ❤️ Select and save a favorite country
* 📝 Add a personal bio to a profile
* 💾 Store profile information in a PostgreSQL database
* 🔗 Communicate between the React frontend and Express REST API
* 🚀 Fully deployed application accessible online
* 📱 Navigate between different sections of the application using React Router

## 🛠️ Tech Stack

### Frontend

* **Languages:** JavaScript, HTML, CSS
* **Framework:** React
* **Build Tool:** Vite
* **Routing:** React Router
* **Deployment:** Netlify

### Server/API

* **Language:** JavaScript
* **Runtime:** Node.js
* **Framework:** Express.js
* **API:** REST API
* **Database Connection:** PostgreSQL using `pg`
* **Deployment:** Render

### Database

* **Language:** SQL
* **Database:** PostgreSQL
* **Database Provider:** Neon
* **Deployment:** Neon

## 🔹 API Documentation

The application uses a custom Express REST API to save and retrieve user/profile information.

### API Endpoint

**Save a profile**

```text
POST /api/save-one-country
```

This endpoint accepts profile information including:

* Name
* Email
* Favorite country
* Bio

Example request:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "country_name": "Canada",
  "bio": "Testing Version 4 API"
}
```

The API saves the submitted information to the PostgreSQL database.

## 🗄️ Database Schema

The application uses PostgreSQL to store saved user/profile information.

### Users / Saved Countries Table

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    country_name VARCHAR(255),
    email VARCHAR(255),
    bio TEXT
);
```

The database stores:

* `user_id` — Unique identifier for each saved profile
* `name` — User's name
* `country_name` — User's selected favorite country
* `email` — User's email address
* `bio` — User's personal biography

## 💭 Reflections

### What I learned

I learned how to take a full-stack application from a local development environment to a live production application. I practiced connecting a React frontend to an Express backend and PostgreSQL database, while also learning how deployment platforms such as Netlify, Render, and Neon work together.

I also strengthened my understanding of Git, GitHub, environment variables, REST APIs, database connections, and troubleshooting deployment issues.

### What I'm proud of

I am proud that I was able to deploy a complete full-stack application and make it accessible on the internet.

I am especially proud of getting the frontend, backend, and database working together successfully. The application can save profile information and that information persists after refreshing the live application.

### What challenged me

One of the biggest challenges was understanding how the different pieces of a full-stack application communicate with each other after deployment. Moving from localhost development to a production environment required careful attention to file paths, Git branches, environment variables, API connections, and deployment settings.

Debugging issues along the way helped me better understand how frontend, backend, and database components depend on one another.

### Future Ideas

If I continued developing this project, I would like to:

* Add user authentication and secure login
* Allow users to create multiple saved countries
* Add search and filtering functionality
* Add more detailed country information
* Improve the visual design and accessibility
* Add loading states and improved error handling
* Add automated tests
* Add additional API endpoints for managing saved countries
* Add an AI-powered feature to provide personalized country recommendations

## 🙌 Credits & Shoutouts

* **AnnieCannons** — Course instruction, curriculum, and project guidance
* **REST Countries API** — Country information and country data
* **React** — Frontend framework
* **Vite** — Frontend build tool
* **Node.js & Express** — Backend/server development
* **PostgreSQL / Neon** — Database
* **Netlify** — Frontend deployment
* **Render** — Backend deployment
* **GitHub** — Source code repository and version control

This project was created as part of my Full-Stack Software Engineering training with AnnieCannons.
