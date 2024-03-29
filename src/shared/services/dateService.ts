import dayjs from "dayjs";

const dateService = {
  now() {
    return dayjs().toDate().getTime();
  },

  nowAsDate() {
    return dayjs().toDate();
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

  subtractDays(date, amount) {
    return dayjs(date).subtract(amount, "day").toDate();
  },

  isSame(date1, date2) {
    return dayjs(date1).isSame(date2, "day");
  },

  getDaysBetween(start, end) {
    const result: string[] = [];

    let date = start;
    while (date <= end) {
      result.push(this.format(date, "YYYY-MM-DD"));
      date = this.getNextDay(date);
    }

    return result;
  },
};

export default dateService;
