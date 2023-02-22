import "@emotion/react";
import { ThemeStyleForEmotion } from "@/stores/ThemeStore";

declare module "@emotion/react" {
	export interface Theme extends ThemeStyleForEmotion {}
}
