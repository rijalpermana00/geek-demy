const fs = require("fs")
const Main = require("./main");
const ERROR_CODE = 500

const filename = process.argv[2]
fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw {
        code:ERROR_CODE,
        msg:err.message
    }
    
    const main = new Main()
    main.main(data)
})