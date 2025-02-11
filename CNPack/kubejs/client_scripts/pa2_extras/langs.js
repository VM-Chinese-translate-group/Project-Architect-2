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
	"entity.minecraft.villager.ae2:fluix_researcher": "福鲁伊克斯研究学家",
	"entity.minecraft.villager.advancedperipherals:computer_scientist": "计算机学家",
	"entity.minecraft.villager.spelunkers_charm:spelunker": "洞穴探险者",
	
	// Biomes
	"biome.deeperdarker.echoing_forest": "回响森林",
	"biome.deeperdarker.overcast_columns": "阴云柱",
	"biome.deeperdarker.deeplands": "深暗大陆",
	
	// Fluids
	"fuild_type.biggerreactors.liquid_uranium": "熔融铀",
	"fluid_type.biggerreactors.liquid_obsidian": "熔融黑曜石",
	"fluid_type.biggerreactors.steam": "蒸汽",
	"fluid_type.thermal.latex": "Dirty Latex",
	
	// Blocks
	"block.rftoolsstorage.crafting_manager": "合成管理器",
	"block.starbunclemania.source_fluid_block": "熔融态魔源", // Used 'Liquefied' because all other items related to it have the typo.
	"block.thermal.crude_oil_fluid": "石油",
	"block.thermal.ender_fluid": "末影流体",
	"block.thermal.glowstone_mushroom": "萤石菇",
	"block.thermal.gunpowder_mushroom": "火药菇",
	"block.thermal.redstone_fluid": "液态红石",
	"block.thermal.redstone_mushroom": "红石蘑菇",
	"block.thermal.slime_mushroom": "史莱姆菇",
	"block.draconicevolution.chaos_crystal_part": "混沌水晶碎片",
	
	// Items
	"item.rftoolsutility.teleport_probe": "维度传送基点探测器",
	"item.thermal_extra.soul_infused_ingot": "Soul Infused Ingot",
    "item.thermal_extra.shellite_ingot": "Shellite Ingot",
    "item.thermal_extra.twinite_ingot": "Twinite Ingot",
    "item.thermal_extra.dragonsteel_ingot": "Dragonsteel Ingot",
    "item.thermal_extra.abyssal_ingot": "Abyssal Ingot",
    "item.thermal_extra.soul_infused_nugget": "Soul Infused Nugget",
    "item.thermal_extra.shellite_nugget": "Shellite Nugget",
    "item.thermal_extra.twinite_nugget": "Twinite Nugget",
    "item.thermal_extra.dragonsteel_nugget": "Dragonsteel Nugget",
    "item.thermal_extra.abyssal_nugget": "Abyssal Nugget",
    "item.thermal_extra.soul_infused_dust": "Soul Infused Dust",
    "item.thermal_extra.shellite_dust": "Shellite Dust",
    "item.thermal_extra.twinite_dust": "Twinite Dust",
    "item.thermal_extra.dragonsteel_dust": "Dragonsteel Dust",
    "item.thermal_extra.abyssal_dust": "Abyssal Dust",
    "item.thermal.latex_bucket": "Dirty Latex Bucket",
	
	// Enchantments
	"enchantment.draconicevolution.reaper_enchantment.desc": "生物有概率掉落自身的生物灵魂。",
	
	// Game Rules
	"gamerule.brandonscore:allowSignEditing": "Should signs be editable?",
	"gamerule.decorative_blocks:disableThatch": "Should Thatch be disabled?",
	
	// Effects
	"effect.reliquary.pacification": "和平",
	
	// Advancements
	"advancements.projectexpansion.yellow_fuel": "黄色燃料",
	"advancements.projectexpansion.yellow_fuel.description": "获得黄色染料。",
	"advancements.projectexpansion.yellow_fuel_block": "黄色燃料块",
	"advancements.projectexpansion.yellow_fuel_block.description": "获得黄色燃料块",
	// Information
    "block.cyclic.battery_infinite.guide": "Generate an infinite amount of energy\n\n§8Not an official description",
    "item.cyclic.replace_scepter.guide": "The Building Scepter is a powerful tool that comes in three forms - Fill, Place, and Exchange. " +
                                         "For each left clicking on any block will change the size of the area that will be affected. " +
                                         "Sneak-left-clicking will select the block to be placed by the scepter. " +
                                         "Right-click with the scepter to place or exchange blocks from your inventory.",
    "item.cyclic.offset_scepter.guide": "The Building Scepter is a powerful tool that comes in three forms - Fill, Place, and Exchange. " +
                                         "For each left clicking on any block will change the size of the area that will be affected. " +
                                         "Sneak-left-clicking will select the block to be placed by the scepter. " +
                                         "Right-click with the scepter to place or exchange blocks from your inventory.",
};

// Same as above but allows multiple entries to map to the same description
// - Values in the array are objects where:
//   - 'baseEntry' is optional, and it will be used as the base for the entries, replacing '%entry' with the actual entry from the provided list
//   - 'entries' is required, and it will work as above the 'baseEntry' is provided, or it will work as a full localized string for translation
//   - 'description' is required, the translated value to add
//   - 'names' is optional and uses the content to replace '%name' in the description with the name on the same index as the entry
//   - 'namespace' is optional, used when the default 'pa2' is not wanted, or another namespace might be required
// - Again mainly fixes for annoyances and only applied for English.
const multiLang = [
	{
		baseEntry: "item.cyclic.crystal_%entry.guide", 
		entries: ["boots", "helmet", "chestplate", "leggings"], 
		description: "很强大的一套护甲！\n\n§8注意这不是模组官方给出的描述" 
	},
	{ 
		baseEntry: "item.cyclic.crystal_%entry.guide", 
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "极为强大的一套装备！\n\n§8注意这不是模组官方给出的描述" 
	},
	{ 
		baseEntry: "item.cyclic.emerald_%entry.guide", 
		entries: ["boots", "helmet", "chestplate", "leggings", "pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "非常适合拿来糟蹋你的绿宝石！\n\n§8注意这不是模组官方给出的描述" 
	},
	{ 
		baseEntry: "item.cyclic.copper_%entry.guide", 
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "这个属性比我想的还要好一点？！\n\n§8注意这不是模组官方给出的描述" 
	},
	{ 
		baseEntry: "item.cyclic.amethyst_%entry.guide", 
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "咱总得在某个地方拿紫水晶当合成原料不是？\n\n§8注意这不是模组官方给出的描述"
	},
	{
		baseEntry: "item.cyclic.sandstone_%entry.guide",
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"],
		description: "我感觉吧，这个应该在沙漠里头更常见……\n\n§8注意这不是模组官方给出的描述"
	},
	{ 
		baseEntry: "item.cyclic.netherbrick_%entry.guide", 
		entries: ["pickaxe", "axe", "hoe", "shovel", "sword"], 
		description: "这玩意绝对不是下界合金啥的！\n\n§8注意这不是模组官方给出的描述"
	},
	{
		baseEntry: "block.colored_water.%entry_fluid_block",
		entries: [
			"白色", "橙色", "品红色", "淡蓝色", "黄色", "黄绿色", "粉色", "灰色", "淡灰色", "青色", "紫色", "蓝色", "棕色", "绿色", "红色", "黑色",
			
			"加深的白色", "加深的橙色", "加深的品红色", "加深的浅蓝色", "加深的黄色", "加深的黄绿色", "加深的粉色", "加深的灰色", "加深的淡灰色",
			"加深的青色", "加深的紫色", "加深的蓝色", "加深的棕色", "加深的绿色", "加深的红", "加深的黑色",
			
			"发光的白色", "发光的橙色", "发光的品红色", "发光的浅蓝色", "发光的黄色", "发光的黄绿色", "发光的粉色", "发光的灰色", "发光的淡灰色",
			"发光的青色", "发光的紫色", "发光的蓝色", "发光的棕色", "发光的绿色", "发光的红", "发光的黑色",
			
			"发光的加深的白色", "发光的加深的橙色", "发光的加深的品红色", "发光的加深的浅蓝色", "发光的加深的黄色", "发光的加深的黄绿色",
			"发光的加深的粉色", "发光的加深的灰色", "发光的加深的淡灰色", "发光的加深的青色", "发光的加深的紫色", "发光的加深的蓝色",
			"发光的加深的棕色", "发光的加深的绿色", "发光的加深的红", "发光的加深的黑色"
		],
		names: [
			"白色", "橙色", "品红色", "淡蓝色", "黄色", "黄绿色", "粉色", "灰色", "淡灰色", "青色", "紫色", "蓝色", "棕色", "绿色", "红色", "黑色",
			
			"加深的白色", "加深的橙色", "加深的品红色", "加深的浅蓝色", "加深的黄色", "加深的黄绿色", "加深的粉色", "加深的灰色", "加深的淡灰色",
			"加深的青色", "加深的紫色", "加深的蓝色", "加深的棕色", "加深的绿色", "加深的红", "加深的黑色",
			
			"发光的白色", "发光的橙色", "发光的品红色", "发光的浅蓝色", "发光的黄色", "发光的黄绿色", "发光的粉色", "发光的灰色", "发光的淡灰色",
			"发光的青色", "发光的紫色", "发光的蓝色", "发光的棕色", "发光的绿色", "发光的红色", "发光的黑色",
			
			"发光的加深白色", "发光的加深的橙色", "发光的加深的品红色", "发光的加深的浅蓝色", "发光的加深的黄色", "发光的加深的黄绿色",
			"发光的加深的粉色", "发光的加深的灰色", "发光的加深的淡灰色", "发光的加深的青色", "发光的加深的紫色", "发光的加深的蓝色",
			"发光的加深的棕色", "发光的加深的绿色", "发光的加深的红", "发光的加深的黑色"
		],
		description: "%name的水"
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