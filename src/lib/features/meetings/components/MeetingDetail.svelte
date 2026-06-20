<script lang="ts">
	import type { Meeting } from '../meetings.types';
	import type { AttendanceStatusType } from '$lib/core/constants/status';
	import { formatFullDate, formatTimeRange } from '$lib/core/utils/date';
	import { attendanceStatusLabels } from '$lib/core/constants/status';
	import { MapPin, Clock, CalendarDays, Users, User } from 'lucide-svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ConfirmAttendanceModal from './ConfirmAttendanceModal.svelte';
	import { toastStore } from '$lib/components/ui/toast.store.svelte';
	import { confirmAttendance } from '../meetings.api';

	interface Props {
		meeting: Meeting;
	}

	let { meeting }: Props = $props();

	let modalOpen = $state(false);
	let confirmStatus = $state<AttendanceStatusType>('hadir');
	let isSubmitting = $state(false);

	const currentAttendee = $derived(meeting.attendees.find((a) => a.userId === 'usr_001'));

	const canConfirm = $derived(
		meeting.status === 'mendatang' &&
			(!currentAttendee || currentAttendee.status === 'belum_konfirmasi')
	);

	function openConfirmModal(status: AttendanceStatusType) {
		confirmStatus = status;
		modalOpen = true;
	}

	async function handleConfirm() {
		isSubmitting = true;
		try {
			await confirmAttendance(meeting.id, confirmStatus);

			// Update local state
			if (currentAttendee) {
				currentAttendee.status = confirmStatus;
			}

			const statusLabel = attendanceStatusLabels[confirmStatus];
			toastStore.show(`Konfirmasi kehadiran: ${statusLabel}`, 'success');
			modalOpen = false;
		} catch {
			toastStore.show('Gagal mengkonfirmasi kehadiran', 'error');
		} finally {
			isSubmitting = false;
		}
	}

	function getAttendeeBadgeVariant(status: string): 'success' | 'warning' | 'error' | 'default' {
		if (status === 'hadir') return 'success';
		if (status === 'izin' || status === 'sakit') return 'warning';
		if (status === 'tidak_hadir') return 'error';
		return 'default';
	}
</script>

<div class="animate-fade-in">
	<!-- Header -->
	<div class="px-4 py-6">
		<h1 class="font-display text-display-sm text-ink">{meeting.title}</h1>
	</div>

	<!-- Meeting Info -->
	<div class="mx-4 rounded-lg bg-surface-card p-4">
		<div class="space-y-3">
			<div class="flex items-center gap-3 text-body-md text-body">
				<CalendarDays class="h-5 w-5 text-primary shrink-0" />
				<span>{formatFullDate(meeting.date)}</span>
			</div>
			<div class="flex items-center gap-3 text-body-md text-body">
				<Clock class="h-5 w-5 text-primary shrink-0" />
				<span>{formatTimeRange(meeting.startTime, meeting.endTime)}</span>
			</div>
			<div class="flex items-center gap-3 text-body-md text-body">
				<MapPin class="h-5 w-5 text-primary shrink-0" />
				<span>{meeting.location}</span>
			</div>
			<div class="flex items-center gap-3 text-body-md text-body">
				<User class="h-5 w-5 text-primary shrink-0" />
				<span>{meeting.organizer}</span>
			</div>
		</div>
	</div>

	<!-- Description -->
	<div class="px-4 py-6">
		<h2 class="text-title-md text-ink">Deskripsi</h2>
		<p class="mt-2 text-body-md text-body">{meeting.description}</p>
	</div>

	<!-- Agenda -->
	<div class="px-4 py-4">
		<h2 class="text-title-md text-ink">Agenda</h2>
		<ol class="mt-3 space-y-2">
			{#each meeting.agenda as item, i}
				<li class="flex gap-3">
					<span
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-on-primary"
					>
						{i + 1}
					</span>
					<span class="text-body-md text-body pt-0.5">{item}</span>
				</li>
			{/each}
		</ol>
	</div>

	<!-- Attendees -->
	<div class="px-4 py-4">
		<div class="flex items-center gap-2">
			<Users class="h-5 w-5 text-primary" />
			<h2 class="text-title-md text-ink">Peserta ({meeting.attendees.length})</h2>
		</div>
		<div class="mt-3 space-y-2">
			{#each meeting.attendees as attendee}
				<div class="flex items-center justify-between rounded-md bg-surface-card px-3 py-2.5">
					<span class="text-body-md text-ink">{attendee.name}</span>
					<Badge variant={getAttendeeBadgeVariant(attendee.status)}>
						{attendanceStatusLabels[attendee.status]}
					</Badge>
				</div>
			{/each}
		</div>
	</div>

	<!-- Confirmation Actions -->
	{#if canConfirm}
		<div class="sticky bottom-20 border-t border-hairline bg-canvas px-4 py-4">
			<p class="mb-3 text-center text-body-sm text-muted">Konfirmasi kehadiran Anda</p>
			<div class="flex gap-2">
				<Button class="flex-1" onclick={() => openConfirmModal('hadir')}>Hadir</Button>
				<Button class="flex-1" variant="secondary" onclick={() => openConfirmModal('izin')}>
					Izin
				</Button>
				<Button class="flex-1" variant="ghost" onclick={() => openConfirmModal('tidak_hadir')}>
					Tidak Bisa
				</Button>
			</div>
		</div>
	{:else if currentAttendee && currentAttendee.status !== 'belum_konfirmasi'}
		<div class="mx-4 mb-4 rounded-lg bg-surface-card p-4 text-center">
			<p class="text-body-sm text-muted">Status kehadiran Anda:</p>
			<Badge class="mt-2" variant={getAttendeeBadgeVariant(currentAttendee.status)}>
				{attendanceStatusLabels[currentAttendee.status]}
			</Badge>
		</div>
	{/if}
</div>

<ConfirmAttendanceModal
	bind:open={modalOpen}
	onOpenChange={(v: boolean) => (modalOpen = v)}
	status={confirmStatus}
	onConfirm={handleConfirm}
	{isSubmitting}
/>
