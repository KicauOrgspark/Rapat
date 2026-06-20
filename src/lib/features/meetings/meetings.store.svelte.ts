import type { Meeting } from './meetings.types';
import { getMeetings } from './meetings.api';

let meetings = $state<Meeting[]>([]);
let activeFilter = $state<'mendatang' | 'selesai' | 'semua'>('mendatang');
let isLoading = $state(false);

export const meetingsStore = {
	get meetings() {
		return meetings;
	},
	get activeFilter() {
		return activeFilter;
	},
	get isLoading() {
		return isLoading;
	},

	async load(filter?: 'mendatang' | 'selesai' | 'semua') {
		isLoading = true;
		try {
			meetings = await getMeetings(filter);
		} finally {
			isLoading = false;
		}
	},

	setFilter(filter: 'mendatang' | 'selesai' | 'semua') {
		activeFilter = filter;
		this.load(filter);
	}
};
