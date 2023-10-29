// Function to handle the Sign-Up form submission
const signUpFormHandler = async (event) => {
  event.preventDefault();

  // Data from the sign up form
  const email = document.querySelector('#email-signUp').value.trim();
  const password = document.querySelector('#password-signUp').value.trim();

  if (email && password) {
    // send the data to the server
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create your account');
    }
  }
};

function showSignInForm() {
  document.location.replace('/signIn');
}

document
  .querySelector('.signUpForm')
  .addEventListener('submit', signUpFormHandler);

document.querySelector('.signInLink').addEventListener('click', showSignInForm);
