import { useLayoutEffect, useRef, useState } from 'react';
import Cards from './Cards.tsx'
import MarkdownEditor from '@uiw/react-markdown-editor';

const sampleMarkdown = `# **AI adoption accelerates** as enterprise PoCs show **productivity gains**

## INTRO

CIOs are increasingly exploiting custom AI stacks and new features in line with business software to automate and streamline business processes — with a few caveats.

![article image](https://www.cio.com/wp-content/uploads/2024/04/shutterstock_669226147.jpg?resize=1240%2C697&quality=50&strip=all)

## TESTIMONY

Like other CIOs, Katrina Redmond has been inundated with opportunities to deploy AI that promise to speed business and operations processes, and optimize workflows. 
> “Everyone is running around trying to apply this technology that’s moving so fast, but without business outcomes, there’s no point to it. We need to continue to be mindful of business outcomes and apply use cases that make sense.”

says Redmond.

## PROOF OF CONCEPTS

To be successful, an AI proof of concept (PoC) project also needs to make good business sense, says CIO Vikram Nafde, CIO at Connecticut-based Webster Bank. 

> *“The cost of implementing and running AI models can be quite high, so you have to be really careful in assessing the business worthiness of AI use cases. This involves rigorous evaluation of potential benefits, risks, and costs associated with each AI initiative to ensure investments are prudent and aligned with our risk-return profile.”*


## EARLY RESULTS

At Eaton, a few PoCs are already generating results and they’ve used AI to consolidate information between more than 70 ERP systems globally. 

Leveraging expertise at software developer Palantir Technologies, Redmond’s team developed a model that consolidated and cleansed the data from those systems, then analyzed it to provide insights — and fairly sophisticated recommendations — to decision makers.

full article: [https://www.cio.com/article/2074821/ai-adoption-accelerates-as-enterprise-pocs-show-productivity-gains.html](https://www.cio.com/article/2074821/ai-adoption-accelerates-as-enterprise-pocs-show-productivity-gains.html)
`

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
                title='AI Adoption'
                backgroundColor='#eff3f1'
            />
        </>
    )
}

export default App