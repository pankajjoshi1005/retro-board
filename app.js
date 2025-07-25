import { auth } from './firebase-config.js';
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    const signInButton = document.getElementById('googleSignIn');
    
    signInButton.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Successfully signed in:", user);
            // Redirect to admin page after successful login
            window.location.href = 'admin.html';
        } catch (error) {
            console.error("Error signing in:", error);
            alert("Error signing in: " + error.message);
        }
    });
});

// Check if user is already signed in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log("User is already signed in:", user);
        window.location.href = 'admin.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Check if user is admin
            firebase.auth().currentUser.getIdTokenResult()
                .then((idTokenResult) => {
                    if (idTokenResult.claims.admin) {
                        setupAdminUI();
                    } else {
                        window.location.href = '/'; // Redirect non-admins
                    }
                });
        } else {
            window.location.href = '/login.html'; // Redirect to login page
        }
    });
});

function setupAdminUI() {
    const createBoardButton = document.getElementById('createBoardButton');
    createBoardButton.style.display = 'block';
    createBoardButton.addEventListener('click', createNewBoard);
    loadBoards();
}

function createNewBoard() {
    const boardTitle = prompt('Enter board title:');
    if (boardTitle) {
        const boardData = {
            title: boardTitle,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: firebase.auth().currentUser.uid
        };

        firebase.firestore().collection('boards')
            .add(boardData)
            .then(() => {
                alert('Board created successfully!');
                loadBoards();
            })
            .catch(error => {
                console.error('Error creating board:', error);
                alert('Error creating board');
            });
    }
}

function loadBoards() {
    firebase.firestore().collection('boards')
        .get()
        .then(snapshot => {
            const boardsList = document.getElementById('boardsList') || document.createElement('div');
            boardsList.id = 'boardsList';
            boardsList.innerHTML = '';
            
            snapshot.forEach(doc => {
                const board = doc.data();
                const boardElement = document.createElement('div');
                boardElement.className = 'board-item';
                boardElement.innerHTML = `
                    <h3>${board.title}</h3>
                    <p>Created: ${board.createdAt?.toDate().toLocaleDateString()}</p>
                `;
                boardsList.appendChild(boardElement);
            });

            if (!document.getElementById('boardsList')) {
                document.body.appendChild(boardsList);
            }
        })
        .catch(error => {
            console.error('Error loading boards:', error);
        });
}