import Cards from './Cards.tsx'

const sampleMarkdown = `# **Israel admits "mistake"** of killing civilians on bicycle 
# **March 3, 2024**

## HR1 Violation

### **CONTEXT**

A times analysis of drone footage published by the Israeli military on March 3 shows that the target of a strike was wheeling a bicycle. 
This video contains graphic imagery.

![refuge camp](https://www.reuters.com/resizer/v2/CSV3J3B4SBOC5DJJNK33UYCSOM.jpg?auth=5708a7d4871142e74beafe6b55ed04c59800255ead553479c26c03c6219a3b5b&width=960&quality=80)

## HR2 Violation

### Slide 3`

// const sampleCardTitles = ["card 1", "card 2", "card 3"]

const ContentToCards = ({rawMarkdown, title, withTitles=true}:{rawMarkdown: string, title: string, withTitles?: boolean}) => {

    const cardTitles: string[] = [title];
    const markdownLines = rawMarkdown.split('\n');
    const processedMarkdown = markdownLines.map((line) => {
        // if line is markdown subheading
        if (line.trim().startsWith('## ')) {
            cardTitles.push(line.replace('## ', ''));
            return "---";
        }
        return line;
    }).join('\n');

    return (
        <Cards
        markdown={processedMarkdown}
        cardTitles={withTitles ? cardTitles : undefined}
        />
    )
}

const App = () => {
    return (
        <ContentToCards 
            rawMarkdown={sampleMarkdown}
            title='War Crime Chronicles'
        />
    )
}

export default App