declare type MouseOrTouchEvent = MouseEvent | TouchEvent;
declare type DivMouseEvent = MouseEvent<HTMLDivElement>;
declare type OnDivMouseFunction = (e: DivMouseEvent) => void;
