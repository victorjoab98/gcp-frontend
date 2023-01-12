import { formatDistanceToNow } from 'date-fns';

export const formatDistance = (date) => {
    const dateFormat = new Date(date);
    const fromNow = formatDistanceToNow(dateFormat);
    return fromNow;
};
