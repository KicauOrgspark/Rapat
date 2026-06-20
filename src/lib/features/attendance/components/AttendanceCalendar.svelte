<script lang="ts">
	import type { CalendarDay } from '../attendance.types';
	import { cn } from '$lib/core/utils/helpers';
	import { format } from 'date-fns';
	import { id } from 'date-fns/locale';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { addMonths } from '../attendance.api';

	interface Props {
		days: CalendarDay[];
		currentMonth: Date;
		onMonthChange: (date: Date) => void;
	}

	let { days, currentMonth, onMonthChange }: Props = $props();

	const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

	const monthLabel = $derived(format(currentMonth, 'MMMM yyyy', { locale: id }));

	function prevMonth() {
		onMonthChange(addMonths(currentMonth, -1));
	}

	function nextMonth() {
		onMonthChange(addMonths(currentMonth, 1));
	}

	function getDayColor(day: CalendarDay): string {
		if (!day.isCurrentMonth) return 'text-muted-soft/50';
		if (!day.status) return 'text-body';

		switch (day.status) {
			case 'hadir':
				return 'bg-success text-on-primary';
			case 'izin':
			case 'sakit':
				return 'bg-warning text-on-primary';
			case 'tidak_hadir':
				return 'bg-error text-on-primary';
			default:
				return 'text-body';
		}
	}

	function isToday(date: Date): boolean {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}
</script>

<div class="rounded-lg bg-surface-card p-4">
	<!-- Month navigation -->
	<div class="flex items-center justify-between mb-4">
		<button
			class="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface-soft transition-colors min-h-[44px] min-w-[44px]"
			onclick={prevMonth}
			aria-label="Bulan sebelumnya"
		>
			<ChevronLeft class="h-5 w-5" />
		</button>
		<h3 class="text-title-md text-ink capitalize">{monthLabel}</h3>
		<button
			class="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface-soft transition-colors min-h-[44px] min-w-[44px]"
			onclick={nextMonth}
			aria-label="Bulan berikutnya"
		>
			<ChevronRight class="h-5 w-5" />
		</button>
	</div>

	<!-- Week day headers -->
	<div class="grid grid-cols-7 gap-1 mb-2">
		{#each weekDays as day}
			<div class="text-center text-caption text-muted font-medium">
				{day}
			</div>
		{/each}
	</div>

	<!-- Calendar days -->
	<div class="grid grid-cols-7 gap-1">
		{#each days as day}
			<div
				class={cn(
					'flex aspect-square items-center justify-center rounded-md text-body-sm transition-colors',
					getDayColor(day),
					isToday(day.date) && 'ring-2 ring-primary ring-offset-1 ring-offset-canvas',
					!day.status && day.isCurrentMonth && 'hover:bg-surface-soft'
				)}
			>
				{day.date.getDate()}
			</div>
		{/each}
	</div>
</div>
