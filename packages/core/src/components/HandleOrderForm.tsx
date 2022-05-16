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

import { gql, useMutation } from "@apollo/client";
import { Menu } from "@headlessui/react";
import { PencilIcon, SortAscendingIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import {
  Order,
  MutationConfirmPaymentArgs,
  MutationRequestPaymentWaiverArgs,
} from "../models/models";
import { useNotificationDispatch } from "@tensoremr/notification";
import MenuComponent from "./MenuComponent";
import classnames from "classnames";

const CONFIRM_PAYMENT = gql`
  mutation ConfirmPayment($id: ID!) {
    confirmPayment(id: $id) {
      id
    }
  }
`;

const CONFIRM_PAYMENT_BATCH = gql`
  mutation ConfirmPaymentBatch($ids: [ID!]!) {
    confirmPayments(ids: $ids)
  }
`;

const REQUEST_WAIVER = gql`
  mutation RequestPaymentWaiver($paymentId: ID!, $patientId: ID!) {
    requestPaymentWaiver(paymentId: $paymentId, patientId: $patientId) {
      id
    }
  }
`;

const REQUEST_WAIVER_BATCH = gql`
  mutation RequestPaymentWaivers($ids: [ID!]!, $patientId: ID!) {
    requestPaymentWaivers(ids: $ids, patientId: $patientId)
  }
`;

interface HandleOrderFormProps {
  selectedOrder: Order;
  onSuccess: () => void;
  onCancel: () => void;
  onRefresh: () => void;
}

export const HandleOrderForm: React.FC<HandleOrderFormProps> = ({
  selectedOrder,
  onCancel,
}) => {
  const notifDispatch = useNotificationDispatch();
  const [order, setOrder] = useState<Order>(selectedOrder);
  const [errors, setErrors] = useState<Array<any>>([]);

  const [confirmPayment, confirmPaymentResult] = useMutation<
    any,
    MutationConfirmPaymentArgs
  >(CONFIRM_PAYMENT, {
    onCompleted(data) {
      const paymentId = data.confirmPayment.id;
      const paymentIdx = order.payments?.findIndex((e) => e?.id === paymentId);

      setOrder({
        ...order,
        payments: [
          ...order.payments.slice(0, paymentIdx),
          {
            ...order.payments[paymentIdx],
            status: "PAID",
          },
          ...order.payments?.slice(paymentIdx + 1),
        ],
      });
    },
    update: (cache, mutationResult) => {
      let payment = order.payments?.find(
        (e) => e?.id === mutationResult.data.confirmPayment.id
      );

      if (payment) {
        cache.modify({
          id: cache.identify(payment),
          fields: {
            status(cachedStatus) {
              return "PAID";
            },
          },
        });
      }
    },
    onError(error) {
      notifDispatch({
        type: "show",
        notifTitle: "Error",
        notifSubTitle: error.message,
        variant: "failure",
      });
    },
  });

  const [confirmPaymentBatch, confirmPaymentBatchResult] = useMutation<
    any,
    any
  >(CONFIRM_PAYMENT_BATCH, {
    onCompleted(data) {
      const payments = order.payments;

      if (data.confirmPayments && payments.length > 0) {
        const newPayments = payments.map((e) => ({ ...e, status: "PAID" }));

        setOrder({
          ...order,
          payments: newPayments,
        });
      }
    },
    update: (cache, mutationResult) => {
      let payments = order.payments;

      if (mutationResult.data.confirmPayments && payments.length > 0) {
        payments.forEach((e) => {
          cache.modify({
            id: cache.identify(e),
            fields: {
              status(cachedStatus) {
                return "PAID";
              },
            },
          });
        });
      }
    },
    onError(error) {
      notifDispatch({
        type: "show",
        notifTitle: "Error",
        notifSubTitle: error.message,
        variant: "failure",
      });
    },
  });

  const [requestWaiver, requestWaiverResult] = useMutation<
    any,
    MutationRequestPaymentWaiverArgs
  >(REQUEST_WAIVER, {
    onCompleted(data) {
      const paymentId = data.requestPaymentWaiver.id;
      const paymentIdx = order.payments?.findIndex((e) => e?.id === paymentId);

      setOrder({
        ...order,
        payments: [
          ...order.payments.slice(0, paymentIdx),
          {
            ...order.payments[paymentIdx],
            status: "PAYMENT_WAIVER_REQUESTED",
          },
          ...order.payments?.slice(paymentIdx + 1),
        ],
      });
    },
    update: (cache, mutationResult) => {
      let payment = order.payments?.find(
        (e) => e?.id === mutationResult.data.requestPaymentWaiver.id
      );

      if (payment) {
        cache.modify({
          id: cache.identify(payment),
          fields: {
            status(cachedStatus) {
              return "PAYMENT_WAIVER_REQUESTED";
            },
          },
        });
      }
    },
    onError(error) {
      notifDispatch({
        type: "show",
        notifTitle: "Error",
        notifSubTitle: error.message,
        variant: "failure",
      });
    },
  });

  const [requestWaiverBatch, requestWaiverBatchResult] = useMutation<any, any>(
    REQUEST_WAIVER_BATCH,
    {
      onCompleted(data) {
        const payments = order.payments;

        if (data.requestPaymentWaivers && payments.length > 0) {
          const newPayments = payments.map((e) => ({
            ...e,
            status: "PAYMENT_WAIVER_REQUESTED",
          }));

          setOrder({
            ...order,
            payments: newPayments,
          });
        }
      },
      update: (cache, mutationResult) => {
        let payments = order.payments;

        if (mutationResult.data.requestPaymentWaivers && payments.length > 0) {
          payments.forEach((e) => {
            cache.modify({
              id: cache.identify(e),
              fields: {
                status(cachedStatus) {
                  return "PAYMENT_WAIVER_REQUESTED";
                },
              },
            });
          });
        }
      },
      onError(error) {
        notifDispatch({
          type: "show",
          notifTitle: "Error",
          notifSubTitle: error.message,
          variant: "failure",
        });
      },
    }
  );

  useEffect(() => {
    let newErrors = [];
    if (confirmPaymentResult.error) newErrors.push(confirmPaymentResult.error);
    if (confirmPaymentBatchResult.error)
      newErrors.push(confirmPaymentBatchResult.error);
    if (requestWaiverResult.error) newErrors.push(requestWaiverResult.error);
    if (requestWaiverBatchResult.error)
      newErrors.push(requestWaiverBatchResult.error);
    setErrors(newErrors);
  }, [
    confirmPaymentResult.error,
    confirmPaymentBatchResult.error,
    requestWaiverResult.error,
    requestWaiverBatchResult.error,
  ]);

  return (
    <div className="container mx-auto flex justify-center pt-4 pb-6">
      <div className="w-1/2">
        <div className="float-right">
          <button onClick={onCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form>
          <p className="text-2xl text-teal-700 font-extrabold tracking-wider">{`Order for ${order.firstName} ${order.lastName}`}</p>
          <div className="mt-5">
            <table className="table-fixed w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Billing
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {order.payments?.map((p) => (
                  <tr key={p?.id} className="border-t">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {p?.billing.item}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {p?.billing.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span className="text-gray-600 tracking-wide">ETB </span>
                      <span>{p?.billing.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {p?.status === "PAID" && (
                        <p className="text-green-700 uppercase font-semibold">
                          Payment Confirmed
                        </p>
                      )}
                      {p?.status === "PAYMENT_WAIVER_REQUESTED" && (
                        <p className="text-yellow-700 uppercase font-semibold animate-pulse">
                          Payment waiver requested
                        </p>
                      )}
                      {p?.status === "NOTPAID" && (
                        <MenuComponent
                          title={"Options"}
                          menus={
                            <div className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-teal-500 text-white"
                                        : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    type="button"
                                    onClick={() => {
                                      if (p?.id) {
                                        // confirmPayment({
                                        //   variables: {
                                        //     id: p?.id,
                                        //   },
                                        // });
                                      }
                                    }}
                                  >
                                    <PencilIcon
                                      className="w-5 h-5 mr-2 text-teal-700"
                                      aria-hidden="true"
                                    />
                                    Confirm Payment
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-teal-500 text-white"
                                        : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    type="button"
                                    onClick={() => {
                                      if (p?.id && order.patientId) {
                                        requestWaiver({
                                          variables: {
                                            paymentId: p?.id,
                                            patientId: order.patientId,
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <SortAscendingIcon
                                      className="w-5 h-5 mr-2 text-teal-700"
                                      aria-hidden="true"
                                    />
                                    Request Payment Waiver
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-900"></td>
                  <td className="px-6 py-4 text-sm text-gray-900"></td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className="text-gray-600 tracking-wide">
                      Total: ETB{" "}
                    </span>
                    <span>
                      {order.payments
                        ?.reduce(
                          (a, c) => a + (c?.billing ? c?.billing.price : 0),
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.payments.every((e) => e.status === "PAID") && (
                      <p className="text-green-700 uppercase font-semibold">
                        Payments Confirmed
                      </p>
                    )}

                    {order.payments.every(
                      (e) => e.status === "PAYMENT_WAIVER_REQUESTED"
                    ) && (
                      <p className="text-yellow-700 uppercase font-semibold animate-pulse">
                        Payment waiver requested
                      </p>
                    )}

                    {order.payments.some((e) => e.status === "NOTPAID") && (
                      <MenuComponent
                        title={"Options"}
                        menus={
                          <div className="px-1 py-1">
                            <Menu.Item
                              disabled={
                                !order.payments.some(
                                  (e) => e.status === "NOTPAID"
                                )
                              }
                            >
                              {({ active, disabled }) => (
                                <button
                                  className={classnames(
                                    "group flex rounded-md items-center w-full px-2 py-2 text-sm",
                                    {
                                      "bg-teal-500 text-white": active,
                                      "text-gray-900": !active && !disabled,
                                      "text-gray-500  ": disabled,
                                    }
                                  )}
                                  type="button"
                                  onClick={() => {
                                    const paymentIds = order.payments?.map(
                                      (e) => e?.id
                                    );
                                    confirmPaymentBatch({
                                      variables: {
                                        ids: paymentIds,
                                      },
                                    });
                                  }}
                                >
                                  <PencilIcon
                                    className={classnames("w-5 h-5 mr-2", {
                                      "text-teal-700": !disabled,
                                      "text-gray-500": disabled,
                                    })}
                                    aria-hidden="true"
                                  />
                                  Confirm all payments
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item
                              disabled={
                                !order.payments.some(
                                  (e) => e.status === "NOTPAID"
                                )
                              }
                            >
                              {({ active, disabled }) => (
                                <button
                                  className={classnames(
                                    "group flex rounded-md items-center w-full px-2 py-2 text-sm",
                                    {
                                      "bg-teal-500 text-white": active,
                                      "text-gray-900": !active && !disabled,
                                      "text-gray-500  ": disabled,
                                    }
                                  )}
                                  type="button"
                                  onClick={() => {
                                    const paymentIds = order.payments?.map(
                                      (e) => e?.id
                                    );

                                    requestWaiverBatch({
                                      variables: {
                                        ids: paymentIds,
                                        patientId: order.patientId,
                                      },
                                    });
                                  }}
                                >
                                  <SortAscendingIcon
                                    className={classnames("w-5 h-5 mr-2", {
                                      "text-teal-700": !disabled,
                                      "text-gray-500": disabled,
                                    })}
                                  />
                                  Request payment waiver
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        }
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            {errors.length > 0 &&
              errors.map((e) => (
                <p className="text-red-600">Error: {e?.message}</p>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};
