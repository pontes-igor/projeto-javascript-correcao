const date = new Date(2025, 2, 27);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

document.addEventListener('DOMContentLoaded', () => {
  createCalendar(date);
  nextMonth();
  previousMonth();
  setupDaySelection();
});
let slotDuration = 60;
function createCalendar(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let header = document.querySelector('.calendar-month-year');
    header.innerText = `${months[month]} ${year}`;
  
    let firstWeekDayMonth = new Date(year, month, 1).getDay();
    let lastDayMonth = new Date(year, month + 1, 0).getDate();
    let emptyDays = (firstWeekDayMonth - 1 + 7) % 7;
    let divDias = document.querySelector('.calendar-days');
    divDias.innerHTML = '';
  
  
    for (let i = 0; i < emptyDays; i++) {
        divDias.innerHTML += `<div class="empty"></div>`;
    }
  
  
    for (let i = 1; i <= lastDayMonth; i++) {
        divDias.innerHTML += `<div class="days">${i}</div>`;
    }
  }

  createCalendar(new Date());

  function setupDaySelection() {
    const daysContainer = document.querySelector('.calendar-days');  
    const drawer = document.querySelector('.time-slots-drawer'); 
    
    daysContainer.addEventListener('click', (event) => {
        const clickedElement = event.target;
  
        if (clickedElement.classList.contains('days')) {
            document.querySelectorAll('.days.selected').forEach(el => el.classList.remove('selected'));
            
            clickedElement.classList.add('selected');
  
            const dayNumber = clickedElement.innerText;
            const selectedDateObj = new Date(date.getFullYear(), date.getMonth(), dayNumber);
  
            const weekdayName = weekdays[selectedDateObj.getDay()];
            const monthName = months[selectedDateObj.getMonth()];
            document.getElementById('selected-date-display').textContent = 
                `${weekdayName}, ${monthName} ${dayNumber}`;
  
            const formattedDate = `${selectedDateObj.getFullYear()}-${(selectedDateObj.getMonth()+1).toString().padStart(2, '0')}-${dayNumber.padStart(2, '0')}`;
            console.log("Data formatada:", formattedDate);
  
            drawer.classList.add('open');
            createSlots();
        }        if (clickedElement.classList.contains('selected')) {
            drawer.classList.add('open');
        }
    });
  }
  
  function gerarSlots(inicio, fim, intervaloMinutos) {
    const slots = [];
    const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
    const [horaFim, minutoFim] = fim.split(':').map(Number);
  
    const start = new Date();
    start.setHours(horaInicio, minutoInicio, 0, 0);
  
    const end = new Date();
    end.setHours(horaFim, minutoFim, 0, 0);
  
    while (start < end) {
      const hora = start.getHours().toString().padStart(2, '0');
      const minuto = start.getMinutes().toString().padStart(2, '0');
      slots.push(`${hora}:${minuto}`);
      start.setMinutes(start.getMinutes() + intervaloMinutos);
    }
  
    return slots;
  }
  
      function createSlots() {
        const slotsContainer = document.querySelector('.available-time-slots-container');
        const slots = gerarSlots('09:00', '13:00', slotDuration);
        slotsContainer.innerHTML = slots.map(slot => `<div class="time-slot">${slot}</div>`).join('');
      }
      
  function nextMonth() {
      let btnNext = document.querySelector('.btn-next');
      btnNext.addEventListener('click', () => {
          date.setMonth(date.getMonth() + 1);
          createCalendar(date);
      });
  }
  
  
  function previousMonth() {
      let btnPrev = document.querySelector('.btn-previous');
      btnPrev.addEventListener('click', () => {
          date.setMonth(date.getMonth() - 1);
          createCalendar(date);
      });
  }
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', (e) => {
        const text = e.target.innerText;
        if (text.includes('30')) {
          slotDuration = 30;
        } else if (text.includes('60')) {
          slotDuration = 60;
        }
      });
    });
  
    createCalendar(date);
    nextMonth();
    previousMonth();
    setupDaySelection();
  });
  