function greet(name,gender) {
  if (gender === 'male') {
    console.log(`Halo Tuan ${name}`);
  }
  else if (gender === 'female') {
    console.log(`Halo Nyonya ${name}`);
  } else {
    console.log(`Halo Kak ${name}`);
  }
}

greet('Izhar', 'male');
greet('Yuni', 'female');
greet('Fitra', 'tidak tahu');