import picturefill from 'picturefill';

import { WebpMachine } from './webp-hero/dist/webp-machine';

const webpMachine = new WebpMachine();
webpMachine.polyfillDocument();

picturefill();
