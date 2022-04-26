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
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import classnames from "classnames";

import "./index.css";

interface Props {
  title: string;
  content: any;
  preExpand?: boolean;
}

export default function MyAccordion({ title, content, preExpand }: Props) {
  const [expanded, setExpanded] = useState<boolean>(preExpand ? true : false);

  return (
    <div>
      <Accordion
        allowZeroExpanded
        className="shadow-md rounded-md"
        preExpanded={preExpand ? ["my-accordion"] : []}
        onChange={(value) => {
          if (value.indexOf("my-accordion") !== -1) {
            setExpanded(true);
          } else {
            setExpanded(false);
          }
        }}
      >
        <AccordionItem uuid="my-accordion">
          <AccordionItemHeading>
            <AccordionItemButton className="bg-gray-100 cursor-pointer p-4 w-full hover:bg-gray-200">
              <div className="flex space-x-3">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={classnames("h-6 w-6", {
                      "transform rotate-90": expanded,
                    })}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <p className="font-semibold">{title}</p>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{content}</AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
