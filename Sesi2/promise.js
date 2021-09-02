let fs = require('fs')

fs.readFile('./Sesi2/input.txt',(err,data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

fs.readFile('./Sesi2/inputt.txt',(err,data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(toString(data))
  }
})