# Sprint Retrospective Idea Board

A simple web app for running sprint retrospectives, built with Firebase and vanilla JavaScript.

## Features

- **Manual Email/Password Authentication:**  
  Users can sign up and log in using their email and password.  
  (Google Auth is removed for simplicity and privacy.)

- **Admin Dashboard:**  
  Authenticated users can create new boards, view all boards, and copy/share board links.

- **Board View:**  
  Each board allows team members to add ideas under "Went Well" and "Not Went Well" columns.

- **Real-Time Updates:**  
  Boards update instantly for all users using Firebase Firestore.

- **Copy Board Link:**  
  Easily copy and share board links with your team.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/pankajjoshi1005/ideaboard.git
   ```

2. **Firebase Setup:**
   - Create a Firebase project.
   - Enable Authentication (Email/Password).
   - Enable Firestore Database.
   - Replace the config in `firebase-config.js` with your Firebase credentials.

3. **Run Locally:**
   - Open `index.html` in your browser.
   - Sign up or log in with your email and password.
   - Access the admin dashboard to create and manage boards.

4. **Deploy to GitHub Pages:**
   - Push your changes to GitHub.
   - Enable GitHub Pages in your repository settings.

## File Structure

- `index.html` — Login and signup page.
- `admin.html` — Admin dashboard for managing boards.
- `board.html` — Board view for team collaboration.
- `firebase-config.js` — Firebase initialization.
- `app.js` — Handles authentication and app logic.
- `styles.css` — App styling.

## Support

If you have trouble logging in or need a new user created, please contact **Pankaj Joshi** @ **8570961005** or **joshijipankaj@gmail.com** .

---

**Enjoy running your retrospectives!**
