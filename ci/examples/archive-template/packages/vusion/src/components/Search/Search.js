import React, { Component } from "react";
import classNames from "classnames";
import { Search as Icon, Close } from "@carbon/icons-react";

// import { default as settings } from "./../../settings/Configuration.js";

const prefix = "cds"; // settings.Prefix;

export default class Search extends Component {
    static defaultProps = {
        type: "text",
        placeholder: "",
        closeButtonLabelText: "Clear search input",
        onChange: () => {},
        onClear: () => {}
    };

    state = {
        hasContent: this.props.value || this.props.defaultValue || false,
        prevValue: this.props.value
    };

    static getDerivedStateFromProps({ value }, state) {
        const { prevValue } = state;
        return prevValue === value
            ? null
            : {
                hasContent: !!value,
                prevValue: value
            };
    }

    clearInput = (evt) => {
        if ( !this.props.value ) {
            this.input.value = "";
            this.props.onChange(evt);
        } else {
            const clearedEvt = Object.assign({}, evt.target, {
                target: {
                    value: ""
                }
            });
            this.props.onChange(clearedEvt);
        }

        this.props.onClear();

        this.setState({ hasContent: false }, () => this.input.focus());
    };

    handleChange = (evt) => {
        this.setState({
            hasContent: evt.target.value !== ""
        });
    };

    //    handleKeyDown = (evt) => {
    //        if ( match(evt, keys.Escape) ) {
    //            this.clearInput(evt);
    //        }
    //    };

    render() {
        const {
            className,
            type,
            id = (this._inputId =
                this._inputId ||
                `search__input__id_${ Math.random().toString(36).substr(2) }`),
            placeHolderText,
            placeholder,
            labelText,
            closeButtonLabelText,
            small,
            size = !small ? "xl" : "sm",
            light,
            disabled,
            onChange,
            onKeyDown,
            renderIcon,
            onClear, // eslint-disable-line no-unused-vars
            ... other
        } = this.props;

        const { hasContent } = this.state;

        const searchClasses = classNames({
            [`${ prefix }--search`]: true,
            [`${ prefix }--search--sm`]: size === "sm",
            [`${ prefix }--search--lg`]: size === "lg",
            [`${ prefix }--search--xl`]: size === "xl",
            [`${ prefix }--search--light`]: light,
            [`${ prefix }--search--disabled`]: disabled,
            [className]: className
        });

        const clearClasses = classNames({
            [`${ prefix }--search-close`]: true,
            [`${ prefix }--search-close--hidden`]: !hasContent
        });

        let customIcon;
        if ( renderIcon ) {
            customIcon = React.cloneElement(renderIcon, {
                className: `${ prefix }--search-magnifier-icon`
            });
        }

        const searchId = `${ id }-search`;
        const searchIcon = renderIcon ? (
            customIcon
        ) : (
            <Icon className={ `${ prefix }--search-magnifier-icon` }/>
        );

        return (
            <div role="search" aria-labelledby={ searchId } className={ searchClasses }>
                <div
                    className={ `${ prefix }--search-magnifier` }
                    ref={ (magnifier) => {
                        this.magnifier = magnifier;
                    } }>
                    { searchIcon }
                </div>
                <label id={ searchId } htmlFor={ id } className={ `${ prefix }--label` }>
                    { labelText }
                </label>
                <input
                    role="searchbox"
                    autoComplete="off"
                    { ... other }
                    type={ type }
                    disabled={ disabled }
                    className={ `${ prefix }--search-input` }
                    id={ id }
                    placeholder={ placeHolderText || placeholder }
                    onChange={ (event) => console.log(event) }
                    onKeyDown={ (event) => console.log(event) }
                    ref={ (input) => {
                        this.input = input;
                    } }
                />
                <button
                    className={ clearClasses }
                    disabled={ disabled }
                    onClick={ this.clearInput }
                    type="button"
                    aria-label={ closeButtonLabelText }>
                    <Close/>
                </button>
            </div>
        );
    }
}