import * as fs from 'fs';

export const writeLogsToFile = async (log: string, logType: string, path: string) => {
  if (!fs.existsSync('src/logs')) {
    fs.mkdirSync('src/logs');
    fs.mkdirSync('src/logs/allLogs');
    fs.mkdirSync('src/logs/errorLogs');
    fs.promises.writeFile('src/logs/allLogs/logs.txt', '');
    fs.promises.writeFile('src/logs/errorLogs/errorlogs.txt', '');
  } 

  let currentFile = await fs.promises.readdir(`${path}`).then(async (files) => {
    return { 
      fileName: files[files.length - 1],
      totalFiles: files.length
    };
  })

  if (!await (checkFileSize(`${path}/${currentFile.fileName}`, log)) ) {
    fs.promises.appendFile(`${path}/${currentFile.fileName}`, `\n ${new Date().toUTCString()} ${logType} ${log}`);
  } else {
    const newFile = currentFile.fileName.split('.')[0] + (currentFile.totalFiles + 1) + '.txt';
    fs.promises.writeFile(`${path}/${newFile}`, log);
  }
  
}

const checkFileSize = async (filePath: string, log: string): Promise<Boolean> => {
  const maxFileSize = +process.env.LOG_SIZE_KB * 1024;
  const stats = await fs.promises.stat(filePath);
  const fileSize = stats.size;
  const currentLogSize = Buffer.byteLength(JSON.stringify(log), 'utf8');
  return fileSize + currentLogSize > maxFileSize ? true : false;
}