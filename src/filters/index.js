
import dayjs from 'dayjs';

const filters = {
  dayjs (date, rule = 'MM-DD-YYYY') {
    return dayjs(date).format(rule);
  }
};

export default Vue => {
  for (const [key, fn] of Object.entries(filters)) {
    Vue.filter(key, fn);
  }
};
