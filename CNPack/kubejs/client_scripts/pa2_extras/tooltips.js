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
		tips: ["tooltip.minecraft.flint_and_steel.1", "tooltip.minecraft.flint_and_steel.2"]
	},
	{
		// Tips for dimensions
		items: "rftoolsdim:realized_dimension_tab",
		tips: ["tooltip.rftoolsdim.realized_dimension_tab.1"]
	},
	{
		// Advanced Wireless Transmitter - Incompatibilities
		items: "rebornstorage:advanced_wireless_transmitter",
		tips: ["tooltip.rebornstorage.advanced_wireless_transmitter.1"]
	},
	{
		// RS Controller tips
		items: ["refinedstorage:controller", /refinedstorage:.+_controller/],
		tips: ["tooltip.refinedstorage.controller.1"]
	},
	{
		// Extra Info for Rainbow furnaces
		items: "ironfurnaces:million_furnace",
		tips: ["tooltip.ironfurnaces.million_furnace.1"]
	},
	{
		// Sneak + Break info
		items: ["projecte:dm_pedestal", /projecte:.+_matter_block/, /projectexpansion:.+_matter_block/],
		tips: ["tooltip.projecte.dm_pedestal.1"]
	},
	{
		// EMC Links + Interface
		items: [/projectexpansion:.+_emc_link/, "projectexpansion:transmutation_interface"],
		tips: ["tooltip.projectexpansion.emc_link.1", "tooltip.projectexpansion.emc_link.2"]
	},
	{
		// EMC Links
		items: /projectexpansion:.+_emc_link/,
		tips: ["tooltip.projectexpansion.emc_link.3"]
	},
	{
		// EMC Links
		items: "projectexpansion:transmutation_interface",
		tips: ["tooltip.projectexpansion.transmutation_interface.1"]
	},
	{
		// Awakened Draconium joke to make people aware of the Dust's EMC
		items: "draconicevolution:awakened_draconium_block",
		tips: ["tooltip.draconicevolution.awakened_draconium_block.1"]
	},
	{
		// Functional Storage upgrades can be cycled with right click now
		items:  ["functionalstorage:puller_upgrade", "functionalstorage:pusher_upgrade", "functionalstorage:collector_upgrade"],
		tips: ["tooltip.functionalstorage.puller_upgrade.1"]
	},
	{
		// Bee Queen Egg
		items: ["the_bumblezone:bee_queen_spawn_egg"],
		tips: ["tooltip.the_bumblezone.bee_queen_spawn_egg.1", "tooltip.the_bumblezone.bee_queen_spawn_egg.2"]
	},
	{
		// EMC Stars
		items: [/projecte:klein_star_.+/, /projectexpansion:(magnum|colossal|gargantuan)_star_.+/],
		tips: ["tooltip.projecte.klein_star.1"]
	},
	{
		// Items that require EMC Stars
		items: ["projecte:swiftwolf_rending_gale", "projecte:ignition_ring", "projecte:body_stone", "projecte:soul_stone", "projecte:life_stone", "projecte:volcanite_amulet"],
		tips: ["tooltip.projecte.swiftwolf_rending_gale.1", "tooltip.projecte.swiftwolf_rending_gale.2"]
	},
	{
		// Archium to the Queen
		items: "kubejs:archium",
		tips: ["tooltip.kubejs.archium.1"]
	},
	{
		// Building Gadgets bug warning
		items: ["buildinggadgets2:gadget_copy_paste", "buildinggadgets2:gadget_cut_paste"],
		tips: ["tooltip.buildinggadgets2.gadget_copy_paste.1"]
	},
	{
		// Absorbers
		items: /rftoolsdim:.+_absorber/,
		tips: ["tooltip.rftoolsdim.absorber.1"]
	},
	{
		// Fireworks
		items: ["minecraft:firework_rocket", "minecraft:firework_star"],
		tips: ["tooltip.minecraft.firework_rocket.1"]
	},
	{
		// Fireworks
		items: "minecraft:firework_rocket",
		tips: ["tooltip.minecraft.firework_rocket.1"]
	},
	{
		// Sophisticated Upgrades
		items: ["sophisticatedstorage:crafting_upgrade", "sophisticatedbackpacks:crafting_upgrade"],
		tips: ["tooltip.sophisticatedstorage.crafting_upgrade.1"]
	},
	{
		// AE2 Cables
		items: /ae2:.+_cable/,
		tips: ["tooltip.ae2.cable.1"]
	},
	{
		// Mek Cables
		items: /mekanism:.+_(pipe|cable|tube|transporter|conductor)/,
		tips: "tooltip.mekanism.pipe.1"
	},
	{
		// Trader
		items: ["easy_villagers:trader", "easy_villagers:auto_trader"],
		tips: ["tooltip.easy_villagers.trader.1"]
	},
	{
		// Camo Upgrade - MR
		items: ["modularrouters:camouflage_upgrade"],
		tips: ["tooltip.modularrouters.camouflage_upgrade.1"]
	},
	{
		// Void Motor
		items: "createutilities:void_motor",
		tips: ["tooltip.createutilities.void_motor.1"]
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
    	event.add(entry.items, entry.tips.map(tip => Text.translate(tip)));
    });

	// Fix PExp tooltips
    if (fixPExpTooltips) {
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