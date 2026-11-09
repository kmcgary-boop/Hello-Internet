'use strict';

// Enhance navigation without hiding the links when JavaScript is unavailable.
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const menuList = document.getElementById('primary-menu');
if (menuButton && menuList) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuList.classList.toggle('is-open', !isOpen);
  });
  // Escape closes the mobile menu; focus returns to the toggle.
  menuList.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      menuButton.setAttribute('aria-expanded', 'false');
      menuList.classList.remove('is-open');
      menuButton.focus();
    }
  });
  window.matchMedia('(min-width: 781px)').addEventListener('change', (event) => {
    if (event.matches) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuList.classList.remove('is-open');
    }
  });
}

const form = document.getElementById('contact-form');
if (form) {
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const topics = Array.from(form.querySelectorAll('input[name="topic"]'));
  const feedback = document.getElementById('form-feedback');
  const fields = [nameInput, emailInput, messageInput];

  function showFieldError(input, errorId, message) {
    input.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(errorId).textContent = message;
  }
  function showTopicError(message) {
    topics.forEach((input) => input.setAttribute('aria-invalid', String(Boolean(message))));
    document.getElementById('topic-error').textContent = message;
  }
  function validateName() {
    const message = nameInput.value.trim() ? '' : 'Please enter your name.';
    showFieldError(nameInput, 'name-error', message);
    return !message;
  }
  function validateEmail() {
    const value = emailInput.value.trim();
    const message = !value ? 'Please enter your email address.' :
      emailInput.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Enter a valid email address.' : '';
    showFieldError(emailInput, 'email-error', message);
    return !message;
  }
  function validateTopic() {
    const message = topics.some((topic) => topic.checked) ? '' : 'Please choose a message topic.';
    showTopicError(message);
    return !message;
  }
  function validateMessage() {
    const message = messageInput.value.trim() ? '' : 'Please enter a message.';
    showFieldError(messageInput, 'message-error', message);
    return !message;
  }
  fields.forEach((input) => {
    input.addEventListener('input', () => {
      if (input === nameInput) validateName();
      if (input === emailInput) validateEmail();
      if (input === messageInput) validateMessage();
    });
  });
  topics.forEach((topic) => topic.addEventListener('change', validateTopic));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const checks = [validateName(), validateEmail(), validateTopic(), validateMessage()];
    if (checks.some((passed) => !passed)) {
      feedback.hidden = false;
      feedback.classList.remove('is-success');
      feedback.setAttribute('role', 'alert');
      feedback.textContent = 'Please correct the highlighted fields, then try again.';
      feedback.focus();
      return;
    }

    const topic = topics.find((item) => item.checked).value;
    const subject = encodeURIComponent(`Portfolio contact: ${topic}`);
    const body = encodeURIComponent(`Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\nTopic: ${topic}\n\n${messageInput.value.trim()}`);
    const emailDraft = `mailto:Kaitlynmcgary03@gmail.com?subject=${subject}&body=${body}`;
    feedback.hidden = false;
    feedback.classList.add('is-success');
    feedback.setAttribute('role', 'status');
    feedback.textContent = 'Your email application should open with a prepared message. Review it and press Send in the email app; this website does not send messages directly.';
    feedback.focus();
    window.location.href = emailDraft;
  });
}
