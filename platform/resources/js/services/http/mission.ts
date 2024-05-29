import z from 'zod';

import instance from '@/services/http/instance';
import { MissionSchema } from '@/types/Mission';

const getMissions = async () => {
	const response = await instance.get(`missions`);

	const data = await response.json();

	const missionResponse = z
		.object({ data: MissionSchema.array() })
		.safeParse(data);

	if (missionResponse.success) {
		return Promise.resolve(missionResponse.data);
	}
	return Promise.reject({ data: 'Invalid data' });
};

export { getMissions };
