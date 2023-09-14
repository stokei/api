const list = [
  {
    order: 2
  },
  {
    order: 3
  },
  {
    order: 1
  }
];

console.log(
  list?.sort((componentA, componentB) => componentA?.order - componentB?.order)
);
