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

import React, { useState } from "react";
import classNames from "classnames";

interface Props {
  tabs: Array<string>;
  onSelect: (index: number) => void;
}

export const Sidenav: React.FC<Props> = ({ tabs, onSelect }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="bg-white w-60 rounded-lg pt-2 pb-2 pl-3 pr-3">
      {tabs.map((e, i) => (
        <div
          key={i}
          className={classNames("p-3 rounded-md", {
            "bg-gray-100": selected === i,
          })}
        >
          <button
            className={classNames(
              "font-medium font-sans w-full text-left focus:outline-none",
              {
                "text-gray-800": selected === i,
                "text-gray-600": selected !== i,
              }
            )}
            onClick={() => {
              setSelected(i);
              onSelect(i);
            }}
          >
            {e}
          </button>
        </div>
      ))}
    </div>
  );
};
