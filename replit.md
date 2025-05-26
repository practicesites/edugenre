# Edu-genre - Educational Platform

## Overview

Edu-genre is a web application focused on education related to gender inclusivity and diversity. The platform includes a public-facing website with articles, activities, and resources, as well as an administrative interface for content management. The project is currently structured as a static HTML/CSS/JS site that appears to be transitioning to a Flask-based application with a database backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built using HTML, CSS, and JavaScript with Bootstrap 5 as the UI framework. It follows a typical web application structure with:

- Public-facing pages (index.html, blog.html, activities.html, etc.)
- Administrative dashboard (admin/index.html and related pages)
- Responsive design using Bootstrap's grid system
- FontAwesome for icons

The frontend is static HTML with client-side JavaScript for interactive features. There's evidence (from pyproject.toml and .replit) that the project is moving to integrate a Flask backend.

### Backend

The backend is being developed with:

- Python 3.11 with Flask framework
- SQLAlchemy for ORM functionality 
- PostgreSQL as the intended database
- Email validation capabilities

The backend is still in development, with dependencies set up but not much implementation visible in the repository yet.

### Authentication

Authentication is planned but not fully implemented. The current HTML structure shows:

- Login/registration links in the navigation
- Admin section with user role information
- No visible backend authentication logic yet

## Key Components

### Public Website

1. **Navigation System**: Main navigation with links to all major sections
2. **Content Pages**: 
   - Blog articles
   - Educational activities
   - Resource library (books)
   - Contact page
   - About page
3. **Newsletter Subscription**: Client-side form with validation

### Admin Dashboard

1. **Sidebar Navigation**: Context-specific navigation with active state indicators
2. **Content Management**:
   - Articles management
   - Activities management
   - Books/resources management
   - Messages/contact management
3. **Dashboard Overview**: Statistics and metrics display

## Data Flow

The intended data flow appears to be:

1. Admin users create and manage content through the admin interface
2. Content is stored in a PostgreSQL database via Flask and SQLAlchemy
3. Public users view content rendered by Flask templates
4. User interactions (contact forms, newsletter signups) are processed by the backend

## External Dependencies

### Frontend Dependencies

- Bootstrap 5.3.0 (via CDN)
- FontAwesome 6.4.0 (via CDN)
- Chart.js (for admin dashboard visualizations)

### Backend Dependencies

- Flask 3.1.1
- Flask-SQLAlchemy 3.1.1
- Email-validator 2.2.0
- Gunicorn 23.0.0 (WSGI server)
- Psycopg2-binary 2.9.10 (PostgreSQL adapter)

## Deployment Strategy

The deployment strategy uses Replit's infrastructure:

- Gunicorn as the WSGI server
- Port 5000 for the application
- Python 3.11 runtime
- PostgreSQL database
- OpenSSL packages for security
- Replit autoscaling for deployment

## Development Roadmap

The repository suggests the following development steps:

1. Complete transition from static HTML to Flask templates
2. Implement database models and ORM relationships
3. Create backend API endpoints for admin functions 
4. Add user authentication and authorization
5. Improve frontend interactivity with more JavaScript functionality
6. Connect newsletter and contact forms to backend processing

## Database Schema

While not explicitly defined in the code, the website structure suggests the following database models:

1. Users (admin users, regular users)
2. Articles (blog content)
3. Activities (educational activities)
4. Books/Resources (library resources)
5. Messages (from contact form)
6. Newsletter subscribers