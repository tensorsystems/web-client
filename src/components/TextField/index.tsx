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

interface Props {
  id: string;
  name: string;
  type: string;
  formref: string | ((instance: HTMLInputElement | null) => void) | null | undefined;
}

export const TextField: React.FC<Props> = ({ id, name, type, formref }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      ref={formref}
      className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
    />
  );
};
