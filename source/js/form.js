const activateForm = () => {
  const form = document.querySelector('.contacts-form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    window.alert('Данные отправлены');
    form.reset();
  });
};

export default activateForm;
