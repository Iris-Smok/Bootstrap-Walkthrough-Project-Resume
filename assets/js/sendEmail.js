function sendMail(contactForm) {
  emailjs
    .send(
      "service_jnmvupo",
      "resume",
      {
        name: contactForm.name.value,
        email: contactForm.emailaddress.value,
        message: contactForm.projectsummary.value,
      },
      "user_4OzQAGTJTZfqV7ek95dIA"
    )
    .then(
      function (response) {
        console.log("SUCCESS", response);
        alert("Your email was send successfully");
      },
      function (error) {
        console.log("FAILED", error);
      }
    );
  contactForm.name.value = "";
  contactForm.emailaddress.value = "";
  contactForm.projectsummary.value = "";
  return false;
}
