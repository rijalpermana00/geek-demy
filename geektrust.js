const fs = require("fs")
const Main = require("./main");

const filename = process.argv[2]
fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw {
        code:500,
        msg:err.message
    }
    
    const main = new Main()
    main.main(data)
})