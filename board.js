const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get('id');

function loadBoard() {
    db.collection('boards').doc(boardId).get()
        .then((doc) => {
            if (doc.exists) {
                const board = doc.data();
                document.getElementById("boardTitle").textContent = board.title;
                updateIdeas('wentWell', board.wentWell);
                updateIdeas('wentBad', board.wentBad);
            } else {
                alert("Board not found!");
            }
        })
        .catch((error) => {
            alert("Error loading board: " + error);
        });
}

function updateIdeas(type, ideas) {
    const container = document.getElementById(type);
    container.innerHTML = '';
    ideas.forEach(idea => {
        container.innerHTML += `
            <div class="idea-card">
                ${idea.text}
                <small>Added by: ${idea.author}</small>
            </div>
        `;
    });
}

function addIdea(type) {
    const input = document.getElementById(`new${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const ideaText = input.value.trim();
    if (!ideaText) return;

    const idea = {
        text: ideaText,
        author: auth.currentUser ? auth.currentUser.email : 'Anonymous',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection('boards').doc(boardId).update({
        [type]: firebase.firestore.FieldValue.arrayUnion(idea)
    })
    .then(() => {
        input.value = '';
        loadBoard();
    })
    .catch((error) => {
        alert("Error adding idea: " + error);
    });
}

// Real-time updates
function setupRealTimeUpdates() {
    db.collection('boards').doc(boardId)
        .onSnapshot((doc) => {
            if (doc.exists) {
                const board = doc.data();
                document.getElementById("boardTitle").textContent = board.title;
                updateIdeas('wentWell', board.wentWell);
                updateIdeas('wentBad', board.wentBad);
            }
        });
}

// Initialize board
if (boardId) {
    setupRealTimeUpdates();
}