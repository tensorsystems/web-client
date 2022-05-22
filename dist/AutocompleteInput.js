import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./AutcompleteInput.css";
import classnames from "classnames";
import { useWatch } from "react-hook-form";
export default function AutocompleteInput(props) {
    const { name, field, type, register, uri, control, disabled, setFormValue, onInputChange, } = props;
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const userInput = useWatch({
        control,
        name: name,
        defaultValue: "",
    });
    useEffect(() => {
        onInputChange && onInputChange();
        if (userInput && userInput.length > 0) {
            const payload = {
                suggest: {
                    autocomplete: {
                        prefix: userInput,
                        completion: {
                            field: field,
                            skip_duplicates: true,
                        },
                    },
                },
            };
            fetch(`${process.env.REACT_APP_ELASTICSEARCH_URL}/${uri}/_search?size=5`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((res) => res.json())
                .then((data) => {
                const autocomplete = data.suggest.autocomplete.find((e) => e.text === userInput);
                if (autocomplete) {
                    const suggestions = autocomplete.options.map((e) => e.text);
                    setSuggestions(suggestions);
                }
            })
                .catch((error) => {
                console.log(error);
            });
        }
    }, [userInput]);
    const onChange = (e) => {
        const filteredSuggestions = suggestions.filter((suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        onInputChange && onInputChange();
    };
    const onClick = (e) => {
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setFormValue(name, e.currentTarget.innerText);
    };
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setFormValue(name, filteredSuggestions[activeSuggestion]);
        }
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        }
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    };
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (_jsx("ul", Object.assign({ className: "mt-1 max-h-36 overflow-y-auto pl-0 border rounded-md rounded-t-none shadow-lg absolute w-full z-20" }, { children: filteredSuggestions.map((suggestion, index) => {
                    return (_jsx("li", Object.assign({ className: classnames("py-2 pl-3 cursor-pointer ", {
                            "bg-gray-100 text-gray-600 ": index === activeSuggestion,
                            "hover:bg-gray-200 bg-white": index !== activeSuggestion,
                        }), onClick: onClick }, { children: suggestion }), suggestion));
                }) }), void 0));
        }
        else {
            suggestionsListComponent = _jsx("div", {}, void 0);
        }
    }
    return (_jsxs("div", Object.assign({ className: "relative" }, { children: [_jsx("input", { type: type, name: name, onKeyDown: onKeyDown, ref: register, onChange: onChange, autoComplete: "off", disabled: disabled, className: "border-gray-300 rounded-lg shadow-sm w-full h-8" }, void 0), suggestionsListComponent] }), void 0));
}
