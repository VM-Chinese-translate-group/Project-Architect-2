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
		tips: ["§eYou can sneak right-click on certain cables (that offer no facades/covers) to add a frame cover", "§eSneak right-click with a block to change the appearance", "§eUse any wrench item to remove with sneak right-click"]
	},
	{
		// Wrenches
		items: "#forge:wrenches",
		tips: ["§eSneak left-click to toggle the frame of framed cables on/off", "§eSneak right-click to make a frame from a framed cable pop off"]
	}
];

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// The tooltip event
ItemEvents.tooltip(event => {
	// General tooltips
	tooltipToItem2.forEach(entry => {
		event.add(entry.items, entry.tips);
	})
});