//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Tooltips
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
//
// Adds some tooltips to items in order to add extra explanation to them, as it is complicated to figure it out sometimes, also warns about
// potential bugs.
//------------------------------------------------------------------------------------------------------------------------------------------------

// Fixes ProjectExpansion wiki Tooltips, changes the tooltips to be more intuitive
const fixPExpTooltips = true;

// Tooltips to add
// - All kubejs normal things are supported for the tooltips, so Text.of will work.
// - 'tips' field is for the tooltips, can be a single string or an array.
// - ´items´ field can take any ingredient except for tags, it can be a single string or an array.
const tooltipToItem = [
	{
		// Dyeable fire information
		items: "minecraft:flint_and_steel",
		tips: ["§eYou can make colored fire by right-clicking the fire with a dye", "§8§oColored fire does not make sound, cause damage, or emit particles"]
	},
	{
		// Tips for dimensions
		items: "rftoolsdim:realized_dimension_tab",
		tips: "§eYou can delete a dimension in the Dimension Editor, using a TNT"
	},
	{
		// Advanced Wireless Transmitter - Incompatibilities
		items: "rebornstorage:advanced_wireless_transmitter",
		tips: "§cDoes not work with Infinity Range Booster, and it doesn't seem to work with Dimension Card either"
	},
	{
		// RS Controller tips
		items: ["refinedstorage:controller", /refinedstorage:.+_controller/],
		tips: "§eIf you have issues with accessing RS from Wireless sources or others, try changing the controller to another chunk"
	},
	{
		// Extra Info for Rainbow furnaces
		items: "ironfurnaces:million_furnace",
		tips: "§eWill smelt an entire stack in one go!"
	},
	{
		// Sneak + Break info
		items: ["projecte:dm_pedestal", /projecte:.+_matter_block/, /projectexpansion:.+_matter_block/],
		tips: "§eYou can break the block while sneaking to break it without specific tools"
	},
	{
		// EMC Links + Interface
		items: [/projectexpansion:.+_emc_link/, "projectexpansion:transmutation_interface"],
		tips: ["", "§6Turns off when the player is offline. This is intended by the mod, use a chest or similar as a buffer!"]
	},
	{
		// EMC Links
		items: /projectexpansion:.+_emc_link/,
		tips: "§eSneak+Right-click with a different EMC link to replace it (the filter is preserved)"
	},
	{
		// EMC Links
		items: "projectexpansion:transmutation_interface",
		tips: "§eSneak+Right-click with an item will learn it, but won't consume it (does not work with Tome of Knowledge)"
	},
	{
		// Awakened Draconium joke to make people aware of the Dust's EMC
		items: "draconicevolution:awakened_draconium_block",
		tips: "§eDid you know that the ingots from this block are highly grindeable?"
	},
	{
		// Functional Storage upgrades can be cycled with right click now
		items:  ["functionalstorage:puller_upgrade", "functionalstorage:pusher_upgrade", "functionalstorage:collector_upgrade"],
		tips: "§7Right clicking the item in hand, without a target, will cycle the entire stack"
	},
	{
		// Bee Queen Egg
		items: ["the_bumblezone:bee_queen_spawn_egg"],
		tips: ["", "§bQueen bees love §4§lArchimeat§b!"]
	},
	{
		// EMC Stars
		items: [/projecte:klein_star_.+/, /projectexpansion:(magnum|colossal|gargantuan)_star_.+/],
		tips: "§eYou can charge your star in the left side of your transmutation table"
	},
	{
		// Items that require EMC Stars
		items: ["projecte:swiftwolf_rending_gale", "projecte:ignition_ring", "projecte:body_stone", "projecte:soul_stone", "projecte:life_stone", "projecte:volcanite_amulet"],
		tips: ["", "§eRequires a charged EMC star in your inventory (or curios) to power this item"]
	},
	{
		// Archium to the Queen
		items: "kubejs:archium",
		tips: "§3Something worth of royalty!"
	},
	{
		// Building Gadgets bug warning
		items: ["buildinggadgets2:gadget_copy_paste", "buildinggadgets2:gadget_cut_paste"],
		tips: "§cUsing this with tile entities can cause crashes! (Ender Storage blocks, some Create things, etc.)"
	},
	{
		// Absorbers
		items: /rftoolsdim:.+_absorber/,
		tips: "§eIf the absorber doesn't work the target might be disabled, check the dimlet on the workbench"
	},
	{
		// Fireworks
		items: ["minecraft:firework_rocket", "minecraft:firework_star"],
		tips: "§eRecipe might not appear in JEI, look it up in MC's Wiki, the vanilla one works"
	},
	{
		// Fireworks
		items: "minecraft:firework_rocket",
		tips: "§eThere is a custom recipe added to facilitate autocrafting with different systems"
	},
	{
		// Sophisticated Upgrades
		items: ["sophisticatedstorage:crafting_upgrade", "sophisticatedbackpacks:crafting_upgrade"],
		tips: "§cSome crafts might cause you to crash when using the upgrade, use with caution"
	},
	{
		// AE2 Cables
		items: /ae2:.+_cable/,
		tips: "§eCan §bsneak + right-click§e on another cable to replace them. Dense only works with other dense."
	},
	{
		// Mek Cables
		items: /mekanism:.+_(pipe|cable|tube|transporter|conductor)/,
		tips: "§eCan §bsneak + right-click§e on another cable of the same type, to replace it."
	},
	{
		// Trader
		items: ["easy_villagers:trader", "easy_villagers:auto_trader"],
		tips: "§eRight click with the workstation block to add it to the block!"
	},
	{
		// Camo Upgrade - MR
		items: ["modularrouters:camouflage_upgrade"],
		tips: "§cUsing this with any cable related thing from AE2 will make the router invisible and inaccessible"
	},
	{
		// Void Motor
		items: "createutilities:void_motor",
		tips: "§cThis can sometimes cause TPS and/or Lag issues, use carefully"
	}
];

// Fixes the name of some items
// - Key is the id of the item, value is the name to set to (using %name will reuse the original name)
const nameFixer = {
	"jaopca:storage_blocks.soul_sand": "§6%name Dust",
	"jaopca:storage_blocks.obsidian": "Block of Powdered Obsidian"
}

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// The tooltip event
ItemEvents.tooltip(event => {
	// General tooltips
	tooltipToItem.forEach(entry => {
		event.add(entry.items, entry.tips);
	});

	// Fix PExp tooltips
	if (fixPExpTooltips)
	{
		event.addAdvanced(/projectexpansion:.+/, (item, adv, text) => {
			let index = text.indexOf(text.find(test => test.getString().startsWith("See the wiki")));
			if (index === -1)
				return;

			text.set(index, Text.of("More info at §b§nhttps://github.com/DonovanDMC/ProjectExpansion/wiki").yellow());
		});
	};
	
	// Fixes incorrect names
	Object.keys(nameFixer).forEach(item => {
		event.addAdvanced(item, (stack, adv, text) => text.set(0, nameFixer[item].replace("%name", text.get(0).getString())));
	});
});