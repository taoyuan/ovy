// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Application, ApplicationConfig} from '@ovy/core';


// Binding and Booter imports are required to infer types for BootMixin!
// tslint:disable-next-line:no-unused-variable
import {BootMixin, Booter, Binding} from '../../src';

export class BooterApp extends BootMixin(Application) {
  constructor(options?: ApplicationConfig) {
    super(options);
    this.projectRoot = __dirname;
  }
}
