let fs = require('fs')

fs.readFile('./Sesi2/input.txt','utf-8',(err,data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
    fs.readFile('./Sesi2/input2.txt','utf-8',(err,data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }
})
