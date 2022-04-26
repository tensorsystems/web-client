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
  register: any;
  onChange: () => void;
}

const AutoRefractionComponent: React.FC<Props> = ({ register, onChange }) => {
  return (
    <div className="grid grid-cols-7 gap-y-6 gap-x-5 justify-items-center">
      <div></div>
      <div>SPH</div>
      <div>CYL</div>
      <div>AXIS</div>
      <div>SPH</div>
      <div>SYL</div>
      <div>AXIS</div>

      <div>
        <p className="text-gray-600 tracking-wide pl-2 justify-self-center">
          Distance
        </p>
      </div>

      <div>
        <input
          type="text"
          name="rightDistanceSph"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftDistanceSph"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="rightDistanceAxis"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftDistanceAxis"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="rightDistanceCyl"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftDistanceCyl"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>

      <div>
        <p className="text-gray-600 tracking-wide pl-2">Near</p>
      </div>

      <div>
        <input
          type="text"
          name="rightNearSph"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftNearSph"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="rightNearCyl"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftNearCyl"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="rightNearAxis"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftNearAxis"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>

      <div>
        <p className="text-gray-600 tracking-wide pl-2 text-sm">Lens Meter</p>
      </div>

      <div>
        <input
          type="text"
          name="rightLensMeterSph"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftLensMeterSph"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="rightLensMeterAxis"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftLensMeterAxis"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="rightLensMeterCyl"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
      <div>
        <input
          type="text"
          name="leftLensMeterCyl"
          ref={register}
          className="border-gray-300 rounded-lg shadow-sm w-full"
        />
      </div>
    </div>
  );
};
