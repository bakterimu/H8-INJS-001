let fs = require('fs')
const process = require('process')
let {EventEmitter} = require('events')

// fs.readFile('./Sesi2/input.txt','utf-8',(err,data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//     fs.readFile('./Sesi2/input2.txt','utf-8',(err,data) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(data)
//       }
//     })
//   }
// })

const myEmitter = new EventEmitter
dengarlagu = () => {
  console.log("Nissa sabyan alapyou so much")
}

myEmitter.on('dengar', dengarlagu)

myEmitter.emit('dengar', ()=>{
  console.log('mendengarkan lagu')
})

console.log(process.argv[2]+process.argv[3])

const coba = () => { return new Promise((resolve, reject) => {
			if (1<5) { resolve('Janji terpenuhi')}
			else {reject('Ingkar janji')}})}
const handlerSukses = (sukses) => { console.log(sukses)}
const handlerGagal = (gagal) => { console.log(gagal)}
coba().then(handlerSukses).catch(handlerGagal)
