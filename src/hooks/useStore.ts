import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import { Stores } from "@/stores";

const useStores = () => {
	return useContext(MobXProviderContext) as Stores;
};

export default useStores;
