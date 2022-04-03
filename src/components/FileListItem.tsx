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
import { FileViewer } from "./FileViewer";

interface Props {
  url: string | undefined;
  name: string | undefined;
  type: string | undefined;
}

export const FileListItem: React.FC<Props> = ({ url, name, type }) => {
  const [fileViewer, setFileViewer] = useState<any>({
    isOpen: false,
  });

  let contentType = "image";

  if (type?.startsWith("image")) {
    contentType = "image";
  } else {
    contentType = "document";
  }

  const handlePreviewClick = () => {
    setFileViewer({
      isOpen: true,
      src: url,
      type: contentType,
      meta: {
        name: name,
        type: type,
        lastModifiedDate: new Date(),
      },
    });
  };

  return (
    <div className="flex p-3 rounded-md">
      <div className="mt-1 flex justify-between">
        <div className="flex space-x-4">
          <img
            className="rounded-lg h-16 w-16 object-cover shadow-xl cursor-pointer transform hover:scale-110"
            src={url}
            onClick={() => handlePreviewClick()}
          />

          <div>
            <p className="font-semibold w-full max-w-full text-sm">{name}</p>
            <p className="text-sm text-gray-500">{type}</p>
          </div>
        </div>
      </div>
      <FileViewer
        isOpen={fileViewer.isOpen}
        src={fileViewer.src}
        meta={fileViewer.meta}
        onClose={() => setFileViewer({ isOpen: false })}
      />
    </div>
  );
};
