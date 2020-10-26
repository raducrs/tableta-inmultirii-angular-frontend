import 'zone.js/dist/zone-node';
import { createServer, IncomingMessage, ServerResponse, Server } from 'http';
import { APP_BASE_HREF } from '@angular/common';
import { join } from 'path';
import { readFile } from 'fs';
import { renderEngine } from './render';
import { AppServerModule } from '../angular-ngrx-material-starter/src/main.server';
const browserFolder: string = join(
  process.cwd(),
  'dist/ng-universal-vanilla/browser'
);
const indexTemplate: string = join(browserFolder, 'index.html');
const port = process.env.PORT || 4000;

const renderTemplate = renderEngine();

const app: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const filePath: string = browserFolder + req.url;

    readFile(filePath, async (error, file) => {
      if (error) {
        const html = await renderTemplate(indexTemplate, {
          url: `http://${req.headers.host}${req.url}`,
          bootstrap: AppServerModule,
          providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        });
        res.writeHead(200);
        res.end(html);
      } else {
        if (req.url.includes('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }

        if (req.url.includes('.css')) {
          res.setHeader('Content-Type', 'text/css');
        }

        res.writeHead(200);
        res.end(file);
      }
    });
  }
);

app.listen(port, () => console.log(`Server is listening at ${port} port`));
