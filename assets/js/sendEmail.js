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
      },
      function (error) {
        console.log("FAILED", error);
      }
    );
  return false; // To block from loading a new page
}
