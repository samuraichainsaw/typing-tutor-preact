const MAX_WIDTH = 1024;
const parseWords = (txt:string):Array<string> => {
	let map:{} = {};
	txt.toLocaleLowerCase().replace(/[^a-z\s]+/g, " ").split(/\s/).forEach((cv,idx)=> (map[cv] = true));
	return Object.keys(map);
}

export {parseWords, MAX_WIDTH};