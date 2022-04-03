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
import { FileUploader } from "./FileUploaderComponent";
import { SizeMe } from "react-sizeme";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

interface Props {
  files: Array<FileUploader>;
}

export const PrintAttachments: React.FC<Props> = ({ files }) => {
  return (
    <div>
      {files.map((file, index) => {
        if (file.contentType?.startsWith("image")) {
          return (
            <div>
              <p className="my-5">{file.title}</p>
              <img
                className="w-full h-auto object-cover"
                src={
                  file.fileObject !== undefined
                    ? URL.createObjectURL(file.fileObject)
                    : file.fileUrl
                }
              />
              <div className="page-break" />
            </div>
          );
        }

        if (file.contentType?.startsWith("application/pdf")) {
          let pageNums = 0;

          const onDocumentLoadSuccess = (pdf: any) => {
            pageNums = pdf.numPages;
          };

          return (
            <div>
              <p className="my-5">{file.title}</p>
              <SizeMe>
                {({ size }) => (
                  <div className="flex-1 flex items-center justify-center mt-3">
                    <div className="relative">
                      <div>
                        <Document
                          file={file}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page width={size.width ?? 950} pageNumber={1} />
                        </Document>
                      </div>
                    </div>
                  </div>
                )}
              </SizeMe>
            </div>
          );
        }

        return <div />;
      })}
    </div>
  );
};
