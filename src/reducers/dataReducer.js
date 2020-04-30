import { CHANGE_LANGUAGE, CHANGE_REGION } from '@actions/types';

const initialState = {
	selectedRegion: {
		iso: "IDN",
		name: "Indonesia"
	}
}

const dataReducer = (state = initialState, action) => {
	switch ( action.type ) {
		case CHANGE_REGION:
		return {
			...state,
			selectedRegion: action.data
		}
		default:
			return state;
	}
}

export default dataReducer;