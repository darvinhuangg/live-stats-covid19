import { CHANGE_REGION } from '@actions/types';

export const selectedRegion = (data) => ({
	type: CHANGE_REGION,
	data: data
})