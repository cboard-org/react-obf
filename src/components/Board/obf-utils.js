const JSZip = require('jszip');

export const parseOBZ = zip => {
  return new Promise((resolve, reject) => {
    const boardSet = {
      boards: {},
      root: ''
    };

    let count = 0;

    zip.forEach((relativePath, zipEntry) => {
      count++;

      zip
        .file(relativePath)
        .async('string')
        .then(data => {
          if (relativePath.includes('obf')) {
            const parsedData = JSON.parse(data);
            boardSet.boards[relativePath] = parsedData;
          }

          if (relativePath.includes('manifest')) {
            const parsedData = JSON.parse(data);
            boardSet.root = parsedData.root;
          }

          if (!--count) {
            resolve(boardSet);
          }
        });
    });
  });
};

export const readOBZFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      JSZip.loadAsync(file, { base64: true })
        .then(parseOBZ)
        .then(boardSet => {
          resolve(boardSet);
        });
    };

    reader.readAsDataURL(file);
  });
};

export const readOBFFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const board = JSON.parse(event.target.result);
      resolve(board);
    };

    reader.readAsText(file);
  });
};
