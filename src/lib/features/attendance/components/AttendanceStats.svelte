<script lang="ts">
	import type { AttendanceStats } from '../attendance.types';

	interface Props {
		stats: AttendanceStats;
	}

	let { stats }: Props = $props();
</script>

<div class="rounded-lg bg-surface-dark p-5 text-on-dark">
	<!-- Percentage highlight -->
	<div class="text-center mb-5">
		<p class="font-display text-display-md text-on-dark">{stats.percentage}%</p>
		<p class="mt-1 text-body-sm text-on-dark-soft">Tingkat Kehadiran</p>
	</div>

	<!-- Stats grid -->
	<div class="grid grid-cols-2 gap-3">
		<div class="rounded-md bg-surface-dark-elevated p-3 text-center">
			<p class="text-title-lg text-on-dark">{stats.totalMeetings}</p>
			<p class="mt-0.5 text-caption text-on-dark-soft">Total Rapat</p>
		</div>
		<div class="rounded-md bg-surface-dark-elevated p-3 text-center">
			<p class="text-title-lg text-success">{stats.hadir}</p>
			<p class="mt-0.5 text-caption text-on-dark-soft">Hadir</p>
		</div>
		<div class="rounded-md bg-surface-dark-elevated p-3 text-center">
			<p class="text-title-lg text-warning">{stats.izin + stats.sakit}</p>
			<p class="mt-0.5 text-caption text-on-dark-soft">Izin/Sakit</p>
		</div>
		<div class="rounded-md bg-surface-dark-elevated p-3 text-center">
			<p class="text-title-lg text-error">{stats.tidakHadir}</p>
			<p class="mt-0.5 text-caption text-on-dark-soft">Tidak Hadir</p>
		</div>
	</div>
</div>
