export const exerciseOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
		'x-rapidapi-key': '21fa10e8bfmsh62ba1568a867f21p13aeccjsn0787c9813292',
	},
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
		'X-RapidAPI-Key': '21fa10e8bfmsh62ba1568a867f21p13aeccjsn0787c9813292',
	},
};

export const fetchData = async (myUrl, exerciseOptions) => {
	const res = await fetch(myUrl, exerciseOptions);
	const data = await res.json();
	return data;
};