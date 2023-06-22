import { ChangeEvent, FC, useState } from "react";
import { useAppContext } from "../../core/context";
import { onChangeSpeedLimitInTrain } from "../../core/helpers";

interface InputProps {
	speedValue: number;
	id: number;
}

const Input: FC<InputProps> = ({ speedValue, id }) => {
	const { selectedTrain, setIsSpeedLimitChanged, setSelectedTrain } =
		useAppContext();
	const [curSpeedValue, setCurSpeedValue] = useState(speedValue);

	const onChangeSpeedValue = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = Number(e.target.value);
		setCurSpeedValue(inputValue);
		setIsSpeedLimitChanged(true);
		onCheckSpeedLimit(inputValue);
	};

	const onCheckSpeedLimit = (speedLimitValue: number) => {
		if (selectedTrain === null) return;
		const changedTrain = onChangeSpeedLimitInTrain(
			selectedTrain,
			speedLimitValue,
			id
		);
		setSelectedTrain(changedTrain);
	};

	return (
		<label>
			<input
				className="table-tbody-tr-td-input"
				type="text"
				onChange={onChangeSpeedValue}
				value={curSpeedValue}
			/>
		</label>
	);
};

export default Input;
