import { deleteCoookie, getCookie, setCookie } from "@/utils";

export default function () {
	return [getCookie, setCookie, deleteCoookie] as const;
}
