
// tslint:disable:no-console

import { AutoWired, Singleton } from 'typescript-ioc';
import { BaseHelper } from '../base/BaseHelper';
import { ICommandResult } from '../interfaces';

@Singleton
@AutoWired
export class Logger extends BaseHelper {
  log(...args) {
    console.log(new Date(), ...args);
  }

  logCommandResult(result: ICommandResult) {
    if (!result.result && !result.resultString) { return; }
    this.log(result);
  }
}
