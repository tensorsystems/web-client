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
import { AppointmentContext } from "../_context/AppointmentContext";
import _ from "lodash";

interface IopProps {
  register: any;
  onChange: () => void;
}

export const IopForm: React.FC<IopProps> = ({ register, onChange }) => {
  const { patientChartLocked } = React.useContext<any>(AppointmentContext);

  return (
    <div className="grid grid-cols-5 gap-y-4 gap-x-6 justify-items-stretch">
      <div className="col-span-1 justify-self-center">
        <p className="text-gray-600 tracking-wide">Non-Contact</p>
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="rightNoncontact"
          ref={register}
          disabled={patientChartLocked[0]}
          className="border-gray-300 rounded-lg shadow-sm w-full h-9"
          onChange={onChange}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="leftNoncontact"
          ref={register}
          disabled={patientChartLocked[0]}
          className="border-gray-300 rounded-lg shadow-sm w-full h-9"
          onChange={onChange}
        />
      </div>

      <div className="col-span-1 justify-self-center">
        <p className="text-gray-600 tracking-wide">Applanation</p>
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="rightApplanation"
          ref={register}
          disabled={patientChartLocked[0]}
          className="border-gray-300 rounded-lg shadow-sm w-full h-9"
          onChange={onChange}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="leftApplanation"
          ref={register}
          disabled={patientChartLocked[0]}
          className="border-gray-300 rounded-lg shadow-sm w-full h-9"
          onChange={onChange}
        />
      </div>

      <div className="col-span-1 justify-self-center">
        <p className="text-gray-600 tracking-wide">Tonopen</p>
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="rightTonopen"
          ref={register}
          disabled={patientChartLocked[0]}
          className="border-gray-300 rounded-lg shadow-sm w-full h-9"
          onChange={onChange}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="leftTonopen"
          ref={register}
          disabled={patientChartLocked[0]}
          className="border-gray-300 rounded-lg shadow-sm w-full h-9"
          onChange={onChange}
        />
      </div>

      <div className="col-span-1 justify-self-center">
        <p className="text-gray-600 tracking-wide">Digital</p>
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="rightDigital"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full h-9"
          onChange={onChange}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="leftDigital"
          ref={register}
          disabled={patientChartLocked[0]}
          className="border-gray-300 rounded-lg shadow-sm w-full h-9"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
