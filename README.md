# Candidate Search Application

A React and TypeScript application that allows users to search for GitHub users and save potential candidates.

## Features

- Search for GitHub users
- View candidate information including:
  - Name
  - Username
  - Location
  - Avatar
  - Email
  - GitHub Profile URL
  - Company
- Save potential candidates
- View saved candidates
- Remove candidates from saved list

## Technologies Used

- React
- TypeScript
- React Router
- GitHub API
- Local Storage

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:mazagri3/React-and-Type.git
   cd React-and-Type
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a GitHub Personal Access Token:
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate a new token with appropriate permissions
   - Create a `.env` file in the project root and add:
     ```
     VITE_GITHUB_TOKEN=your_token_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The application can be deployed to Render following these steps:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following environment variables:
   - `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token
4. Deploy the application

## Author

Obi Mazagri

## License

This project is licensed under the MIT License. 