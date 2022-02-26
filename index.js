const os = require('os');
//1. Inbuilt Packages
//2. Custom packages
//3. Third Party Packages  npm/yarn

//console.log(os.cpus())
//console.log(os.homedir())
//console.log(os.hostname())
//console.log(os.platform())
//console.log(os.uptime())
//console.log(os.tmpdir())
//console.log(os.version())


const http = require('http');
const PORT = 8000
// try{http.createServer((req,res)=>{
//     res.writeHeader(200,{"Content-Type":'text/html'})
//     data = [{
//         batch:"B28WE",
//         time:"10:00 AM to 12:00 Noon"
//     },
//     {
//         batch:"B27WE",
//         time:"9:00 AM to 11:00 AM"
//     }
//     ]
//     res.write(JSON.stringify(data))
//     res.end()
// }).listen(PORT,()=>{
//     console.log('Server is up in ', PORT)
// })
// }
// catch(error)
// {
//     console.log(error)
// }
const data = 'I want to become a Doctor'
const fs = require('fs');
// try{http.createServer((req,res)=>{
//     res.writeHeader(200,{"Content-Type":'text/html'})
//     fs.readFile('index.html',(err,data)=>{
//         res.write(data)
//         res.end()
//     })
// }).listen(PORT,()=>{
//     console.log('Server is up in ', PORT)
// })
// }
// catch(error)
// {
//     console.log(error)
// }

http.createServer((req,res)=>{
    res.writeHeader(200,{"Content-Type":'text/html'})
    fs.writeFile('sample1.txt',data,(err)=>{
        if(err)
            console.log(err)
    })
    fs.readFile('sample1.txt',(err,d)=>{
        res.write(d)
        res.end()
    })
}).listen(PORT,()=>{
    console.log('Server is up in ', PORT)
})