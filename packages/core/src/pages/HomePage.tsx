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

import React, { useState, useEffect } from "react";
import { Page } from "../models/page";
import { MainLayout } from "../layouts/main_layout";
import { HomeTabs } from "../components/HomeTabs";

import { useBottomSheetDispatch, useBottonSheetState } from "../bottomsheet";

// @ts-ignore
import Sheet from "react-modal-sheet";

import {
  matchPath,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

import { HomePages } from "../pages";
import { NewPatientPage } from "./NewPatientPage";
import { DiagnosticOrdersPage } from "./DiagnosticOrdersPage";
import { PatientPage } from "./Patient";
import { parseJwt } from "../util";
import { AppointmentPage } from "./Appointment";
import { SurgicalOrdersPage } from "./SurgicalOrdersPage";
import { TreatmentOrdersPage } from "./TreatmentOrdersPage";
import { LabOrdersPage } from "./LabOrdersPage";
import { ChatsPage } from "./ChatsPage";
import { AdminHome } from "./Admin/Admin";
import { UpdatePatientPage } from "./UpdatePatientPage";
import { Component404 } from "@tensoremr/components";
import { ReferralOrdersPage } from "./ReferralOrdersPage";
import ProfilePage from "./ProfilePage";
import { PharmacyHome } from "./PharmacyHome";
import { EyeShopHome } from "./EyeShopeHome";
import HomeReception from "./HomeReception";
import HomeClinician from "./HomeClinician";
import PatientQueuePage from "./PatientQueuePage";
import FollowUpOrdersPage from "./FollowUpOrdersPage";

export const HomePage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [pages, setPages] = useState<Array<Page>>([HomePages[0]]);
  const [activeTab, setActiveTab] = useState<string>("/");
  const [userType, setUserType] = useState<
    "Receptionist" | "Clinician" | "Pharmacist" | "Optical Assistant"
  >();

  const bottomSheetDispatch = useBottomSheetDispatch();
  const { showBottomSheet, snapPoint, BottomSheetChildren } =
    useBottonSheetState();

  const handlePageSelect = (route: string) => {
    const existingPage = pages.find((e) => e.route === route);
    let page = HomePages.find(
      (e) =>
        matchPath(route.charAt(0) === "/" ? route : `/${route}`, {
          path: e.route,
        })?.isExact ?? false
    );

    if (existingPage === undefined && page !== undefined) {
      const newPages = pages.concat(page);
      setPages(newPages);
    } else {
      if (page !== undefined) setActiveTab(page.route);
    }
  };

  const handlePageAdd = (page: Page) => {
    const existingPage = pages.find((e) => e.route === page.route);

    if (existingPage === undefined) {
      const newPages = pages.concat(page);
      setPages(newPages);
    } else {
      setActiveTab(page.route);
    }
  };

  const handleTabOpen = (route: string) => {
    setActiveTab(route);
    history.replace(route);
  };

  const handleTabClose = (route: string) => {
    const newPages = pages.filter((e) => e.route !== route);

    const lastIdx = newPages.length - 1;
    const lastRoute = newPages[lastIdx].route;

    setActiveTab(lastRoute);
    history.replace(lastRoute);

    setPages(newPages);
  };

  useEffect(() => {
    const sessionPagesString = sessionStorage.getItem("currentPages");
    const sessionActiveTabString = sessionStorage.getItem("activeTab");

    if (sessionPagesString !== null) {
      const sessionPages = JSON.parse(sessionPagesString);
      const newPages: Array<Page> = sessionPages.map((e: any) => {
        const routePage = HomePages.find((page) => {
          return (
            matchPath(
              location.pathname.charAt(0) === "/"
                ? location.pathname
                : `/${location.pathname}`,
              {
                path: page.match,
                exact: true,
              }
            ) ?? false
          );
        });

        return {
          title: e.title,
          cancellable: e.cancellable,
          route: e.route,
          icon: routePage?.icon,
          match: e.match,
          notifs: e.notifs,
        };
      });

      setPages(newPages);
    }

    if (sessionActiveTabString !== null) {
      const sessionActiveTab = sessionActiveTabString;
      setActiveTab(sessionActiveTab);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token !== null) {
      const claim = parseJwt(token);
      if (claim.UserType.includes("Receptionist")) {
        setUserType("Receptionist");
      } else if (
        claim.UserType.includes("Physician") ||
        claim.UserType.includes("Nurse") ||
        claim.UserType.includes("Optometrist")
      ) {
        setUserType("Clinician");
      } else if (claim.UserType.includes("Pharmacist")) {
        setUserType("Pharmacist");
      } else if (claim.UserType.includes("Optical Assistant")) {
        setUserType("Optical Assistant");
      }
    }
  }, []);

  // Go to last page after change
  useEffect(() => {
    const lastIdx = pages.length - 1;
    const lastRoute = pages[lastIdx].route;

    setActiveTab(lastRoute);
    history.replace(lastRoute);
  }, [pages]);

  useEffect(() => {
    sessionStorage.setItem("currentPages", JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleTabUpdate = (page: any) => {
    // const exists = pages.find((e) => e.title === page.title);
    // if (exists) return;
    // const idx = pages.findIndex((e) => {
    //   return (
    //     matchPath(page.route, {
    //       path: e.match,
    //       exact: true,
    //     }) ?? false
    //   );
    // });
    // if (idx) {
    //   console.log(
    //     "handleTabUpdate",
    //     ...pages.slice(0, idx),
    //     {
    //       ...pages[idx],
    //       title: page.title,
    //       icon: page.icon,
    //       route: page.route,
    //     },
    //     ...pages.slice(idx + 1)
    //   );
    //   setPages([
    //     ...pages.slice(0, idx),
    //     {
    //       ...pages[idx],
    //       title: page.title,
    //       icon: page.icon,
    //       route: page.route,
    //     },
    //     ...pages.slice(idx + 1),
    //   ]);
    // }
  };

  return (
    <div>
      <MainLayout
        onPageSelect={(route: string) => handlePageSelect(route)}
        onAddPage={(page: Page) => handlePageAdd(page)}
      >
        <div>
          <HomeTabs
            pages={pages}
            activeTab={activeTab}
            onTabOpen={(route: string) => handleTabOpen(route)}
            onClose={(route: string) => handleTabClose(route)}
          />

          <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
            <div className="px-2 py-5 flex-auto">
              <div className="tab-content tab-space">
                <Switch>
                  <Route exact path="/">
                    {userType === "Receptionist" && (
                      <HomeReception
                        onAddPage={(page: Page) => handlePageAdd(page)}
                      />
                    )}

                    {userType === "Clinician" && (
                      <HomeClinician
                        onAddPage={(page: Page) => handlePageAdd(page)}
                      />
                    )}

                    {userType === "Pharmacist" && <PharmacyHome />}
                    {userType === "Optical Assistant" && <EyeShopHome />}
                  </Route>
                  <Route path="/profile/:profileId">
                    <ProfilePage />
                  </Route>
                  <Route exact path="/new-patient">
                    <NewPatientPage
                      onAddPage={(page: Page) => handlePageAdd(page)}
                    />
                  </Route>
                  <Route exact path="/update-patient">
                    <UpdatePatientPage
                      onAddPage={(page: Page) => handlePageAdd(page)}
                    />
                  </Route>
                  <Route path="/patients">
                    <PatientPage
                      onAddPage={handlePageAdd}
                      onUpdateTab={handleTabUpdate}
                    />
                  </Route>
                  <Route path="/appointments">
                    <AppointmentPage
                      onUpdateTab={handleTabUpdate}
                      onAddPage={(page: Page) => handlePageAdd(page)}
                      onTabClose={(route: string) => handleTabClose(route)}
                    />
                  </Route>
                  <Route path="/chats">
                    <ChatsPage />
                  </Route>
                  <Route exact path="/lab-orders">
                    <LabOrdersPage />
                  </Route>
                  <Route exact path="/diagnostic-orders">
                    <DiagnosticOrdersPage />
                  </Route>
                  <Route exact path="/treatment-orders">
                    <TreatmentOrdersPage />
                  </Route>
                  <Route exact path="/surgical-orders">
                    <SurgicalOrdersPage />
                  </Route>
                  <Route exact path="/followup-orders">
                    <FollowUpOrdersPage />
                  </Route>
                  <Route exact path="/referrals">
                    <ReferralOrdersPage />
                  </Route>
                  <Route exact path="/patient-queue">
                    <PatientQueuePage />
                  </Route>
                  <Route path="/admin">
                    <AdminHome />
                  </Route>
                  <Route>
                    <Component404 />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>

      {showBottomSheet && (
        <Sheet
          isOpen={showBottomSheet}
          disableDrag={true}
          onClose={() => bottomSheetDispatch({ type: "hide" })}
          snapPoints={[snapPoint]}
        >
          <Sheet.Container
            onUnmount={() => {
              bottomSheetDispatch({ type: "hide" });
            }}
            onViewportBoxUpdate={() => {}}
          >
            <Sheet.Header onViewportBoxUpdate={() => {}} />
            <Sheet.Content onViewportBoxUpdate={() => {}}>
              {BottomSheetChildren}
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            onUnmount={() => {
              bottomSheetDispatch({ type: "hide" });
            }}
            onViewportBoxUpdate={() => {}}
          />
        </Sheet>
      )}
    </div>
  );
};
