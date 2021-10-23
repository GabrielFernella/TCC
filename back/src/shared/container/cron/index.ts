import { ScheduledTask } from 'node-cron';
import exec from './ProcessPayment';

class ManagerCron {
  jobs: ScheduledTask[];

  constructor() {
    this.jobs = [exec];
  }

  run() {
    this.jobs.forEach(element => element.start());
  }
}

export default new ManagerCron();
