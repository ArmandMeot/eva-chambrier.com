document.addEventListener('DOMContentLoaded', function() {
  
  // === MENU BURGER ===
  const burgerMenu = document.querySelector('.burger-menu');
  const nav = document.querySelector('header nav');

  if (burgerMenu && nav) {
    burgerMenu.addEventListener('click', function() {
      nav.classList.toggle('active');

      const icon = burgerMenu.querySelector('i');
      if (icon) {
        if (nav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // === BOUTONS "LIRE LA SUITE" universels ===
  document.querySelectorAll('.toggle-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const container = this.closest('div');
      const text = container?.querySelector('.texte-court');
      if (!text) return;

      if (text.classList.contains('expanded')) {
        text.classList.remove('expanded');
        text.classList.add('closing');

        setTimeout(() => {
          text.classList.remove('closing');
        }, 1000);

        this.innerHTML = `<span class="arrow">►</span> Lire la suite`;
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "Lire la suite");
        this.classList.remove("expanded");
      } else {
        text.classList.add("expanded");
        text.classList.remove("closing");

        this.innerHTML = `<span class="arrow">▲</span> Réduire`;
        this.setAttribute("aria-expanded", "true");
        this.setAttribute("aria-label", "Réduire le texte");
        this.classList.add("expanded");
      }
    });
  });

  // === ANIMATION POUR <mark> ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('mark').forEach(mark => {
    observer.observe(mark);
  });

  // === FORMULAIRE DE CONTACT ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const myEmailAddress = 'votre-adresse-mail@example.com';

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      const emailBody = `
Bonjour,

Ce message vous a été envoyé via le formulaire de votre site web.

-------------------------------------------
Sujet : ${subject}
De : ${name}
Son email : ${email}
-------------------------------------------

Message :
${message}
      `;

      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(emailBody);
      const mailtoLink = `mailto:${myEmailAddress}?subject=${encodedSubject}&body=${encodedBody}`;

      window.location.href = mailtoLink;
    });
  }

});
