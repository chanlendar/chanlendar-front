declare type MouseOrTouchEvent = MouseEvent | TouchEvent;
declare type DivMouseEvent = MouseEvent<HTMLDivElement>;
declare type OnDivMouseFunction = (e: DivMouseEvent) => void;
declare interface Date {
	// it returns YYYYMM format as string typed.
	toYearMonthString(): string;
}
