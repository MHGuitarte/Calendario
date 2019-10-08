const dayNames = ["L", "M", "X", "J", "V", "S", "D"];
const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const calendar = document.getElementById("calendar");

function drawDays(month, year) {
  //Limpiamos el calendario
  while (calendar.firstChild) calendar.removeChild(calendar.firstChild);

  //Añadimos las letras de referencia para los días de la semana
  for (idx = 0; idx < dayNames.length; idx++) {
    const cell = document.createElement("span");
    cell.className = "daysName";
    cell.textContent = dayNames[idx];
    if (idx == 6) cell.id = "sundays";
    calendar.append(cell);
  }

  //Introducción de los días sobrantes del mes anterior
  let week = 0;
  let today = new Date(year, month).getDay() - 1;
  if (today == -1) {
    today = 6;
  }
  let cellsCounter = 0;

  for (today; today > 0; today--) {
    const dayCell = document.createElement("span");
    dayCell.textContent = new Date(year, month + 1, 0 - today).getDate();

    if (week != 6) {
      week++;
    } else {
      dayCell.id = "sundays";
      week = 0;
    }

    dayCell.className = "not-this-month";

    dayCell.addEventListener("click", () => {
      const monthAlertName = monthNames[month - 1];
      window.alert(
        `La fecha seleccionada es el ${dayCell.textContent} de ${monthAlertName} del ${year}`
      );
    });

    calendar.append(dayCell);
    cellsCounter++;
  }

  //Introducción de los días del mes y de los sobrantes del próximo
  let dayCount = 1;
  const absoulteToday = new Date();
  let nextMonthCounter = 0;
  for (idx = 42; idx > cellsCounter; idx--) {
    const dayCell = document.createElement("span");

    if (dayCount <= new Date(year, month + 1, 0).getDate()) {
      dayCell.textContent = dayCount;
    } else {
      dayCell.textContent = new Date(
        year,
        month + 1,
        1 + nextMonthCounter
      ).getDate();
      dayCell.className = "not-this-month";
      nextMonthCounter++;
    }

    if (week != 6) {
      week++;
    } else {
      dayCell.id = "sundays";
      week = 0;
    }

    if (
      year == absoulteToday.getFullYear() &&
      month == absoulteToday.getMonth() &&
      dayCount == absoulteToday.getDate()
    ) {
      dayCell.className = "today";
    }

    dayCell.addEventListener("click", () => {
      let monthAlertName = monthNames[month];
      let dayAlert = dayCell.textContent;
      if (dayAlert > new Date(year, month + 1, 0).getDate()) {
        monthAlertName = monthNames[month + 1];
      }
      window.alert(
        `La fecha seleccionada es el ${dayAlert} de ${monthAlertName} del ${year}`
      );
    });

    calendar.append(dayCell);
    dayCount++;
  }
}

//Referenciamos y poblamos los select de mes y año
const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");

for (idx = 0; idx < monthNames.length; idx++) {
  const monthOption = document.createElement("option");
  monthOption.textContent = monthNames[idx];
  monthSelect.appendChild(monthOption);
}

for (idx = 1900; idx < 2100; idx++) {
  const yearOption = document.createElement("option");
  yearOption.textContent = idx;
  yearSelect.appendChild(yearOption);
}

/************************************************************************************/

//REFERENCIA DE DATE TEXT -> LO USAREMOS A PARTIR DE AQUÍ PARA MARCAR EL MES Y AÑO QUE ESTAMOS VIENDO
const yearText = document.getElementById("year-text");
const monthText = document.getElementById("month-text");

//Control del botón de búsqueda
const submitDate = document.getElementById("sumbit-date");
submitDate.addEventListener("click", () => {
  if (monthSelect.selectedIndex == 0 || yearSelect.value == 0) {
    window.alert("Por favor, escoja primero un año y un mes objetivo.");
  }

  drawDays(monthSelect.selectedIndex - 1, yearSelect.value);

  yearText.textContent = yearSelect.value;
  monthText.textContent = monthNames[monthSelect.selectedIndex - 1];

  console.log(yearSelect.value);
});

/*******************************AÑOS*******************************/

//Control de los botones del año
const yearDown = document.getElementById("year-down");
const yearUp = document.getElementById("year-up");

yearDown.addEventListener("click", () => {
  if (yearSelect.value == 1900 || yearSelect.selectedIndex == 0) {
    window.alert("El rango de años admitido se encuentra entre 1900 y 2099.");
  } else {
    yearSelect.selectedIndex = yearSelect.selectedIndex - 1;
    drawDays(monthSelect.selectedIndex - 1, yearSelect.value);

    yearText.textContent = yearSelect.value;
    monthText.textContent = monthNames[monthSelect.selectedIndex - 1];
  }

  console.log(yearSelect.value);
});

yearUp.addEventListener("click", () => {
  if (yearSelect.value == 2099) {
    window.alert("El rango de años admitido se encuentra entre 1900 y 2099.");
  } else {
    yearSelect.selectedIndex = yearSelect.selectedIndex + 1;
    drawDays(monthSelect.selectedIndex - 1, yearSelect.value);

    yearText.textContent = yearSelect.value;
    monthText.textContent = monthNames[monthSelect.selectedIndex - 1];
  }

  console.log(yearSelect.value);
});

/*******************************MESES*******************************/

//Control de los botones del mes
const monthDown = document.getElementById("month-down");
const monthUp = document.getElementById("month-up");

monthDown.addEventListener("click", () => {
  if (monthSelect.selectedIndex == 1 && yearSelect.value <= 1900) {
    window.alert(
      "El rango de fechas se comprende desde el año 1900 hasta el año 2099"
    );
    return;
  }

  if (monthSelect.selectedIndex == 1) {
    yearSelect.selectedIndex = yearSelect.selectedIndex - 1;
    monthSelect.selectedIndex = 12;

    drawDays(monthSelect.selectedIndex - 1, yearSelect.value);

    yearText.textContent = yearSelect.value;
    monthText.textContent = monthNames[monthSelect.selectedIndex - 1];
  } else if (monthSelect.value == null) {
    window.alert("No existe un mes seleccionado");
  } else {
    monthSelect.selectedIndex = monthSelect.selectedIndex - 1;

    drawDays(monthSelect.selectedIndex - 1, yearSelect.value);

    yearText.textContent = yearSelect.value;
    monthText.textContent = monthNames[monthSelect.selectedIndex - 1];
  }

  console.log(yearSelect.value);
});

monthUp.addEventListener("click", () => {
  if (monthSelect.selectedIndex == 12 && yearSelect.value >= 2099) {
    window.alert(
      "El rango de fechas se comprende desde el año 1900 hasta el año 2099"
    );
    return;
  }

  if (monthSelect.selectedIndex == 12) {
    yearSelect.selectedIndex = yearSelect.selectedIndex + 1;
    monthSelect.selectedIndex = 1;

    drawDays(monthSelect.selectedIndex - 1, yearSelect.value);

    yearText.textContent = yearSelect.value;
    monthText.textContent = monthNames[monthSelect.selectedIndex - 1];
  } else if (monthSelect.value == null) {
    window.alert("No existe un mes seleccionado");
  } else {
    monthSelect.selectedIndex = monthSelect.selectedIndex + 1;

    drawDays(monthSelect.selectedIndex - 1, yearSelect.value);

    yearText.textContent = yearSelect.value;
    monthText.textContent = monthNames[monthSelect.selectedIndex - 1];
  }

  console.log(yearSelect.value);
});

//Instancia de carga
const officialDate = new Date();

yearSelect.value = officialDate.getFullYear();
monthSelect.selectedIndex = officialDate.getMonth() + 1;
drawDays(officialDate.getMonth(), officialDate.getFullYear());

//Para volver al día de hoy (ESTE BLOQUE SE CUELA AQUÍ PORQUE NECESITAMOS LA INSTANCIA DE CARGA)
const backToday = document.getElementById("back-today");

backToday.addEventListener("click", () => {
  yearSelect.value = officialDate.getFullYear();
  monthSelect.selectedIndex = officialDate.getMonth() + 1;

  drawDays(officialDate.getMonth(), officialDate.getFullYear());

  yearText.textContent = officialDate.getFullYear();
  monthText.textContent = monthNames[officialDate.getMonth()];
});

//REFERENCIA DEL TODAY TEXT -> LO USAREMOS PARA MARCAR EL DÍA DE HOY
const todayText = document.getElementById("today-text");
todayText.textContent = `${officialDate.getDate()} de ${
  monthNames[officialDate.getMonth()]
} del ${officialDate.getFullYear()}`;

yearText.textContent = officialDate.getFullYear();
monthText.textContent = monthNames[officialDate.getMonth()];