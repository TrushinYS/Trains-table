export interface SpeedLimit {
	name: string;
	speedLimit: number;
	id: number;
}

export interface Train {
	name: string;
	description: string;
	speedLimits: SpeedLimit[];
	id: number;
}

export type CheckedTrain = Train | null;

export interface AppContext {
	trains: Train[];
	setTrains: (state: Train[]) => void;
	selectedTrain: CheckedTrain;
	setSelectedTrain: (state: CheckedTrain) => void;
	isSpeedLimitChanged: boolean;
	setIsSpeedLimitChanged: (state: boolean) => void;
}
