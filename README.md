# RentHub - Apartment Rental Listing App

RentHub is an Angular-based rental property application where users can browse apartments, search properties, save favourites, post rental listings, and manage their own properties.

## Features

- **Home Page:** Browse available apartments and featured listings.
- **Search and Filter:** Search by apartment title, city, and address; filter by maximum rent.
- **Sorting:** Sort listings by newest, rent (low to high or high to low), and area.
- **Pagination:** Navigate through apartment listings page by page.
- **Featured Carousel:** Browse featured properties using navigation arrows.
- **User Authentication:** Register, log in, and log out.
- **Favourites:** Add or remove properties from favourites.
- **Apartment Details:** View detailed information about a property.
- **Post Property:** Submit property information, amenities, contact details, and an image.
- **Property Preview:** Preview listing information before submission.
- **User Profile:** View your posted properties and delete your listings.

## Technologies Used

- Angular
- TypeScript
- HTML5
- CSS3
- Angular Router
- FormsModule
- Browser LocalStorage

## Prerequisites

Install Node.js and npm before running the project.

Check the installed versions:

    node --version
    npm --version

## Installation and Setup

1. Clone the repository:

       git clone <your-repository-url>

2. Navigate to the project folder:

       cd RentHub

3. Install dependencies:

       npm install

4. Start the Angular development server:

       ng serve

5. Open the application in your browser:

       http://localhost:4200

If Angular CLI is not installed globally, use:

    npx ng serve

## Build

Generate a production build:

    ng build

## Data Storage

The current version uses browser LocalStorage to store posted properties, favourites, and login-related data.

Data is stored locally in the browser and is not shared across devices.

## Security Note

This is a frontend project. LocalStorage-based authentication and ownership checks are suitable for a demo but are not secure for production. A production application should use a backend API, database, and server-side authentication and authorization.

## Future Improvements

- Backend API and database integration
- Secure authentication and route guards
- Edit existing property listings
- Owner-controlled featured listings
- Unit and integration tests
- Application deployment