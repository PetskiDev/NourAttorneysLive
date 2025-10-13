import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = false;
const port = parseInt(process.env.PORT ?? '3000', 10);

const app = next({ dev, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url || '/', true);
        await handle(req, res, parsedUrl);
      } catch (error) {
        console.error('Error handling request', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    server.listen(port, () => {
      console.log(`> Next.js server ready on port ${port}`);
    });

    /** @param {string} signal */
    const shutdown = (signal) => {
      console.log(`Received ${signal}, shutting down...`);
      server.close(() => process.exit(0));
      setTimeout(() => process.exit(1), 5000).unref();
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  })
  .catch((/** @type {unknown} */ err) => {
    console.error('Failed to prepare Next app', err);
    process.exit(1);
  });


