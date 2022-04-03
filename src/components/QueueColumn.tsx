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

import {
  Draggable,
  DraggableId,
  DraggableLocation,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import classnames from "classnames";
import QueueList from "./QueueList";

interface Props {
  title: string;
  quotes: Quote[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
}

const QueueColumn: React.FC<Props> = ({
  title,
  quotes,
  index,
  isScrollable,
  isCombineEnabled,
  useClone,
}) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className="m-2 flex column flex-col"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div
            className={classnames(
              "flex items-center justify-center rounded-t-md transition-colors duration-200 ease-in hover:bg-teal-100",
              {
                "bg-teal-100": snapshot.isDragging,
                "bg-gray-100": !snapshot.isDragging,
              }
            )}
          >
            <h4
              aria-label={`${title} list`}
              className="p-2 transition-colors ease-in duration-200 flex-grow select-none relative focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-offset-1"
            >
              {title}
            </h4>
            <QueueList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? "bg-teal-100" : null,
              }}
              quotes={quotes}
              internalScroll={isScrollable}
              isCombineEnabled={Boolean(isCombineEnabled)}
              useClone={Boolean(useClone)}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default QueueColumn;

export type Id = string;

export type AuthorColors = {
  soft: string;
  hard: string;
};

export type Author = {
  id: Id;
  name: string;
  avatarUrl: string;
  url: string;
  colors: AuthorColors;
};

export type Quote = {
  id: Id;
  content: string;
  author: Author;
};

export type Dragging = {
  id: DraggableId;
  location: DraggableLocation;
};

export type QuoteMap = {
  [key: string]: Quote[];
};

export type Task = {
  id: Id;
  content: string;
};
