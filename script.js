const BACKEND_URL = 'https://pxk6766-pdf-chatbot-backend.hf.space';

function uploadPDF() {
    const fileInput = document.getElementById('pdfFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('⚠️ Please select a PDF file!');
        return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    const btn = event.target;
    btn.disabled = true;
    btn.textContent = '📤 UPLOADING...';
    
    fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        btn.disabled = false;
        btn.textContent = '📤 UPLOAD';
        alert(data.message || data.detail);
    })
    .catch(error => {
        btn.disabled = false;
        btn.textContent = '📤 UPLOAD';
        console.error('Error:', error);
        alert('❌ Upload failed. Is backend running?');
    });
}

function askQuestion() {
    const questionInput = document.getElementById('question');
    const question = questionInput.value.trim();
    const answerText = document.getElementById('answerText');
    const answerDiv = document.getElementById('answer');
    
    if (!question) {
        alert('⚠️ Please enter a question!');
        return;
    }
    
    answerText.textContent = "🤔 Thinking...";
    answerDiv.style.display = 'block';
    
    const btn = event.target;
    btn.disabled = true;
    btn.textContent = '💬 PROCESSING...';
    
    fetch(`${BACKEND_URL}/ask`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ question: question })
    })
    .then(response => response.json())
    .then(data => {
        btn.disabled = false;
        btn.textContent = '💬 ASK';
        answerText.textContent = data.answer || data.detail;
    })
    .catch(error => {
        btn.disabled = false;
        btn.textContent = '💬 ASK';
        console.error('Error:', error);
        answerText.textContent = "❌ Error. Is backend running?";
    });
}

document.getElementById('question').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        askQuestion();
    }
});