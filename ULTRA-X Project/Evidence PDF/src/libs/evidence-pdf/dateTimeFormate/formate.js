const dateTime = new Date();
const year = dateTime.getFullYear();
const date = dateTime.getDate();
const month = dateTime.getMonth() + 1;
const hour = dateTime.getHours();
const mnt = dateTime.getMinutes();
const sec = dateTime.getSeconds();

const yearFinalFormate = year < 10 ? "0" + year : year;
const monthFinalFormate = month < 10 ? "0" + month : month;
const dateFinalFormate = date < 10 ? "0" + date : date;

const hourFinalFormate = hour < 10 ? "0" + hour : hour;
const mntFinalFormate = mnt < 10 ? "0" + mnt : mnt;
const secFinalFormate = sec < 10 ? "0" + sec : sec;

module.exports = {
  yearFinalFormate,
  monthFinalFormate,
  dateFinalFormate,
  hourFinalFormate,
  mntFinalFormate,
  secFinalFormate,
};
