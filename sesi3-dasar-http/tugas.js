let orang = [
  { name: 'Yusuf'},
  { name: 'Wahyu'},
  { name: 'Hafid'},
  { name: 'Raka'},
  { name: 'Rizky'},
  { name: 'Yolan'}
]
// 1. Easy - .map, menambahkan properti noAbsen
orang.map((list) => {
  if (list.name == 'Yusuf') {
    list.noAbsen = 12
  } else if (list.name == 'Wahyu') {
    list.noAbsen = 3
  } else if (list.name == 'Hafid') {
    list.noAbsen = 8
  } else if(list.name == 'Raka') {
    list.noAbsen = 1
  } else if (list.name == 'Rizky') {
    list.noAbsen = 7
  } else if (list.name == 'Yolan') {
    list.noAbsen = 10
  }
})
console.log(orang)

// Normal - .filter, membuat 2 array absen ganjil dan absen genap
const genap = orang.filter((list) => list.noAbsen % 2 == 0);
const ganjil = orang.filter((list) => list.noAbsen % 2 == 1);
console.log(genap);
console.log(ganjil);

// Hard - .sort, array orang di sort secara descending
orang.sort((a, b) => a.noAbsen - b.noAbsen);
console.log(orang);

// Veryhard - .reduce, membuat gabungan string dari nama setiap objek
let stringNama = orang.reduce(((prevVal, currVal, idx) => {
  if (idx === 0) {
    return currVal.name;
  }
    return prevVal + ',' + currVal.name;}), '');
console.log(stringNama);