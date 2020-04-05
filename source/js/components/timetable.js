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
  const thead = table.querySelector('.timetable__head');
  const days = thead.querySelectorAll('.timetable__cell--day');
  days.forEach((day, i) => {
    day.dataset.day = i;
  });

  const tbody = table.querySelector('tbody');
  let row = tbody.querySelector('.timetable__row');
  const res = { thead, tbody, days, cells: [], times: [] };

  bodyRows.forEach(({ time, data }, i) => {
    const header = row.querySelector('.timetable__cell--time');
    header.textContent = time;
    res.times.push(header);

    const cells = row.querySelectorAll('.timetable__cell--data');
    cells.forEach((cell, j) => {
      cell.textContent = data[j];
      cell.dataset.day = j;
      cell.dataset.time = i;
    });

    res.cells.push(cells);
    tbody.appendChild(row);
    row = row.cloneNode(true);
  });

  return res;
};

const swapClass = (elems, prev, next, className) => {
  elems.forEach((el) => {
    el[prev].classList.remove(className);
    el[next].classList.add(className);
  });
};

const activateTimetable = () => {
  const timetable = document.querySelector('.timetable');
  if (!timetable) return;

  const table = timetable.querySelector('.timetable__table');
  const { days, times, cells, tbody, thead } = generateTable(table);
  let selectedDay = 0;
  let isHeaderOpen = false;

  const toggleButtons = timetable.querySelectorAll('.timetable__toggle');

  const selectDay = (event) => {
    const targetDay = event.target.dataset.day;
    console.log(targetDay);
    if (!targetDay) return;

    swapClass(
      [days, ...cells],
      selectedDay,
      targetDay,
      'timetable__cell--day-selected'
    );
    selectedDay = targetDay;
  };

  thead.addEventListener('click', selectDay);

  const toggleHeader = (event) => {
    isHeaderOpen = event.target.dataset.type === 'show';
    setClass(table, 'timetable__table--header-visible', isHeaderOpen);
  };

  thead.addEventListener('click', toggleHeader);
  toggleButtons.forEach((button) => {
    button.addEventListener('click', toggleHeader);
  });

  const onMouse = (event, force) => {
    const { day, time } = event.target.dataset;
    if (!day || !time) return;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    setClass(days[day], 'timetable__cell--day-hovered', force && !isMobile);

    setClass(
      times[time],
      'timetable__cell--time-hovered',
      force && !(isMobile && isHeaderOpen)
    );
  };

  tbody.addEventListener('mouseover', (event) => {
    onMouse(event, true);
  });

  tbody.addEventListener('mouseout', (event) => {
    onMouse(event, false);
  });
};

export default activateTimetable;
