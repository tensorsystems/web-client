export interface Page {
    title: string;
    cancellable: boolean | true;
    route: string;
    icon: JSX.Element;
    match?: Array<string>;
    notifs?: number;
}
