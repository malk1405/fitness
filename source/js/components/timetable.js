import { setClass } from '../utils/utils';
import { isMobile, isTablet } from '../utils/media';
import { setTimeout } from 'core-js';

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
      cell.title = 'Выбрать';
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
  days[selectedDay].classList.add('timetable__cell--day-selected');

  let isHeaderOpen = false;

  const toggleButtons = timetable.querySelectorAll('.timetable__toggle');

  const selectDay = (event) => {
    const targetDay = event.target.dataset.day;
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

    setClass(days[day], 'timetable__cell--day-hovered', force && !isMobile());

    setClass(
      times[time],
      'timetable__cell--time-hovered',
      force && !(isMobile() && isHeaderOpen)
    );
  };

  tbody.addEventListener('mouseover', (event) => {
    onMouse(event, true);
  });

  tbody.addEventListener('mouseout', (event) => {
    onMouse(event, false);
  });

  let isDragging = false;
  const selectCell = (event) => {
    if (isDragging) return;
    const { day, time } = event.target.dataset;
    if (!day || !time) return;
    const cell = event.target;
    const className = 'timetable__cell--data-selected';
    cell.title = cell.classList.contains(className) ? 'Выбрать' : 'Удалить';

    cell.classList.toggle(className);
  };

  tbody.addEventListener('click', selectCell);

  const slider = document.querySelector('.timetable__scroll-slider');
  const cellWidth = 146;
  const margin = 8;
  const numOfCells = 3;
  const maxMargin = numOfCells * (margin + cellWidth);

  const pos = {
    right: 'r',
    equal: 'e',
    left: 'l',
  };
  const drag = {
    x: 0,
    isDragging: false,
    move: pos.equal,
    margin: 0,
    currentMargin: 0,
  };

  const setMargin = (margin) => {
    table.style.marginLeft = `${margin}px`;

    slider.style.marginLeft = `${Math.round((-50 * margin) / maxMargin)}%`;

    for (let el of [table, slider]) {
      el.style.transition = drag.isDragging ? 'none' : '';
    }
  };

  window.addEventListener('resize', () => {
    if (isTablet()) {
      setMargin(drag.margin);
      return;
    }

    setMargin(0);
    drag.isDragging = false;
    isDragging = false;
  });

  tbody.addEventListener('mousedown', (e) => {
    if (!isTablet()) return;
    drag.x = e.clientX;
    drag.isDragging = true;
  });

  tbody.addEventListener('mousemove', (e) => {
    if (!drag.isDragging) return;
    const offset = e.clientX - drag.x;
    if (Math.abs(offset) < 1) return;

    isDragging = true;

    let margin;

    margin = drag.margin + offset;
    margin = Math.max(margin, -maxMargin);
    margin = Math.min(margin, 0);

    drag.currentMargin = margin;
    setMargin(margin);
  });

  window.addEventListener('mouseup', (e) => {
    if (!drag.isDragging) return;

    drag.isDragging = false;

    setTimeout(() => {
      isDragging = false;
    }, 0);

    if (drag.margin === drag.currentMargin) return;

    drag.margin = drag.currentMargin < drag.margin ? -maxMargin : 0;

    drag.currentMargin = drag.margin;

    setMargin(drag.margin);
    table.style.transition = '';
  });
};

export default activateTimetable;
