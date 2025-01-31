//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Item Handler
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
//
// A script to handle the right clicking and interaction of items, this allows for special behaviors to be added where they should already exist
//------------------------------------------------------------------------------------------------------------------------------------------------

// Allows right click to cycle stacked Functional Storage upgrades, a QoL that should already be present
const stackFSCycle = true;

// QoL feature to replace the cables when they are already placed (done with shift+right click)
const replaceAE2Cables = true; // For AE2
const replaceMekCables = true; // For Mekanism

// Set this for the number of archimeats the queen requires before consider giving a Queen Bee Egg. -1 disables it, 0 makes it always give
const meatToEgg = 32;

// Configures the chance to grow/explode a blob when giving them archimeat. Set to 0 to disable.
// - Rare are -0.05 and Legendary are -0.10 of this value.
const blobFeedChance = 0.25;

// Set to true if the Heart of the Deep is stackable
// - This prevents using the entire stack to open the gate
const fixHeartStackUsage = true;

// Create custom hidden trades for the Queen Bee, Archium to EMC Stars (up to first colossal line) + Royal Jelly Farming
// - The list below has the trades, you can alter it, just do item id as key, and weight as value
const allowArchiumQueenTrade = true;
const archiumTrades = {
	// TOTAL: 7
	"projectexpansion:magnum_star_vier": 2,
	"projectexpansion:magnum_star_sphere": 2,
	"projectexpansion:magnum_star_omega": 2,
	"projectexpansion:colossal_star_ein": 1 // 14.29%
};

// In case Creative Bins are added as quest rewards for the end-game challenges,
// this list are the items that can't be put inside.
const creativeBinBlacklist = [
	/projectexpansion:.+_star_.+/,
	/projecte:.+_star_.+/,
	"projectexpansion:final_star_shard",
	"projectexpansion:final_star",
	"pa2_extras:inf_archiveau",
	"mekanism:creative_bin"
];

// The list of creative items that should be emptied with the Configurator empty mode
// - Item ID can't use Regex for these ones
const creativeItemsForEmpty = [
	"mekanism:creative_chemical_tank",
	"mekanism:creative_fluid_tank"
]

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// Cable compare function
function compareCable(type, block, held) {
	switch (type)
	{
		case "ae2":
			let rule = /ae2:.+_cable/;
			return block.getItem().getMod() === held.getMod() && 
				   held.getId().match(rule) && 
				   block.getEntityData() &&
				   block.getEntityData().cable.id.match(rule) && 
				   held.getId() != block.getEntityData().cable.id;
		case "mek":
			rule = /mekanism:.+_(cable|pipe|tube|transporter|conductor)/;
			return block.getItem().getMod() === held.getMod() && 
				   held.getId().match(rule) && 
				   block.getId().match(rule) &&
				   held.getId() != block.getId();
	}
}

// Block right click
BlockEvents.rightClicked(event => {
	// Get Contants
	const player = event.getEntity();
	const server = player.getServer();
	const block = event.getBlock();
	const held = event.getItem();
	
	// Transmutation Interface learning system
	if (block.getId() === "projectexpansion:transmutation_interface")
	{
		if (held.getId() !== "minecraft:air")
		{
			if (server.runCommandSilent(`/projecte knowledge learn RicTheCoder ${held.getId()}`) === 1)
			{
				player.tell(Text.of("Learned ").yellow().append(Text.of(held.getDisplayName())).append(" into your transmutation knowledge"));
				event.success();
			}
		}
		
		/*if (held.getId() === "projecte:tome")
		{
            let world = block.getLevel();
            player.tell(Object.keys(world.levelData).reduce((p, c, i, a) => p + ", " + c, ""));
            event.success();
		}*/
	}
	
	// Prevent adding items to creative bins
	if (block.getId() === "mekanism:creative_bin")
	{
        // Fixing the Building Gadget exploits with creative bins
        if (held.getId() === "buildinggadgets2:gadget_building" || held.getId() === "buildinggadgets2:gadget_exchanging")
        {
            player.tell(Text.of("You can't use this building gadget on a Creative Bin").red());
            server.schedule(0, _ => delete(held.nbt.blockstate));
			event.cancel();
			return;
        }

        if (held.getId() === "buildinggadgets2:gadget_copy_paste")
        {
            player.tell(Text.of("You can't copy Creative Bins. Resetting selection!").red());
            server.schedule(0, callback => {
                delete(held.nbt.copyend);
                delete(held.nbt.copystart);
                delete(held.nbt.copyuuid);
            });
            event.cancel();
            return;
        }

		// Prevents getting empty
		if (!player.creative && held.getId() === "mekanism:configurator" && held.nbt.mekData.state == 8)
		{
			player.tell(Text.of("Creative Bins can't be emptied").red());
			event.cancel();
			return;
		}
		
		// Prevents certain items
		creativeBinBlacklist.forEach(item => {
			if (held.getId().match(item))
			{
				player.tell(Text.of("This item cannot be put into a Creative Bin").red());
				event.cancel();
				return;
			}
		});
	}
	
	// Allows the creative items to be emptied with the configurator
	if (creativeItemsForEmpty.includes(block.getId()) && player.isCrouching())
	{
		// Empty the creative items that have it allowed
		if (held.getId() === "mekanism:configurator" && held.nbt.mekData.state == 8)
		{
			let nbt = block.getEntityData();
			
			if (nbt.FluidTanks)
				nbt.FluidTanks[0].stored.Amount = 0;
			
			if (nbt.GasTanks)
				nbt.GasTanks[0].stored.amount = 0;
			
			block.setEntityData(nbt);
			return;
		}
	}
	
	// Fix Heart of the Deep stack usage (doesn't run on creative)
	if (fixHeartStackUsage && block.getId() === "minecraft:reinforced_deepslate" && held.getId() === "deeperdarker:heart_of_the_deep" && !player.creative)
	{
		// Load Values
		let hand = event.getHand();
		let inv = player.getInventory();
				
		let leftOver = held.copy();
		leftOver.shrink(1);
		
		let count = inv.count("deeperdarker:heart_of_the_deep") - 1;
		
		// Uses a single tick callback to recheck the item, and give back the stack if needed
		server.schedule(1, callback => {
			if (player.getHeldItem(hand).getId() === "minecraft:air")
				player.setHeldItem(hand, leftOver);
			
			if (inv.count("deeperdarker:heart_of_the_deep") < count)
				player.give(leftOver);
		});
	}
	
	// Add QoL replacement to cables
	if (player.isCrouching())
	{
		// AE2
		if (replaceAE2Cables && compareCable("ae2", block, held))
		{
			let blockNbt = block.getEntityData();
			let valid = (held.getId().match(".+_dense_cable") && blockNbt.cable.id.match(".+_dense_cable")) || 
						(!held.getId().match(".+_dense_cable") && !blockNbt.cable.id.match(".+_dense_cable"));
			
			// If both cable are dense or both are not
			if (valid)
			{
				block.mergeEntityData({ cable: { id: held.getId() }});
				
				if (!player.creative)
				{
					held.shrink(1);
					player.give(Item.of(blockNbt.cable.id, 1));
				}
				
				// Cancels the event to prevent placing, but still shows the click
				event.success();
			}
		}
		
		// MEKANISM
		if (replaceMekCables && compareCable("mek", block, held))
		{
			let valid = (held.getId().match(".+_cable") && block.getId().match(".+_cable")) || 
						(held.getId().match(".+_pipe") && block.getId().match(".+_pipe")) || 
						(held.getId().match(".+_tube") && block.getId().match(".+_tube")) || 
						(held.getId().match(".+_transporter") && block.getId().match(".+_transporter")) || 
						(held.getId().match(".+_conductor") && block.getId().match(".+_conductor"));
			
			// If both cables match their type of not
			if (valid)
			{
				let item = Item.of(block.getId());
				let blockNbt = block.getEntityData();
				block.set(held.getId());
				block.mergeEntityData(blockNbt);
				
				if (!player.creative)
				{
					held.shrink(1);
					player.give(item);
				}
				
				// Cancels the event to prevent placing, but still shows the click
				event.success();
			}
		}
		
		// EMC LINKS
		if (block.getId().match(/projectexpansion:.+_emc_link/) && held.getId().match(/projectexpansion:.+_emc_link/) && block.getId() !== held.getId())
		{
			let item = Item.of(block.getId());
			let blockNbt = block.getEntityData();
			block.set(held.getId());
			block.mergeEntityData(blockNbt);
				
			if (!player.creative)
			{
				held.shrink(1);
				player.give(item);
			}
			
			// Cancels the event to prevent placing, but still shows the click
			event.success();
		}
	}
});

// Checks for right clicks
ItemEvents.rightClicked(event => {
	// Get constants
	const server = event.getEntity().getServer();
	
	// Adds right clicking to the FS upgrades
	if (stackFSCycle && ["functionalstorage:puller_upgrade", "functionalstorage:pusher_upgrade", "functionalstorage:collector_upgrade"].includes(event.getItem().getId()))
	{
		let item = event.getItem();
		let player = event.getEntity().getName().getString();
		let dirMsg = (dir) => server.runCommandSilent(`title ${player} actionbar ["",{"text":"Direction: ","color":"yellow"},"${dir}"]`);
		
		if (!item.nbt)
		{
			item.nbt = {Direction:"down"};
			dirMsg("Down");
		}
		else
		{
			switch (item.nbt.Direction)
			{
				case "down":
					item.nbt.Direction = "up";
					dirMsg("Up");
					break;
				case "up":
					item.nbt.Direction = "north";
					dirMsg("North");
					break;
				case "north":
					item.nbt.Direction = "south";
					dirMsg("South");
					break;
				case "south":
					item.nbt.Direction = "west";
					dirMsg("West");
					break;
				case "west":
					item.nbt.Direction = "east";
					dirMsg("East");
					break;
				case "east":
				default:
					item.nbt.Direction = "down";
					dirMsg("Down");
					break;
			}
		}
	}
});

// Entity interaction with item
ItemEvents.entityInteracted(event => {
	// Get constants
	const player = event.getEntity();
	const server = player.getServer();
	
	const target = event.getTarget();
	const type = target.getType();
	
	// Archimeat - Queen Bee
	if (meatToEgg > -1 && type === "the_bumblezone:bee_queen" && event.getItem().getId() === "kubejs:archimeat")
	{
		// Get the meat given value
		let nbt = target.getNbt();
		let totalMeat = nbt.ForgeData.meatGiven ? nbt.ForgeData.meatGiven + 1 : 1;
		
		// Give egg if conditions are met
		if (totalMeat >= meatToEgg)
		{
			target.mergeNbt({ForgeData: {meatGiven: 0}});
			server.runCommandSilent(`title ${player.getName().getString()} actionbar ["",{"text":"The ","italic":true,"color":"light_gray"},{"text":"Queen Bee","italic":true,"color":"yellow"},{"text":" thanks you with one of her eggs!","italic":true,"color":"light_gray"}]`);
			
			player.give(Item.of("the_bumblezone:bee_queen_spawn_egg", 1));
		}
		else // Counts and tells you
		{
			target.mergeNbt({ForgeData: {meatGiven: totalMeat}});
			server.runCommandSilent(`title ${player.getName().getString()} actionbar ["",{"text":"A meat a day keeps the spiders away! (${totalMeat}/${meatToEgg})","italic":true,"color":"light_gray"}]`);
		}
		
		if (!player.creative)
			event.getItem().shrink(1);
		
		event.success();
	}
	
	// Archimeat - Blob
	if (blobFeedChance > 0 && type.startsWith("rftoolsdim:") && event.getItem().getId() === "kubejs:archimeat")
	{
		// Get the stage (0 = common, 1 = rare, 2 = legendary)
		let stage = type.endsWith("_legendary") ? 2 : (type.endsWith("_rare") ? 1 : 0);
		
		// Gets the chance and runs if valid
		if (Math.random() <= (blobFeedChance - 0.05 * stage))
		{
			switch (stage)
			{
				case 0: // Grows to Rare
					let pos = `${target.getX()} ${target.getY()} ${target.getZ()}`;
					server.runCommandSilent(`execute in ${event.getLevel().dimension} run summon rftoolsdim:dimensional_blob_rare ${pos}`);
					target.setPosition(0, -200, 0);
					target.kill();
					break;
				case 1: // Grows to Legendary
					pos = `${target.getX()} ${target.getY()} ${target.getZ()}`;
					target.setPosition(0, -200, 0);
					target.kill();
					server.runCommandSilent(`execute in ${event.getLevel().dimension} run summon rftoolsdim:dimensional_blob_legendary ${pos}`);
					break;
				case 2: // Explodes
					pos = `${target.getX()} ${target.getY()+2} ${target.getZ()}`;
					target.kill();
					
					for (let i = 0; i < Math.random() * 5; i++)
						server.runCommandSilent(`execute in ${event.getLevel().dimension} run summon minecraft:item ${pos} {Item: {id:"rftoolsdim:common_essence", Count:64}}`);
					
					for (let i = 0; i < Math.random() * 5; i++)
						server.runCommandSilent(`execute in ${event.getLevel().dimension} run summon minecraft:item ${pos} {Item: {id:"rftoolsdim:rare_essence", Count:32}}`);
					
					for (let i = 0; i < Math.random() * 5; i++)
						server.runCommandSilent(`execute in ${event.getLevel().dimension} run summon minecraft:item ${pos} {Item: {id:"rftoolsdim:legendary_essence", Count:16}}`);
					
					break;
			}
		}
		
		// Take one regardless
		if (!player.creative)
			event.getItem().shrink(1);
	}
	
	// Archium trades
	if (allowArchiumQueenTrade && type === "the_bumblezone:bee_queen" && event.getItem().getId() === "kubejs:archium")
	{
		// Generate Constants
		let trades = Object.entries(archiumTrades);
		let totalWeight = trades.reduce((sum, [key, weight]) => sum + weight, 0);
		
		// Use a function wrapper to use both single click and shift-click
		let toRun = (multi) => {
			// Select Trade
			let random = Math.random() * totalWeight;
			let item = null;
			for (const [key, weight] of trades)
			{
				random -= weight;
				if (random <= 0)
				{
					item = key;
					break;
				}
			}
			
			// Calculate spawn position
			let coords = [
				player.getX() - ((player.getX() - target.getX()) / 2.5),
				player.getY() + 2,
				player.getZ() - ((player.getZ() - target.getZ()) / 2.5)
			];
			let pos = `${coords[0]} ${coords[1]} ${coords[2]}`;
			
			// Execute Trade
			server.runCommandSilent(`execute in ${event.getLevel().dimension} run summon minecraft:item ${pos} {Item: {id:"${item}",Count:1}}`);
			
			if (!multi)
			{
				if (item.startsWith("projecte:klein_"))
					server.runCommandSilent(`title ${player.getName().getString()} actionbar ["",{"text":"A ","italic":true,"color":"dark_aqua"},{"text":"Klein Star","italic":true,"color":"yellow"},{"text":" weaved from the Cosmos!","italic":true,"color":"dark_aqua"}]`);
				
				if (item.startsWith("projectexpansion:magnum_"))
					server.runCommandSilent(`title ${player.getName().getString()} actionbar ["",{"text":"A ","italic":true,"color":"dark_aqua"},{"text":"Magnum Star","italic":true,"color":"gold"},{"text":" that warps the cosmic space!","italic":true,"color":"dark_aqua"}]`);
				
				if (item === "projectexpansion:colossal_star_ein")
					server.runCommandSilent(`title ${player.getName().getString()} actionbar ["",{"text":"A ","italic":true,"color":"dark_aqua"},{"text":"Colossal Star","italic":true,"color":"red"},{"text":" where the nothing and the everything overlap!","italic":true,"color":"dark_aqua"}]`);
				
				if (item === "the_bumblezone:royal_jelly_bucket")
					server.runCommandSilent(`title ${player.getName().getString()} actionbar ["",{"text":"A ","italic":true,"color":"dark_aqua"},{"text":"Bucket of Royal Jelly","italic":true,"color":"light_purple"},{"text":" from my own collection!","italic":true,"color":"dark_aqua"}]`);
			}
			else
				server.runCommandSilent(`title ${player.getName().getString()} actionbar ["",{"text":"The ","italic":true,"color":"dark_aqua"},{"text":"Queen's Power","italic":true,"color":"yellow"},{"text":" brings the Cosmos to you!","italic":true,"color":"dark_aqua"}]`);
			
			if (!player.creative || multi)
				event.getItem().shrink(1);
		};
		
		// Process Clicks
		if (player.isCrouching())
		{
			while (event.getItem().getCount() > 0)
				toRun(true);
		}
		else
			toRun(false);
		
		// Cancels the event to prevent normal trade check, but still animates the click
		event.success();
	}
});