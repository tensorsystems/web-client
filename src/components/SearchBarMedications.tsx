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

import { format, parseISO } from "date-fns";
import { MedicalPrescription } from "../models/models";

interface Props {
  medicalPrescriptions: Array<MedicalPrescription | undefined> | undefined;
}

export default function SearchBarMedications(props: Props) {
  const { medicalPrescriptions } = props;

  return (
    <table className="w-full table text-sm border-l border-teal-500">
      <tbody className="divide-y divide-gray-200">
        {medicalPrescriptions?.map((e) => (
          <tr key={e?.id}>
            <td className="px-4 py-3">{e?.medication}</td>
            <td className="px-4 py-3">{e?.sig}</td>
            <td className="px-4 py-3">
              {format(parseISO(e?.prescribedDate), "MMM d, y")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
