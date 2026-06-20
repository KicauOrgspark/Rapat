<script lang="ts">
	const items = [
		{ color: 'bg-success', label: 'Hadir' },
		{ color: 'bg-warning', label: 'Izin/Sakit' },
		{ color: 'bg-error', label: 'Tidak Hadir' }
	];
</script>

<div class="flex flex-wrap items-center justify-center gap-4 py-4">
	{#each items as item (item.label)}
		<div class="flex items-center gap-2">
			<div class="h-3 w-3 rounded-full {item.color}"></div>
			<span class="text-body-sm text-muted">{item.label}</span>
		</div>
	{/each}
</div>
