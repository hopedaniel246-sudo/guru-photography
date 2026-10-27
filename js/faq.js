const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function(item) {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', function() {
    const isActive = item.classList.contains('active');

    faqItems.forEach(faq => {
      faq.classList.remove('active');
      faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
    }
  });
  question.setAttribute('aria-expanded', 'False');
});