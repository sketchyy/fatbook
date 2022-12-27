import dayjs from "dayjs";

const dateService = {
  parse(dateStr) {
    return dayjs(dateStr).toDate();
  },

  format(date) {
    return dayjs(date).format("DD-MMM-YYYY");
  },
};

export default dateService;
