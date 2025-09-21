//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Drop Handler
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
// Contributor: ShiftTheDev
//
// This script includes a bunch of things, the ability to quickly fix blocks that are either bugged and should drop, or drops that should drop
// but for some reason never were added (no reason why some blocks like Reinforced Deepslate shouldn't be mineable, at least with silk touch).
//
// Features:
// - Setting any list to an empty array will not even check for items in them
// - Fixes some weird drop issues like with the Redstone Beacon
// - Prevents item duping with Draconic Evolution items when dropping the blocks added here
// - Also prevents other types of duping from Draconic Evolution items
// - Fixes the issue with 'Alchemical Collection' by auto learning blocks being broken (this is just a quick fix, only applies when AC is active)
// - Fixes modular router messing Draconic Evolution weapons and other tools with highly advanced NBT tags
// - Fixes weird breaking limitations of blocks such as Dark Matter Pedestal
//
// [#] The trials blocks (vaults and spawner) only drop if they have injected their items and are now empty, so only after becoming inactive,
// this prevents breaking something accidently, they also can't be broken until then unless in creative (also prevents other accidents...)
//------------------------------------------------------------------------------------------------------------------------------------------------

// Make this false to not apply the fix for 'Alchemical Collection'
const fixACEnchant = false;

// Fixes the modular router dropping the wrong draconic equipment (and sometimes Mekanism)
const fixMRWrongDrop = true;

// If the trials content is dropped, activate this to only allow for them to be obtainable when already inactive
const trialInactiveOnly = true;

// Items that should actually drop
// - Items in here will drop when destroyed regardless of the tool used (this is just a quick fix for some blocks that are either bugged or don't drop nicely)
// - The ones on this list will drop with or without silk touch
const drops = [
	"outer_end:rose_crystal_lamp",
	"outer_end:mint_crystal_lamp",
	"outer_end:cobalt_crystal_lamp",
	"cyclic:beacon_redstone",
	"phantasm:oblivion",
	"chisel_chipped_integration:factory_blue_circuits"
];

// Same as above but requires silk touch for the drop to happen
const dropsSilk = [
	"minecraft:reinforced_deepslate", 
	"trials:trial_spawner",
	"trials:trial_vault",
	"trials:trial_vault_ominous"
	
	// QUICK NOTE: Trial spawners and vaults can drop but if they are dropped they will never work again, 
	// the purpose is to be cosmetic, as they are nice for some builds
];

// Blocks that should be broken when Sneak + Break (for blocks that are hard coded to specific tools)
// - The block will run the normal break situation if it is broken while sneaking
// - Block drops based on the drop from running 'setblock ... destroy'
const forceBreak = [
	"projecte:dm_pedestal",
	"projectexpansion:blue_matter_block",
	"projectexpansion:green_matter_block",
	"projecte:dark_matter_block",
	"projectexpansion:cyan_matter_block",
	"projecte:red_matter_block",
	"projectexpansion:white_matter_block",
	"projectexpansion:orange_matter_block",
	"projectexpansion:lime_matter_block",
	"projectexpansion:purple_matter_block",
	"projectexpansion:pink_matter_block",
	"projectexpansion:yellow_matter_block",
	"projectexpansion:magenta_matter_block",
	"projectexpansion:fading_matter_block",
	"projectexpansion:violet_matter_block"
];

// Some tools of some mods can cause double drops, such as the ones from Draconic Evolution
// - Add the mod id/namespace or the item id to prevent that
const doubleDropFix = ["draconicevolution"];

// Blocks that are affected by the double/triple drops caused by the tools above
// - Add the mod id/namespace or the item id that should be fixed
const doubleDropBlocks = [];

// Block tag to Tool tag for block mining fix
// - Key is the block tag, value is the tool tag (no need for the '#')
const tagToTool = {
	"forge:mineable/paxel": "forge:tools/paxels",
	"minecraft:mineable/mattock": "forge:tools/mattocks",
	"minecraft:mineable/pickaxe": "forge:tools/pickaxes",
	"projecte:mineable/morning_star": "forge:tools/morning_stars",
	"projecte:mineable/hammer": "forge:tools/hammers",
	"projecte:mineable/katar": "forge:tools/katars",
	"minecraft:mineable/hoe": "forge:tools/hoes",
	"forge:mineable/sickle": "forge:tools/sickles",
	"minecraft:mineable/axe": "forge:tools/axes",
    "mekanism:atomic_disassembler_ore": "forge:tools/atomic_disassembler"
};

// The blocks or mods to fix the mining of blocks with certain tools
// - Add a block id, or just the mod id to force the blocks to check the right tags (see above) when breaking
const mineFixBlocks = [
	"enlightened_end"
]

// Fixes some broken NBT on drop
// - The key is the id of the block, or a mod id to trigger for all blocks of that mod
// - 'validate' is what validates if the block should be cleared
// - 'dropWith' is the default NBT state to drop with (set to null to remove NBT completely)
const fixNbtOnDrop = {
    "easy_villagers:trader": {
        validate: (block) => block.getEntityData().Villager === undefined && block.getEntityData().Workstation === undefined,
        dropWith: null
    },
    "easy_villagers:auto_trader": {
        validate: (block) => block.getEntityData().Villager === undefined && block.getEntityData().Workstation === undefined,
        dropWith: null
    },
    "draconicevolution:basic_crafting_injector": {
        validate: (block) => block.getEntityData().bc_caps.inventory.Items.length <= 0,
        dropWith: null
    },
    "draconicevolution:wyvern_crafting_injector": {
        validate: (block) => block.getEntityData().bc_caps.inventory.Items.length <= 0,
        dropWith: null
    },
    "draconicevolution:awakened_crafting_injector": {
        validate: (block) => block.getEntityData().bc_caps.inventory.Items.length <= 0,
        dropWith: null
    },
    "draconicevolution:chaotic_crafting_injector": {
        validate: (block) => block.getEntityData().bc_caps.inventory.Items.length <= 0,
        dropWith: null
    },
    "ironfurnaces": {
        validate: (block) => block.getId().endsWith("_furnace"),
        dropWith: null,
        onDrop: (block) => {
            block.getEntityData().Items.forEach(item => {
                block.popItem(Item.of(item.id, item.Count));
            })
        }
    }
}

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// Block Break Functions
function breakBlock(event, fixDrop) {
	// Get server for easy use
	const server = event.player.getServer();
	
	// The Trial active drop prevention
	if (trialInactiveOnly && event.block.getId().startsWith("trials:trial_"))
	{
		event.block.getBlockState().getProperties().forEach(prop => {
			if (prop.getName() === "trials_active" && event.block.getBlockState().getValue(prop) === true)
				event.cancel();
			
			if (prop.getName() === "trials_ejecting" && event.block.getBlockState().getValue(prop) === true)
				event.cancel();
		});
	}
	
	// Drops item
	if (fixDrop) // Fixes double dropping
	{
		if (!global.dropped)
		{
			event.block.popItem(event.block.getItem().withCount(1));
			global.dropped = true;
			
			server.schedule(1, _ => global.dropped = false);
		}
	}
	else
		event.block.popItem(event.block.getItem().withCount(1));
}

// The block event registration
BlockEvents.broken(event => {
	// Get server for easy use & the block
	const server = event.player.getServer();
	const block = event.block;

	// Checks for Modular Routers
	if (fixMRWrongDrop && event.block.getId() === "modularrouters:modular_router")
	{		
		// Pops the item out of the inventory
		let buffered = event.block.getInventory().getStackInSlot(0);
		event.block.popItem(event.block.getInventory().extractItem(0, buffered.getCount(), false));
	}
	
	// Ignore Creative Players
	if (event.player.creative)
		return;

    // NBT Voider on Drop
    const fixNbt = fixNbtOnDrop[block.getId()] !== undefined ? fixNbtOnDrop[block.getId()] : fixNbtOnDrop[block.getItem().getMod()];
    if (fixNbt !== undefined && fixNbt.validate(block))
    {
        let item = block.getItem().withCount(1);
        item.nbt = fixNbt.dropWith ?? undefined;

        block.popItem(item);
        if (fixNbt.onDrop !== undefined)
            fixNbt.onDrop(block);

        let pos = `${block.getX()} ${block.getY()} ${block.getZ()}`;
        server.runCommandSilent(`setblock ${pos} air`);

        event.cancel();
        return;
    }
	
	let heldItem = event.player.getMainHandItem();
	let fixDrop = doubleDropFix.length !== 0 && ( doubleDropFix.includes(heldItem.getMod()) || doubleDropFix.includes(heldItem.getId()) );
	
	// Silk Touch Drops
	if (dropsSilk.length !== 0 && dropsSilk.includes(event.block.getId()) && heldItem.hasEnchantment("minecraft:silk_touch", 1))
	{
		breakBlock(event, fixDrop);
		return;
	}
	
	// Non Silk Touch Drops
	if (drops.length !== 0 && drops.includes(event.block.getId()))
	{
		breakBlock(event, fixDrop);
		return;
	}
	
	// Checks for Alchemical Collection usage
	if (fixACEnchant && heldItem.nbt && heldItem.nbt.AlchemicalCollectionEnabled && heldItem.nbt.AlchemicalCollectionEnabled == 1)
		server.runCommandSilent(`projecte knowledge learn ${event.player.getUsername()} ${event.block.getItem().getId()}`); // Force learns the item being broken with AC active
	
	// Fixes Tool Duping
    if (doubleDropBlocks.length !== 0)
    {
        if (fixDrop && ( doubleDropBlocks.includes(block.getItem().getMod()) || doubleDropBlocks.includes(block.getId()) ))
        {	
            // Breaks with commands to allow event cancelling
            let pos = `${block.getX()} ${block.getY()} ${block.getZ()}`;
            
            if (block.getId().startsWith("chisel_chipped_integration:"))
                server.runCommandSilent(`setblock ${pos} air`);
            else
                server.runCommandSilent(`setblock ${pos} air destroy`);
            
            // Cancels the event
            event.cancel();
        }
    }
	
	// Fixes Block Drops
	if (Object.keys(tagToTool).length > 0 && ( mineFixBlocks.includes(block.getItem().getMod()) || mineFixBlocks.includes(block.getId()) ))
	{
		Object.keys(tagToTool).forEach(tag => {
			let tool = tagToTool[tag];
			
			if (block.hasTag(tag) && heldItem.hasTag(tool))
			{
				let fakeItem = Item.of(Items.DIAMOND_PICKAXE, 1, heldItem.nbt);

                let drops = event.block.getDrops(event.player, fakeItem);
                drops.forEach(stack => {
                    block.popItem(stack);
                })
                block.set(Block.getBlock("minecraft:air"));
				
				event.success();
			}
		});
	}

    // Solves the issue with excavating enchant + AOE Module
    if (heldItem.getId().startsWith("draconicevolution:") && heldItem.hasEnchantment("ensorcellation:excavating", 1))
    {
        let enchants = [];
        heldItem.nbt.Enchantments.forEach(enchant => {
            if (enchant.id !== "ensorcellation:excavating")
            {
                enchants.push(enchant);
                
                let book = Item.of("minecraft:enchanted_book", 1, {StoredEnchantments: [{id: "ensorcellation:excavating", lvl: 1}]});
                event.player.give(book);
            }
        });
        heldItem.nbt.Enchantments = enchants;

        event.player.tell(Text.of("警告，当前的附魔如果在龙之研究的物品上，将会导致游戏崩溃，所以我要把这个附魔移除掉。").red());
        event.player.tell(Text.of("作为赔偿给你本带有这个附魔的附魔书。").yellow());
    }
});

// Block left click event
BlockEvents.leftClicked(event => {
	// Ignore Creative Players and non Sneaking players
	if (event.getEntity().creative || !event.getEntity().isCrouching())
		return;
	
	// Checks if its a force break block
	if (forceBreak.length !== 0 && forceBreak.includes(event.block.getId()))
	{
		let pos = `${event.block.getX()} ${event.block.getY()} ${event.block.getZ()}`;
		event.getEntity().getServer().runCommandSilent(`setblock ${pos} air destroy`);
	}
});