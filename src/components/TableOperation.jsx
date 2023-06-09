import Course from "./Course";

const orderCourses = (courses) => {
  const data = [...courses];
  const newData = data
    .sort((a, b) => parseInt(a.dayWeek) - parseInt(b.dayWeek))
    .sort((a, b) => {
      const op1 = a.timeCourseOpen.split(":");
      const op2 = b.timeCourseOpen.split(":");
      const a1 = parseInt(op1[0]) * 60 + parseInt(op1[1]);
      const b1 = parseInt(op2[0]) * 60 + parseInt(op2[1]);

      if (a.dayWeek === b.dayWeek) return a1 - b1;
    });
  return newData;
};
const createArrayDayWeek = (newData) => {
  let contador = 1;
  let max = 0;
  let numbers = 1;

  // calcular el número max de cuántas veces se repite un curso de un día de la semana
  for (let i = 0; i < newData.length - 1; i++) {
    if (newData[i].dayWeek === newData[i + 1].dayWeek) contador++;
    else {
      numbers++;
      contador = 1;
    }
    if (contador > max) max = contador;
  }
  // por defecto siempre tiene que haber 4 filas
  max = max < 4 ? 4 : max;

  let weekData = {};
  for (let i = 1; i <= 7; i++) {
    weekData[i] = newData.filter((value) => value.dayWeek === i.toString());
  }
  return [max, weekData];
};
const structureTable = (max, weekData) => {
  let newArrayCourses = [];
  for (let i = 1; i <= 7; i++) {
    const arrayDay = weekData[i].filter(
      (value) => value.dayWeek === i.toString()
    );
    const size = arrayDay.length;
    for (let j = 0; j < max - size; j++) {
      arrayDay.push(0);
    }
    newArrayCourses.push(arrayDay);
  }
  return newArrayCourses;
};
const setComponentCourse = (max, newCourses) => {
  // mostrar todo de una sola función
  const table = [];
  for (let i = 0; i < max; i++) {
    for (let j = 0; j < 7; j++) {
      if (newCourses[j][i] !== 0) {
        table.push(<Course key={`${j}${i}`} {...newCourses[j][i]} />);
      } else {
        table.push(
          <div
            key={`${j}${i}`}
            className="w-full h-28 rounded-default p-2 bg-[#e9ecef]"
          ></div>
        );
      }
    }
  }

  return table;
};
const calculateCruses = (newData) => {
  const coursesCruces = [];
  for (let i = 1; i <= 7; i++) {
    const size = newData[i].length;
    if (size !== 0) {
      for (let j = 0; j < size - 1; j++) {
        const fp1 = newData[i][j].timeCourseClosed.split(":");
        const op2 = newData[i][j + 1].timeCourseOpen.split(":");

        const a1 = parseInt(fp1[0]) * 60 + parseInt(fp1[1]);
        const b1 = parseInt(op2[0]) * 60 + parseInt(op2[1]);
        if (
          b1 - a1 < 0 &&
          newData[i][j].dayWeek === newData[i][j + 1].dayWeek
        ) {
          coursesCruces.push({
            c1: newData[i][j].nameCourse,
            c2: newData[i][j + 1].nameCourse,
            time: a1 - b1,
          });
        }
      }
    }
  }
  return coursesCruces;
};
const initTable = (data) => {
  const newData = orderCourses(data);
  const [max, weekData] = createArrayDayWeek(newData);
  const cruces = calculateCruses(weekData);
  const newCourses = structureTable(max, weekData);
  const table = setComponentCourse(max, newCourses);
  return [table, cruces];
};

export { initTable };
