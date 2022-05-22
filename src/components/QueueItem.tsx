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
import { DraggableProvided } from "react-beautiful-dnd";
import { Quote, AuthorColors } from "../models/queue";

interface Props {
  quote: Quote;
  isDragging: boolean;
  provided: DraggableProvided;
  isClone?: boolean;
  isGroupedOver?: boolean;
  style?: Object;
  index?: number;
}

const getBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
  authorColors: AuthorColors
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return "bg-gray-100";
  }

  return "bg-gray-100";
};

const getBorderColor = (isDragging: boolean, authorColors: AuthorColors) =>
  isDragging ? authorColors.hard : "transparent";

const imageSize: number = 40;

const QueueItem: React.FC<Props> = ({
  quote,
  isDragging,
  isGroupedOver,
  provided,
  style,
  isClone,
  index,
}) => {
  return (
    <a
      href={quote.author.url}
      className={`rounded-md border-2 border-transparent`}
    >
      Avatar here
      <div className="flex flex-grow flex-col">
        {quote.content}
        <div className="flex mt-2 items-center">
          <div>{quote.author.name}</div>
          <div>id:{quote.id}</div>
        </div>
      </div>
    </a>
  );
};

export default QueueItem;
