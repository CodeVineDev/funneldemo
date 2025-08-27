document.addEventListener("DOMContentLoaded", function () {
  const DEFAULT_WEBHOOK =
    "https://hook.eu2.make.com/t1nbgzk0rl383bjzeg25a83f75t1qss0";
  const DEFAULT_REDIRECT = "https://funneldemo.vercel.app/Pages/thankyou.html";

  const forms = document.querySelectorAll("form.leadForm, form#leadForm"); // keeps old ID working too

  if (forms.length === 0) {
    console.warn('No lead forms found. Add class="leadForm" to your forms.');
  }

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitBtn = form.querySelector(
        'button[type="submit"], input[type="submit"]',
      );
      const originalText = submitBtn
        ? submitBtn.tagName === "BUTTON"
          ? submitBtn.textContent
          : submitBtn.value
        : null;
      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtn.tagName === "BUTTON")
          submitBtn.textContent = "Submitting...";
        else submitBtn.value = "Submitting...";
      }

      // Prefer names; gracefully fall back to old IDs if present
      const fd = new FormData(form);
      const payload = {
        name: (
          fd.get("name") ||
          form.querySelector("#name")?.value ||
          ""
        ).trim(),
        email: (
          fd.get("email") ||
          form.querySelector("#email")?.value ||
          ""
        ).trim(),
        phone: (
          fd.get("phone") ||
          form.querySelector("#phone")?.value ||
          ""
        ).trim(),
      };

      // Allow per-form overrides
      const webhook = form.dataset.webhook || DEFAULT_WEBHOOK;
      const redirect = form.dataset.redirect || DEFAULT_REDIRECT;

      try {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          window.location.href = redirect;
        } else {
          const text = await res.text();
          console.error("Webhook error:", res.status, text);
          alert("Submission failed. Please try again.");
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("Oops! Something went wrong. Please try again.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (originalText !== null) {
            if (submitBtn.tagName === "BUTTON")
              submitBtn.textContent = originalText;
            else submitBtn.value = originalText;
          }
        }
      }
    });
  });
});
