// Used the class activity 14-20 as a reference.
// Function to handle the signin form submission
const signInFormHandler = async (event) => {
  event.preventDefault();

  // Gather the data.
  const email = document.querySelector('#email-signIn').value.trim();
  const password = document.querySelector('#password-signIn').value.trim();

  if (email && password) {
    // send the data to the server
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

// Function to handle the Sign-Up form submission
const signUpFormHandler = async (event) => {
  event.preventDefault();

  // Data from the sign up form
  const email = document.querySelector('#email-signUp').value.trim();
  const password = document.querySelector('#password-signUp').value.trim();

  if (email && password) {
    // send the data to the server
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to Sign Up');
    }
  }
};

//This function is to show the Sign In Form and hide the Sign Up Form.
function showSignInForm() {
  const signInForm = document.querySelector('.signInForm');
  const signUpForm = document.querySelector('.signUpForm');

  signInForm.style.display = 'block';
  signUpForm.style.display = 'none';
}

// This function is to show the Sign Up Form when the user clicks the Sign Up button on the Sign In Form.
function showSignUpForm() {
  const signInForm = document.querySelector('.signInForm');
  const signUpForm = document.querySelector('.signUpForm');

  signUpForm.style.display = 'block';
  signInForm.style.display = 'none';
}
// Hide the Sign Up form
document.querySelector('.signUpForm').style.display = 'none';

// Add event listeners for form submissions
document
  .querySelector('.signInForm')
  .addEventListener('submit', signInFormHandler);
document
  .querySelector('.signUpForm')
  .addEventListener('submit', signUpFormHandler);
document
  .querySelector('.signInMessage')
  .addEventListener('click', showSignInForm);
document
  .querySelector('.signUpMessage')
  .addEventListener('click', showSignUpForm);
