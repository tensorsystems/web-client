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

import React, { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { parseJwt } from "../../util";
import { PatientDetailsPage } from "./PatientDetailsPage";
import { PatientsPage } from "./PatientsPage";

export const PatientPage: React.FC<{
  onUpdateTab: (page: any) => void;
  onAddPage: (page: any) => void;
}> = ({ onUpdateTab, onAddPage }) => {
  const match = useRouteMatch();
  const [userType, setUserType] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token !== null) {
      const claim = parseJwt(token);
      setUserType(claim.UserType);
    }
  }, []);

  return (
    <Switch>
      <Route path={`${match.path}/:patientId`}>
        <PatientDetails
          userType={userType}
          onUpdateTab={onUpdateTab}
          onAddPage={onAddPage}
        />
      </Route>
      <Route path={match.path}>
        <PatientsPage onAddPage={onAddPage} />
      </Route>
    </Switch>
  );
};

const PatientDetails: React.FC<{
  userType: string;
  onUpdateTab: (page: any) => void;
  onAddPage: (page: any) => void;
}> = ({ onUpdateTab, onAddPage }) => {
  const { patientId } = useParams<{ patientId: string }>();
  return (
    <PatientDetailsPage
      patientId={patientId}
      onUpdateTab={onUpdateTab}
      onAddPage={onAddPage}
    />
  );
};
