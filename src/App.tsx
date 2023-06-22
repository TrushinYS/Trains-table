import { FC, useEffect, useState } from "react";
import { CheckedTrain, Train } from "./core/types";
import { loadTrains } from "./core/helpers";
import { AppContextItem } from "./core/context";
import TrainsTable from "./components/TrainsTable";
import SelectedTrainTable from "./components/SelectedTrainTable";

const App: FC = () => {
	const [trains, setTrains] = useState<Train[]>([]);
	const [selectedTrain, setSelectedTrain] = useState<CheckedTrain>(null);
	const [isSpeedLimitChanged, setIsSpeedLimitChanged] =
		useState<boolean>(false);

	const fetchTrains = async () => {
		const fetchedTrains = await loadTrains();
		setTrains(fetchedTrains);
	};

	useEffect(() => {
		fetchTrains();
	}, []);

	const provideValues = {
		trains,
		setTrains,
		selectedTrain,
		setSelectedTrain,
		isSpeedLimitChanged,
		setIsSpeedLimitChanged
	};

	return (
		<AppContextItem.Provider value={provideValues}>
			<header className="header">
				<h1>Список поездов</h1>
			</header>
			<main className="main">
				<TrainsTable />
				{selectedTrain && <SelectedTrainTable />}
			</main>
		</AppContextItem.Provider>
	);
};

export default App;
