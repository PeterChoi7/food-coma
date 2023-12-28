
# Food Coma - A MERN Stack Web Application

## Introduction

Recipe Explorer is a modern web application designed for food enthusiasts who love exploring various cuisines and recipes. This app allows users to search for recipes based on ingredients, view detailed cooking instructions, and save their favorite recipes for future reference. Built with the MERN stack (MongoDB, Express.js, React, Node.js), Recipe Explorer offers a seamless and interactive experience for its users.

## Features

- **Diverse Cuisine Options:** Access a wide range of recipes from different cuisines, each with detailed instructions and ingredient lists.
- **Ingredient-based Search:** Find recipes by entering ingredients you have, making it easier to plan meals with what’s available.
- **Personalized Recipe Collection:** Users can create an account to save their favorite recipes, which can be accessed anytime in the 'Saved' section.
- **User Authentication:** Secure sign-up and login processes using JSON Web Token and Bcrypt.js for enhanced security.
- **Responsive Design:** Optimized for both desktop and mobile devices, ensuring a user-friendly experience across all platforms.

## Technical Details

- **Front-end Development:** Built with React, providing a dynamic and responsive user interface.
- **Back-end Development:** Utilizing Node.js and Express.js for efficient server-side management.
- **Database Management:** MongoDB for storing user data and recipe information in a structured format.
- **API Integration:** Real-time recipe data retrieval and management through various external APIs.
- **Security:** JSON Web Tokens (JWT) and Bcrypt.js for secure authentication and data protection.
- **Hosting and Storage:** Deployed on AWS using services like Route 53 for DNS management and S3 for scalable storage solutions.

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone [repository-link]
   cd recipe-explorer
   ```

2. **Install Dependencies:**
   - For the server:
     ```bash
     cd server
     npm install
     ```
   - For the client:
     ```bash
     cd client
     npm install
     ```

3. **Environment Setup:**
   - Create a `.env` file in the server directory.
   - Add your MongoDB URI, JWT secret, and other environment-specific variables.

4. **Run the Application:**
   - Start the server:
     ```bash
     npm start
     ```
   - Start the client:
     ```bash
     cd client
     npm start
     ```

## Contribution

Contributions to improve Recipe Explorer are welcome. Please ensure to follow the project's code of conduct and submit your pull requests for review.

## Support

For any assistance or feedback, please contact the support team at [support-email].

---

**Note:** This README provides a general overview and setup guide for the Recipe Explorer application. Modify the repository link, environment variables, and support email according to your project specifics.
