import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppLightServerModule } from './src/main-light.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

const argv = require('minimist')(process.argv.slice(2));
const distFolder = argv['distFolder'] || join(
  process.cwd(),
  'dist/angular-ngrx-material-starter/light'
);

const portArg = argv['httpport']

// https://stackoverflow.com/questions/39085632/localstorage-is-not-defined-angular-universal
// https://stackoverflow.com/a/57781883/5763690
import 'localstorage-polyfill';
global['localStorage'] = localStorage;

const domino = require('domino');
const template = existsSync(join(distFolder, 'index.original.html'))
  ? 'index.original.html'
  : 'index';
const win = domino.createWindow(template);

global['window'] = win;
global['document'] = win.document;
global['DOMTokenList'] = win.DOMTokenList;
global['Node'] = win.Node;
global['Text'] = win.Text;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;

const cache = require('memory-cache');

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppLightServerModule
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('/cache/invalidate',
    (req, res) => {
      console.log('cache cleared')
      cache.clear()
      res.send({status: 'cleared cache'})
    }
  );

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y'
    })
  );

  server.get(
    'assets/*.*',
    express.static(distFolder, {
      maxAge: '1y'
    })
  );

  // TODO check pre generated routes

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    // res.render(indexHtml, {
    //   req,
    //   providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
    // });
    const entry = cache.get(req.originalUrl); // check if we have a cache entry
    if (entry) {
      console.log('serving from cache');
      res.send(entry);                        // send the cache entry
    } else {
      console.log('hot start', req.originalUrl);
      res.render('index', {
          req,
          providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]
        },
        (err, html) => {
        if (err){
          console.error(err);
          res.send(err);
        } else {
          console.log('received', req.originalUrl)
          cache.put(req.originalUrl, html);     // save the HTML in the cache
          res.send(html);
        }
      });
    }
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || portArg || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
// declare const __non_webpack_require__: NodeRequire;
// const mainModule = __non_webpack_require__.main;
// const moduleFilename = (mainModule && mainModule.filename) || '';
// if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
//   run();
// }
run();
export * from './src/main-light.server';
