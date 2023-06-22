import { FETCH_TRAINS_STRING } from "../constants";
import { Train } from "../types";

export async function loadTrains(): Promise<Train[]> {
	const response = await fetch(FETCH_TRAINS_STRING);
	const trains: Train[] = await response.json();

	const trainsWithId = trains.map((train, index) => {
		train.id = index;
		let speedLimitId = trains.length;
		train.speedLimits = train.speedLimits.map((speedLimit, index) => {
			speedLimitId += train.id + index;
			speedLimit.id = speedLimitId;
			return speedLimit;
		});
		return train;
	});
	return trainsWithId;
}

export function sendTrainOnServer(checkedTrain: Train) {
	if (!validationOfTrain(checkedTrain)) {
		console.log("Данные не валидны");
		return;
	}
	checkedTrain?.speedLimits.sort((a, b) => a.speedLimit - b.speedLimit);
	console.log("Данные успешно отправлены", checkedTrain);
}

function validationOfTrain(trainItem: Train): boolean {
	return trainItem.speedLimits.every((item) => item.speedLimit > 0);
}

export function onChangeSpeedLimitInTrain(
	checkedTrain: Train,
	speed: number,
	speedId: number
): Train {
	const trainWithChangedSpeed = structuredClone(checkedTrain);

	const changedSpeedLimits = checkedTrain?.speedLimits.map((limit) => {
		if (limit.id === speedId) {
			limit.speedLimit = speed;
		}
		return limit;
	});

	trainWithChangedSpeed.speedLimits = changedSpeedLimits;
	return trainWithChangedSpeed;
}
