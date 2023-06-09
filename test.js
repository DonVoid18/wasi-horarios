let data = [
  {
    id: 1,
    name: "patrick",
    dayWeek: "1",
    timeCourseOpen: "08:00",
    timeCourseClose: "09:00",
  },
  {
    id: 2,
    name: "patrick",
    dayWeek: "3",
    timeCourseOpen: "09:00",
    timeCourseClose: "10:00",
  },
  {
    id: 456,
    name: "rios nolasco",
    dayWeek: "3",
    timeCourseOpen: "09:30",
    timeCourseClose: "12:00",
  },
  {
    id: 3,
    name: "patrick",
    dayWeek: "2",
    timeCourseOpen: "10:00",
    timeCourseClose: "11:00",
  },
];
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
const newArrayOrder = orderCourses(data);
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
const [max, weekData] = createArrayDayWeek(newArrayOrder);
const structureTable = () => {
  let newArrayCourses = [];
  for (let i = 1; i <= 7; i++) {
    const arrayDay = weekData[i].filter(
      (value) => value.dayWeek === i.toString()
    );
    const size = arrayDay.length;
    for (let j = 0; j < max - size; j++) {
      arrayDay.push("vació");
    }
    newArrayCourses.push(arrayDay);
  }
  return newArrayCourses;
};
const viewTableCourse = (newCourses) => {
  // mostrar todo de una sola función
  const table = [];
  for (let i = 0; i < max; i++) {
    for (let j = 0; j < 7; j++) {
      table.push(newCourses[j][i]);
    }
  }
  return table;
};
console.log(viewTableCourse(structureTable()));

// asignar el color

// const newData = data.map((obj) => ({ ...obj, color: "bg-black" }));

// console.log(newData.filter((course) => course.name === "patrick"));
// const newData = data.sort((a, b) => a.dayWeek - b.dayWeek);

// newData.sort((a, b) => {
//   const op1 = a.open.split(":");
//   const op2 = b.open.split(":");
//   const a1 = parseInt(op1[0]) * 60 + parseInt(op1[1]);
//   const b1 = parseInt(op2[0]) * 60 + parseInt(op2[1]);
//   if (a.dayWeek === b.dayWeek) return a1 - b1;
// });

// let contador = 1;
// let max = 0;
// let numbers = 1;
// for (let i = 0; i < newData.length - 1; i++) {
//   if (newData[i].dayWeek === newData[i + 1].dayWeek) contador++;
//   else {
//     numbers++;
//     contador = 1;
//   }
//   if (contador > max) max = contador;
// }
// max = max < 4 ? 4 : max;

// let a1 = newData.filter((value) => value.dayWeek === 1);
// let a2 = newData.filter((value) => value.dayWeek === 2);
// let a3 = newData.filter((value) => value.dayWeek === 3);
// let a4 = newData.filter((value) => value.dayWeek === 4);
// let a5 = newData.filter((value) => value.dayWeek === 5);
// let a6 = newData.filter((value) => value.dayWeek === 6);
// let a7 = newData.filter((value) => value.dayWeek === 7);

// const b = [...a];
// let aux = 1;
// for (let i = 0; i < a.length - 1; i++) {
//   if (
//     a[i + 1].dayWeek - a[i].dayWeek !== 1 &&
//     a[i + 1].dayWeek - a[i].dayWeek !== 0
//   ) {
//     b.splice(i + aux, 0, 0);
//     aux++;
//   }
// }
// b.push(...Array(7 - Math.max(...b.map((value) => value.dayWeek))).fill(0));
// let newArray = [];
// let cont = 1;
// for (let i = 0; i < b.length; i++) {
//   newArray.push(b[i]);
//   if (b[i].dayWeek === 0 || b[i] === 0) {
//     newArray.push(...Array(max - 1).fill(0));
//     cont = 1;
//   } else {
//     if (b[i]?.dayWeek - b[i + 1]?.dayWeek === 0) {
//       cont++;
//     } else {
//       newArray.push(...Array(max - cont).fill(0));
//       cont = 1;
//     }
//   }
// }
// newArray = newArray.map((value) => {
//   if (value === 0) return {};
//   return value;
// });
