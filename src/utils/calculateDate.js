export function calculateDate (timestamp) {
  let displayDate = '';

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const dateComment = new Date(Number(timestamp));
  const commentYear = dateComment.getFullYear();
  const difference = (currentDate - Number(timestamp));
  const sec = difference / 1000;
  const min = sec / 60;
  const hours = min / 60;
  const days = hours / 24;

  if (hours > 1) {
    let options = { hour: 'numeric', minute: 'numeric' };

    if (days >= 1) {
      options = { day: 'numeric', month: 'long' };
    }

    if (currentYear > commentYear) {
      options = { day: 'numeric', month: 'long', year: 'numeric' };
    }

    return dateComment.toLocaleString('ru', options);
  }

  if (min >= 30) {
    displayDate = '30 минут назад';
  } else if (min >= 10) {
    displayDate = '10 минут назад';
  } else if (min >= 5) {
    displayDate = '5 минут назад';
  } else {
    displayDate = '1 минуту назад';
  }

  return displayDate;
}
