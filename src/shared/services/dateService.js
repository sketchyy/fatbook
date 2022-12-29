import dayjs from "dayjs";

const dateService = {
  now() {
    return dayjs().toDate().getTime();
  },

  parse(dateStr) {
    return dayjs(dateStr).toDate();
  },

  format(date) {
    return dayjs(date).format("DD-MMM-YYYY");
  },
};

export default dateService;
