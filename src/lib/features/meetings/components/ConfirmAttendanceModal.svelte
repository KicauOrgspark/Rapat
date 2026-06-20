<script lang="ts">
	import type { AttendanceStatusType } from '$lib/core/constants/status';
	import { attendanceStatusLabels } from '$lib/core/constants/status';
	import Modal from '$lib/components/ui/Modal.svelte';

	interface Props {
		open: boolean;
		onOpenChange: (open: boolean) => void;
		status: AttendanceStatusType;
		onConfirm: () => void;
		isSubmitting?: boolean;
	}

	let {
		open = $bindable(false),
		onOpenChange,
		status,
		onConfirm,
		isSubmitting = false
	}: Props = $props();

	const title = $derived(`Konfirmasi: ${attendanceStatusLabels[status]}`);

	const description = $derived(() => {
		if (status === 'hadir') return 'Anda akan mengonfirmasi kehadiran di rapat ini.';
		if (status === 'izin') return 'Anda akan mengajukan izin untuk tidak menghadiri rapat ini.';
		if (status === 'tidak_hadir') return 'Apakah Anda yakin tidak bisa menghadiri rapat ini?';
		return '';
	});
</script>

<Modal
	{open}
	{onOpenChange}
	{title}
	description={description()}
	confirmText={status === 'hadir'
		? 'Ya, Hadir'
		: status === 'izin'
			? 'Kirim Izin'
			: 'Ya, Tidak Bisa Hadir'}
	variant={status === 'tidak_hadir' ? 'danger' : 'default'}
	{onConfirm}
>
	{#if isSubmitting}
		<p class="text-body-sm text-muted">Memproses konfirmasi...</p>
	{/if}
</Modal>
