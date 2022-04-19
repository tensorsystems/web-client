import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import cn from "classnames";
import { UserCircleIcon, TrashIcon, RssIcon } from "@heroicons/react/outline";
import { gql, useMutation, useQuery } from "@apollo/client";
import { QueueType, } from "../models/models";
import { useEffect } from "react";
import { useNotificationDispatch } from "../notification";
import { useBottomSheetDispatch } from "../bottomsheet";
import AddQueueForm from "../components/AddQueueForm";
import { parseJwt } from "../util";
import _ from "lodash";
import AddToQueueForm from "../components/AddToQueueForm";
const GET_PATIENT_QUEUE = gql `
  query GetPatientQueues {
    patientQueues {
      id
      queueName
      queueType
      queue {
        id
        firstName
        lastName
        patientId
        providerName
      }
    }
  }
`;
const GET_USER_SUBSCRIPTIONS = gql `
  query GetUserSubscriptions($userId: ID!) {
    userSubscriptions(userId: $userId) {
      id
      userId
      subscriptions {
        id
        queueName
        queueType
      }
    }
  }
`;
const SAVE_PATIENT_QUEUE = gql `
  mutation SavePatientQueue($input: PatientQueueInput!) {
    savePatientQueue(input: $input) {
      queueName
      queueType
    }
  }
`;
const MOVE_PATIENT_QUEUE = gql `
  mutation MovePatientQueue(
    $appointmentId: ID!
    $sourceQueueId: ID!
    $destinationQueueId: ID!
  ) {
    movePatientQueue(
      appointmentId: $appointmentId
      sourceQueueId: $sourceQueueId
      destinationQueueId: $destinationQueueId
    ) {
      id
    }
  }
`;
const DELETE_FROM_QUEUE = gql `
  mutation DeleteFromQueue($patientQueueId: ID!, $appointmentId: ID!) {
    deleteFromQueue(
      patientQueueId: $patientQueueId
      appointmentId: $appointmentId
    ) {
      id
    }
  }
`;
const SUBSCRIBE_QUEUE = gql `
  mutation SubscribeQueue($userId: ID!, $patientQueueId: ID!) {
    subscribeQueue(userId: $userId, patientQueueId: $patientQueueId) {
      id
    }
  }
`;
const UNSUBSCRIBE_QUEUE = gql `
  mutation UnsubscribeQueue($userId: ID!, $patientQueueId: ID!) {
    unsubscribeQueue(userId: $userId, patientQueueId: $patientQueueId) {
      id
    }
  }
`;
const PatientQueuePage = () => {
    var _a, _b;
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const token = sessionStorage.getItem("accessToken");
    const userId = (_a = parseJwt(token)) === null || _a === void 0 ? void 0 : _a.ID;
    const [addToQueue, setAddToQueue] = useState();
    const { data, refetch, loading } = useQuery(GET_PATIENT_QUEUE, {
        pollInterval: 10000,
    });
    useEffect(() => {
        refetch();
    }, []);
    const userSubscriptionsQuery = useQuery(GET_USER_SUBSCRIPTIONS, {
        variables: {
            userId,
        },
    });
    const [state, setState] = useState([]);
    const [savePatientQueue] = useMutation(SAVE_PATIENT_QUEUE, {
        onError(error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const [movePatientQueue] = useMutation(MOVE_PATIENT_QUEUE, {
        onError(error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const [deleteFromQueue] = useMutation(DELETE_FROM_QUEUE, {
        onCompleted(data) {
            refetch();
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
    const [subscribeQueue] = useMutation(SUBSCRIBE_QUEUE, {
        onCompleted(data) {
            refetch();
            userSubscriptionsQuery.refetch();
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
    const [unsubscribeQueue] = useMutation(UNSUBSCRIBE_QUEUE, {
        onCompleted(data) {
            refetch();
            userSubscriptionsQuery.refetch();
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
    useEffect(() => {
        if (data === null || data === void 0 ? void 0 : data.patientQueues) {
            const items = [];
            data === null || data === void 0 ? void 0 : data.patientQueues.forEach((patientQueue) => {
                const item = {
                    id: patientQueue.id,
                    queueName: patientQueue.queueName,
                    queueType: patientQueue.queueType,
                    queue: patientQueue.queue.map((q) => (Object.assign(Object.assign({}, q), { id: q.id.toString() }))),
                };
                items.push(item);
            });
            setState(items);
        }
    }, [data === null || data === void 0 ? void 0 : data.patientQueues]);
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const move = (source, destination, sourceInx, destinationIdx, sourceId, destinationId) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(sourceInx, 1);
        destClone.splice(destinationIdx, 0, removed);
        const result = {};
        result[sourceId] = sourceClone;
        result[destinationId] = destClone;
        return result;
    };
    const getItemStyle = (isDragging, draggableStyle) => (Object.assign({ width: "100%" }, draggableStyle));
    function onDragEnd(result) {
        const { source, destination } = result;
        if (loading) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: "System was busy loading. Please try again. ",
                variant: "failure",
            });
            return;
        }
        if (!destination) {
            return;
        }
        const sId = +source.droppableId;
        const dId = +destination.droppableId;
        if (source.droppableId === "addToQueue" && addToQueue) {
            const destinationIdx = state.findIndex((e) => e.id === dId);
            let appointment = Object.assign(Object.assign({}, addToQueue), { id: addToQueue.id.toString() });
            appointment.id = addToQueue.id.toString();
            const alreadExists = state[destinationIdx].queue.find((e) => e.id === appointment.id);
            if (alreadExists) {
                notifDispatch({
                    type: "show",
                    notifTitle: "Error",
                    notifSubTitle: "Patient alread exists in this queue",
                    variant: "failure",
                });
                return;
            }
            let destinationQueue = state[destinationIdx].queue;
            destinationQueue.splice(destination.index, 0, appointment);
            let newState = [...state];
            newState[destinationIdx].queue = destinationQueue;
            const dQueue = newState[destinationIdx].queue.map((e) => e.id);
            saveQueue(newState[destinationIdx].queueName, newState[destinationIdx].queueType, dQueue);
            setState(newState);
            setAddToQueue(undefined);
            return;
        }
        if (sId === dId) {
            const sourceIdx = state.findIndex((e) => e.id === sId);
            const items = reorder(state[sourceIdx].queue, source.index, destination.index);
            const newState = [...state];
            newState[sourceIdx].queue = items;
            const queue = newState[sourceIdx].queue.map((e) => e.id);
            saveQueue(newState[sourceIdx].queueName, newState[sourceIdx].queueType, queue);
            setState(newState);
        }
        else {
            const sourceIdx = state.findIndex((e) => e.id === sId);
            const destinationIdx = state.findIndex((e) => e.id === dId);
            const appointment = state[sourceIdx].queue[source.index];
            const alreadExists = state[destinationIdx].queue.find((e) => e.id === appointment.id);
            if (alreadExists) {
                notifDispatch({
                    type: "show",
                    notifTitle: "Error",
                    notifSubTitle: "Patient alread exists in this queue",
                    variant: "failure",
                });
                return;
            }
            const result = move(state[sourceIdx].queue, state[destinationIdx].queue, source.index, destination.index, source.droppableId, destination.droppableId);
            let newState = [...state];
            newState[sourceIdx].queue = result[source.droppableId];
            newState[destinationIdx].queue = result[destination.droppableId];
            movePatientQueue({
                variables: {
                    appointmentId: appointment.id,
                    sourceQueueId: source.droppableId,
                    destinationQueueId: destination.droppableId,
                },
            }).then(() => {
                setState(newState);
            });
        }
    }
    const saveQueue = (queueName, queueType, queue) => {
        savePatientQueue({
            variables: {
                input: {
                    queueName,
                    queue,
                    queueType,
                },
            },
        });
    };
    const handleQueueCreate = () => {
        bottomSheetDispatch({
            type: "show",
            snapPoint: 0,
            children: (_jsx(AddQueueForm, { onSuccess: () => {
                    bottomSheetDispatch({ type: "hide" });
                    notifDispatch({
                        type: "show",
                        notifTitle: "Success",
                        notifSubTitle: "Patient queue has been added successfully",
                        variant: "success",
                    });
                    refetch();
                }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
        });
    };
    const handleQueueAdd = () => {
        bottomSheetDispatch({
            type: "show",
            snapPoint: 0,
            children: (_jsx(AddToQueueForm, { onSuccess: (appointment) => {
                    bottomSheetDispatch({ type: "hide" });
                    setAddToQueue(appointment);
                }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
        });
    };
    const handleSubscribe = (patientQueueId) => {
        subscribeQueue({
            variables: {
                userId,
                patientQueueId,
            },
        });
    };
    const handleUnsubscribe = (patientQueueId) => {
        unsubscribeQueue({
            variables: {
                userId,
                patientQueueId,
            },
        });
    };
    const handleDeleteFromQueue = (patientQueueId, appointmentId) => {
        deleteFromQueue({
            variables: {
                patientQueueId,
                appointmentId,
            },
        });
    };
    const getQueueTypeHumanName = (queueType) => {
        switch (queueType) {
            case QueueType.User:
                return "Users";
            case QueueType.Lab:
                return "Labratory";
            case QueueType.Diagnostic:
                return "Diagnostic Procedures";
            case QueueType.Surgical:
                return "Surgical Procedures";
            case QueueType.Preexam:
                return "Pre-Exam";
            case QueueType.Preoperation:
                return "Pre-Operation";
            default:
                return "Others";
        }
    };
    const getQueueTypeIcon = (queueType) => {
        switch (queueType) {
            case QueueType.User:
                return _jsx("span", Object.assign({ className: "material-icons" }, { children: "person" }), void 0);
            case QueueType.Lab:
                return _jsx("span", Object.assign({ className: "material-icons" }, { children: "biotech" }), void 0);
            case QueueType.Diagnostic:
                return (_jsx("span", Object.assign({ className: "material-icons" }, { children: "airline_seat_recline_normal" }), void 0));
            case QueueType.Surgical:
                return _jsx("span", Object.assign({ className: "material-icons" }, { children: "airline_seat_flat" }), void 0);
            case QueueType.Preexam:
                return _jsx("span", Object.assign({ className: "material-icons" }, { children: "preview" }), void 0);
            case QueueType.Preoperation:
                return _jsx("span", Object.assign({ className: "material-icons" }, { children: "preview" }), void 0);
            default:
                return _jsx("span", {}, void 0);
        }
    };
    const userSubscriptionIds = (_b = userSubscriptionsQuery.data) === null || _b === void 0 ? void 0 : _b.userSubscriptions.subscriptions.map((e) => e.id);
    const grouped = _.groupBy(state, "queueType");
    return (_jsxs("div", Object.assign({ className: "h-full" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-4" }, { children: [_jsxs("button", Object.assign({ type: "button", onClick: () => {
                            handleQueueCreate();
                        }, className: "px-4 py-3 bg-white rounded-md shadow-lg flex items-center space-x-2 hover:bg-gray-50" }, { children: [_jsx("p", Object.assign({ className: "material-icons text-gray-600" }, { children: "create_new_folder" }), void 0),
                            _jsx("p", { children: "Create New Queue" }, void 0)] }), void 0),
                    _jsxs("button", Object.assign({ type: "button", onClick: () => {
                            handleQueueAdd();
                        }, className: "px-4 py-3 bg-white rounded-md shadow-lg flex items-center space-x-2 hover:bg-gray-50" }, { children: [_jsx("p", Object.assign({ className: "material-icons text-gray-600" }, { children: "group_add" }), void 0),
                            _jsx("p", { children: "Add To Queue" }, void 0)] }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "mt-5" }, { children: _jsxs(DragDropContext, Object.assign({ onDragEnd: onDragEnd }, { children: [addToQueue && (_jsx("div", { children: _jsx(Droppable, Object.assign({ droppableId: `addToQueue` }, { children: (provided, snapshot) => (_jsxs("div", Object.assign({ ref: provided.innerRef }, provided.droppableProps, { className: cn("p-4 shadow-lg w-full", {
                                        "bg-blue-300": snapshot.isDraggingOver,
                                        "bg-gray-50": !snapshot.isDraggingOver,
                                    }) }, { children: [_jsx("div", Object.assign({ className: "mb-4 flex space-x-4 items-center justify-between" }, { children: _jsx("p", Object.assign({ className: "font-semibold text-lg" }, { children: "Add To Queue" }), void 0) }), void 0),
                                        _jsx(Draggable, Object.assign({ draggableId: addToQueue.id.toString(), index: 0 }, { children: (provided, snapshot) => (_jsx("div", Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style), className: cn("shadow-lg rounded-md select-none p-4 mt-2 ", {
                                                    "bg-green-300": snapshot.isDragging,
                                                    "bg-white": !snapshot.isDragging,
                                                }) }, { children: _jsxs("div", Object.assign({ className: "flex justify-between" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-2 items-center" }, { children: [_jsx(UserCircleIcon, { className: "h-6 w-6 text-gray-500" }, void 0),
                                                                _jsx("div", { children: _jsx("p", Object.assign({ className: "text-gray-800" }, { children: `${addToQueue.firstName} ${addToQueue.lastName}` }), void 0) }, void 0)] }), void 0),
                                                        _jsx("button", Object.assign({ type: "button", onClick: () => {
                                                                setAddToQueue(undefined);
                                                            } }, { children: _jsx(TrashIcon, { className: "h-6 w-6 text-red-400" }, void 0) }), void 0)] }), void 0) }), void 0)) }), addToQueue.id.toString()), provided.placeholder] }), void 0)) }), `addToQueue`) }, void 0)),
                        Object.entries(grouped).map(([key, value]) => (_jsxs("div", Object.assign({ className: "mt-5 p-5 bg-indigo-50 shadow-md" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-2 items-center text-gray-700 tracking-wide" }, { children: [getQueueTypeIcon(key), _jsx("p", Object.assign({ className: "text-2xl" }, { children: getQueueTypeHumanName(key).toUpperCase() }), void 0)] }), void 0),
                                _jsx("div", Object.assign({ className: "grid grid-cols-4 gap-6 overflow-x-scroll mt-4" }, { children: value.map((el) => (_jsx(Droppable, Object.assign({ droppableId: `${el.id}` }, { children: (provided, snapshot) => (_jsxs("div", Object.assign({ ref: provided.innerRef }, provided.droppableProps, { className: cn("p-4 shadow-lg w-full", {
                                                "bg-blue-300": snapshot.isDraggingOver,
                                                "bg-gray-50": !snapshot.isDraggingOver,
                                            }) }, { children: [_jsxs("div", Object.assign({ className: "mb-4 flex space-x-4 items-center justify-between" }, { children: [_jsx("p", Object.assign({ className: "font-semibold text-lg" }, { children: el.queueName }), void 0),
                                                        userSubscriptionIds &&
                                                            userSubscriptionIds.includes(el.id) ? (_jsxs("button", Object.assign({ type: "button", onClick: () => handleUnsubscribe(el.id), className: "flex space-x-1 items-center bg-teal-200 hover:bg-red-400 hover:text-white px-2 py-1 rounded-md shadow-md" }, { children: [_jsx(RssIcon, { className: "h-4 w-4" }, void 0),
                                                                _jsx("p", { children: "Unsubscribe" }, void 0)] }), void 0)) : (_jsxs("button", Object.assign({ type: "button", onClick: () => handleSubscribe(el.id), className: "flex space-x-1 items-center bg-gray-100 hover:bg-green-400 hover:text-white p-1 rounded-md shadow-md" }, { children: [_jsx(RssIcon, { className: "h-4 w-4 text-gray-500" }, void 0),
                                                                _jsx("p", { children: "Subscribe" }, void 0)] }), void 0))] }), void 0),
                                                el.queue.map((item, index) => (_jsx(Draggable, Object.assign({ draggableId: item.id, index: index }, { children: (provided, snapshot) => (_jsx("div", Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style), className: cn("shadow-lg rounded-md select-none p-4 mt-2", {
                                                            "bg-green-300": snapshot.isDragging,
                                                            "bg-white": !snapshot.isDragging,
                                                        }) }, { children: _jsxs("div", Object.assign({ className: "flex justify-between" }, { children: [_jsxs("div", Object.assign({ className: "flex space-x-2 items-center" }, { children: [_jsx(UserCircleIcon, { className: "h-7 w-7 text-gray-500" }, void 0),
                                                                        _jsxs("div", Object.assign({ className: "mt-1" }, { children: [_jsxs("div", { children: [_jsx("span", Object.assign({ className: "text-gray-800" }, { children: `${item.firstName} ${item.lastName}` }), void 0),
                                                                                        _jsx("span", Object.assign({ className: "text-gray-400" }, { children: ` | ${item.patientId}` }), void 0)] }, void 0),
                                                                                _jsx("p", Object.assign({ className: "text-xs text-indigo-500" }, { children: `Dr. ${item.providerName}` }), void 0)] }), void 0)] }), void 0),
                                                                _jsx("button", Object.assign({ type: "button", onClick: () => {
                                                                        if (item.id)
                                                                            handleDeleteFromQueue(el.id, item.id);
                                                                    } }, { children: _jsx(TrashIcon, { className: "h-6 w-6 text-red-400" }, void 0) }), void 0)] }), void 0) }), void 0)) }), item.id))), provided.placeholder] }), void 0)) }), el.id))) }), void 0)] }), key)))] }), void 0) }), void 0)] }), void 0));
};
export default PatientQueuePage;
