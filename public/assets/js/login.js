document.addEventListener('DOMContentLoaded', function () {
  // Function to handle signing in
  const signInFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signIn').value.trim();
    const password = document.querySelector('#password-signIn').value.trim();

    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in. Please check your email and password.');
      }
    }
  };

  // Function to handle signing up
  const signUpFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signUp').value.trim();
    const password = document.querySelector('#password-signUp').value.trim();

    if (email && password) {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const data = await response.json();
        console.error('Sign-up failed:', data.error);
        alert('Failed to Sign Up');
      }
    }
  };

  // Function to show the Sign Up Form
  function showSignUpForm() {
    const signInForm = document.querySelector('.signInForm');
    const signUpForm = document.querySelector('.signUpForm');

    signUpForm.style.display = 'block';
    signInForm.style.display = 'none';
  }

  // Function to show the Sign In Form
  function showSignInForm() {
    const signInForm = document.querySelector('.signInForm');
    const signUpForm = document.querySelector('.signUpForm');

    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
  }

  // Event listener for the form submission
  document
    .querySelector('.signInForm')
    .addEventListener('submit', signInFormHandler);

  document
    .querySelector('.signUpForm')
    .addEventListener('submit', signUpFormHandler);

  // Event listener for the links
  document
    .querySelector('.signInLink')
    .addEventListener('click', showSignInForm);

  document
    .querySelector('.signUpLink')
    .addEventListener('click', showSignUpForm);
});
