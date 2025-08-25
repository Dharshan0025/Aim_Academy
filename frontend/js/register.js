document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Form validation on submit
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            // Client-side validation
            const password = document.getElementById('password').value;
            const phone = document.getElementById('phone').value;
            const role = document.getElementById('role').value;
            
            // Validate password
            if (password.length < 8) {
                e.preventDefault();
                showMessage('Password must be at least 8 characters', 'danger');
                return;
            }
            
            // Validate phone number
            if (!/^\d{10}$/.test(phone)) {
                e.preventDefault();
                showMessage('Please enter a valid 10-digit phone number', 'danger');
                return;
            }
            
            // Validate role selection
            if (!role) {
                e.preventDefault();
                showMessage('Please select an account type', 'danger');
                return;
            }
            
            // Role-specific field validation
            if (role === 'student') {
                const grade = document.getElementById('grade').value;
                if (!grade) {
                    e.preventDefault();
                    showMessage('Please select your grade/class', 'danger');
                    return;
                }
            }
        });
    }
});

function showRoleFields() {
    const role = document.getElementById('role').value;
    document.querySelectorAll('.role-fields').forEach(field => {
        field.style.display = 'none';
    });
    
    if (role) {
        const roleFields = document.getElementById(`${role}-fields`);
        if (roleFields) {
            roleFields.style.display = 'block';
        }
    }
}

function showMessage(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const authCard = document.querySelector('.auth-card');
    const existingAlert = document.querySelector('.alert');
    
    if (existingAlert) {
        authCard.replaceChild(alertDiv, existingAlert);
    } else {
        const form = document.querySelector('form');
        authCard.insertBefore(alertDiv, form);
    }
    
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 5000);
}