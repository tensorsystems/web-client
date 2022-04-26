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

import React, { useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { TablePagination } from "./TablePagination";
import { gql, useLazyQuery } from "@apollo/client";
import {
  Maybe,
  Order,
  OrderEdge,
  PaginationInput,
  Query,
  QueryProviderOrdersArgs,
} from "../models/models";
import debounce from "lodash-es/debounce";

const GET_PROVIDER_ORDERS = gql`
  query ProviderOrders($page: PaginationInput!, $searchTerm: String) {
    providerOrders(page: $page, searchTerm: $searchTerm) {
      totalCount
      edges {
        node {
          id
          firstName
          lastName
          phoneNo
          patientId
          appointmentId
          status
          orderType
          status
          payments {
            id
            invoiceNo
            status
            billing {
              id
              item
              code
              price
              credit
            }
          }
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;

interface Props {
  onOrderClick: (e: Order) => void;
}

export const ProviderOrdersTable: React.FC<Props> = ({ onOrderClick }) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [paginationInput, setPaginationInput] = useState<PaginationInput>({
    page: 1,
    size: 5,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const orderQuery = useLazyQuery<Query, QueryProviderOrdersArgs>(
    GET_PROVIDER_ORDERS,
    {
      variables: {
        page: paginationInput,
      },
      pollInterval: 30000,
    }
  );

  useEffect(() => {
    orderQuery[0]({
      variables: {
        page: paginationInput,
      },
    });
  }, []);

  useEffect(() => {
    orderQuery[0]({
      variables: {
        page: paginationInput,
        searchTerm:
          debouncedSearchTerm.length > 0 ? debouncedSearchTerm : undefined,
      },
    });
  }, [debouncedSearchTerm, paginationInput]);

  const debouncer = useCallback(
    debounce((_searchVal: string) => {
      setDebouncedSearchTerm(_searchVal);
    }, 1000),
    []
  );

  const handleNextClick = () => {
    const totalPages =
      orderQuery[1].data?.providerOrders.pageInfo.totalPages ?? 0;

    if (totalPages > paginationInput.page) {
      setPaginationInput({
        ...paginationInput,
        page: paginationInput.page + 1,
      });
    }
  };

  const handlePreviousClick = () => {
    if (paginationInput.page > 1) {
      setPaginationInput({
        ...paginationInput,
        page: paginationInput.page - 1,
      });
    }
  };

  const handleOrderClick = (e: Maybe<OrderEdge>) => {
    const isPendingPayments = e?.node.payments.some(
      (p) => p.status === "NOTPAID"
    );

    if (!isPendingPayments && e) {
      onOrderClick(e.node);
    }
  };

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="border-purple-700 border-l-4">
            <th
              scope="col"
              colSpan={1}
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Your Orders
            </th>
            <th
              scope="col"
              colSpan={2}
              className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="flex justify-end">
                {showSearch && (
                  <input
                    autoFocus
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(evt) => {
                      setSearchTerm(evt.target.value.trim());
                      debouncer(evt.target.value.trim());
                    }}
                    onBlur={() => setShowSearch(false)}
                    className="px-2 py-1 border border-gray-200 rounded-md shadow-inner"
                  />
                )}

                {!showSearch && (
                  <button type="button" onClick={() => setShowSearch(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orderQuery[1].data?.providerOrders.edges.map((e) => {
            const isPendingPayments = e?.node.payments.some(
              (p) => p.status === "NOTPAID"
            );

            return (
              <tr
                key={e?.node.id}
                className={classnames("hover:bg-gray-100 cursor-pointer", {})}
                onClick={() => handleOrderClick(e)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={classnames("h-10 w-10 text-gray-600", {
                          "text-red-500":
                            e?.node.status === "ORDERED" && isPendingPayments,
                          "text-yellow-500":
                            e?.node.status === "ORDERED" && !isPendingPayments,
                          "text-green-500": e?.node.status === "COMPLETED",
                        })}
                      >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {`${e?.node.firstName} ${e?.node.lastName}`} (
                        {e?.node.id})
                      </div>
                      <div className="text-sm text-gray-500">
                        {e?.node.status === "ORDERED" && isPendingPayments && (
                          <p>Pending Payments</p>
                        )}
                        {e?.node.status === "ORDERED" && !isPendingPayments && (
                          <p>Pending Results</p>
                        )}
                        {e?.node.status === "COMPLETED" && <p>Completed</p>}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  colSpan={2}
                  className="px-6 py-4 text-sm text-gray-700 font-semibold"
                >
                  {e?.node.payments.map((e) => e.billing.item).join(", ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination
        totalCount={orderQuery[1].data?.providerOrders.totalCount ?? 0}
        onNext={handleNextClick}
        onPrevious={handlePreviousClick}
      />
    </div>
  );
};

const statusText = (status: string | undefined) => {
  if (status === "PAID") return "Payment confirmed";
  if (status === "NOTPAID") return "Not paid";
  if (status === "COMPLETED") return "Order completed";
};
