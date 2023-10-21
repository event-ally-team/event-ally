//This function is to show the Sign In Form and hide the Sign Up Form.
function showSignInForm() {
    const signInForm = document.querySelector(".signInForm");
    const signUpForm = document.querySelector(".signUpForm");
  
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
  }
  
  // This function is to show the Sign Up Form when the user clicks the Sign Up button on the Sign In Form.
  function showSignUpForm() {
    const signInForm = document.querySelector(".signInForm");
    const signUpForm = document.querySelector(".signUpForm");
  
    signUpForm.style.display = "block";
    signInForm.style.display = "none";
  }
  
  // Initially, hide the Sign Up form
  document.querySelector(".signUpForm").style.display = "none";