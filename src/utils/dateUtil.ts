/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;

/**
 * 时间戳格式化时间
 * @param timestamp
 */
export const timestampToTime = (timestamp: number) => {
  if (timestamp > 0) {
    return dayjs.unix(timestamp).format(DATE_TIME_FORMAT);
  }
  return '';
};
