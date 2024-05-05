import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { MAX_WIDTH } from '../utils';

type WordProps = {
    word:string;
    index: number;
}

const Word = (props:WordProps) => {
    const myDiv = useRef();
    const [left] = useState<number>((Math.random()*MAX_WIDTH)>>0);
    const [lastWord, setLastWord] = useState<string>(props.word);

    useEffect(()=>{
        const div = myDiv.current as HTMLDivElement;
        if (div){
            div.style.top=window.innerHeight + "px";
        }
    },[myDiv.current]);

    useEffect( () => {

        const div = myDiv.current as HTMLDivElement;
        if (div && lastWord.localeCompare(props.word)!==0){
            div.style.top=`-40px`;
            div.style.transitionDuration = '0.3s';
            
            Promise.all(div.getAnimations().map((animation) => animation.finished)).then(
                () =>  {
                    div.style.transitionDuration = '5s';
                    div.style.top=window.innerHeight + "px";
                    div.style.left=`${(Math.random()*MAX_WIDTH)>>0}px`;
                    setLastWord(props.word);
                }
            );
        }
    }, [props.word,lastWord]);
    const wordPrefix = props.index >= 0 ? lastWord.substring(0, props.index+1) : "";
    const wordSuffix = props.index >= 0 ? lastWord.substring(props.index+1) : lastWord;
    

    return <div className='word' style={{top:'0px', transition:"top 5s linear", left:`${left}px`}} ref={myDiv}>{wordPrefix}_{wordSuffix}</div>
}

export default Word; 