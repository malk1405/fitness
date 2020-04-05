import { setClass } from '../utils/utils';

const bodyRows = [
  {
    time: '08:00',
    data: [
      'CrossFit',
      'Aerostretching',
      'Hot Iron',
      'Pilates',
      'Stretching',
      'Functional',
      'Body Sculpt',
    ],
  },
  {
    time: '12:00',
    data: [
      'Body Sculpt',
      'CrossFit',
      'Aerostretching',
      'Hot Iron',
      'Pilates',
      'Stretching',
      'Functional',
    ],
  },
  {
    time: '18:00',
    data: [
      'Functional',
      'Body Sculpt',
      'CrossFit',
      'Aerostretching',
      'Hot Iron',
      'Pilates',
      'Stretching',
    ],
  },
  {
    time: '20:00',
    data: [
      'Stretching',
      'Functional',
      'Body Sculpt',
      'CrossFit',
      'Aerostretching',
      'Hot Iron',
      'Pilates',
    ],
  },
];

const generateTable = (table) => {
  const tbody = table.querySelector('tbody');
  let row = tbody.querySelector('.timetable__row');
  const res = { days: [], cells: [] };

  bodyRows.forEach(({ time, data }, i) => {
    const header = row.querySelector('.timetable__cell--time');
    header.textContent = time;

    const cells = row.querySelectorAll('.timetable__cell--data');
    cells.forEach((cell, j) => {
      cell.textContent = data[j];
      cell.dataset.day = j;
      cell.dataset.time = i;
    });

    tbody.appendChild(row);
    row = row.cloneNode(true);
  });

  return res;
};

const activateTimetable = () => {
  const timetable = document.querySelector('.timetable');
  if (!timetable) return;

  const table = timetable.querySelector('.timetable__table');
  const { days, cells } = generateTable(table);

  const toggleButtons = timetable.querySelectorAll('.timetable__toggle');

  const toggleHeader = (event) => {
    setClass(
      table,
      'timetable__table--header-visible',
      event.target.dataset.type === 'show'
    );
  };

  toggleButtons.forEach((button) => {
    button.addEventListener('click', toggleHeader);
  });
};

export default activateTimetable;
