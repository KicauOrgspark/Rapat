<script lang="ts">
	import Tabs from '$lib/components/ui/Tabs.svelte';

	interface Props {
		activeTab: 'mendatang' | 'selesai' | 'semua';
		onTabChange: (value: string) => void;
	}

	let { activeTab = $bindable(), onTabChange }: Props = $props();

	const tabs = [
		{ label: 'Mendatang', value: 'mendatang' },
		{ label: 'Selesai', value: 'selesai' },
		{ label: 'Semua', value: 'semua' }
	];
</script>

<Tabs {tabs} bind:activeTab {onTabChange} />
