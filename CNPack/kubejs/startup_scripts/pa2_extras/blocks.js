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
		name: "Block of Invar",
		texture: "thermal:block/invar_block",
		modelPrefix: "invar",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:silver_block",
		name: "Block of Silver",
		texture: "thermal:block/silver_block",
		modelPrefix: "silver",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:tin_block",
		name: "Block of Tin",
		texture: "thermal:block/tin_block",
		modelPrefix: "tin",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:lumium_block",
		name: "Block of Lumium",
		texture: "thermal:block/lumium_block",
		modelPrefix: "lumium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:steel_block",
		name: "Block of Steel",
		texture: "thermal:block/steel_block",
		modelPrefix: "steel",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:ruby_block",
		name: "Block of Ruby",
		texture: "thermal:block/ruby_block",
		modelPrefix: "ruby",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:enderium_block",
		name: "Block of Enderium",
		texture: "thermal:block/enderium_block",
		modelPrefix: "enderium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:lead_block",
		name: "Block of Lead",
		texture: "thermal:block/lead_block",
		modelPrefix: "lead",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:bronze_block",
		name: "Block of Bronze",
		texture: "thermal:block/bronze_block",
		modelPrefix: "bronze",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:sapphire_block",
		name: "Block of Sapphire",
		texture: "thermal:block/sapphire_block",
		modelPrefix: "sapphire",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:signalum_block",
		name: "Block of Signalum",
		texture: "thermal:block/signalum_block",
		modelPrefix: "signalum",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:constantan_block",
		name: "Block of Constantan",
		texture: "thermal:block/constantan_block",
		modelPrefix: "constantan",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:nickel_block",
		name: "Block of Nickel",
		texture: "thermal:block/nickel_block",
		modelPrefix: "nickel",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "thermal:electrum_block",
		name: "Block of Electrum",
		texture: "thermal:block/electrum_block",
		modelPrefix: "electrum",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "mekanism:block_uranium",
		name: "Uranium Block",
		texture: "mekanism:block/block_uranium",
		modelPrefix: "uranium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "mekanism:block_osmium",
		name: "Osmium Block",
		texture: "mekanism:block/block_osmium",
		modelPrefix: "osmium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:zinc_block",
		name: "Block of Zinc",
		texture: "create:block/zinc_block",
		modelPrefix: "zinc",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "kubejs:blaze_block",
		name: "Blaze Block",
		texture: "kubejs:block/blaze_block",
		modelPrefix: "blaze",
		tags: ["minecraft:mineable/pickaxe"]
	},
	
	// Some blocks that made sense, and can be used to make end-game challenges
	{
		base: "ars_nouveau:source_gem_block",
		name: "Source Gem Block",
		texture: "ars_nouveau:block/source_gem_block",
		modelPrefix: "source_gem",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "draconicevolution:awakened_draconium_block",
		name: "Awakened Draconium Block",
		texture: "draconicevolution:block/awakened_draconium_block_side",
		modelPrefix: "awakened_draconium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "draconicevolution:draconium_block",
		name: "Draconium Block",
		texture: "draconicevolution:block/draconium_block",
		modelPrefix: "draconium",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:andesite_alloy_block",
		name: "Block of Andesite Alloy",
		texture: "create:block/andesite_block",
		modelPrefix: "andesite_alloy",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:brass_block",
		name: "Block of Brass",
		texture: "create:block/brass_block",
		modelPrefix: "brass",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:experience_block",
		name: "Block of Experience",
		texture: "create:block/experience_block",
		modelPrefix: "experience",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:industrial_iron_block",
		name: "Block of Industrial Iron",
		texture: "create:block/industrial_iron_block",
		modelPrefix: "industrial_iron",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "refinedstorage:quartz_enriched_iron_block",
		name: "Block of Quartz Enriched Iron",
		texture: "refinedstorage:block/quartz_enriched_iron_block",
		modelPrefix: "quartz_enriched_iron",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "create:rose_quartz_block",
		name: "Block of Rose Quartz",
		texture: "create:block/palettes/rose_quartz_side",
		modelPrefix: "rose_quartz",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "ae2:quartz_block",
		name: "Certus Quartz Block",
		texture: "ae2:block/quartz_block",
		modelPrefix: "certus_quartz",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "phantasm:fallen_star",
		name: "Fallen Star",
		texture: "phantasm:block/fallen_star",
		modelPrefix: "fallen_star",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "ae2:fluix_block",
		name: "Fluix Block",
		texture: "ae2:block/fluix_block",
		modelPrefix: "fluix",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "the_bumblezone:royal_jelly_block",
		name: "Royal Jelly Block",
		texture: "the_bumblezone:block/royal_jelly_block_side",
		modelPrefix: "royal_jelly",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:blue_matter_block",
		name: "Blue Matter Block",
		texture: "projectexpansion:block/matter/blue",
		modelPrefix: "blue_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:cyan_matter_block",
		name: "Cyan Matter Block",
		texture: "projectexpansion:block/matter/cyan",
		modelPrefix: "cyan_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:fading_matter_block",
		name: "Fading Matter Block",
		texture: "projectexpansion:block/matter/fading",
		modelPrefix: "fading_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:green_matter_block",
		name: "Green Matter Block",
		texture: "projectexpansion:block/matter/green",
		modelPrefix: "green_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:lime_matter_block",
		name: "Lime Matter Block",
		texture: "projectexpansion:block/matter/lime",
		modelPrefix: "lime_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:magenta_matter_block",
		name: "Magenta Matter Block",
		texture: "projectexpansion:block/matter/magenta",
		modelPrefix: "magenta_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:orange_matter_block",
		name: "Orange Matter Block",
		texture: "projectexpansion:block/matter/orange",
		modelPrefix: "orange_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:pink_matter_block",
		name: "Pink Matter Block",
		texture: "projectexpansion:block/matter/pink",
		modelPrefix: "pink_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:purple_matter_block",
		name: "Purple Matter Block",
		texture: "projectexpansion:block/matter/purple",
		modelPrefix: "purple_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:violet_matter_block",
		name: "Violet Matter Block",
		texture: "projectexpansion:block/matter/violet",
		modelPrefix: "violet_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:white_matter_block",
		name: "White Matter Block",
		texture: "projectexpansion:block/matter/white",
		modelPrefix: "white_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projectexpansion:yellow_matter_block",
		name: "Yellow Matter Block",
		texture: "projectexpansion:block/matter/yellow",
		modelPrefix: "yellow_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projecte:dark_matter_block",
		name: "Dark Matter Block",
		texture: "projecte:block/dark_matter_block",
		modelPrefix: "dark_matter",
		tags: ["minecraft:mineable/pickaxe"]
	},
	{
		base: "projecte:red_matter_block",
		name: "Red Matter Block",
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
		.displayName("Dyeable Fire")
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
        .displayName('§d§lInfused Archiveau')
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
					builder.tooltip("Total blocks: " + ((9 ** i).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
				});
			
			entry.tags.forEach(tag => {
				builder.tagBlock(tag);
			});
		}
	});
});