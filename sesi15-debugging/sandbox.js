// Pengecekan bilangan prima untuk 13

isPrime = (n) => {
  for(let i = 2; i <= Math.sqrt(n); i++){
    if (n % i == 0) return false;
  }
  return true;
}
  if (isPrime(23)) {
    console.log('Bilangan 23 Prima');
  } else {
    console.log('Bilangan 23 bukan prima');
  }