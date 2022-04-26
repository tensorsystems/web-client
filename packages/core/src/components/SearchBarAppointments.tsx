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

import classnames from "classnames";
import { format, parseISO } from "date-fns";
import { Appointment } from "../models/models";

interface Props {
  currentDateTime: Date;
  appointments: Array<Appointment | undefined> | undefined;
}

export default function SearchBarAppointments(props: Props) {
  const { appointments, currentDateTime } = props;

  return (
    <table className="w-full table text-sm border-l border-teal-500">
      <tbody className="divide-y divide-gray-200">
        {appointments?.map((e) => (
          <tr key={e?.id}>
            <td className="px-4 py-3">{e?.visitType.title}</td>
            <td className="px-4 py-3">
              {format(parseISO(e?.checkInTime.split("T")[0]), "MMM d, y")}
            </td>
            <td className="px-4 py-3">{`Dr. ${e?.providerName}`}</td>
            <td className="px-4 py-3">
              <span
                className={classnames(
                  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                  {
                    "bg-yellow-100 text-yellow-800":
                      e?.appointmentStatus?.title === "Scheduled online" ||
                      "Scheduled",
                  },
                  {
                    "bg-green-100 text-green-800":
                      e?.appointmentStatus?.title === "Checked-In",
                  },
                  {
                    "bg-red-100 text-red-800":
                      e?.appointmentStatus?.title === "Checked-Out",
                  }
                )}
              >
                {e?.appointmentStatus?.title}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
