// Fonction pour générer un mot de passe aléatoire
 function generatePassword() {
    const minLength = 8;
    const lengthInput = document.getElementById('length');
    const length = lengthInput.value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = '';
    if (uppercase) allChars += uppercaseChars;
    if (lowercase) allChars += lowercaseChars;
    if (numbers) allChars += numberChars;
    if (symbols) allChars += symbolChars;

    if (length < minLength) {
        lengthInput.style.border = '2px solid red';
        lengthInput.setCustomValidity('Le mot de passe doit avoir au moins 8 caractères.');
        lengthInput.reportValidity();
        return;
    } else {
        lengthInput.style.border = ''; // Réinitialise la bordure à sa valeur par défaut
        lengthInput.setCustomValidity('');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
    }

    // Afficher le mot de passe généré dans la zone de saisie
    document.getElementById('password').value = password;
}

// Fonction pour copier le mot de passe dans le presse-papiers
function copyPassword() {
    const passwordText = document.getElementById('password').value;
    const textarea = document.createElement('textarea');
    textarea.value = passwordText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    Toastify({
        text: 'Copié dans le Presse-papiers',
        duration: 3000,
        gravity: 'top',
        position: 'center',
        backgroundColor: 'green',
    }).showToast();
}

// Fonction pour partager le mot de passe sur Telegram
function shareOnTelegram() {
    const reference = document.getElementById('reference').value.trim() || 'NoReference';
    const hashtagReference = reference.replace(/\s+/g, '_');

    const passwordText = document.getElementById('password').value;
    const shareLink = `https://t.me/share/url?url=${encodeURIComponent(passwordText + ' #' + hashtagReference + ' #Addjey')}`;
    window.open(shareLink, '_blank');
}