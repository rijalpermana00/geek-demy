// test-utils.js
function captureConsoleLog(callback) {
    const consoleLog = console.log;
    const logs = [];
    console.log = (output) => {
      logs.push(output);
    };
  
    callback();
  
    console.log = consoleLog;
    return logs.join('\n');
  }
  
  module.exports = {
    captureConsoleLog,
  };
  