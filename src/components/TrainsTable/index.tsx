import { useAppContext } from "../../core/context";
import { Train } from "../../core/types";
import Table from "../Table";

const TrainsTable = () => {
	const { trains, setSelectedTrain, setIsSpeedLimitChanged } = useAppContext();
	const caption = <caption className="table-caption">Поезда</caption>;

	const onSelectTrain = (name: string) => {
		const selectedTrain = trains.find((train) => train.name === name);
		if (selectedTrain === undefined) return;
		setSelectedTrain(selectedTrain);
		setIsSpeedLimitChanged(false);
	};

	const columns = [
		{
			title: "Название",
			renderContent: ({ name }: Train) => (
				<p className="table-thead-trains-p" onClick={() => onSelectTrain(name)}>
					{name}
				</p>
			)
		},
		{
			title: "Описание",
			renderContent: ({ description }: Train) => description
		}
	];

	const rows = trains.map((train) => {
		return {
			name: train.name,
			description: train.description,
			id: train.id
		};
	});

	return (
		<section className="main-section">
			<Table tableHeader={caption} columns={columns} rows={rows} />
		</section>
	);
};

export default TrainsTable;
