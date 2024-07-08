Here's a comprehensive README file for your React2Give project, incorporating all necessary details and your GitHub repository link:

---

# React2Give

## Description

React2Give is a single-page application designed to connect potential donors with various charities. Users can browse through a list of charities, search and filter them based on their interests, and make donations seamlessly using Stripe. The application is built with the MERN stack, featuring a polished, responsive UI styled with Tailwind CSS, Chakra UI, and FontAwesome icons.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Screenshots](#screenshots)
- [Deployed Application](#deployed-application)

## Features

- **Browse Charities**: View a list of charities with detailed information.
- **Search and Filter**: Easily find charities based on name or category.
- **User Authentication**: Sign up, log in, and manage user profiles with JWT authentication.
- **Donation System**: Secure payment processing through Stripe.
- **User Dashboard**: Track donation history and manage accounts.
- **Responsive Design**: Mobile-friendly and responsive UI.

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
  - Chakra UI
  - FontAwesome
  - Apollo Client

- **Backend**:
  - Node.js
  - Express.js
  - GraphQL
  - MongoDB with Mongoose

- **Payment Processing**:
  - Stripe

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Igimbayeva/React2Give.git
    cd React2Give
    ```

2. **Install dependencies**:
    ```bash
    npm install

    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your environment variables:
    ```
    DB_NAME='your_db_name'
    DB_USER='postgres'
    DB_PASSWRD='your_password'
    STRIPE_SECRET_KEY='your_stripe_secret_key'
    JWT_SECRET='your_jwt_secret'
    ```

4. **Run the application**:
    ```bash
    npm run develop
    ```

## Usage

- **Browse Categories**: Navigate through a list of available charities.
- **User Authentication**: Sign up or log in to your account.
- **Make Donations or purchase donated items**: Donate to your chosen charity using the secure Stripe payment gateway.
- **User Dashboard**: View your donation history and manage your account settings.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Screenshots

![Home Page](path_to_homepage_screenshot)
![Charity Details](path_to_charity_details_screenshot)
![Donation Page](path_to_donation_page_screenshot)

## Deployed Application

Check out the live application [here](link_to_deployed_application).

