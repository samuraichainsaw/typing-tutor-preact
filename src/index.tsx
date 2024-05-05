import { render } from 'preact';

import './style.css';
import { useEffect, useState } from 'preact/hooks';
import { parseWords } from './utils';
import Word from './components/Word';



export function App() {
	const [words,setWords] = useState<Array<string>|null>(null);
	const [selectedWord, setSelectedWord] = useState<string|null>(null);
	const [index, setIndex] = useState<number>(-1);
	useEffect(()=>{
		const handler = (e:KeyboardEvent)=>{
			if (index+1<selectedWord.length && selectedWord[index+1].toLowerCase() === e.key.toLowerCase()){
				setIndex(index+1);
				if (index + 1 === selectedWord.length - 1){
					setSelectedWord(words[(words.length*Math.random())>>0]);
					setIndex(-1);
				}
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [selectedWord, index]);
	
	useEffect(()=>{
		const timeout = setTimeout(()=>{
			setSelectedWord(words[(words.length*Math.random())>>0]);
			setIndex(-1);
		}, 5000);
		return () => clearTimeout(timeout);
	}, [selectedWord]);

	useEffect(()=>{
		if (words === null){
			fetch("shakespeare.txt").then(r => r.text()).then(txt=>setWords(p => parseWords(txt)));
		} else {
			setSelectedWord(words[(words.length*Math.random())>>0]);
		}
	},[words]);
	if (words === null){
		return <div>
			<span class="loader"></span>
		</div>
	}
	if (selectedWord === null){
		return <></>;
	}
	return (
		<div>
			<Word word={selectedWord} index={index}/>
		</div>
	);
}


render(<App />, document.getElementById('app'));
