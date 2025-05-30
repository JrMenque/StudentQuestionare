document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wellbeingForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const nameError = document.getElementById('nameError');
    const idError = document.getElementById('idError');
    const signatureError = document.getElementById('signatureError');
    const successMessage = document.getElementById('successMessage');

    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('submissionDate').value = today;

    
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (!isValidUniversityEmail(email)) {
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });

   
    form.addEventListener('submit', function(e) {
        e.preventDefault();

       
        nameError.style.display = 'none';
        idError.style.display = 'none';
        emailError.style.display = 'none';
        signatureError.style.display = 'none';

        
        let isValid = true;

        if (!form.fullName.value.trim()) {
            nameError.style.display = 'block';
            isValid = false;
        }

        if (!form.studentId.value.trim()) {
            idError.style.display = 'block';
            isValid = false;
        }

        if (!isValidUniversityEmail(form.email.value.trim())) {
            emailError.style.display = 'block';
            isValid = false;
        }

        if (!form.digitalSignature.value.trim()) {
            signatureError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            
            console.log('Form data:', getFormData());

            
            form.style.display = 'none';
            successMessage.style.display = 'block';

            
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    });

    
    function isValidUniversityEmail(email) {
        const universityDomains = ['university.edu', 'college.edu']; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return false;
        }

        const domain = email.split('@')[1];
        return universityDomains.some(uniDomain => domain === uniDomain);
    }

    
    function getFormData() {
        const formData = {};
        const formElements = form.elements;

        for (let element of formElements) {
            if (element.name) {
                if (element.type === 'radio' || element.type === 'checkbox') {
                    if (element.checked) {
                        if (!formData[element.name]) {
                            formData[element.name] = [];
                        }
                        formData[element.name].push(element.value);
                    }
                } else {
                    formData[element.name] = element.value;
                }
            }
        }

       
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!formData[checkbox.name]) {
                formData[checkbox.name] = [];
            }
        });

        return formData;
    }
});
