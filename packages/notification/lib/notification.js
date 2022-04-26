var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
/*
  Copyright 2021 Kidus Tiliksew

  This file is part of Tensor EMR.

  Tensor EMR is free software: you can redistribute it and/or modify
  it under the terms of the version 2 of GNU General Public License as published by
  the Free Software Foundation.

  Tensor EMR is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
import React from "react";
var NotificationStateContext = React.createContext(undefined);
var NotificationDispatchContext = React.createContext(undefined);
function reducer(state, action) {
    switch (action.type) {
        case "show": {
            return {
                showNotification: true,
                notifTitle: action.notifTitle,
                notifSubTitle: action.notifSubTitle,
                variant: action.variant,
            };
        }
        case "hide": {
            return {
                showNotification: false,
                notifTitle: "",
                notifSubTitle: "",
                variant: "",
            };
        }
        default:
            return state;
    }
}
function NotificationProvider(_a) {
    var children = _a.children;
    var _b = React.useReducer(reducer, {
        showNotification: false,
        notifTitle: "",
        notifSubTitle: "",
        variant: "",
    }), state = _b[0], dispatch = _b[1];
    React.useEffect(function () {
        if (state.showNotification === true) {
            var timer_1 = setTimeout(function () {
                dispatch({ type: "hide" });
            }, 6000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [state]);
    return (_jsx(NotificationStateContext.Provider, __assign({ value: state }, { children: _jsx(NotificationDispatchContext.Provider, __assign({ value: dispatch }, { children: children })) })));
}
function useNotificationState() {
    var context = React.useContext(NotificationStateContext);
    if (context === undefined) {
        throw new Error("useNotificationState must be used within a NotificationProvider");
    }
    return context;
}
function useNotificationDispatch() {
    var context = React.useContext(NotificationDispatchContext);
    if (context === undefined) {
        throw new Error("useNotificationDispatch must be used within a NotificationProvider");
    }
    return context;
}
export { NotificationProvider, useNotificationState, useNotificationDispatch };
