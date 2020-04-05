import { setClass } from '../utils/utils';

const activateTimetable = () => {
  const timetable = document.querySelector('.timetable');
  if (!timetable) return;

  const table = timetable.querySelector('.timetable__table');
  const toggleButtons = timetable.querySelectorAll('.timetable__toggle');
  console.log(toggleButtons);

  const toggleHeader = (event) => {
    console.log(event.target.dataset);
    setClass(
      table,
      'timetable__table--header-visible',
      event.target.dataset.type === 'show'
    );
  };

  toggleButtons.forEach((button) => {
    console.log(button);
    button.addEventListener('click', toggleHeader);
  });
};

export default activateTimetable;
