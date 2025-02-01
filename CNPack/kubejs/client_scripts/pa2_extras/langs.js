//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Langs
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
//
// This is a script to basically fix some missing localization keys that were not being translated into their actual values. As for some of
// cyclic descriptions added the "Not Official Description" to it because they are not based on any official info and were added more as a funny
// things.
//------------------------------------------------------------------------------------------------------------------------------------------------

// Language entries to fix
// - Add the language localized string as the key, and the actual translation as the value
// - This is English Only, mainly just a quick fix for some annoyances
const langs = {
	// Entities
	"entity.minecraft.villager.ae2:fluix_researcher": "Fluix Researcher",
	"entity.minecraft.villager.advancedperipherals:computer_scientist": "Computer Scientist",
	"entity.minecraft.villager.spelunkers_charm:spelunker": "Spelunker",
	
	// Biomes
	"biome.deeperdarker.echoing_forest": "Echoing Forest",
	"biome.deeperdarker.overcast_columns": "Overcast Columns",
	"biome.deeperdarker.deeplands": "Deeplands",
	
	// Fluids
	"fuild_type.biggerreactors.liquid_uranium": "Liquid Uranium",
	"fluid_type.biggerreactors.liquid_obsidian": "Liquid Obsidian",
	"fluid_type.biggerreactors.steam": "Steam",
	"fluid_type.thermal.latex": "Dirty Latex",
	
	// Blocks
	"block.rftoolsstorage.crafting_manager": "Crafting Manager",
	"block.starbunclemania.source_fluid_block": "Liquefied Source", // Used 'Liquefied' because all other items related to it have the typo.
	"block.thermal.crude_oil_fluid": "Crude Oil",
	"block.thermal.ender_fluid": "Ender Fluid",
	"block.thermal.glowstone_mushroom": "Glowstone Mushroom",
	"block.thermal.gunpowder_mushroom": "Gunpowder Mushroom",
	"block.thermal.redstone_fluid": "Redstone Fluid",
	"block.thermal.redstone_mushroom": "Redstone Mushroom",
	"block.thermal.slime_mushroom": "Slime Mushroom",
	"block.draconicevolution.chaos_crystal_part": "Chaos Crystal Shard",
	
	// Items
	"item.rftoolsutility.teleport_probe": "Teleport Probe",
	
	// Enchantments
	"enchantment.draconicevolution.reaper_enchantment.desc": "Mobs have a chance to drop the corresponding Mob Soul.",
	
	// Game Rules
	"gamerule.brandonscore:allowSignEditing": "Should signs be editable?",
	"gamerule.decorative_blocks:disableThatch": "Should Thatch be disabled?",
	
	// Effects
	"effect.reliquary.pacification": "Pacification",
	
	// Advancements
	"advancements.projectexpansion.yellow_fuel": "Yellow Fuel",
	"advancements.projectexpansion.yellow_fuel.description": "Obtain yellow fuel.",
	"advancements.projectexpansion.yellow_fuel_block": "Yellow Fuel Block",
	"advancements.projectexpansion.yellow_fuel_block.description": "Obtain a yellow fuel block."
};

// Same as above but allows multiple entries to map to the same description
// - Values in the array are objects where:
//   - 'baseEntry' is optional, and it will be used as the base for the entries, replacing '%entry' with the actual entry from the provided list
//   - 'entries' is required, and it will work as above the 'baseEntry' is provided, or it will work as a full localized string for translation
//   - 'description' is required, the translated value to add
//   - 'namespace' is optional, used when the default 'pa2' is not wanted, or another namespace might be required
// - Again mainly fixes for annoyances and only applied for English.
const multiLang = [
	{
		baseEntry: "item.cyclic.crystal_%entry.guide", 
		entries: ["boots", "helmet", "chestplate", "leggings"], 
		description: "A relatively strong armor!\n\n§8Not an official description" 
	},
	{ 
		baseEntry: "item.cyclic.crystal_%entry.guide", 
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "An exceptional strong tool!\n\n§8Not an official description" 
	},
	{ 
		baseEntry: "item.cyclic.emerald_%entry.guide", 
		entries: ["boots", "helmet", "chestplate", "leggings", "pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "Good use for spare emeralds!\n\n§8Not an official description" 
	},
	{ 
		baseEntry: "item.cyclic.copper_%entry.guide", 
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "Better than stone I guess?!\n\n§8Not an official description" 
	},
	{ 
		baseEntry: "item.cyclic.amethyst_%entry.guide", 
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "We gotta use amethyst for something right?\n\n§8Not an official description"
	},
	{
		baseEntry: "item.cyclic.sandstone_%entry.guide",
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"],
		description: "I guess that in the desert this is more common...\n\n§8Not an official description"
	},
	{ 
		baseEntry: "item.cyclic.netherbrick_%entry.guide", 
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "It is not netherite, that is for sure!\n\n§8Not an official description"
	},
	{
		baseEntry: "block.colored_water.%entry_fluid_block",
		entries: [
			"white", "orange", "magenta", "light_blue", "yellow", "lime", "pink", "gray", "light_gray", "cyan", "purple", "blue", "brown", "green", "red", "black",
			
			"condense_white", "condense_orange", "condense_magenta", "condense_light_blue", "condense_yellow", "condense_lime", "condense_pink", "condense_gray", "condense_light_gray",
			"condense_cyan", "condense_purple", "condense_blue", "condense_brown", "condense_green", "condense_red", "condense_black",
			
			"luminous_white", "luminous_orange", "luminous_magenta", "luminous_light_blue", "luminous_yellow", "luminous_lime", "luminous_pink", "luminous_gray", "luminous_light_gray",
			"luminous_cyan", "luminous_purple", "luminous_blue", "luminous_brown", "luminous_green", "luminous_red", "luminous_black",
			
			"luminous_condense_white", "luminous_condense_orange", "luminous_condense_magenta", "luminous_condense_light_blue", "luminous_condense_yellow", "luminous_condense_lime",
			"luminous_condense_pink", "luminous_condense_gray", "luminous_condense_light_gray", "luminous_condense_cyan", "luminous_condense_purple", "luminous_condense_blue",
			"luminous_condense_brown", "luminous_condense_green", "luminous_condense_red", "luminous_condense_black"
		],
		names: [
			"White", "Orange", "Magenta", "Light Blue", "Yellow", "Lime", "Pink", "Gray", "Light Gray", "Cyan", "Purple", "Blue", "Brown", "Green", "Red", "Black",
			
			"Condense White", "Condense Orange", "Condense Magenta", "Condense Light Blue", "Condense Yellow", "Condense Lime", "Condense Pink", "Condense Gray", "Condense Light Gray",
			"Condense Cyan", "Condense Purple", "Condense Blue", "Condense Brown", "Condense Green", "Condense Red", "Condense Black",
			
			"Luminous White", "Luminous Orange", "Luminous Magenta", "Luminous Light Blue", "Luminous Yellow", "Luminous Lime", "Luminous Pink", "Luminous Gray", "Luminous Light Gray",
			"Luminous Cyan", "Luminous Purple", "Luminous Blue", "Luminous Brown", "Luminous Green", "Luminous Red", "Luminous Black",
			
			"Luminous Condense White", "Luminous Condense Orange", "Luminous Condense Magenta", "Luminous Condense Light Blue", "Luminous Condense Yellow", "Luminous Condense Lime",
			"Luminous Condense Pink", "Luminous Condense Gray", "Luminous Condense Light Gray", "Luminous Condense Cyan", "Luminous Condense Purple", "Luminous Condense Blue",
			"Luminous Condense Brown", "Luminous Condense Green", "Luminous Condense Red", "Luminous Condense Black"
		],
		description: "%name Water"
	}
]

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// The language event to apply the fixes in
ClientEvents.lang("zh_cn", event => {
	Object.keys(langs).forEach(key => {
		event.add("pa2", key, langs[key]);
	});
	
	multiLang.forEach(fix => {
		for (let i = 0; i < fix.entries.length; i++)
		{
			let entry = fix.entries[i];
			let ns = fix.namespace ? fix.namespace : "pa2";
			
			if (fix.baseEntry)
				event.add(ns, fix.baseEntry.replace("%entry", entry), fix.names ? fix.description.replace("%name", fix.names[i]) : fix.description);
			else
				event.add(ns, entry, fix.names ? fix.description.replace("%name", fix.names[i]) : fix.description);
		}
	});
});