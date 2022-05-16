//import { Terminal as X } from "xterm";
//
//import React, { Validator } from "react";
//import PropTypes            from "prop-types";
//
//const po_data = { };
//function gettext(context?: string, string?: string) {
//    /* Missing first parameter */
//    if (arguments.length == 1) {
//        string = context;
//        context = undefined;
//    }
//
//    var key = context ? context + '\u0004' + string : string;
//    if (po_data) {
//        var translated = po_data[key];
//        if (translated && translated[1])
//            return translated[1];
//    }
//    return string;
//};
//
//const _ = gettext;
//
///*
// * A context menu component that contains copy and paste fields.
// *
// * It requires three properties:
// *  - getText, method which is called when copy is clicked
// *  - setText, method which is called when paste is clicked
// *  - parentId, area in which it listens to left button clicks
// */
//export class ContextMenu extends React.Component {
//    constructor(props) {
//        super(props);
//
//        this.state = { visible: false };
//        this._handleContextMenu = this._handleContextMenu.bind(this);
//        this._handleClick = this._handleClick.bind(this);
//    }
//
//    componentDidMount() {
//        //@ts-ignore
//        const parent = document.getElementById(this.props.parentId);
//        parent.addEventListener('contextmenu', this._handleContextMenu);
//        document.addEventListener('click', this._handleClick);
//    }
//
//    componentWillUnmount() {
//        //@ts-ignore
//        const parent = document.getElementById(this.props.parentId);
//        parent.removeEventListener('contextmenu', this._handleContextMenu);
//        document.removeEventListener('click', this._handleClick);
//    }
//
//    _handleContextMenu(event) {
//        event.preventDefault();
//
//        this.setState({ visible: true });
//
//        const clickX = event.clientX;
//        const clickY = event.clientY;
//        const screenW = window.innerWidth;
//        const screenH = window.innerHeight;
//        //@ts-ignore
//        const rootW = this.root.offsetWidth;
//        //@ts-ignore
//        const rootH = this.root.offsetHeight;
//
//        const right = (screenW - clickX) > rootW;
//        const left = !right;
//        const top = (screenH - clickY) > rootH;
//        const bottom = !top;
//
//        if (right) {
//            //@ts-ignore
//            this.root.style.left = `${clickX + 5}px`;
//        }
//
//        if (left) {
//            //@ts-ignore
//            this.root.style.left = `${clickX - rootW - 5}px`;
//        }
//
//        if (top) {
//            //@ts-ignore
//            this.root.style.top = `${clickY + 5}px`;
//        }
//
//        if (bottom) {
//            //@ts-ignore
//            this.root.style.top = `${clickY - rootH - 5}px`;
//        }
//    }
//
//    _handleClick(event) {
//        if (event && event.button === 0) {
//            //@ts-ignore
//            const wasOutside = !(event.target.contains === this.root);
//
//            //@ts-ignore
//            if (wasOutside && this.state.visible)
//                this.setState({ visible: false });
//        }
//    }
//
//    render() {
//        //@ts-ignore
//        return this.state.visible &&
//            //@ts-ignore
//            <div ref={ ref => { this.root = ref } } className="contextMenu">
//
//                <button className="contextMenuOption" onClick={
//                    //@ts-ignore
//                    this.props.getText
//                }>
//                    <div className="contextMenuName"> { _("Copy") } </div>
//                    <div className="contextMenuShortcut">{ _("Ctrl+Insert") }</div>
//                </button>
//                <button className="contextMenuOption" onClick={
//                    //@ts-ignore
//                    this.props.setText
//                }>
//                    <div className="contextMenuName"> { _("Paste") } </div>
//                    <div className="contextMenuShortcut">{ _("Shift+Insert") }</div>
//                </button>
//            </div>;
//    }
//}
//
////@ts-ignore
//ContextMenu.propTypes = {
//    getText: PropTypes.func.isRequired,
//    setText: PropTypes.func.isRequired,
//    parentId: PropTypes.string.isRequired
//};
//
//import "./console.css";
//
//const theme_core = {
//    yellow: "#b58900",
//    brightRed: "#cb4b16",
//    red: "#dc322f",
//    magenta: "#d33682",
//    brightMagenta: "#6c71c4",
//    blue: "#268bd2",
//    cyan: "#2aa198",
//    green: "#859900"
//};
//
//const themes = {
//    "black-theme": {
//        background: "#000000",
//        foreground: "#ffffff"
//    },
//    "dark-theme": Object.assign({}, theme_core, {
//        background: "#002b36",
//        foreground: "#fdf6e3",
//        cursor: "#eee8d5",
//        selection: "#ffffff77",
//        brightBlack: "#002b36",
//        black: "#073642",
//        brightGreen: "#586e75",
//        brightYellow: "#657b83",
//        brightBlue: "#839496",
//        brightCyan: "#93a1a1",
//        white: "#eee8d5",
//        brightWhite: "#fdf6e3"
//    }),
//    "light-theme": Object.assign({}, theme_core, {
//        background: "#fdf6e3",
//        foreground: "#002b36",
//        cursor: "#073642",
//        selection: "#00000044",
//        brightWhite: "#002b36",
//        white: "#073642",
//        brightCyan: "#586e75",
//        brightBlue: "#657b83",
//        brightYellow: "#839496",
//        brightGreen: "#93a1a1",
//        black: "#eee8d5",
//        brightBlack: "#fdf6e3"
//    }),
//    "white-theme": {
//        background: "#ffffff",
//        foreground: "#000000",
//        selection: "#00000044",
//        cursor: "#000000",
//    },
//};
//
///*
// * A terminal component that communicates over a cockpit channel.
// *
// * The only required property is 'channel', which must point to a cockpit
// * stream channel.
// *
// * The size of the terminal can be set with the 'rows' and 'cols'
// * properties. If those properties are not given, the terminal will fill
// * its container.
// *
// * If the 'onTitleChanged' callback property is set, it will be called whenever
// * the title of the terminal changes.
// *
// * Call focus() to set the input focus on the terminal.
// *
// * Also it is possible to set up theme by property 'theme'.
// */
//export class Terminal extends React.Component {
//    tty: X;
//    terminal: React.RefObject<any>;
//    contextMenu: any;
//
////    declare props;
////    declare state;
////    declare static propTypes;
//
//    constructor(props) {
//        super(props);
//
//        this.onChannelMessage = this.onChannelMessage.bind(this);
//        this.onChannelClose = this.onChannelClose.bind(this);
//        this.connectChannel = this.connectChannel.bind(this);
//        this.disconnectChannel = this.disconnectChannel.bind(this);
//        this.reset = this.reset.bind(this);
//        this.focus = this.focus.bind(this);
//        this.onWindowResize = this.onWindowResize.bind(this);
//        this.resizeTerminal = this.resizeTerminal.bind(this);
//        this.onFocusIn = this.onFocusIn.bind(this);
//        this.onFocusOut = this.onFocusOut.bind(this);
//        this.setText = this.setText.bind(this);
//        this.getText = this.getText.bind(this);
//        this.setTerminalTheme = this.setTerminalTheme.bind(this);
//
//        const term = new X({
//            cols: props.cols || 80,
//            rows: props.rows || 25,
//            cursorBlink: true,
//            fontSize: props.fontSize || 16,
//            fontFamily: 'Menlo, Monaco, Consolas, monospace',
//            screenReaderMode: true
//        });
//
//        this.tty = term;
//        this.terminal = React.createRef();
//
//        term.onData(function(data) {
//            if (this.props.channel.valid) this.props.channel.send(data);
//        }.bind(this));
//
//        if (props.onTitleChanged) term.onTitleChange(props.onTitleChanged);
//
//        this.state = { terminal: term };
//    }
//
//    componentDidMount() {
//        //@ts-ignore
//        this.state.terminal.open(this.terminal.current);
//        this.connectChannel();
//
//        //@ts-ignore
//        if (!this.props.rows) {
//            window.addEventListener('resize', this.onWindowResize);
//            this.onWindowResize();
//        }
//        //@ts-ignore
//        this.setTerminalTheme(this.props.theme || 'black-theme');
//        //@ts-ignore
//        this.state.terminal.focus();
//    }
//
//    resizeTerminal(cols, rows) {
//        //@ts-ignore
//        this.state.terminal.resize(cols, rows);
//        //@ts-ignore
//        this.props.channel.control({
//            window: {
//                rows: rows,
//                cols: cols
//            }
//        });
//    }
//
//    componentDidUpdate(prevProps, prevState) {
//        //@ts-ignore
//        if (prevProps.fontSize !== this.props.fontSize) {
//            //@ts-ignore
//            this.state.terminal.setOption("fontSize", this.props.fontSize);
//
//            // After font size is changed, resize needs to be triggered
//            const dimensions = this.calculateDimensions();
//            //@ts-ignore
//            if (dimensions.cols !== this.state.cols || dimensions.rows !== this.state.rows) {
//                this.onWindowResize();
//            } else {
//                // When font size changes but dimensions are the same, we need to force `resize`
//                this.resizeTerminal(dimensions.cols - 1, dimensions.rows);
//            }
//        }
//
//        //@ts-ignore
//        if (prevState.cols !== this.state.cols || prevState.rows !== this.state.rows)
//            //@ts-ignore
//            this.resizeTerminal(this.state.cols, this.state.rows);
//
//        //@ts-ignore
//        if (prevProps.theme !== this.props.theme)
//            //@ts-ignore
//            this.setTerminalTheme(this.props.theme);
//
//        //@ts-ignore
//        if (prevProps.channel !== this.props.channel) {
//            //@ts-ignore
//            this.state.terminal.reset();
//            this.disconnectChannel(prevProps.channel);
//            this.connectChannel();
//            //@ts-ignore
//            this.props.channel.control({
//                window: {
//                    //@ts-ignore
//                    rows: this.state.rows,
//                    //@ts-ignore
//                    cols: this.state.cols
//                }
//            });
//        }
//
//        //@ts-ignore
//        this.state.terminal.focus();
//    }
//
//    render() {
//        return (
//            <>
//                <div ref={this.terminal}
//                    //@ts-ignore
//                     key={this.state.terminal.element.id}
//                     className="console-ct"
//                     onFocus={this.onFocusIn}
//                     onContextMenu={this.contextMenu}
//                     onBlur={this.onFocusOut} />
//                {/* @ts-ignore */}
//                <ContextMenu parentId={
//                    //@ts-ignore
//                    this.props.parentId
//                } setText={this.setText} getText={this.getText} />
//            </>
//        );
//    }
//
//    componentWillUnmount() {
//        this.disconnectChannel();
//        //@ts-ignore
//        this.state.terminal.dispose();
//        window.removeEventListener('resize', this.onWindowResize);
//        this.onFocusOut();
//    }
//
//    setText() {
//        try {
//            navigator.clipboard.readText()
//                //@ts-ignore
//                .then(text => this.props.channel.send(text))
//                .catch(e => this.setState({ showPastingModal: true }))
//                //@ts-ignore
//                .finally(() => this.state.terminal.focus());
//        } catch (error) {
//            this.setState({ showPastingModal: true });
//        }
//    }
//
//    getText() {
//        try {
//            //@ts-ignore
//            navigator.clipboard.writeText(this.state.terminal.getSelection())
//                .catch(e => console.error('Text could not be copied, use Ctrl+Insert ', e ? e.toString() : ""))
//                //@ts-ignore
//                .finally(() => this.state.terminal.focus());
//        } catch (error) {
//            console.error('Text could not be copied, use Ctrl+Insert:', error.toString());
//        }
//    }
//
//    onChannelMessage(event, data) {
//        //@ts-ignore
//        this.state.terminal.write(data);
//    }
//
//    onChannelClose(event, options) {
//        //@ts-ignore
//        const term = this.state.terminal;
//        term.write('\x1b[31m' + (options.problem || 'disconnected') + '\x1b[m\r\n');
//        term.cursorHidden = true;
//        term.refresh(term.rows, term.rows);
//    }
//
//    connectChannel() {
//        //@ts-ignore
//        const channel = this.props.channel;
//        if (channel && channel.valid) {
//            channel.addEventListener('message', this.onChannelMessage.bind(this));
//            channel.addEventListener('close', this.onChannelClose.bind(this));
//        }
//    }
//
//    disconnectChannel(channel?) {
//        if (channel === undefined)
//            //@ts-ignore
//            channel = this.props.channel;
//        if (channel) {
//            channel.removeEventListener('message', this.onChannelMessage);
//            channel.removeEventListener('close', this.onChannelClose);
//        }
//        channel.close();
//    }
//
//    reset() {
//        //@ts-ignore
//        this.state.terminal.reset();
//        //@ts-ignore
//        this.props.channel.send(String.fromCharCode(12)); // Send SIGWINCH to show prompt on attaching
//    }
//
//    focus() {
//        //@ts-ignore
//        if (this.state.terminal)
//            //@ts-ignore
//            this.state.terminal.focus();
//    }
//
//    calculateDimensions() {
//        const padding = 10; // Leave a bit of space around terminal
//        //@ts-ignore
//        const realHeight = this.state.terminal._core._renderService.dimensions.actualCellHeight;
//        //@ts-ignore
//        const realWidth = this.state.terminal._core._renderService.dimensions.actualCellWidth;
//        if (realHeight && realWidth && realWidth !== 0 && realHeight !== 0)
//            return {
//                rows: Math.floor((this.terminal.current.parentElement.clientHeight - padding) / realHeight),
//                cols: Math.floor((this.terminal.current.parentElement.clientWidth - padding - 12) / realWidth) // Remove 12px for scrollbar
//            };
//
//        //@ts-ignore
//        return { rows: this.state.rows, cols: this.state.cols };
//    }
//
//    onWindowResize() {
//        this.setState(this.calculateDimensions());
//    }
//
//    setTerminalTheme(theme) {
//        //@ts-ignore
//        this.state.terminal.setOption("theme", themes[theme]);
//    }
//
//    onBeforeUnload(event) {
//        // Firefox requires this when the template is in an iframe
//        event.preventDefault();
//
//        // see "an almost cross-browser solution" at
//        // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
//        event.returnValue = '';
//        return '';
//    }
//
//    onFocusIn() {
//        window.addEventListener('beforeunload', this.onBeforeUnload);
//    }
//
//    onFocusOut() {
//        window.removeEventListener('beforeunload', this.onBeforeUnload);
//    }
//}
//
////@ts-ignore
//Terminal.propTypes = {
//    cols: PropTypes.number,
//    rows: PropTypes.number,
//    channel: PropTypes.object.isRequired,
//    onTitleChanged: PropTypes.func,
//    theme: PropTypes.string,
//    parentId: PropTypes.string.isRequired
//};
//
//export default Terminal;
