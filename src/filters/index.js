
import dayjs from 'dayjs';
import { CDN_PREFIX } from '@/config/const';

const filters = {
  dayjs (date, rule = 'MM-DD-YYYY') {
    return dayjs(date).format(rule);
  },
  formatString(str) {
    return str && str.length > 0 ? str : '-'
  },
  autoPrefix(url) {
    if (!url) return;
    if (url.startsWith('http')) {
      return url;
    } else {
      return `${CDN_PREFIX}/${url}`;
    }
  }
};

export default Vue => {
  for (const [key, fn] of Object.entries(filters)) {
    Vue.filter(key, fn);
    if (!Vue.prototype.$filters) {
      Vue.prototype.$filters = {}
    }
    Vue.prototype.$filters[key] = fn;
  }
};
