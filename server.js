import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 4173;
const dist = join(here, 'dist');

app.disable('x-powered-by');
app.use(express.static(dist, { index: false, extensions: ['html'] }));
app.use((_request, response) => response.sendFile(join(dist, 'index.html')));

app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio is available on port ${port}`);
});
