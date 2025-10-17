<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import type { LayerGroup, Map } from 'leaflet';

	type BoundaryLayerConfig = {
		id: string;
		name: string;
		path: string;
		color: string;
	};

	const boundaryLayers: BoundaryLayerConfig[] = [
		{
			id: 'alberta',
			name: 'Alberta',
			path: '/data/alberta_border.geojson',
			color: '#7C93FE'
		},
		{
			id: 'iowa',
			name: 'Iowa',
			path: '/data/iowa_border.geojson',
			color: '#FB8B24'
		},
		{
			id: 'maine',
			name: 'Maine',
			path: '/data/maine_border.geojson',
			color: '#2A9D8F'
		}
	];

	let mapContainer: HTMLDivElement | null = null;
	let mapInstance: Map | null = null;
	let overlays: LayerGroup | null = null;

	onMount(async () => {
		if (!mapContainer) return;

		const Leaflet = await import('leaflet');
		const { map: createMap, tileLayer, layerGroup, geoJSON, latLngBounds } = Leaflet;

		mapInstance = createMap(mapContainer, {
			center: [53, -95],
			zoom: 4,
			minZoom: 2,
			maxZoom: 18
		});

		tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(mapInstance);

		overlays = layerGroup().addTo(mapInstance);

		const allBounds = latLngBounds();

		await Promise.all(
			boundaryLayers.map(async (layer) => {
				try {
					const response = await fetch(`${base}${layer.path}`);
					if (!response.ok) throw new Error(`Failed to fetch ${layer.name}`);

					const data = await response.json();
					const geoLayer = geoJSON(data, {
						style: () => ({
							color: layer.color,
							weight: 2,
							fillOpacity: 0.2,
							opacity: 1
						})
					});

					overlays?.addLayer(geoLayer);

					const layerBounds = geoLayer.getBounds();
					if (layerBounds.isValid()) {
						allBounds.extend(layerBounds);
					}
				} catch (error) {
					console.error(`Layer load failed: ${layer.id}`, error);
				}
			})
		);

		if (allBounds.isValid()) {
			mapInstance.fitBounds(allBounds, { padding: [40, 40] });
		}

		return () => {
			overlays?.clearLayers();
			overlays = null;
			mapInstance?.remove();
			mapInstance = null;
		};
	});
</script>

<div class="flex h-full min-h-screen w-full">
	<div bind:this={mapContainer} class="h-full min-h-screen w-full"></div>
</div>
