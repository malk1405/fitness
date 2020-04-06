const activateForm = () => {
  const form = document.querySelector('.contacts-form form');
  if (!form) return;

  let phoneText = '';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.alert('Данные отправлены');
    form.reset();
    phoneText = '';
  });

  const phoneField = form.querySelector('#contacts-form__phone');

  phoneField.addEventListener('input', (event) => {
    const value = event.target.value;
    phoneText = /^[0-9]*$/.test(value) ? value : phoneText;
    phoneField.value = phoneText;
  });
};

export default activateForm;
