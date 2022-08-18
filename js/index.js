// global variables React, ReactDOM, marked

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

marked.setOptions({
    breaks: true
});

function App() {
    let [text, setText] = React.useState(placeholder);
    let [editorMaximized, setEditorMaximized] = React.useState(false);
    let [previewerMaximized, setPreviewerMaximized] = React.useState(false);

    const handleEditorMaximize = () => {
        setEditorMaximized(!editorMaximized);
    }

    const handlePreviewerMaximize = () => {
        setPreviewerMaximized(!previewerMaximized);
    }

    const classes = editorMaximized ? ['editorWrapper maximized', 'previewerWrapper hidden', 'fa fa-compress'] :
                    previewerMaximized ? ['editorWrapper hidden', 'previewerWrapper maximized', 'fa fa-compress'] :
                    ['editorWrapper', 'previewerWrapper', 'fa fa-arrows-alt'];

    return (
        <div>
            <Editor classes={classes} handleEditorMaximize={handleEditorMaximize} text={text} setText={setText}/>
            <Previewer classes={classes} handlePreviewerMaximize={handlePreviewerMaximize} markdown={text}/>
        </div>
    );
}

function Editor(props) {
    return (
        <div className={props.classes[0]}>
            <div className="toolbar">
                <i className="far fa-edit"></i>
                <h2>Editor</h2>
                <i className={props.classes[2]} onClick={props.handleEditorMaximize}></i>
            </div>
            <textarea 
                name="text" 
                id="text" 
                cols="80" 
                rows="10"
                value={props.text}
                onChange={event => { props.setText(event.target.value) }}
            ></textarea>
        </div>
    );
}

function Previewer(props) {
    return (
        <div className={props.classes[1]}>
            <div className="toolbar">
                <i className="fas fa-glasses"></i>
                <h2>Previewer</h2>
                <i className={props.classes[2]} onClick={props.handlePreviewerMaximize}></i>
            </div>
            <div 
                className="textWrapper"
                dangerouslySetInnerHTML={{ __html: marked.parse(props.markdown) }}
            ></div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));