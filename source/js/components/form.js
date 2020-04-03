const activateForm = () => {
  const form = document.querySelector('.contacts-form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    window.alert('Данные отправлены');
    form.reset();
  });
};

export default activateForm;
