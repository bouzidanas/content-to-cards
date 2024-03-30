import { useLayoutEffect, useRef, useState } from 'react';
import Cards from './Cards.tsx'
import MarkdownEditor from '@uiw/react-markdown-editor';

const sampleMarkdown = `# **Israel admits "mistake"** of killing civilians on bicycle 
# **March 3, 2024**

## HR1 Violation

### **CONTEXT**

A times analysis of drone footage published by the Israeli military on March 3 shows that the target of a strike was wheeling a bicycle. 
This video contains graphic imagery.

![refuge camp](https://www.reuters.com/resizer/v2/CSV3J3B4SBOC5DJJNK33UYCSOM.jpg?auth=5708a7d4871142e74beafe6b55ed04c59800255ead553479c26c03c6219a3b5b&width=960&quality=80)

## HR2 Violation

### Card 3`

// const sampleCardTitles = ["card 1", "card 2", "card 3"]

const ContentToCards = ({rawMarkdown, title, withTitles=true, backgroundColor}:{rawMarkdown: string, title: string, withTitles?: boolean, backgroundColor?: string}) => {

    const cardTitles: string[] = [title];
    const markdownLines = rawMarkdown.split('\n');

    let charCount = 0;
    const processedMarkdown = markdownLines.map((line) => {
        charCount += line.length;
        console.log(charCount);
        // check if markdown line contains Image
        if (line.trim().match(/!\[.*\]\(.*\)/)) {
            charCount += 100;
        }
        // if line is markdown subheading
        if (line.trim().startsWith('## ')) {
            charCount = 0;
            cardTitles.push(line.replace('## ', ''));
            return "---";
        } 
        else if (charCount > 580) {
            if (line.trim().match(/!\[.*\]\(.*\)/)) {
                charCount = 100;
            }
            else {
                charCount = line.length;
            }
            cardTitles.push(cardTitles[cardTitles.length - 1] + ' (cont.)')
            return "---\n" + line;
        }
        return line;
    }).join('\n');

    return (
        <Cards
            backgroundColor={backgroundColor}
            markdown={processedMarkdown}
            cardTitles={withTitles ? cardTitles : undefined}
        />
    )
}

const App = () => {
    const [markdown, setMarkdown] = useState(sampleMarkdown);

    const newSlidesKey = useRef(0);

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-color-mode', 'light');
    }, []);
    return (
        <>
            <MarkdownEditor
                value={markdown}
                onChange={(value) => {
                    setMarkdown((previousMarkdown) => {
                        if (value !== previousMarkdown) {
                            newSlidesKey.current += 1;
                        }
                        return value;
                    });
                }}
                height='325px'
            />
            <ContentToCards 
                key={newSlidesKey.current}
                rawMarkdown={markdown}
                title='War Crime Chronicles'
                backgroundColor='#f5f5f5'
            />
        </>
    )
}

export default App