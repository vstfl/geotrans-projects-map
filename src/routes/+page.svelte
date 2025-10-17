<script lang="ts">
	import { onMount } from 'svelte';
	import type { Map } from 'leaflet';

	let mapContainer: HTMLDivElement | null = null;
	let mapInstance: Map | null = null;

	onMount(async () => {
		if (!mapContainer) return;

		const { map: createMap, tileLayer } = await import('leaflet');

		mapInstance = createMap(mapContainer, {
			center: [20, 0],
			zoom: 2,
			minZoom: 2,
			maxZoom: 18
		});

		tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(mapInstance);

		return () => {
			mapInstance?.remove();
			mapInstance = null;
		};
	});
</script>

<div class="flex h-full min-h-screen w-full">
	<div bind:this={mapContainer} class="h-full min-h-screen w-full"></div>
</div>
