import {Box, BoxArray, BoxMap, BoxSet} from "./state";
import {
    insertBoxArrayAsText,
    insertBoxAsText,
    insertBoxMapAsText,
    insertBoxNode,
    insertBoxNodes,
    insertBoxSetAsText
} from "./glue";
import {svgElements} from "./constants";

type IntrinsicToElement<O extends Element> = {
    ref?: (element: O) => void
} & (O extends SVGSVGElement ? {xmlns?: string} : {}) & {
    [K in keyof O]?: (O extends SVGElement ? string : O[K])
} & (O extends SVGElement ? {
    [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K]
} : {});

type WebElement = Element;

export namespace JSX {
    export type Element = Node | Node[];

    export type HTMLElements = {
        // Main root
        "html": HTMLHtmlElement;

        // Document metadata
        "base": HTMLBaseElement;
        "head": HTMLHeadElement;
        "link": HTMLLinkElement;
        "meta": HTMLMetaElement;
        "style": HTMLStyleElement;
        "title": HTMLTitleElement;

        // Sectioning root
        "body": HTMLBodyElement;

        // Content sectioning
        "address": HTMLElement;
        "article": HTMLElement;
        "aside": HTMLElement;
        "footer": HTMLElement;
        "header": HTMLElement;
        "h1": HTMLHeadingElement;
        "h2": HTMLHeadingElement;
        "h3": HTMLHeadingElement;
        "h4": HTMLHeadingElement;
        "h5": HTMLHeadingElement;
        "h6": HTMLHeadingElement;
        "hgroup": HTMLElement;
        "main": HTMLElement;
        "nav": HTMLElement;
        "section": HTMLElement;
        "search": HTMLElement;

        // Text content
        "blockquote": HTMLQuoteElement;
        "dd": HTMLElement;
        "div": HTMLDivElement;
        "dl": HTMLDListElement;
        "dt": HTMLElement;
        "figcaption": HTMLElement;
        "figure": HTMLElement;
        "hr": HTMLHRElement;
        "li": HTMLLIElement;
        "menu": HTMLMenuElement;
        "ol": HTMLOListElement;
        "p": HTMLParagraphElement;
        "pre": HTMLPreElement;
        "ul": HTMLUListElement;

        // Inline text semantics
        "a": HTMLAnchorElement;
        "abbr": HTMLElement;
        "b": HTMLElement;
        "bdi": HTMLElement;
        "bdo": HTMLElement;
        "br": HTMLBRElement;
        "cite": HTMLQuoteElement; // Spec is contradictory with `HTMLElement`.
        "code": HTMLElement;
        "data": HTMLDataElement;
        "dfn": HTMLElement;
        "em": HTMLElement;
        "i": HTMLElement;
        "kbd": HTMLElement;
        "mark": HTMLElement;
        "q": HTMLQuoteElement;
        "rp": HTMLElement;
        "rt": HTMLElement;
        "ruby": HTMLElement;
        "s": HTMLElement;
        "samp": HTMLElement;
        "small": HTMLElement;
        "span": HTMLSpanElement;
        "strong": HTMLElement;
        "sub": HTMLElement;
        "sup": HTMLElement;
        "time": HTMLTimeElement;
        "u": HTMLElement;
        "var": HTMLElement;
        "wbr": HTMLElement;

        // Image and multimedia
        "area": HTMLAreaElement;
        "audio": HTMLAudioElement;
        "img": HTMLImageElement;
        "map": HTMLMapElement;
        "track": HTMLTrackElement;
        "video": HTMLVideoElement;

        // Embedded content
        "embed": HTMLEmbedElement;
        "iframe": HTMLIFrameElement;
        "object": HTMLObjectElement;
        "picture": HTMLPictureElement;
        // "portal": HTMLPortalElement>; // Experimental
        "source": HTMLSourceElement;

        // SVG and MathML
        "svg": SVGSVGElement;
        "math": MathMLElement;

        // Scripting
        "canvas": HTMLCanvasElement;
        "noscript": HTMLElement;
        "script": HTMLScriptElement;

        // Demarcating edits
        "del": HTMLModElement;
        "ins": HTMLModElement;

        // Table content
        "caption": HTMLTableCaptionElement;
        "col": HTMLTableColElement;
        "colgroup": HTMLTableColElement;
        "table": HTMLTableElement;
        "tbody": HTMLTableSectionElement;
        "td": HTMLTableCellElement;
        "tfoot": HTMLTableSectionElement;
        "th": HTMLTableCellElement;
        "thead": HTMLTableSectionElement;
        "tr": HTMLTableRowElement;

        // Forms
        "button": HTMLButtonElement;
        "datalist": HTMLDataListElement;
        "fieldset": HTMLFieldSetElement;
        "form": HTMLFormElement;
        "input": HTMLInputElement;
        "label": HTMLLabelElement;
        "legend": HTMLLegendElement;
        "meter": HTMLMeterElement;
        "optgroup": HTMLOptGroupElement;
        "option": HTMLOptionElement;
        "output": HTMLOutputElement;
        "progress": HTMLProgressElement;
        "select": HTMLSelectElement;
        "textarea": HTMLTextAreaElement;

        // Interactive elements
        "details": HTMLDetailsElement;
        "dialog": HTMLDialogElement;
        "summary": HTMLElement;

        // Web components
        "slot": HTMLSlotElement;
        "template": HTMLTemplateElement;
    }

    export type SVGElements = {
        // Animation elements
        "animate": SVGAnimateElement;
        "animateMotion": SVGAnimateMotionElement;
        "animateTransform": SVGAnimateTransformElement;
        "mpath": SVGMPathElement;
        "set": SVGSetElement;

        // Basic shapes
        "circle": SVGCircleElement;
        "ellipse": SVGEllipseElement;
        "line": SVGLineElement;
        "polygon": SVGPolygonElement;
        "polyline": SVGPolylineElement;
        "rect": SVGRectElement;

        // Container elements
        "a": SVGAElement;
        "defs": SVGDefsElement;
        "g": SVGGElement;
        "marker": SVGMarkerElement;
        "mask": SVGMaskElement;
        "pattern": SVGPatternElement;
        "svg": SVGSVGElement;
        "switch": SVGSwitchElement;
        "symbol": SVGSymbolElement;

        // Descriptive elements
        "desc": SVGDescElement;
        "metadata": SVGMetadataElement;
        "title": SVGTitleElement;

        // Filter primitive elements
        "feBlend": SVGFEBlendElement;
        "feColorMatrix": SVGFEColorMatrixElement;
        "feComponentTransfer": SVGFEComponentTransferElement;
        "feComposite": SVGFECompositeElement;
        "feConvolveMatrix": SVGFEConvolveMatrixElement;
        "feDiffuseLighting": SVGFEDiffuseLightingElement;
        "feDisplacementMap": SVGFEDisplacementMapElement;
        "feDistanceLight": SVGFEDistantLightElement;
        "feDropShadow": SVGFEDropShadowElement;
        "feFlood": SVGFEFloodElement;
        "feFuncA": SVGFEFuncAElement;
        "feFuncB": SVGFEFuncBElement;
        "feFuncG": SVGFEFuncGElement;
        "feFuncR": SVGFEFuncRElement;
        "feGaussianBlur": SVGFEGaussianBlurElement;
        "feImage": SVGFEImageElement;
        "feMerge": SVGFEMergeElement;
        "feMergeNode": SVGFEMergeNodeElement;
        "feMorphology": SVGFEMorphologyElement;
        "feOffset": SVGFEOffsetElement;
        "fePointLight": SVGFEPointLightElement;
        "feSpecularLightning": SVGFESpecularLightingElement;
        "feSpotLight": SVGFESpotLightElement;
        "feTile": SVGFETileElement;
        "feTurbulence": SVGFETurbulenceElement;
        "filter": SVGFilterElement;

        // Gradient elements
        "linearGradient": SVGLinearGradientElement;
        "radialGradient": SVGRadialGradientElement;
        "stop": SVGStopElement;

        // Other
        "clipPath": SVGClipPathElement;
        "foreignObject": SVGForeignObjectElement;
        "image": SVGImageElement;
        "path": SVGPathElement;
        "script": SVGScriptElement;
        "text": SVGTextElement;
        "textPath": SVGTextPathElement;
        "tspan": SVGTSpanElement;
        "use": SVGUseElement;
        "view": SVGViewElement;
    };

    export type IntrinsicElements = {
        [tagName: string]: IntrinsicToElement<WebElement>;
    } & {
        [Key in keyof HTMLElements]: IntrinsicToElement<HTMLElements[Key]>
    } & {
        [Key in keyof SVGElements]: IntrinsicToElement<SVGElements[Key]>
    }
}

const keyMap: {[key: string]: string} = {
    "class": "className"
};

function flatChildren(target: JSX.Element[], children: any[]) {
    for(let i = 0; i < children.length; ++i) {
        const child = children[i];
        if(child instanceof Node) target.push(child);
        else if(child instanceof Array) flatChildren(target, child);
        else if(child instanceof Box) {
            if(child.value instanceof Node)
                target.push(insertBoxNode(child));
            else if(child.value instanceof Array)
                target.push(insertBoxNodes(child));
            else target.push(insertBoxAsText(child));
        } else if(child instanceof BoxArray) target.push(insertBoxArrayAsText(child));
        else if(child instanceof BoxSet) target.push(insertBoxSetAsText(child));
        else if(child instanceof BoxMap) target.push(insertBoxMapAsText(child));
        else target.push(document.createTextNode(child));
    }
}

function translateKey(key: string): string {
    if(key in keyMap) return keyMap[key]!;
    return key;
}

// /**
//  * Maps the prototypes to sets. If a key is writable it is in the set mapped by the prototype.
//  */
// const writableCache = new Map<object, Map<string, boolean>>();

function isWritable(obj: object, key: string) {
    while(true) {
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        if(desc) return desc.writable || !!desc.set;

        obj = Object.getPrototypeOf(obj);
        if(obj === null) return false;
    }
}

export function createElement(
    tag: string | Function,
    props: {[index: string]: any} | null,
    ...givenChildren: any[]
): JSX.Element {
    const children: JSX.Element[] = [];
    flatChildren(children, givenChildren);

    props = props || {};

    if(typeof tag === "function") {
        props.children = children;
        return tag(props);
    }

    const element: Element & {[key: string]: any} = svgElements.has(tag)
        ? (delete props.xmlns, document.createElementNS("http://www.w3.org/2000/svg", tag))
        : document.createElement(tag);

    Object.keys(props).forEach(key => {
        const value = props![key];
        const translatedKey = translateKey(key);

        // `element` is always `{}`.
        if(isWritable(element.__proto__, translatedKey)) { // idl attribute
            if(value instanceof Box) {
                element[translatedKey] = value.value;
                value.addListener(value => element[translatedKey] = value);
            } else element[translatedKey] = value;
        } else { // html attribute
            if(value instanceof Box) {
                element.setAttribute(key, value.value);
                value.addListener(value => element.setAttribute(key, value));
            } else element.setAttribute(key, value);
        }
    });

    children.forEach(child => Array.isArray(child)
        ? element.append(...child)
        : element.append(child));

    if(props["ref"]) props.ref(element);

    return element;
}

export function Fragment({
    children
}: {
    children: any[]
}): JSX.Element[] {
    const flattenChildren: JSX.Element[] = [];
    flatChildren(flattenChildren, children);
    return children;
}