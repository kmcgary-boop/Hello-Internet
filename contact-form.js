'use strict';

const form = document.getElementById('contact-form');

if (form) {
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const topicInputs = Array.from(form.querySelectorAll('input[name="topic"]'));
  const feedback = document.getElementById('form-feedback');
  const status = document.getElementById('form-status');

  function showError(input, errorId, text) {
    const error = document.getElementById(errorId);
    error.textContent = text;
    if (text) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    return !text;
  }

  function validateName() {
    const text = nameInput.value.trim() ? '' : 'Please enter your name.';
    return showError(nameInput, 'name-error', text);
  }
  function validateEmail() {
    const value = emailInput.value.trim();
    const text = !value ? 'Please enter your email address.' :
      (!emailInput.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        ? 'Please enter a valid email address.' : '';
    return showError(emailInput, 'email-error', text);
  }
  function validateMessage() {
    const text = messageInput.value.trim() ? '' : 'Please enter your message.';
    return showError(messageInput, 'message-error', text);
  }
  function validateTopic() {
    const selected = topicInputs.some(input => input.checked);
    const text = selected ? '' : 'Please choose a reason for contacting me.';
    document.getElementById('topic-error').textContent = text;
    topicInputs.forEach(input => {
      if (text) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    });
    return selected;
  }

  nameInput.addEventListener('input', () => {
    if (nameInput.hasAttribute('aria-invalid')) validateName();
  });
  emailInput.addEventListener('input', () => {
    if (emailInput.hasAttribute('aria-invalid')) validateEmail();
  });
  messageInput.addEventListener('input', () => {
    if (messageInput.hasAttribute('aria-invalid')) validateMessage();
  });
  topicInputs.forEach(input => input.addEventListener('change', validateTopic));

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';

    const valid = [validateName(), validateEmail(), validateTopic(), validateMessage()];
    if (valid.includes(false)) {
      feedback.hidden = false;
      feedback.textContent = 'Please correct the highlighted fields before continuing.';
      feedback.focus();
      return;
    }

    feedback.hidden = true;
    const topic = topicInputs.find(input => input.checked).value;
    const subject = encodeURIComponent('Portfolio contact: ' + topic);
    const body = encodeURIComponent(
      'Name: ' + nameInput.value.trim() + '\n' +
      'Email: ' + emailInput.value.trim() + '\n' +
      'Reason: ' + topic + '\n\n' +
      messageInput.value.trim()
    );

    status.textContent = 'Your email application should open with a draft. Review it and press Send there; this form does not send messages automatically.';
    window.location.href = 'mailto:Kaitlynmcgary03@gmail.com?subject=' + subject + '&body=' + body;
  });
}
