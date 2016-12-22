const isPast = require('date-fns/is_past');
const differenceInMilliseconds = require('date-fns/difference_in_milliseconds');
const addSeconds = require('date-fns/add_seconds');

const expired = headers => isPast(expired.on(headers));

expired.in = headers => differenceInMilliseconds(expired.on(headers), new Date());

expired.on = headers => {
	const originDate = new Date(headers.date);

  // Get max age ms
	let maxAge = headers['cache-control'] && headers['cache-control'].match(/max-age=(\d+)/);
	maxAge = parseInt(maxAge ? maxAge[1] : 0, 10);

  // Take current age into account
	if (headers.age) {
		maxAge -= headers.age;
	}

  // Calculate expirey date
	return addSeconds(new Date(originDate), maxAge);
};

module.exports = expired;
