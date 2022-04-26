import { DraggableId, DraggableLocation } from "react-beautiful-dnd";
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Time: any;
    Upload: any;
};
export interface Page {
    title: string;
    cancellable: boolean | true;
    route: string;
    icon: JSX.Element;
    match?: Array<string>;
    notifs?: number;
}
export declare type Id = string;
export declare type AuthorColors = {
    soft: string;
    hard: string;
};
export declare type Author = {
    id: Id;
    name: string;
    avatarUrl: string;
    url: string;
    colors: AuthorColors;
};
export declare type Quote = {
    id: Id;
    content: string;
    author: Author;
};
export declare type Dragging = {
    id: DraggableId;
    location: DraggableLocation;
};
export declare type QuoteMap = {
    [key: string]: Quote[];
};
export declare type Task = {
    id: Id;
    content: string;
};
export interface Tab {
    title: string;
    route: string;
    icon: JSX.Element;
    selectedIcon: JSX.Element;
}
export declare type Allergy = {
    __typename?: "Allergy";
    id: Scalars["ID"];
    title: Scalars["String"];
    issueSeverity: Scalars["String"];
    issueReaction: Scalars["String"];
    issueOutcome: Scalars["String"];
    issueOccurrence: Scalars["String"];
    patientHistoryId: Scalars["ID"];
};
export declare type AllergyConnection = Connection & {
    __typename?: "AllergyConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<AllergyEdge>>;
};
export declare type AllergyEdge = {
    __typename?: "AllergyEdge";
    node: Allergy;
};
export declare type AllergyFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    patientHistoryId?: InputMaybe<Scalars["ID"]>;
};
export declare type AllergyInput = {
    title: Scalars["String"];
    issueSeverity?: InputMaybe<Scalars["String"]>;
    issueReaction?: InputMaybe<Scalars["String"]>;
    issueOutcome?: InputMaybe<Scalars["String"]>;
    issueOccurrence?: InputMaybe<Scalars["String"]>;
    patientHistoryId: Scalars["ID"];
};
export declare type AllergyUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    issueSeverity?: InputMaybe<Scalars["String"]>;
    issueReaction?: InputMaybe<Scalars["String"]>;
    issueOutcome?: InputMaybe<Scalars["String"]>;
    issueOccurrence?: InputMaybe<Scalars["String"]>;
};
export declare type Amendment = {
    __typename?: "Amendment";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    note: Scalars["String"];
    createdAt: Scalars["Time"];
};
export declare type AmendmentFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type AmendmentInput = {
    patientChartId: Scalars["ID"];
    note: Scalars["String"];
};
export declare type AmendmentUpdateInput = {
    id: Scalars["ID"];
    note?: InputMaybe<Scalars["String"]>;
};
export declare type Appointment = {
    __typename?: "Appointment";
    id: Scalars["ID"];
    patient: Patient;
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    patientId: Scalars["ID"];
    providerName: Scalars["String"];
    checkInTime: Scalars["Time"];
    checkedInTime?: Maybe<Scalars["Time"]>;
    checkedOutTime?: Maybe<Scalars["Time"]>;
    room: Room;
    visitType: VisitType;
    appointmentStatus: AppointmentStatus;
    emergency?: Maybe<Scalars["Boolean"]>;
    medicalDepartment?: Maybe<Scalars["String"]>;
    credit: Scalars["Boolean"];
    payments: Array<Maybe<Payment>>;
    files: Array<Maybe<File>>;
    userId: Scalars["ID"];
    queueId: Scalars["ID"];
    queueName: Scalars["String"];
    patientChart: PatientChart;
};
export declare type AppointmentConnection = Connection & {
    __typename?: "AppointmentConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<AppointmentEdge>;
};
export declare type AppointmentEdge = {
    __typename?: "AppointmentEdge";
    node: Appointment;
};
export declare type AppointmentFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    checkInTime?: InputMaybe<Scalars["Time"]>;
    checkedInTime?: InputMaybe<Scalars["Time"]>;
    checkedOutTime?: InputMaybe<Scalars["Time"]>;
    roomId?: InputMaybe<Scalars["ID"]>;
    visitTypeId?: InputMaybe<Scalars["ID"]>;
    appointmentStatusId?: InputMaybe<Scalars["ID"]>;
    credit?: InputMaybe<Scalars["Boolean"]>;
    userId?: InputMaybe<Scalars["ID"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type AppointmentInput = {
    patientId: Scalars["ID"];
    checkInTime: Scalars["Time"];
    checkedInTime?: InputMaybe<Scalars["Time"]>;
    checkedOutTime?: InputMaybe<Scalars["Time"]>;
    roomId: Scalars["ID"];
    visitTypeId: Scalars["ID"];
    credit?: InputMaybe<Scalars["Boolean"]>;
    emergency?: InputMaybe<Scalars["Boolean"]>;
    medicalDepartment?: InputMaybe<Scalars["String"]>;
    paymentIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    fileIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    userId: Scalars["ID"];
    patientChartId?: InputMaybe<Scalars["ID"]>;
    invoiceNo?: InputMaybe<Scalars["String"]>;
    billingId?: InputMaybe<Scalars["ID"]>;
};
export declare type AppointmentSearchInput = {
    searchTerm?: InputMaybe<Scalars["String"]>;
    userId?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    appointmentStatusId?: InputMaybe<Scalars["String"]>;
    visitTypeId?: InputMaybe<Scalars["String"]>;
    checkInTime?: InputMaybe<Scalars["Time"]>;
};
export declare type AppointmentStatus = {
    __typename?: "AppointmentStatus";
    id: Scalars["ID"];
    title: Scalars["String"];
};
export declare type AppointmentStatusConnection = Connection & {
    __typename?: "AppointmentStatusConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<AppointmentStatusEdge>>;
};
export declare type AppointmentStatusEdge = {
    __typename?: "AppointmentStatusEdge";
    node: AppointmentStatus;
};
export declare type AppointmentStatusInput = {
    title: Scalars["String"];
};
export declare type AppointmentUpdateInput = {
    id: Scalars["ID"];
    patientId?: InputMaybe<Scalars["ID"]>;
    checkInTime?: InputMaybe<Scalars["Time"]>;
    checkedInTime?: InputMaybe<Scalars["Time"]>;
    checkedOutTime?: InputMaybe<Scalars["Time"]>;
    roomId?: InputMaybe<Scalars["ID"]>;
    visitTypeId?: InputMaybe<Scalars["ID"]>;
    appointmentStatusId?: InputMaybe<Scalars["ID"]>;
    emergency?: InputMaybe<Scalars["Boolean"]>;
    medicalDepartment?: InputMaybe<Scalars["String"]>;
    credit?: InputMaybe<Scalars["Boolean"]>;
    paymentIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    fileIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    userId?: InputMaybe<Scalars["ID"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type Billing = {
    __typename?: "Billing";
    id: Scalars["ID"];
    item: Scalars["String"];
    code: Scalars["String"];
    price: Scalars["Float"];
    credit: Scalars["Boolean"];
    remark: Scalars["String"];
};
export declare type BillingConnection = Connection & {
    __typename?: "BillingConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<BillingEdge>>;
};
export declare type BillingEdge = {
    __typename?: "BillingEdge";
    node: Billing;
};
export declare type BillingFilter = {
    item?: InputMaybe<Scalars["String"]>;
    code?: InputMaybe<Scalars["String"]>;
};
export declare type BillingInput = {
    item: Scalars["String"];
    code: Scalars["String"];
    price: Scalars["Float"];
    credit: Scalars["Boolean"];
    remark: Scalars["String"];
};
export declare type ChangePasswordInput = {
    previousPassword: Scalars["String"];
    password: Scalars["String"];
    confirmPassword: Scalars["String"];
};
export declare type Chat = {
    __typename?: "Chat";
    id: Scalars["ID"];
    recentMessage: Scalars["String"];
    chatMembers: Array<Maybe<ChatMember>>;
    chatUnreadMessages: Array<Maybe<ChatUnreadMessage>>;
    chatMutes: Array<Maybe<ChatMute>>;
    chatMessages: Array<Maybe<ChatMessage>>;
    createdAt: Scalars["Time"];
    updatedAt: Scalars["Time"];
};
export declare type ChatDelete = {
    __typename?: "ChatDelete";
    id: Scalars["ID"];
    chatId: Scalars["ID"];
    userId: Scalars["ID"];
    createdAt: Scalars["Time"];
};
export declare type ChatInput = {
    recipientId: Scalars["ID"];
    message: Scalars["String"];
};
export declare type ChatMember = {
    __typename?: "ChatMember";
    id: Scalars["ID"];
    chatId: Scalars["ID"];
    userId: Scalars["ID"];
    displayName: Scalars["String"];
    photoUrl?: Maybe<Scalars["String"]>;
};
export declare type ChatMessage = {
    __typename?: "ChatMessage";
    id: Scalars["ID"];
    body: Scalars["String"];
    chatId: Scalars["ID"];
    userId: Scalars["ID"];
    createdAt: Scalars["Time"];
};
export declare type ChatMessageInput = {
    body: Scalars["String"];
    chatId: Scalars["ID"];
};
export declare type ChatMute = {
    __typename?: "ChatMute";
    id: Scalars["ID"];
    chatId: Scalars["ID"];
    userId: Scalars["ID"];
    createdAt: Scalars["Time"];
};
export declare type ChatUnreadMessage = {
    __typename?: "ChatUnreadMessage";
    id: Scalars["ID"];
    chatId: Scalars["ID"];
    userId: Scalars["ID"];
    createdAt: Scalars["Time"];
};
export declare type ChiefComplaint = {
    __typename?: "ChiefComplaint";
    id: Scalars["ID"];
    title: Scalars["String"];
    patientChartId: Scalars["ID"];
    hpiComponents: Array<Maybe<HpiComponent>>;
};
export declare type ChiefComplaintConnection = Connection & {
    __typename?: "ChiefComplaintConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<ChiefComplaintEdge>>;
};
export declare type ChiefComplaintEdge = {
    __typename?: "ChiefComplaintEdge";
    node: ChiefComplaint;
};
export declare type ChiefComplaintFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    title?: InputMaybe<Scalars["String"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type ChiefComplaintInput = {
    title: Scalars["String"];
    patientChartId: Scalars["ID"];
    hpiComponentIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare type ChiefComplaintOrder = {
    field: Scalars["String"];
    direction: OrderDirection;
};
export declare type ChiefComplaintType = {
    __typename?: "ChiefComplaintType";
    id: Scalars["ID"];
    title: Scalars["String"];
    active: Scalars["Boolean"];
};
export declare type ChiefComplaintTypeConnection = Connection & {
    __typename?: "ChiefComplaintTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<ChiefComplaintTypeEdge>>;
};
export declare type ChiefComplaintTypeEdge = {
    __typename?: "ChiefComplaintTypeEdge";
    node: ChiefComplaintType;
};
export declare type ChiefComplaintTypeInput = {
    title: Scalars["String"];
};
export declare type ChiefComplaintTypeUpdateInput = {
    id: Scalars["ID"];
    title: Scalars["String"];
};
export declare type ChiefComplaintUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
    hpiComponentIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};
export declare type ConfirmFollowOrderInput = {
    orderId: Scalars["ID"];
    checkInTime: Scalars["Time"];
    roomId: Scalars["ID"];
};
export declare type ConfirmFollowUpOrderInput = {
    followUpOrderId: Scalars["ID"];
    followUpId: Scalars["ID"];
    billingId?: InputMaybe<Scalars["ID"]>;
    invoiceNo?: InputMaybe<Scalars["String"]>;
    checkInTime: Scalars["Time"];
    roomId: Scalars["ID"];
};
export declare type ConfirmFollowUpOrderResult = {
    __typename?: "ConfirmFollowUpOrderResult";
    followUpOrder: FollowUpOrder;
    followUpId: Scalars["ID"];
    invoiceNo?: Maybe<Scalars["String"]>;
    billingId?: Maybe<Scalars["ID"]>;
};
export declare type ConfirmReferralOrderInput = {
    referralOrderId: Scalars["ID"];
    referralId: Scalars["ID"];
    billingId?: InputMaybe<Scalars["ID"]>;
    invoiceNo?: InputMaybe<Scalars["String"]>;
    checkInTime?: InputMaybe<Scalars["Time"]>;
    roomId?: InputMaybe<Scalars["ID"]>;
};
export declare type ConfirmReferralOrderResult = {
    __typename?: "ConfirmReferralOrderResult";
    referralOrder: ReferralOrder;
    referralId: Scalars["ID"];
    invoiceNo?: Maybe<Scalars["String"]>;
    billingId?: Maybe<Scalars["ID"]>;
};
export declare type ConfirmSurgicalOrderInput = {
    surgicalOrderId: Scalars["ID"];
    surgicalProcedureId: Scalars["ID"];
    invoiceNo?: InputMaybe<Scalars["String"]>;
    checkInTime: Scalars["Time"];
    roomId: Scalars["ID"];
};
export declare type ConfirmSurgicalOrderResult = {
    __typename?: "ConfirmSurgicalOrderResult";
    surgicalOrder: SurgicalOrder;
    surgicalProcedureId: Scalars["ID"];
    invoiceNo: Scalars["String"];
};
export declare type ConfirmTreatmentOrderInput = {
    treatmentOrderId: Scalars["ID"];
    treatmentId: Scalars["ID"];
    invoiceNo?: InputMaybe<Scalars["String"]>;
    checkInTime: Scalars["Time"];
    roomId: Scalars["ID"];
};
export declare type ConfirmTreatmentOrderResult = {
    __typename?: "ConfirmTreatmentOrderResult";
    treatmentOrder: TreatmentOrder;
    treatmentId: Scalars["ID"];
    invoiceNo: Scalars["String"];
};
export declare type Connection = {
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
};
export declare enum Destination {
    Preexam = "PREEXAM",
    Preoperation = "PREOPERATION",
    Physician = "PHYSICIAN",
    Reception = "RECEPTION"
}
export declare type Diagnosis = {
    __typename?: "Diagnosis";
    id: Scalars["ID"];
    categoryCode?: Maybe<Scalars["String"]>;
    diagnosisCode?: Maybe<Scalars["String"]>;
    fullCode?: Maybe<Scalars["String"]>;
    abbreviatedDescription?: Maybe<Scalars["String"]>;
    fullDescription: Scalars["String"];
    categoryTitle?: Maybe<Scalars["String"]>;
};
export declare type DiagnosisConnection = Connection & {
    __typename?: "DiagnosisConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<DiagnosisEdge>>;
};
export declare type DiagnosisEdge = {
    __typename?: "DiagnosisEdge";
    node: Diagnosis;
};
export declare type DiagnosisInput = {
    categoryCode?: InputMaybe<Scalars["String"]>;
    diagnosisCode?: InputMaybe<Scalars["String"]>;
    abbreviatedDescription?: InputMaybe<Scalars["String"]>;
    fullDescription: Scalars["String"];
    categoryTitle?: InputMaybe<Scalars["String"]>;
};
export declare type DiagnosisOrder = {
    field: Scalars["String"];
    direction: OrderDirection;
};
export declare type DiagnosisUpdateInput = {
    id: Scalars["ID"];
    categoryCode?: InputMaybe<Scalars["String"]>;
    diagnosisCode?: InputMaybe<Scalars["String"]>;
    abbreviatedDescription?: InputMaybe<Scalars["String"]>;
    fullDescription?: InputMaybe<Scalars["String"]>;
    categoryTitle?: InputMaybe<Scalars["String"]>;
};
export declare type DiagnosticProcedure = {
    __typename?: "DiagnosticProcedure";
    id: Scalars["ID"];
    diagnosticProcedureOrderID: Scalars["ID"];
    patientChartId: Scalars["ID"];
    generalText?: Maybe<Scalars["String"]>;
    images: Array<Maybe<File>>;
    documents: Array<Maybe<File>>;
    rightDistanceSubjectiveSph?: Maybe<Scalars["String"]>;
    leftDistanceSubjectiveSph?: Maybe<Scalars["String"]>;
    rightDistanceSubjectiveCyl?: Maybe<Scalars["String"]>;
    leftDistanceSubjectiveCyl?: Maybe<Scalars["String"]>;
    rightDistanceSubjectiveAxis?: Maybe<Scalars["String"]>;
    leftDistanceSubjectiveAxis?: Maybe<Scalars["String"]>;
    rightNearSubjectiveSph?: Maybe<Scalars["String"]>;
    leftNearSubjectiveSph?: Maybe<Scalars["String"]>;
    rightNearSubjectiveCyl?: Maybe<Scalars["String"]>;
    leftNearSubjectiveCyl?: Maybe<Scalars["String"]>;
    rightNearSubjectiveAxis?: Maybe<Scalars["String"]>;
    leftNearSubjectiveAxis?: Maybe<Scalars["String"]>;
    rightDistanceObjectiveSph?: Maybe<Scalars["String"]>;
    leftDistanceObjectiveSph?: Maybe<Scalars["String"]>;
    rightDistanceObjectiveCyl?: Maybe<Scalars["String"]>;
    leftDistanceObjectiveCyl?: Maybe<Scalars["String"]>;
    rightDistanceObjectiveAxis?: Maybe<Scalars["String"]>;
    leftDistanceObjectiveAxis?: Maybe<Scalars["String"]>;
    rightNearObjectiveSph?: Maybe<Scalars["String"]>;
    leftNearObjectiveSph?: Maybe<Scalars["String"]>;
    rightNearObjectiveCyl?: Maybe<Scalars["String"]>;
    leftNearObjectiveCyl?: Maybe<Scalars["String"]>;
    rightNearObjectiveAxis?: Maybe<Scalars["String"]>;
    leftNearObjectiveAxis?: Maybe<Scalars["String"]>;
    rightDistanceFinalSph?: Maybe<Scalars["String"]>;
    leftDistanceFinalSph?: Maybe<Scalars["String"]>;
    rightDistanceFinalCyl?: Maybe<Scalars["String"]>;
    leftDistanceFinalCyl?: Maybe<Scalars["String"]>;
    rightDistanceFinalAxis?: Maybe<Scalars["String"]>;
    leftDistanceFinalAxis?: Maybe<Scalars["String"]>;
    rightNearFinalSph?: Maybe<Scalars["String"]>;
    leftNearFinalSph?: Maybe<Scalars["String"]>;
    rightNearFinalCyl?: Maybe<Scalars["String"]>;
    leftNearFinalCyl?: Maybe<Scalars["String"]>;
    rightNearFinalAxis?: Maybe<Scalars["String"]>;
    leftNearFinalAxis?: Maybe<Scalars["String"]>;
    rightVisualAcuity?: Maybe<Scalars["String"]>;
    leftVisualAcuity?: Maybe<Scalars["String"]>;
    farPd?: Maybe<Scalars["String"]>;
    nearPd?: Maybe<Scalars["String"]>;
    diagnosticProcedureTypeId?: Maybe<Scalars["ID"]>;
    diagnosticProcedureType: DiagnosticProcedureType;
    diagnosticProcedureTypeTitle: Scalars["String"];
    status: DiagnosticProcedureStatus;
    receptionNote: Scalars["String"];
    orderNote: Scalars["String"];
    payments: Array<Payment>;
    createdAt: Scalars["Time"];
};
export declare type DiagnosticProcedureConnection = Connection & {
    __typename?: "DiagnosticProcedureConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<DiagnosticProcedureEdge>>;
};
export declare type DiagnosticProcedureDeleteFileInput = {
    diagnosticProcedureId: Scalars["ID"];
    fileId: Scalars["ID"];
};
export declare type DiagnosticProcedureEdge = {
    __typename?: "DiagnosticProcedureEdge";
    node: DiagnosticProcedure;
};
export declare type DiagnosticProcedureFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type DiagnosticProcedureInput = {
    patientChartId: Scalars["ID"];
    diagnosticProcedureOrderId: Scalars["ID"];
    generalText?: InputMaybe<Scalars["String"]>;
    imageIds: Array<InputMaybe<Scalars["ID"]>>;
    rightEyeImageIds: Array<InputMaybe<Scalars["ID"]>>;
    leftEyeImageIds: Array<InputMaybe<Scalars["ID"]>>;
    rightEyeSketcheIds: Array<InputMaybe<Scalars["ID"]>>;
    leftEyeSketcheIds: Array<InputMaybe<Scalars["ID"]>>;
    documentIds: Array<InputMaybe<Scalars["ID"]>>;
    rightDistanceSubjectiveSph?: InputMaybe<Scalars["String"]>;
    leftDistanceSubjectiveSph?: InputMaybe<Scalars["String"]>;
    rightDistanceSubjectiveCyl?: InputMaybe<Scalars["String"]>;
    leftDistanceSubjectiveCyl?: InputMaybe<Scalars["String"]>;
    rightDistanceSubjectiveAxis?: InputMaybe<Scalars["String"]>;
    leftDistanceSubjectiveAxis?: InputMaybe<Scalars["String"]>;
    rightNearSubjectiveSph?: InputMaybe<Scalars["String"]>;
    leftNearSubjectiveSph?: InputMaybe<Scalars["String"]>;
    rightNearSubjectiveCyl?: InputMaybe<Scalars["String"]>;
    leftNearSubjectiveCyl?: InputMaybe<Scalars["String"]>;
    rightNearSubjectiveAxis?: InputMaybe<Scalars["String"]>;
    leftNearSubjectiveAxis?: InputMaybe<Scalars["String"]>;
    rightDistanceObjectiveSph?: InputMaybe<Scalars["String"]>;
    leftDistanceObjectiveSph?: InputMaybe<Scalars["String"]>;
    rightDistanceObjectiveCyl?: InputMaybe<Scalars["String"]>;
    leftDistanceObjectiveCyl?: InputMaybe<Scalars["String"]>;
    rightDistanceObjectiveAxis?: InputMaybe<Scalars["String"]>;
    leftDistanceObjectiveAxis?: InputMaybe<Scalars["String"]>;
    rightNearObjectiveSph?: InputMaybe<Scalars["String"]>;
    leftNearObjectiveSph?: InputMaybe<Scalars["String"]>;
    rightNearObjectiveCyl?: InputMaybe<Scalars["String"]>;
    leftNearObjectiveCyl?: InputMaybe<Scalars["String"]>;
    rightNearObjectiveAxis?: InputMaybe<Scalars["String"]>;
    leftNearObjectiveAxis?: InputMaybe<Scalars["String"]>;
    rightDistanceFinalSph?: InputMaybe<Scalars["String"]>;
    leftDistanceFinalSph?: InputMaybe<Scalars["String"]>;
    rightDistanceFinalCyl?: InputMaybe<Scalars["String"]>;
    leftDistanceFinalCyl?: InputMaybe<Scalars["String"]>;
    rightDistanceFinalAxis?: InputMaybe<Scalars["String"]>;
    leftDistanceFinalAxis?: InputMaybe<Scalars["String"]>;
    rightNearFinalSph?: InputMaybe<Scalars["String"]>;
    leftNearFinalSph?: InputMaybe<Scalars["String"]>;
    rightNearFinalCyl?: InputMaybe<Scalars["String"]>;
    leftNearFinalCyl?: InputMaybe<Scalars["String"]>;
    rightNearFinalAxis?: InputMaybe<Scalars["String"]>;
    leftNearFinalAxis?: InputMaybe<Scalars["String"]>;
    rightVisualAcuity?: InputMaybe<Scalars["String"]>;
    leftVisualAcuity?: InputMaybe<Scalars["String"]>;
    farPd?: InputMaybe<Scalars["String"]>;
    nearPd?: InputMaybe<Scalars["String"]>;
    orderId: Scalars["ID"];
};
export declare type DiagnosticProcedureOrder = {
    __typename?: "DiagnosticProcedureOrder";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    userName: Scalars["String"];
    orderedById?: Maybe<Scalars["ID"]>;
    orderedBy?: Maybe<User>;
    diagnosticProcedures: Array<DiagnosticProcedure>;
    status: DiagnosticProcedureOrderStatus;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type DiagnosticProcedureOrderConnection = Connection & {
    __typename?: "DiagnosticProcedureOrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<DiagnosticProcedureOrderEdge>;
};
export declare type DiagnosticProcedureOrderEdge = {
    __typename?: "DiagnosticProcedureOrderEdge";
    node: DiagnosticProcedureOrder;
};
export declare type DiagnosticProcedureOrderFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
    orderedById?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare enum DiagnosticProcedureOrderStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare type DiagnosticProcedureOrderUpdateInput = {
    id: Scalars["ID"];
    patientChartId?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    firstName?: InputMaybe<Scalars["String"]>;
    lastName?: InputMaybe<Scalars["String"]>;
    phoneNo?: InputMaybe<Scalars["String"]>;
    userName?: InputMaybe<Scalars["String"]>;
    orderedById?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<DiagnosticProcedureOrderStatus>;
    orderNote?: InputMaybe<Scalars["String"]>;
    receptionNote?: InputMaybe<Scalars["String"]>;
};
export declare enum DiagnosticProcedureStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare type DiagnosticProcedureType = {
    __typename?: "DiagnosticProcedureType";
    id: Scalars["ID"];
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billings: Array<Maybe<Billing>>;
};
export declare type DiagnosticProcedureTypeConnection = Connection & {
    __typename?: "DiagnosticProcedureTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<DiagnosticProcedureTypeEdge>>;
};
export declare type DiagnosticProcedureTypeEdge = {
    __typename?: "DiagnosticProcedureTypeEdge";
    node: DiagnosticProcedureType;
};
export declare type DiagnosticProcedureTypeInput = {
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billingIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare type DiagnosticProcedureTypeUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    active: Scalars["Boolean"];
    billingIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};
export declare type DiagnosticProcedureUpdateInput = {
    id: Scalars["ID"];
    generalText?: InputMaybe<Scalars["String"]>;
    images?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    documents?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    rightDistanceSubjectiveSph?: InputMaybe<Scalars["String"]>;
    leftDistanceSubjectiveSph?: InputMaybe<Scalars["String"]>;
    rightDistanceSubjectiveCyl?: InputMaybe<Scalars["String"]>;
    leftDistanceSubjectiveCyl?: InputMaybe<Scalars["String"]>;
    rightDistanceSubjectiveAxis?: InputMaybe<Scalars["String"]>;
    leftDistanceSubjectiveAxis?: InputMaybe<Scalars["String"]>;
    rightNearSubjectiveSph?: InputMaybe<Scalars["String"]>;
    leftNearSubjectiveSph?: InputMaybe<Scalars["String"]>;
    rightNearSubjectiveCyl?: InputMaybe<Scalars["String"]>;
    leftNearSubjectiveCyl?: InputMaybe<Scalars["String"]>;
    rightNearSubjectiveAxis?: InputMaybe<Scalars["String"]>;
    leftNearSubjectiveAxis?: InputMaybe<Scalars["String"]>;
    rightDistanceObjectiveSph?: InputMaybe<Scalars["String"]>;
    leftDistanceObjectiveSph?: InputMaybe<Scalars["String"]>;
    rightDistanceObjectiveCyl?: InputMaybe<Scalars["String"]>;
    leftDistanceObjectiveCyl?: InputMaybe<Scalars["String"]>;
    rightDistanceObjectiveAxis?: InputMaybe<Scalars["String"]>;
    leftDistanceObjectiveAxis?: InputMaybe<Scalars["String"]>;
    rightNearObjectiveSph?: InputMaybe<Scalars["String"]>;
    leftNearObjectiveSph?: InputMaybe<Scalars["String"]>;
    rightNearObjectiveCyl?: InputMaybe<Scalars["String"]>;
    leftNearObjectiveCyl?: InputMaybe<Scalars["String"]>;
    rightNearObjectiveAxis?: InputMaybe<Scalars["String"]>;
    leftNearObjectiveAxis?: InputMaybe<Scalars["String"]>;
    rightDistanceFinalSph?: InputMaybe<Scalars["String"]>;
    leftDistanceFinalSph?: InputMaybe<Scalars["String"]>;
    rightDistanceFinalCyl?: InputMaybe<Scalars["String"]>;
    leftDistanceFinalCyl?: InputMaybe<Scalars["String"]>;
    rightDistanceFinalAxis?: InputMaybe<Scalars["String"]>;
    leftDistanceFinalAxis?: InputMaybe<Scalars["String"]>;
    rightNearFinalSph?: InputMaybe<Scalars["String"]>;
    leftNearFinalSph?: InputMaybe<Scalars["String"]>;
    rightNearFinalCyl?: InputMaybe<Scalars["String"]>;
    leftNearFinalCyl?: InputMaybe<Scalars["String"]>;
    rightNearFinalAxis?: InputMaybe<Scalars["String"]>;
    leftNearFinalAxis?: InputMaybe<Scalars["String"]>;
    rightVisualAcuity?: InputMaybe<Scalars["String"]>;
    leftVisualAcuity?: InputMaybe<Scalars["String"]>;
    farPd?: InputMaybe<Scalars["String"]>;
    nearPd?: InputMaybe<Scalars["String"]>;
    status?: InputMaybe<DiagnosticProcedureStatus>;
};
export declare type Edge = {
    node: Room;
};
export declare type ExamCategory = {
    __typename?: "ExamCategory";
    id: Scalars["ID"];
    title: Scalars["String"];
    active: Scalars["Boolean"];
};
export declare type ExamCategoryConnection = Connection & {
    __typename?: "ExamCategoryConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<ExamCategoryEdge>;
};
export declare type ExamCategoryEdge = {
    __typename?: "ExamCategoryEdge";
    node: ExamCategory;
};
export declare type ExamCategoryInput = {
    title: Scalars["String"];
};
export declare type ExamCategoryUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
};
export declare type ExamFinding = {
    __typename?: "ExamFinding";
    id: Scalars["ID"];
    title: Scalars["String"];
    pertinence: Scalars["Boolean"];
    examCategoryId: Scalars["ID"];
    examCategory: ExamCategory;
};
export declare type ExamFindingConnection = Connection & {
    __typename?: "ExamFindingConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<ExamFindingEdge>;
};
export declare type ExamFindingEdge = {
    __typename?: "ExamFindingEdge";
    node: ExamFinding;
};
export declare type ExamFindingInput = {
    title: Scalars["String"];
    pertinence: Scalars["Boolean"];
    examCategoryId: Scalars["ID"];
};
export declare type ExamFindingUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    pertinence?: InputMaybe<Scalars["Boolean"]>;
    examCategoryId?: InputMaybe<Scalars["ID"]>;
};
export declare type EyewearPrescription = {
    __typename?: "EyewearPrescription";
    id: Scalars["ID"];
    eyewearPrescriptionOrderId: Scalars["ID"];
    glass?: Maybe<Scalars["Boolean"]>;
    plastic?: Maybe<Scalars["Boolean"]>;
    singleVision?: Maybe<Scalars["Boolean"]>;
    photoChromatic?: Maybe<Scalars["Boolean"]>;
    glareFree?: Maybe<Scalars["Boolean"]>;
    scratchResistant?: Maybe<Scalars["Boolean"]>;
    bifocal?: Maybe<Scalars["Boolean"]>;
    progressive?: Maybe<Scalars["Boolean"]>;
    twoSeparateGlasses?: Maybe<Scalars["Boolean"]>;
    highIndex?: Maybe<Scalars["Boolean"]>;
    tint?: Maybe<Scalars["Boolean"]>;
    blueCut?: Maybe<Scalars["Boolean"]>;
    prescribedDate?: Maybe<Scalars["Time"]>;
    history: Scalars["Boolean"];
    status: Scalars["String"];
};
export declare type EyewearPrescriptionConnection = Connection & {
    __typename?: "EyewearPrescriptionConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<EyewearPrescriptionEdge>>;
};
export declare type EyewearPrescriptionEdge = {
    __typename?: "EyewearPrescriptionEdge";
    node: EyewearPrescription;
};
export declare type EyewearPrescriptionFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
    history?: InputMaybe<Scalars["Boolean"]>;
};
export declare type EyewearPrescriptionInput = {
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    glass?: InputMaybe<Scalars["Boolean"]>;
    plastic?: InputMaybe<Scalars["Boolean"]>;
    singleVision?: InputMaybe<Scalars["Boolean"]>;
    photoChromatic?: InputMaybe<Scalars["Boolean"]>;
    glareFree?: InputMaybe<Scalars["Boolean"]>;
    scratchResistant?: InputMaybe<Scalars["Boolean"]>;
    bifocal?: InputMaybe<Scalars["Boolean"]>;
    progressive?: InputMaybe<Scalars["Boolean"]>;
    twoSeparateGlasses?: InputMaybe<Scalars["Boolean"]>;
    highIndex?: InputMaybe<Scalars["Boolean"]>;
    tint?: InputMaybe<Scalars["Boolean"]>;
    blueCut?: InputMaybe<Scalars["Boolean"]>;
    prescribedDate?: InputMaybe<Scalars["Time"]>;
    history: Scalars["Boolean"];
    eyewearShopId: Scalars["ID"];
    status?: InputMaybe<Scalars["String"]>;
};
export declare type EyewearPrescriptionOrder = {
    __typename?: "EyewearPrescriptionOrder";
    id: Scalars["ID"];
    eyewearShopId: Scalars["ID"];
    eyewearShop: EyewearShop;
    patientChartId: Scalars["ID"];
    orderedById?: Maybe<Scalars["ID"]>;
    orderedBy?: Maybe<User>;
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    userName: Scalars["String"];
    status: Scalars["String"];
    eyewearPrescriptions: Array<Maybe<EyewearPrescription>>;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type EyewearPrescriptionOrderConnection = Connection & {
    __typename?: "EyewearPrescriptionOrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<EyewearPrescriptionOrderEdge>;
};
export declare type EyewearPrescriptionOrderEdge = {
    __typename?: "EyewearPrescriptionOrderEdge";
    node: EyewearPrescriptionOrder;
};
export declare type EyewearPrescriptionOrderUpdateInput = {
    id: Scalars["ID"];
    pharmacyId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare type EyewearPrescriptionUpdateInput = {
    id: Scalars["ID"];
    glass?: InputMaybe<Scalars["Boolean"]>;
    plastic?: InputMaybe<Scalars["Boolean"]>;
    singleVision?: InputMaybe<Scalars["Boolean"]>;
    photoChromatic?: InputMaybe<Scalars["Boolean"]>;
    glareFree?: InputMaybe<Scalars["Boolean"]>;
    scratchResistant?: InputMaybe<Scalars["Boolean"]>;
    bifocal?: InputMaybe<Scalars["Boolean"]>;
    progressive?: InputMaybe<Scalars["Boolean"]>;
    twoSeparateGlasses?: InputMaybe<Scalars["Boolean"]>;
    highIndex?: InputMaybe<Scalars["Boolean"]>;
    tint?: InputMaybe<Scalars["Boolean"]>;
    blueCut?: InputMaybe<Scalars["Boolean"]>;
    prescribedDate?: InputMaybe<Scalars["Time"]>;
    history?: InputMaybe<Scalars["Boolean"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare type EyewearShop = {
    __typename?: "EyewearShop";
    id: Scalars["ID"];
    title: Scalars["String"];
    address: Scalars["String"];
    region: Scalars["String"];
    country: Scalars["String"];
    phone: Scalars["String"];
    inHouse: Scalars["Boolean"];
    active: Scalars["Boolean"];
};
export declare type EyewearShopConnection = Connection & {
    __typename?: "EyewearShopConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<EyewearShopEdge>>;
};
export declare type EyewearShopEdge = {
    __typename?: "EyewearShopEdge";
    node: EyewearShop;
};
export declare type EyewearShopInput = {
    title: Scalars["String"];
    address: Scalars["String"];
    region: Scalars["String"];
    country: Scalars["String"];
    phone: Scalars["String"];
    inHouse: Scalars["Boolean"];
    active: Scalars["Boolean"];
};
export declare type EyewearShopUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    address?: InputMaybe<Scalars["String"]>;
    region?: InputMaybe<Scalars["String"]>;
    country?: InputMaybe<Scalars["String"]>;
    phone?: InputMaybe<Scalars["String"]>;
    inHouse?: InputMaybe<Scalars["Boolean"]>;
    active?: InputMaybe<Scalars["Boolean"]>;
};
export declare type FamilyIllness = {
    __typename?: "FamilyIllness";
    id: Scalars["ID"];
    title: Scalars["String"];
    description: Scalars["String"];
    patientHistoryId: Scalars["ID"];
};
export declare type FamilyIllnessInput = {
    title: Scalars["String"];
    description: Scalars["String"];
    patientHistoryId: Scalars["ID"];
};
export declare type FamilyIllnessUpdateInput = {
    id: Scalars["ID"];
    description?: InputMaybe<Scalars["String"]>;
    title?: InputMaybe<Scalars["String"]>;
};
export declare type FavoriteChiefComplaint = {
    __typename?: "FavoriteChiefComplaint";
    id: Scalars["ID"];
    chiefComplaintTypeId: Scalars["ID"];
    chiefComplaintType: ChiefComplaintType;
    userId: Scalars["ID"];
    user: User;
};
export declare type FavoriteDiagnosis = {
    __typename?: "FavoriteDiagnosis";
    id: Scalars["ID"];
    diagnosisId: Scalars["ID"];
    diagnosis: Diagnosis;
    userId: Scalars["ID"];
    user: User;
};
export declare type FavoriteMedication = {
    __typename?: "FavoriteMedication";
    id: Scalars["ID"];
    medication: Scalars["String"];
    rxCui?: Maybe<Scalars["String"]>;
    synonym?: Maybe<Scalars["String"]>;
    tty?: Maybe<Scalars["String"]>;
    language?: Maybe<Scalars["String"]>;
    sig: Scalars["String"];
    refill: Scalars["Int"];
    generic: Scalars["Boolean"];
    substitutionAllowed: Scalars["Boolean"];
    directionToPatient: Scalars["String"];
    userId: Scalars["ID"];
    user: User;
};
export declare type FavoriteMedicationConnection = Connection & {
    __typename?: "FavoriteMedicationConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<FavoriteMedicationEdge>>;
};
export declare type FavoriteMedicationEdge = {
    __typename?: "FavoriteMedicationEdge";
    node: FavoriteMedication;
};
export declare type FavoriteMedicationFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    medication?: InputMaybe<Scalars["String"]>;
    userId?: InputMaybe<Scalars["ID"]>;
};
export declare type FavoriteMedicationInput = {
    medication?: InputMaybe<Scalars["String"]>;
    sig?: InputMaybe<Scalars["String"]>;
    refill?: InputMaybe<Scalars["Int"]>;
    rxCui?: InputMaybe<Scalars["String"]>;
    synonym?: InputMaybe<Scalars["String"]>;
    tty?: InputMaybe<Scalars["String"]>;
    language?: InputMaybe<Scalars["String"]>;
    generic?: InputMaybe<Scalars["Boolean"]>;
    substitutionAllowed?: InputMaybe<Scalars["Boolean"]>;
    directionToPatient?: InputMaybe<Scalars["String"]>;
};
export declare type FavoriteMedicationUpdateInput = {
    id: Scalars["ID"];
    medication?: InputMaybe<Scalars["String"]>;
    sig?: InputMaybe<Scalars["String"]>;
    refill?: InputMaybe<Scalars["Int"]>;
    rxCui?: InputMaybe<Scalars["String"]>;
    synonym?: InputMaybe<Scalars["String"]>;
    tty?: InputMaybe<Scalars["String"]>;
    language?: InputMaybe<Scalars["String"]>;
    generic?: InputMaybe<Scalars["Boolean"]>;
    substitutionAllowed?: InputMaybe<Scalars["Boolean"]>;
    directionToPatient?: InputMaybe<Scalars["String"]>;
};
export declare type File = {
    __typename?: "File";
    id: Scalars["ID"];
    contentType: Scalars["String"];
    fileName: Scalars["String"];
    extension: Scalars["String"];
    hash: Scalars["String"];
    size: Scalars["Int"];
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type FileConnection = Connection & {
    __typename?: "FileConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<FileEdge>>;
};
export declare type FileEdge = {
    __typename?: "FileEdge";
    node: File;
};
export declare type FileInput = {
    contentType: Scalars["String"];
    fileName: Scalars["String"];
    size: Scalars["Int"];
};
export declare type FileUpdateInput = {
    id: Scalars["ID"];
    fileName: Scalars["String"];
};
export declare type FileUpload = {
    file: Scalars["Upload"];
    name: Scalars["String"];
};
export declare type FollowUp = {
    __typename?: "FollowUp";
    id: Scalars["ID"];
    followUpOrderId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    receptionNote: Scalars["String"];
    status: FollowUpStatus;
};
export declare type FollowUpConnection = Connection & {
    __typename?: "FollowUpConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<FollowUpEdge>;
};
export declare type FollowUpEdge = {
    __typename?: "FollowUpEdge";
    node: FollowUp;
};
export declare type FollowUpFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type FollowUpInput = {
    followUpOrderId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    status: FollowUpStatus;
};
export declare type FollowUpOrder = {
    __typename?: "FollowUpOrder";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    userName: Scalars["String"];
    orderedById?: Maybe<Scalars["ID"]>;
    orderedBy?: Maybe<User>;
    followUps: Array<FollowUp>;
    status: FollowUpOrderStatus;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type FollowUpOrderConnection = Connection & {
    __typename?: "FollowUpOrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<FollowUpOrderEdge>;
};
export declare type FollowUpOrderEdge = {
    __typename?: "FollowUpOrderEdge";
    node: FollowUpOrder;
};
export declare type FollowUpOrderFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
    orderedById?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare enum FollowUpOrderStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare enum FollowUpStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare type FollowUpUpdateInput = {
    id: Scalars["ID"];
    status?: InputMaybe<FollowUpStatus>;
};
export declare type HealthCheckReport = {
    __typename?: "HealthCheckReport";
    health: Scalars["String"];
    db: Scalars["Boolean"];
};
export declare type HomeStats = {
    __typename?: "HomeStats";
    scheduled: Scalars["Int"];
    checkedIn: Scalars["Int"];
    checkedOut: Scalars["Int"];
};
export declare type HpiComponent = {
    __typename?: "HpiComponent";
    id: Scalars["ID"];
    title: Scalars["String"];
    hpiComponentTypeId: Scalars["ID"];
    hpiComponentType: HpiComponentType;
};
export declare type HpiComponentConnection = Connection & {
    __typename?: "HpiComponentConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<HpiComponentEdge>>;
};
export declare type HpiComponentEdge = {
    __typename?: "HpiComponentEdge";
    node: HpiComponent;
};
export declare type HpiComponentInput = {
    title: Scalars["String"];
    hpiComponentTypeId: Scalars["ID"];
};
export declare type HpiComponentType = {
    __typename?: "HpiComponentType";
    id: Scalars["ID"];
    title: Scalars["String"];
    description: Scalars["String"];
};
export declare type HpiComponentTypeConnection = Connection & {
    __typename?: "HpiComponentTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<HpiComponentTypeEdge>>;
};
export declare type HpiComponentTypeEdge = {
    __typename?: "HpiComponentTypeEdge";
    node: HpiComponentType;
};
export declare type HpiComponentTypeInput = {
    title: Scalars["String"];
    description: Scalars["String"];
};
export declare type HpiComponentTypeOrder = {
    field: Scalars["String"];
    direction: OrderDirection;
};
export declare type HpiComponentTypeUpdateInput = {
    id: Scalars["ID"];
    title: Scalars["String"];
    description: Scalars["String"];
};
export declare type HpiComponentUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    hpiComponentTypeId?: InputMaybe<Scalars["ID"]>;
};
export declare type HpiFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    title?: InputMaybe<Scalars["String"]>;
    hpiComponentTypeId?: InputMaybe<Scalars["ID"]>;
};
export declare type Lab = {
    __typename?: "Lab";
    id: Scalars["ID"];
    labOrderId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    cbcWbcActive?: Maybe<Scalars["Boolean"]>;
    cbcWbcResults?: Maybe<Scalars["String"]>;
    cbcWbcDate?: Maybe<Scalars["Time"]>;
    cbcHgbActive?: Maybe<Scalars["Boolean"]>;
    cbcHgbResults?: Maybe<Scalars["String"]>;
    cbcHgbDate?: Maybe<Scalars["Time"]>;
    cbcHctActive?: Maybe<Scalars["Boolean"]>;
    cbcHctResults?: Maybe<Scalars["String"]>;
    cbcHctDate?: Maybe<Scalars["Time"]>;
    cbcEsrActive?: Maybe<Scalars["Boolean"]>;
    cbcEsrResults?: Maybe<Scalars["String"]>;
    cbcEsrDate?: Maybe<Scalars["Time"]>;
    cbcBloodGroupActive?: Maybe<Scalars["Boolean"]>;
    cbcBloodGroupResults?: Maybe<Scalars["String"]>;
    cbcBloodGroupDate?: Maybe<Scalars["Time"]>;
    cbcRhActive?: Maybe<Scalars["Boolean"]>;
    cbcRhResults?: Maybe<Scalars["String"]>;
    cbcRhDate?: Maybe<Scalars["Time"]>;
    cbcBloodFilmActive?: Maybe<Scalars["Boolean"]>;
    cbcBloodFilmResults?: Maybe<Scalars["String"]>;
    cbcBloodFilmDate?: Maybe<Scalars["Time"]>;
    cbcPltActive?: Maybe<Scalars["Boolean"]>;
    cbcPltResults?: Maybe<Scalars["String"]>;
    cbcPltDate?: Maybe<Scalars["Time"]>;
    liverCoagulationPtActive?: Maybe<Scalars["Boolean"]>;
    liverCoagulationPtResults?: Maybe<Scalars["String"]>;
    liverCoagulationPtDate?: Maybe<Scalars["Time"]>;
    liverCoagulationPttActive?: Maybe<Scalars["Boolean"]>;
    liverCoagulationPttResults?: Maybe<Scalars["String"]>;
    liverCoagulationPttDate?: Maybe<Scalars["Time"]>;
    liverCoagulationInrActive?: Maybe<Scalars["Boolean"]>;
    liverCoagulationInrResults?: Maybe<Scalars["String"]>;
    liverCoagulationInrDate?: Maybe<Scalars["Time"]>;
    liverAstsgotActive?: Maybe<Scalars["Boolean"]>;
    liverAstsgotResults?: Maybe<Scalars["String"]>;
    liverAstsgotDate?: Maybe<Scalars["Time"]>;
    liverAltsgptActive?: Maybe<Scalars["Boolean"]>;
    liverAltsgptResults?: Maybe<Scalars["String"]>;
    liverAltsgptDate?: Maybe<Scalars["Time"]>;
    liverAlpActive?: Maybe<Scalars["Boolean"]>;
    liverAlpResults?: Maybe<Scalars["String"]>;
    liverAlpDate?: Maybe<Scalars["Time"]>;
    renalCrActive?: Maybe<Scalars["Boolean"]>;
    renalCrResults?: Maybe<Scalars["String"]>;
    renalCrDate?: Maybe<Scalars["Time"]>;
    renalBunActive?: Maybe<Scalars["Boolean"]>;
    renalBunResults?: Maybe<Scalars["String"]>;
    renalBunDate?: Maybe<Scalars["Time"]>;
    thyroidFreeT3Active?: Maybe<Scalars["Boolean"]>;
    thyroidFreeT3Results?: Maybe<Scalars["String"]>;
    thyroidFreeT3Date?: Maybe<Scalars["Time"]>;
    thyroidTotalT4Active?: Maybe<Scalars["Boolean"]>;
    thyroidTotalT4Results?: Maybe<Scalars["String"]>;
    thyroidTotalT4Date?: Maybe<Scalars["Time"]>;
    thyroidTshActive?: Maybe<Scalars["Boolean"]>;
    thyroidTshResults?: Maybe<Scalars["String"]>;
    thyroidTshDate?: Maybe<Scalars["Time"]>;
    electrolytesNaPlusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesNaPlusResults?: Maybe<Scalars["String"]>;
    electrolytesNaPlusDate?: Maybe<Scalars["Time"]>;
    electrolytesKPlusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesKPlusResults?: Maybe<Scalars["String"]>;
    electrolytesKPlusDate?: Maybe<Scalars["Time"]>;
    electrolytesClMinusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesClMinusResults?: Maybe<Scalars["String"]>;
    electrolytesClMinusDate?: Maybe<Scalars["Time"]>;
    electrolytesCa2PlusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesCa2PlusResults?: Maybe<Scalars["String"]>;
    electrolytesCa2PlusDate?: Maybe<Scalars["Time"]>;
    electrolytesMg2PlusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesMg2PlusResults?: Maybe<Scalars["String"]>;
    electrolytesMg2PlusDate?: Maybe<Scalars["Time"]>;
    electrolytesPMinusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesPMinusResults?: Maybe<Scalars["String"]>;
    electrolytesPMinusDate?: Maybe<Scalars["Time"]>;
    stoolConsistencyActive?: Maybe<Scalars["Boolean"]>;
    stoolConsistencyResults?: Maybe<Scalars["String"]>;
    stoolConsistencyDate?: Maybe<Scalars["Time"]>;
    stoolOpActive?: Maybe<Scalars["Boolean"]>;
    stoolOpResults?: Maybe<Scalars["String"]>;
    stoolOpDate?: Maybe<Scalars["Time"]>;
    stoolConcentrationActive?: Maybe<Scalars["Boolean"]>;
    stoolConcentrationResults?: Maybe<Scalars["String"]>;
    stoolConcentrationDate?: Maybe<Scalars["Time"]>;
    stoolOccultBloodActive?: Maybe<Scalars["Boolean"]>;
    stoolOccultBloodResults?: Maybe<Scalars["String"]>;
    stoolOccultBloodDate?: Maybe<Scalars["Time"]>;
    microscopyEpitCellsActive?: Maybe<Scalars["Boolean"]>;
    microscopyEpitCellsResults?: Maybe<Scalars["String"]>;
    microscopyEpitCellsDate?: Maybe<Scalars["Time"]>;
    microscopyWbcActive?: Maybe<Scalars["Boolean"]>;
    microscopyWbcResults?: Maybe<Scalars["String"]>;
    microscopyWbcDate?: Maybe<Scalars["Time"]>;
    microscopyRbcActive?: Maybe<Scalars["Boolean"]>;
    microscopyRbcResults?: Maybe<Scalars["String"]>;
    microscopyRbcDate?: Maybe<Scalars["Time"]>;
    microscopyCastsActive?: Maybe<Scalars["Boolean"]>;
    microscopyCastsResults?: Maybe<Scalars["String"]>;
    microscopyCastsDate?: Maybe<Scalars["Time"]>;
    microscopyCrystalsActive?: Maybe<Scalars["Boolean"]>;
    microscopyCrystalsResults?: Maybe<Scalars["String"]>;
    microscopyCrystalsDate?: Maybe<Scalars["Time"]>;
    microscopyBacteriaActive?: Maybe<Scalars["Boolean"]>;
    microscopyBacteriaResults?: Maybe<Scalars["String"]>;
    microscopyBacteriaDate?: Maybe<Scalars["Time"]>;
    microscopyHcgActive?: Maybe<Scalars["Boolean"]>;
    microscopyHcgResults?: Maybe<Scalars["String"]>;
    microscopyHcgDate?: Maybe<Scalars["Time"]>;
    urinalysisColorActive?: Maybe<Scalars["Boolean"]>;
    urinalysisColorResults?: Maybe<Scalars["String"]>;
    urinalysisColorDate?: Maybe<Scalars["Time"]>;
    urinalysisAppearanceActive?: Maybe<Scalars["Boolean"]>;
    urinalysisAppearanceResults?: Maybe<Scalars["String"]>;
    urinalysisAppearanceDate?: Maybe<Scalars["Time"]>;
    urinalysisPhActive?: Maybe<Scalars["Boolean"]>;
    urinalysisPhResults?: Maybe<Scalars["String"]>;
    urinalysisPhDate?: Maybe<Scalars["Time"]>;
    urinalysisSgActive?: Maybe<Scalars["Boolean"]>;
    urinalysisSgResults?: Maybe<Scalars["String"]>;
    urinalysisSgDate?: Maybe<Scalars["Time"]>;
    urinalysisProteinActive?: Maybe<Scalars["Boolean"]>;
    urinalysisProteinResults?: Maybe<Scalars["String"]>;
    urinalysisProteinDate?: Maybe<Scalars["Time"]>;
    urinalysisGlucoseActive?: Maybe<Scalars["Boolean"]>;
    urinalysisGlucoseResults?: Maybe<Scalars["String"]>;
    urinalysisGlucoseDate?: Maybe<Scalars["Time"]>;
    urinalysisLeukocyteActive?: Maybe<Scalars["Boolean"]>;
    urinalysisLeukocyteResults?: Maybe<Scalars["String"]>;
    urinalysisLeukocyteDate?: Maybe<Scalars["Time"]>;
    urinalysisKetoneActive?: Maybe<Scalars["Boolean"]>;
    urinalysisKetoneResults?: Maybe<Scalars["String"]>;
    urinalysisKetoneDate?: Maybe<Scalars["Time"]>;
    urinalysisBilirubinActive?: Maybe<Scalars["Boolean"]>;
    urinalysisBilirubinResults?: Maybe<Scalars["String"]>;
    urinalysisBilirubinDate?: Maybe<Scalars["Time"]>;
    urinalysisUrobilingenActive?: Maybe<Scalars["Boolean"]>;
    urinalysisUrobilingenResults?: Maybe<Scalars["String"]>;
    urinalysisUrobilingenDate?: Maybe<Scalars["Time"]>;
    urinalysisBloodActive?: Maybe<Scalars["Boolean"]>;
    urinalysisBloodResults?: Maybe<Scalars["String"]>;
    urinalysisBloodDate?: Maybe<Scalars["Time"]>;
    serologyVdrlActive?: Maybe<Scalars["Boolean"]>;
    serologyVdrlResults?: Maybe<Scalars["String"]>;
    serologyVdrlDate?: Maybe<Scalars["Time"]>;
    serologyWidalHActive?: Maybe<Scalars["Boolean"]>;
    serologyWidalHResults?: Maybe<Scalars["String"]>;
    serologyWidalHDate?: Maybe<Scalars["Time"]>;
    serologyWidalOActive?: Maybe<Scalars["Boolean"]>;
    serologyWidalOResults?: Maybe<Scalars["String"]>;
    serologyWidalODate?: Maybe<Scalars["Time"]>;
    serologyWeilFelixActive?: Maybe<Scalars["Boolean"]>;
    serologyWeilFelixResults?: Maybe<Scalars["String"]>;
    serologyWeilFelixDate?: Maybe<Scalars["Time"]>;
    serologyHbsAgActive?: Maybe<Scalars["Boolean"]>;
    serologyHbsAgResults?: Maybe<Scalars["String"]>;
    serologyHbsAgDate?: Maybe<Scalars["Time"]>;
    serologyHcvAbActive?: Maybe<Scalars["Boolean"]>;
    serologyHcvAbResults?: Maybe<Scalars["String"]>;
    serologyHcvAbDate?: Maybe<Scalars["Time"]>;
    serologyAsoActive?: Maybe<Scalars["Boolean"]>;
    serologyAsoResults?: Maybe<Scalars["String"]>;
    serologyAsoDate?: Maybe<Scalars["Time"]>;
    serologyRfActive?: Maybe<Scalars["Boolean"]>;
    serologyRfResults?: Maybe<Scalars["String"]>;
    serologyRfDate?: Maybe<Scalars["Time"]>;
    serologyHpayloryAgActive?: Maybe<Scalars["Boolean"]>;
    serologyHpayloryAgResults?: Maybe<Scalars["String"]>;
    serologyHpayloryAgDate?: Maybe<Scalars["Time"]>;
    serologyHpyloryAbActive?: Maybe<Scalars["Boolean"]>;
    serologyHpyloryAbResults?: Maybe<Scalars["String"]>;
    serologyHpyloryAbDate?: Maybe<Scalars["Time"]>;
    bacterologySampleActive?: Maybe<Scalars["Boolean"]>;
    bacterologySampleResults?: Maybe<Scalars["String"]>;
    bacterologySampleDate?: Maybe<Scalars["Time"]>;
    bacterologyKohActive?: Maybe<Scalars["Boolean"]>;
    bacterologyKohResults?: Maybe<Scalars["String"]>;
    bacterologyKohDate?: Maybe<Scalars["Time"]>;
    bacterologyGramStainActive?: Maybe<Scalars["Boolean"]>;
    bacterologyGramStainResults?: Maybe<Scalars["String"]>;
    bacterologyGramStainDate?: Maybe<Scalars["Time"]>;
    bacterologyWetFilmActive?: Maybe<Scalars["Boolean"]>;
    bacterologyWetFilmResults?: Maybe<Scalars["String"]>;
    bacterologyWetFilmDate?: Maybe<Scalars["Time"]>;
    bacterologyAfb1Active?: Maybe<Scalars["Boolean"]>;
    bacterologyAfb1Results?: Maybe<Scalars["String"]>;
    bacterologyAfb1Date?: Maybe<Scalars["Time"]>;
    bacterologyAfb2Active?: Maybe<Scalars["Boolean"]>;
    bacterologyAfb2Results?: Maybe<Scalars["String"]>;
    bacterologyAfb2Date?: Maybe<Scalars["Time"]>;
    bacterologyAfb3Active?: Maybe<Scalars["Boolean"]>;
    bacterologyAfb3Results?: Maybe<Scalars["String"]>;
    bacterologyAfb3Date?: Maybe<Scalars["Time"]>;
    bacterologyCultureActive?: Maybe<Scalars["Boolean"]>;
    bacterologyCultureResults?: Maybe<Scalars["String"]>;
    bacterologyCultureDate?: Maybe<Scalars["Time"]>;
    chemistryFbsRbsActive?: Maybe<Scalars["Boolean"]>;
    chemistryFbsRbsResults?: Maybe<Scalars["String"]>;
    chemistryFbsRbsDate?: Maybe<Scalars["Time"]>;
    chemistrySgotActive?: Maybe<Scalars["Boolean"]>;
    chemistrySgotResults?: Maybe<Scalars["String"]>;
    chemistrySgotDate?: Maybe<Scalars["Time"]>;
    chemistrySgptActive?: Maybe<Scalars["Boolean"]>;
    chemistrySgptResults?: Maybe<Scalars["String"]>;
    chemistrySgptDate?: Maybe<Scalars["Time"]>;
    chemistryAlkalinePhosphatesActive?: Maybe<Scalars["Boolean"]>;
    chemistryAlkalinePhosphatesResults?: Maybe<Scalars["String"]>;
    chemistryAlkalinePhosphatesDate?: Maybe<Scalars["Time"]>;
    chemistryBilirubinTotalActive?: Maybe<Scalars["Boolean"]>;
    chemistryBilirubinTotalResults?: Maybe<Scalars["String"]>;
    chemistryBilirubinTotalDate?: Maybe<Scalars["Time"]>;
    chemistryBilirubinDirectActive?: Maybe<Scalars["Boolean"]>;
    chemistryBilirubinDirectResults?: Maybe<Scalars["String"]>;
    chemistryBilirubinDirectDate?: Maybe<Scalars["Time"]>;
    chemistryUreaActive?: Maybe<Scalars["Boolean"]>;
    chemistryUreaResults?: Maybe<Scalars["String"]>;
    chemistryUreaDate?: Maybe<Scalars["Time"]>;
    chemistryBunActive?: Maybe<Scalars["Boolean"]>;
    chemistryBunResults?: Maybe<Scalars["String"]>;
    chemistryBunDate?: Maybe<Scalars["Time"]>;
    chemistryCreatnineActive?: Maybe<Scalars["Boolean"]>;
    chemistryCreatnineResults?: Maybe<Scalars["String"]>;
    chemistryCreatnineDate?: Maybe<Scalars["Time"]>;
    chemistryUricAcidActive?: Maybe<Scalars["Boolean"]>;
    chemistryUricAcidResults?: Maybe<Scalars["String"]>;
    chemistryUricAcidDate?: Maybe<Scalars["Time"]>;
    chemistryTotalProteinActive?: Maybe<Scalars["Boolean"]>;
    chemistryTotalProteinResults?: Maybe<Scalars["String"]>;
    chemistryTotalProteinDate?: Maybe<Scalars["Time"]>;
    chemistryTriglyceridesActive?: Maybe<Scalars["Boolean"]>;
    chemistryTriglyceridesResults?: Maybe<Scalars["String"]>;
    chemistryTriglyceridesDate?: Maybe<Scalars["Time"]>;
    chemistryCholestrolActive?: Maybe<Scalars["Boolean"]>;
    chemistryCholestrolResults?: Maybe<Scalars["String"]>;
    chemistryCholestrolDate?: Maybe<Scalars["Time"]>;
    chemistryHdlActive?: Maybe<Scalars["Boolean"]>;
    chemistryHdlResults?: Maybe<Scalars["String"]>;
    chemistryHdlDate?: Maybe<Scalars["Time"]>;
    chemistryLdlActive?: Maybe<Scalars["Boolean"]>;
    chemistryLdlResults?: Maybe<Scalars["String"]>;
    chemistryLdlDate?: Maybe<Scalars["Time"]>;
    rightEyeText?: Maybe<Scalars["String"]>;
    leftEyeText?: Maybe<Scalars["String"]>;
    generalText?: Maybe<Scalars["String"]>;
    rightEyeImages: Array<Maybe<File>>;
    leftEyeImages: Array<Maybe<File>>;
    rightEyeSketches: Array<Maybe<File>>;
    leftEyeSketches: Array<Maybe<File>>;
    images: Array<Maybe<File>>;
    documents: Array<Maybe<File>>;
    labTypeId?: Maybe<Scalars["ID"]>;
    labType: LabType;
    labTypeTitle: Scalars["String"];
    status: LabStatus;
    payments: Array<Payment>;
    orderNote: Scalars["String"];
    receptionNote: Scalars["String"];
    createdAt: Scalars["Time"];
};
export declare type LabConnection = Connection & {
    __typename?: "LabConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<LabEdge>>;
};
export declare type LabDeleteFileInput = {
    labId: Scalars["ID"];
    fileId: Scalars["ID"];
};
export declare type LabEdge = {
    __typename?: "LabEdge";
    node: Lab;
};
export declare type LabFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type LabInput = {
    patientChartId: Scalars["ID"];
    labOrderId: Scalars["ID"];
    cbcWbcActive?: InputMaybe<Scalars["Boolean"]>;
    cbcWbcResults?: InputMaybe<Scalars["String"]>;
    cbcWbcDate?: InputMaybe<Scalars["Time"]>;
    cbcHgbActive?: InputMaybe<Scalars["Boolean"]>;
    cbcHgbResults?: InputMaybe<Scalars["String"]>;
    cbcHgbDate?: InputMaybe<Scalars["Time"]>;
    cbcHctActive?: InputMaybe<Scalars["Boolean"]>;
    cbcHctResults?: InputMaybe<Scalars["String"]>;
    cbcHctDate?: InputMaybe<Scalars["Time"]>;
    cbcEsrActive?: InputMaybe<Scalars["Boolean"]>;
    cbcEsrResults?: InputMaybe<Scalars["String"]>;
    cbcEsrDate?: InputMaybe<Scalars["Time"]>;
    cbcBloodGroupActive?: InputMaybe<Scalars["Boolean"]>;
    cbcBloodGroupResults?: InputMaybe<Scalars["String"]>;
    cbcBloodGroupDate?: InputMaybe<Scalars["Time"]>;
    cbcRhActive?: InputMaybe<Scalars["Boolean"]>;
    cbcRhResults?: InputMaybe<Scalars["String"]>;
    cbcRhDate?: InputMaybe<Scalars["Time"]>;
    cbcBloodFilmActive?: InputMaybe<Scalars["Boolean"]>;
    cbcBloodFilmResults?: InputMaybe<Scalars["String"]>;
    cbcBloodFilmDate?: InputMaybe<Scalars["Time"]>;
    cbcPltActive?: InputMaybe<Scalars["Boolean"]>;
    cbcPltResults?: InputMaybe<Scalars["String"]>;
    cbcPltDate?: InputMaybe<Scalars["Time"]>;
    liverCoagulationPtActive?: InputMaybe<Scalars["Boolean"]>;
    liverCoagulationPtResults?: InputMaybe<Scalars["String"]>;
    liverCoagulationPtDate?: InputMaybe<Scalars["Time"]>;
    liverCoagulationPttActive?: InputMaybe<Scalars["Boolean"]>;
    liverCoagulationPttResults?: InputMaybe<Scalars["String"]>;
    liverCoagulationPttDate?: InputMaybe<Scalars["Time"]>;
    liverCoagulationInrActive?: InputMaybe<Scalars["Boolean"]>;
    liverCoagulationInrResults?: InputMaybe<Scalars["String"]>;
    liverCoagulationInrDate?: InputMaybe<Scalars["Time"]>;
    liverAstsgotActive?: InputMaybe<Scalars["Boolean"]>;
    liverAstsgotResults?: InputMaybe<Scalars["String"]>;
    liverAstsgotDate?: InputMaybe<Scalars["Time"]>;
    liverAltsgptActive?: InputMaybe<Scalars["Boolean"]>;
    liverAltsgptResults?: InputMaybe<Scalars["String"]>;
    liverAltsgptDate?: InputMaybe<Scalars["Time"]>;
    liverAlpActive?: InputMaybe<Scalars["Boolean"]>;
    liverAlpResults?: InputMaybe<Scalars["String"]>;
    liverAlpDate?: InputMaybe<Scalars["Time"]>;
    renalCrActive?: InputMaybe<Scalars["Boolean"]>;
    renalCrResults?: InputMaybe<Scalars["String"]>;
    renalCrDate?: InputMaybe<Scalars["Time"]>;
    renalBunActive?: InputMaybe<Scalars["Boolean"]>;
    renalBunResults?: InputMaybe<Scalars["String"]>;
    renalBunDate?: InputMaybe<Scalars["Time"]>;
    thyroidFreeT3Active?: InputMaybe<Scalars["Boolean"]>;
    thyroidFreeT3Results?: InputMaybe<Scalars["String"]>;
    thyroidFreeT3Date?: InputMaybe<Scalars["Time"]>;
    thyroidTotalT4Active?: InputMaybe<Scalars["Boolean"]>;
    thyroidTotalT4Results?: InputMaybe<Scalars["String"]>;
    thyroidTotalT4Date?: InputMaybe<Scalars["Time"]>;
    thyroidTshActive?: InputMaybe<Scalars["Boolean"]>;
    thyroidTshResults?: InputMaybe<Scalars["String"]>;
    thyroidTshDate?: InputMaybe<Scalars["Time"]>;
    electrolytesNaPlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesNaPlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesNaPlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesKPlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesKPlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesKPlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesClMinusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesClMinusResults?: InputMaybe<Scalars["String"]>;
    electrolytesClMinusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesCa2PlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesCa2PlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesCa2PlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesMg2PlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesMg2PlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesMg2PlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesPMinusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesPMinusResults?: InputMaybe<Scalars["String"]>;
    electrolytesPMinusDate?: InputMaybe<Scalars["Time"]>;
    stoolConsistencyActive?: InputMaybe<Scalars["Boolean"]>;
    stoolConsistencyResults?: InputMaybe<Scalars["String"]>;
    stoolConsistencyDate?: InputMaybe<Scalars["Time"]>;
    stoolOpActive?: InputMaybe<Scalars["Boolean"]>;
    stoolOpResults?: InputMaybe<Scalars["String"]>;
    stoolOpDate?: InputMaybe<Scalars["Time"]>;
    stoolConcentrationActive?: InputMaybe<Scalars["Boolean"]>;
    stoolConcentrationResults?: InputMaybe<Scalars["String"]>;
    stoolConcentrationDate?: InputMaybe<Scalars["Time"]>;
    stoolOccultBloodActive?: InputMaybe<Scalars["Boolean"]>;
    stoolOccultBloodResults?: InputMaybe<Scalars["String"]>;
    stoolOccultBloodDate?: InputMaybe<Scalars["Time"]>;
    microscopyEpitCellsActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyEpitCellsResults?: InputMaybe<Scalars["String"]>;
    microscopyEpitCellsDate?: InputMaybe<Scalars["Time"]>;
    microscopyWbcActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyWbcResults?: InputMaybe<Scalars["String"]>;
    microscopyWbcDate?: InputMaybe<Scalars["Time"]>;
    microscopyRbcActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyRbcResults?: InputMaybe<Scalars["String"]>;
    microscopyRbcDate?: InputMaybe<Scalars["Time"]>;
    microscopyCastsActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyCastsResults?: InputMaybe<Scalars["String"]>;
    microscopyCastsDate?: InputMaybe<Scalars["Time"]>;
    microscopyCrystalsActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyCrystalsResults?: InputMaybe<Scalars["String"]>;
    microscopyCrystalsDate?: InputMaybe<Scalars["Time"]>;
    microscopyBacteriaActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyBacteriaResults?: InputMaybe<Scalars["String"]>;
    microscopyBacteriaDate?: InputMaybe<Scalars["Time"]>;
    microscopyHcgActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyHcgResults?: InputMaybe<Scalars["String"]>;
    microscopyHcgDate?: InputMaybe<Scalars["Time"]>;
    urinalysisColorActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisColorResults?: InputMaybe<Scalars["String"]>;
    urinalysisColorDate?: InputMaybe<Scalars["Time"]>;
    urinalysisAppearanceActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisAppearanceResults?: InputMaybe<Scalars["String"]>;
    urinalysisAppearanceDate?: InputMaybe<Scalars["Time"]>;
    urinalysisPhActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisPhResults?: InputMaybe<Scalars["String"]>;
    urinalysisPhDate?: InputMaybe<Scalars["Time"]>;
    urinalysisSgActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisSgResults?: InputMaybe<Scalars["String"]>;
    urinalysisSgDate?: InputMaybe<Scalars["Time"]>;
    urinalysisProteinActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisProteinResults?: InputMaybe<Scalars["String"]>;
    urinalysisProteinDate?: InputMaybe<Scalars["Time"]>;
    urinalysisGlucoseActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisGlucoseResults?: InputMaybe<Scalars["String"]>;
    urinalysisGlucoseDate?: InputMaybe<Scalars["Time"]>;
    urinalysisLeukocyteActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisLeukocyteResults?: InputMaybe<Scalars["String"]>;
    urinalysisLeukocyteDate?: InputMaybe<Scalars["Time"]>;
    urinalysisKetoneActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisKetoneResults?: InputMaybe<Scalars["String"]>;
    urinalysisKetoneDate?: InputMaybe<Scalars["Time"]>;
    urinalysisBilirubinActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisBilirubinResults?: InputMaybe<Scalars["String"]>;
    urinalysisBilirubinDate?: InputMaybe<Scalars["Time"]>;
    urinalysisUrobilingenActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisUrobilingenResults?: InputMaybe<Scalars["String"]>;
    urinalysisUrobilingenDate?: InputMaybe<Scalars["Time"]>;
    urinalysisBloodActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisBloodResults?: InputMaybe<Scalars["String"]>;
    urinalysisBloodDate?: InputMaybe<Scalars["Time"]>;
    serologyVdrlActive?: InputMaybe<Scalars["Boolean"]>;
    serologyVdrlResults?: InputMaybe<Scalars["String"]>;
    serologyVdrlDate?: InputMaybe<Scalars["Time"]>;
    serologyWidalHActive?: InputMaybe<Scalars["Boolean"]>;
    serologyWidalHResults?: InputMaybe<Scalars["String"]>;
    serologyWidalHDate?: InputMaybe<Scalars["Time"]>;
    serologyWidalOActive?: InputMaybe<Scalars["Boolean"]>;
    serologyWidalOResults?: InputMaybe<Scalars["String"]>;
    serologyWidalODate?: InputMaybe<Scalars["Time"]>;
    serologyWeilFelixActive?: InputMaybe<Scalars["Boolean"]>;
    serologyWeilFelixResults?: InputMaybe<Scalars["String"]>;
    serologyWeilFelixDate?: InputMaybe<Scalars["Time"]>;
    serologyHbsAgActive?: InputMaybe<Scalars["Boolean"]>;
    serologyHbsAgResults?: InputMaybe<Scalars["String"]>;
    serologyHbsAgDate?: InputMaybe<Scalars["Time"]>;
    serologyHcvAbActive?: InputMaybe<Scalars["Boolean"]>;
    serologyHcvAbResults?: InputMaybe<Scalars["String"]>;
    serologyHcvAbDate?: InputMaybe<Scalars["Time"]>;
    serologyAsoActive?: InputMaybe<Scalars["Boolean"]>;
    serologyAsoResults?: InputMaybe<Scalars["String"]>;
    serologyAsoDate?: InputMaybe<Scalars["Time"]>;
    serologyRfActive?: InputMaybe<Scalars["Boolean"]>;
    serologyRfResults?: InputMaybe<Scalars["String"]>;
    serologyRfDate?: InputMaybe<Scalars["Time"]>;
    serologyHpayloryAgActive?: InputMaybe<Scalars["Boolean"]>;
    serologyHpayloryAgResults?: InputMaybe<Scalars["String"]>;
    serologyHpayloryAgDate?: InputMaybe<Scalars["Time"]>;
    serologyHpyloryAbActive?: InputMaybe<Scalars["Boolean"]>;
    serologyHpyloryAbResults?: InputMaybe<Scalars["String"]>;
    serologyHpyloryAbDate?: InputMaybe<Scalars["Time"]>;
    bacterologySampleActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologySampleResults?: InputMaybe<Scalars["String"]>;
    bacterologySampleDate?: InputMaybe<Scalars["Time"]>;
    bacterologyKohActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologyKohResults?: InputMaybe<Scalars["String"]>;
    bacterologyKohDate?: InputMaybe<Scalars["Time"]>;
    bacterologyGramStainActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologyGramStainResults?: InputMaybe<Scalars["String"]>;
    bacterologyGramStainDate?: InputMaybe<Scalars["Time"]>;
    bacterologyWetFilmActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologyWetFilmResults?: InputMaybe<Scalars["String"]>;
    bacterologyWetFilmDate?: InputMaybe<Scalars["Time"]>;
    bacterologyAfb1Active?: InputMaybe<Scalars["Boolean"]>;
    bacterologyAfb1Results?: InputMaybe<Scalars["String"]>;
    bacterologyAfb1Date?: InputMaybe<Scalars["Time"]>;
    bacterologyAfb2Active?: InputMaybe<Scalars["Boolean"]>;
    bacterologyAfb2Results?: InputMaybe<Scalars["String"]>;
    bacterologyAfb2Date?: InputMaybe<Scalars["Time"]>;
    bacterologyAfb3Active?: InputMaybe<Scalars["Boolean"]>;
    bacterologyAfb3Results?: InputMaybe<Scalars["String"]>;
    bacterologyAfb3Date?: InputMaybe<Scalars["Time"]>;
    bacterologyCultureActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologyCultureResults?: InputMaybe<Scalars["String"]>;
    bacterologyCultureDate?: InputMaybe<Scalars["Time"]>;
    chemistryFbsRbsActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryFbsRbsResults?: InputMaybe<Scalars["String"]>;
    chemistryFbsRbsDate?: InputMaybe<Scalars["Time"]>;
    chemistrySgotActive?: InputMaybe<Scalars["Boolean"]>;
    chemistrySgotResults?: InputMaybe<Scalars["String"]>;
    chemistrySgotDate?: InputMaybe<Scalars["Time"]>;
    chemistrySgptActive?: InputMaybe<Scalars["Boolean"]>;
    chemistrySgptResults?: InputMaybe<Scalars["String"]>;
    chemistrySgptDate?: InputMaybe<Scalars["Time"]>;
    chemistryAlkalinePhosphatesActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryAlkalinePhosphatesResults?: InputMaybe<Scalars["String"]>;
    chemistryAlkalinePhosphatesDate?: InputMaybe<Scalars["Time"]>;
    chemistryBilirubinTotalActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryBilirubinTotalResults?: InputMaybe<Scalars["String"]>;
    chemistryBilirubinTotalDate?: InputMaybe<Scalars["Time"]>;
    chemistryBilirubinDirectActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryBilirubinDirectResults?: InputMaybe<Scalars["String"]>;
    chemistryBilirubinDirectDate?: InputMaybe<Scalars["Time"]>;
    chemistryUreaActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryUreaResults?: InputMaybe<Scalars["String"]>;
    chemistryUreaDate?: InputMaybe<Scalars["Time"]>;
    chemistryBunActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryBunResults?: InputMaybe<Scalars["String"]>;
    chemistryBunDate?: InputMaybe<Scalars["Time"]>;
    chemistryCreatnineActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryCreatnineResults?: InputMaybe<Scalars["String"]>;
    chemistryCreatnineDate?: InputMaybe<Scalars["Time"]>;
    chemistryUricAcidActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryUricAcidResults?: InputMaybe<Scalars["String"]>;
    chemistryUricAcidDate?: InputMaybe<Scalars["Time"]>;
    chemistryTotalProteinActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryTotalProteinResults?: InputMaybe<Scalars["String"]>;
    chemistryTotalProteinDate?: InputMaybe<Scalars["Time"]>;
    chemistryTriglyceridesActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryTriglyceridesResults?: InputMaybe<Scalars["String"]>;
    chemistryTriglyceridesDate?: InputMaybe<Scalars["Time"]>;
    chemistryCholestrolActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryCholestrolResults?: InputMaybe<Scalars["String"]>;
    chemistryCholestrolDate?: InputMaybe<Scalars["Time"]>;
    chemistryHdlActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryHdlResults?: InputMaybe<Scalars["String"]>;
    chemistryHdlDate?: InputMaybe<Scalars["Time"]>;
    chemistryLdlActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryLdlResults?: InputMaybe<Scalars["String"]>;
    chemistryLdlDate?: InputMaybe<Scalars["Time"]>;
    rightEyeText?: InputMaybe<Scalars["String"]>;
    leftEyeText?: InputMaybe<Scalars["String"]>;
    generalText?: InputMaybe<Scalars["String"]>;
    rightEyeImageIds: Array<InputMaybe<Scalars["ID"]>>;
    leftEyeImageIds: Array<InputMaybe<Scalars["ID"]>>;
    rightEyeSketcheIds: Array<InputMaybe<Scalars["ID"]>>;
    leftEyeSketcheIds: Array<InputMaybe<Scalars["ID"]>>;
    documentIds: Array<InputMaybe<Scalars["ID"]>>;
    labIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare type LabOrder = {
    __typename?: "LabOrder";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    userName: Scalars["String"];
    orderedById?: Maybe<Scalars["ID"]>;
    orderedBy?: Maybe<User>;
    labs: Array<Lab>;
    status: LabOrderStatus;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type LabOrderConnection = Connection & {
    __typename?: "LabOrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<LabOrderEdge>;
};
export declare type LabOrderEdge = {
    __typename?: "LabOrderEdge";
    node: LabOrder;
};
export declare type LabOrderFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
    orderedById?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare enum LabOrderStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare type LabOrderUpdateInput = {
    id: Scalars["ID"];
    patientChartId?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    firstName?: InputMaybe<Scalars["String"]>;
    lastName?: InputMaybe<Scalars["String"]>;
    phoneNo?: InputMaybe<Scalars["String"]>;
    userName?: InputMaybe<Scalars["String"]>;
    orderedById?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<LabOrderStatus>;
    orderNote?: InputMaybe<Scalars["String"]>;
    receptionNote?: InputMaybe<Scalars["String"]>;
};
export declare enum LabStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare type LabType = {
    __typename?: "LabType";
    id: Scalars["ID"];
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billings: Array<Maybe<Billing>>;
};
export declare type LabTypeConnection = Connection & {
    __typename?: "LabTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<LabTypeEdge>>;
};
export declare type LabTypeEdge = {
    __typename?: "LabTypeEdge";
    node: LabType;
};
export declare type LabTypeInput = {
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billingIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare type LabTypeUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    active?: InputMaybe<Scalars["Boolean"]>;
    billingIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};
export declare type LabUpdateInput = {
    id: Scalars["ID"];
    cbcWbcActive?: InputMaybe<Scalars["Boolean"]>;
    cbcWbcResults?: InputMaybe<Scalars["String"]>;
    cbcWbcDate?: InputMaybe<Scalars["Time"]>;
    cbcHgbActive?: InputMaybe<Scalars["Boolean"]>;
    cbcHgbResults?: InputMaybe<Scalars["String"]>;
    cbcHgbDate?: InputMaybe<Scalars["Time"]>;
    cbcHctActive?: InputMaybe<Scalars["Boolean"]>;
    cbcHctResults?: InputMaybe<Scalars["String"]>;
    cbcHctDate?: InputMaybe<Scalars["Time"]>;
    cbcEsrActive?: InputMaybe<Scalars["Boolean"]>;
    cbcEsrResults?: InputMaybe<Scalars["String"]>;
    cbcEsrDate?: InputMaybe<Scalars["Time"]>;
    cbcBloodGroupActive?: InputMaybe<Scalars["Boolean"]>;
    cbcBloodGroupResults?: InputMaybe<Scalars["String"]>;
    cbcBloodGroupDate?: InputMaybe<Scalars["Time"]>;
    cbcRhActive?: InputMaybe<Scalars["Boolean"]>;
    cbcRhResults?: InputMaybe<Scalars["String"]>;
    cbcRhDate?: InputMaybe<Scalars["Time"]>;
    cbcBloodFilmActive?: InputMaybe<Scalars["Boolean"]>;
    cbcBloodFilmResults?: InputMaybe<Scalars["String"]>;
    cbcBloodFilmDate?: InputMaybe<Scalars["Time"]>;
    cbcPltActive?: InputMaybe<Scalars["Boolean"]>;
    cbcPltResults?: InputMaybe<Scalars["String"]>;
    cbcPltDate?: InputMaybe<Scalars["Time"]>;
    liverCoagulationPtActive?: InputMaybe<Scalars["Boolean"]>;
    liverCoagulationPtResults?: InputMaybe<Scalars["String"]>;
    liverCoagulationPtDate?: InputMaybe<Scalars["Time"]>;
    liverCoagulationPttActive?: InputMaybe<Scalars["Boolean"]>;
    liverCoagulationPttResults?: InputMaybe<Scalars["String"]>;
    liverCoagulationPttDate?: InputMaybe<Scalars["Time"]>;
    liverCoagulationInrActive?: InputMaybe<Scalars["Boolean"]>;
    liverCoagulationInrResults?: InputMaybe<Scalars["String"]>;
    liverCoagulationInrDate?: InputMaybe<Scalars["Time"]>;
    liverAstsgotActive?: InputMaybe<Scalars["Boolean"]>;
    liverAstsgotResults?: InputMaybe<Scalars["String"]>;
    liverAstsgotDate?: InputMaybe<Scalars["Time"]>;
    liverAltsgptActive?: InputMaybe<Scalars["Boolean"]>;
    liverAltsgptResults?: InputMaybe<Scalars["String"]>;
    liverAltsgptDate?: InputMaybe<Scalars["Time"]>;
    liverAlpActive?: InputMaybe<Scalars["Boolean"]>;
    liverAlpResults?: InputMaybe<Scalars["String"]>;
    liverAlpDate?: InputMaybe<Scalars["Time"]>;
    renalCrActive?: InputMaybe<Scalars["Boolean"]>;
    renalCrResults?: InputMaybe<Scalars["String"]>;
    renalCrDate?: InputMaybe<Scalars["Time"]>;
    renalBunActive?: InputMaybe<Scalars["Boolean"]>;
    renalBunResults?: InputMaybe<Scalars["String"]>;
    renalBunDate?: InputMaybe<Scalars["Time"]>;
    thyroidFreeT3Active?: InputMaybe<Scalars["Boolean"]>;
    thyroidFreeT3Results?: InputMaybe<Scalars["String"]>;
    thyroidFreeT3Date?: InputMaybe<Scalars["Time"]>;
    thyroidTotalT4Active?: InputMaybe<Scalars["Boolean"]>;
    thyroidTotalT4Results?: InputMaybe<Scalars["String"]>;
    thyroidTotalT4Date?: InputMaybe<Scalars["Time"]>;
    thyroidTshActive?: InputMaybe<Scalars["Boolean"]>;
    thyroidTshResults?: InputMaybe<Scalars["String"]>;
    thyroidTshDate?: InputMaybe<Scalars["Time"]>;
    electrolytesNaPlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesNaPlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesNaPlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesKPlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesKPlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesKPlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesClMinusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesClMinusResults?: InputMaybe<Scalars["String"]>;
    electrolytesClMinusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesCa2PlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesCa2PlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesCa2PlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesMg2PlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesMg2PlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesMg2PlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesPMinusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesPMinusResults?: InputMaybe<Scalars["String"]>;
    electrolytesPMinusDate?: InputMaybe<Scalars["Time"]>;
    stoolConsistencyActive?: InputMaybe<Scalars["Boolean"]>;
    stoolConsistencyResults?: InputMaybe<Scalars["String"]>;
    stoolConsistencyDate?: InputMaybe<Scalars["Time"]>;
    stoolOpActive?: InputMaybe<Scalars["Boolean"]>;
    stoolOpResults?: InputMaybe<Scalars["String"]>;
    stoolOpDate?: InputMaybe<Scalars["Time"]>;
    stoolConcentrationActive?: InputMaybe<Scalars["Boolean"]>;
    stoolConcentrationResults?: InputMaybe<Scalars["String"]>;
    stoolConcentrationDate?: InputMaybe<Scalars["Time"]>;
    stoolOccultBloodActive?: InputMaybe<Scalars["Boolean"]>;
    stoolOccultBloodResults?: InputMaybe<Scalars["String"]>;
    stoolOccultBloodDate?: InputMaybe<Scalars["Time"]>;
    microscopyEpitCellsActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyEpitCellsResults?: InputMaybe<Scalars["String"]>;
    microscopyEpitCellsDate?: InputMaybe<Scalars["Time"]>;
    microscopyWbcActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyWbcResults?: InputMaybe<Scalars["String"]>;
    microscopyWbcDate?: InputMaybe<Scalars["Time"]>;
    microscopyRbcActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyRbcResults?: InputMaybe<Scalars["String"]>;
    microscopyRbcDate?: InputMaybe<Scalars["Time"]>;
    microscopyCastsActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyCastsResults?: InputMaybe<Scalars["String"]>;
    microscopyCastsDate?: InputMaybe<Scalars["Time"]>;
    microscopyCrystalsActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyCrystalsResults?: InputMaybe<Scalars["String"]>;
    microscopyCrystalsDate?: InputMaybe<Scalars["Time"]>;
    microscopyBacteriaActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyBacteriaResults?: InputMaybe<Scalars["String"]>;
    microscopyBacteriaDate?: InputMaybe<Scalars["Time"]>;
    microscopyHcgActive?: InputMaybe<Scalars["Boolean"]>;
    microscopyHcgResults?: InputMaybe<Scalars["String"]>;
    microscopyHcgDate?: InputMaybe<Scalars["Time"]>;
    urinalysisColorActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisColorResults?: InputMaybe<Scalars["String"]>;
    urinalysisColorDate?: InputMaybe<Scalars["Time"]>;
    urinalysisAppearanceActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisAppearanceResults?: InputMaybe<Scalars["String"]>;
    urinalysisAppearanceDate?: InputMaybe<Scalars["Time"]>;
    urinalysisPhActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisPhResults?: InputMaybe<Scalars["String"]>;
    urinalysisPhDate?: InputMaybe<Scalars["Time"]>;
    urinalysisSgActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisSgResults?: InputMaybe<Scalars["String"]>;
    urinalysisSgDate?: InputMaybe<Scalars["Time"]>;
    urinalysisProteinActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisProteinResults?: InputMaybe<Scalars["String"]>;
    urinalysisProteinDate?: InputMaybe<Scalars["Time"]>;
    urinalysisGlucoseActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisGlucoseResults?: InputMaybe<Scalars["String"]>;
    urinalysisGlucoseDate?: InputMaybe<Scalars["Time"]>;
    urinalysisLeukocyteActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisLeukocyteResults?: InputMaybe<Scalars["String"]>;
    urinalysisLeukocyteDate?: InputMaybe<Scalars["Time"]>;
    urinalysisKetoneActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisKetoneResults?: InputMaybe<Scalars["String"]>;
    urinalysisKetoneDate?: InputMaybe<Scalars["Time"]>;
    urinalysisBilirubinActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisBilirubinResults?: InputMaybe<Scalars["String"]>;
    urinalysisBilirubinDate?: InputMaybe<Scalars["Time"]>;
    urinalysisUrobilingenActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisUrobilingenResults?: InputMaybe<Scalars["String"]>;
    urinalysisUrobilingenDate?: InputMaybe<Scalars["Time"]>;
    urinalysisBloodActive?: InputMaybe<Scalars["Boolean"]>;
    urinalysisBloodResults?: InputMaybe<Scalars["String"]>;
    urinalysisBloodDate?: InputMaybe<Scalars["Time"]>;
    serologyVdrlActive?: InputMaybe<Scalars["Boolean"]>;
    serologyVdrlResults?: InputMaybe<Scalars["String"]>;
    serologyVdrlDate?: InputMaybe<Scalars["Time"]>;
    serologyWidalHActive?: InputMaybe<Scalars["Boolean"]>;
    serologyWidalHResults?: InputMaybe<Scalars["String"]>;
    serologyWidalHDate?: InputMaybe<Scalars["Time"]>;
    serologyWidalOActive?: InputMaybe<Scalars["Boolean"]>;
    serologyWidalOResults?: InputMaybe<Scalars["String"]>;
    serologyWidalODate?: InputMaybe<Scalars["Time"]>;
    serologyWeilFelixActive?: InputMaybe<Scalars["Boolean"]>;
    serologyWeilFelixResults?: InputMaybe<Scalars["String"]>;
    serologyWeilFelixDate?: InputMaybe<Scalars["Time"]>;
    serologyHbsAgActive?: InputMaybe<Scalars["Boolean"]>;
    serologyHbsAgResults?: InputMaybe<Scalars["String"]>;
    serologyHbsAgDate?: InputMaybe<Scalars["Time"]>;
    serologyHcvAbActive?: InputMaybe<Scalars["Boolean"]>;
    serologyHcvAbResults?: InputMaybe<Scalars["String"]>;
    serologyHcvAbDate?: InputMaybe<Scalars["Time"]>;
    serologyAsoActive?: InputMaybe<Scalars["Boolean"]>;
    serologyAsoResults?: InputMaybe<Scalars["String"]>;
    serologyAsoDate?: InputMaybe<Scalars["Time"]>;
    serologyRfActive?: InputMaybe<Scalars["Boolean"]>;
    serologyRfResults?: InputMaybe<Scalars["String"]>;
    serologyRfDate?: InputMaybe<Scalars["Time"]>;
    serologyHpayloryAgActive?: InputMaybe<Scalars["Boolean"]>;
    serologyHpayloryAgResults?: InputMaybe<Scalars["String"]>;
    serologyHpayloryAgDate?: InputMaybe<Scalars["Time"]>;
    serologyHpyloryAbActive?: InputMaybe<Scalars["Boolean"]>;
    serologyHpyloryAbResults?: InputMaybe<Scalars["String"]>;
    serologyHpyloryAbDate?: InputMaybe<Scalars["Time"]>;
    bacterologySampleActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologySampleResults?: InputMaybe<Scalars["String"]>;
    bacterologySampleDate?: InputMaybe<Scalars["Time"]>;
    bacterologyKohActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologyKohResults?: InputMaybe<Scalars["String"]>;
    bacterologyKohDate?: InputMaybe<Scalars["Time"]>;
    bacterologyGramStainActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologyGramStainResults?: InputMaybe<Scalars["String"]>;
    bacterologyGramStainDate?: InputMaybe<Scalars["Time"]>;
    bacterologyWetFilmActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologyWetFilmResults?: InputMaybe<Scalars["String"]>;
    bacterologyWetFilmDate?: InputMaybe<Scalars["Time"]>;
    bacterologyAfb1Active?: InputMaybe<Scalars["Boolean"]>;
    bacterologyAfb1Results?: InputMaybe<Scalars["String"]>;
    bacterologyAfb1Date?: InputMaybe<Scalars["Time"]>;
    bacterologyAfb2Active?: InputMaybe<Scalars["Boolean"]>;
    bacterologyAfb2Results?: InputMaybe<Scalars["String"]>;
    bacterologyAfb2Date?: InputMaybe<Scalars["Time"]>;
    bacterologyAfb3Active?: InputMaybe<Scalars["Boolean"]>;
    bacterologyAfb3Results?: InputMaybe<Scalars["String"]>;
    bacterologyAfb3Date?: InputMaybe<Scalars["Time"]>;
    bacterologyCultureActive?: InputMaybe<Scalars["Boolean"]>;
    bacterologyCultureResults?: InputMaybe<Scalars["String"]>;
    bacterologyCultureDate?: InputMaybe<Scalars["Time"]>;
    chemistryFbsRbsActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryFbsRbsResults?: InputMaybe<Scalars["String"]>;
    chemistryFbsRbsDate?: InputMaybe<Scalars["Time"]>;
    chemistrySgotActive?: InputMaybe<Scalars["Boolean"]>;
    chemistrySgotResults?: InputMaybe<Scalars["String"]>;
    chemistrySgotDate?: InputMaybe<Scalars["Time"]>;
    chemistrySgptActive?: InputMaybe<Scalars["Boolean"]>;
    chemistrySgptResults?: InputMaybe<Scalars["String"]>;
    chemistrySgptDate?: InputMaybe<Scalars["Time"]>;
    chemistryAlkalinePhosphatesActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryAlkalinePhosphatesResults?: InputMaybe<Scalars["String"]>;
    chemistryAlkalinePhosphatesDate?: InputMaybe<Scalars["Time"]>;
    chemistryBilirubinTotalActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryBilirubinTotalResults?: InputMaybe<Scalars["String"]>;
    chemistryBilirubinTotalDate?: InputMaybe<Scalars["Time"]>;
    chemistryBilirubinDirectActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryBilirubinDirectResults?: InputMaybe<Scalars["String"]>;
    chemistryBilirubinDirectDate?: InputMaybe<Scalars["Time"]>;
    chemistryUreaActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryUreaResults?: InputMaybe<Scalars["String"]>;
    chemistryUreaDate?: InputMaybe<Scalars["Time"]>;
    chemistryBunActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryBunResults?: InputMaybe<Scalars["String"]>;
    chemistryBunDate?: InputMaybe<Scalars["Time"]>;
    chemistryCreatnineActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryCreatnineResults?: InputMaybe<Scalars["String"]>;
    chemistryCreatnineDate?: InputMaybe<Scalars["Time"]>;
    chemistryUricAcidActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryUricAcidResults?: InputMaybe<Scalars["String"]>;
    chemistryUricAcidDate?: InputMaybe<Scalars["Time"]>;
    chemistryTotalProteinActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryTotalProteinResults?: InputMaybe<Scalars["String"]>;
    chemistryTotalProteinDate?: InputMaybe<Scalars["Time"]>;
    chemistryTriglyceridesActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryTriglyceridesResults?: InputMaybe<Scalars["String"]>;
    chemistryTriglyceridesDate?: InputMaybe<Scalars["Time"]>;
    chemistryCholestrolActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryCholestrolResults?: InputMaybe<Scalars["String"]>;
    chemistryCholestrolDate?: InputMaybe<Scalars["Time"]>;
    chemistryHdlActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryHdlResults?: InputMaybe<Scalars["String"]>;
    chemistryHdlDate?: InputMaybe<Scalars["Time"]>;
    chemistryLdlActive?: InputMaybe<Scalars["Boolean"]>;
    chemistryLdlResults?: InputMaybe<Scalars["String"]>;
    chemistryLdlDate?: InputMaybe<Scalars["Time"]>;
    rightEyeText?: InputMaybe<Scalars["String"]>;
    leftEyeText?: InputMaybe<Scalars["String"]>;
    generalText?: InputMaybe<Scalars["String"]>;
    rightEyeImages?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    leftEyeImages?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    rightEyeSketches?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    leftEyeSketches?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    documents?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    images?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    status?: InputMaybe<LabStatus>;
};
export declare type Lifestyle = {
    __typename?: "Lifestyle";
    id: Scalars["ID"];
    title: Scalars["String"];
    description: Scalars["String"];
    note: Scalars["String"];
    patientHistoryId: Scalars["ID"];
};
export declare type LifestyleInput = {
    title: Scalars["String"];
    description: Scalars["String"];
    note: Scalars["String"];
    patientHistoryId: Scalars["ID"];
};
export declare type LifestyleType = {
    __typename?: "LifestyleType";
    id: Scalars["ID"];
    title: Scalars["String"];
};
export declare type LifestyleTypeConnection = Connection & {
    __typename?: "LifestyleTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<LifestyleTypeEdge>>;
};
export declare type LifestyleTypeEdge = {
    __typename?: "LifestyleTypeEdge";
    node: LifestyleType;
};
export declare type LifestyleTypeInput = {
    title: Scalars["String"];
};
export declare type LifestyleTypeUpdateInput = {
    id: Scalars["ID"];
    title: Scalars["String"];
};
export declare type LifestyleUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    note?: InputMaybe<Scalars["String"]>;
    description?: InputMaybe<Scalars["String"]>;
};
export declare type LoginInput = {
    email: Scalars["String"];
    password: Scalars["String"];
};
export declare type MedicalPrescription = {
    __typename?: "MedicalPrescription";
    id: Scalars["ID"];
    medicalPrescriptionOrderId?: Maybe<Scalars["ID"]>;
    medication: Scalars["String"];
    rxCui?: Maybe<Scalars["String"]>;
    synonym?: Maybe<Scalars["String"]>;
    tty?: Maybe<Scalars["String"]>;
    language?: Maybe<Scalars["String"]>;
    sig?: Maybe<Scalars["String"]>;
    refill?: Maybe<Scalars["Int"]>;
    generic?: Maybe<Scalars["Boolean"]>;
    substitutionAllowed?: Maybe<Scalars["Boolean"]>;
    directionToPatient?: Maybe<Scalars["String"]>;
    prescribedDate?: Maybe<Scalars["Time"]>;
    history: Scalars["Boolean"];
    status: Scalars["String"];
};
export declare type MedicalPrescriptionConnection = Connection & {
    __typename?: "MedicalPrescriptionConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<MedicalPrescriptionEdge>>;
};
export declare type MedicalPrescriptionEdge = {
    __typename?: "MedicalPrescriptionEdge";
    node: MedicalPrescription;
};
export declare type MedicalPrescriptionFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    medication?: InputMaybe<Scalars["String"]>;
    rxCui?: InputMaybe<Scalars["String"]>;
    status?: InputMaybe<Scalars["String"]>;
    history?: InputMaybe<Scalars["Boolean"]>;
};
export declare type MedicalPrescriptionInput = {
    patientId: Scalars["ID"];
    medication: Scalars["String"];
    rxCui?: InputMaybe<Scalars["String"]>;
    synonym?: InputMaybe<Scalars["String"]>;
    tty?: InputMaybe<Scalars["String"]>;
    language?: InputMaybe<Scalars["String"]>;
    sig?: InputMaybe<Scalars["String"]>;
    refill?: InputMaybe<Scalars["Int"]>;
    generic?: InputMaybe<Scalars["Boolean"]>;
    substitutionAllowed?: InputMaybe<Scalars["Boolean"]>;
    directionToPatient?: InputMaybe<Scalars["String"]>;
    prescribedDate?: InputMaybe<Scalars["Time"]>;
    history: Scalars["Boolean"];
    status?: InputMaybe<Scalars["String"]>;
};
export declare type MedicalPrescriptionOrder = {
    __typename?: "MedicalPrescriptionOrder";
    id: Scalars["ID"];
    pharmacyId: Scalars["ID"];
    pharmacy: Pharmacy;
    patientChartId: Scalars["ID"];
    orderedById?: Maybe<Scalars["ID"]>;
    orderedBy?: Maybe<User>;
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    userName: Scalars["String"];
    status: Scalars["String"];
    medicalPrescriptions: Array<Maybe<MedicalPrescription>>;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type MedicalPrescriptionOrderConnection = Connection & {
    __typename?: "MedicalPrescriptionOrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<MedicalPrescriptionOrderEdge>;
};
export declare type MedicalPrescriptionOrderEdge = {
    __typename?: "MedicalPrescriptionOrderEdge";
    node: MedicalPrescriptionOrder;
};
export declare type MedicalPrescriptionOrderInput = {
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    pharmacyId: Scalars["ID"];
    medication: Scalars["String"];
    rxCui?: InputMaybe<Scalars["String"]>;
    synonym?: InputMaybe<Scalars["String"]>;
    tty?: InputMaybe<Scalars["String"]>;
    language?: InputMaybe<Scalars["String"]>;
    sig?: InputMaybe<Scalars["String"]>;
    refill?: InputMaybe<Scalars["Int"]>;
    generic?: InputMaybe<Scalars["Boolean"]>;
    substitutionAllowed?: InputMaybe<Scalars["Boolean"]>;
    directionToPatient?: InputMaybe<Scalars["String"]>;
    prescribedDate?: InputMaybe<Scalars["Time"]>;
    history: Scalars["Boolean"];
    status?: InputMaybe<Scalars["String"]>;
};
export declare type MedicalPrescriptionUpdateInput = {
    id: Scalars["ID"];
    pharmacyId?: InputMaybe<Scalars["ID"]>;
    medication?: InputMaybe<Scalars["String"]>;
    rxCui?: InputMaybe<Scalars["String"]>;
    synonym?: InputMaybe<Scalars["String"]>;
    tty?: InputMaybe<Scalars["String"]>;
    language?: InputMaybe<Scalars["String"]>;
    sig?: InputMaybe<Scalars["String"]>;
    refill?: InputMaybe<Scalars["Int"]>;
    generic?: InputMaybe<Scalars["Boolean"]>;
    substitutionAllowed?: InputMaybe<Scalars["Boolean"]>;
    directionToPatient?: InputMaybe<Scalars["String"]>;
    prescribedDate?: InputMaybe<Scalars["Time"]>;
    eyewearShopId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare type MedicationPrescriptionUpdateInput = {
    id: Scalars["ID"];
    pharmacyId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare type Mutation = {
    __typename?: "Mutation";
    createTodo: Todo;
    saveAllergy: Allergy;
    updateAllergy: Allergy;
    deleteAllergy: Scalars["Boolean"];
    createAmendment?: Maybe<Amendment>;
    updateAmendment?: Maybe<Amendment>;
    deleteAmendment: Scalars["Boolean"];
    newAppointment: Appointment;
    updateAppointment: Appointment;
    deleteAppointment: Scalars["Boolean"];
    saveAppointmentStatus: AppointmentStatus;
    updateAppointmentStatus: AppointmentStatus;
    deleteAppointmentStatus: Scalars["Boolean"];
    saveBilling: Billing;
    updateBilling: Billing;
    deleteBilling: Scalars["Boolean"];
    createChat: Chat;
    sendMessage: ChatMessage;
    muteChat: ChatMute;
    unmuteChat: Scalars["Boolean"];
    deleteChat: Scalars["Boolean"];
    deleteUnreadMessages: Scalars["Boolean"];
    saveChiefComplaint: ChiefComplaint;
    updateChiefComplaint: ChiefComplaint;
    deleteChiefComplaint: Scalars["Boolean"];
    savePatientChiefComplaint: ChiefComplaint;
    deletePatientChiefComplaint: Scalars["Boolean"];
    saveChiefComplaintType: ChiefComplaintType;
    updateChiefComplaintType: ChiefComplaintType;
    deleteChiefComplaintType: Scalars["Boolean"];
    saveDiagnosis: Diagnosis;
    updateDiagnosis: Diagnosis;
    deleteDiagnosis: Scalars["Boolean"];
    orderDiagnosticProcedure: DiagnosticProcedureOrder;
    orderAndConfirmDiagnosticProcedure: DiagnosticProcedureOrder;
    confirmDiagnosticProcedureOrder: DiagnosticProcedureOrder;
    updateDiagnosticProcedureOrder: DiagnosticProcedureOrder;
    saveDiagnosticProcedure: DiagnosticProcedure;
    updateDiagnosticProcedure: DiagnosticProcedure;
    deleteDiagnosticProcedure: Scalars["Boolean"];
    saveDiagnosticProcedureType: DiagnosticProcedureType;
    updateDiagnosticProcedureType: DiagnosticProcedureType;
    deleteDiagnosticProcedureType: Scalars["Boolean"];
    deleteDiagnosticImage: Scalars["Boolean"];
    deleteDiagnosticRightEyeImage: Scalars["Boolean"];
    deleteDiagnosticLeftEyeImage: Scalars["Boolean"];
    deleteDiagnosticRightEyeSketch: Scalars["Boolean"];
    deleteDiagnosticLeftEyeSketch: Scalars["Boolean"];
    deleteDiagnosticDocument: Scalars["Boolean"];
    createEyewearShop: EyewearShop;
    updateEyewearShop: EyewearShop;
    deleteEyewearShop: Scalars["Boolean"];
    saveFavoriteChiefComplaint: FavoriteChiefComplaint;
    deleteFavoriteChiefComplaint?: Maybe<Scalars["ID"]>;
    saveFavoriteDiagnosis: FavoriteDiagnosis;
    deleteFavoriteDiagnosis?: Maybe<Scalars["ID"]>;
    saveFavoriteMedication: FavoriteMedication;
    updateFavoriteMedication: FavoriteMedication;
    deleteFavoriteMedication: Scalars["Boolean"];
    saveFile: File;
    updateFile: File;
    deleteFile: Scalars["Boolean"];
    orderFollowUp: FollowUpOrder;
    confirmFollowUpOrder: ConfirmFollowUpOrderResult;
    deleteFollowUp: Scalars["Boolean"];
    saveFollowUp: FollowUp;
    updateFollowUp: FollowUp;
    saveHpiComponentType: HpiComponentType;
    updateHpiComponentType: HpiComponentType;
    deleteHpiComponentType: Scalars["Boolean"];
    saveHpiComponent: HpiComponent;
    updateHpiComponent: HpiComponent;
    deleteHpiComponent: Scalars["Boolean"];
    saveLab: Lab;
    updateLab: Lab;
    deleteLab: Scalars["Boolean"];
    saveLabType: LabType;
    updateLabType: LabType;
    deleteLabType: Scalars["Boolean"];
    deleteLabRightEyeImage: Scalars["Boolean"];
    deleteLabLeftEyeImage: Scalars["Boolean"];
    deleteLabRightEyeSketch: Scalars["Boolean"];
    deleteLabLeftEyeSketch: Scalars["Boolean"];
    deleteLabImage: Scalars["Boolean"];
    deleteLabDocument: Scalars["Boolean"];
    orderLab: LabOrder;
    confirmLabOrder: LabOrder;
    updateLabOrder: LabOrder;
    orderAndConfirmLab: LabOrder;
    saveLifestyleTypes: LifestyleType;
    updateLifestyleType: LifestyleType;
    deleteLifestyleType: Scalars["Boolean"];
    saveOrder: Order;
    updateOrder: Order;
    deleteOrder: Scalars["Boolean"];
    orderFollowup: Order;
    scheduleSurgery: Order;
    scheduleTreatment: Order;
    confirmOrder: Order;
    saveOrganizationDetails: OrganizationDetails;
    savePastIllnessTypes: PastIllnessType;
    updatePastIllnessType: PastIllnessType;
    deletePastIllnessType: Scalars["Boolean"];
    savePatient: Patient;
    updatePatient: Patient;
    deletePatient: Scalars["Boolean"];
    savePatientChart: PatientChart;
    updatePatientChart: PatientChart;
    deletePatientChart: Scalars["Boolean"];
    lockPatientChart: PatientChart;
    saveVitalSigns: VitalSigns;
    updateVitalSigns: VitalSigns;
    saveOphthalmologyExam: OpthalmologyExam;
    updateOphthalmologyExam: OpthalmologyExam;
    savePatientDiagnosis: PatientDiagnosis;
    updatePatientDiagnosis: PatientDiagnosis;
    deletePatientDiagnosis: Scalars["Boolean"];
    savePatientEncounterLimit: PatientEncounterLimit;
    updatePatientEncounterLimit: PatientEncounterLimit;
    deletePatientEncounterLimit: Scalars["Boolean"];
    savePastIllness: PastIllness;
    savePastInjury: PastInjury;
    savePastHospitalization: PastHospitalization;
    savePastSurgery: PastSurgery;
    saveLifestyle: Lifestyle;
    saveFamilyIllness: FamilyIllness;
    updatePatientHistory: PatientHistory;
    updatePastIllness: PastIllness;
    updatePastInjury: PastInjury;
    updatePastHospitalization: PastHospitalization;
    updatePastSurgery: PastSurgery;
    updateLifestyle: Lifestyle;
    updateFamilyIllness: FamilyIllness;
    deletePastIllness: Scalars["Boolean"];
    deletePastInjury: Scalars["Boolean"];
    deletePastHospitalization: Scalars["Boolean"];
    deletePastSurgery: Scalars["Boolean"];
    deleteLifestyle: Scalars["Boolean"];
    deleteFamilyIllness: Scalars["Boolean"];
    subscribeQueue: QueueSubscription;
    unsubscribeQueue: QueueSubscription;
    savePatientQueue: PatientQueue;
    deleteFromQueue: PatientQueue;
    checkOutPatient: PatientQueue;
    pushPatientQueue: PatientQueue;
    movePatientQueue: PatientQueue;
    checkInPatient: Appointment;
    updatePatientQueue: PatientQueue;
    savePayment: Payment;
    updatePayment: Payment;
    deletePayment: Scalars["Boolean"];
    confirmPayment: Payment;
    confirmPayments: Scalars["Boolean"];
    requestPaymentWaiver: Payment;
    requestPaymentWaivers: Scalars["Boolean"];
    savePaymentWaiver: PaymentWaiver;
    updatePaymentWaiver: PaymentWaiver;
    deletePaymentWaiver: Scalars["Boolean"];
    approvePaymentWaiver: PaymentWaiver;
    createPharmacy: Pharmacy;
    updatePharmacy: Pharmacy;
    deletePharmacy: Scalars["Boolean"];
    saveExamCategory: ExamCategory;
    updateExamCategory: ExamCategory;
    saveExamFinding: ExamFinding;
    updateExamFinding: ExamFinding;
    savePhysicalExamFinding: PhysicalExamFinding;
    updatePhysicalExamFinding: PhysicalExamFinding;
    deletePhysicalExamFinding: Scalars["Boolean"];
    deletePhysicalExamFindingExamCategory: PhysicalExamFinding;
    savePlanType: PlanType;
    updatePlanType: PlanType;
    deletePlanType: Scalars["Boolean"];
    saveMedicationPrescription: MedicalPrescriptionOrder;
    savePastMedication: MedicalPrescription;
    saveEyewearPrescription: EyewearPrescriptionOrder;
    updateMedicationPrescription: MedicalPrescription;
    updateEyewearPrescription: EyewearPrescription;
    deleteMedicalPrescription: Scalars["Boolean"];
    deleteEyewearPrescription: Scalars["Boolean"];
    updateMedicationPrescriptionOrder: MedicalPrescriptionOrder;
    updateEyewearPrescriptionOrder: EyewearPrescriptionOrder;
    orderReferral: ReferralOrder;
    confirmReferralOrder: ConfirmReferralOrderResult;
    deleteReferral: Scalars["Boolean"];
    saveSystem: System;
    updateSystem: System;
    saveSystemSymptom: SystemSymptom;
    updateSystemSymptom: SystemSymptom;
    saveReviewOfSystem: ReviewOfSystem;
    updateReviewOfSystem: ReviewOfSystem;
    deleteReviewOfSystem: Scalars["Boolean"];
    saveRoom: Room;
    updateRoom: Room;
    deleteRoom: Scalars["Boolean"];
    saveSupply: Supply;
    updateSupply: Supply;
    deleteSupply: Scalars["Boolean"];
    orderSurgicalProcedure: SurgicalOrder;
    confirmSurgicalOrder: ConfirmSurgicalOrderResult;
    saveSurgicalProcedure: SurgicalProcedure;
    updateSurgicalProcedure: SurgicalProcedure;
    deleteSurgicalProcedure: Scalars["Boolean"];
    saveSurgicalProcedureType: SurgicalProcedureType;
    updateSurgicalProcedureType: SurgicalProcedureType;
    deleteSurgicalProcedureType: Scalars["Boolean"];
    deletePreanestheticDocument: Scalars["Boolean"];
    updateSurgeryFitness: SurgicalProcedure;
    orderAndConfirmSurgery: SurgicalOrder;
    orderTreatment: TreatmentOrder;
    confirmTreatmentOrder: ConfirmTreatmentOrderResult;
    saveTreatment: Treatment;
    updateTreatment: Treatment;
    deleteTreatment: Scalars["Boolean"];
    saveTreatmentType: TreatmentType;
    updateTreatmentType: TreatmentType;
    deleteTreatmentType: Scalars["Boolean"];
    signup: User;
    login: Scalars["String"];
    resetPassword: User;
    updateUser: User;
    changePassword: User;
    saveUserType: UserType;
    updateUserType: UserType;
    deleteUserType: Scalars["Boolean"];
    saveVisitType: VisitType;
    updateVisitType: VisitType;
    deleteVisitType: Scalars["Boolean"];
};
export declare type MutationCreateTodoArgs = {
    input: NewTodo;
};
export declare type MutationSaveAllergyArgs = {
    input: AllergyInput;
};
export declare type MutationUpdateAllergyArgs = {
    input: AllergyUpdateInput;
};
export declare type MutationDeleteAllergyArgs = {
    id: Scalars["ID"];
};
export declare type MutationCreateAmendmentArgs = {
    input: AmendmentInput;
};
export declare type MutationUpdateAmendmentArgs = {
    input: AmendmentUpdateInput;
};
export declare type MutationDeleteAmendmentArgs = {
    id: Scalars["ID"];
};
export declare type MutationNewAppointmentArgs = {
    input: AppointmentInput;
};
export declare type MutationUpdateAppointmentArgs = {
    input: AppointmentUpdateInput;
};
export declare type MutationDeleteAppointmentArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveAppointmentStatusArgs = {
    input: AppointmentStatusInput;
};
export declare type MutationUpdateAppointmentStatusArgs = {
    input: AppointmentStatusInput;
    id: Scalars["ID"];
};
export declare type MutationDeleteAppointmentStatusArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveBillingArgs = {
    input: BillingInput;
};
export declare type MutationUpdateBillingArgs = {
    input: BillingInput;
    id: Scalars["ID"];
};
export declare type MutationDeleteBillingArgs = {
    id: Scalars["ID"];
};
export declare type MutationCreateChatArgs = {
    input: ChatInput;
};
export declare type MutationSendMessageArgs = {
    input: ChatMessageInput;
};
export declare type MutationMuteChatArgs = {
    id: Scalars["ID"];
};
export declare type MutationUnmuteChatArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeleteChatArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeleteUnreadMessagesArgs = {
    userId: Scalars["ID"];
    chatId: Scalars["ID"];
};
export declare type MutationSaveChiefComplaintArgs = {
    input: ChiefComplaintInput;
};
export declare type MutationUpdateChiefComplaintArgs = {
    input: ChiefComplaintUpdateInput;
};
export declare type MutationDeleteChiefComplaintArgs = {
    id: Scalars["ID"];
};
export declare type MutationSavePatientChiefComplaintArgs = {
    input: ChiefComplaintInput;
};
export declare type MutationDeletePatientChiefComplaintArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveChiefComplaintTypeArgs = {
    input: ChiefComplaintTypeInput;
};
export declare type MutationUpdateChiefComplaintTypeArgs = {
    input: ChiefComplaintTypeUpdateInput;
};
export declare type MutationDeleteChiefComplaintTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveDiagnosisArgs = {
    input: DiagnosisInput;
};
export declare type MutationUpdateDiagnosisArgs = {
    input: DiagnosisUpdateInput;
};
export declare type MutationDeleteDiagnosisArgs = {
    id: Scalars["ID"];
};
export declare type MutationOrderDiagnosticProcedureArgs = {
    input: OrderDiagnosticProcedureInput;
};
export declare type MutationOrderAndConfirmDiagnosticProcedureArgs = {
    input: OrderAndConfirmDiagnosticProcedureInput;
};
export declare type MutationConfirmDiagnosticProcedureOrderArgs = {
    id: Scalars["ID"];
    invoiceNo: Scalars["String"];
};
export declare type MutationUpdateDiagnosticProcedureOrderArgs = {
    input: DiagnosticProcedureOrderUpdateInput;
};
export declare type MutationSaveDiagnosticProcedureArgs = {
    input: DiagnosticProcedureInput;
};
export declare type MutationUpdateDiagnosticProcedureArgs = {
    input: DiagnosticProcedureUpdateInput;
};
export declare type MutationDeleteDiagnosticProcedureArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveDiagnosticProcedureTypeArgs = {
    input: DiagnosticProcedureTypeInput;
};
export declare type MutationUpdateDiagnosticProcedureTypeArgs = {
    input: DiagnosticProcedureTypeUpdateInput;
};
export declare type MutationDeleteDiagnosticProcedureTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeleteDiagnosticImageArgs = {
    input: DiagnosticProcedureDeleteFileInput;
};
export declare type MutationDeleteDiagnosticRightEyeImageArgs = {
    input: DiagnosticProcedureDeleteFileInput;
};
export declare type MutationDeleteDiagnosticLeftEyeImageArgs = {
    input: DiagnosticProcedureDeleteFileInput;
};
export declare type MutationDeleteDiagnosticRightEyeSketchArgs = {
    input: DiagnosticProcedureDeleteFileInput;
};
export declare type MutationDeleteDiagnosticLeftEyeSketchArgs = {
    input: DiagnosticProcedureDeleteFileInput;
};
export declare type MutationDeleteDiagnosticDocumentArgs = {
    input: DiagnosticProcedureDeleteFileInput;
};
export declare type MutationCreateEyewearShopArgs = {
    input: EyewearShopInput;
};
export declare type MutationUpdateEyewearShopArgs = {
    input: EyewearShopUpdateInput;
};
export declare type MutationDeleteEyewearShopArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveFavoriteChiefComplaintArgs = {
    chiefComplaintTypeId: Scalars["ID"];
};
export declare type MutationDeleteFavoriteChiefComplaintArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveFavoriteDiagnosisArgs = {
    diagnosisId: Scalars["ID"];
};
export declare type MutationDeleteFavoriteDiagnosisArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveFavoriteMedicationArgs = {
    input: FavoriteMedicationInput;
};
export declare type MutationUpdateFavoriteMedicationArgs = {
    input: FavoriteMedicationUpdateInput;
};
export declare type MutationDeleteFavoriteMedicationArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveFileArgs = {
    input: FileInput;
};
export declare type MutationUpdateFileArgs = {
    input: FileUpdateInput;
};
export declare type MutationDeleteFileArgs = {
    id: Scalars["ID"];
};
export declare type MutationOrderFollowUpArgs = {
    input: OrderFollowUpInput;
};
export declare type MutationConfirmFollowUpOrderArgs = {
    input: ConfirmFollowUpOrderInput;
};
export declare type MutationDeleteFollowUpArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveFollowUpArgs = {
    input: FollowUpInput;
};
export declare type MutationUpdateFollowUpArgs = {
    input: FollowUpUpdateInput;
};
export declare type MutationSaveHpiComponentTypeArgs = {
    input: HpiComponentTypeInput;
};
export declare type MutationUpdateHpiComponentTypeArgs = {
    input: HpiComponentTypeUpdateInput;
};
export declare type MutationDeleteHpiComponentTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveHpiComponentArgs = {
    input: HpiComponentInput;
};
export declare type MutationUpdateHpiComponentArgs = {
    input: HpiComponentUpdateInput;
};
export declare type MutationDeleteHpiComponentArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveLabArgs = {
    input: LabInput;
};
export declare type MutationUpdateLabArgs = {
    input: LabUpdateInput;
};
export declare type MutationDeleteLabArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveLabTypeArgs = {
    input: LabTypeInput;
};
export declare type MutationUpdateLabTypeArgs = {
    input: LabTypeUpdateInput;
};
export declare type MutationDeleteLabTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeleteLabRightEyeImageArgs = {
    input: LabDeleteFileInput;
};
export declare type MutationDeleteLabLeftEyeImageArgs = {
    input: LabDeleteFileInput;
};
export declare type MutationDeleteLabRightEyeSketchArgs = {
    input: LabDeleteFileInput;
};
export declare type MutationDeleteLabLeftEyeSketchArgs = {
    input: LabDeleteFileInput;
};
export declare type MutationDeleteLabImageArgs = {
    input: LabDeleteFileInput;
};
export declare type MutationDeleteLabDocumentArgs = {
    input: LabDeleteFileInput;
};
export declare type MutationOrderLabArgs = {
    input: OrderLabInput;
};
export declare type MutationConfirmLabOrderArgs = {
    id: Scalars["ID"];
    invoiceNo: Scalars["String"];
};
export declare type MutationUpdateLabOrderArgs = {
    input: LabOrderUpdateInput;
};
export declare type MutationOrderAndConfirmLabArgs = {
    input: OrderAndConfirmLabInput;
};
export declare type MutationSaveLifestyleTypesArgs = {
    input: LifestyleTypeInput;
};
export declare type MutationUpdateLifestyleTypeArgs = {
    input: LifestyleTypeUpdateInput;
};
export declare type MutationDeleteLifestyleTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveOrderArgs = {
    input: OrderInput;
};
export declare type MutationUpdateOrderArgs = {
    input: OrderUpdateInput;
};
export declare type MutationDeleteOrderArgs = {
    id: Scalars["ID"];
};
export declare type MutationOrderFollowupArgs = {
    input: OrderFollowupInput;
};
export declare type MutationScheduleSurgeryArgs = {
    input: ScheduleSurgeryInput;
};
export declare type MutationScheduleTreatmentArgs = {
    input: ScheduleTreatmentInput;
};
export declare type MutationConfirmOrderArgs = {
    orderId: Scalars["ID"];
    invoiceNo: Scalars["String"];
};
export declare type MutationSaveOrganizationDetailsArgs = {
    input: OrganizationDetailsInput;
};
export declare type MutationSavePastIllnessTypesArgs = {
    input: PastIllnessTypeInput;
};
export declare type MutationUpdatePastIllnessTypeArgs = {
    input: PastIllnessTypeUpdateInput;
};
export declare type MutationDeletePastIllnessTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationSavePatientArgs = {
    input: PatientInput;
};
export declare type MutationUpdatePatientArgs = {
    input: PatientUpdateInput;
};
export declare type MutationDeletePatientArgs = {
    id: Scalars["ID"];
};
export declare type MutationSavePatientChartArgs = {
    input: PatientChartInput;
};
export declare type MutationUpdatePatientChartArgs = {
    input: PatientChartUpdateInput;
};
export declare type MutationDeletePatientChartArgs = {
    id: Scalars["ID"];
};
export declare type MutationLockPatientChartArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveVitalSignsArgs = {
    input: VitalSignsInput;
};
export declare type MutationUpdateVitalSignsArgs = {
    input: VitalSignsUpdateInput;
};
export declare type MutationSaveOphthalmologyExamArgs = {
    input: OpthalmologyExamInput;
};
export declare type MutationUpdateOphthalmologyExamArgs = {
    input: OpthalmologyExamUpdateInput;
};
export declare type MutationSavePatientDiagnosisArgs = {
    input: PatientDiagnosisInput;
};
export declare type MutationUpdatePatientDiagnosisArgs = {
    input: PatientDiagnosisUpdateInput;
};
export declare type MutationDeletePatientDiagnosisArgs = {
    id: Scalars["ID"];
};
export declare type MutationSavePatientEncounterLimitArgs = {
    input: PatientEncounterLimitInput;
};
export declare type MutationUpdatePatientEncounterLimitArgs = {
    input: PatientEncounterLimitUpdateInput;
};
export declare type MutationDeletePatientEncounterLimitArgs = {
    id: Scalars["ID"];
};
export declare type MutationSavePastIllnessArgs = {
    input: PastIllnessInput;
};
export declare type MutationSavePastInjuryArgs = {
    input: PastInjuryInput;
};
export declare type MutationSavePastHospitalizationArgs = {
    input: PastHospitalizationInput;
};
export declare type MutationSavePastSurgeryArgs = {
    input: PastSurgeryInput;
};
export declare type MutationSaveLifestyleArgs = {
    input: LifestyleInput;
};
export declare type MutationSaveFamilyIllnessArgs = {
    input: FamilyIllnessInput;
};
export declare type MutationUpdatePatientHistoryArgs = {
    input: PatientHistoryUpdateInput;
};
export declare type MutationUpdatePastIllnessArgs = {
    input: PastIllnessUpdateInput;
};
export declare type MutationUpdatePastInjuryArgs = {
    input: PastInjuryUpdateInput;
};
export declare type MutationUpdatePastHospitalizationArgs = {
    input: PastHospitalizationUpdateInput;
};
export declare type MutationUpdatePastSurgeryArgs = {
    input: PastSurgeryUpdateInput;
};
export declare type MutationUpdateLifestyleArgs = {
    input: LifestyleUpdateInput;
};
export declare type MutationUpdateFamilyIllnessArgs = {
    input: FamilyIllnessUpdateInput;
};
export declare type MutationDeletePastIllnessArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeletePastInjuryArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeletePastHospitalizationArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeletePastSurgeryArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeleteLifestyleArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeleteFamilyIllnessArgs = {
    id: Scalars["ID"];
};
export declare type MutationSubscribeQueueArgs = {
    userId: Scalars["ID"];
    patientQueueId: Scalars["ID"];
};
export declare type MutationUnsubscribeQueueArgs = {
    userId: Scalars["ID"];
    patientQueueId: Scalars["ID"];
};
export declare type MutationSavePatientQueueArgs = {
    input: PatientQueueInput;
};
export declare type MutationDeleteFromQueueArgs = {
    patientQueueId: Scalars["ID"];
    appointmentId: Scalars["ID"];
};
export declare type MutationCheckOutPatientArgs = {
    patientQueueId: Scalars["ID"];
    appointmentId: Scalars["ID"];
};
export declare type MutationPushPatientQueueArgs = {
    patientQueueId: Scalars["ID"];
    appointmentId: Scalars["ID"];
    destination: Destination;
};
export declare type MutationMovePatientQueueArgs = {
    appointmentId: Scalars["ID"];
    sourceQueueId: Scalars["ID"];
    destinationQueueId: Scalars["ID"];
};
export declare type MutationCheckInPatientArgs = {
    appointmentId: Scalars["ID"];
    destination: Destination;
};
export declare type MutationUpdatePatientQueueArgs = {
    appointmentId: Scalars["ID"];
    destination?: InputMaybe<Destination>;
};
export declare type MutationSavePaymentArgs = {
    input: PaymentInput;
};
export declare type MutationUpdatePaymentArgs = {
    input: PaymentInput;
};
export declare type MutationDeletePaymentArgs = {
    id: Scalars["ID"];
};
export declare type MutationConfirmPaymentArgs = {
    id: Scalars["ID"];
    invoiceNo: Scalars["String"];
};
export declare type MutationConfirmPaymentsArgs = {
    ids: Array<Scalars["ID"]>;
    invoiceNo: Scalars["String"];
};
export declare type MutationRequestPaymentWaiverArgs = {
    paymentId: Scalars["ID"];
    patientId: Scalars["ID"];
};
export declare type MutationRequestPaymentWaiversArgs = {
    ids: Array<Scalars["ID"]>;
    patientId: Scalars["ID"];
};
export declare type MutationSavePaymentWaiverArgs = {
    input: PaymentWaiverInput;
};
export declare type MutationUpdatePaymentWaiverArgs = {
    input: PaymentWaiverUpdateInput;
};
export declare type MutationDeletePaymentWaiverArgs = {
    id: Scalars["ID"];
};
export declare type MutationApprovePaymentWaiverArgs = {
    id: Scalars["ID"];
    approve: Scalars["Boolean"];
};
export declare type MutationCreatePharmacyArgs = {
    input: PharmacyInput;
};
export declare type MutationUpdatePharmacyArgs = {
    input: PharmacyUpdateInput;
};
export declare type MutationDeletePharmacyArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveExamCategoryArgs = {
    input: ExamCategoryInput;
};
export declare type MutationUpdateExamCategoryArgs = {
    input: ExamCategoryUpdateInput;
};
export declare type MutationSaveExamFindingArgs = {
    input: ExamFindingInput;
};
export declare type MutationUpdateExamFindingArgs = {
    input: ExamFindingUpdateInput;
};
export declare type MutationSavePhysicalExamFindingArgs = {
    input: PhysicalExamFindingInput;
};
export declare type MutationUpdatePhysicalExamFindingArgs = {
    input: PhysicalExamFindingUpdateInput;
};
export declare type MutationDeletePhysicalExamFindingArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeletePhysicalExamFindingExamCategoryArgs = {
    physicalExamFindingId: Scalars["ID"];
    examCategoryId: Scalars["ID"];
};
export declare type MutationSavePlanTypeArgs = {
    input: PlanTypeInput;
};
export declare type MutationUpdatePlanTypeArgs = {
    input: PlanTypeInput;
    id: Scalars["ID"];
};
export declare type MutationDeletePlanTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveMedicationPrescriptionArgs = {
    input: MedicalPrescriptionOrderInput;
};
export declare type MutationSavePastMedicationArgs = {
    input: MedicalPrescriptionInput;
};
export declare type MutationSaveEyewearPrescriptionArgs = {
    input: EyewearPrescriptionInput;
};
export declare type MutationUpdateMedicationPrescriptionArgs = {
    input: MedicalPrescriptionUpdateInput;
};
export declare type MutationUpdateEyewearPrescriptionArgs = {
    input: EyewearPrescriptionUpdateInput;
};
export declare type MutationDeleteMedicalPrescriptionArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeleteEyewearPrescriptionArgs = {
    id: Scalars["ID"];
};
export declare type MutationUpdateMedicationPrescriptionOrderArgs = {
    input: MedicationPrescriptionUpdateInput;
};
export declare type MutationUpdateEyewearPrescriptionOrderArgs = {
    input: EyewearPrescriptionOrderUpdateInput;
};
export declare type MutationOrderReferralArgs = {
    input: OrderReferralInput;
};
export declare type MutationConfirmReferralOrderArgs = {
    input: ConfirmReferralOrderInput;
};
export declare type MutationDeleteReferralArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveSystemArgs = {
    input: SystemInput;
};
export declare type MutationUpdateSystemArgs = {
    input: SystemUpdateInput;
};
export declare type MutationSaveSystemSymptomArgs = {
    input: SystemSymptomInput;
};
export declare type MutationUpdateSystemSymptomArgs = {
    input: SystemSymptomUpdateInput;
};
export declare type MutationSaveReviewOfSystemArgs = {
    input: ReviewOfSystemInput;
};
export declare type MutationUpdateReviewOfSystemArgs = {
    input: ReviewOfSystemUpdateInput;
};
export declare type MutationDeleteReviewOfSystemArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveRoomArgs = {
    input: RoomInput;
};
export declare type MutationUpdateRoomArgs = {
    input: RoomInput;
    id: Scalars["ID"];
};
export declare type MutationDeleteRoomArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveSupplyArgs = {
    input: SupplyInput;
};
export declare type MutationUpdateSupplyArgs = {
    input: SupplyUpdateInput;
};
export declare type MutationDeleteSupplyArgs = {
    id: Scalars["ID"];
};
export declare type MutationOrderSurgicalProcedureArgs = {
    input: OrderSurgicalInput;
};
export declare type MutationConfirmSurgicalOrderArgs = {
    input: ConfirmSurgicalOrderInput;
};
export declare type MutationSaveSurgicalProcedureArgs = {
    input: SurgicalProcedureInput;
};
export declare type MutationUpdateSurgicalProcedureArgs = {
    input: SurgicalProcedureUpdateInput;
};
export declare type MutationDeleteSurgicalProcedureArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveSurgicalProcedureTypeArgs = {
    input: SurgicalProcedureTypeInput;
};
export declare type MutationUpdateSurgicalProcedureTypeArgs = {
    input: SurgicalProcedureTypeUpdateInput;
};
export declare type MutationDeleteSurgicalProcedureTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationDeletePreanestheticDocumentArgs = {
    surgicalProcedureId: Scalars["ID"];
    fileId: Scalars["ID"];
};
export declare type MutationUpdateSurgeryFitnessArgs = {
    id: Scalars["ID"];
    fit: Scalars["Boolean"];
};
export declare type MutationOrderAndConfirmSurgeryArgs = {
    input: OrderAndConfirmSurgicalProcedureInput;
};
export declare type MutationOrderTreatmentArgs = {
    input: OrderTreatmentInput;
};
export declare type MutationConfirmTreatmentOrderArgs = {
    input: ConfirmTreatmentOrderInput;
};
export declare type MutationSaveTreatmentArgs = {
    input: TreatmentInput;
};
export declare type MutationUpdateTreatmentArgs = {
    input: TreatmentUpdateInput;
};
export declare type MutationDeleteTreatmentArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveTreatmentTypeArgs = {
    input: TreatmentTypeInput;
};
export declare type MutationUpdateTreatmentTypeArgs = {
    input: TreatmentTypeUpdateInput;
};
export declare type MutationDeleteTreatmentTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationSignupArgs = {
    input: UserInput;
};
export declare type MutationLoginArgs = {
    input: LoginInput;
};
export declare type MutationResetPasswordArgs = {
    id: Scalars["ID"];
};
export declare type MutationUpdateUserArgs = {
    input: UserUpdateInput;
};
export declare type MutationChangePasswordArgs = {
    input: ChangePasswordInput;
};
export declare type MutationSaveUserTypeArgs = {
    input: UserTypeInput;
};
export declare type MutationUpdateUserTypeArgs = {
    input: UserTypeUpdateInput;
};
export declare type MutationDeleteUserTypeArgs = {
    id: Scalars["ID"];
};
export declare type MutationSaveVisitTypeArgs = {
    input: VisitTypeInput;
};
export declare type MutationUpdateVisitTypeArgs = {
    input: VisitTypeInput;
    id: Scalars["ID"];
};
export declare type MutationDeleteVisitTypeArgs = {
    id: Scalars["ID"];
};
export declare type NewTodo = {
    text: Scalars["String"];
    userId: Scalars["String"];
};
export declare type Notif = {
    __typename?: "Notif";
    diagnosticProcedureOrders: Scalars["Int"];
    labOrders: Scalars["Int"];
    treatmentOrders: Scalars["Int"];
    surgicalOrders: Scalars["Int"];
    referralOrders: Scalars["Int"];
    followUpOrders: Scalars["Int"];
    paymentWaivers: Scalars["Int"];
};
export declare type Notification = {
    __typename?: "Notification";
    message: Scalars["String"];
    type: NotifType;
    id: Scalars["ID"];
};
export declare enum NotifType {
    Chat = "CHAT"
}
export declare type OphthalmologyExamFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type OpthalmologyExam = {
    __typename?: "OpthalmologyExam";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    rightOrbits?: Maybe<Scalars["String"]>;
    leftOrbits?: Maybe<Scalars["String"]>;
    rightLids?: Maybe<Scalars["String"]>;
    leftLids?: Maybe<Scalars["String"]>;
    rightLacrimalSystem?: Maybe<Scalars["String"]>;
    leftLacrimalSystem?: Maybe<Scalars["String"]>;
    externalExamNote?: Maybe<Scalars["String"]>;
    rightCoverTest?: Maybe<Scalars["String"]>;
    leftCoverTest?: Maybe<Scalars["String"]>;
    coverTestNote?: Maybe<Scalars["String"]>;
    rightRetina?: Maybe<Scalars["String"]>;
    leftRetina?: Maybe<Scalars["String"]>;
    leftRetinaSketch?: Maybe<Scalars["String"]>;
    rightRetinaSketch?: Maybe<Scalars["String"]>;
    funduscopyNote?: Maybe<Scalars["String"]>;
    rightOcularMotility?: Maybe<Scalars["String"]>;
    leftOcularMotility?: Maybe<Scalars["String"]>;
    rsr?: Maybe<Scalars["String"]>;
    rio?: Maybe<Scalars["String"]>;
    rlr?: Maybe<Scalars["String"]>;
    rmr?: Maybe<Scalars["String"]>;
    rir?: Maybe<Scalars["String"]>;
    rso?: Maybe<Scalars["String"]>;
    rightFlick?: Maybe<Scalars["Boolean"]>;
    lsr?: Maybe<Scalars["String"]>;
    lio?: Maybe<Scalars["String"]>;
    llr?: Maybe<Scalars["String"]>;
    lmr?: Maybe<Scalars["String"]>;
    lir?: Maybe<Scalars["String"]>;
    lso?: Maybe<Scalars["String"]>;
    leftFlick?: Maybe<Scalars["Boolean"]>;
    distance?: Maybe<Scalars["String"]>;
    near?: Maybe<Scalars["String"]>;
    ocularMotilityNote?: Maybe<Scalars["String"]>;
    rightOpticDisc?: Maybe<Scalars["String"]>;
    leftOpticDisc?: Maybe<Scalars["String"]>;
    rightOpticDiscSketch?: Maybe<Scalars["String"]>;
    leftOpticDiscSketch?: Maybe<Scalars["String"]>;
    rightCdr?: Maybe<Scalars["String"]>;
    leftCdr?: Maybe<Scalars["String"]>;
    opticDiscNote?: Maybe<Scalars["String"]>;
    rightPupils?: Maybe<Scalars["String"]>;
    leftPupils?: Maybe<Scalars["String"]>;
    pupilsNote?: Maybe<Scalars["String"]>;
    rightConjunctiva?: Maybe<Scalars["String"]>;
    leftConjunctiva?: Maybe<Scalars["String"]>;
    rightCornea?: Maybe<Scalars["String"]>;
    leftCornea?: Maybe<Scalars["String"]>;
    rightCorneaSketch?: Maybe<Scalars["String"]>;
    leftCorneaSketch?: Maybe<Scalars["String"]>;
    leftSclera?: Maybe<Scalars["String"]>;
    rightSclera?: Maybe<Scalars["String"]>;
    rightAnteriorChamber?: Maybe<Scalars["String"]>;
    leftAnteriorChamber?: Maybe<Scalars["String"]>;
    rightIris?: Maybe<Scalars["String"]>;
    leftIris?: Maybe<Scalars["String"]>;
    rightLens?: Maybe<Scalars["String"]>;
    leftLens?: Maybe<Scalars["String"]>;
    rightLensSketch?: Maybe<Scalars["String"]>;
    leftLensSketch?: Maybe<Scalars["String"]>;
    rightVitreos?: Maybe<Scalars["String"]>;
    leftVitreos?: Maybe<Scalars["String"]>;
    slitLampExamNote?: Maybe<Scalars["String"]>;
};
export declare type OpthalmologyExamInput = {
    patientChartId: Scalars["ID"];
    rightOrbits?: InputMaybe<Scalars["String"]>;
    leftOrbits?: InputMaybe<Scalars["String"]>;
    rightLids?: InputMaybe<Scalars["String"]>;
    leftLids?: InputMaybe<Scalars["String"]>;
    rightLacrimalSystem?: InputMaybe<Scalars["String"]>;
    leftLacrimalSystem?: InputMaybe<Scalars["String"]>;
    externalExamNote?: InputMaybe<Scalars["String"]>;
    rightCoverTest?: InputMaybe<Scalars["String"]>;
    leftCoverTest?: InputMaybe<Scalars["String"]>;
    coverTestNote?: InputMaybe<Scalars["String"]>;
    rightRetina?: InputMaybe<Scalars["String"]>;
    leftRetina?: InputMaybe<Scalars["String"]>;
    leftRetinaSketch?: InputMaybe<Scalars["String"]>;
    rightRetinaSketch?: InputMaybe<Scalars["String"]>;
    funduscopyNote?: InputMaybe<Scalars["String"]>;
    rightOcularMotility?: InputMaybe<Scalars["String"]>;
    leftOcularMotility?: InputMaybe<Scalars["String"]>;
    rsr?: InputMaybe<Scalars["String"]>;
    rio?: InputMaybe<Scalars["String"]>;
    rlr?: InputMaybe<Scalars["String"]>;
    rmr?: InputMaybe<Scalars["String"]>;
    rir?: InputMaybe<Scalars["String"]>;
    rso?: InputMaybe<Scalars["String"]>;
    rightFlick?: InputMaybe<Scalars["Boolean"]>;
    lsr?: InputMaybe<Scalars["String"]>;
    lio?: InputMaybe<Scalars["String"]>;
    llr?: InputMaybe<Scalars["String"]>;
    lmr?: InputMaybe<Scalars["String"]>;
    lir?: InputMaybe<Scalars["String"]>;
    lso?: InputMaybe<Scalars["String"]>;
    leftFlick?: InputMaybe<Scalars["Boolean"]>;
    distance?: InputMaybe<Scalars["String"]>;
    near?: InputMaybe<Scalars["String"]>;
    ocularMotilityNote?: InputMaybe<Scalars["String"]>;
    rightOpticDisc?: InputMaybe<Scalars["String"]>;
    leftOpticDisc?: InputMaybe<Scalars["String"]>;
    rightOpticDiscSketch?: InputMaybe<Scalars["String"]>;
    leftOpticDiscSketch?: InputMaybe<Scalars["String"]>;
    rightCdr?: InputMaybe<Scalars["String"]>;
    leftCdr?: InputMaybe<Scalars["String"]>;
    opticDiscNote?: InputMaybe<Scalars["String"]>;
    rightPupils?: InputMaybe<Scalars["String"]>;
    leftPupils?: InputMaybe<Scalars["String"]>;
    pupilsNote?: InputMaybe<Scalars["String"]>;
    rightConjunctiva?: InputMaybe<Scalars["String"]>;
    leftConjunctiva?: InputMaybe<Scalars["String"]>;
    rightCornea?: InputMaybe<Scalars["String"]>;
    leftCornea?: InputMaybe<Scalars["String"]>;
    rightCorneaSketch?: InputMaybe<Scalars["String"]>;
    leftCorneaSketch?: InputMaybe<Scalars["String"]>;
    leftSclera?: InputMaybe<Scalars["String"]>;
    rightSclera?: InputMaybe<Scalars["String"]>;
    rightAnteriorChamber?: InputMaybe<Scalars["String"]>;
    leftAnteriorChamber?: InputMaybe<Scalars["String"]>;
    rightIris?: InputMaybe<Scalars["String"]>;
    leftIris?: InputMaybe<Scalars["String"]>;
    rightLens?: InputMaybe<Scalars["String"]>;
    leftLens?: InputMaybe<Scalars["String"]>;
    rightLensSketch?: InputMaybe<Scalars["String"]>;
    leftLensSketch?: InputMaybe<Scalars["String"]>;
    rightVitreos?: InputMaybe<Scalars["String"]>;
    leftVitreos?: InputMaybe<Scalars["String"]>;
    slitLampExamNote?: InputMaybe<Scalars["String"]>;
};
export declare type OpthalmologyExamUpdateInput = {
    id: Scalars["ID"];
    rightOrbits?: InputMaybe<Scalars["String"]>;
    leftOrbits?: InputMaybe<Scalars["String"]>;
    rightLids?: InputMaybe<Scalars["String"]>;
    leftLids?: InputMaybe<Scalars["String"]>;
    rightLacrimalSystem?: InputMaybe<Scalars["String"]>;
    leftLacrimalSystem?: InputMaybe<Scalars["String"]>;
    externalExamNote?: InputMaybe<Scalars["String"]>;
    rightCoverTest?: InputMaybe<Scalars["String"]>;
    leftCoverTest?: InputMaybe<Scalars["String"]>;
    coverTestNote?: InputMaybe<Scalars["String"]>;
    rightRetina?: InputMaybe<Scalars["String"]>;
    leftRetina?: InputMaybe<Scalars["String"]>;
    leftRetinaSketch?: InputMaybe<Scalars["String"]>;
    rightRetinaSketch?: InputMaybe<Scalars["String"]>;
    funduscopyNote?: InputMaybe<Scalars["String"]>;
    rightOcularMotility?: InputMaybe<Scalars["String"]>;
    leftOcularMotility?: InputMaybe<Scalars["String"]>;
    rsr?: InputMaybe<Scalars["String"]>;
    rio?: InputMaybe<Scalars["String"]>;
    rlr?: InputMaybe<Scalars["String"]>;
    rmr?: InputMaybe<Scalars["String"]>;
    rir?: InputMaybe<Scalars["String"]>;
    rso?: InputMaybe<Scalars["String"]>;
    rightFlick?: InputMaybe<Scalars["Boolean"]>;
    lsr?: InputMaybe<Scalars["String"]>;
    lio?: InputMaybe<Scalars["String"]>;
    llr?: InputMaybe<Scalars["String"]>;
    lmr?: InputMaybe<Scalars["String"]>;
    lir?: InputMaybe<Scalars["String"]>;
    lso?: InputMaybe<Scalars["String"]>;
    leftFlick?: InputMaybe<Scalars["Boolean"]>;
    distance?: InputMaybe<Scalars["String"]>;
    near?: InputMaybe<Scalars["String"]>;
    ocularMotilityNote?: InputMaybe<Scalars["String"]>;
    rightOpticDisc?: InputMaybe<Scalars["String"]>;
    leftOpticDisc?: InputMaybe<Scalars["String"]>;
    rightOpticDiscSketch?: InputMaybe<Scalars["String"]>;
    leftOpticDiscSketch?: InputMaybe<Scalars["String"]>;
    rightCdr?: InputMaybe<Scalars["String"]>;
    leftCdr?: InputMaybe<Scalars["String"]>;
    opticDiscNote?: InputMaybe<Scalars["String"]>;
    rightPupils?: InputMaybe<Scalars["String"]>;
    leftPupils?: InputMaybe<Scalars["String"]>;
    pupilsNote?: InputMaybe<Scalars["String"]>;
    rightConjunctiva?: InputMaybe<Scalars["String"]>;
    leftConjunctiva?: InputMaybe<Scalars["String"]>;
    rightCornea?: InputMaybe<Scalars["String"]>;
    leftCornea?: InputMaybe<Scalars["String"]>;
    rightCorneaSketch?: InputMaybe<Scalars["String"]>;
    leftCorneaSketch?: InputMaybe<Scalars["String"]>;
    leftSclera?: InputMaybe<Scalars["String"]>;
    rightSclera?: InputMaybe<Scalars["String"]>;
    rightAnteriorChamber?: InputMaybe<Scalars["String"]>;
    leftAnteriorChamber?: InputMaybe<Scalars["String"]>;
    rightIris?: InputMaybe<Scalars["String"]>;
    leftIris?: InputMaybe<Scalars["String"]>;
    rightLens?: InputMaybe<Scalars["String"]>;
    leftLens?: InputMaybe<Scalars["String"]>;
    rightLensSketch?: InputMaybe<Scalars["String"]>;
    leftLensSketch?: InputMaybe<Scalars["String"]>;
    rightVitreos?: InputMaybe<Scalars["String"]>;
    leftVitreos?: InputMaybe<Scalars["String"]>;
    slitLampExamNote?: InputMaybe<Scalars["String"]>;
};
export declare type Order = {
    __typename?: "Order";
    id: Scalars["ID"];
    userId: Scalars["ID"];
    user: User;
    firstName?: Maybe<Scalars["String"]>;
    lastName?: Maybe<Scalars["String"]>;
    phoneNo?: Maybe<Scalars["String"]>;
    patientId?: Maybe<Scalars["ID"]>;
    patientChartId?: Maybe<Scalars["ID"]>;
    appointmentId?: Maybe<Scalars["ID"]>;
    emergency?: Maybe<Scalars["Boolean"]>;
    note: Scalars["String"];
    status: Scalars["String"];
    orderType: Scalars["String"];
    payments: Array<Payment>;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type OrderAndConfirmDiagnosticProcedureInput = {
    appointmentId: Scalars["ID"];
    patientId: Scalars["ID"];
    diagnosticProcedureTypeId: Scalars["ID"];
    billingId: Scalars["ID"];
    invoiceNo: Scalars["String"];
    orderNote: Scalars["String"];
};
export declare type OrderAndConfirmLabInput = {
    appointmentId: Scalars["ID"];
    patientId: Scalars["ID"];
    labTypeId: Scalars["ID"];
    billingIds: Array<Scalars["ID"]>;
    invoiceNo: Scalars["String"];
    orderNote: Scalars["String"];
};
export declare type OrderAndConfirmSurgicalProcedureInput = {
    providerId: Scalars["ID"];
    patientId: Scalars["ID"];
    surgicalProcedureTypeId: Scalars["ID"];
    billingId: Scalars["ID"];
    invoiceNo: Scalars["String"];
    orderNote: Scalars["String"];
    checkInTime: Scalars["Time"];
    roomId: Scalars["ID"];
    visitTypeId: Scalars["ID"];
    performOnEye: Scalars["String"];
};
export declare type OrderConnection = Connection & {
    __typename?: "OrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<OrderEdge>>;
};
export declare type OrderDiagnosticProcedureInput = {
    diagnosticProcedureTypeId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    appointmentId: Scalars["ID"];
    patientId: Scalars["ID"];
    billingId: Scalars["ID"];
    orderNote: Scalars["String"];
    receptionNote: Scalars["String"];
};
export declare enum OrderDirection {
    Asc = "asc",
    Desc = "desc"
}
export declare type OrderEdge = {
    __typename?: "OrderEdge";
    node: Order;
};
export declare type OrderFilterInput = {
    userId?: InputMaybe<Scalars["ID"]>;
    appointmentId?: InputMaybe<Scalars["ID"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
    orderType?: InputMaybe<Scalars["String"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
    date?: InputMaybe<Scalars["Time"]>;
};
export declare type OrderFollowupInput = {
    appointmentId: Scalars["ID"];
    note?: InputMaybe<Scalars["String"]>;
};
export declare type OrderFollowUpInput = {
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    receptionNote: Scalars["String"];
};
export declare type OrderInput = {
    userId: Scalars["ID"];
    emergency?: InputMaybe<Scalars["Boolean"]>;
    note: Scalars["String"];
    status: Scalars["String"];
    orderType: Scalars["String"];
    paymentIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare type OrderLabInput = {
    labTypeId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    billingIds: Array<Scalars["ID"]>;
    orderNote: Scalars["String"];
    receptionNote: Scalars["String"];
};
export declare type OrderReferralInput = {
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    receptionNote?: InputMaybe<Scalars["String"]>;
    reason: Scalars["String"];
    referredToId?: InputMaybe<Scalars["ID"]>;
    providerName?: InputMaybe<Scalars["String"]>;
    type: ReferralType;
};
export declare type OrdersCount = {
    __typename?: "OrdersCount";
    diagnosticProcedureOrders: Scalars["Int"];
    labOrders: Scalars["Int"];
    treatmentOrders: Scalars["Int"];
    surgicalOrders: Scalars["Int"];
    referralOrders: Scalars["Int"];
    followUpOrders: Scalars["Int"];
};
export declare type OrderSurgicalInput = {
    surgicalProcedureTypeId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    appointmentId: Scalars["ID"];
    patientId: Scalars["ID"];
    billingId: Scalars["ID"];
    performOnEye: Scalars["String"];
    orderNote: Scalars["String"];
    receptionNote: Scalars["String"];
};
export declare type OrderTreatmentInput = {
    treatmentTypeId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    appointmentId: Scalars["ID"];
    patientId: Scalars["ID"];
    billingId: Scalars["ID"];
    orderNote: Scalars["String"];
    treatmentNote: Scalars["String"];
};
export declare type OrderUpdateInput = {
    id: Scalars["ID"];
    userId?: InputMaybe<Scalars["ID"]>;
    emergency?: InputMaybe<Scalars["Boolean"]>;
    note?: InputMaybe<Scalars["String"]>;
    status?: InputMaybe<Scalars["String"]>;
    orderType?: InputMaybe<Scalars["String"]>;
};
export declare type OrganizationDetails = {
    __typename?: "OrganizationDetails";
    id: Scalars["ID"];
    name?: Maybe<Scalars["String"]>;
    phoneNo?: Maybe<Scalars["String"]>;
    phoneNo2?: Maybe<Scalars["String"]>;
    address?: Maybe<Scalars["String"]>;
    address2?: Maybe<Scalars["String"]>;
    website?: Maybe<Scalars["String"]>;
    email?: Maybe<Scalars["String"]>;
    lanIpAddress?: Maybe<Scalars["String"]>;
    logoId?: Maybe<Scalars["ID"]>;
    logo?: Maybe<File>;
    defaultMedicalDepartment?: Maybe<Scalars["String"]>;
};
export declare type OrganizationDetailsInput = {
    name?: InputMaybe<Scalars["String"]>;
    phoneNo?: InputMaybe<Scalars["String"]>;
    phoneNo2?: InputMaybe<Scalars["String"]>;
    address?: InputMaybe<Scalars["String"]>;
    address2?: InputMaybe<Scalars["String"]>;
    website?: InputMaybe<Scalars["String"]>;
    email?: InputMaybe<Scalars["String"]>;
    lanIpAddress?: InputMaybe<Scalars["String"]>;
    logo?: InputMaybe<FileUpload>;
    defaultMedicalDepartment?: InputMaybe<Scalars["String"]>;
};
export declare type PageInfo = {
    __typename?: "PageInfo";
    totalPages: Scalars["Int"];
};
export declare type PaginationInput = {
    page: Scalars["Int"];
    size: Scalars["Int"];
};
export declare type PastHospitalization = {
    __typename?: "PastHospitalization";
    id: Scalars["ID"];
    reason: Scalars["String"];
    provider: Scalars["String"];
    from?: Maybe<Scalars["Time"]>;
    to?: Maybe<Scalars["Time"]>;
    patientHistoryId: Scalars["ID"];
};
export declare type PastHospitalizationInput = {
    reason: Scalars["String"];
    provider: Scalars["String"];
    from?: InputMaybe<Scalars["Time"]>;
    to?: InputMaybe<Scalars["Time"]>;
    patientHistoryId: Scalars["ID"];
};
export declare type PastHospitalizationUpdateInput = {
    id: Scalars["ID"];
    reason?: InputMaybe<Scalars["String"]>;
    provider?: InputMaybe<Scalars["String"]>;
    from?: InputMaybe<Scalars["Time"]>;
    to?: InputMaybe<Scalars["Time"]>;
};
export declare type PastIllness = {
    __typename?: "PastIllness";
    id: Scalars["ID"];
    title: Scalars["String"];
    description: Scalars["String"];
    patientHistoryId: Scalars["ID"];
};
export declare type PastIllnessInput = {
    title: Scalars["String"];
    description: Scalars["String"];
    patientHistoryId: Scalars["ID"];
};
export declare type PastIllnessType = {
    __typename?: "PastIllnessType";
    id: Scalars["ID"];
    title: Scalars["String"];
};
export declare type PastIllnessTypeConnection = Connection & {
    __typename?: "PastIllnessTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PastIllnessTypeEdge>>;
};
export declare type PastIllnessTypeEdge = {
    __typename?: "PastIllnessTypeEdge";
    node: PastIllnessType;
};
export declare type PastIllnessTypeInput = {
    title: Scalars["String"];
};
export declare type PastIllnessTypeUpdateInput = {
    id: Scalars["ID"];
    title: Scalars["String"];
};
export declare type PastIllnessUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    description?: InputMaybe<Scalars["String"]>;
};
export declare type PastInjury = {
    __typename?: "PastInjury";
    id: Scalars["ID"];
    description: Scalars["String"];
    injuryDate?: Maybe<Scalars["Time"]>;
    patientHistoryId: Scalars["ID"];
};
export declare type PastInjuryInput = {
    description: Scalars["String"];
    injuryDate?: InputMaybe<Scalars["Time"]>;
    patientHistoryId: Scalars["ID"];
};
export declare type PastInjuryUpdateInput = {
    id: Scalars["ID"];
    description?: InputMaybe<Scalars["String"]>;
    injuryDate?: InputMaybe<Scalars["Time"]>;
};
export declare type PastSurgery = {
    __typename?: "PastSurgery";
    id: Scalars["ID"];
    description: Scalars["String"];
    surgeryDate?: Maybe<Scalars["Time"]>;
    patientHistoryId: Scalars["ID"];
};
export declare type PastSurgeryInput = {
    description: Scalars["String"];
    surgeryDate?: InputMaybe<Scalars["Time"]>;
    patientHistoryId: Scalars["ID"];
};
export declare type PastSurgeryUpdateInput = {
    id: Scalars["ID"];
    description?: InputMaybe<Scalars["String"]>;
    surgeryDate?: InputMaybe<Scalars["Time"]>;
};
export declare type Patient = {
    __typename?: "Patient";
    id: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    gender: Scalars["String"];
    phoneNo: Scalars["String"];
    phoneNo2: Scalars["String"];
    homePhone: Scalars["String"];
    email: Scalars["String"];
    dateOfBirth: Scalars["Time"];
    idNo: Scalars["String"];
    idType: Scalars["String"];
    martialStatus: Scalars["String"];
    occupation: Scalars["String"];
    credit?: Maybe<Scalars["Boolean"]>;
    creditCompany?: Maybe<Scalars["String"]>;
    emergencyContactName: Scalars["String"];
    emergencyContactRel: Scalars["String"];
    emergencyContactPhone: Scalars["String"];
    emergencyContactPhone2: Scalars["String"];
    emergencyContactMemo: Scalars["String"];
    region: Scalars["String"];
    city: Scalars["String"];
    subCity: Scalars["String"];
    woreda: Scalars["String"];
    zone: Scalars["String"];
    kebele: Scalars["String"];
    houseNo: Scalars["String"];
    cardNo?: Maybe<Scalars["String"]>;
    paperRecord: Scalars["Boolean"];
    paperRecordDocumentId?: Maybe<Scalars["ID"]>;
    paperRecordDocument?: Maybe<File>;
    documents?: Maybe<Array<Maybe<File>>>;
    memo: Scalars["String"];
    patientHistory: PatientHistory;
};
export declare type PatientChart = {
    __typename?: "PatientChart";
    id: Scalars["ID"];
    appointmentId: Scalars["ID"];
    vitalSigns: VitalSigns;
    opthalmologyExam: OpthalmologyExam;
    physicalExamFindings: Array<PhysicalExamFinding>;
    surgicalProcedure: SurgicalProcedure;
    treatment: Treatment;
    chiefComplaints: Array<Maybe<ChiefComplaint>>;
    chiefComplaintsNote?: Maybe<Scalars["String"]>;
    bloodPressure?: Maybe<Scalars["String"]>;
    hpiNote?: Maybe<Scalars["String"]>;
    diagnosisNote?: Maybe<Scalars["String"]>;
    differentialDiagnosisNote?: Maybe<Scalars["String"]>;
    rightSummarySketch?: Maybe<Scalars["String"]>;
    leftSummarySketch?: Maybe<Scalars["String"]>;
    summaryNote?: Maybe<Scalars["String"]>;
    stickieNote?: Maybe<Scalars["String"]>;
    medicalRecommendation?: Maybe<Scalars["String"]>;
    sickLeave?: Maybe<Scalars["String"]>;
    medicalPrescriptionOrder?: Maybe<MedicalPrescriptionOrder>;
    eyewearPrescriptionOrder?: Maybe<EyewearPrescriptionOrder>;
    diagnosticProcedureOrder?: Maybe<DiagnosticProcedureOrder>;
    labOrder?: Maybe<LabOrder>;
    surgicalOrder?: Maybe<SurgicalOrder>;
    treatmentOrder?: Maybe<TreatmentOrder>;
    referralOrder?: Maybe<ReferralOrder>;
    followUpOrder?: Maybe<FollowUpOrder>;
    diagnoses: Array<Maybe<PatientDiagnosis>>;
    locked?: Maybe<Scalars["Boolean"]>;
    lockedDate?: Maybe<Scalars["Time"]>;
    lockedById?: Maybe<Scalars["ID"]>;
    lockedBy?: Maybe<User>;
    amendments: Array<Amendment>;
};
export declare type PatientChartConnection = Connection & {
    __typename?: "PatientChartConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PatientChartEdge>>;
};
export declare type PatientChartEdge = {
    __typename?: "PatientChartEdge";
    node: PatientChart;
};
export declare type PatientChartInput = {
    appointmentId: Scalars["ID"];
    temperature?: InputMaybe<Scalars["Float"]>;
    pulse?: InputMaybe<Scalars["Float"]>;
    bloodPressureSystolic?: InputMaybe<Scalars["Float"]>;
    bloodPressureDiastolic?: InputMaybe<Scalars["Float"]>;
    respiratoryRate?: InputMaybe<Scalars["Float"]>;
    oxygenSaturation?: InputMaybe<Scalars["Float"]>;
    height?: InputMaybe<Scalars["Float"]>;
    weight?: InputMaybe<Scalars["Float"]>;
    bmi?: InputMaybe<Scalars["Float"]>;
    hpiNote?: InputMaybe<Scalars["String"]>;
    diagnosisNote?: InputMaybe<Scalars["String"]>;
    differentialDiagnosisNote?: InputMaybe<Scalars["String"]>;
    rightSummarySketch?: InputMaybe<Scalars["String"]>;
    leftSummarySketch?: InputMaybe<Scalars["String"]>;
    bloodPressure?: InputMaybe<Scalars["String"]>;
    summaryNote?: InputMaybe<Scalars["String"]>;
    stickieNote?: InputMaybe<Scalars["String"]>;
    medicalRecommendation?: InputMaybe<Scalars["String"]>;
    sickLeave?: InputMaybe<Scalars["String"]>;
};
export declare type PatientChartUpdateInput = {
    id: Scalars["ID"];
    temperature?: InputMaybe<Scalars["Float"]>;
    pulse?: InputMaybe<Scalars["Float"]>;
    bloodPressureSystolic?: InputMaybe<Scalars["Float"]>;
    bloodPressureDiastolic?: InputMaybe<Scalars["Float"]>;
    respiratoryRate?: InputMaybe<Scalars["Float"]>;
    oxygenSaturation?: InputMaybe<Scalars["Float"]>;
    height?: InputMaybe<Scalars["Float"]>;
    weight?: InputMaybe<Scalars["Float"]>;
    bmi?: InputMaybe<Scalars["Float"]>;
    chiefComplaintsNote?: InputMaybe<Scalars["String"]>;
    bloodPressure?: InputMaybe<Scalars["String"]>;
    hpiNote?: InputMaybe<Scalars["String"]>;
    diagnosisNote?: InputMaybe<Scalars["String"]>;
    differentialDiagnosisNote?: InputMaybe<Scalars["String"]>;
    rightSummarySketch?: InputMaybe<Scalars["String"]>;
    leftSummarySketch?: InputMaybe<Scalars["String"]>;
    summaryNote?: InputMaybe<Scalars["String"]>;
    stickieNote?: InputMaybe<Scalars["String"]>;
    medicalRecommendation?: InputMaybe<Scalars["String"]>;
    sickLeave?: InputMaybe<Scalars["String"]>;
};
export declare type PatientConnection = Connection & {
    __typename?: "PatientConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PatientEdge>>;
};
export declare type PatientDiagnosis = {
    __typename?: "PatientDiagnosis";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    categoryCode?: Maybe<Scalars["String"]>;
    diagnosisCode?: Maybe<Scalars["String"]>;
    fullCode?: Maybe<Scalars["String"]>;
    abbreviatedDescription?: Maybe<Scalars["String"]>;
    fullDescription: Scalars["String"];
    location?: Maybe<Scalars["String"]>;
    differential: Scalars["Boolean"];
};
export declare type PatientDiagnosisConnection = Connection & {
    __typename?: "PatientDiagnosisConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PatientDiagnosisEdge>>;
};
export declare type PatientDiagnosisEdge = {
    __typename?: "PatientDiagnosisEdge";
    node: PatientDiagnosis;
};
export declare type PatientDiagnosisFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    code?: InputMaybe<Scalars["String"]>;
    title?: InputMaybe<Scalars["String"]>;
    differential?: InputMaybe<Scalars["Boolean"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type PatientDiagnosisInput = {
    diagnosisId: Scalars["ID"];
    location?: InputMaybe<Scalars["String"]>;
    differential: Scalars["Boolean"];
    patientChartId: Scalars["ID"];
};
export declare type PatientDiagnosisUpdateInput = {
    id: Scalars["ID"];
    diagnosisId?: InputMaybe<Scalars["ID"]>;
    location?: InputMaybe<Scalars["String"]>;
    differential?: InputMaybe<Scalars["Boolean"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type PatientEdge = {
    __typename?: "PatientEdge";
    node: Patient;
};
export declare type PatientEncounterLimit = {
    __typename?: "PatientEncounterLimit";
    id: Scalars["ID"];
    userId: Scalars["ID"];
    user: User;
    mondayLimit: Scalars["Int"];
    tuesdayLimit: Scalars["Int"];
    wednesdayLimit: Scalars["Int"];
    thursdayLimit: Scalars["Int"];
    fridayLimit: Scalars["Int"];
    saturdayLimit: Scalars["Int"];
    sundayLimit: Scalars["Int"];
    overbook: Scalars["Int"];
};
export declare type PatientEncounterLimitConnection = Connection & {
    __typename?: "PatientEncounterLimitConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PatientEncounterLimitEdge>>;
};
export declare type PatientEncounterLimitEdge = {
    __typename?: "PatientEncounterLimitEdge";
    node: PatientEncounterLimit;
};
export declare type PatientEncounterLimitInput = {
    userId: Scalars["ID"];
    mondayLimit: Scalars["Int"];
    tuesdayLimit: Scalars["Int"];
    wednesdayLimit: Scalars["Int"];
    thursdayLimit: Scalars["Int"];
    fridayLimit: Scalars["Int"];
    saturdayLimit: Scalars["Int"];
    sundayLimit: Scalars["Int"];
};
export declare type PatientEncounterLimitUpdateInput = {
    id: Scalars["ID"];
    userId?: InputMaybe<Scalars["ID"]>;
    mondayLimit?: InputMaybe<Scalars["Int"]>;
    tuesdayLimit?: InputMaybe<Scalars["Int"]>;
    wednesdayLimit?: InputMaybe<Scalars["Int"]>;
    thursdayLimit?: InputMaybe<Scalars["Int"]>;
    fridayLimit?: InputMaybe<Scalars["Int"]>;
    saturdayLimit?: InputMaybe<Scalars["Int"]>;
    sundayLimit?: InputMaybe<Scalars["Int"]>;
    overbook?: InputMaybe<Scalars["Int"]>;
};
export declare type PatientHistory = {
    __typename?: "PatientHistory";
    id: Scalars["ID"];
    patientID: Scalars["ID"];
    reviewOfSystems: Array<Maybe<ReviewOfSystem>>;
    reviewOfSystemsNote?: Maybe<Scalars["String"]>;
    pastIllnesses: Array<Maybe<PastIllness>>;
    pastInjuries: Array<Maybe<PastInjury>>;
    pastHospitalizations: Array<Maybe<PastHospitalization>>;
    pastSurgeries: Array<Maybe<PastSurgery>>;
    lifestyle: Array<Maybe<Lifestyle>>;
    familyIllnesses: Array<Maybe<FamilyIllness>>;
};
export declare type PatientHistoryUpdateInput = {
    id: Scalars["ID"];
    reviewOfSystemsNote?: InputMaybe<Scalars["String"]>;
};
export declare type PatientInput = {
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    gender: Scalars["String"];
    phoneNo: Scalars["String"];
    phoneNo2?: InputMaybe<Scalars["String"]>;
    homePhone?: InputMaybe<Scalars["String"]>;
    email?: InputMaybe<Scalars["String"]>;
    dateOfBirth: Scalars["Time"];
    credit?: InputMaybe<Scalars["Boolean"]>;
    creditCompany?: InputMaybe<Scalars["String"]>;
    idNo?: InputMaybe<Scalars["String"]>;
    idType?: InputMaybe<Scalars["String"]>;
    martialStatus?: InputMaybe<Scalars["String"]>;
    occupation?: InputMaybe<Scalars["String"]>;
    emergencyContactName?: InputMaybe<Scalars["String"]>;
    emergencyContactRel?: InputMaybe<Scalars["String"]>;
    emergencyContactPhone?: InputMaybe<Scalars["String"]>;
    emergencyContactPhone2?: InputMaybe<Scalars["String"]>;
    emergencyContactMemo?: InputMaybe<Scalars["String"]>;
    region: Scalars["String"];
    city?: InputMaybe<Scalars["String"]>;
    subCity?: InputMaybe<Scalars["String"]>;
    woreda: Scalars["String"];
    zone?: InputMaybe<Scalars["String"]>;
    kebele?: InputMaybe<Scalars["String"]>;
    houseNo?: InputMaybe<Scalars["String"]>;
    cardNo?: InputMaybe<Scalars["String"]>;
    paperRecord: Scalars["Boolean"];
    paperRecordDocument?: InputMaybe<FileUpload>;
    documents?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    memo?: InputMaybe<Scalars["String"]>;
};
export declare type PatientQueue = {
    __typename?: "PatientQueue";
    id: Scalars["ID"];
    queueName: Scalars["String"];
    queue: Scalars["String"];
    queueType: QueueType;
};
export declare type PatientQueueInput = {
    queueName: Scalars["String"];
    queue: Array<Scalars["String"]>;
    queueType: QueueType;
};
export declare type PatientQueueWithAppointment = {
    __typename?: "PatientQueueWithAppointment";
    id: Scalars["ID"];
    queueName: Scalars["String"];
    queueType: QueueType;
    queue: Array<Appointment>;
};
export declare type PatientUpdateInput = {
    id: Scalars["ID"];
    firstName?: InputMaybe<Scalars["String"]>;
    lastName?: InputMaybe<Scalars["String"]>;
    gender?: InputMaybe<Scalars["String"]>;
    phoneNo?: InputMaybe<Scalars["String"]>;
    phoneNo2?: InputMaybe<Scalars["String"]>;
    homePhone?: InputMaybe<Scalars["String"]>;
    email?: InputMaybe<Scalars["String"]>;
    credit?: InputMaybe<Scalars["Boolean"]>;
    creditCompany?: InputMaybe<Scalars["String"]>;
    dateOfBirth?: InputMaybe<Scalars["Time"]>;
    idNo?: InputMaybe<Scalars["String"]>;
    idType?: InputMaybe<Scalars["String"]>;
    martialStatus?: InputMaybe<Scalars["String"]>;
    occupation?: InputMaybe<Scalars["String"]>;
    emergencyContactName?: InputMaybe<Scalars["String"]>;
    emergencyContactRel?: InputMaybe<Scalars["String"]>;
    emergencyContactPhone?: InputMaybe<Scalars["String"]>;
    emergencyContactPhone2?: InputMaybe<Scalars["String"]>;
    emergencyContactMemo?: InputMaybe<Scalars["String"]>;
    region?: InputMaybe<Scalars["String"]>;
    city?: InputMaybe<Scalars["String"]>;
    subCity?: InputMaybe<Scalars["String"]>;
    woreda?: InputMaybe<Scalars["String"]>;
    zone?: InputMaybe<Scalars["String"]>;
    kebele?: InputMaybe<Scalars["String"]>;
    houseNo?: InputMaybe<Scalars["String"]>;
    cardNo?: InputMaybe<Scalars["String"]>;
    paperRecord?: InputMaybe<Scalars["Boolean"]>;
    paperRecordDocument?: InputMaybe<FileUpload>;
    documents?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    memo?: InputMaybe<Scalars["String"]>;
};
export declare type Payment = {
    __typename?: "Payment";
    id: Scalars["ID"];
    invoiceNo: Scalars["String"];
    status: Scalars["String"];
    billingId: Scalars["ID"];
    billing: Billing;
    createdAt: Scalars["Time"];
};
export declare type PaymentConnection = Connection & {
    __typename?: "PaymentConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PaymentEdge>>;
};
export declare type PaymentEdge = {
    __typename?: "PaymentEdge";
    node: Payment;
};
export declare type PaymentInput = {
    invoiceNo: Scalars["String"];
    billingId: Scalars["ID"];
};
export declare type PaymentUpdateInput = {
    id: Scalars["ID"];
    invoiceNo?: InputMaybe<Scalars["String"]>;
    billingId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare type PaymentWaiver = {
    __typename?: "PaymentWaiver";
    id: Scalars["ID"];
    paymentId: Scalars["ID"];
    payment: Payment;
    userId: Scalars["ID"];
    user: User;
    patientId: Scalars["ID"];
    patient: Patient;
    approved?: Maybe<Scalars["Boolean"]>;
};
export declare type PaymentWaiverConnection = Connection & {
    __typename?: "PaymentWaiverConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PaymentWaiverEdge>>;
};
export declare type PaymentWaiverEdge = {
    __typename?: "PaymentWaiverEdge";
    node: PaymentWaiver;
};
export declare type PaymentWaiverInput = {
    paymentId: Scalars["ID"];
    patientId: Scalars["ID"];
    approved?: InputMaybe<Scalars["Boolean"]>;
};
export declare type PaymentWaiverUpdateInput = {
    id: Scalars["ID"];
    paymentId?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    approved?: InputMaybe<Scalars["Boolean"]>;
};
export declare type Pharmacy = {
    __typename?: "Pharmacy";
    id: Scalars["ID"];
    title: Scalars["String"];
    address: Scalars["String"];
    region: Scalars["String"];
    country: Scalars["String"];
    phone: Scalars["String"];
    inHouse: Scalars["Boolean"];
    active: Scalars["Boolean"];
};
export declare type PharmacyConnection = Connection & {
    __typename?: "PharmacyConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PharmacyEdge>>;
};
export declare type PharmacyEdge = {
    __typename?: "PharmacyEdge";
    node: Pharmacy;
};
export declare type PharmacyInput = {
    title: Scalars["String"];
    address: Scalars["String"];
    region: Scalars["String"];
    country: Scalars["String"];
    phone: Scalars["String"];
    inHouse: Scalars["Boolean"];
    active: Scalars["Boolean"];
};
export declare type PharmacyUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    address?: InputMaybe<Scalars["String"]>;
    region?: InputMaybe<Scalars["String"]>;
    country?: InputMaybe<Scalars["String"]>;
    phone?: InputMaybe<Scalars["String"]>;
    inHouse?: InputMaybe<Scalars["Boolean"]>;
    active?: InputMaybe<Scalars["Boolean"]>;
};
export declare type PhysicalExamFinding = {
    __typename?: "PhysicalExamFinding";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    examCategoryId: Scalars["ID"];
    examCategory: ExamCategory;
    abnormal: Scalars["Boolean"];
    note?: Maybe<Scalars["String"]>;
};
export declare type PhysicalExamFindingConnection = Connection & {
    __typename?: "PhysicalExamFindingConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<PhysicalExamFindingEdge>;
};
export declare type PhysicalExamFindingEdge = {
    __typename?: "PhysicalExamFindingEdge";
    node: PhysicalExamFinding;
};
export declare type PhysicalExamFindingFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
    examCategoryId?: InputMaybe<Scalars["ID"]>;
};
export declare type PhysicalExamFindingInput = {
    patientChartId: Scalars["ID"];
    examCategoryId: Scalars["ID"];
    abnormal: Scalars["Boolean"];
    note?: InputMaybe<Scalars["String"]>;
};
export declare type PhysicalExamFindingUpdateInput = {
    id: Scalars["ID"];
    patientChartId?: InputMaybe<Scalars["ID"]>;
    examCategoryId?: InputMaybe<Scalars["ID"]>;
    abnormal?: InputMaybe<Scalars["Boolean"]>;
    note?: InputMaybe<Scalars["String"]>;
};
export declare type PlanType = {
    __typename?: "PlanType";
    id: Scalars["ID"];
    title: Scalars["String"];
    status: Scalars["String"];
    billings: Array<Maybe<Billing>>;
};
export declare type PlanTypeConnection = Connection & {
    __typename?: "PlanTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<PlanTypeEdge>>;
};
export declare type PlanTypeEdge = {
    __typename?: "PlanTypeEdge";
    node: PlanType;
};
export declare type PlanTypeInput = {
    title: Scalars["String"];
    status: Scalars["String"];
    billingIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare type PrescriptionOrdersFilter = {
    orderedById?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare type ProgressNote = {
    __typename?: "ProgressNote";
    patientHistory?: Maybe<PatientHistory>;
    appointments: Array<Maybe<Appointment>>;
};
export declare type Query = {
    __typename?: "Query";
    todos: Array<Todo>;
    getHealthCheck: HealthCheckReport;
    receptionHomeStats: HomeStats;
    nurseHomeStats: HomeStats;
    physicianHomeStats: HomeStats;
    currentDateTime: Scalars["Time"];
    allergies: AllergyConnection;
    amendment?: Maybe<Amendment>;
    amendments: Array<Amendment>;
    appointment: Appointment;
    appointments: AppointmentConnection;
    appointmentStatuses: AppointmentStatusConnection;
    findAppointmentsByPatientAndRange: Array<Maybe<Appointment>>;
    patientsAppointmentToday?: Maybe<Appointment>;
    findTodaysAppointments: AppointmentConnection;
    findTodaysCheckedInAppointments: AppointmentConnection;
    searchAppointments: AppointmentConnection;
    getUserAppointments: AppointmentConnection;
    payForConsultation: Scalars["Boolean"];
    consultationBillings: Array<Billing>;
    billings: BillingConnection;
    billing: Billing;
    getChat: Chat;
    getUserChats: Array<Maybe<Chat>>;
    getChatMessages: Array<Maybe<ChatMessage>>;
    getChatMembers: Array<Maybe<ChatMember>>;
    getUnreadMessages: Array<Maybe<ChatUnreadMessage>>;
    getCommonChat: Chat;
    chiefComplaints: ChiefComplaintConnection;
    searchChiefComplaints: ChiefComplaintConnection;
    chiefComplaintType: ChiefComplaintType;
    chiefComplaintTypes: ChiefComplaintTypeConnection;
    diagnoses: DiagnosisConnection;
    diagnosticProcedure: DiagnosticProcedure;
    diagnosticProcedures: DiagnosticProcedureConnection;
    diagnosticProcedureOrder: DiagnosticProcedureOrder;
    searchDiagnosticProcedureOrders: DiagnosticProcedureOrderConnection;
    diagnosticProcedureTypes: DiagnosticProcedureTypeConnection;
    refraction?: Maybe<DiagnosticProcedure>;
    eyewearShop?: Maybe<EyewearShop>;
    eyewearShops: EyewearShopConnection;
    favoriteChiefComplaints: Array<Maybe<FavoriteChiefComplaint>>;
    favoriteDiagnosis: Array<Maybe<FavoriteDiagnosis>>;
    favoriteMedications: FavoriteMedicationConnection;
    userFavoriteMedications: FavoriteMedicationConnection;
    searchFavoriteMedications: FavoriteMedicationConnection;
    file: File;
    files: FileConnection;
    followUp: FollowUp;
    followUps: FollowUpConnection;
    followUpOrder: FollowUpOrder;
    searchFollowUpOrders: FollowUpOrderConnection;
    hpiComponentTypes: HpiComponentTypeConnection;
    hpiComponents: HpiComponentConnection;
    labs: LabConnection;
    labTypes: LabTypeConnection;
    labOrder: LabOrder;
    searchLabOrders: LabOrderConnection;
    lifestyleType: LifestyleType;
    lifestyleTypes: LifestyleTypeConnection;
    notifs: Notif;
    order: Order;
    orders: OrderConnection;
    providerOrders: OrderConnection;
    organizationDetails: OrganizationDetails;
    pastIllnessType: PastIllnessType;
    pastIllnessTypes: PastIllnessTypeConnection;
    patient: Patient;
    searchPatients: Array<Patient>;
    getByCardNo: Patient;
    getProgressNotes: ProgressNote;
    getAllPatientProgress: ProgressNote;
    getVitalSignsProgress: VitalSignsProgress;
    getPatientDiagnosticProgress: Array<Appointment>;
    getPatientDiagnosticProcedureTitles: Array<Scalars["String"]>;
    patients: PatientConnection;
    getPatientOrderCount: OrdersCount;
    getPatientFiles: Array<File>;
    findSimilarPatients: SimilarPatients;
    patientChart: PatientChart;
    patientCharts: PatientChartConnection;
    vitalSigns: VitalSigns;
    opthalmologyExam: OpthalmologyExam;
    patientDiagnoses: PatientDiagnosisConnection;
    searchPatientDiagnosis: PatientDiagnosisConnection;
    patientEncounterLimit: PatientEncounterLimit;
    patientEncounterLimits: PatientEncounterLimitConnection;
    patientEncounterLimitByUser: PatientEncounterLimit;
    patientHistory: PatientHistory;
    pastIllnesses: Array<Maybe<PastIllness>>;
    pastInjuries: Array<Maybe<PastInjury>>;
    pastHospitalizations: Array<Maybe<PastHospitalization>>;
    pastSurgeries: Array<Maybe<PastSurgery>>;
    lifestyles: Array<Maybe<Lifestyle>>;
    familyIllnesses: Array<Maybe<FamilyIllness>>;
    patientQueues: Array<PatientQueueWithAppointment>;
    userSubscriptions: QueueSubscription;
    payments: PaymentConnection;
    paymentWaivers: PaymentWaiverConnection;
    paymentWaiver: PaymentWaiver;
    pharmacy?: Maybe<Pharmacy>;
    pharmacies: PharmacyConnection;
    examCategory: ExamCategory;
    examCategories: ExamCategoryConnection;
    examFinding: ExamFinding;
    examFindings: ExamFindingConnection;
    physicalExamFinding: PhysicalExamFinding;
    physicalExamFindings: PhysicalExamFindingConnection;
    planTypes: PlanTypeConnection;
    searchMedicalPrescriptions: MedicalPrescriptionConnection;
    medicationPrescriptionOrder?: Maybe<MedicalPrescriptionOrder>;
    eyewearPrescriptionOrder?: Maybe<EyewearPrescriptionOrder>;
    searchMedicationPrescriptionOrders: MedicalPrescriptionOrderConnection;
    searchEyewearPrescriptionOrders: EyewearPrescriptionOrderConnection;
    referral: Referral;
    referrals: ReferralConnection;
    referralOrder: ReferralOrder;
    searchReferralOrders: ReferralOrderConnection;
    system: System;
    systems: SystemConnection;
    systemSymptom: SystemSymptom;
    systemSymptoms: SystemSymptomConnection;
    reviewOfSystem: ReviewOfSystem;
    reviewOfSystems: ReviewOfSystemConnection;
    rooms: RoomConnection;
    search: SearchResult;
    supplies: SupplyConnection;
    surgicalProcedure: SurgicalProcedure;
    surgicalProcedures: SurgicalProcedureConnection;
    getSurgicalProceduresByPatient: SurgicalProcedureConnection;
    surgicalProcedureTypes: SurgicalProcedureTypeConnection;
    surgicalOrder: SurgicalOrder;
    searchSurgicalOrders: SurgicalOrderConnection;
    treatment: Treatment;
    treatments: TreatmentConnection;
    getTreatmentsByPatient: TreatmentConnection;
    treatmentTypes: TreatmentTypeConnection;
    treatmentOrder: TreatmentOrder;
    searchTreatmentOrders: TreatmentOrderConnection;
    user: User;
    users: UserConnection;
    userTypes: UserTypeConnection;
    searchUsers: Array<Maybe<User>>;
    getByUserTypeTitle: Array<User>;
    visitTypes: VisitTypeConnection;
};
export declare type QueryAllergiesArgs = {
    page: PaginationInput;
    filter?: InputMaybe<AllergyFilter>;
};
export declare type QueryAmendmentArgs = {
    id: Scalars["ID"];
};
export declare type QueryAmendmentsArgs = {
    filter?: InputMaybe<AmendmentFilter>;
};
export declare type QueryAppointmentArgs = {
    id: Scalars["ID"];
};
export declare type QueryAppointmentsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<AppointmentFilter>;
};
export declare type QueryAppointmentStatusesArgs = {
    page: PaginationInput;
};
export declare type QueryFindAppointmentsByPatientAndRangeArgs = {
    patientId: Scalars["ID"];
    start: Scalars["Time"];
    end: Scalars["Time"];
};
export declare type QueryPatientsAppointmentTodayArgs = {
    patientId: Scalars["ID"];
    checkedIn: Scalars["Boolean"];
};
export declare type QueryFindTodaysAppointmentsArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryFindTodaysCheckedInAppointmentsArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QuerySearchAppointmentsArgs = {
    page: PaginationInput;
    input: AppointmentSearchInput;
};
export declare type QueryGetUserAppointmentsArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
    visitType?: InputMaybe<Scalars["String"]>;
    subscriptions?: InputMaybe<Scalars["Boolean"]>;
};
export declare type QueryPayForConsultationArgs = {
    patientId: Scalars["ID"];
    date?: InputMaybe<Scalars["Time"]>;
};
export declare type QueryBillingsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<BillingFilter>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryBillingArgs = {
    id: Scalars["ID"];
};
export declare type QueryGetChatMessagesArgs = {
    id: Scalars["ID"];
};
export declare type QueryGetChatMembersArgs = {
    id: Scalars["ID"];
};
export declare type QueryGetCommonChatArgs = {
    recipientID: Scalars["ID"];
};
export declare type QueryChiefComplaintsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<ChiefComplaintFilter>;
};
export declare type QuerySearchChiefComplaintsArgs = {
    searchTerm: Scalars["String"];
    page: PaginationInput;
};
export declare type QueryChiefComplaintTypeArgs = {
    id: Scalars["ID"];
};
export declare type QueryChiefComplaintTypesArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
    favorites?: InputMaybe<Scalars["Boolean"]>;
};
export declare type QueryDiagnosesArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
    favorites?: InputMaybe<Scalars["Boolean"]>;
};
export declare type QueryDiagnosticProcedureArgs = {
    filter: DiagnosticProcedureFilter;
};
export declare type QueryDiagnosticProceduresArgs = {
    page: PaginationInput;
    filter?: InputMaybe<DiagnosticProcedureFilter>;
};
export declare type QueryDiagnosticProcedureOrderArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QuerySearchDiagnosticProcedureOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<DiagnosticProcedureOrderFilter>;
    date?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryDiagnosticProcedureTypesArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryRefractionArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QueryEyewearShopArgs = {
    id: Scalars["ID"];
};
export declare type QueryEyewearShopsArgs = {
    page: PaginationInput;
};
export declare type QueryFavoriteMedicationsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<FavoriteMedicationFilter>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryUserFavoriteMedicationsArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QuerySearchFavoriteMedicationsArgs = {
    searchTerm: Scalars["String"];
    page: PaginationInput;
};
export declare type QueryFileArgs = {
    id: Scalars["ID"];
};
export declare type QueryFilesArgs = {
    page: PaginationInput;
};
export declare type QueryFollowUpArgs = {
    filter: FollowUpFilter;
};
export declare type QueryFollowUpsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<FollowUpFilter>;
};
export declare type QueryFollowUpOrderArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QuerySearchFollowUpOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<FollowUpOrderFilter>;
    date?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryHpiComponentTypesArgs = {
    page: PaginationInput;
};
export declare type QueryHpiComponentsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<HpiFilter>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryLabsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<LabFilter>;
};
export declare type QueryLabTypesArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryLabOrderArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QuerySearchLabOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<LabOrderFilter>;
    date?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryLifestyleTypeArgs = {
    id: Scalars["ID"];
};
export declare type QueryLifestyleTypesArgs = {
    page: PaginationInput;
};
export declare type QueryOrderArgs = {
    id: Scalars["ID"];
};
export declare type QueryOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<OrderFilterInput>;
};
export declare type QueryProviderOrdersArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryPastIllnessTypeArgs = {
    id: Scalars["ID"];
};
export declare type QueryPastIllnessTypesArgs = {
    page: PaginationInput;
};
export declare type QueryPatientArgs = {
    id: Scalars["ID"];
};
export declare type QuerySearchPatientsArgs = {
    term: Scalars["String"];
};
export declare type QueryGetByCardNoArgs = {
    cardNo: Scalars["String"];
};
export declare type QueryGetProgressNotesArgs = {
    appointmentId: Scalars["ID"];
};
export declare type QueryGetAllPatientProgressArgs = {
    patientId: Scalars["ID"];
};
export declare type QueryGetVitalSignsProgressArgs = {
    patientId: Scalars["ID"];
};
export declare type QueryGetPatientDiagnosticProgressArgs = {
    patientId: Scalars["ID"];
    procedureTypeTitle: Scalars["String"];
};
export declare type QueryGetPatientDiagnosticProcedureTitlesArgs = {
    patientId: Scalars["ID"];
};
export declare type QueryPatientsArgs = {
    page: PaginationInput;
};
export declare type QueryGetPatientOrderCountArgs = {
    patientId: Scalars["ID"];
};
export declare type QueryGetPatientFilesArgs = {
    patientId: Scalars["ID"];
};
export declare type QueryFindSimilarPatientsArgs = {
    input: SimilarPatientsInput;
};
export declare type QueryPatientChartArgs = {
    id: Scalars["ID"];
    details?: InputMaybe<Scalars["Boolean"]>;
};
export declare type QueryPatientChartsArgs = {
    page: PaginationInput;
};
export declare type QueryVitalSignsArgs = {
    filter: VitalSignsFilter;
};
export declare type QueryOpthalmologyExamArgs = {
    filter: OphthalmologyExamFilter;
};
export declare type QueryPatientDiagnosesArgs = {
    page: PaginationInput;
    filter?: InputMaybe<PatientDiagnosisFilter>;
};
export declare type QuerySearchPatientDiagnosisArgs = {
    searchTerm?: InputMaybe<Scalars["String"]>;
    page: PaginationInput;
};
export declare type QueryPatientEncounterLimitArgs = {
    id: Scalars["ID"];
};
export declare type QueryPatientEncounterLimitsArgs = {
    page: PaginationInput;
};
export declare type QueryPatientEncounterLimitByUserArgs = {
    userId: Scalars["ID"];
};
export declare type QueryPatientHistoryArgs = {
    id: Scalars["ID"];
};
export declare type QueryPastIllnessesArgs = {
    patientHistoryId: Scalars["ID"];
};
export declare type QueryPastInjuriesArgs = {
    patientHistoryId: Scalars["ID"];
};
export declare type QueryPastHospitalizationsArgs = {
    patientHistoryId: Scalars["ID"];
};
export declare type QueryPastSurgeriesArgs = {
    patientHistoryId: Scalars["ID"];
};
export declare type QueryLifestylesArgs = {
    patientHistoryId: Scalars["ID"];
};
export declare type QueryFamilyIllnessesArgs = {
    patientHistoryId: Scalars["ID"];
};
export declare type QueryUserSubscriptionsArgs = {
    userId: Scalars["ID"];
};
export declare type QueryPaymentsArgs = {
    page: PaginationInput;
};
export declare type QueryPaymentWaiversArgs = {
    page: PaginationInput;
};
export declare type QueryPaymentWaiverArgs = {
    id: Scalars["ID"];
};
export declare type QueryPharmacyArgs = {
    id: Scalars["ID"];
};
export declare type QueryPharmaciesArgs = {
    page: PaginationInput;
};
export declare type QueryExamCategoryArgs = {
    id: Scalars["ID"];
};
export declare type QueryExamCategoriesArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryExamFindingArgs = {
    id: Scalars["ID"];
};
export declare type QueryExamFindingsArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryPhysicalExamFindingArgs = {
    id: Scalars["ID"];
};
export declare type QueryPhysicalExamFindingsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<PhysicalExamFindingFilter>;
};
export declare type QueryPlanTypesArgs = {
    page: PaginationInput;
};
export declare type QuerySearchMedicalPrescriptionsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<MedicalPrescriptionFilter>;
    prescribedDate?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryMedicationPrescriptionOrderArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QueryEyewearPrescriptionOrderArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QuerySearchMedicationPrescriptionOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<PrescriptionOrdersFilter>;
    prescribedDate?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QuerySearchEyewearPrescriptionOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<PrescriptionOrdersFilter>;
    prescribedDate?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryReferralArgs = {
    filter: ReferralFilter;
};
export declare type QueryReferralsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<ReferralFilter>;
};
export declare type QueryReferralOrderArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QuerySearchReferralOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<ReferralOrderFilter>;
    date?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QuerySystemArgs = {
    id: Scalars["ID"];
};
export declare type QuerySystemsArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QuerySystemSymptomArgs = {
    id: Scalars["ID"];
};
export declare type QuerySystemSymptomsArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryReviewOfSystemArgs = {
    id: Scalars["ID"];
};
export declare type QueryReviewOfSystemsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<ReviewOfSystemFilter>;
};
export declare type QueryRoomsArgs = {
    page: PaginationInput;
};
export declare type QuerySearchArgs = {
    searchTerm: Scalars["String"];
};
export declare type QuerySuppliesArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QuerySurgicalProcedureArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QuerySurgicalProceduresArgs = {
    page: PaginationInput;
    filter?: InputMaybe<SurgicalProcedureFilter>;
};
export declare type QueryGetSurgicalProceduresByPatientArgs = {
    page: PaginationInput;
    patientId: Scalars["ID"];
};
export declare type QuerySurgicalProcedureTypesArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QuerySurgicalOrderArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QuerySearchSurgicalOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<SurgicalOrderFilter>;
    date?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryTreatmentArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QueryTreatmentsArgs = {
    page: PaginationInput;
    filter?: InputMaybe<TreatmentFilter>;
};
export declare type QueryGetTreatmentsByPatientArgs = {
    page: PaginationInput;
    patientId: Scalars["ID"];
};
export declare type QueryTreatmentTypesArgs = {
    page: PaginationInput;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryTreatmentOrderArgs = {
    patientChartId: Scalars["ID"];
};
export declare type QuerySearchTreatmentOrdersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<TreatmentOrderFilter>;
    date?: InputMaybe<Scalars["Time"]>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryUserArgs = {
    id: Scalars["ID"];
};
export declare type QueryUsersArgs = {
    page: PaginationInput;
    filter?: InputMaybe<UserFilter>;
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type QueryUserTypesArgs = {
    page: PaginationInput;
};
export declare type QuerySearchUsersArgs = {
    input: UserSearchInput;
};
export declare type QueryGetByUserTypeTitleArgs = {
    input: Scalars["String"];
};
export declare type QueryVisitTypesArgs = {
    page: PaginationInput;
};
export declare type QueueSubscription = {
    __typename?: "QueueSubscription";
    id: Scalars["ID"];
    userId: Scalars["ID"];
    user: User;
    subscriptions: Array<PatientQueue>;
};
export declare enum QueueType {
    User = "USER",
    Diagnostic = "DIAGNOSTIC",
    Lab = "LAB",
    Treatment = "TREATMENT",
    Surgical = "SURGICAL",
    Preexam = "PREEXAM",
    Preoperation = "PREOPERATION"
}
export declare type Referral = {
    __typename?: "Referral";
    id: Scalars["ID"];
    referralOrderId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    reason: Scalars["String"];
    referredToId?: Maybe<Scalars["ID"]>;
    referredToName: Scalars["String"];
    status: ReferralStatus;
    type: ReferralType;
    receptionNote: Scalars["String"];
};
export declare type ReferralConnection = Connection & {
    __typename?: "ReferralConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<ReferralEdge>;
};
export declare type ReferralEdge = {
    __typename?: "ReferralEdge";
    node: Referral;
};
export declare type ReferralFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
};
export declare type ReferralOrder = {
    __typename?: "ReferralOrder";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    userName: Scalars["String"];
    orderedById?: Maybe<Scalars["ID"]>;
    orderedBy?: Maybe<User>;
    referrals: Array<Referral>;
    status: ReferralOrderStatus;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type ReferralOrderConnection = Connection & {
    __typename?: "ReferralOrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<ReferralOrderEdge>;
};
export declare type ReferralOrderEdge = {
    __typename?: "ReferralOrderEdge";
    node: ReferralOrder;
};
export declare type ReferralOrderFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
    orderedById?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare enum ReferralOrderStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare enum ReferralStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare enum ReferralType {
    PatientInHouseReferral = "PATIENT_IN_HOUSE_REFERRAL",
    PatientOutsourceReferral = "PATIENT_OUTSOURCE_REFERRAL"
}
export declare type ReviewOfSystem = {
    __typename?: "ReviewOfSystem";
    id: Scalars["ID"];
    patientHistoryId: Scalars["ID"];
    systemSymptomId: Scalars["ID"];
    systemSymptom: SystemSymptom;
    note?: Maybe<Scalars["String"]>;
};
export declare type ReviewOfSystemConnection = Connection & {
    __typename?: "ReviewOfSystemConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<ReviewOfSystemEdge>;
};
export declare type ReviewOfSystemEdge = {
    __typename?: "ReviewOfSystemEdge";
    node: ReviewOfSystem;
};
export declare type ReviewOfSystemFilter = {
    patientHistoryId?: InputMaybe<Scalars["ID"]>;
    systemSymptomId?: InputMaybe<Scalars["ID"]>;
};
export declare type ReviewOfSystemInput = {
    patientHistoryId: Scalars["ID"];
    systemSymptomId: Scalars["ID"];
    note?: InputMaybe<Scalars["String"]>;
};
export declare type ReviewOfSystemUpdateInput = {
    id: Scalars["ID"];
    patientHistoryId?: InputMaybe<Scalars["ID"]>;
    systemSymptomId?: InputMaybe<Scalars["ID"]>;
    note?: InputMaybe<Scalars["String"]>;
};
export declare type Room = {
    __typename?: "Room";
    id: Scalars["Int"];
    title: Scalars["String"];
};
export declare type RoomConnection = Connection & {
    __typename?: "RoomConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<RoomEdge>>;
};
export declare type RoomEdge = Edge & {
    __typename?: "RoomEdge";
    node: Room;
};
export declare type RoomInput = {
    title: Scalars["String"];
};
export declare type RoomOrder = {
    field: Scalars["String"];
    direction: OrderDirection;
};
export declare type ScheduleSurgeryInput = {
    orderId: Scalars["ID"];
    checkInTime: Scalars["Time"];
    roomId: Scalars["ID"];
    invoiceNo: Scalars["String"];
};
export declare type ScheduleTreatmentInput = {
    orderId: Scalars["ID"];
    checkInTime: Scalars["Time"];
    roomId: Scalars["ID"];
    invoiceNo: Scalars["String"];
};
export declare type SearchResult = {
    __typename?: "SearchResult";
    patients: Array<Patient>;
    providers: Array<User>;
};
export declare type SimilarPatients = {
    __typename?: "SimilarPatients";
    byName: Array<Patient>;
    byPhone: Array<Patient>;
};
export declare type SimilarPatientsInput = {
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
};
export declare type SubscribeInput = {
    userId: Scalars["ID"];
    patientQueueId: Scalars["ID"];
};
export declare type Subscription = {
    __typename?: "Subscription";
    notification: Notification;
};
export declare type Supply = {
    __typename?: "Supply";
    id: Scalars["ID"];
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billings: Array<Maybe<Billing>>;
};
export declare type SupplyConnection = Connection & {
    __typename?: "SupplyConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<SupplyEdge>>;
};
export declare type SupplyEdge = {
    __typename?: "SupplyEdge";
    node: Supply;
};
export declare type SupplyInput = {
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billingIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare enum SupplyStatus {
    Active = "ACTIVE",
    Inactive = "INACTIVE"
}
export declare type SupplyUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    active?: InputMaybe<Scalars["Boolean"]>;
    billingIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};
export declare enum SurgeryStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare type SurgicalOrder = {
    __typename?: "SurgicalOrder";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    userName: Scalars["String"];
    orderedById?: Maybe<Scalars["ID"]>;
    orderedBy?: Maybe<User>;
    surgicalProcedures: Array<SurgicalProcedure>;
    status: SurgicalOrderStatus;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type SurgicalOrderConnection = Connection & {
    __typename?: "SurgicalOrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<SurgicalOrderEdge>;
};
export declare type SurgicalOrderEdge = {
    __typename?: "SurgicalOrderEdge";
    node: SurgicalOrder;
};
export declare type SurgicalOrderFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
    orderedById?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare enum SurgicalOrderStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare type SurgicalProcedure = {
    __typename?: "SurgicalProcedure";
    id: Scalars["ID"];
    surgicalOrderId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    respiratory?: Maybe<Scalars["String"]>;
    cardiovascular?: Maybe<Scalars["String"]>;
    abdomen?: Maybe<Scalars["String"]>;
    gus?: Maybe<Scalars["String"]>;
    ismss?: Maybe<Scalars["String"]>;
    cns?: Maybe<Scalars["String"]>;
    preanestheticAllergies?: Maybe<Scalars["Boolean"]>;
    preanestheticAllergiesNote?: Maybe<Scalars["String"]>;
    physicalBloodPressure?: Maybe<Scalars["String"]>;
    physicalPr?: Maybe<Scalars["String"]>;
    physicalRr?: Maybe<Scalars["String"]>;
    physicalSaO2?: Maybe<Scalars["String"]>;
    physicalTemperature?: Maybe<Scalars["String"]>;
    physicalWeight?: Maybe<Scalars["String"]>;
    physicalHeent?: Maybe<Scalars["String"]>;
    physicalArtificalDenture?: Maybe<Scalars["Boolean"]>;
    physicalArtificalDentureNote?: Maybe<Scalars["String"]>;
    physicalLgs?: Maybe<Scalars["String"]>;
    physicalChest?: Maybe<Scalars["String"]>;
    physicalCvs?: Maybe<Scalars["String"]>;
    physicalAbdomen?: Maybe<Scalars["String"]>;
    physicalGus?: Maybe<Scalars["String"]>;
    physicalIs?: Maybe<Scalars["String"]>;
    physicalMss?: Maybe<Scalars["String"]>;
    physicalCns?: Maybe<Scalars["String"]>;
    wbcActive?: Maybe<Scalars["Boolean"]>;
    wbcResults?: Maybe<Scalars["String"]>;
    wbcDate?: Maybe<Scalars["Time"]>;
    hgbhctActive?: Maybe<Scalars["Boolean"]>;
    hgbhctResults?: Maybe<Scalars["String"]>;
    hgbhctDate?: Maybe<Scalars["Time"]>;
    pltActive?: Maybe<Scalars["Boolean"]>;
    pltResults?: Maybe<Scalars["String"]>;
    pltDate?: Maybe<Scalars["Time"]>;
    coagulationPtActive?: Maybe<Scalars["Boolean"]>;
    coagulationPtResults?: Maybe<Scalars["String"]>;
    coagulationPtDate?: Maybe<Scalars["Time"]>;
    coagulationPttActive?: Maybe<Scalars["Boolean"]>;
    coagulationPttResults?: Maybe<Scalars["String"]>;
    coagulationPttDate?: Maybe<Scalars["Time"]>;
    coagulationInrActive?: Maybe<Scalars["Boolean"]>;
    coagulationInrResults?: Maybe<Scalars["String"]>;
    coagulationInrDate?: Maybe<Scalars["Time"]>;
    serumAlbuminActive?: Maybe<Scalars["Boolean"]>;
    serumAlbuminResults?: Maybe<Scalars["String"]>;
    serumAlbuminDate?: Maybe<Scalars["Time"]>;
    totalProteinActive?: Maybe<Scalars["Boolean"]>;
    totalProteinResults?: Maybe<Scalars["String"]>;
    totalProteinDate?: Maybe<Scalars["Time"]>;
    bilirubinTotalActive?: Maybe<Scalars["Boolean"]>;
    bilirubinTotalResults?: Maybe<Scalars["String"]>;
    bilirubinTotalDate?: Maybe<Scalars["Time"]>;
    bilirubinDirectActive?: Maybe<Scalars["Boolean"]>;
    bilirubinDirectResults?: Maybe<Scalars["String"]>;
    bilirubinDirectDate?: Maybe<Scalars["Time"]>;
    astsgotActive?: Maybe<Scalars["Boolean"]>;
    astsgotResults?: Maybe<Scalars["String"]>;
    astsgotDate?: Maybe<Scalars["Time"]>;
    altsgptActive?: Maybe<Scalars["Boolean"]>;
    altsgptResults?: Maybe<Scalars["String"]>;
    altsgptDate?: Maybe<Scalars["Time"]>;
    alpActive?: Maybe<Scalars["Boolean"]>;
    alpResults?: Maybe<Scalars["String"]>;
    alpDate?: Maybe<Scalars["Time"]>;
    renalCrActive?: Maybe<Scalars["Boolean"]>;
    renalCrResults?: Maybe<Scalars["String"]>;
    renalCrDate?: Maybe<Scalars["Time"]>;
    renalBunActive?: Maybe<Scalars["Boolean"]>;
    renalBunResults?: Maybe<Scalars["String"]>;
    renalBunDate?: Maybe<Scalars["Time"]>;
    thyroidFreeT3Active?: Maybe<Scalars["Boolean"]>;
    thyroidFreeT3Results?: Maybe<Scalars["String"]>;
    thyroidFreeT3Date?: Maybe<Scalars["Time"]>;
    thyroidTotalT4Active?: Maybe<Scalars["Boolean"]>;
    thyroidTotalT4Results?: Maybe<Scalars["String"]>;
    thyroidTotalT4Date?: Maybe<Scalars["Time"]>;
    thyroidTshActive?: Maybe<Scalars["Boolean"]>;
    thyroidTshResults?: Maybe<Scalars["String"]>;
    thyroidTshDate?: Maybe<Scalars["Time"]>;
    electrolytesNaPlusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesNaPlusResults?: Maybe<Scalars["String"]>;
    electrolytesNaPlusDate?: Maybe<Scalars["Time"]>;
    electrolytesKPlusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesKPlusResults?: Maybe<Scalars["String"]>;
    electrolytesKPlusDate?: Maybe<Scalars["Time"]>;
    electrolytesClMinusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesClMinusResults?: Maybe<Scalars["String"]>;
    electrolytesClMinusDate?: Maybe<Scalars["Time"]>;
    electrolytesCa2PlusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesCa2PlusResults?: Maybe<Scalars["String"]>;
    electrolytesCa2PlusDate?: Maybe<Scalars["Time"]>;
    electrolytesMg2PlusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesMg2PlusResults?: Maybe<Scalars["String"]>;
    electrolytesMg2PlusDate?: Maybe<Scalars["Time"]>;
    electrolytesPMinusActive?: Maybe<Scalars["Boolean"]>;
    electrolytesPMinusResults?: Maybe<Scalars["String"]>;
    electrolytesPMinusDate?: Maybe<Scalars["Time"]>;
    asa1?: Maybe<Scalars["Boolean"]>;
    asa2?: Maybe<Scalars["Boolean"]>;
    asa3?: Maybe<Scalars["Boolean"]>;
    asa4?: Maybe<Scalars["Boolean"]>;
    asa5?: Maybe<Scalars["Boolean"]>;
    opv1?: Maybe<Scalars["Boolean"]>;
    opv2?: Maybe<Scalars["Boolean"]>;
    opv3?: Maybe<Scalars["Boolean"]>;
    opv4?: Maybe<Scalars["Boolean"]>;
    bleedingTendancy?: Maybe<Scalars["Boolean"]>;
    bleedingTendancyNote?: Maybe<Scalars["String"]>;
    dm?: Maybe<Scalars["Boolean"]>;
    dmNote?: Maybe<Scalars["String"]>;
    hypertension?: Maybe<Scalars["Boolean"]>;
    hypertensionNote?: Maybe<Scalars["String"]>;
    cardiac?: Maybe<Scalars["Boolean"]>;
    cardiacNote?: Maybe<Scalars["String"]>;
    preanestheticAsthma?: Maybe<Scalars["Boolean"]>;
    preanestheticAsthmaNote?: Maybe<Scalars["String"]>;
    rvi?: Maybe<Scalars["Boolean"]>;
    rviNote?: Maybe<Scalars["String"]>;
    renal?: Maybe<Scalars["Boolean"]>;
    renalNote?: Maybe<Scalars["String"]>;
    preanestheticPerformedBy?: Maybe<Scalars["ID"]>;
    fitForSurgery?: Maybe<Scalars["Boolean"]>;
    fitForSurgeryNote?: Maybe<Scalars["String"]>;
    preanestheticDocuments: Array<File>;
    rightCorrected?: Maybe<Scalars["String"]>;
    leftCorrected?: Maybe<Scalars["String"]>;
    rightIop?: Maybe<Scalars["String"]>;
    leftIop?: Maybe<Scalars["String"]>;
    rightAnteriorSegment?: Maybe<Scalars["String"]>;
    leftAnteriorSegment?: Maybe<Scalars["String"]>;
    rightPosteriorSegment?: Maybe<Scalars["String"]>;
    leftPosteriorSegment?: Maybe<Scalars["String"]>;
    rightBiometry?: Maybe<Scalars["String"]>;
    leftBiometry?: Maybe<Scalars["String"]>;
    diabetes?: Maybe<Scalars["String"]>;
    hpn?: Maybe<Scalars["String"]>;
    asthma?: Maybe<Scalars["String"]>;
    cardiacDisease?: Maybe<Scalars["String"]>;
    allergies?: Maybe<Scalars["String"]>;
    bloodPressure?: Maybe<Scalars["String"]>;
    bloodSugar?: Maybe<Scalars["String"]>;
    uriAnalysis?: Maybe<Scalars["String"]>;
    la?: Maybe<Scalars["Boolean"]>;
    ga?: Maybe<Scalars["Boolean"]>;
    retrobulbar?: Maybe<Scalars["Boolean"]>;
    peribulbar?: Maybe<Scalars["Boolean"]>;
    topical?: Maybe<Scalars["Boolean"]>;
    conjFlapLimbal?: Maybe<Scalars["Boolean"]>;
    conjFlapFornix?: Maybe<Scalars["Boolean"]>;
    sectionLimbal?: Maybe<Scalars["Boolean"]>;
    sectionCorneral?: Maybe<Scalars["Boolean"]>;
    sectionScleralTunnel?: Maybe<Scalars["Boolean"]>;
    capsulotomyLinear?: Maybe<Scalars["Boolean"]>;
    capsulotomyCanOpener?: Maybe<Scalars["Boolean"]>;
    capsulotomyCcc?: Maybe<Scalars["Boolean"]>;
    iolPlacementBag?: Maybe<Scalars["Boolean"]>;
    iolSulcus?: Maybe<Scalars["Boolean"]>;
    iolBagSulcus?: Maybe<Scalars["Boolean"]>;
    irodectpmyNone?: Maybe<Scalars["Boolean"]>;
    irodectpmyPl?: Maybe<Scalars["Boolean"]>;
    irodectpmySl?: Maybe<Scalars["Boolean"]>;
    sphincterectomy?: Maybe<Scalars["Boolean"]>;
    lensExtractionIcce?: Maybe<Scalars["Boolean"]>;
    lensExtractionEcce?: Maybe<Scalars["Boolean"]>;
    lensExtractionPhaco?: Maybe<Scalars["Boolean"]>;
    sutureNone?: Maybe<Scalars["Boolean"]>;
    sutureContinuous?: Maybe<Scalars["Boolean"]>;
    sutureInterrupted?: Maybe<Scalars["Boolean"]>;
    drapes?: Maybe<Scalars["Boolean"]>;
    ringer?: Maybe<Scalars["Boolean"]>;
    bss?: Maybe<Scalars["Boolean"]>;
    air?: Maybe<Scalars["Boolean"]>;
    hpmc?: Maybe<Scalars["Boolean"]>;
    healon?: Maybe<Scalars["Boolean"]>;
    pilo?: Maybe<Scalars["Boolean"]>;
    adrenalin?: Maybe<Scalars["Boolean"]>;
    antibiotic?: Maybe<Scalars["Boolean"]>;
    steroid?: Maybe<Scalars["Boolean"]>;
    suture80?: Maybe<Scalars["Boolean"]>;
    suture90?: Maybe<Scalars["Boolean"]>;
    suture100?: Maybe<Scalars["Boolean"]>;
    irrigatingSolution?: Maybe<Scalars["String"]>;
    visco?: Maybe<Scalars["String"]>;
    interacameral?: Maybe<Scalars["String"]>;
    subconj?: Maybe<Scalars["String"]>;
    suture?: Maybe<Scalars["String"]>;
    silk?: Maybe<Scalars["Boolean"]>;
    nylon?: Maybe<Scalars["Boolean"]>;
    pcTear?: Maybe<Scalars["Boolean"]>;
    vitreousLoss?: Maybe<Scalars["Boolean"]>;
    descematesStrip?: Maybe<Scalars["Boolean"]>;
    endothelialDamage?: Maybe<Scalars["Boolean"]>;
    nucluesDrop?: Maybe<Scalars["Boolean"]>;
    iridoDialysis?: Maybe<Scalars["Boolean"]>;
    irisDamage?: Maybe<Scalars["Boolean"]>;
    retainedCortex?: Maybe<Scalars["Boolean"]>;
    hyphema?: Maybe<Scalars["Boolean"]>;
    complicationsOthers?: Maybe<Scalars["String"]>;
    complicationsNote?: Maybe<Scalars["String"]>;
    vitrectomy?: Maybe<Scalars["String"]>;
    typeOfIolAc?: Maybe<Scalars["Boolean"]>;
    typeOfIolPc?: Maybe<Scalars["Boolean"]>;
    typeOfIol?: Maybe<Scalars["String"]>;
    iolModel?: Maybe<Scalars["String"]>;
    company?: Maybe<Scalars["String"]>;
    aclol?: Maybe<Scalars["String"]>;
    aclolPlanned?: Maybe<Scalars["Boolean"]>;
    aclolUnplanned?: Maybe<Scalars["Boolean"]>;
    unplanned?: Maybe<Scalars["String"]>;
    additionalNotes?: Maybe<Scalars["String"]>;
    specialInstructions?: Maybe<Scalars["String"]>;
    treatment?: Maybe<Scalars["String"]>;
    assistantName?: Maybe<Scalars["String"]>;
    performOnEye: Scalars["String"];
    surgicalProcedureTypeId: Scalars["ID"];
    surgicalProcedureType: SurgicalProcedureType;
    surgicalProcedureTypeTitle: Scalars["String"];
    status: SurgeryStatus;
    orderNote: Scalars["String"];
    receptionNote: Scalars["String"];
    payments: Array<Payment>;
};
export declare type SurgicalProcedureConnection = Connection & {
    __typename?: "SurgicalProcedureConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<SurgicalProcedureEdge>>;
};
export declare type SurgicalProcedureEdge = {
    __typename?: "SurgicalProcedureEdge";
    node: SurgicalProcedure;
};
export declare type SurgicalProcedureFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type SurgicalProcedureInput = {
    patientChartId: Scalars["ID"];
    surgicalOrderId?: InputMaybe<Scalars["ID"]>;
    respiratory?: InputMaybe<Scalars["String"]>;
    cardiovascular?: InputMaybe<Scalars["String"]>;
    abdomen?: InputMaybe<Scalars["String"]>;
    gus?: InputMaybe<Scalars["String"]>;
    ismss?: InputMaybe<Scalars["String"]>;
    cns?: InputMaybe<Scalars["String"]>;
    preanestheticAllergies?: InputMaybe<Scalars["Boolean"]>;
    preanestheticAllergiesNote?: InputMaybe<Scalars["String"]>;
    physicalBloodPressure?: InputMaybe<Scalars["String"]>;
    physicalPr?: InputMaybe<Scalars["String"]>;
    physicalRr?: InputMaybe<Scalars["String"]>;
    physicalSaO2?: InputMaybe<Scalars["String"]>;
    physicalTemperature?: InputMaybe<Scalars["String"]>;
    physicalWeight?: InputMaybe<Scalars["String"]>;
    physicalHeent?: InputMaybe<Scalars["String"]>;
    physicalArtificalDenture?: InputMaybe<Scalars["Boolean"]>;
    physicalArtificalDentureNote?: InputMaybe<Scalars["String"]>;
    physicalLgs?: InputMaybe<Scalars["String"]>;
    physicalChest?: InputMaybe<Scalars["String"]>;
    physicalCvs?: InputMaybe<Scalars["String"]>;
    physicalAbdomen?: InputMaybe<Scalars["String"]>;
    physicalGus?: InputMaybe<Scalars["String"]>;
    physicalIs?: InputMaybe<Scalars["String"]>;
    physicalMss?: InputMaybe<Scalars["String"]>;
    physicalCns?: InputMaybe<Scalars["String"]>;
    wbcActive?: InputMaybe<Scalars["Boolean"]>;
    wbcResults?: InputMaybe<Scalars["String"]>;
    wbcDate?: InputMaybe<Scalars["Time"]>;
    hgbhctActive?: InputMaybe<Scalars["Boolean"]>;
    hgbhctResults?: InputMaybe<Scalars["String"]>;
    hgbhctDate?: InputMaybe<Scalars["Time"]>;
    pltActive?: InputMaybe<Scalars["Boolean"]>;
    pltResults?: InputMaybe<Scalars["String"]>;
    pltDate?: InputMaybe<Scalars["Time"]>;
    coagulationPtActive?: InputMaybe<Scalars["Boolean"]>;
    coagulationPtResults?: InputMaybe<Scalars["String"]>;
    coagulationPtDate?: InputMaybe<Scalars["Time"]>;
    coagulationPttActive?: InputMaybe<Scalars["Boolean"]>;
    coagulationPttResults?: InputMaybe<Scalars["String"]>;
    coagulationPttDate?: InputMaybe<Scalars["Time"]>;
    coagulationInrActive?: InputMaybe<Scalars["Boolean"]>;
    coagulationInrResults?: InputMaybe<Scalars["String"]>;
    coagulationInrDate?: InputMaybe<Scalars["Time"]>;
    serumAlbuminActive?: InputMaybe<Scalars["Boolean"]>;
    serumAlbuminResults?: InputMaybe<Scalars["String"]>;
    serumAlbuminDate?: InputMaybe<Scalars["Time"]>;
    totalProteinActive?: InputMaybe<Scalars["Boolean"]>;
    totalProteinResults?: InputMaybe<Scalars["String"]>;
    totalProteinDate?: InputMaybe<Scalars["Time"]>;
    bilirubinTotalActive?: InputMaybe<Scalars["Boolean"]>;
    bilirubinTotalResults?: InputMaybe<Scalars["String"]>;
    bilirubinTotalDate?: InputMaybe<Scalars["Time"]>;
    bilirubinDirectActive?: InputMaybe<Scalars["Boolean"]>;
    bilirubinDirectResults?: InputMaybe<Scalars["String"]>;
    bilirubinDirectDate?: InputMaybe<Scalars["Time"]>;
    astsgotActive?: InputMaybe<Scalars["Boolean"]>;
    astsgotResults?: InputMaybe<Scalars["String"]>;
    astsgotDate?: InputMaybe<Scalars["Time"]>;
    altsgptActive?: InputMaybe<Scalars["Boolean"]>;
    altsgptResults?: InputMaybe<Scalars["String"]>;
    altsgptDate?: InputMaybe<Scalars["Time"]>;
    alpActive?: InputMaybe<Scalars["Boolean"]>;
    alpResults?: InputMaybe<Scalars["String"]>;
    alpDate?: InputMaybe<Scalars["Time"]>;
    renalCrActive?: InputMaybe<Scalars["Boolean"]>;
    renalCrResults?: InputMaybe<Scalars["String"]>;
    renalCrDate?: InputMaybe<Scalars["Time"]>;
    renalBunActive?: InputMaybe<Scalars["Boolean"]>;
    renalBunResults?: InputMaybe<Scalars["String"]>;
    renalBunDate?: InputMaybe<Scalars["Time"]>;
    thyroidFreeT3Active?: InputMaybe<Scalars["Boolean"]>;
    thyroidFreeT3Results?: InputMaybe<Scalars["String"]>;
    thyroidFreeT3Date?: InputMaybe<Scalars["Time"]>;
    thyroidTotalT4Active?: InputMaybe<Scalars["Boolean"]>;
    thyroidTotalT4Results?: InputMaybe<Scalars["String"]>;
    thyroidTotalT4Date?: InputMaybe<Scalars["Time"]>;
    thyroidTshActive?: InputMaybe<Scalars["Boolean"]>;
    thyroidTshResults?: InputMaybe<Scalars["String"]>;
    thyroidTshDate?: InputMaybe<Scalars["Time"]>;
    electrolytesNaPlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesNaPlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesNaPlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesKPlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesKPlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesKPlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesClMinusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesClMinusResults?: InputMaybe<Scalars["String"]>;
    electrolytesClMinusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesCa2PlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesCa2PlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesCa2PlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesMg2PlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesMg2PlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesMg2PlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesPMinusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesPMinusResults?: InputMaybe<Scalars["String"]>;
    electrolytesPMinusDate?: InputMaybe<Scalars["Time"]>;
    asa1?: InputMaybe<Scalars["Boolean"]>;
    asa2?: InputMaybe<Scalars["Boolean"]>;
    asa3?: InputMaybe<Scalars["Boolean"]>;
    asa4?: InputMaybe<Scalars["Boolean"]>;
    asa5?: InputMaybe<Scalars["Boolean"]>;
    opv1?: InputMaybe<Scalars["Boolean"]>;
    opv2?: InputMaybe<Scalars["Boolean"]>;
    opv3?: InputMaybe<Scalars["Boolean"]>;
    opv4?: InputMaybe<Scalars["Boolean"]>;
    bleedingTendancy?: InputMaybe<Scalars["Boolean"]>;
    bleedingTendancyNote?: InputMaybe<Scalars["String"]>;
    dm?: InputMaybe<Scalars["Boolean"]>;
    dmNote?: InputMaybe<Scalars["String"]>;
    hypertension?: InputMaybe<Scalars["Boolean"]>;
    hypertensionNote?: InputMaybe<Scalars["String"]>;
    cardiac?: InputMaybe<Scalars["Boolean"]>;
    cardiacNote?: InputMaybe<Scalars["String"]>;
    preanestheticAsthma?: InputMaybe<Scalars["Boolean"]>;
    preanestheticAsthmaNote?: InputMaybe<Scalars["String"]>;
    rvi?: InputMaybe<Scalars["Boolean"]>;
    rviNote?: InputMaybe<Scalars["String"]>;
    renal?: InputMaybe<Scalars["Boolean"]>;
    renalNote?: InputMaybe<Scalars["String"]>;
    fitForSurgery?: InputMaybe<Scalars["Boolean"]>;
    fitForSurgeryNote?: InputMaybe<Scalars["String"]>;
    preanestheticDocuments?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    rightCorrected?: InputMaybe<Scalars["String"]>;
    leftCorrected?: InputMaybe<Scalars["String"]>;
    rightIop?: InputMaybe<Scalars["String"]>;
    leftIop?: InputMaybe<Scalars["String"]>;
    rightAnteriorSegment?: InputMaybe<Scalars["String"]>;
    leftAnteriorSegment?: InputMaybe<Scalars["String"]>;
    rightPosteriorSegment?: InputMaybe<Scalars["String"]>;
    leftPosteriorSegment?: InputMaybe<Scalars["String"]>;
    rightBiometry?: InputMaybe<Scalars["String"]>;
    leftBiometry?: InputMaybe<Scalars["String"]>;
    diabetes?: InputMaybe<Scalars["String"]>;
    hpn?: InputMaybe<Scalars["String"]>;
    asthma?: InputMaybe<Scalars["String"]>;
    cardiacDisease?: InputMaybe<Scalars["String"]>;
    allergies?: InputMaybe<Scalars["String"]>;
    bloodPressure?: InputMaybe<Scalars["String"]>;
    bloodSugar?: InputMaybe<Scalars["String"]>;
    uriAnalysis?: InputMaybe<Scalars["String"]>;
    la?: InputMaybe<Scalars["Boolean"]>;
    ga?: InputMaybe<Scalars["Boolean"]>;
    retrobulbar?: InputMaybe<Scalars["Boolean"]>;
    peribulbar?: InputMaybe<Scalars["Boolean"]>;
    topical?: InputMaybe<Scalars["Boolean"]>;
    conjFlapLimbal?: InputMaybe<Scalars["Boolean"]>;
    conjFlapFornix?: InputMaybe<Scalars["Boolean"]>;
    sectionLimbal?: InputMaybe<Scalars["Boolean"]>;
    sectionCorneral?: InputMaybe<Scalars["Boolean"]>;
    sectionScleralTunnel?: InputMaybe<Scalars["Boolean"]>;
    capsulotomyLinear?: InputMaybe<Scalars["Boolean"]>;
    capsulotomyCanOpener?: InputMaybe<Scalars["Boolean"]>;
    capsulotomyCcc?: InputMaybe<Scalars["Boolean"]>;
    iolPlacementBag?: InputMaybe<Scalars["Boolean"]>;
    iolSulcus?: InputMaybe<Scalars["Boolean"]>;
    iolBagSulcus?: InputMaybe<Scalars["Boolean"]>;
    irodectpmyNone?: InputMaybe<Scalars["Boolean"]>;
    irodectpmyPl?: InputMaybe<Scalars["Boolean"]>;
    irodectpmySl?: InputMaybe<Scalars["Boolean"]>;
    sphincterectomy?: InputMaybe<Scalars["Boolean"]>;
    lensExtractionIcce?: InputMaybe<Scalars["Boolean"]>;
    lensExtractionEcce?: InputMaybe<Scalars["Boolean"]>;
    lensExtractionPhaco?: InputMaybe<Scalars["Boolean"]>;
    sutureNone?: InputMaybe<Scalars["Boolean"]>;
    sutureContinuous?: InputMaybe<Scalars["Boolean"]>;
    sutureInterrupted?: InputMaybe<Scalars["Boolean"]>;
    drapes?: InputMaybe<Scalars["Boolean"]>;
    ringer?: InputMaybe<Scalars["Boolean"]>;
    bss?: InputMaybe<Scalars["Boolean"]>;
    air?: InputMaybe<Scalars["Boolean"]>;
    hpmc?: InputMaybe<Scalars["Boolean"]>;
    healon?: InputMaybe<Scalars["Boolean"]>;
    pilo?: InputMaybe<Scalars["Boolean"]>;
    adrenalin?: InputMaybe<Scalars["Boolean"]>;
    antibiotic?: InputMaybe<Scalars["Boolean"]>;
    steroid?: InputMaybe<Scalars["Boolean"]>;
    suture80?: InputMaybe<Scalars["Boolean"]>;
    suture90?: InputMaybe<Scalars["Boolean"]>;
    suture100?: InputMaybe<Scalars["Boolean"]>;
    irrigatingSolution?: InputMaybe<Scalars["String"]>;
    visco?: InputMaybe<Scalars["String"]>;
    interacameral?: InputMaybe<Scalars["String"]>;
    subconj?: InputMaybe<Scalars["String"]>;
    suture?: InputMaybe<Scalars["String"]>;
    silk?: InputMaybe<Scalars["Boolean"]>;
    nylon?: InputMaybe<Scalars["Boolean"]>;
    pcTear?: InputMaybe<Scalars["Boolean"]>;
    vitreousLoss?: InputMaybe<Scalars["Boolean"]>;
    descematesStrip?: InputMaybe<Scalars["Boolean"]>;
    endothelialDamage?: InputMaybe<Scalars["Boolean"]>;
    nucluesDrop?: InputMaybe<Scalars["Boolean"]>;
    iridoDialysis?: InputMaybe<Scalars["Boolean"]>;
    irisDamage?: InputMaybe<Scalars["Boolean"]>;
    retainedCortex?: InputMaybe<Scalars["Boolean"]>;
    hyphema?: InputMaybe<Scalars["Boolean"]>;
    complicationsOthers?: InputMaybe<Scalars["String"]>;
    complicationsNote?: InputMaybe<Scalars["String"]>;
    vitrectomy?: InputMaybe<Scalars["String"]>;
    typeOfIolAc?: InputMaybe<Scalars["Boolean"]>;
    typeOfIolPc?: InputMaybe<Scalars["Boolean"]>;
    typeOfIol?: InputMaybe<Scalars["String"]>;
    iolModel?: InputMaybe<Scalars["String"]>;
    company?: InputMaybe<Scalars["String"]>;
    aclol?: InputMaybe<Scalars["String"]>;
    aclolPlanned?: InputMaybe<Scalars["Boolean"]>;
    aclolUnplanned?: InputMaybe<Scalars["Boolean"]>;
    unplanned?: InputMaybe<Scalars["String"]>;
    additionalNotes?: InputMaybe<Scalars["String"]>;
    specialInstructions?: InputMaybe<Scalars["String"]>;
    treatment?: InputMaybe<Scalars["String"]>;
    assistantName?: InputMaybe<Scalars["String"]>;
    performOnEye?: InputMaybe<Scalars["String"]>;
};
export declare type SurgicalProcedureType = {
    __typename?: "SurgicalProcedureType";
    id: Scalars["ID"];
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billings: Array<Maybe<Billing>>;
    supplies: Array<Maybe<Supply>>;
};
export declare type SurgicalProcedureTypeConnection = Connection & {
    __typename?: "SurgicalProcedureTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<SurgicalProcedureTypeEdge>>;
};
export declare type SurgicalProcedureTypeEdge = {
    __typename?: "SurgicalProcedureTypeEdge";
    node: SurgicalProcedureType;
};
export declare type SurgicalProcedureTypeInput = {
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billingIds: Array<InputMaybe<Scalars["ID"]>>;
    supplyIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare type SurgicalProcedureTypeUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    active?: InputMaybe<Scalars["Boolean"]>;
    billingIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    supplyIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};
export declare type SurgicalProcedureUpdateInput = {
    id: Scalars["ID"];
    respiratory?: InputMaybe<Scalars["String"]>;
    cardiovascular?: InputMaybe<Scalars["String"]>;
    abdomen?: InputMaybe<Scalars["String"]>;
    gus?: InputMaybe<Scalars["String"]>;
    ismss?: InputMaybe<Scalars["String"]>;
    cns?: InputMaybe<Scalars["String"]>;
    preanestheticAllergies?: InputMaybe<Scalars["Boolean"]>;
    preanestheticAllergiesNote?: InputMaybe<Scalars["String"]>;
    physicalBloodPressure?: InputMaybe<Scalars["String"]>;
    physicalPr?: InputMaybe<Scalars["String"]>;
    physicalRr?: InputMaybe<Scalars["String"]>;
    physicalSaO2?: InputMaybe<Scalars["String"]>;
    physicalTemperature?: InputMaybe<Scalars["String"]>;
    physicalWeight?: InputMaybe<Scalars["String"]>;
    physicalHeent?: InputMaybe<Scalars["String"]>;
    physicalArtificalDenture?: InputMaybe<Scalars["Boolean"]>;
    physicalArtificalDentureNote?: InputMaybe<Scalars["String"]>;
    physicalLgs?: InputMaybe<Scalars["String"]>;
    physicalChest?: InputMaybe<Scalars["String"]>;
    physicalCvs?: InputMaybe<Scalars["String"]>;
    physicalAbdomen?: InputMaybe<Scalars["String"]>;
    physicalGus?: InputMaybe<Scalars["String"]>;
    physicalIs?: InputMaybe<Scalars["String"]>;
    physicalMss?: InputMaybe<Scalars["String"]>;
    physicalCns?: InputMaybe<Scalars["String"]>;
    wbcActive?: InputMaybe<Scalars["Boolean"]>;
    wbcResults?: InputMaybe<Scalars["String"]>;
    wbcDate?: InputMaybe<Scalars["Time"]>;
    hgbhctActive?: InputMaybe<Scalars["Boolean"]>;
    hgbhctResults?: InputMaybe<Scalars["String"]>;
    hgbhctDate?: InputMaybe<Scalars["Time"]>;
    pltActive?: InputMaybe<Scalars["Boolean"]>;
    pltResults?: InputMaybe<Scalars["String"]>;
    pltDate?: InputMaybe<Scalars["Time"]>;
    coagulationPtActive?: InputMaybe<Scalars["Boolean"]>;
    coagulationPtResults?: InputMaybe<Scalars["String"]>;
    coagulationPtDate?: InputMaybe<Scalars["Time"]>;
    coagulationPttActive?: InputMaybe<Scalars["Boolean"]>;
    coagulationPttResults?: InputMaybe<Scalars["String"]>;
    coagulationPttDate?: InputMaybe<Scalars["Time"]>;
    coagulationInrActive?: InputMaybe<Scalars["Boolean"]>;
    coagulationInrResults?: InputMaybe<Scalars["String"]>;
    coagulationInrDate?: InputMaybe<Scalars["Time"]>;
    serumAlbuminActive?: InputMaybe<Scalars["Boolean"]>;
    serumAlbuminResults?: InputMaybe<Scalars["String"]>;
    serumAlbuminDate?: InputMaybe<Scalars["Time"]>;
    totalProteinActive?: InputMaybe<Scalars["Boolean"]>;
    totalProteinResults?: InputMaybe<Scalars["String"]>;
    totalProteinDate?: InputMaybe<Scalars["Time"]>;
    bilirubinTotalActive?: InputMaybe<Scalars["Boolean"]>;
    bilirubinTotalResults?: InputMaybe<Scalars["String"]>;
    bilirubinTotalDate?: InputMaybe<Scalars["Time"]>;
    bilirubinDirectActive?: InputMaybe<Scalars["Boolean"]>;
    bilirubinDirectResults?: InputMaybe<Scalars["String"]>;
    bilirubinDirectDate?: InputMaybe<Scalars["Time"]>;
    astsgotActive?: InputMaybe<Scalars["Boolean"]>;
    astsgotResults?: InputMaybe<Scalars["String"]>;
    astsgotDate?: InputMaybe<Scalars["Time"]>;
    altsgptActive?: InputMaybe<Scalars["Boolean"]>;
    altsgptResults?: InputMaybe<Scalars["String"]>;
    altsgptDate?: InputMaybe<Scalars["Time"]>;
    alpActive?: InputMaybe<Scalars["Boolean"]>;
    alpResults?: InputMaybe<Scalars["String"]>;
    alpDate?: InputMaybe<Scalars["Time"]>;
    renalCrActive?: InputMaybe<Scalars["Boolean"]>;
    renalCrResults?: InputMaybe<Scalars["String"]>;
    renalCrDate?: InputMaybe<Scalars["Time"]>;
    renalBunActive?: InputMaybe<Scalars["Boolean"]>;
    renalBunResults?: InputMaybe<Scalars["String"]>;
    renalBunDate?: InputMaybe<Scalars["Time"]>;
    thyroidFreeT3Active?: InputMaybe<Scalars["Boolean"]>;
    thyroidFreeT3Results?: InputMaybe<Scalars["String"]>;
    thyroidFreeT3Date?: InputMaybe<Scalars["Time"]>;
    thyroidTotalT4Active?: InputMaybe<Scalars["Boolean"]>;
    thyroidTotalT4Results?: InputMaybe<Scalars["String"]>;
    thyroidTotalT4Date?: InputMaybe<Scalars["Time"]>;
    thyroidTshActive?: InputMaybe<Scalars["Boolean"]>;
    thyroidTshResults?: InputMaybe<Scalars["String"]>;
    thyroidTshDate?: InputMaybe<Scalars["Time"]>;
    electrolytesNaPlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesNaPlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesNaPlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesKPlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesKPlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesKPlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesClMinusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesClMinusResults?: InputMaybe<Scalars["String"]>;
    electrolytesClMinusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesCa2PlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesCa2PlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesCa2PlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesMg2PlusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesMg2PlusResults?: InputMaybe<Scalars["String"]>;
    electrolytesMg2PlusDate?: InputMaybe<Scalars["Time"]>;
    electrolytesPMinusActive?: InputMaybe<Scalars["Boolean"]>;
    electrolytesPMinusResults?: InputMaybe<Scalars["String"]>;
    electrolytesPMinusDate?: InputMaybe<Scalars["Time"]>;
    asa1?: InputMaybe<Scalars["Boolean"]>;
    asa2?: InputMaybe<Scalars["Boolean"]>;
    asa3?: InputMaybe<Scalars["Boolean"]>;
    asa4?: InputMaybe<Scalars["Boolean"]>;
    asa5?: InputMaybe<Scalars["Boolean"]>;
    opv1?: InputMaybe<Scalars["Boolean"]>;
    opv2?: InputMaybe<Scalars["Boolean"]>;
    opv3?: InputMaybe<Scalars["Boolean"]>;
    opv4?: InputMaybe<Scalars["Boolean"]>;
    bleedingTendancy?: InputMaybe<Scalars["Boolean"]>;
    bleedingTendancyNote?: InputMaybe<Scalars["String"]>;
    dm?: InputMaybe<Scalars["Boolean"]>;
    dmNote?: InputMaybe<Scalars["String"]>;
    hypertension?: InputMaybe<Scalars["Boolean"]>;
    hypertensionNote?: InputMaybe<Scalars["String"]>;
    cardiac?: InputMaybe<Scalars["Boolean"]>;
    cardiacNote?: InputMaybe<Scalars["String"]>;
    preanestheticAsthma?: InputMaybe<Scalars["Boolean"]>;
    preanestheticAsthmaNote?: InputMaybe<Scalars["String"]>;
    rvi?: InputMaybe<Scalars["Boolean"]>;
    rviNote?: InputMaybe<Scalars["String"]>;
    renal?: InputMaybe<Scalars["Boolean"]>;
    renalNote?: InputMaybe<Scalars["String"]>;
    fitForSurgery?: InputMaybe<Scalars["Boolean"]>;
    fitForSurgeryNote?: InputMaybe<Scalars["String"]>;
    preanestheticDocuments?: InputMaybe<Array<InputMaybe<FileUpload>>>;
    rightCorrected?: InputMaybe<Scalars["String"]>;
    leftCorrected?: InputMaybe<Scalars["String"]>;
    rightIop?: InputMaybe<Scalars["String"]>;
    leftIop?: InputMaybe<Scalars["String"]>;
    rightAnteriorSegment?: InputMaybe<Scalars["String"]>;
    leftAnteriorSegment?: InputMaybe<Scalars["String"]>;
    rightPosteriorSegment?: InputMaybe<Scalars["String"]>;
    leftPosteriorSegment?: InputMaybe<Scalars["String"]>;
    rightBiometry?: InputMaybe<Scalars["String"]>;
    leftBiometry?: InputMaybe<Scalars["String"]>;
    diabetes?: InputMaybe<Scalars["String"]>;
    hpn?: InputMaybe<Scalars["String"]>;
    asthma?: InputMaybe<Scalars["String"]>;
    cardiacDisease?: InputMaybe<Scalars["String"]>;
    allergies?: InputMaybe<Scalars["String"]>;
    bloodPressure?: InputMaybe<Scalars["String"]>;
    bloodSugar?: InputMaybe<Scalars["String"]>;
    uriAnalysis?: InputMaybe<Scalars["String"]>;
    la?: InputMaybe<Scalars["Boolean"]>;
    ga?: InputMaybe<Scalars["Boolean"]>;
    retrobulbar?: InputMaybe<Scalars["Boolean"]>;
    peribulbar?: InputMaybe<Scalars["Boolean"]>;
    topical?: InputMaybe<Scalars["Boolean"]>;
    conjFlapLimbal?: InputMaybe<Scalars["Boolean"]>;
    conjFlapFornix?: InputMaybe<Scalars["Boolean"]>;
    sectionLimbal?: InputMaybe<Scalars["Boolean"]>;
    sectionCorneral?: InputMaybe<Scalars["Boolean"]>;
    sectionScleralTunnel?: InputMaybe<Scalars["Boolean"]>;
    capsulotomyLinear?: InputMaybe<Scalars["Boolean"]>;
    capsulotomyCanOpener?: InputMaybe<Scalars["Boolean"]>;
    capsulotomyCcc?: InputMaybe<Scalars["Boolean"]>;
    iolPlacementBag?: InputMaybe<Scalars["Boolean"]>;
    iolSulcus?: InputMaybe<Scalars["Boolean"]>;
    iolBagSulcus?: InputMaybe<Scalars["Boolean"]>;
    irodectpmyNone?: InputMaybe<Scalars["Boolean"]>;
    irodectpmyPl?: InputMaybe<Scalars["Boolean"]>;
    irodectpmySl?: InputMaybe<Scalars["Boolean"]>;
    sphincterectomy?: InputMaybe<Scalars["Boolean"]>;
    lensExtractionIcce?: InputMaybe<Scalars["Boolean"]>;
    lensExtractionEcce?: InputMaybe<Scalars["Boolean"]>;
    lensExtractionPhaco?: InputMaybe<Scalars["Boolean"]>;
    sutureNone?: InputMaybe<Scalars["Boolean"]>;
    sutureContinuous?: InputMaybe<Scalars["Boolean"]>;
    sutureInterrupted?: InputMaybe<Scalars["Boolean"]>;
    drapes?: InputMaybe<Scalars["Boolean"]>;
    ringer?: InputMaybe<Scalars["Boolean"]>;
    bss?: InputMaybe<Scalars["Boolean"]>;
    air?: InputMaybe<Scalars["Boolean"]>;
    hpmc?: InputMaybe<Scalars["Boolean"]>;
    healon?: InputMaybe<Scalars["Boolean"]>;
    pilo?: InputMaybe<Scalars["Boolean"]>;
    adrenalin?: InputMaybe<Scalars["Boolean"]>;
    antibiotic?: InputMaybe<Scalars["Boolean"]>;
    steroid?: InputMaybe<Scalars["Boolean"]>;
    suture80?: InputMaybe<Scalars["Boolean"]>;
    suture90?: InputMaybe<Scalars["Boolean"]>;
    suture100?: InputMaybe<Scalars["Boolean"]>;
    irrigatingSolution?: InputMaybe<Scalars["String"]>;
    visco?: InputMaybe<Scalars["String"]>;
    interacameral?: InputMaybe<Scalars["String"]>;
    subconj?: InputMaybe<Scalars["String"]>;
    suture?: InputMaybe<Scalars["String"]>;
    silk?: InputMaybe<Scalars["Boolean"]>;
    nylon?: InputMaybe<Scalars["Boolean"]>;
    pcTear?: InputMaybe<Scalars["Boolean"]>;
    vitreousLoss?: InputMaybe<Scalars["Boolean"]>;
    descematesStrip?: InputMaybe<Scalars["Boolean"]>;
    endothelialDamage?: InputMaybe<Scalars["Boolean"]>;
    nucluesDrop?: InputMaybe<Scalars["Boolean"]>;
    iridoDialysis?: InputMaybe<Scalars["Boolean"]>;
    irisDamage?: InputMaybe<Scalars["Boolean"]>;
    retainedCortex?: InputMaybe<Scalars["Boolean"]>;
    hyphema?: InputMaybe<Scalars["Boolean"]>;
    complicationsOthers?: InputMaybe<Scalars["String"]>;
    complicationsNote?: InputMaybe<Scalars["String"]>;
    vitrectomy?: InputMaybe<Scalars["String"]>;
    typeOfIolAc?: InputMaybe<Scalars["Boolean"]>;
    typeOfIolPc?: InputMaybe<Scalars["Boolean"]>;
    typeOfIol?: InputMaybe<Scalars["String"]>;
    iolModel?: InputMaybe<Scalars["String"]>;
    company?: InputMaybe<Scalars["String"]>;
    aclol?: InputMaybe<Scalars["String"]>;
    aclolPlanned?: InputMaybe<Scalars["Boolean"]>;
    aclolUnplanned?: InputMaybe<Scalars["Boolean"]>;
    unplanned?: InputMaybe<Scalars["String"]>;
    additionalNotes?: InputMaybe<Scalars["String"]>;
    specialInstructions?: InputMaybe<Scalars["String"]>;
    treatment?: InputMaybe<Scalars["String"]>;
    assistantName?: InputMaybe<Scalars["String"]>;
    performOnEye?: InputMaybe<Scalars["String"]>;
};
export declare type System = {
    __typename?: "System";
    id: Scalars["ID"];
    title: Scalars["String"];
    active: Scalars["Boolean"];
};
export declare type SystemConnection = Connection & {
    __typename?: "SystemConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<SystemEdge>;
};
export declare type SystemEdge = {
    __typename?: "SystemEdge";
    node: System;
};
export declare type SystemInput = {
    title: Scalars["String"];
};
export declare type SystemSymptom = {
    __typename?: "SystemSymptom";
    id: Scalars["ID"];
    title: Scalars["String"];
    systemId: Scalars["ID"];
    system: System;
};
export declare type SystemSymptomConnection = Connection & {
    __typename?: "SystemSymptomConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<SystemSymptomEdge>;
};
export declare type SystemSymptomEdge = {
    __typename?: "SystemSymptomEdge";
    node: SystemSymptom;
};
export declare type SystemSymptomInput = {
    title: Scalars["String"];
    systemId: Scalars["ID"];
};
export declare type SystemSymptomUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    systemId?: InputMaybe<Scalars["ID"]>;
};
export declare type SystemUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
};
export declare type Todo = {
    __typename?: "Todo";
    id: Scalars["ID"];
    text: Scalars["String"];
    done: Scalars["Boolean"];
};
export declare type Treatment = {
    __typename?: "Treatment";
    id: Scalars["ID"];
    treatmentOrderId: Scalars["ID"];
    patientChartId: Scalars["ID"];
    note?: Maybe<Scalars["String"]>;
    result?: Maybe<Scalars["String"]>;
    rightEyeText?: Maybe<Scalars["String"]>;
    leftEyeText?: Maybe<Scalars["String"]>;
    generalText?: Maybe<Scalars["String"]>;
    treatmentTypeId: Scalars["ID"];
    treatmentType: TreatmentType;
    treatmentTypeTitle: Scalars["String"];
    status: TreatmentStatus;
    receptionNote: Scalars["String"];
    payments: Array<Payment>;
};
export declare type TreatmentConnection = Connection & {
    __typename?: "TreatmentConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<TreatmentEdge>;
};
export declare type TreatmentEdge = {
    __typename?: "TreatmentEdge";
    node: Treatment;
};
export declare type TreatmentFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type TreatmentInput = {
    patientChartId: Scalars["ID"];
    note?: InputMaybe<Scalars["String"]>;
    result?: InputMaybe<Scalars["String"]>;
    rightEyeText?: InputMaybe<Scalars["String"]>;
    leftEyeText?: InputMaybe<Scalars["String"]>;
    generalText?: InputMaybe<Scalars["String"]>;
};
export declare type TreatmentOrder = {
    __typename?: "TreatmentOrder";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    patientId: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    phoneNo: Scalars["String"];
    userName: Scalars["String"];
    orderedById?: Maybe<Scalars["ID"]>;
    orderedBy?: Maybe<User>;
    treatments: Array<Treatment>;
    status: TreatmentOrderStatus;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type TreatmentOrderConnection = Connection & {
    __typename?: "TreatmentOrderConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<TreatmentOrderEdge>;
};
export declare type TreatmentOrderEdge = {
    __typename?: "TreatmentOrderEdge";
    node: TreatmentOrder;
};
export declare type TreatmentOrderFilter = {
    patientChartId?: InputMaybe<Scalars["ID"]>;
    orderedById?: InputMaybe<Scalars["ID"]>;
    patientId?: InputMaybe<Scalars["ID"]>;
    status?: InputMaybe<Scalars["String"]>;
};
export declare enum TreatmentOrderStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare enum TreatmentStatus {
    Ordered = "ORDERED",
    Completed = "COMPLETED"
}
export declare type TreatmentType = {
    __typename?: "TreatmentType";
    id: Scalars["ID"];
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billings: Array<Maybe<Billing>>;
    supplies: Array<Maybe<Supply>>;
};
export declare type TreatmentTypeConnection = Connection & {
    __typename?: "TreatmentTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<TreatmentTypeEdge>>;
};
export declare type TreatmentTypeEdge = {
    __typename?: "TreatmentTypeEdge";
    node: TreatmentType;
};
export declare type TreatmentTypeInput = {
    title: Scalars["String"];
    active: Scalars["Boolean"];
    billingIds: Array<InputMaybe<Scalars["ID"]>>;
    supplyIds: Array<InputMaybe<Scalars["ID"]>>;
};
export declare type TreatmentTypeUpdateInput = {
    id: Scalars["ID"];
    title?: InputMaybe<Scalars["String"]>;
    active?: InputMaybe<Scalars["Boolean"]>;
    billingIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    supplyIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};
export declare type TreatmentUpdateInput = {
    id: Scalars["ID"];
    note?: InputMaybe<Scalars["String"]>;
    result?: InputMaybe<Scalars["String"]>;
    rightEyeText?: InputMaybe<Scalars["String"]>;
    leftEyeText?: InputMaybe<Scalars["String"]>;
    generalText?: InputMaybe<Scalars["String"]>;
};
export declare type User = {
    __typename?: "User";
    id: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    userTypes: Array<Maybe<UserType>>;
    active: Scalars["Boolean"];
    email: Scalars["String"];
    confirmed?: Maybe<Scalars["Boolean"]>;
    locked?: Maybe<Scalars["Time"]>;
    signature?: Maybe<File>;
    profilePic?: Maybe<File>;
    createdAt?: Maybe<Scalars["Time"]>;
};
export declare type UserConnection = Connection & {
    __typename?: "UserConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<UserEdge>>;
};
export declare type UserEdge = {
    __typename?: "UserEdge";
    node: User;
};
export declare type UserFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    email: Scalars["String"];
};
export declare type UserInput = {
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    email: Scalars["String"];
    password: Scalars["String"];
    confirmPassword: Scalars["String"];
    userTypeIds: Array<InputMaybe<Scalars["ID"]>>;
    signature?: InputMaybe<FileUpload>;
    profilePic?: InputMaybe<FileUpload>;
    active?: InputMaybe<Scalars["Boolean"]>;
};
export declare type UserSearchInput = {
    searchTerm?: InputMaybe<Scalars["String"]>;
};
export declare type UserType = {
    __typename?: "UserType";
    id: Scalars["ID"];
    title: Scalars["String"];
};
export declare type UserTypeConnection = Connection & {
    __typename?: "UserTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<UserTypeEdge>>;
};
export declare type UserTypeEdge = {
    __typename?: "UserTypeEdge";
    node: UserType;
};
export declare type UserTypeInput = {
    title: Scalars["String"];
};
export declare type UserTypeUpdateInput = {
    id: Scalars["ID"];
    title: Scalars["String"];
};
export declare type UserUpdateInput = {
    id: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    email: Scalars["String"];
    userTypeIds: Array<InputMaybe<Scalars["ID"]>>;
    active?: InputMaybe<Scalars["Boolean"]>;
    signature?: InputMaybe<FileUpload>;
    profilePic?: InputMaybe<FileUpload>;
};
export declare type VisitType = {
    __typename?: "VisitType";
    id: Scalars["Int"];
    title: Scalars["String"];
};
export declare type VisitTypeConnection = Connection & {
    __typename?: "VisitTypeConnection";
    totalCount: Scalars["Int"];
    pageInfo: PageInfo;
    edges: Array<Maybe<VisitTypeEdge>>;
};
export declare type VisitTypeEdge = {
    __typename?: "VisitTypeEdge";
    node: VisitType;
};
export declare type VisitTypeInput = {
    title?: InputMaybe<Scalars["String"]>;
};
export declare type VisitTypeOrder = {
    field: Scalars["String"];
    direction: OrderDirection;
};
export declare type VitalSigns = {
    __typename?: "VitalSigns";
    id: Scalars["ID"];
    patientChartId: Scalars["ID"];
    temperature?: Maybe<Scalars["Float"]>;
    pulse?: Maybe<Scalars["Float"]>;
    bloodPressureSystolic?: Maybe<Scalars["Float"]>;
    bloodPressureDiastolic?: Maybe<Scalars["Float"]>;
    respiratoryRate?: Maybe<Scalars["Float"]>;
    oxygenSaturation?: Maybe<Scalars["Float"]>;
    height?: Maybe<Scalars["Float"]>;
    weight?: Maybe<Scalars["Float"]>;
    bmi?: Maybe<Scalars["Float"]>;
    rightDistanceUncorrected?: Maybe<Scalars["String"]>;
    leftDistanceUncorrected?: Maybe<Scalars["String"]>;
    rightDistancePinhole?: Maybe<Scalars["String"]>;
    leftDistancePinhole?: Maybe<Scalars["String"]>;
    rightDistanceCorrected?: Maybe<Scalars["String"]>;
    leftDistanceCorrected?: Maybe<Scalars["String"]>;
    rightNearUncorrected?: Maybe<Scalars["String"]>;
    leftNearUncorrected?: Maybe<Scalars["String"]>;
    rightNearPinhole?: Maybe<Scalars["String"]>;
    leftNearPinhole?: Maybe<Scalars["String"]>;
    rightNearCorrected?: Maybe<Scalars["String"]>;
    leftNearCorrected?: Maybe<Scalars["String"]>;
    rightApplanation?: Maybe<Scalars["String"]>;
    leftApplanation?: Maybe<Scalars["String"]>;
    rightTonopen?: Maybe<Scalars["String"]>;
    leftTonopen?: Maybe<Scalars["String"]>;
    rightDigital?: Maybe<Scalars["String"]>;
    leftDigital?: Maybe<Scalars["String"]>;
    rightNoncontact?: Maybe<Scalars["String"]>;
    leftNoncontact?: Maybe<Scalars["String"]>;
    rightDistanceSph?: Maybe<Scalars["String"]>;
    leftDistanceSph?: Maybe<Scalars["String"]>;
    rightDistanceAxis?: Maybe<Scalars["String"]>;
    leftDistanceAxis?: Maybe<Scalars["String"]>;
    rightDistanceCyl?: Maybe<Scalars["String"]>;
    leftDistanceCyl?: Maybe<Scalars["String"]>;
    rightNearSph?: Maybe<Scalars["String"]>;
    leftNearSph?: Maybe<Scalars["String"]>;
    rightNearCyl?: Maybe<Scalars["String"]>;
    leftNearCyl?: Maybe<Scalars["String"]>;
    rightNearAxis?: Maybe<Scalars["String"]>;
    leftNearAxis?: Maybe<Scalars["String"]>;
    rightLensMeterSph?: Maybe<Scalars["String"]>;
    leftLensMeterSph?: Maybe<Scalars["String"]>;
    rightLensMeterAxis?: Maybe<Scalars["String"]>;
    leftLensMeterAxis?: Maybe<Scalars["String"]>;
    rightLensMeterCyl?: Maybe<Scalars["String"]>;
    leftLensMeterCyl?: Maybe<Scalars["String"]>;
};
export declare type VitalSignsFilter = {
    id?: InputMaybe<Scalars["ID"]>;
    patientChartId?: InputMaybe<Scalars["ID"]>;
};
export declare type VitalSignsInput = {
    patientChartId: Scalars["ID"];
    temperature?: InputMaybe<Scalars["Float"]>;
    pulse?: InputMaybe<Scalars["Float"]>;
    bloodPressureSystolic?: InputMaybe<Scalars["Float"]>;
    bloodPressureDiastolic?: InputMaybe<Scalars["Float"]>;
    respiratoryRate?: InputMaybe<Scalars["Float"]>;
    oxygenSaturation?: InputMaybe<Scalars["Float"]>;
    height?: InputMaybe<Scalars["Float"]>;
    weight?: InputMaybe<Scalars["Float"]>;
    bmi?: InputMaybe<Scalars["Float"]>;
    rightDistanceUncorrected?: InputMaybe<Scalars["String"]>;
    leftDistanceUncorrected?: InputMaybe<Scalars["String"]>;
    rightDistancePinhole?: InputMaybe<Scalars["String"]>;
    leftDistancePinhole?: InputMaybe<Scalars["String"]>;
    rightDistanceCorrected?: InputMaybe<Scalars["String"]>;
    leftDistanceCorrected?: InputMaybe<Scalars["String"]>;
    rightNearUncorrected?: InputMaybe<Scalars["String"]>;
    leftNearUncorrected?: InputMaybe<Scalars["String"]>;
    rightNearPinhole?: InputMaybe<Scalars["String"]>;
    leftNearPinhole?: InputMaybe<Scalars["String"]>;
    rightNearCorrected?: InputMaybe<Scalars["String"]>;
    leftNearCorrected?: InputMaybe<Scalars["String"]>;
    rightApplanation?: InputMaybe<Scalars["String"]>;
    leftApplanation?: InputMaybe<Scalars["String"]>;
    rightTonopen?: InputMaybe<Scalars["String"]>;
    leftTonopen?: InputMaybe<Scalars["String"]>;
    rightDigital?: InputMaybe<Scalars["String"]>;
    leftDigital?: InputMaybe<Scalars["String"]>;
    rightNoncontact?: InputMaybe<Scalars["String"]>;
    leftNoncontact?: InputMaybe<Scalars["String"]>;
    rightDistanceSph?: InputMaybe<Scalars["String"]>;
    leftDistanceSph?: InputMaybe<Scalars["String"]>;
    rightDistanceAxis?: InputMaybe<Scalars["String"]>;
    leftDistanceAxis?: InputMaybe<Scalars["String"]>;
    rightDistanceCyl?: InputMaybe<Scalars["String"]>;
    leftDistanceCyl?: InputMaybe<Scalars["String"]>;
    rightNearSph?: InputMaybe<Scalars["String"]>;
    leftNearSph?: InputMaybe<Scalars["String"]>;
    rightNearCyl?: InputMaybe<Scalars["String"]>;
    leftNearCyl?: InputMaybe<Scalars["String"]>;
    rightNearAxis?: InputMaybe<Scalars["String"]>;
    leftNearAxis?: InputMaybe<Scalars["String"]>;
    rightLensMeterSph?: InputMaybe<Scalars["String"]>;
    leftLensMeterSph?: InputMaybe<Scalars["String"]>;
    rightLensMeterAxis?: InputMaybe<Scalars["String"]>;
    leftLensMeterAxis?: InputMaybe<Scalars["String"]>;
    rightLensMeterCyl?: InputMaybe<Scalars["String"]>;
    leftLensMeterCyl?: InputMaybe<Scalars["String"]>;
};
export declare type VitalSignsProgress = {
    __typename?: "VitalSignsProgress";
    appointments: Array<Maybe<Appointment>>;
};
export declare type VitalSignsUpdateInput = {
    id: Scalars["ID"];
    temperature?: InputMaybe<Scalars["Float"]>;
    pulse?: InputMaybe<Scalars["Float"]>;
    bloodPressureSystolic?: InputMaybe<Scalars["Float"]>;
    bloodPressureDiastolic?: InputMaybe<Scalars["Float"]>;
    respiratoryRate?: InputMaybe<Scalars["Float"]>;
    oxygenSaturation?: InputMaybe<Scalars["Float"]>;
    height?: InputMaybe<Scalars["Float"]>;
    weight?: InputMaybe<Scalars["Float"]>;
    bmi?: InputMaybe<Scalars["Float"]>;
    rightDistanceUncorrected?: InputMaybe<Scalars["String"]>;
    leftDistanceUncorrected?: InputMaybe<Scalars["String"]>;
    rightDistancePinhole?: InputMaybe<Scalars["String"]>;
    leftDistancePinhole?: InputMaybe<Scalars["String"]>;
    rightDistanceCorrected?: InputMaybe<Scalars["String"]>;
    leftDistanceCorrected?: InputMaybe<Scalars["String"]>;
    rightNearUncorrected?: InputMaybe<Scalars["String"]>;
    leftNearUncorrected?: InputMaybe<Scalars["String"]>;
    rightNearPinhole?: InputMaybe<Scalars["String"]>;
    leftNearPinhole?: InputMaybe<Scalars["String"]>;
    rightNearCorrected?: InputMaybe<Scalars["String"]>;
    leftNearCorrected?: InputMaybe<Scalars["String"]>;
    rightApplanation?: InputMaybe<Scalars["String"]>;
    leftApplanation?: InputMaybe<Scalars["String"]>;
    rightTonopen?: InputMaybe<Scalars["String"]>;
    leftTonopen?: InputMaybe<Scalars["String"]>;
    rightDigital?: InputMaybe<Scalars["String"]>;
    leftDigital?: InputMaybe<Scalars["String"]>;
    rightNoncontact?: InputMaybe<Scalars["String"]>;
    leftNoncontact?: InputMaybe<Scalars["String"]>;
    rightDistanceSph?: InputMaybe<Scalars["String"]>;
    leftDistanceSph?: InputMaybe<Scalars["String"]>;
    rightDistanceAxis?: InputMaybe<Scalars["String"]>;
    leftDistanceAxis?: InputMaybe<Scalars["String"]>;
    rightDistanceCyl?: InputMaybe<Scalars["String"]>;
    leftDistanceCyl?: InputMaybe<Scalars["String"]>;
    rightNearSph?: InputMaybe<Scalars["String"]>;
    leftNearSph?: InputMaybe<Scalars["String"]>;
    rightNearCyl?: InputMaybe<Scalars["String"]>;
    leftNearCyl?: InputMaybe<Scalars["String"]>;
    rightNearAxis?: InputMaybe<Scalars["String"]>;
    leftNearAxis?: InputMaybe<Scalars["String"]>;
    rightLensMeterSph?: InputMaybe<Scalars["String"]>;
    leftLensMeterSph?: InputMaybe<Scalars["String"]>;
    rightLensMeterAxis?: InputMaybe<Scalars["String"]>;
    leftLensMeterAxis?: InputMaybe<Scalars["String"]>;
    rightLensMeterCyl?: InputMaybe<Scalars["String"]>;
    leftLensMeterCyl?: InputMaybe<Scalars["String"]>;
};
