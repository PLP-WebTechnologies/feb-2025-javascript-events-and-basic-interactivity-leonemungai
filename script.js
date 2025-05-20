document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. EVENT HANDLING
    // ======================
    
    // Button click event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        clickOutput.style.color = '#2ecc71';
        
        // Reset after 1.5 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button clicked successfully!';
        }, 1500);
    });
    
    // Keypress detection
    const keypressDisplay = document.getElementById('keypress-display');
    
    document.addEventListener('keydown', function(e) {
        keypressDisplay.textContent = `You pressed: ${e.key} (Key code: ${e.code})`;
        keypressDisplay.style.backgroundColor = '#3498db';
        keypressDisplay.style.color = 'white';
        keypressDisplay.style.padding = '10px';
        keypressDisplay.style.borderRadius = '4px';
        
        // Reset after 2 seconds
        setTimeout(() => {
            keypressDisplay.textContent = 'Press another key...';
            keypressDisplay.style.backgroundColor = '';
            keypressDisplay.style.color = '';
            keypressDisplay.style.padding = '0';
            keypressDisplay.style.borderRadius = '0';
        }, 2000);
    });
    
    // Secret double-click action
    const secretTrigger = document.getElementById('secret-trigger');
    const secretMessage = document.getElementById('secret-message');
    
    secretTrigger.addEventListener('dblclick', function() {
        secretMessage.classList.remove('hidden');
        secretMessage.style.animation = 'fadeIn 1s';
        
        // Hide after 3 seconds
        setTimeout(() => {
            secretMessage.classList.add('hidden');
        }, 3000);
    });
    
    // Long press detection
    let pressTimer;
    secretTrigger.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            secretMessage.textContent = '🔐 You discovered the long press secret! 🔐';
            secretMessage.classList.remove('hidden');
            
            setTimeout(() => {
                secretMessage.classList.add('hidden');
            }, 3000);
        }, 1000); // 1 second for long press
    });
    
    secretTrigger.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretTrigger.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // ======================
    // 2. INTERACTIVE ELEMENTS
    // ======================
    
    // Color changing button
    const colorBtn = document.getElementById('color-btn');
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorBtn.style.backgroundColor = colors[colorIndex];
        colorBtn.textContent = `Color Changed (${colorIndex + 1}/${colors.length})`;
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('span').textContent = '+';
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                this.querySelector('span').textContent = '-';
            }
        });
    });
    
    // ======================
    // 3. FORM VALIDATION
    // ======================
    
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar::after');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('invalid');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('invalid');
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
            return true;
        }
        
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('invalid');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const strengthBarElement = document.querySelector('.strength-bar');
        
        // Reset
        passwordError.textContent = '';
        passwordInput.classList.remove('invalid');
        
        // Strength calculation
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Visual feedback
        const strengthPercent = strength * 25;
        strengthBarElement.style.setProperty('--width', `${strengthPercent}%`);
        
        // Color and text
        let color, text;
        switch(strength) {
            case 0:
                color = '#e74c3c';
                text = 'Very Weak';
                break;
            case 1:
                color = '#e67e22';
                text = 'Weak';
                break;
            case 2:
                color = '#f1c40f';
                text = 'Moderate';
                break;
            case 3:
                color = '#2ecc71';
                text = 'Strong';
                break;
            case 4:
                color = '#27ae60';
                text = 'Very Strong';
                break;
        }
        
        strengthBarElement.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
        
        return password.length >= 8;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            document.querySelector('.strength-bar').style.setProperty('--width', '0%');
            strengthText.textContent = 'Password strength';
            strengthText.style.color = '';
        } else {
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
            
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isPasswordValid) passwordInput.focus();
        }
    });
    
    // Add CSS variable for strength bar
    document.documentElement.style.setProperty('--width', '0%');
});