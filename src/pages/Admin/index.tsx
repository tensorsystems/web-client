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
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { NavItem } from "../../components/NavItem";
import { BillingsAdmin } from "./billing";
import { DiagnosticProcedureTypePage } from "./diagnostic_procedure";
import { LookupsAdminPage } from "./lookups";
import { HpiPage } from "./hpi";
import { LabTypePage } from "./labratory";
import { SupplyPage } from "./SupplyAdminPage";
import { SurgicalProcedureTypesPage } from "./surgical_procedure";
import { TreatmentTypePage } from "./treatment";
import { UserAdminPage } from "./user";
import { PaymentWaiversPage } from "./PaymentWaiversPage";
import { gql, useQuery } from "@apollo/client";
import { Query } from "../../models/models";
import { PatientEncounterLimitPage } from "./PatientEncounterLimitPage";
import { PharmacyAdminPage } from "./pharmacy";
import { EyewearShopAdminPage } from "./eyewear_shop";
import { OrganizationDetails } from "./OrganizationDetails";

export const GET_NOTIFS = gql`
  query GetNotifs {
    notifs {
      paymentWaivers
    }
  }
`;

export const AdminHome: React.FC = () => {
  const match = useRouteMatch();

  return (
    <div className="flex space-x-3">
      <div className="flex-initial">
        <SideNav />
      </div>

      <div className="flex-1">
        <Switch>
          <Route path={`${match.path}/organization-details`}>
            <OrganizationDetails />
          </Route>
          <Route path={`${match.path}/user-admin`}>
            <UserAdminPage />
          </Route>
          <Route path={`${match.path}/payment-waiver`}>
            <PaymentWaiversPage />
          </Route>
          <Route path={`${match.path}/patient-encounter-limit`}>
            <PatientEncounterLimitPage />
          </Route>
          <Route path={`${match.path}/billings`}>
            <BillingsAdmin />
          </Route>
          <Route path={`${match.path}/hpi`}>
            <HpiPage />
          </Route>
          <Route path={`${match.path}/diagnostic-procedures`}>
            <DiagnosticProcedureTypePage />
          </Route>
          <Route path={`${match.path}/surgical-procedures`}>
            <SurgicalProcedureTypesPage />
          </Route>
          <Route path={`${match.path}/treatment-types`}>
            <TreatmentTypePage />
          </Route>
          <Route path={`${match.path}/labratory-types`}>
            <LabTypePage />
          </Route>
          <Route path={`${match.path}/supplies`}>
            <SupplyPage />
          </Route>
          <Route path={`${match.path}/pharmacies`}>
            <PharmacyAdminPage />
          </Route>
          <Route path={`${match.path}/eyewear-shops`}>
            <EyewearShopAdminPage />
          </Route>
          <Route path={`${match.path}/lookups`}>
            <LookupsAdminPage />
          </Route>
          <Route path={`${match.path}`}>
            <Redirect to={`${match.path}/organization-details`} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const SideNav: React.FC = () => {
  const { data } = useQuery<Query>(GET_NOTIFS);

  return (
    <div className="bg-white rounded-lg py-2 px-4 shadow-lg">
      <NavItem
        route="organization-details"
        label="Organization Details"
        icon="business"
        completed={false}
        subItem={false}
      />

      <NavItem
        route="lookups"
        label="Lookups"
        icon="list_alt"
        completed={false}
        subItem={false}
      />

      <NavItem
        route="user-admin"
        label="Users"
        icon="people"
        completed={false}
        subItem={false}
      />

      <NavItem
        route="payment-waiver"
        label="Payment waivers"
        icon="money_off"
        completed={false}
        subItem={false}
        notifs={data?.notifs.paymentWaivers}
      />

      <NavItem
        route="patient-encounter-limit"
        label="Patient Encounter Limit"
        icon="money"
        completed={false}
        subItem={false}
      />

      <NavItem
        route="billings"
        label="Billings"
        icon="credit_card"
        completed={false}
        subItem={false}
      />

      <NavItem
        route="hpi"
        label="HPI"
        icon="format_list_numbered"
        completed={false}
        subItem={false}
      />
      <NavItem
        route="diagnostic-procedures"
        label="Diagnostic Procedures"
        icon="airline_seat_recline_normal"
        completed={false}
        subItem={false}
      />
      <NavItem
        route="surgical-procedures"
        label="Surgical Procedures"
        icon="airline_seat_flat"
        completed={false}
        subItem={false}
      />
      <NavItem
        route="treatment-types"
        label="Treatments"
        icon="healing"
        completed={false}
        subItem={false}
      />
      <NavItem
        route="labratory-types"
        label="Labratory"
        icon="biotech"
        completed={false}
        subItem={false}
      />
      <NavItem
        route="supplies"
        label="Supplies"
        icon="inventory"
        completed={false}
        subItem={false}
      />

      <NavItem
        route="pharmacies"
        label="Pharmacies"
        icon="local_pharmacy"
        completed={false}
        subItem={false}
      />
      <NavItem
        route="eyewear-shops"
        label="Eyewear Shops"
        icon="visibility"
        completed={false}
        subItem={false}
      />
    </div>
  );
};
