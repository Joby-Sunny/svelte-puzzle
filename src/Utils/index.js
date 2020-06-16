import moment from 'moment';
const TIME_FORMAT = 'LTS';

export const Time = {
  fromNow(time) {
    return moment(time).fromNow();
  },
  formatTime(time) {
    return moment(time).format(TIME_FORMAT);
  },
};
