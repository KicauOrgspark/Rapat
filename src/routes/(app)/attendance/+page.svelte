<script lang="ts">
	import { onMount } from 'svelte';
	import { attendanceStore } from '$lib/features/attendance/attendance.store.svelte';
	import AttendanceCalendar from '$lib/features/attendance/components/AttendanceCalendar.svelte';
	import AttendanceLegend from '$lib/features/attendance/components/AttendanceLegend.svelte';
	import AttendanceStats from '$lib/features/attendance/components/AttendanceStats.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';

	onMount(() => {
		attendanceStore.load();
	});

	function handleMonthChange(date: Date) {
		attendanceStore.setMonth(date);
	}
</script>

<div class="animate-fade-in">
	<div class="px-4 py-6">
		<h1 class="font-display text-display-sm text-ink">Riwayat Absensi</h1>
	</div>

	{#if attendanceStore.isLoading}
		<LoadingSpinner class="py-20" />
	{:else}
		<div class="px-4 space-y-6 pb-4">
			<!-- Stats - dark surface for visual impact -->
			{#if attendanceStore.stats}
				<AttendanceStats stats={attendanceStore.stats} />
			{/if}

			<!-- Calendar - back to cream canvas -->
			<AttendanceCalendar
				days={attendanceStore.calendarDays}
				currentMonth={attendanceStore.currentMonth}
				onMonthChange={handleMonthChange}
			/>

			<!-- Legend -->
			<AttendanceLegend />
		</div>
	{/if}
</div>
