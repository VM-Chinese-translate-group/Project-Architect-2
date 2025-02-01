//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Cable Camo (Client)
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
//
// Quick script that pairs with the server side of cable camo to add tooltips to items
//------------------------------------------------------------------------------------------------------------------------------------------------

// Tooltips to add
// - All kubejs normal things are supported for the tooltips, so Text.of will work.
// - 'tips' field is for the tooltips, can be a single string or an array.
// - ´items´ field can take any ingredient except for tags, it can be a single string or an array.
const tooltipToItem2 = [
	{
		// Framed Cubes
		items: "framedblocks:framed_cube",
		tips: ["tooltip.framedblocks.framed_cube.1", "tooltip.framedblocks.framed_cube.2", "tooltip.framedblocks.framed_cube.3"]
	},
	{
		// Wrenches
		items: "#forge:wrenches",
		tips: ["tooltip.#forge.wrenches.1", "tooltip.#forge.wrenches.2"]
	}
];

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// The tooltip event
ItemEvents.tooltip(event => {
	// General tooltips
	tooltipToItem2.forEach(entry => {
    	event.add(entry.items, entry.tips.map(tip => Text.translate(tip)));
	})
});