import { createContext, useContext } from "react";
import { AppContext } from "../types";

export const AppContextItem = createContext<AppContext>({
	trains: [],
	setTrains: (state = []) => {},
	selectedTrain: null,
	setSelectedTrain: (state = null) => {},
	isSpeedLimitChanged: false,
	setIsSpeedLimitChanged: (state = false) => true
});

export const useAppContext = () => {
	const context = useContext(AppContextItem);

	if (!context) {
		throw new Error("this hook is not available now");
	}

	return context;
};
