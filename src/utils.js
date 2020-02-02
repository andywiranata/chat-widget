import moment from 'moment/min/moment-with-locales.min';

moment.locale('id');

moment.fn.customFromNow = function (a) {
    if (Math.abs(moment().diff(this)) < 1000) { // 1000 milliseconds
        return 'sekarang';
    } else if(moment().diff(this, 'days') < 1) {
        return this.fromNow(a);
    } else {
        return moment(this).format('L')
    }
}
   
export function timestampToRelativeTime(timestamp) {
    return moment(timestamp).customFromNow();
}