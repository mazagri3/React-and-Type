// Created by Obi Mazagri
// This interface defines the structure of a GitHub user object
// Used to type the data returned from the GitHub API

export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  location: string;
  email: string | null;
  company: string | null;
} 