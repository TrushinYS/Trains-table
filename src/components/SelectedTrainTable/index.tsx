import { FC } from "react";
import { useAppContext } from "../../core/context";
import Table from "../Table";
import { sendTrainOnServer } from "../../core/helpers";
import { SpeedLimit } from "../../core/types";
import Input from "../Input";

const SelectedTrainTable: FC = () => {
	const {
		trains,
		setTrains,
		isSpeedLimitChanged,
		setIsSpeedLimitChanged,
		selectedTrain
	} = useAppContext();

	const caption = (
		<caption className="table-caption">
			<p>Ограничения по скорости</p>
			<p>{selectedTrain?.name}</p>
		</caption>
	);

	const onSendChangedTrain = () => {
		if (selectedTrain === null) return;
		sendTrainOnServer(selectedTrain);
		onChangedTrainSpeedLimits();
		setIsSpeedLimitChanged(false);
	};

	const onChangedTrainSpeedLimits = () => {
		const changedTrains = trains.map((train) => {
			if (train.name === selectedTrain?.name) {
				return selectedTrain;
			}
			return train;
		});

		setTrains(changedTrains);
	};

	const columns = [
		{
			title: "Название",
			renderContent: ({ name }: SpeedLimit) => name
		},
		{
			title: "Ограничение скорости",
			renderContent: ({ speedLimit, id }: SpeedLimit) => (
				<Input speedValue={speedLimit} id={id} />
			)
		}
	];

	let rows =
		selectedTrain?.speedLimits.map((limit) => {
			return {
				name: limit.name,
				speedLimit: limit.speedLimit,
				id: limit.id
			};
		}) || [];

	return (
		<section className="main-section">
			<Table tableHeader={caption} columns={columns} rows={rows} />
			<button
				className="checked-train-btn"
				disabled={!isSpeedLimitChanged}
				onClick={onSendChangedTrain}
			>
				Отправить данные
			</button>
		</section>
	);
};

export default SelectedTrainTable;
