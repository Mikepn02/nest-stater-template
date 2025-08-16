const whiteList = ['http://localhost:3000', 'https://example.com'];

const options = {
  origin: (origin: string, callback: Function) => {
    console.log(origin);
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposedHeaders: ['*', 'Authorization'],
};
