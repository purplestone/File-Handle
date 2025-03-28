declare module 'highlight.js' {
    interface HighlightResult {
        value: string;
        language?: string;
        relevance: number;
    }

    interface HighlightStatic {
        highlight: (language: string, code: string) => HighlightResult;
        getLanguage: (name: string) => any;
        highlightBlock: (block: Element) => void;
    }

    declare const hljs: HighlightStatic;
    export default hljs;
}

declare const hljs: import('highlight.js').HighlightStatic;