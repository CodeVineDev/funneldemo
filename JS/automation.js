document.querySelectorAll(".leadForm").forEach(function(form) {
  form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page reload

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerText = "Submitting...";

    const formData = {
      name: form.querySelector(".name").value.trim(),
      email: form.querySelector(".email").value.trim(),
      phone: form.querySelector(".phone").value.trim()
    };

    try {
      const response = await fetch("https://hook.eu2.make.com/t1nbgzk0rl383bjzeg25a83f75t1qss0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.href = "https://funneldemo.vercel.app/Pages/thankyou.html";
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      submitButton.disabled = false;
      submitButton.innerText = "Submit";
    }
  });
});
