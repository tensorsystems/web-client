import _ from "lodash";
import React from "react";
interface Props {
  register: any;
  locked: boolean;
  handleChanges: (value: any) => void;
}

const PreOpForm: React.FC<Props> = ({ register, handleChanges, locked }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-16 gap-y-7 mt-5">
        <div className="col-span-1"></div>
        <div className="col-span-1 text-center">OD</div>
        <div className="col-span-1 text-center">OS</div>

        <div className="col-span-1">
          <p className="text-gray-600 tracking-wide">Corrected</p>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="rightCorrected"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="leftCorrected"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <p className="text-gray-600 tracking-wide">IOP</p>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="rightIop"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="leftIop"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <p className="text-gray-600 tracking-wide">Anterior Segment</p>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="rightAnteriorSegment"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="leftAnteriorSegment"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <p className="text-gray-600 tracking-wide">Posterior Segment</p>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="rightPosteriorSegment"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="leftPosteriorSegment"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <p className="text-gray-600 tracking-wide">Biometry</p>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="rightBiometry"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>

        <div className="col-span-1">
          <input
            type="text"
            name="leftBiometry"
            ref={register}
            onChange={handleChanges}
            disabled={locked}
            className="p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full"
          />
        </div>
      </div>

      <div className="text-2xl text-gray-600 font-semibold mt-8">
        System check
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="bloodPressure"
          placeholder="Blood pressure"
          ref={register}
          onChange={handleChanges}
          disabled={locked}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="bloodSugar"
          placeholder="Blood sugar"
          ref={register}
          onChange={handleChanges}
          disabled={locked}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="uriAnalysis"
          placeholder="Uri analysis"
          ref={register}
          onChange={handleChanges}
          disabled={locked}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>

      <div className="text-2xl text-gray-600 font-semibold mt-8">
        Systemic Illnesses
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="diabetes"
          placeholder="Diabetes"
          ref={register}
          onChange={handleChanges}
          disabled={locked}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="asthma"
          placeholder="Asthma"
          ref={register}
          onChange={handleChanges}
          disabled={locked}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="hpn"
          placeholder="HPN"
          ref={register}
          onChange={handleChanges}
          disabled={locked}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="cardiacDisease"
          placeholder="Cardiac disease"
          ref={register}
          onChange={handleChanges}
          disabled={locked}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          ref={register}
          onChange={handleChanges}
          disabled={locked}
          className="mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md"
        />
      </div>
    </div>
  );
};

export default PreOpForm;