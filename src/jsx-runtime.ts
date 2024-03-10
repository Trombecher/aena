import {Box} from "./box";

export const svgElements = new Set("altGlyph,altGlyphDef,altGlyphItem,animate,animateColor,animateMotion,animateTransform,animation,circle,clipPath,color-profile,cursor,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,font,font-face,font-face-format,font-face-name,font-face-src,font-face-uri,foreignObject,g,glyph,glyphRef,handler,hkern,image,line,linearGradient,listener,marker,mask,metadata,missing-glyph,mpath,path,pattern,polygon,polyline,prefetch,radialGradient,rect,set,solidColor,stop,svg,switch,symbol,tbreak,text,textArea,textPath,tref,tspan,unknown,use,view,vkern".split(",")) as ReadonlySet<string>;

type DOMElement = Element;

/**
 * Adapted from [SolidJS](https://github.com/solidjs/solid/tree/main/packages/solid).
 */
export namespace JSX {
    export type Element = Node
        | Element[]
        | ElementPrimitive;
    export type ElementPrimitive = number | object | string | boolean | symbol | null | undefined;

    type BoxedOr<T> = Readonly<Box<T>> | T;

    interface EventHandler<T, E extends Event> {
        (
            e: E & {
                currentTarget: T;
                target: DOMElement;
            }
        ): void;
    }

    interface BoundEventHandler<T, E extends Event> {
        0: (
            data: any,
            e: E & {
                currentTarget: T;
                target: DOMElement;
            }
        ) => void;
        1: any;
    }

    type EventHandlerUnion<T, E extends Event> = EventHandler<T, E> | BoundEventHandler<T, E>;

    interface InputEventHandler<T, E extends InputEvent> {
        (
            e: E & {
                currentTarget: T;
                target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                    ? T
                    : DOMElement;
            }
        ): void;
    }

    interface BoundInputEventHandler<T, E extends InputEvent> {
        0: (
            data: any,
            e: E & {
                currentTarget: T;
                target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                    ? T
                    : DOMElement;
            }
        ) => void;
        1: any;
    }

    type InputEventHandlerUnion<T, E extends InputEvent> =
        | InputEventHandler<T, E>
        | BoundInputEventHandler<T, E>;

    interface ChangeEventHandler<T, E extends Event> {
        (
            e: E & {
                currentTarget: T;
                target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                    ? T
                    : DOMElement;
            }
        ): void;
    }

    interface BoundChangeEventHandler<T, E extends Event> {
        0: (
            data: any,
            e: E & {
                currentTarget: T;
                target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                    ? T
                    : DOMElement;
            }
        ) => void;
        1: any;
    }

    type ChangeEventHandlerUnion<T, E extends Event> =
        | ChangeEventHandler<T, E>
        | BoundChangeEventHandler<T, E>;

    interface FocusEventHandler<T, E extends FocusEvent> {
        (
            e: E & {
                currentTarget: T;
                target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                    ? T
                    : DOMElement;
            }
        ): void;
    }

    interface BoundFocusEventHandler<T, E extends FocusEvent> {
        0: (
            data: any,
            e: E & {
                currentTarget: T;
                target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                    ? T
                    : DOMElement;
            }
        ) => void;
        1: any;
    }

    type FocusEventHandlerUnion<T, E extends FocusEvent> =
        | FocusEventHandler<T, E>
        | BoundFocusEventHandler<T, E>;

    const SERIALIZABLE: unique symbol = Symbol("SERIALIZABLE");

    interface SerializableAttributeValue {
        toString(): string;

        [SERIALIZABLE]: never;
    }

    interface CustomAttributes<T> {
        ref?: (element: T) => void;
    }

    interface DOMAttributes<T> extends CustomAttributes<T>, CustomEventHandlersLowerCase<T> {
        children?: Element;
        innerHTML?: string;
        innerText?: string | number;
        textContent?: string | number;
        // lower case events
        oncopy?: EventHandlerUnion<T, ClipboardEvent>;
        oncut?: EventHandlerUnion<T, ClipboardEvent>;
        onpaste?: EventHandlerUnion<T, ClipboardEvent>;
        oncompositionend?: EventHandlerUnion<T, CompositionEvent>;
        oncompositionstart?: EventHandlerUnion<T, CompositionEvent>;
        oncompositionupdate?: EventHandlerUnion<T, CompositionEvent>;
        onfocusout?: FocusEventHandlerUnion<T, FocusEvent>;
        onfocusin?: FocusEventHandlerUnion<T, FocusEvent>;
        onencrypted?: EventHandlerUnion<T, Event>;
        ondragexit?: EventHandlerUnion<T, DragEvent>;
    }

    /**
     * @type {GlobalEventHandlers}
     */
    interface CustomEventHandlersLowerCase<T> {
        onabort?: EventHandlerUnion<T, Event>;
        onanimationend?: EventHandlerUnion<T, AnimationEvent>;
        onanimationiteration?: EventHandlerUnion<T, AnimationEvent>;
        onanimationstart?: EventHandlerUnion<T, AnimationEvent>;
        onauxclick?: EventHandlerUnion<T, MouseEvent>;
        onbeforeinput?: InputEventHandlerUnion<T, InputEvent>;
        onblur?: FocusEventHandlerUnion<T, FocusEvent>;
        oncanplay?: EventHandlerUnion<T, Event>;
        oncanplaythrough?: EventHandlerUnion<T, Event>;
        onchange?: ChangeEventHandlerUnion<T, Event>;
        onclick?: EventHandlerUnion<T, MouseEvent>;
        oncontextmenu?: EventHandlerUnion<T, MouseEvent>;
        ondblclick?: EventHandlerUnion<T, MouseEvent>;
        ondrag?: EventHandlerUnion<T, DragEvent>;
        ondragend?: EventHandlerUnion<T, DragEvent>;
        ondragenter?: EventHandlerUnion<T, DragEvent>;
        ondragleave?: EventHandlerUnion<T, DragEvent>;
        ondragover?: EventHandlerUnion<T, DragEvent>;
        ondragstart?: EventHandlerUnion<T, DragEvent>;
        ondrop?: EventHandlerUnion<T, DragEvent>;
        ondurationchange?: EventHandlerUnion<T, Event>;
        onemptied?: EventHandlerUnion<T, Event>;
        onended?: EventHandlerUnion<T, Event>;
        onerror?: EventHandlerUnion<T, Event>;
        onfocus?: FocusEventHandlerUnion<T, FocusEvent>;
        ongotpointercapture?: EventHandlerUnion<T, PointerEvent>;
        oninput?: InputEventHandlerUnion<T, InputEvent>;
        oninvalid?: EventHandlerUnion<T, Event>;
        onkeydown?: EventHandlerUnion<T, KeyboardEvent>;
        onkeypress?: EventHandlerUnion<T, KeyboardEvent>;
        onkeyup?: EventHandlerUnion<T, KeyboardEvent>;
        onload?: EventHandlerUnion<T, Event>;
        onloadeddata?: EventHandlerUnion<T, Event>;
        onloadedmetadata?: EventHandlerUnion<T, Event>;
        onloadstart?: EventHandlerUnion<T, Event>;
        onlostpointercapture?: EventHandlerUnion<T, PointerEvent>;
        onmousedown?: EventHandlerUnion<T, MouseEvent>;
        onmouseenter?: EventHandlerUnion<T, MouseEvent>;
        onmouseleave?: EventHandlerUnion<T, MouseEvent>;
        onmousemove?: EventHandlerUnion<T, MouseEvent>;
        onmouseout?: EventHandlerUnion<T, MouseEvent>;
        onmouseover?: EventHandlerUnion<T, MouseEvent>;
        onmouseup?: EventHandlerUnion<T, MouseEvent>;
        onpause?: EventHandlerUnion<T, Event>;
        onplay?: EventHandlerUnion<T, Event>;
        onplaying?: EventHandlerUnion<T, Event>;
        onpointercancel?: EventHandlerUnion<T, PointerEvent>;
        onpointerdown?: EventHandlerUnion<T, PointerEvent>;
        onpointerenter?: EventHandlerUnion<T, PointerEvent>;
        onpointerleave?: EventHandlerUnion<T, PointerEvent>;
        onpointermove?: EventHandlerUnion<T, PointerEvent>;
        onpointerout?: EventHandlerUnion<T, PointerEvent>;
        onpointerover?: EventHandlerUnion<T, PointerEvent>;
        onpointerup?: EventHandlerUnion<T, PointerEvent>;
        onprogress?: EventHandlerUnion<T, Event>;
        onratechange?: EventHandlerUnion<T, Event>;
        onreset?: EventHandlerUnion<T, Event>;
        onscroll?: EventHandlerUnion<T, Event>;
        onscrollend?: EventHandlerUnion<T, Event>;
        onseeked?: EventHandlerUnion<T, Event>;
        onseeking?: EventHandlerUnion<T, Event>;
        onselect?: EventHandlerUnion<T, UIEvent>;
        onstalled?: EventHandlerUnion<T, Event>;
        onsubmit?: EventHandlerUnion<
            T,
            Event & {
            submitter: HTMLElement;
        }
        >;
        onsuspend?: EventHandlerUnion<T, Event>;
        ontimeupdate?: EventHandlerUnion<T, Event>;
        ontouchcancel?: EventHandlerUnion<T, TouchEvent>;
        ontouchend?: EventHandlerUnion<T, TouchEvent>;
        ontouchmove?: EventHandlerUnion<T, TouchEvent>;
        ontouchstart?: EventHandlerUnion<T, TouchEvent>;
        ontransitionstart?: EventHandlerUnion<T, TransitionEvent>;
        ontransitionend?: EventHandlerUnion<T, TransitionEvent>;
        ontransitionrun?: EventHandlerUnion<T, TransitionEvent>;
        ontransitioncancel?: EventHandlerUnion<T, TransitionEvent>;
        onvolumechange?: EventHandlerUnion<T, Event>;
        onwaiting?: EventHandlerUnion<T, Event>;
        onwheel?: EventHandlerUnion<T, WheelEvent>;
    }

    type HTMLAutocapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";
    type HTMLDir = "ltr" | "rtl" | "auto";
    type HTMLFormEncType = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
    type HTMLFormMethod = "post" | "get" | "dialog";
    type HTMLCrossorigin = "anonymous" | "use-credentials" | "";
    type HTMLReferrerPolicy =
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    type HTMLIframeSandbox =
        | "allow-downloads-without-user-activation"
        | "allow-downloads"
        | "allow-forms"
        | "allow-modals"
        | "allow-orientation-lock"
        | "allow-pointer-lock"
        | "allow-popups"
        | "allow-popups-to-escape-sandbox"
        | "allow-presentation"
        | "allow-same-origin"
        | "allow-scripts"
        | "allow-storage-access-by-user-activation"
        | "allow-top-navigation"
        | "allow-top-navigation-by-user-activation"
        | "allow-top-navigation-to-custom-protocols";
    type HTMLLinkAs =
        | "audio"
        | "document"
        | "embed"
        | "fetch"
        | "font"
        | "image"
        | "object"
        | "script"
        | "style"
        | "track"
        | "video"
        | "worker";

    // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
    interface AriaAttributes {
        /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
        "aria-activedescendant"?: string;
        /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
        "aria-atomic"?: boolean | "false" | "true";
        /**
         * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
         * presented if they are made.
         */
        "aria-autocomplete"?: "none" | "inline" | "list" | "both";
        /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
        "aria-busy"?: boolean | "false" | "true";
        /**
         * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
         * @see aria-pressed @see aria-selected.
         */
        "aria-checked"?: boolean | "false" | "mixed" | "true";
        /**
         * Defines the total number of columns in a table, grid, or treegrid.
         * @see aria-colindex.
         */
        "aria-colcount"?: number | string;
        /**
         * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
         * @see aria-colcount @see aria-colspan.
         */
        "aria-colindex"?: number | string;
        /**
         * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
         * @see aria-colindex @see aria-rowspan.
         */
        "aria-colspan"?: number | string;
        /**
         * Identifies the element (or elements) whose contents or presence are controlled by the current element.
         * @see aria-owns.
         */
        "aria-controls"?: string;
        /** Indicates the element that represents the current item within a container or set of related elements. */
        "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time";
        /**
         * Identifies the element (or elements) that describes the object.
         * @see aria-labelledby
         */
        "aria-describedby"?: string;
        /**
         * Identifies the element that provides a detailed, extended description for the object.
         * @see aria-describedby.
         */
        "aria-details"?: string;
        /**
         * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
         * @see aria-hidden @see aria-readonly.
         */
        "aria-disabled"?: boolean | "false" | "true";
        /**
         * Indicates what functions can be performed when a dragged object is released on the drop target.
         * @deprecated in ARIA 1.1
         */
        "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup";
        /**
         * Identifies the element that provides an error message for the object.
         * @see aria-invalid @see aria-describedby.
         */
        "aria-errormessage"?: string;
        /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
        "aria-expanded"?: boolean | "false" | "true";
        /**
         * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
         * allows assistive technology to override the general default of reading in document source order.
         */
        "aria-flowto"?: string;
        /**
         * Indicates an element's "grabbed" state in a drag-and-drop operation.
         * @deprecated in ARIA 1.1
         */
        "aria-grabbed"?: boolean | "false" | "true";
        /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
        "aria-haspopup"?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog";
        /**
         * Indicates whether the element is exposed to an accessibility API.
         * @see aria-disabled.
         */
        "aria-hidden"?: boolean | "false" | "true";
        /**
         * Indicates the entered value does not conform to the format expected by the application.
         * @see aria-errormessage.
         */
        "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling";
        /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
        "aria-keyshortcuts"?: string;
        /**
         * Defines a string value that labels the current element.
         * @see aria-labelledby.
         */
        "aria-label"?: string;
        /**
         * Identifies the element (or elements) that labels the current element.
         * @see aria-describedby.
         */
        "aria-labelledby"?: string;
        /** Defines the hierarchical level of an element within a structure. */
        "aria-level"?: number | string;
        /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
        "aria-live"?: "off" | "assertive" | "polite";
        /** Indicates whether an element is modal when displayed. */
        "aria-modal"?: boolean | "false" | "true";
        /** Indicates whether a text box accepts multiple lines of input or only a single line. */
        "aria-multiline"?: boolean | "false" | "true";
        /** Indicates that the user may select more than one item from the current selectable descendants. */
        "aria-multiselectable"?: boolean | "false" | "true";
        /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
        "aria-orientation"?: "horizontal" | "vertical";
        /**
         * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
         * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
         * @see aria-controls.
         */
        "aria-owns"?: string;
        /**
         * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
         * A hint could be a sample value or a brief description of the expected format.
         */
        "aria-placeholder"?: string;
        /**
         * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
         * @see aria-setsize.
         */
        "aria-posinset"?: number | string;
        /**
         * Indicates the current "pressed" state of toggle buttons.
         * @see aria-checked @see aria-selected.
         */
        "aria-pressed"?: boolean | "false" | "mixed" | "true";
        /**
         * Indicates that the element is not editable, but is otherwise operable.
         * @see aria-disabled.
         */
        "aria-readonly"?: boolean | "false" | "true";
        /**
         * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
         * @see aria-atomic.
         */
        "aria-relevant"?:
            | "additions"
            | "additions removals"
            | "additions text"
            | "all"
            | "removals"
            | "removals additions"
            | "removals text"
            | "text"
            | "text additions"
            | "text removals";
        /** Indicates that user input is required on the element before a form may be submitted. */
        "aria-required"?: boolean | "false" | "true";
        /** Defines a human-readable, author-localized description for the role of an element. */
        "aria-roledescription"?: string;
        /**
         * Defines the total number of rows in a table, grid, or treegrid.
         * @see aria-rowindex.
         */
        "aria-rowcount"?: number | string;
        /**
         * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
         * @see aria-rowcount @see aria-rowspan.
         */
        "aria-rowindex"?: number | string;
        /**
         * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
         * @see aria-rowindex @see aria-colspan.
         */
        "aria-rowspan"?: number | string;
        /**
         * Indicates the current "selected" state of various widgets.
         * @see aria-checked @see aria-pressed.
         */
        "aria-selected"?: boolean | "false" | "true";
        /**
         * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
         * @see aria-posinset.
         */
        "aria-setsize"?: number | string;
        /** Indicates if items in a table or grid are sorted in ascending or descending order. */
        "aria-sort"?: "none" | "ascending" | "descending" | "other";
        /** Defines the maximum allowed value for a range widget. */
        "aria-valuemax"?: number | string;
        /** Defines the minimum allowed value for a range widget. */
        "aria-valuemin"?: number | string;
        /**
         * Defines the current value for a range widget.
         * @see aria-valuetext.
         */
        "aria-valuenow"?: number | string;
        /** Defines the human readable text alternative of aria-valuenow for a range widget. */
        "aria-valuetext"?: string;
        role?:
            | "alert"
            | "alertdialog"
            | "application"
            | "article"
            | "banner"
            | "button"
            | "cell"
            | "checkbox"
            | "columnheader"
            | "combobox"
            | "complementary"
            | "contentinfo"
            | "definition"
            | "dialog"
            | "directory"
            | "document"
            | "feed"
            | "figure"
            | "form"
            | "grid"
            | "gridcell"
            | "group"
            | "heading"
            | "img"
            | "link"
            | "list"
            | "listbox"
            | "listitem"
            | "log"
            | "main"
            | "marquee"
            | "math"
            | "menu"
            | "menubar"
            | "menuitem"
            | "menuitemcheckbox"
            | "menuitemradio"
            | "meter"
            | "navigation"
            | "none"
            | "note"
            | "option"
            | "presentation"
            | "progressbar"
            | "radio"
            | "radiogroup"
            | "region"
            | "row"
            | "rowgroup"
            | "rowheader"
            | "scrollbar"
            | "search"
            | "searchbox"
            | "separator"
            | "slider"
            | "spinbutton"
            | "status"
            | "switch"
            | "tab"
            | "table"
            | "tablist"
            | "tabpanel"
            | "term"
            | "textbox"
            | "timer"
            | "toolbar"
            | "tooltip"
            | "tree"
            | "treegrid"
            | "treeitem";
    }

    interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
        download?: any;
        href?: string;
        hreflang?: string;
        media?: string;
        ping?: string;
        referrerpolicy?: HTMLReferrerPolicy;
        rel?: string;
        target?: string;
        type?: string;
    }

    interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    }

    interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: string;
        coords?: string;
        download?: any;
        href?: string;
        hreflang?: string;
        ping?: string;
        referrerpolicy?: HTMLReferrerPolicy;
        rel?: string;
        shape?: "rect" | "circle" | "poly" | "default";
        target?: string;
    }

    interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
        href?: BoxedOr<string>;
        target?: BoxedOr<string>;
    }

    interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: BoxedOr<string>;
    }

    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
        autofocus?: BoxedOr<boolean>;
        disabled?: BoxedOr<boolean>;
        form?: BoxedOr<string>;
        formaction?: BoxedOr<string | SerializableAttributeValue>;
        formenctype?: BoxedOr<HTMLFormEncType>;
        formmethod?: BoxedOr<HTMLFormMethod>;
        formnovalidate?: BoxedOr<boolean>;
        formtarget?: BoxedOr<string>;
        popovertarget?: BoxedOr<string>;
        popovertargetaction?: BoxedOr<"hide" | "show" | "toggle">;
        name?: BoxedOr<string>;
        type?: BoxedOr<"submit" | "reset" | "button">;
        value?: BoxedOr<string>;
    }

    interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
    }

    interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
    }

    interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: BoxedOr<number | string>;
    }

    interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: BoxedOr<string | string[] | number>;
    }

    interface DetailsHtmlAttributes<T> extends HTMLAttributes<T> {
        open?: BoxedOr<boolean>;
        ontoggle?: BoxedOr<EventHandlerUnion<T, Event>>;
    }

    interface DialogHtmlAttributes<T> extends HTMLAttributes<T> {
        open?: BoxedOr<boolean>;
        onclose?: BoxedOr<EventHandlerUnion<T, Event>>;
        oncancel?: BoxedOr<EventHandlerUnion<T, Event>>;
    }

    interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: BoxedOr<number | string>;
        src?: BoxedOr<string>;
        type?: BoxedOr<string>;
        width?: BoxedOr<number | string>;
    }

    interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: BoxedOr<boolean>;
        form?: BoxedOr<string>;
        name?: BoxedOr<string>;
    }

    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        "accept-charset"?: BoxedOr<string>;
        action?: BoxedOr<string | SerializableAttributeValue>;
        autocomplete?: BoxedOr<string>;
        encoding?: BoxedOr<HTMLFormEncType>;
        enctype?: BoxedOr<HTMLFormEncType>;
        method?: BoxedOr<HTMLFormMethod>;
        name?: BoxedOr<string>;
        novalidate?: BoxedOr<boolean>;
        target?: BoxedOr<string>;
    }

    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
        allow?: BoxedOr<string>;
        allowfullscreen?: BoxedOr<boolean>;
        height?: BoxedOr<number | string>;
        loading?: BoxedOr<"eager" | "lazy">;
        name?: BoxedOr<string>;
        referrerpolicy?: BoxedOr<HTMLReferrerPolicy>;
        sandbox?: BoxedOr<HTMLIframeSandbox | string>;
        src?: BoxedOr<string>;
        srcdoc?: BoxedOr<string>;
        width?: BoxedOr<number | string>;
    }

    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: BoxedOr<string>;
        crossorigin?: BoxedOr<HTMLCrossorigin>;
        decoding?: BoxedOr<"sync" | "async" | "auto">;
        height?: BoxedOr<number | string>;
        ismap?: BoxedOr<boolean>;
        isMap?: BoxedOr<boolean>;
        loading?: BoxedOr<"eager" | "lazy">;
        referrerpolicy?: BoxedOr<HTMLReferrerPolicy>;
        referrerPolicy?: BoxedOr<HTMLReferrerPolicy>;
        sizes?: BoxedOr<string>;
        src?: BoxedOr<string>;
        srcset?: BoxedOr<string>;
        srcSet?: BoxedOr<string>;
        usemap?: BoxedOr<string>;
        useMap?: BoxedOr<string>;
        width?: BoxedOr<number | string>;
    }

    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        accept?: BoxedOr<string>;
        alt?: BoxedOr<string>;
        autocomplete?: BoxedOr<string>;
        autocorrect?: BoxedOr<"on" | "off">;
        autofocus?: BoxedOr<boolean>;
        capture?: BoxedOr<boolean | string>;
        checked?: BoxedOr<boolean>;
        crossorigin?: BoxedOr<HTMLCrossorigin>;
        disabled?: BoxedOr<boolean>;
        enterkeyhint?: BoxedOr<"enter" | "done" | "go" | "next" | "previous" | "search" | "send">;
        form?: BoxedOr<string>;
        formaction?: BoxedOr<string | SerializableAttributeValue>;
        formenctype?: BoxedOr<HTMLFormEncType>;
        formmethod?: BoxedOr<HTMLFormMethod>;
        formnovalidate?: BoxedOr<boolean>;
        formtarget?: BoxedOr<string>;
        height?: BoxedOr<number | string>;
        incremental?: BoxedOr<boolean>;
        list?: BoxedOr<string>;
        max?: BoxedOr<number | string>;
        maxlength?: BoxedOr<number | string>;
        min?: BoxedOr<number | string>;
        minlength?: BoxedOr<number | string>;
        multiple?: BoxedOr<boolean>;
        name?: BoxedOr<string>;
        pattern?: BoxedOr<string>;
        placeholder?: BoxedOr<string>;
        readonly?: BoxedOr<boolean>;
        results?: BoxedOr<number>;
        required?: BoxedOr<boolean>;
        size?: BoxedOr<number | string>;
        src?: BoxedOr<string>;
        step?: BoxedOr<number | string>;
        type?: BoxedOr<string>;
        value?: BoxedOr<string | string[] | number>;
        width?: BoxedOr<number | string>;
    }

    interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: BoxedOr<string>;
        dateTime?: BoxedOr<string>;
    }

    interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
        for?: BoxedOr<string>;
        form?: BoxedOr<string>;
    }

    interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: BoxedOr<number | string>;
    }

    interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
        as?: BoxedOr<HTMLLinkAs>;
        crossorigin?: BoxedOr<HTMLCrossorigin>;
        disabled?: BoxedOr<boolean>;
        fetchpriority?: BoxedOr<"high" | "low" | "auto">;
        href?: BoxedOr<string>;
        hreflang?: BoxedOr<string>;
        imagesizes?: BoxedOr<string>;
        imagesrcset?: BoxedOr<string>;
        integrity?: BoxedOr<string>;
        media?: BoxedOr<string>;
        referrerpolicy?: BoxedOr<HTMLReferrerPolicy>;
        rel?: BoxedOr<string>;
        sizes?: BoxedOr<string>;
        type?: BoxedOr<string>;
    }

    interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: BoxedOr<string>;
    }

    interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoplay?: BoxedOr<boolean>;
        controls?: BoxedOr<boolean>;
        crossorigin?: BoxedOr<HTMLCrossorigin>;
        loop?: BoxedOr<boolean>;
        mediagroup?: BoxedOr<string>;
        muted?: BoxedOr<boolean>;
        preload?: BoxedOr<"none" | "metadata" | "auto" | "">;
        src?: BoxedOr<string>;
        crossOrigin?: BoxedOr<HTMLCrossorigin>;
        mediaGroup?: BoxedOr<string>;
    }

    interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
        label?: BoxedOr<string>;
        type?: BoxedOr<"context" | "toolbar">;
    }

    interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
        charset?: BoxedOr<string>;
        content?: BoxedOr<string>;
        "http-equiv"?: BoxedOr<string>;
        name?: BoxedOr<string>;
        media?: BoxedOr<string>;
    }

    interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: BoxedOr<string>;
        high?: BoxedOr<number | string>;
        low?: BoxedOr<number | string>;
        max?: BoxedOr<number | string>;
        min?: BoxedOr<number | string>;
        optimum?: BoxedOr<number | string>;
        value?: BoxedOr<string | string[] | number>;
    }

    interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: BoxedOr<string>;
    }

    interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
        data?: BoxedOr<string>;
        form?: BoxedOr<string>;
        height?: BoxedOr<number | string>;
        name?: BoxedOr<string>;
        type?: BoxedOr<string>;
        usemap?: BoxedOr<string>;
        width?: BoxedOr<number | string>;
    }

    interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
        reversed?: BoxedOr<boolean>;
        start?: BoxedOr<number | string>;
        type?: BoxedOr<"1" | "a" | "A" | "i" | "I">;
    }

    interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: BoxedOr<boolean>;
        label?: BoxedOr<string>;
    }

    interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: BoxedOr<boolean>;
        label?: BoxedOr<string>;
        selected?: BoxedOr<boolean>;
        value?: BoxedOr<string | string[] | number>;
    }

    interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: BoxedOr<string>;
        for?: BoxedOr<string>;
        name?: BoxedOr<string>;
    }

    interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
        max?: BoxedOr<number | string>;
        value?: BoxedOr<string | string[] | number>;
    }

    interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
        async?: BoxedOr<boolean>;
        charset?: BoxedOr<string>;
        crossorigin?: BoxedOr<HTMLCrossorigin>;
        defer?: BoxedOr<boolean>;
        integrity?: BoxedOr<string>;
        nomodule?: BoxedOr<boolean>;
        nonce?: BoxedOr<string>;
        referrerpolicy?: BoxedOr<HTMLReferrerPolicy>;
        src?: BoxedOr<string>;
        type?: BoxedOr<string>;
    }

    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
        autocomplete?: BoxedOr<string>;
        autofocus?: BoxedOr<boolean>;
        disabled?: BoxedOr<boolean>;
        form?: BoxedOr<string>;
        multiple?: BoxedOr<boolean>;
        name?: BoxedOr<string>;
        required?: BoxedOr<boolean>;
        size?: BoxedOr<number | string>;
        value?: BoxedOr<string | string[] | number>;
    }

    interface HTMLSlotElementAttributes<T = HTMLSlotElement> extends HTMLAttributes<T> {
        name?: BoxedOr<string>;
    }

    interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: BoxedOr<string>;
        sizes?: BoxedOr<string>;
        src?: BoxedOr<string>;
        srcset?: BoxedOr<string>;
        type?: BoxedOr<string>;
    }

    interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: BoxedOr<string>;
        nonce?: BoxedOr<string>;
        scoped?: BoxedOr<boolean>;
        type?: BoxedOr<string>;
    }

    interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
        colspan?: BoxedOr<number | string>;
        headers?: BoxedOr<string>;
        rowspan?: BoxedOr<number | string>;
    }

    interface TemplateHTMLAttributes<T extends HTMLTemplateElement> extends HTMLAttributes<T> {
        content?: DocumentFragment;
    }

    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
        autocomplete?: BoxedOr<string>;
        autofocus?: BoxedOr<boolean>;
        cols?: BoxedOr<number | string>;
        dirname?: BoxedOr<string>;
        disabled?: BoxedOr<boolean>;
        enterkeyhint?: BoxedOr<"enter" | "done" | "go" | "next" | "previous" | "search" | "send">;
        form?: BoxedOr<string>;
        maxlength?: BoxedOr<number | string>;
        minlength?: BoxedOr<number | string>;
        name?: BoxedOr<string>;
        placeholder?: BoxedOr<string>;
        readonly?: BoxedOr<boolean>;
        required?: BoxedOr<boolean>;
        rows?: BoxedOr<number | string>;
        value?: BoxedOr<string | string[] | number>;
        wrap?: BoxedOr<"hard" | "soft" | "off">;
    }

    interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
        colspan?: BoxedOr<number | string>;
        headers?: BoxedOr<string>;
        rowspan?: BoxedOr<number | string>;
        scope?: BoxedOr<"col" | "row" | "rowgroup" | "colgroup">;
    }

    interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
        datetime?: BoxedOr<string>;
    }

    interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
        default?: BoxedOr<boolean>;
        kind?: BoxedOr<"subtitles" | "captions" | "descriptions" | "chapters" | "metadata">;
        label?: BoxedOr<string>;
        src?: BoxedOr<string>;
        srclang?: BoxedOr<string>;
    }

    interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
        height?: BoxedOr<number | string>;
        playsinline?: BoxedOr<boolean>;
        poster?: BoxedOr<string>;
        width?: BoxedOr<number | string>;
    }

    type SVGPreserveAspectRatio =
        | "none"
        | "xMinYMin"
        | "xMidYMin"
        | "xMaxYMin"
        | "xMinYMid"
        | "xMidYMid"
        | "xMaxYMid"
        | "xMinYMax"
        | "xMidYMax"
        | "xMaxYMax"
        | "xMinYMin meet"
        | "xMidYMin meet"
        | "xMaxYMin meet"
        | "xMinYMid meet"
        | "xMidYMid meet"
        | "xMaxYMid meet"
        | "xMinYMax meet"
        | "xMidYMax meet"
        | "xMaxYMax meet"
        | "xMinYMin slice"
        | "xMidYMin slice"
        | "xMaxYMin slice"
        | "xMinYMid slice"
        | "xMidYMid slice"
        | "xMaxYMid slice"
        | "xMinYMax slice"
        | "xMidYMax slice"
        | "xMaxYMax slice";
    type ImagePreserveAspectRatio =
        | SVGPreserveAspectRatio
        | "defer none"
        | "defer xMinYMin"
        | "defer xMidYMin"
        | "defer xMaxYMin"
        | "defer xMinYMid"
        | "defer xMidYMid"
        | "defer xMaxYMid"
        | "defer xMinYMax"
        | "defer xMidYMax"
        | "defer xMaxYMax"
        | "defer xMinYMin meet"
        | "defer xMidYMin meet"
        | "defer xMaxYMin meet"
        | "defer xMinYMid meet"
        | "defer xMidYMid meet"
        | "defer xMaxYMid meet"
        | "defer xMinYMax meet"
        | "defer xMidYMax meet"
        | "defer xMaxYMax meet"
        | "defer xMinYMin slice"
        | "defer xMidYMin slice"
        | "defer xMaxYMin slice"
        | "defer xMinYMid slice"
        | "defer xMidYMid slice"
        | "defer xMaxYMid slice"
        | "defer xMinYMax slice"
        | "defer xMidYMax slice"
        | "defer xMaxYMax slice";
    type SVGUnits = "userSpaceOnUse" | "objectBoundingBox";

    interface CoreSVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        id?: BoxedOr<string>;
        lang?: BoxedOr<string>;
        tabindex?: BoxedOr<number | string>;
    }


    interface StylableSVGAttributes {
        class?: BoxedOr<string>;
        style?: BoxedOr<string>;
    }

    interface TransformableSVGAttributes {
        transform?: BoxedOr<string>;
    }

    interface ConditionalProcessingSVGAttributes {
        requiredExtensions?: BoxedOr<string>;
        requiredFeatures?: BoxedOr<string>;
        systemLanguage?: BoxedOr<string>;
    }

    interface ExternalResourceSVGAttributes {
        externalResourcesRequired?: BoxedOr<"true" | "false">;
    }

    interface AnimationTimingSVGAttributes {
        begin?: BoxedOr<string>;
        dur?: BoxedOr<string>;
        end?: BoxedOr<string>;
        min?: BoxedOr<string>;
        max?: BoxedOr<string>;
        restart?: BoxedOr<"always" | "whenNotActive" | "never">;
        repeatCount?: BoxedOr<number | "indefinite">;
        repeatDur?: BoxedOr<string>;
        fill?: BoxedOr<"freeze" | "remove">;
    }

    interface AnimationValueSVGAttributes {
        calcMode?: BoxedOr<"discrete" | "linear" | "paced" | "spline">;
        values?: BoxedOr<string>;
        keyTimes?: BoxedOr<string>;
        keySplines?: BoxedOr<string>;
        from?: BoxedOr<number | string>;
        to?: BoxedOr<number | string>;
        by?: BoxedOr<number | string>;
    }

    interface AnimationAdditionSVGAttributes {
        attributeName?: BoxedOr<string>;
        additive?: BoxedOr<"replace" | "sum">;
        accumulate?: BoxedOr<"none" | "sum">;
    }

    interface AnimationAttributeTargetSVGAttributes {
        attributeName?: BoxedOr<string>;
        attributeType?: BoxedOr<"CSS" | "XML" | "auto">;
    }

    interface PresentationSVGAttributes {
        "alignment-baseline"?: BoxedOr<| "auto"
            | "baseline"
            | "before-edge"
            | "text-before-edge"
            | "middle"
            | "central"
            | "after-edge"
            | "text-after-edge"
            | "ideographic"
            | "alphabetic"
            | "hanging"
            | "mathematical"
            | "inherit">;
        "baseline-shift"?: BoxedOr<number | string>;
        clip?: BoxedOr<string>;
        "clip-path"?: BoxedOr<string>;
        "clip-rule"?: BoxedOr<"nonzero" | "evenodd" | "inherit">;
        color?: BoxedOr<string>;
        "color-interpolation"?: BoxedOr<"auto" | "sRGB" | "linearRGB" | "inherit">;
        "color-interpolation-filters"?: BoxedOr<"auto" | "sRGB" | "linearRGB" | "inherit">;
        "color-profile"?: BoxedOr<string>;
        "color-rendering"?: BoxedOr<"auto" | "optimizeSpeed" | "optimizeQuality" | "inherit">;
        cursor?: BoxedOr<string>;
        direction?: BoxedOr<"ltr" | "rtl" | "inherit">;
        display?: BoxedOr<string>;
        "dominant-baseline"?: BoxedOr<| "auto"
            | "text-bottom"
            | "alphabetic"
            | "ideographic"
            | "middle"
            | "central"
            | "mathematical"
            | "hanging"
            | "text-top"
            | "inherit">;
        "enable-background"?: BoxedOr<string>;
        fill?: BoxedOr<string>;
        "fill-opacity"?: BoxedOr<number | string | "inherit">;
        "fill-rule"?: BoxedOr<"nonzero" | "evenodd" | "inherit">;
        filter?: BoxedOr<string>;
        "flood-color"?: BoxedOr<string>;
        "flood-opacity"?: BoxedOr<number | string | "inherit">;
        "font-family"?: BoxedOr<string>;
        "font-size"?: BoxedOr<string>;
        "font-size-adjust"?: BoxedOr<number | string>;
        "font-stretch"?: BoxedOr<string>;
        "font-style"?: BoxedOr<"normal" | "italic" | "oblique" | "inherit">;
        "font-variant"?: BoxedOr<string>;
        "font-weight"?: BoxedOr<number | string>;
        "glyph-orientation-horizontal"?: BoxedOr<string>;
        "glyph-orientation-vertical"?: BoxedOr<string>;
        "image-rendering"?: BoxedOr<"auto" | "optimizeQuality" | "optimizeSpeed" | "inherit">;
        kerning?: BoxedOr<string>;
        "letter-spacing"?: BoxedOr<number | string>;
        "lighting-color"?: BoxedOr<string>;
        "marker-end"?: BoxedOr<string>;
        "marker-mid"?: BoxedOr<string>;
        "marker-start"?: BoxedOr<string>;
        mask?: BoxedOr<string>;
        opacity?: BoxedOr<number | string | "inherit">;
        overflow?: BoxedOr<"visible" | "hidden" | "scroll" | "auto" | "inherit">;
        pathLength?: BoxedOr<string | number>;
        "pointer-events"?: BoxedOr<| "bounding-box"
            | "visiblePainted"
            | "visibleFill"
            | "visibleStroke"
            | "visible"
            | "painted"
            | "color"
            | "fill"
            | "stroke"
            | "all"
            | "none"
            | "inherit">;
        "shape-rendering"?: BoxedOr<"auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision" | "inherit">;
        "stop-color"?: BoxedOr<string>;
        "stop-opacity"?: BoxedOr<number | string | "inherit">;
        stroke?: BoxedOr<string>;
        "stroke-dasharray"?: BoxedOr<string>;
        "stroke-dashoffset"?: BoxedOr<number | string>;
        "stroke-linecap"?: BoxedOr<"butt" | "round" | "square" | "inherit">;
        "stroke-linejoin"?: BoxedOr<"arcs" | "bevel" | "miter" | "miter-clip" | "round" | "inherit">;
        "stroke-miterlimit"?: BoxedOr<number | string | "inherit">;
        "stroke-opacity"?: BoxedOr<number | string | "inherit">;
        "stroke-width"?: BoxedOr<number | string>;
        "text-anchor"?: BoxedOr<"start" | "middle" | "end" | "inherit">;
        "text-decoration"?: BoxedOr<"none" | "underline" | "overline" | "line-through" | "blink" | "inherit">;
        "text-rendering"?: BoxedOr<| "auto"
            | "optimizeSpeed"
            | "optimizeLegibility"
            | "geometricPrecision"
            | "inherit">;
        "unicode-bidi"?: BoxedOr<string>;
        visibility?: BoxedOr<"visible" | "hidden" | "collapse" | "inherit">;
        "word-spacing"?: BoxedOr<number | string>;
        "writing-mode"?: BoxedOr<"lr-tb" | "rl-tb" | "tb-rl" | "lr" | "rl" | "tb" | "inherit">;
    }

    interface AnimationElementSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            ExternalResourceSVGAttributes,
            ConditionalProcessingSVGAttributes {
    }

    interface ContainerElementSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            ShapeElementSVGAttributes<T>,
            Pick<
                PresentationSVGAttributes,
                | "clip-path"
                | "mask"
                | "cursor"
                | "opacity"
                | "filter"
                | "enable-background"
                | "color-interpolation"
                | "color-rendering"
            > {
    }

    interface FilterPrimitiveElementSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            Pick<PresentationSVGAttributes, "color-interpolation-filters"> {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
        result?: BoxedOr<string>;
    }

    interface SingleInputFilterSVGAttributes {
        in?: BoxedOr<string>;
    }

    interface DoubleInputFilterSVGAttributes {
        in?: BoxedOr<string>;
        in2?: BoxedOr<string>;
    }

    interface FitToViewBoxSVGAttributes {
        viewBox?: BoxedOr<string>;
        preserveAspectRatio?: BoxedOr<SVGPreserveAspectRatio>;
    }

    interface GradientElementSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes {
        gradientUnits?: BoxedOr<SVGUnits>;
        gradientTransform?: BoxedOr<string>;
        spreadMethod?: BoxedOr<"pad" | "reflect" | "repeat">;
        href?: BoxedOr<string>;
    }

    interface GraphicsElementSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            Pick<
                PresentationSVGAttributes,
                | "clip-rule"
                | "mask"
                | "pointer-events"
                | "cursor"
                | "opacity"
                | "filter"
                | "display"
                | "visibility"
                | "color-interpolation"
                | "color-rendering"
            > {
    }

    interface LightSourceElementSVGAttributes<T> extends CoreSVGAttributes<T> {
    }

    interface NewViewportSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            Pick<PresentationSVGAttributes, "overflow" | "clip"> {
        viewBox?: BoxedOr<string>;
    }

    interface ShapeElementSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            Pick<
                PresentationSVGAttributes,
                | "color"
                | "fill"
                | "fill-rule"
                | "fill-opacity"
                | "stroke"
                | "stroke-width"
                | "stroke-linecap"
                | "stroke-linejoin"
                | "stroke-miterlimit"
                | "stroke-dasharray"
                | "stroke-dashoffset"
                | "stroke-opacity"
                | "shape-rendering"
                | "pathLength"
            > {
    }

    interface TextContentElementSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            Pick<
                PresentationSVGAttributes,
                | "font-family"
                | "font-style"
                | "font-variant"
                | "font-weight"
                | "font-stretch"
                | "font-size"
                | "font-size-adjust"
                | "kerning"
                | "letter-spacing"
                | "word-spacing"
                | "text-decoration"
                | "glyph-orientation-horizontal"
                | "glyph-orientation-vertical"
                | "direction"
                | "unicode-bidi"
                | "text-anchor"
                | "dominant-baseline"
                | "color"
                | "fill"
                | "fill-rule"
                | "fill-opacity"
                | "stroke"
                | "stroke-width"
                | "stroke-linecap"
                | "stroke-linejoin"
                | "stroke-miterlimit"
                | "stroke-dasharray"
                | "stroke-dashoffset"
                | "stroke-opacity"
            > {
    }

    interface ZoomAndPanSVGAttributes {
        zoomAndPan?: BoxedOr<"disable" | "magnify">;
    }

    interface AnimateSVGAttributes<T>
        extends AnimationElementSVGAttributes<T>,
            AnimationAttributeTargetSVGAttributes,
            AnimationTimingSVGAttributes,
            AnimationValueSVGAttributes,
            AnimationAdditionSVGAttributes,
            Pick<PresentationSVGAttributes, "color-interpolation" | "color-rendering"> {
    }

    interface AnimateMotionSVGAttributes<T>
        extends AnimationElementSVGAttributes<T>,
            AnimationTimingSVGAttributes,
            AnimationValueSVGAttributes,
            AnimationAdditionSVGAttributes {
        path?: BoxedOr<string>;
        keyPoints?: BoxedOr<string>;
        rotate?: BoxedOr<number | string | "auto" | "auto-reverse">;
        origin?: BoxedOr<"default">;
    }

    interface AnimateTransformSVGAttributes<T>
        extends AnimationElementSVGAttributes<T>,
            AnimationAttributeTargetSVGAttributes,
            AnimationTimingSVGAttributes,
            AnimationValueSVGAttributes,
            AnimationAdditionSVGAttributes {
        type?: BoxedOr<"translate" | "scale" | "rotate" | "skewX" | "skewY">;
    }

    interface CircleSVGAttributes<T>
        extends GraphicsElementSVGAttributes<T>,
            ShapeElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes {
        cx?: BoxedOr<number | string>;
        cy?: BoxedOr<number | string>;
        r?: BoxedOr<number | string>;
    }

    interface ClipPathSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "clip-path"> {
        clipPathUnits?: BoxedOr<SVGUnits>;
    }

    interface DefsSVGAttributes<T>
        extends ContainerElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes {
    }

    interface DescSVGAttributes<T> extends CoreSVGAttributes<T>, StylableSVGAttributes {
    }

    interface EllipseSVGAttributes<T>
        extends GraphicsElementSVGAttributes<T>,
            ShapeElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes {
        cx?: BoxedOr<number | string>;
        cy?: BoxedOr<number | string>;
        rx?: BoxedOr<number | string>;
        ry?: BoxedOr<number | string>;
    }

    interface FeBlendSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            DoubleInputFilterSVGAttributes,
            StylableSVGAttributes {
        mode?: BoxedOr<"normal" | "multiply" | "screen" | "darken" | "lighten">;
    }

    interface FeColorMatrixSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes {
        type?: BoxedOr<"matrix" | "saturate" | "hueRotate" | "luminanceToAlpha">;
        values?: BoxedOr<string>;
    }

    interface FeComponentTransferSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes {
    }

    interface FeCompositeSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            DoubleInputFilterSVGAttributes,
            StylableSVGAttributes {
        operator?: BoxedOr<"over" | "in" | "out" | "atop" | "xor" | "arithmetic">;
        k1?: BoxedOr<number | string>;
        k2?: BoxedOr<number | string>;
        k3?: BoxedOr<number | string>;
        k4?: BoxedOr<number | string>;
    }

    interface FeConvolveMatrixSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes {
        order?: BoxedOr<number | string>;
        kernelMatrix?: BoxedOr<string>;
        divisor?: BoxedOr<number | string>;
        bias?: BoxedOr<number | string>;
        targetX?: BoxedOr<number | string>;
        targetY?: BoxedOr<number | string>;
        edgeMode?: BoxedOr<"duplicate" | "wrap" | "none">;
        kernelUnitLength?: BoxedOr<number | string>;
        preserveAlpha?: BoxedOr<"true" | "false">;
    }

    interface FeDiffuseLightingSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes,
            Pick<PresentationSVGAttributes, "color" | "lighting-color"> {
        surfaceScale?: BoxedOr<number | string>;
        diffuseConstant?: BoxedOr<number | string>;
        kernelUnitLength?: BoxedOr<number | string>;
    }

    interface FeDisplacementMapSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            DoubleInputFilterSVGAttributes,
            StylableSVGAttributes {
        scale?: BoxedOr<number | string>;
        xChannelSelector?: BoxedOr<"R" | "G" | "B" | "A">;
        yChannelSelector?: BoxedOr<"R" | "G" | "B" | "A">;
    }

    interface FeDistantLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
        azimuth?: BoxedOr<number | string>;
        elevation?: BoxedOr<number | string>;
    }

    interface FeDropShadowSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            FilterPrimitiveElementSVGAttributes<T>,
            StylableSVGAttributes,
            Pick<PresentationSVGAttributes, "color" | "flood-color" | "flood-opacity"> {
        dx?: BoxedOr<number | string>;
        dy?: BoxedOr<number | string>;
        stdDeviation?: BoxedOr<number | string>;
    }

    interface FeFloodSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            StylableSVGAttributes,
            Pick<PresentationSVGAttributes, "color" | "flood-color" | "flood-opacity"> {
    }

    interface FeFuncSVGAttributes<T> extends CoreSVGAttributes<T> {
        type?: BoxedOr<"identity" | "table" | "discrete" | "linear" | "gamma">;
        tableValues?: BoxedOr<string>;
        slope?: BoxedOr<number | string>;
        intercept?: BoxedOr<number | string>;
        amplitude?: BoxedOr<number | string>;
        exponent?: BoxedOr<number | string>;
        offset?: BoxedOr<number | string>;
    }

    interface FeGaussianBlurSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes {
        stdDeviation?: BoxedOr<number | string>;
    }

    interface FeImageSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes {
        preserveAspectRatio?: BoxedOr<SVGPreserveAspectRatio>;
        href?: BoxedOr<string>;
    }

    interface FeMergeSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            StylableSVGAttributes {
    }

    interface FeMergeNodeSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            SingleInputFilterSVGAttributes {
    }

    interface FeMorphologySVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes {
        operator?: BoxedOr<"erode" | "dilate">;
        radius?: BoxedOr<number | string>;
    }

    interface FeOffsetSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes {
        dx?: BoxedOr<number | string>;
        dy?: BoxedOr<number | string>;
    }

    interface FePointLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        z?: BoxedOr<number | string>;
    }

    interface FeSpecularLightingSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes,
            Pick<PresentationSVGAttributes, "color" | "lighting-color"> {
        surfaceScale?: BoxedOr<string>;
        specularConstant?: BoxedOr<string>;
        specularExponent?: BoxedOr<string>;
        kernelUnitLength?: BoxedOr<number | string>;
    }

    interface FeSpotLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        z?: BoxedOr<number | string>;
        pointsAtX?: BoxedOr<number | string>;
        pointsAtY?: BoxedOr<number | string>;
        pointsAtZ?: BoxedOr<number | string>;
        specularExponent?: BoxedOr<number | string>;
        limitingConeAngle?: BoxedOr<number | string>;
    }

    interface FeTileSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            SingleInputFilterSVGAttributes,
            StylableSVGAttributes {
    }

    interface FeTurbulanceSVGAttributes<T>
        extends FilterPrimitiveElementSVGAttributes<T>,
            StylableSVGAttributes {
        baseFrequency?: BoxedOr<number | string>;
        numOctaves?: BoxedOr<number | string>;
        seed?: BoxedOr<number | string>;
        stitchTiles?: BoxedOr<"stitch" | "noStitch">;
        type?: BoxedOr<"fractalNoise" | "turbulence">;
    }

    interface FilterSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes {
        filterUnits?: BoxedOr<SVGUnits>;
        primitiveUnits?: BoxedOr<SVGUnits>;
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
        filterRes?: BoxedOr<number | string>;
    }

    interface ForeignObjectSVGAttributes<T>
        extends NewViewportSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "display" | "visibility"> {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
    }

    interface GSVGAttributes<T>
        extends ContainerElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "display" | "visibility"> {
    }

    interface ImageSVGAttributes<T>
        extends NewViewportSVGAttributes<T>,
            GraphicsElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "color-profile" | "image-rendering"> {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
        preserveAspectRatio?: BoxedOr<ImagePreserveAspectRatio>;
        href?: BoxedOr<string>;
    }

    interface LineSVGAttributes<T>
        extends GraphicsElementSVGAttributes<T>,
            ShapeElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "marker-start" | "marker-mid" | "marker-end"> {
        x1?: BoxedOr<number | string>;
        y1?: BoxedOr<number | string>;
        x2?: BoxedOr<number | string>;
        y2?: BoxedOr<number | string>;
    }

    interface LinearGradientSVGAttributes<T> extends GradientElementSVGAttributes<T> {
        x1?: BoxedOr<number | string>;
        x2?: BoxedOr<number | string>;
        y1?: BoxedOr<number | string>;
        y2?: BoxedOr<number | string>;
    }

    interface MarkerSVGAttributes<T>
        extends ContainerElementSVGAttributes<T>,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            FitToViewBoxSVGAttributes,
            Pick<PresentationSVGAttributes, "overflow" | "clip"> {
        markerUnits?: BoxedOr<"strokeWidth" | "userSpaceOnUse">;
        refX?: BoxedOr<number | string>;
        refY?: BoxedOr<number | string>;
        markerWidth?: BoxedOr<number | string>;
        markerHeight?: BoxedOr<number | string>;
        orient?: BoxedOr<string>;
    }

    interface MaskSVGAttributes<T>
        extends Omit<ContainerElementSVGAttributes<T>, "opacity" | "filter">,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes {
        maskUnits?: BoxedOr<SVGUnits>;
        maskContentUnits?: BoxedOr<SVGUnits>;
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
    }

    interface MetadataSVGAttributes<T> extends CoreSVGAttributes<T> {
    }

    interface MPathSVGAttributes<T> extends CoreSVGAttributes<T> {
    }

    interface PathSVGAttributes<T>
        extends GraphicsElementSVGAttributes<T>,
            ShapeElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "marker-start" | "marker-mid" | "marker-end"> {
        d?: BoxedOr<string>;
        pathLength?: BoxedOr<number | string>;
    }

    interface PatternSVGAttributes<T>
        extends ContainerElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            FitToViewBoxSVGAttributes,
            Pick<PresentationSVGAttributes, "overflow" | "clip"> {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
        patternUnits?: BoxedOr<SVGUnits>;
        patternContentUnits?: BoxedOr<SVGUnits>;
        patternTransform?: BoxedOr<string>;
        href?: BoxedOr<string>;
    }

    interface PolygonSVGAttributes<T>
        extends GraphicsElementSVGAttributes<T>,
            ShapeElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "marker-start" | "marker-mid" | "marker-end"> {
        points?: BoxedOr<string>;
    }

    interface PolylineSVGAttributes<T>
        extends GraphicsElementSVGAttributes<T>,
            ShapeElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "marker-start" | "marker-mid" | "marker-end"> {
        points?: BoxedOr<string>;
    }

    interface RadialGradientSVGAttributes<T> extends GradientElementSVGAttributes<T> {
        cx?: BoxedOr<number | string>;
        cy?: BoxedOr<number | string>;
        r?: BoxedOr<number | string>;
        fx?: BoxedOr<number | string>;
        fy?: BoxedOr<number | string>;
    }

    interface RectSVGAttributes<T>
        extends GraphicsElementSVGAttributes<T>,
            ShapeElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
        rx?: BoxedOr<number | string>;
        ry?: BoxedOr<number | string>;
    }

    interface SetSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            StylableSVGAttributes,
            AnimationTimingSVGAttributes {
    }

    interface StopSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            StylableSVGAttributes,
            Pick<PresentationSVGAttributes, "color" | "stop-color" | "stop-opacity"> {
        offset?: BoxedOr<number | string>;
    }

    interface SvgSVGAttributes<T>
        extends ContainerElementSVGAttributes<T>,
            NewViewportSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            FitToViewBoxSVGAttributes,
            ZoomAndPanSVGAttributes,
            PresentationSVGAttributes {
        version?: BoxedOr<string>;
        baseProfile?: BoxedOr<string>;
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
        contentScriptType?: BoxedOr<string>;
        contentStyleType?: BoxedOr<string>;
        xmlns?: BoxedOr<"http://www.w3.org/2000/svg" | string>;
    }

    interface SwitchSVGAttributes<T>
        extends ContainerElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "display" | "visibility"> {
    }

    interface SymbolSVGAttributes<T>
        extends ContainerElementSVGAttributes<T>,
            NewViewportSVGAttributes<T>,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            FitToViewBoxSVGAttributes {
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
        preserveAspectRatio?: BoxedOr<SVGPreserveAspectRatio>;
        refX?: BoxedOr<number | string>;
        refY?: BoxedOr<number | string>;
        viewBox?: BoxedOr<string>;
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
    }

    interface TextSVGAttributes<T>
        extends TextContentElementSVGAttributes<T>,
            GraphicsElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes,
            Pick<PresentationSVGAttributes, "writing-mode" | "text-rendering"> {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        dx?: BoxedOr<number | string>;
        dy?: BoxedOr<number | string>;
        rotate?: BoxedOr<number | string>;
        textLength?: BoxedOr<number | string>;
        lengthAdjust?: BoxedOr<"spacing" | "spacingAndGlyphs">;
    }

    interface TextPathSVGAttributes<T>
        extends TextContentElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            Pick<
                PresentationSVGAttributes,
                "alignment-baseline" | "baseline-shift" | "display" | "visibility"
            > {
        startOffset?: BoxedOr<number | string>;
        method?: BoxedOr<"align" | "stretch">;
        spacing?: BoxedOr<"auto" | "exact">;
        href?: BoxedOr<string>;
    }

    interface TSpanSVGAttributes<T>
        extends TextContentElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            Pick<
                PresentationSVGAttributes,
                "alignment-baseline" | "baseline-shift" | "display" | "visibility"
            > {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        dx?: BoxedOr<number | string>;
        dy?: BoxedOr<number | string>;
        rotate?: BoxedOr<number | string>;
        textLength?: BoxedOr<number | string>;
        lengthAdjust?: BoxedOr<"spacing" | "spacingAndGlyphs">;
    }

    interface UseSVGAttributes<T>
        extends GraphicsElementSVGAttributes<T>,
            ConditionalProcessingSVGAttributes,
            ExternalResourceSVGAttributes,
            StylableSVGAttributes,
            TransformableSVGAttributes {
        x?: BoxedOr<number | string>;
        y?: BoxedOr<number | string>;
        width?: BoxedOr<number | string>;
        height?: BoxedOr<number | string>;
        href?: BoxedOr<string>;
    }

    interface ViewSVGAttributes<T>
        extends CoreSVGAttributes<T>,
            ExternalResourceSVGAttributes,
            FitToViewBoxSVGAttributes,
            ZoomAndPanSVGAttributes {
        viewTarget?: BoxedOr<string>;
    }

    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // [key: ClassKeys]: boolean;
        accessKey?: BoxedOr<string>;
        class?: BoxedOr<string>;
        contenteditable?: BoxedOr<boolean | "plaintext-only" | "inherit">;
        contextmenu?: BoxedOr<string>;
        dir?: BoxedOr<HTMLDir>;
        draggable?: BoxedOr<boolean | "false" | "true">;
        hidden?: BoxedOr<boolean | "hidden" | "until-found">;
        id?: BoxedOr<string>;
        inert?: BoxedOr<boolean>;
        lang?: BoxedOr<string>;
        spellcheck?: BoxedOr<boolean>;
        style?: string;
        tabindex?: BoxedOr<number | string>;
        title?: BoxedOr<string>;
        translate?: BoxedOr<"yes" | "no">;
        about?: BoxedOr<string>;
        datatype?: BoxedOr<string>;
        inlist?: BoxedOr<any>;
        popover?: BoxedOr<boolean | "manual" | "auto">;
        prefix?: BoxedOr<string>;
        property?: BoxedOr<string>;
        resource?: BoxedOr<string>;
        typeof?: BoxedOr<string>;
        vocab?: BoxedOr<string>;
        autocapitalize?: BoxedOr<HTMLAutocapitalize>;
        slot?: BoxedOr<string>;
        color?: BoxedOr<string>;
        itemprop?: BoxedOr<string>;
        itemscope?: BoxedOr<boolean>;
        itemtype?: BoxedOr<string>;
        itemid?: BoxedOr<string>;
        itemref?: BoxedOr<string>;
        part?: BoxedOr<string>;
        exportparts?: BoxedOr<string>;
        inputmode?: BoxedOr<"none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search">;
    }

    interface HTMLElementTags {
        a: AnchorHTMLAttributes<HTMLAnchorElement>;
        abbr: HTMLAttributes<HTMLElement>;
        address: HTMLAttributes<HTMLElement>;
        area: AreaHTMLAttributes<HTMLAreaElement>;
        article: HTMLAttributes<HTMLElement>;
        aside: HTMLAttributes<HTMLElement>;
        audio: AudioHTMLAttributes<HTMLAudioElement>;
        b: HTMLAttributes<HTMLElement>;
        base: BaseHTMLAttributes<HTMLBaseElement>;
        bdi: HTMLAttributes<HTMLElement>;
        bdo: HTMLAttributes<HTMLElement>;
        blockquote: BlockquoteHTMLAttributes<HTMLElement>;
        body: HTMLAttributes<HTMLBodyElement>;
        br: HTMLAttributes<HTMLBRElement>;
        button: ButtonHTMLAttributes<HTMLButtonElement>;
        canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
        caption: HTMLAttributes<HTMLElement>;
        cite: HTMLAttributes<HTMLElement>;
        code: HTMLAttributes<HTMLElement>;
        col: ColHTMLAttributes<HTMLTableColElement>;
        colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
        data: DataHTMLAttributes<HTMLElement>;
        datalist: HTMLAttributes<HTMLDataListElement>;
        dd: HTMLAttributes<HTMLElement>;
        del: HTMLAttributes<HTMLElement>;
        details: DetailsHtmlAttributes<HTMLDetailsElement>;
        dfn: HTMLAttributes<HTMLElement>;
        dialog: DialogHtmlAttributes<HTMLDialogElement>;
        div: HTMLAttributes<HTMLDivElement>;
        dl: HTMLAttributes<HTMLDListElement>;
        dt: HTMLAttributes<HTMLElement>;
        em: HTMLAttributes<HTMLElement>;
        embed: EmbedHTMLAttributes<HTMLEmbedElement>;
        fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
        figcaption: HTMLAttributes<HTMLElement>;
        figure: HTMLAttributes<HTMLElement>;
        footer: HTMLAttributes<HTMLElement>;
        form: FormHTMLAttributes<HTMLFormElement>;
        h1: HTMLAttributes<HTMLHeadingElement>;
        h2: HTMLAttributes<HTMLHeadingElement>;
        h3: HTMLAttributes<HTMLHeadingElement>;
        h4: HTMLAttributes<HTMLHeadingElement>;
        h5: HTMLAttributes<HTMLHeadingElement>;
        h6: HTMLAttributes<HTMLHeadingElement>;
        head: HTMLAttributes<HTMLHeadElement>;
        header: HTMLAttributes<HTMLElement>;
        hgroup: HTMLAttributes<HTMLElement>;
        hr: HTMLAttributes<HTMLHRElement>;
        html: HTMLAttributes<HTMLHtmlElement>;
        i: HTMLAttributes<HTMLElement>;
        iframe: IframeHTMLAttributes<HTMLIFrameElement>;
        img: ImgHTMLAttributes<HTMLImageElement>;
        input: InputHTMLAttributes<HTMLInputElement>;
        ins: InsHTMLAttributes<HTMLModElement>;
        kbd: HTMLAttributes<HTMLElement>;
        label: LabelHTMLAttributes<HTMLLabelElement>;
        legend: HTMLAttributes<HTMLLegendElement>;
        li: LiHTMLAttributes<HTMLLIElement>;
        link: LinkHTMLAttributes<HTMLLinkElement>;
        main: HTMLAttributes<HTMLElement>;
        map: MapHTMLAttributes<HTMLMapElement>;
        mark: HTMLAttributes<HTMLElement>;
        menu: MenuHTMLAttributes<HTMLElement>;
        meta: MetaHTMLAttributes<HTMLMetaElement>;
        meter: MeterHTMLAttributes<HTMLElement>;
        nav: HTMLAttributes<HTMLElement>;
        noscript: HTMLAttributes<HTMLElement>;
        object: ObjectHTMLAttributes<HTMLObjectElement>;
        ol: OlHTMLAttributes<HTMLOListElement>;
        optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
        option: OptionHTMLAttributes<HTMLOptionElement>;
        output: OutputHTMLAttributes<HTMLElement>;
        p: HTMLAttributes<HTMLParagraphElement>;
        picture: HTMLAttributes<HTMLElement>;
        pre: HTMLAttributes<HTMLPreElement>;
        progress: ProgressHTMLAttributes<HTMLProgressElement>;
        q: QuoteHTMLAttributes<HTMLQuoteElement>;
        rp: HTMLAttributes<HTMLElement>;
        rt: HTMLAttributes<HTMLElement>;
        ruby: HTMLAttributes<HTMLElement>;
        s: HTMLAttributes<HTMLElement>;
        samp: HTMLAttributes<HTMLElement>;
        script: ScriptHTMLAttributes<HTMLScriptElement>;
        search: HTMLAttributes<HTMLElement>;
        section: HTMLAttributes<HTMLElement>;
        select: SelectHTMLAttributes<HTMLSelectElement>;
        slot: HTMLSlotElementAttributes;
        small: HTMLAttributes<HTMLElement>;
        source: SourceHTMLAttributes<HTMLSourceElement>;
        span: HTMLAttributes<HTMLSpanElement>;
        strong: HTMLAttributes<HTMLElement>;
        style: StyleHTMLAttributes<HTMLStyleElement>;
        sub: HTMLAttributes<HTMLElement>;
        summary: HTMLAttributes<HTMLElement>;
        sup: HTMLAttributes<HTMLElement>;
        table: HTMLAttributes<HTMLTableElement>;
        tbody: HTMLAttributes<HTMLTableSectionElement>;
        td: TdHTMLAttributes<HTMLTableCellElement>;
        template: TemplateHTMLAttributes<HTMLTemplateElement>;
        textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
        tfoot: HTMLAttributes<HTMLTableSectionElement>;
        th: ThHTMLAttributes<HTMLTableCellElement>;
        thead: HTMLAttributes<HTMLTableSectionElement>;
        time: TimeHTMLAttributes<HTMLElement>;
        title: HTMLAttributes<HTMLTitleElement>;
        tr: HTMLAttributes<HTMLTableRowElement>;
        track: TrackHTMLAttributes<HTMLTrackElement>;
        u: HTMLAttributes<HTMLElement>;
        ul: HTMLAttributes<HTMLUListElement>;
        var: HTMLAttributes<HTMLElement>;
        video: VideoHTMLAttributes<HTMLVideoElement>;
        wbr: HTMLAttributes<HTMLElement>;
    }

    interface SVGElementTags {
        animate: AnimateSVGAttributes<SVGAnimateElement>;
        animateMotion: AnimateMotionSVGAttributes<SVGAnimateMotionElement>;
        animateTransform: AnimateTransformSVGAttributes<SVGAnimateTransformElement>;
        circle: CircleSVGAttributes<SVGCircleElement>;
        clipPath: ClipPathSVGAttributes<SVGClipPathElement>;
        defs: DefsSVGAttributes<SVGDefsElement>;
        desc: DescSVGAttributes<SVGDescElement>;
        ellipse: EllipseSVGAttributes<SVGEllipseElement>;
        feBlend: FeBlendSVGAttributes<SVGFEBlendElement>;
        feColorMatrix: FeColorMatrixSVGAttributes<SVGFEColorMatrixElement>;
        feComponentTransfer: FeComponentTransferSVGAttributes<SVGFEComponentTransferElement>;
        feComposite: FeCompositeSVGAttributes<SVGFECompositeElement>;
        feConvolveMatrix: FeConvolveMatrixSVGAttributes<SVGFEConvolveMatrixElement>;
        feDiffuseLighting: FeDiffuseLightingSVGAttributes<SVGFEDiffuseLightingElement>;
        feDisplacementMap: FeDisplacementMapSVGAttributes<SVGFEDisplacementMapElement>;
        feDistantLight: FeDistantLightSVGAttributes<SVGFEDistantLightElement>;
        feDropShadow: FeDropShadowSVGAttributes<SVGFEDropShadowElement>;
        feFlood: FeFloodSVGAttributes<SVGFEFloodElement>;
        feFuncA: FeFuncSVGAttributes<SVGFEFuncAElement>;
        feFuncB: FeFuncSVGAttributes<SVGFEFuncBElement>;
        feFuncG: FeFuncSVGAttributes<SVGFEFuncGElement>;
        feFuncR: FeFuncSVGAttributes<SVGFEFuncRElement>;
        feGaussianBlur: FeGaussianBlurSVGAttributes<SVGFEGaussianBlurElement>;
        feImage: FeImageSVGAttributes<SVGFEImageElement>;
        feMerge: FeMergeSVGAttributes<SVGFEMergeElement>;
        feMergeNode: FeMergeNodeSVGAttributes<SVGFEMergeNodeElement>;
        feMorphology: FeMorphologySVGAttributes<SVGFEMorphologyElement>;
        feOffset: FeOffsetSVGAttributes<SVGFEOffsetElement>;
        fePointLight: FePointLightSVGAttributes<SVGFEPointLightElement>;
        feSpecularLighting: FeSpecularLightingSVGAttributes<SVGFESpecularLightingElement>;
        feSpotLight: FeSpotLightSVGAttributes<SVGFESpotLightElement>;
        feTile: FeTileSVGAttributes<SVGFETileElement>;
        feTurbulence: FeTurbulanceSVGAttributes<SVGFETurbulenceElement>;
        filter: FilterSVGAttributes<SVGFilterElement>;
        foreignObject: ForeignObjectSVGAttributes<SVGForeignObjectElement>;
        g: GSVGAttributes<SVGGElement>;
        image: ImageSVGAttributes<SVGImageElement>;
        line: LineSVGAttributes<SVGLineElement>;
        linearGradient: LinearGradientSVGAttributes<SVGLinearGradientElement>;
        marker: MarkerSVGAttributes<SVGMarkerElement>;
        mask: MaskSVGAttributes<SVGMaskElement>;
        metadata: MetadataSVGAttributes<SVGMetadataElement>;
        mpath: MPathSVGAttributes<SVGMPathElement>;
        path: PathSVGAttributes<SVGPathElement>;
        pattern: PatternSVGAttributes<SVGPatternElement>;
        polygon: PolygonSVGAttributes<SVGPolygonElement>;
        polyline: PolylineSVGAttributes<SVGPolylineElement>;
        radialGradient: RadialGradientSVGAttributes<SVGRadialGradientElement>;
        rect: RectSVGAttributes<SVGRectElement>;
        set: SetSVGAttributes<SVGSetElement>;
        stop: StopSVGAttributes<SVGStopElement>;
        svg: SvgSVGAttributes<SVGSVGElement>;
        switch: SwitchSVGAttributes<SVGSwitchElement>;
        symbol: SymbolSVGAttributes<SVGSymbolElement>;
        text: TextSVGAttributes<SVGTextElement>;
        textPath: TextPathSVGAttributes<SVGTextPathElement>;
        tspan: TSpanSVGAttributes<SVGTSpanElement>;
        use: UseSVGAttributes<SVGUseElement>;
        view: ViewSVGAttributes<SVGViewElement>;
    }

    export interface IntrinsicElements extends HTMLElementTags, SVGElementTags {
    }
}

const keyMap: {[key: string]: string} = {
    "class": "className"
};

/**
 * Iterates over all `JSX.ElementPrimitive`s while rendering.
 *
 * **Does not auto-insert `ReadonlyBox`, `BoxArray`, `BoxMap` nor `BoxSet`.**
 * This is so that the `asText` implementations can be bundled when needed.
 */
export function traverseAndRender(
    element: JSX.Element,
    callback: (node: Node) => void
) {
    if(element instanceof Node) callback(element);
    else if(element instanceof Array) element.forEach(element => traverseAndRender(element, callback));
    else if(element !== null && element !== undefined && typeof element !== "boolean") callback(document.createTextNode(String(element)));
}

/**
 * Renders the `element` to be a node.
 * If `element` is an array, a transparent shell is wrapping it.
 * If `element` does not represent a node, it renders to an empty `<div/>`.
 */
export function renderToNode(element: JSX.Element): Node {
    let firstNode: Node | undefined;
    let shell: HTMLDivElement | undefined;
    traverseAndRender(element, node => {
        if(!firstNode) {
            firstNode = node;
            return;
        }

        if(!shell) {
            shell = document.createElement("div");
            shell.style.display = "contents";
        }

        shell.append(node);
    });
    return shell || firstNode || document.createElement("div");
}

/**
 * Appends the `elements` to `target`.
 */
export function mount(target: Element, element: JSX.Element) {
    traverseAndRender(element, node => target.append(node));
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
    ...children: JSX.Element[]
): Node {
    props = props || {};

    if(typeof tag === "function") {
        props.children = children;
        return tag(props);
    }

    const element: Element & {[key: string]: any} = svgElements.has(tag)
        ? (delete props.xmlns, document.createElementNS("http://www.w3.org/2000/svg", tag))
        : document.createElement(tag);

    Object.keys(props).forEach(key => {
        if(key === "ref") return;

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

    mount(element, children);

    if("ref" in props) props.ref(element);

    return element;
}

export function Fragment({
    children
}: {
    children: JSX.Element[]
}): JSX.Element[] {
    return children;
}