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

// Add event listeners for the buttons
document
  .querySelector('.signInForm')
  .addEventListener('submit', signInFormHandler);
document
  .querySelector('.signUpMessage')
  .addEventListener('click', showSignUpForm);

document
  .querySelector('.signUpForm')
  .addEventListener('submit', signUpFormHandler);
document
  .querySelector('.signInMessage')
  .addEventListener('click', showSignInForm);
