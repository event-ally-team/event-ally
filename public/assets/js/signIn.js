// Used the class activity 14-20 as a reference.
// Function to handle the signin form submission
const signInFormHandler = async (event) => {
  event.preventDefault();

  // Gather the data.
  const email = document.querySelector('#email-signIn').value.trim();
  const password = document.querySelector('#password-signIn').value.trim();

  if (email && password) {
    // send the data to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Sign in failed');
    }
  }
};

// This function is to show the Sign Up Form when the user clicks the Sign Up button on the Sign In Form.
function showSignUpForm() {
  document.location.replace('signUp');
}

// Add event listeners for form submissions
document
  .querySelector('.signInForm')
  .addEventListener('submit', signInFormHandler);

document.querySelector('.signUpLink').addEventListener('click', showSignUpForm);
