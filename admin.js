import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase-config.js';

window.signInWithGoogle = function() {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            window.location.href = 'admin.html';
        })
        .catch((error) => {
            console.error('Google Sign In Error:', error);
            alert(error.message);
        });
}

function signInWithGoogle() {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            window.location.href = 'admin.html';
        })
        .catch((error) => {
            console.error('Google Sign In Error:', error);
            alert(error.message);
        });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user.email);
    } else {
        console.log('User is signed out');
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