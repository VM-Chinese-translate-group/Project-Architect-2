//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Blocks
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
//
// Adds extra custom blocks, mainly to fill in the gaps or add decoration options.
//------------------------------------------------------------------------------------------------------------------------------------------------

// Blocks to add as compressed blocks (add to this list to make the 1x to 9x be generated exactly like the AllTheCompressed ones)
// - 'base' is the item id of the base block
// - 'name' is the localized id for the item name
// - 'texture' is the texture of the base block (used to be overlaid with the compressed frame)
// - 'modelPrefix' is the prefix for the auto gen models
// - 'tags' the tags to use for the block
//
// NOTE: Added to global to allow the recipes script to also read this.
global.compressedBlocks = [
	// The following ones are from AllTheCompressed but they don't get added unless ATO is present which sucks, this fixes it
	{
		base: "thermal:invar_block",
		name: "殷钢块",
		texture: "thermal:block/invar_block",
		modelPrefix: "invar",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:silver_block",
		name: "银块",
		texture: "thermal:block/silver_block",
		modelPrefix: "silver",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:tin_block",
		name: "锡块",
		texture: "thermal:block/tin_block",
		modelPrefix: "tin",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:lumium_block",
		name: "流明块",
		texture: "thermal:block/lumium_block",
		modelPrefix: "lumium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:steel_block",
		name: "钢块",
		texture: "thermal:block/steel_block",
		modelPrefix: "steel",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:ruby_block",
		name: "红宝石块",
		texture: "thermal:block/ruby_block",
		modelPrefix: "ruby",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:enderium_block",
		name: "末影块",
		texture: "thermal:block/enderium_block",
		modelPrefix: "enderium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:lead_block",
		name: "铅块",
		texture: "thermal:block/lead_block",
		modelPrefix: "lead",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:bronze_block",
		name: "青铜块",
		texture: "thermal:block/bronze_block",
		modelPrefix: "bronze",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:sapphire_block",
		name: "蓝宝石块",
		texture: "thermal:block/sapphire_block",
		modelPrefix: "sapphire",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:signalum_block",
		name: "信素块",
		texture: "thermal:block/signalum_block",
		modelPrefix: "signalum",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:constantan_block",
		name: "康铜块",
		texture: "thermal:block/constantan_block",
		modelPrefix: "constantan",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:nickel_block",
		name: "镍块",
		texture: "thermal:block/nickel_block",
		modelPrefix: "nickel",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:electrum_block",
		name: "琥珀金块",
		texture: "thermal:block/electrum_block",
		modelPrefix: "electrum",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "mekanism:block_uranium",
		name: "铀块",
		texture: "mekanism:block/block_uranium",
		modelPrefix: "uranium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "mekanism:block_osmium",
		name: "锇块",
		texture: "mekanism:block/block_osmium",
		modelPrefix: "osmium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:zinc_block",
		name: "锌块",
		texture: "create:block/zinc_block",
		modelPrefix: "zinc",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "kubejs:blaze_block",
		name: "烈焰块",
		texture: "kubejs:block/blaze_block",
		modelPrefix: "blaze",
		tags: ["minecraft:mineable/pickaxe"]
	},
	
	// Some blocks that made sense, and can be used to make end-game challenges
	{
		base: "ars_nouveau:source_gem_block",
		name: "魔源宝石块",
		texture: "ars_nouveau:block/source_gem_block",
		modelPrefix: "source_gem",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "draconicevolution:awakened_draconium_block",
		name: "觉醒龙块",
		texture: "draconicevolution:block/awakened_draconium_block_side",
		modelPrefix: "awakened_draconium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "draconicevolution:draconium_block",
		name: "龙块",
		texture: "draconicevolution:block/draconium_block",
		modelPrefix: "draconium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:andesite_alloy_block",
		name: "安山合金块",
		texture: "create:block/andesite_block",
		modelPrefix: "andesite_alloy",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:brass_block",
		name: "黄铜块",
		texture: "create:block/brass_block",
		modelPrefix: "brass",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:experience_block",
		name: "经验块",
		texture: "create:block/experience_block",
		modelPrefix: "experience",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:industrial_iron_block",
		name: "工业铁块",
		texture: "create:block/industrial_iron_block",
		modelPrefix: "industrial_iron",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "refinedstorage:quartz_enriched_iron_block",
		name: "富石英铁块",
		texture: "refinedstorage:block/quartz_enriched_iron_block",
		modelPrefix: "quartz_enriched_iron",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:rose_quartz_block",
		name: "玫瑰石英块",
		texture: "create:block/palettes/rose_quartz_side",
		modelPrefix: "rose_quartz",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "ae2:quartz_block",
		name: "赛特斯石英块",
		texture: "ae2:block/quartz_block",
		modelPrefix: "certus_quartz",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "phantasm:fallen_star",
		name: "陨落之星",
		texture: "phantasm:block/fallen_star",
		modelPrefix: "fallen_star",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "ae2:fluix_block",
		name: "福鲁伊克斯块",
		texture: "ae2:block/fluix_block",
		modelPrefix: "fluix",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "the_bumblezone:royal_jelly_block",
		name: "蜂王浆块",
		texture: "the_bumblezone:block/royal_jelly_block_side",
		modelPrefix: "royal_jelly",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:blue_matter_block",
		name: "蓝物质方块",
		texture: "projectexpansion:block/matter/blue",
		modelPrefix: "blue_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:cyan_matter_block",
		name: "青物质方块",
		texture: "projectexpansion:block/matter/cyan",
		modelPrefix: "cyan_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:fading_matter_block",
		name: "渐消物质方块",
		texture: "projectexpansion:block/matter/fading",
		modelPrefix: "fading_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:green_matter_block",
		name: "绿物质方块",
		texture: "projectexpansion:block/matter/green",
		modelPrefix: "green_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:lime_matter_block",
		name: "黄绿物质方块",
		texture: "projectexpansion:block/matter/lime",
		modelPrefix: "lime_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:magenta_matter_block",
		name: "品红物质方块",
		texture: "projectexpansion:block/matter/magenta",
		modelPrefix: "magenta_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:orange_matter_block",
		name: "橙物质方块",
		texture: "projectexpansion:block/matter/orange",
		modelPrefix: "orange_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:pink_matter_block",
		name: "粉红物质方块",
		texture: "projectexpansion:block/matter/pink",
		modelPrefix: "pink_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:purple_matter_block",
		name: "紫物质方块",
		texture: "projectexpansion:block/matter/purple",
		modelPrefix: "purple_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:violet_matter_block",
		name: "紫罗兰物质方块",
		texture: "projectexpansion:block/matter/violet",
		modelPrefix: "violet_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:white_matter_block",
		name: "白物质方块",
		texture: "projectexpansion:block/matter/white",
		modelPrefix: "white_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:yellow_matter_block",
		name: "黄物质方块",
		texture: "projectexpansion:block/matter/yellow",
		modelPrefix: "yellow_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projecte:dark_matter_block",
		name: "暗物质方块",
		texture: "projecte:block/dark_matter_block",
		modelPrefix: "dark_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projecte:red_matter_block",
		name: "红物质方块",
		texture: "projecte:block/red_matter_block",
		modelPrefix: "red_matter",
		tags: ["minecraft:mineable/pickaxe"]
	}
];

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// Fake Mod IDs + Naming
Platform.getInfo("pa2_extras").name = "PA2 Extras (kJS)";
Platform.getInfo("pa2_compressed").name = "PA2 Compressed (kJS)";

// Block Registry
StartupEvents.registry("block", event => {
	// Dyeable Fire
	event.create("pa2_extras:dyeable_fire")
		.displayName("可染色的火")
		.hardness(0.0)
		.resistance(-1)
		.mapColor("none")
		.soundType(SoundType.WOOL)
		.tagBoth("pa2_extras:decoration")
		.tagBoth("emc:remove")
		.lightLevel(15)
		.opaque(false)
		.fullBlock(false)
		.requiresTool(false)
		.renderType("cutout")
		.noCollision()
		.notSolid()
		.noValidSpawns(true)
		.defaultCutout()
		.property(BlockProperties.AGE_15)
		.noDrops()
		.noItem()
		
	// Infused Archiveau
	event.create("pa2_extras:inf_archiveau")
        .displayName('§d§l灌注过的原始能量基底')
        .soundType('shroomlight')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.5)
        .defaultTranslucent()
        .tagBlock('mineable/pickaxe')
		.item(builder => builder.glow(true));
		
	// Generate Compressed Blocks
	global.compressedBlocks.forEach(entry => {
		for (let i = 1; i <= 9; i++)
		{
			if (!entry.model)
				entry.model = [];
			
			entry.model.push(`${entry.modelPrefix}_compressed_${i}x`);
			
			let builder = event.create(entry.base.replace(/.+:(.+)/, `pa2_compressed:$1_${i}x`))
				.displayName(Text.of(entry.name).append(` ${i}x`))
				.soundType("netherite_block")
				.hardness(1.0)
				.resistance(1.0)
				.requiresTool(true)
				.model(`pa2_compressed:block/${entry.modelPrefix}_compressed_${i}x`)
				.item(builder => {
					builder.tooltip("总方块数：" + ((9 ** i).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
				});
			
			entry.tags.forEach(tag => {
				builder.tagBlock(tag);
			});
		}
	});
});