# Candidate Assignment – Web Form with Validations

This project is a responsive web form built using **HTML**, **CSS**, and **JavaScript** to collect candidate details with full validation. It was created as part of an assignment given by a recruiter.

## Live Demo
https://its-rock-777.github.io/Web-Form-with-Validations/

## Features

- **Responsive Design**  
  - 50% width on screens above 899px  
  - 100% width below 900px  

- **Validation Rules**
  - **Full Name**: Letters only, min. 2 characters
  - **Email**: Standard email format
  - **Phone Toggle**: Show/hide phone field (value sent as empty string when hidden)
  - **Phone Number**: Optional, must be exactly 10 digits if provided
  - **Password**: Min. 8 characters, must include uppercase, lowercase, digit, special character
  - **Language Selector**: Dropdown with 5 predefined options
  - **About Yourself**: 50–500 characters, emoji-supported
  - **Save Button**: Enabled only when all validations pass

- **UX Enhancements**
  - Inline validation error messages
  - Toggle switches for better interaction
  - Success notification on form submission
  - Form data is logged in the console on submit


## Tech Stack
- HTML5  
- CSS3  
- JavaScript 


## Form Submission
- **POST API:** `https://admin-staging.whydonate.dev/whydonate/assignment`
- **Note:** While a 200 status code is returned, the API responds with `"Invalid request route"`, indicating the data is not being stored. This implementation is meant to demonstrate front-end validation and UX.


## Folder Structure
/candidate-assignment
 - index.html
 - script.js
 - style.css
