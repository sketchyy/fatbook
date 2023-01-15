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
};

export default dateService;
