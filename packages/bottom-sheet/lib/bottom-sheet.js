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
var BottomSheetStateContext = React.createContext(undefined);
var BottomSheetDispatchContext = React.createContext(undefined);
function reducer(state, action) {
    switch (action.type) {
        case "show": {
            return {
                showBottomSheet: true,
                snapPoint: action.snapPoint,
                BottomSheetChildren: action.children,
            };
        }
        case "hide": {
            return {
                showBottomSheet: false,
                snapPoint: 0,
                BottomSheetChildren: undefined,
            };
        }
        default:
            return state;
    }
}
function BottomSheetProvider(_a) {
    var children = _a.children;
    var _b = React.useReducer(reducer, {
        showBottomSheet: false,
        snapPoint: 0,
        BottomSheetChildren: undefined,
    }), state = _b[0], dispatch = _b[1];
    return (_jsx(BottomSheetStateContext.Provider, __assign({ value: state }, { children: _jsx(BottomSheetDispatchContext.Provider, __assign({ value: dispatch }, { children: children })) })));
}
function useBottonSheetState() {
    var context = React.useContext(BottomSheetStateContext);
    if (context === undefined) {
        throw new Error("useBottonSheetState must be used within a BottomSheetProvider");
    }
    return context;
}
function useBottomSheetDispatch() {
    var context = React.useContext(BottomSheetDispatchContext);
    if (context === undefined) {
        throw new Error("useBottomSheetDispatch must be used within a NotificationProvider");
    }
    return context;
}
export { BottomSheetProvider, useBottonSheetState, useBottomSheetDispatch };
