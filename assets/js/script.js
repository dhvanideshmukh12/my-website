  const navLinks = document.querySelectorAll('.nav-links a');
  const customAlert = document.getElementById('customAlert');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const name = link.dataset.name || link.textContent;
      customAlert.textContent = `🔔 You clicked the ${name} link!`;
      customAlert.style.display = 'block';
      setTimeout(() => {
        customAlert.style.display = 'none';
      }, 5000);
    });
  });

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
  });

  const msgIcon = document.getElementById('msgIcon');
  const msgBox = document.getElementById('msgBox');
  const messageList = document.getElementById('messageList');

  msgIcon.addEventListener('click', () => {
    msgBox.style.display = msgBox.style.display === 'block' ? 'none' : 'block';
  });

  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messageList.innerHTML = '';
    messages.forEach((msg, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<div><strong>${msg.name}</strong> (${msg.email}): ${msg.message}</div>
                      <button data-index="${index}" class="delete-btn">Delete</button>`;
      messageList.appendChild(li);
    });
  }

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    if (name && email && message) {
      const newMsg = { name, email, message };
      const messages = JSON.parse(localStorage.getItem('messages')) || [];
      messages.push(newMsg);
      localStorage.setItem('messages', JSON.stringify(messages));
      this.reset();
      loadMessages();
      alert('Message submitted!');
    }
  });

  messageList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.getAttribute('data-index');
      const messages = JSON.parse(localStorage.getItem('messages')) || [];
      messages.splice(index, 1);
      localStorage.setItem('messages', JSON.stringify(messages));
      loadMessages();
    }
  });

  document.addEventListener('click', function(e) {
    if (!msgBox.contains(e.target) && e.target !== msgIcon) {
      msgBox.style.display = 'none';
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  
  window.addEventListener('DOMContentLoaded', loadMessages);
