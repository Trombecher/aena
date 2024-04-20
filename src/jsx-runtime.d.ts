import {State} from "./index";

type DOMElement = Element;

/**
 * Adapted from [SolidJS](https://github.com/solidjs/solid/tree/main/packages/solid).
 */
export declare namespace JSX {
    export type Element = Node | Element[] | number | string | boolean | symbol | null | undefined;
    type StateOr<T> = Readonly<State<T>> | T;

    interface EventHandler<T, E extends Event> {
        (e: E & {
            currentTarget: T;
            target: DOMElement;
        }): void;
    }

    interface BoundEventHandler<T, E extends Event> {
        0: (data: any, e: E & {
            currentTarget: T;
            target: DOMElement;
        }) => void;
        1: any;
    }

    type EventHandlerUnion<T, E extends Event> = EventHandler<T, E> | BoundEventHandler<T, E>;

    interface InputEventHandler<T, E extends InputEvent> {
        (e: E & {
            currentTarget: T;
            target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement ? T : DOMElement;
        }): void;
    }

    interface BoundInputEventHandler<T, E extends InputEvent> {
        0: (data: any, e: E & {
            currentTarget: T;
            target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement ? T : DOMElement;
        }) => void;
        1: any;
    }

    type InputEventHandlerUnion<T, E extends InputEvent> = InputEventHandler<T, E> | BoundInputEventHandler<T, E>;

    interface ChangeEventHandler<T, E extends Event> {
        (e: E & {
            currentTarget: T;
            target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement ? T : DOMElement;
        }): void;
    }

    interface BoundChangeEventHandler<T, E extends Event> {
        0: (data: any, e: E & {
            currentTarget: T;
            target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement ? T : DOMElement;
        }) => void;
        1: any;
    }

    type ChangeEventHandlerUnion<T, E extends Event> = ChangeEventHandler<T, E> | BoundChangeEventHandler<T, E>;

    interface FocusEventHandler<T, E extends FocusEvent> {
        (e: E & {
            currentTarget: T;
            target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement ? T : DOMElement;
        }): void;
    }

    interface BoundFocusEventHandler<T, E extends FocusEvent> {
        0: (data: any, e: E & {
            currentTarget: T;
            target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement ? T : DOMElement;
        }) => void;
        1: any;
    }

    type FocusEventHandlerUnion<T, E extends FocusEvent> = FocusEventHandler<T, E> | BoundFocusEventHandler<T, E>;
    const SERIALIZABLE: unique symbol;

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
        onsubmit?: EventHandlerUnion<T, Event & {
            submitter: HTMLElement;
        }>;
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
        "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    type HTMLIframeSandbox =
        "allow-downloads-without-user-activation"
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
        "audio"
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
        "aria-relevant"?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals";
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
        role?: "alert" | "alertdialog" | "application" | "article" | "banner" | "button" | "cell" | "checkbox" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "dialog" | "directory" | "document" | "feed" | "figure" | "form" | "grid" | "gridcell" | "group" | "heading" | "img" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "meter" | "navigation" | "none" | "note" | "option" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem";
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
        href?: StateOr<string>;
        target?: StateOr<string>;
    }

    interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: StateOr<string>;
    }

    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
        autofocus?: StateOr<boolean>;
        disabled?: StateOr<boolean>;
        form?: StateOr<string>;
        formaction?: StateOr<string | SerializableAttributeValue>;
        formenctype?: StateOr<HTMLFormEncType>;
        formmethod?: StateOr<HTMLFormMethod>;
        formnovalidate?: StateOr<boolean>;
        formtarget?: StateOr<string>;
        popovertarget?: StateOr<string>;
        popovertargetaction?: StateOr<"hide" | "show" | "toggle">;
        name?: StateOr<string>;
        type?: StateOr<"submit" | "reset" | "button">;
        value?: StateOr<string>;
    }

    interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
        width?: StateOr<number | string>;
        height?: StateOr<number | string>;
    }

    interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: StateOr<number | string>;
        width?: StateOr<number | string>;
    }

    interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: StateOr<number | string>;
    }

    interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: StateOr<string | string[] | number>;
    }

    interface DetailsHtmlAttributes<T> extends HTMLAttributes<T> {
        open?: StateOr<boolean>;
        ontoggle?: StateOr<EventHandlerUnion<T, Event>>;
    }

    interface DialogHtmlAttributes<T> extends HTMLAttributes<T> {
        open?: StateOr<boolean>;
        onclose?: StateOr<EventHandlerUnion<T, Event>>;
        oncancel?: StateOr<EventHandlerUnion<T, Event>>;
    }

    interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: StateOr<number | string>;
        src?: StateOr<string>;
        type?: StateOr<string>;
        width?: StateOr<number | string>;
    }

    interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: StateOr<boolean>;
        form?: StateOr<string>;
        name?: StateOr<string>;
    }

    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        "accept-charset"?: StateOr<string>;
        action?: StateOr<string | SerializableAttributeValue>;
        autocomplete?: StateOr<string>;
        encoding?: StateOr<HTMLFormEncType>;
        enctype?: StateOr<HTMLFormEncType>;
        method?: StateOr<HTMLFormMethod>;
        name?: StateOr<string>;
        novalidate?: StateOr<boolean>;
        target?: StateOr<string>;
    }

    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
        allow?: StateOr<string>;
        allowfullscreen?: StateOr<boolean>;
        height?: StateOr<number | string>;
        loading?: StateOr<"eager" | "lazy">;
        name?: StateOr<string>;
        referrerpolicy?: StateOr<HTMLReferrerPolicy>;
        sandbox?: StateOr<HTMLIframeSandbox | string>;
        src?: StateOr<string>;
        srcdoc?: StateOr<string>;
        width?: StateOr<number | string>;
    }

    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: StateOr<string>;
        crossorigin?: StateOr<HTMLCrossorigin>;
        decoding?: StateOr<"sync" | "async" | "auto">;
        height?: StateOr<number | string>;
        ismap?: StateOr<boolean>;
        isMap?: StateOr<boolean>;
        loading?: StateOr<"eager" | "lazy">;
        referrerpolicy?: StateOr<HTMLReferrerPolicy>;
        referrerPolicy?: StateOr<HTMLReferrerPolicy>;
        sizes?: StateOr<string>;
        src?: StateOr<string>;
        srcset?: StateOr<string>;
        srcSet?: StateOr<string>;
        usemap?: StateOr<string>;
        useMap?: StateOr<string>;
        width?: StateOr<number | string>;
    }

    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        accept?: StateOr<string>;
        alt?: StateOr<string>;
        autocomplete?: StateOr<string>;
        autocorrect?: StateOr<"on" | "off">;
        autofocus?: StateOr<boolean>;
        capture?: StateOr<boolean | string>;
        checked?: StateOr<boolean>;
        crossorigin?: StateOr<HTMLCrossorigin>;
        disabled?: StateOr<boolean>;
        enterkeyhint?: StateOr<"enter" | "done" | "go" | "next" | "previous" | "search" | "send">;
        form?: StateOr<string>;
        formaction?: StateOr<string | SerializableAttributeValue>;
        formenctype?: StateOr<HTMLFormEncType>;
        formmethod?: StateOr<HTMLFormMethod>;
        formnovalidate?: StateOr<boolean>;
        formtarget?: StateOr<string>;
        height?: StateOr<number | string>;
        incremental?: StateOr<boolean>;
        list?: StateOr<string>;
        max?: StateOr<number | string>;
        maxlength?: StateOr<number | string>;
        min?: StateOr<number | string>;
        minlength?: StateOr<number | string>;
        multiple?: StateOr<boolean>;
        name?: StateOr<string>;
        pattern?: StateOr<string>;
        placeholder?: StateOr<string>;
        readonly?: StateOr<boolean>;
        results?: StateOr<number>;
        required?: StateOr<boolean>;
        size?: StateOr<number | string>;
        src?: StateOr<string>;
        step?: StateOr<number | string>;
        type?: StateOr<"button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week">;
        value?: StateOr<string | string[] | number>;
        width?: StateOr<number | string>;
    }

    interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: StateOr<string>;
        dateTime?: StateOr<string>;
    }

    interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
        for?: StateOr<string>;
        form?: StateOr<string>;
    }

    interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: StateOr<number | string>;
    }

    interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
        as?: StateOr<HTMLLinkAs>;
        crossorigin?: StateOr<HTMLCrossorigin>;
        disabled?: StateOr<boolean>;
        fetchpriority?: StateOr<"high" | "low" | "auto">;
        href?: StateOr<string>;
        hreflang?: StateOr<string>;
        imagesizes?: StateOr<string>;
        imagesrcset?: StateOr<string>;
        integrity?: StateOr<string>;
        media?: StateOr<string>;
        referrerpolicy?: StateOr<HTMLReferrerPolicy>;
        rel?: StateOr<string>;
        sizes?: StateOr<string>;
        type?: StateOr<string>;
    }

    interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: StateOr<string>;
    }

    interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoplay?: StateOr<boolean>;
        controls?: StateOr<boolean>;
        crossorigin?: StateOr<HTMLCrossorigin>;
        loop?: StateOr<boolean>;
        mediagroup?: StateOr<string>;
        muted?: StateOr<boolean>;
        preload?: StateOr<"none" | "metadata" | "auto" | "">;
        src?: StateOr<string>;
        crossOrigin?: StateOr<HTMLCrossorigin>;
        mediaGroup?: StateOr<string>;
    }

    interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
        label?: StateOr<string>;
        type?: StateOr<"context" | "toolbar">;
    }

    interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
        charset?: StateOr<string>;
        content?: StateOr<string>;
        "http-equiv"?: StateOr<string>;
        name?: StateOr<string>;
        media?: StateOr<string>;
    }

    interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: StateOr<string>;
        high?: StateOr<number | string>;
        low?: StateOr<number | string>;
        max?: StateOr<number | string>;
        min?: StateOr<number | string>;
        optimum?: StateOr<number | string>;
        value?: StateOr<string | string[] | number>;
    }

    interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: StateOr<string>;
    }

    interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
        data?: StateOr<string>;
        form?: StateOr<string>;
        height?: StateOr<number | string>;
        name?: StateOr<string>;
        type?: StateOr<string>;
        usemap?: StateOr<string>;
        width?: StateOr<number | string>;
    }

    interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
        reversed?: StateOr<boolean>;
        start?: StateOr<number | string>;
        type?: StateOr<"1" | "a" | "A" | "i" | "I">;
    }

    interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: StateOr<boolean>;
        label?: StateOr<string>;
    }

    interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: StateOr<boolean>;
        label?: StateOr<string>;
        selected?: StateOr<boolean>;
        value?: StateOr<string | string[] | number>;
    }

    interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: StateOr<string>;
        for?: StateOr<string>;
        name?: StateOr<string>;
    }

    interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
        max?: StateOr<number | string>;
        value?: StateOr<string | string[] | number>;
    }

    interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
        async?: StateOr<boolean>;
        charset?: StateOr<string>;
        crossorigin?: StateOr<HTMLCrossorigin>;
        defer?: StateOr<boolean>;
        integrity?: StateOr<string>;
        nomodule?: StateOr<boolean>;
        nonce?: StateOr<string>;
        referrerpolicy?: StateOr<HTMLReferrerPolicy>;
        src?: StateOr<string>;
        type?: StateOr<string>;
    }

    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
        autocomplete?: StateOr<string>;
        autofocus?: StateOr<boolean>;
        disabled?: StateOr<boolean>;
        form?: StateOr<string>;
        multiple?: StateOr<boolean>;
        name?: StateOr<string>;
        required?: StateOr<boolean>;
        size?: StateOr<number | string>;
        value?: StateOr<string | string[] | number>;
    }

    interface HTMLSlotElementAttributes<T = HTMLSlotElement> extends HTMLAttributes<T> {
        name?: StateOr<string>;
    }

    interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: StateOr<string>;
        sizes?: StateOr<string>;
        src?: StateOr<string>;
        srcset?: StateOr<string>;
        type?: StateOr<string>;
    }

    interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: StateOr<string>;
        nonce?: StateOr<string>;
        scoped?: StateOr<boolean>;
        type?: StateOr<string>;
    }

    interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
        colspan?: StateOr<number | string>;
        headers?: StateOr<string>;
        rowspan?: StateOr<number | string>;
    }

    interface TemplateHTMLAttributes<T extends HTMLTemplateElement> extends HTMLAttributes<T> {
        content?: DocumentFragment;
    }

    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
        autocomplete?: StateOr<string>;
        autofocus?: StateOr<boolean>;
        cols?: StateOr<number | string>;
        dirname?: StateOr<string>;
        disabled?: StateOr<boolean>;
        enterkeyhint?: StateOr<"enter" | "done" | "go" | "next" | "previous" | "search" | "send">;
        form?: StateOr<string>;
        maxlength?: StateOr<number | string>;
        minlength?: StateOr<number | string>;
        name?: StateOr<string>;
        placeholder?: StateOr<string>;
        readonly?: StateOr<boolean>;
        required?: StateOr<boolean>;
        rows?: StateOr<number | string>;
        value?: StateOr<string | string[] | number>;
        wrap?: StateOr<"hard" | "soft" | "off">;
    }

    interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
        colspan?: StateOr<number | string>;
        headers?: StateOr<string>;
        rowspan?: StateOr<number | string>;
        scope?: StateOr<"col" | "row" | "rowgroup" | "colgroup">;
    }

    interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
        datetime?: StateOr<string>;
    }

    interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
        default?: StateOr<boolean>;
        kind?: StateOr<"subtitles" | "captions" | "descriptions" | "chapters" | "metadata">;
        label?: StateOr<string>;
        src?: StateOr<string>;
        srclang?: StateOr<string>;
    }

    interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
        height?: StateOr<number | string>;
        playsinline?: StateOr<boolean>;
        poster?: StateOr<string>;
        width?: StateOr<number | string>;
    }

    type SVGPreserveAspectRatio =
        "none"
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
        SVGPreserveAspectRatio
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
        _id?: StateOr<string>;
        _lang?: StateOr<string>;
        _tabindex?: StateOr<number | string>;
    }

    interface StylableSVGAttributes {
        _class?: StateOr<string>;
        _style?: StateOr<string>;
    }

    interface TransformableSVGAttributes {
        _transform?: StateOr<string>;
    }

    interface ConditionalProcessingSVGAttributes {
        _requiredExtensions?: StateOr<string>;
        _requiredFeatures?: StateOr<string>;
        _systemLanguage?: StateOr<string>;
    }

    interface ExternalResourceSVGAttributes {
        _externalResourcesRequired?: StateOr<"true" | "false">;
    }

    interface AnimationTimingSVGAttributes {
        _begin?: StateOr<string>;
        _dur?: StateOr<string>;
        _end?: StateOr<string>;
        _min?: StateOr<string>;
        _max?: StateOr<string>;
        _restart?: StateOr<"always" | "whenNotActive" | "never">;
        _repeatCount?: StateOr<number | "indefinite">;
        _repeatDur?: StateOr<string>;
        _fill?: StateOr<"freeze" | "remove">;
    }

    interface AnimationValueSVGAttributes {
        _calcMode?: StateOr<"discrete" | "linear" | "paced" | "spline">;
        _values?: StateOr<string>;
        _keyTimes?: StateOr<string>;
        _keySplines?: StateOr<string>;
        _from?: StateOr<number | string>;
        _to?: StateOr<number | string>;
        _by?: StateOr<number | string>;
    }

    interface AnimationAdditionSVGAttributes {
        _attributeName?: StateOr<string>;
        _additive?: StateOr<"replace" | "sum">;
        _accumulate?: StateOr<"none" | "sum">;
    }

    interface AnimationAttributeTargetSVGAttributes {
        _attributeName?: StateOr<string>;
        _attributeType?: StateOr<"CSS" | "XML" | "auto">;
    }

    interface PresentationSVGAttributes {
        "_alignment-baseline"?: StateOr<"auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit">;
        "_baseline-shift"?: StateOr<number | string>;
        _clip?: StateOr<string>;
        "_clip-path"?: StateOr<string>;
        "_clip-rule"?: StateOr<"nonzero" | "evenodd" | "inherit">;
        _color?: StateOr<string>;
        "_color-interpolation"?: StateOr<"auto" | "sRGB" | "linearRGB" | "inherit">;
        "_color-interpolation-filters"?: StateOr<"auto" | "sRGB" | "linearRGB" | "inherit">;
        "_color-profile"?: StateOr<string>;
        "_color-rendering"?: StateOr<"auto" | "optimizeSpeed" | "optimizeQuality" | "inherit">;
        _cursor?: StateOr<string>;
        _direction?: StateOr<"ltr" | "rtl" | "inherit">;
        _display?: StateOr<string>;
        "_dominant-baseline"?: StateOr<"auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top" | "inherit">;
        "_enable-background"?: StateOr<string>;
        _fill?: StateOr<string>;
        "_fill-opacity"?: StateOr<number | string | "inherit">;
        "_fill-rule"?: StateOr<"nonzero" | "evenodd" | "inherit">;
        _filter?: StateOr<string>;
        "_flood-color"?: StateOr<string>;
        "_flood-opacity"?: StateOr<number | string | "inherit">;
        "_font-family"?: StateOr<string>;
        "_font-size"?: StateOr<string>;
        "_font-size-adjust"?: StateOr<number | string>;
        "_font-stretch"?: StateOr<string>;
        "_font-style"?: StateOr<"normal" | "italic" | "oblique" | "inherit">;
        "_font-variant"?: StateOr<string>;
        "_font-weight"?: StateOr<number | string>;
        "_glyph-orientation-horizontal"?: StateOr<string>;
        "_glyph-orientation-vertical"?: StateOr<string>;
        "_image-rendering"?: StateOr<"auto" | "optimizeQuality" | "optimizeSpeed" | "inherit">;
        _kerning?: StateOr<string>;
        "_letter-spacing"?: StateOr<number | string>;
        "_lighting-color"?: StateOr<string>;
        "_marker-end"?: StateOr<string>;
        "_marker-mid"?: StateOr<string>;
        "_marker-start"?: StateOr<string>;
        _mask?: StateOr<string>;
        _opacity?: StateOr<number | string | "inherit">;
        _overflow?: StateOr<"visible" | "hidden" | "scroll" | "auto" | "inherit">;
        _pathLength?: StateOr<string | number>;
        "_pointer-events"?: StateOr<"bounding-box" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "color" | "fill" | "stroke" | "all" | "none" | "inherit">;
        "_shape-rendering"?: StateOr<"auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision" | "inherit">;
        "_stop-color"?: StateOr<string>;
        "_stop-opacity"?: StateOr<number | string | "inherit">;
        _stroke?: StateOr<string>;
        "_stroke-dasharray"?: StateOr<string>;
        "_stroke-dashoffset"?: StateOr<number | string>;
        "_stroke-linecap"?: StateOr<"butt" | "round" | "square" | "inherit">;
        "_stroke-linejoin"?: StateOr<"arcs" | "bevel" | "miter" | "miter-clip" | "round" | "inherit">;
        "_stroke-miterlimit"?: StateOr<number | string | "inherit">;
        "_stroke-opacity"?: StateOr<number | string | "inherit">;
        "_stroke-width"?: StateOr<number | string>;
        "_text-anchor"?: StateOr<"start" | "middle" | "end" | "inherit">;
        "_text-decoration"?: StateOr<"none" | "underline" | "overline" | "line-through" | "blink" | "inherit">;
        "_text-rendering"?: StateOr<"auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision" | "inherit">;
        "_unicode-bidi"?: StateOr<string>;
        _visibility?: StateOr<"visible" | "hidden" | "collapse" | "inherit">;
        "_word-spacing"?: StateOr<number | string>;
        "_writing-mode"?: StateOr<"lr-tb" | "rl-tb" | "tb-rl" | "lr" | "rl" | "tb" | "inherit">;
    }

    interface AnimationElementSVGAttributes<T> extends CoreSVGAttributes<T>, ExternalResourceSVGAttributes, ConditionalProcessingSVGAttributes {
    }

    interface ContainerElementSVGAttributes<T> extends CoreSVGAttributes<T>, ShapeElementSVGAttributes<T>, Pick<PresentationSVGAttributes, "_clip-path" | "_mask" | "_cursor" | "_opacity" | "_filter" | "_enable-background" | "_color-interpolation" | "_color-rendering"> {
    }

    interface FilterPrimitiveElementSVGAttributes<T> extends CoreSVGAttributes<T>, Pick<PresentationSVGAttributes, "_color-interpolation-filters"> {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
        _result?: StateOr<string>;
    }

    interface SingleInputFilterSVGAttributes {
        _in?: StateOr<string>;
    }

    interface DoubleInputFilterSVGAttributes {
        _in?: StateOr<string>;
        _in2?: StateOr<string>;
    }

    interface FitToViewBoxSVGAttributes {
        _viewBox?: StateOr<string>;
        _preserveAspectRatio?: StateOr<SVGPreserveAspectRatio>;
    }

    interface GradientElementSVGAttributes<T> extends CoreSVGAttributes<T>, ExternalResourceSVGAttributes, StylableSVGAttributes {
        _gradientUnits?: StateOr<SVGUnits>;
        _gradientTransform?: StateOr<string>;
        _spreadMethod?: StateOr<"pad" | "reflect" | "repeat">;
        _href?: StateOr<string>;
    }

    interface GraphicsElementSVGAttributes<T> extends CoreSVGAttributes<T>, Pick<PresentationSVGAttributes, "_clip-rule" | "_mask" | "_pointer-events" | "_cursor" | "_opacity" | "_filter" | "_display" | "_visibility" | "_color-interpolation" | "_color-rendering"> {
    }

    interface LightSourceElementSVGAttributes<T> extends CoreSVGAttributes<T> {
    }

    interface NewViewportSVGAttributes<T> extends CoreSVGAttributes<T>, Pick<PresentationSVGAttributes, "_overflow" | "_clip"> {
        _viewBox?: StateOr<string>;
    }

    interface ShapeElementSVGAttributes<T> extends CoreSVGAttributes<T>, Pick<PresentationSVGAttributes, "_color" | "_fill" | "_fill-rule" | "_fill-opacity" | "_stroke" | "_stroke-width" | "_stroke-linecap" | "_stroke-linejoin" | "_stroke-miterlimit" | "_stroke-dasharray" | "_stroke-dashoffset" | "_stroke-opacity" | "_shape-rendering" | "_pathLength"> {
    }

    interface TextContentElementSVGAttributes<T> extends CoreSVGAttributes<T>, Pick<PresentationSVGAttributes, "_font-family" | "_font-style" | "_font-variant" | "_font-weight" | "_font-stretch" | "_font-size" | "_font-size-adjust" | "_kerning" | "_letter-spacing" | "_word-spacing" | "_text-decoration" | "_glyph-orientation-horizontal" | "_glyph-orientation-vertical" | "_direction" | "_unicode-bidi" | "_text-anchor" | "_dominant-baseline" | "_color" | "_fill" | "_fill-rule" | "_fill-opacity" | "_stroke" | "_stroke-width" | "_stroke-linecap" | "_stroke-linejoin" | "_stroke-miterlimit" | "_stroke-dasharray" | "_stroke-dashoffset" | "_stroke-opacity"> {
    }

    interface ZoomAndPanSVGAttributes {
        _zoomAndPan?: StateOr<"disable" | "magnify">;
    }

    interface AnimateSVGAttributes<T> extends AnimationElementSVGAttributes<T>, AnimationAttributeTargetSVGAttributes, AnimationTimingSVGAttributes, AnimationValueSVGAttributes, AnimationAdditionSVGAttributes, Pick<PresentationSVGAttributes, "_color-interpolation" | "_color-rendering"> {
    }

    interface AnimateMotionSVGAttributes<T> extends AnimationElementSVGAttributes<T>, AnimationTimingSVGAttributes, AnimationValueSVGAttributes, AnimationAdditionSVGAttributes {
        _path?: StateOr<string>;
        _keyPoints?: StateOr<string>;
        _rotate?: StateOr<number | string | "auto" | "auto-reverse">;
        _origin?: StateOr<"default">;
    }

    interface AnimateTransformSVGAttributes<T> extends AnimationElementSVGAttributes<T>, AnimationAttributeTargetSVGAttributes, AnimationTimingSVGAttributes, AnimationValueSVGAttributes, AnimationAdditionSVGAttributes {
        _type?: StateOr<"translate" | "scale" | "rotate" | "skewX" | "skewY">;
    }

    interface CircleSVGAttributes<T> extends GraphicsElementSVGAttributes<T>, ShapeElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes {
        _cx?: StateOr<number | string>;
        _cy?: StateOr<number | string>;
        _r?: StateOr<number | string>;
    }

    interface ClipPathSVGAttributes<T> extends CoreSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_clip-path"> {
        _clipPathUnits?: StateOr<SVGUnits>;
    }

    interface DefsSVGAttributes<T> extends ContainerElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes {
    }

    interface DescSVGAttributes<T> extends CoreSVGAttributes<T>, StylableSVGAttributes {
    }

    interface EllipseSVGAttributes<T> extends GraphicsElementSVGAttributes<T>, ShapeElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes {
        _cx?: StateOr<number | string>;
        _cy?: StateOr<number | string>;
        _rx?: StateOr<number | string>;
        _ry?: StateOr<number | string>;
    }

    interface FeBlendSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, DoubleInputFilterSVGAttributes, StylableSVGAttributes {
        _mode?: StateOr<"normal" | "multiply" | "screen" | "darken" | "lighten">;
    }

    interface FeColorMatrixSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes {
        _type?: StateOr<"matrix" | "saturate" | "hueRotate" | "luminanceToAlpha">;
        _values?: StateOr<string>;
    }

    interface FeComponentTransferSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes {
    }

    interface FeCompositeSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, DoubleInputFilterSVGAttributes, StylableSVGAttributes {
        _operator?: StateOr<"over" | "in" | "out" | "atop" | "xor" | "arithmetic">;
        _k1?: StateOr<number | string>;
        _k2?: StateOr<number | string>;
        _k3?: StateOr<number | string>;
        _k4?: StateOr<number | string>;
    }

    interface FeConvolveMatrixSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes {
        _order?: StateOr<number | string>;
        _kernelMatrix?: StateOr<string>;
        _divisor?: StateOr<number | string>;
        _bias?: StateOr<number | string>;
        _targetX?: StateOr<number | string>;
        _targetY?: StateOr<number | string>;
        _edgeMode?: StateOr<"duplicate" | "wrap" | "none">;
        _kernelUnitLength?: StateOr<number | string>;
        _preserveAlpha?: StateOr<"true" | "false">;
    }

    interface FeDiffuseLightingSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes, Pick<PresentationSVGAttributes, "_color" | "_lighting-color"> {
        _surfaceScale?: StateOr<number | string>;
        _diffuseConstant?: StateOr<number | string>;
        _kernelUnitLength?: StateOr<number | string>;
    }

    interface FeDisplacementMapSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, DoubleInputFilterSVGAttributes, StylableSVGAttributes {
        _scale?: StateOr<number | string>;
        _xChannelSelector?: StateOr<"R" | "G" | "B" | "A">;
        _yChannelSelector?: StateOr<"R" | "G" | "B" | "A">;
    }

    interface FeDistantLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
        _azimuth?: StateOr<number | string>;
        _elevation?: StateOr<number | string>;
    }

    interface FeDropShadowSVGAttributes<T> extends CoreSVGAttributes<T>, FilterPrimitiveElementSVGAttributes<T>, StylableSVGAttributes, Pick<PresentationSVGAttributes, "_color" | "_flood-color" | "_flood-opacity"> {
        _dx?: StateOr<number | string>;
        _dy?: StateOr<number | string>;
        _stdDeviation?: StateOr<number | string>;
    }

    interface FeFloodSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, StylableSVGAttributes, Pick<PresentationSVGAttributes, "_color" | "_flood-color" | "_flood-opacity"> {
    }

    interface FeFuncSVGAttributes<T> extends CoreSVGAttributes<T> {
        _type?: StateOr<"identity" | "table" | "discrete" | "linear" | "gamma">;
        _tableValues?: StateOr<string>;
        _slope?: StateOr<number | string>;
        _intercept?: StateOr<number | string>;
        _amplitude?: StateOr<number | string>;
        _exponent?: StateOr<number | string>;
        _offset?: StateOr<number | string>;
    }

    interface FeGaussianBlurSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes {
        _stdDeviation?: StateOr<number | string>;
    }

    interface FeImageSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, ExternalResourceSVGAttributes, StylableSVGAttributes {
        _preserveAspectRatio?: StateOr<SVGPreserveAspectRatio>;
        _href?: StateOr<string>;
    }

    interface FeMergeSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, StylableSVGAttributes {
    }

    interface FeMergeNodeSVGAttributes<T> extends CoreSVGAttributes<T>, SingleInputFilterSVGAttributes {
    }

    interface FeMorphologySVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes {
        _operator?: StateOr<"erode" | "dilate">;
        _radius?: StateOr<number | string>;
    }

    interface FeOffsetSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes {
        _dx?: StateOr<number | string>;
        _dy?: StateOr<number | string>;
    }

    interface FePointLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _z?: StateOr<number | string>;
    }

    interface FeSpecularLightingSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes, Pick<PresentationSVGAttributes, "_color" | "_lighting-color"> {
        _surfaceScale?: StateOr<string>;
        _specularConstant?: StateOr<string>;
        _specularExponent?: StateOr<string>;
        _kernelUnitLength?: StateOr<number | string>;
    }

    interface FeSpotLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _z?: StateOr<number | string>;
        _pointsAtX?: StateOr<number | string>;
        _pointsAtY?: StateOr<number | string>;
        _pointsAtZ?: StateOr<number | string>;
        _specularExponent?: StateOr<number | string>;
        _limitingConeAngle?: StateOr<number | string>;
    }

    interface FeTileSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, SingleInputFilterSVGAttributes, StylableSVGAttributes {
    }

    interface FeTurbulanceSVGAttributes<T> extends FilterPrimitiveElementSVGAttributes<T>, StylableSVGAttributes {
        _baseFrequency?: StateOr<number | string>;
        _numOctaves?: StateOr<number | string>;
        _seed?: StateOr<number | string>;
        _stitchTiles?: StateOr<"stitch" | "noStitch">;
        _type?: StateOr<"fractalNoise" | "turbulence">;
    }

    interface FilterSVGAttributes<T> extends CoreSVGAttributes<T>, ExternalResourceSVGAttributes, StylableSVGAttributes {
        _filterUnits?: StateOr<SVGUnits>;
        _primitiveUnits?: StateOr<SVGUnits>;
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
        _filterRes?: StateOr<number | string>;
    }

    interface ForeignObjectSVGAttributes<T> extends NewViewportSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_display" | "_visibility"> {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
    }

    interface GSVGAttributes<T> extends ContainerElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_display" | "_visibility"> {
    }

    interface ImageSVGAttributes<T> extends NewViewportSVGAttributes<T>, GraphicsElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_color-profile" | "_image-rendering"> {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
        _preserveAspectRatio?: StateOr<ImagePreserveAspectRatio>;
        _href?: StateOr<string>;
    }

    interface LineSVGAttributes<T> extends GraphicsElementSVGAttributes<T>, ShapeElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_marker-start" | "_marker-mid" | "_marker-end"> {
        _x1?: StateOr<number | string>;
        _y1?: StateOr<number | string>;
        _x2?: StateOr<number | string>;
        _y2?: StateOr<number | string>;
    }

    interface LinearGradientSVGAttributes<T> extends GradientElementSVGAttributes<T> {
        _x1?: StateOr<number | string>;
        _x2?: StateOr<number | string>;
        _y1?: StateOr<number | string>;
        _y2?: StateOr<number | string>;
    }

    interface MarkerSVGAttributes<T> extends ContainerElementSVGAttributes<T>, ExternalResourceSVGAttributes, StylableSVGAttributes, FitToViewBoxSVGAttributes, Pick<PresentationSVGAttributes, "_overflow" | "_clip"> {
        _markerUnits?: StateOr<"strokeWidth" | "userSpaceOnUse">;
        _refX?: StateOr<number | string>;
        _refY?: StateOr<number | string>;
        _markerWidth?: StateOr<number | string>;
        _markerHeight?: StateOr<number | string>;
        _orient?: StateOr<string>;
    }

    interface MaskSVGAttributes<T> extends Omit<ContainerElementSVGAttributes<T>, "opacity" | "filter">, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes {
        _maskUnits?: StateOr<SVGUnits>;
        _maskContentUnits?: StateOr<SVGUnits>;
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
    }

    interface MetadataSVGAttributes<T> extends CoreSVGAttributes<T> {
    }

    interface MPathSVGAttributes<T> extends CoreSVGAttributes<T> {
    }

    interface PathSVGAttributes<T> extends GraphicsElementSVGAttributes<T>, ShapeElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_marker-start" | "_marker-mid" | "_marker-end"> {
        _d?: StateOr<string>;
        _pathLength?: StateOr<number | string>;
    }

    interface PatternSVGAttributes<T> extends ContainerElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, FitToViewBoxSVGAttributes, Pick<PresentationSVGAttributes, "_overflow" | "_clip"> {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
        _patternUnits?: StateOr<SVGUnits>;
        _patternContentUnits?: StateOr<SVGUnits>;
        _patternTransform?: StateOr<string>;
        _href?: StateOr<string>;
    }

    interface PolygonSVGAttributes<T> extends GraphicsElementSVGAttributes<T>, ShapeElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_marker-start" | "_marker-mid" | "_marker-end"> {
        _points?: StateOr<string>;
    }

    interface PolylineSVGAttributes<T> extends GraphicsElementSVGAttributes<T>, ShapeElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_marker-start" | "_marker-mid" | "_marker-end"> {
        _points?: StateOr<string>;
    }

    interface RadialGradientSVGAttributes<T> extends GradientElementSVGAttributes<T> {
        _cx?: StateOr<number | string>;
        _cy?: StateOr<number | string>;
        _r?: StateOr<number | string>;
        _fx?: StateOr<number | string>;
        _fy?: StateOr<number | string>;
    }

    interface RectSVGAttributes<T> extends GraphicsElementSVGAttributes<T>, ShapeElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
        _rx?: StateOr<number | string>;
        _ry?: StateOr<number | string>;
    }

    interface SetSVGAttributes<T> extends CoreSVGAttributes<T>, StylableSVGAttributes, AnimationTimingSVGAttributes {
    }

    interface StopSVGAttributes<T> extends CoreSVGAttributes<T>, StylableSVGAttributes, Pick<PresentationSVGAttributes, "_color" | "_stop-color" | "_stop-opacity"> {
        _offset?: StateOr<number | string>;
    }

    interface SvgSVGAttributes<T> extends ContainerElementSVGAttributes<T>, NewViewportSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, FitToViewBoxSVGAttributes, ZoomAndPanSVGAttributes, PresentationSVGAttributes {
        _version?: StateOr<string>;
        _baseProfile?: StateOr<string>;
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
        _contentScriptType?: StateOr<string>;
        _contentStyleType?: StateOr<string>;
        _xmlns?: StateOr<"http://www.w3.org/2000/svg" | string>;
    }

    interface SwitchSVGAttributes<T> extends ContainerElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_display" | "_visibility"> {
    }

    interface SymbolSVGAttributes<T> extends ContainerElementSVGAttributes<T>, NewViewportSVGAttributes<T>, ExternalResourceSVGAttributes, StylableSVGAttributes, FitToViewBoxSVGAttributes {
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
        _preserveAspectRatio?: StateOr<SVGPreserveAspectRatio>;
        _refX?: StateOr<number | string>;
        _refY?: StateOr<number | string>;
        _viewBox?: StateOr<string>;
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
    }

    interface TextSVGAttributes<T> extends TextContentElementSVGAttributes<T>, GraphicsElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes, Pick<PresentationSVGAttributes, "_writing-mode" | "_text-rendering"> {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _dx?: StateOr<number | string>;
        _dy?: StateOr<number | string>;
        _rotate?: StateOr<number | string>;
        _textLength?: StateOr<number | string>;
        _lengthAdjust?: StateOr<"spacing" | "spacingAndGlyphs">;
    }

    interface TextPathSVGAttributes<T> extends TextContentElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, Pick<PresentationSVGAttributes, "_alignment-baseline" | "_baseline-shift" | "_display" | "_visibility"> {
        _startOffset?: StateOr<number | string>;
        _method?: StateOr<"align" | "stretch">;
        _spacing?: StateOr<"auto" | "exact">;
        _href?: StateOr<string>;
    }

    interface TSpanSVGAttributes<T> extends TextContentElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, Pick<PresentationSVGAttributes, "_alignment-baseline" | "_baseline-shift" | "_display" | "_visibility"> {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _dx?: StateOr<number | string>;
        _dy?: StateOr<number | string>;
        _rotate?: StateOr<number | string>;
        _textLength?: StateOr<number | string>;
        _lengthAdjust?: StateOr<"spacing" | "spacingAndGlyphs">;
    }

    interface UseSVGAttributes<T> extends GraphicsElementSVGAttributes<T>, ConditionalProcessingSVGAttributes, ExternalResourceSVGAttributes, StylableSVGAttributes, TransformableSVGAttributes {
        _x?: StateOr<number | string>;
        _y?: StateOr<number | string>;
        _width?: StateOr<number | string>;
        _height?: StateOr<number | string>;
        _href?: StateOr<string>;
    }

    interface ViewSVGAttributes<T> extends CoreSVGAttributes<T>, ExternalResourceSVGAttributes, FitToViewBoxSVGAttributes, ZoomAndPanSVGAttributes {
        _viewTarget?: StateOr<string>;
    }

    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        accessKey?: StateOr<string>;
        className?: StateOr<string>;
        contenteditable?: StateOr<boolean | "plaintext-only" | "inherit">;
        contextmenu?: StateOr<string>;
        dir?: StateOr<HTMLDir>;
        draggable?: StateOr<boolean | "false" | "true">;
        hidden?: StateOr<boolean | "hidden" | "until-found">;
        id?: StateOr<string>;
        inert?: StateOr<boolean>;
        lang?: StateOr<string>;
        spellcheck?: StateOr<boolean>;
        style?: string;
        tabindex?: StateOr<number | string>;
        title?: StateOr<string>;
        translate?: StateOr<"yes" | "no">;
        about?: StateOr<string>;
        datatype?: StateOr<string>;
        inlist?: StateOr<any>;
        popover?: StateOr<boolean | "manual" | "auto">;
        prefix?: StateOr<string>;
        property?: StateOr<string>;
        resource?: StateOr<string>;
        typeof?: StateOr<string>;
        vocab?: StateOr<string>;
        autocapitalize?: StateOr<HTMLAutocapitalize>;
        slot?: StateOr<string>;
        color?: StateOr<string>;
        itemprop?: StateOr<string>;
        itemscope?: StateOr<boolean>;
        itemtype?: StateOr<string>;
        itemid?: StateOr<string>;
        itemref?: StateOr<string>;
        part?: StateOr<string>;
        exportparts?: StateOr<string>;
        inputmode?: StateOr<"none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search">;
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