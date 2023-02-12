import dayjs from "dayjs";

const dateService = {
  now() {
    return dayjs().toDate().getTime();
  },

  parse(dateStr) {
    return dayjs(dateStr).toDate();
  },

  format(date, format = "DD-MMM-YYYY") {
    if (typeof date === "string") {
      date = this.parse(date);
    }
    return dayjs(date).format(format);
  },

  getNextDay(date) {
    return dayjs(date).add(1, "day").toDate();
  },

  getPrevDay(date) {
    return dayjs(date).subtract(1, "day").toDate();
  },

  isSame(date1, date2) {
    return dayjs(date1).isSame(date2, "day");
  },

  getLastXDays(count, startDate) {
    const result = [];

    let date = startDate;
    for (let i = 0; i < count; i++) {
      result.unshift(this.format(date));
      date = this.getPrevDay(date);
    }

    return result;
  },
};

export default dateService;
