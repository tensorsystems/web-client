import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
const GET_REVIEW_OF_SYSTEMS = gql `
  query GetReviewOfSystems($page: PaginationInput!, $patientHistoryId: ID!) {
    patientHistory(id: $patientHistoryId) {
      reviewOfSystemsNote
    }

    reviewOfSystems(
      page: $page
      filter: { patientHistoryId: $patientHistoryId }
    ) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          systemSymptom {
            id
            title
            system {
              id
              title
            }
          }
          note
        }
      }
    }
  }
`;
export const ReviewOfSystemsPrintComponent = ({ patientHistoryId }) => {
    const { data, refetch } = useQuery(GET_REVIEW_OF_SYSTEMS, {
        variables: {
            page: { page: 0, size: 100 },
            patientHistoryId,
        },
    });
    return (_jsxs("div", { children: [_jsx("div", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "Review of Systems" }), void 0),
            _jsx("hr", { className: "mt-4" }, void 0),
            _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("ul", { children: data === null || data === void 0 ? void 0 : data.reviewOfSystems.edges.map((e) => (_jsxs("li", { children: [_jsxs("span", Object.assign({ className: "font-semibold" }, { children: [e === null || e === void 0 ? void 0 : e.node.systemSymptom.system.title, ":", " "] }), void 0),
                                _jsx("span", { children: e === null || e === void 0 ? void 0 : e.node.systemSymptom.title }, void 0)] }, e === null || e === void 0 ? void 0 : e.node.id))) }, void 0),
                    (data === null || data === void 0 ? void 0 : data.patientHistory.reviewOfSystemsNote) && (_jsx("div", Object.assign({ className: "mt-2" }, { children: _jsx("p", { children: data === null || data === void 0 ? void 0 : data.patientHistory.reviewOfSystemsNote }, void 0) }), void 0))] }), void 0)] }, void 0));
};
