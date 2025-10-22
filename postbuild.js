const fs = require('fs');
const path = require('path');

const manifest = {
  version: 1,
  routes: {},
  dynamicRoutes: {},
  notFoundRoutes: [],
  preview: {
    previewModeId: '',
    previewModeEncryptionKey: '',
    previewModeSigningKey: ''
  }
};

const filePath = path.join(process.cwd(), '.next', 'prerender-manifest.json');
fs.writeFileSync(filePath, JSON.stringify(manifest), { encoding: 'utf8' });
console.log('✓ prerender-manifest.json created');
