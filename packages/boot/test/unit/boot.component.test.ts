// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {Application} from '@ovy/core';
import {BootBindings, Bootstrapper, BootMixin} from '../../src';

describe('boot.component unit tests', () => {
  class BootableApp extends BootMixin(Application) {}

  let app: BootableApp;

  beforeEach(getApp);

  it('binds BootStrapper class', async () => {
    const bootstrapper = await app.get(BootBindings.BOOTSTRAPPER_KEY);
    expect(bootstrapper).to.be.an.instanceOf(Bootstrapper);
  });


  function getApp() {
    app = new BootableApp();
    app.bind(BootBindings.PROJECT_ROOT).to(__dirname);
  }
});
