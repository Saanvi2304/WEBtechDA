
function validateForm() {
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const zip = document.getElementById('zip');
    const cardName = document.getElementById('cardName');
    const cardNum = document.getElementById('cardNum');
    const expMonth = document.getElementById('expMonth');
    const expYear = document.getElementById('expYear');
    const cvv = document.getElementById('cvv');

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    const cardNumRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    const cvvRegex = /^\d{3,4}$/;

    // Validation flag
    let isValid = true;

    // Validate each input field
    if (name.value.trim() === '') {
        isValid = false;
        alert('Please enter your full name.');
        name.focus();
        return false;
    }

    if (!emailRegex.test(email.value)) {
        isValid = false;
        alert('Please enter a valid email address.');
        email.focus();
        return false;
    }

    if (address.value.trim() === '') {
        isValid = false;
        alert('Please enter your address.');
        address.focus();
        return false;
    }

    // Add more validation checks for other fields...

    // If all validations pass, return true
    return isValid;
}

// Add event listener for form submission
document.querySelector('form').addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Validate the form
    if (validateForm()) {
        // If form is valid, proceed with submission
        alert('Form submitted successfully.');
        // Add your form submission logic here
    }
});