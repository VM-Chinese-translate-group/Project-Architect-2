//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Cable Camo
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
//
// Quick script that allows the use of "camo" blocks on pipes that don't have facades (or on other blocks), this is meant to allow for those to be covered too and
// allow for more beautiful builds.
//------------------------------------------------------------------------------------------------------------------------------------------------

// The item used to add the camo block into the pipe/block
const camoItem = "framedblocks:framed_cube";

// Tool needed to remove the camo block. Can be an item id or a tag, for tags prefix with '#'
const camoRemoveTool = "#forge:wrenches";

// Allow for block entity blocks to be used
const allowEntityBlocks = false;

// The default block that the camo have when placed
const camoBaseBlock = "framedblocks:framed_cube";

// Blocks/Pipes that can have camo blocks applied to them, tags aren't allowed however
const allowedTargets = [
	"industrialforegoingsouls:soul_surge",
	"industrialforegoingsouls:soul_network_pipe",
	/pipez:.*_pipe/,
	/mekanism:.+_(pipe|cable|tube|transporter|conductor)/,
	/thermal:.+_duct/,
	"integrateddynamics:cable",
	"computercraft:cable",
	"powah:energy_cable_.+"
]

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// Java classes
const $AABB = Java.loadClass("net.minecraft.world.phys.AABB");

// Check Tool
function checkTool(item) 
{
	if (camoRemoveTool.startsWith("#"))
		return item.hasTag(camoRemoveTool.slice(1));
	else
		return item.getId() === camoRemoveTool;
}

// Trigger when the block is broken
BlockEvents.broken(event => {
	// Get Constants
	const player = event.getEntity();
	const block = event.getBlock();
	
	const world = event.getLevel();
	const aabb = new $AABB(block.getPos());
	const entity = world.getEntitiesWithin(aabb).find(e => e.getType() === "minecraft:item_display" && e.getTags().contains("pa2_addons.camo"));
	
	// Check if the target is valid
	let valid = false;
	allowedTargets.forEach(target => {
		if (block.getId().match(target) != null)
			valid = true;
	});
	
	if (!valid)
		return;
	
	// Check for Removal
	if (entity !== undefined)
	{
		let item = entity.getNbt().get("item").getString("id");
		
		if (!player.creative)
		{
			block.popItem(Item.of(item, 1));
			
			if (item !== camoBaseBlock)
				block.popItem(Item.of(camoBaseBlock, 1));
		}
		
		entity.kill();
		
		event.success();
		return;
	}
});

// Trigger on block left click
BlockEvents.leftClicked(event => {
	// Only works when sneaking
	if (!event.getEntity().isCrouching())
		return;
	
	// Get Constants
	const player = event.getEntity();
	const server = player.getServer();
	const block = event.getBlock();
	
	const held = event.getItem();
	
	const world = event.getLevel();
	const aabb = new $AABB(block.getPos());
	const entity = world.getEntitiesWithin(aabb).find(e => e.getType() === "minecraft:item_display" && e.getTags().contains("pa2_addons.camo"));
	
	// Check if the target is valid
	let valid = false;
	allowedTargets.forEach(target => {
		if (block.getId().match(target) != null)
			valid = true;
	});
	
	if (!valid)
		return;
	
	// Check for Disable
	if (checkTool(held) && entity !== undefined)
	{
		let nbt = entity.getNbt();
		
		// Checks for a lock (fixes double click in survival)
		let lock = nbt.get("BalmData").getBoolean("pa2_locked");
		if (lock)
		{
			nbt.get("BalmData").putBoolean("pa2_locked", false);
			entity.setNbt(nbt);
			
			event.cancel();
			return;
		}
		
		// Runs normal code
		let valid = nbt.getBoolean("Invulnerable");
		
		if (!valid)
		{
			let item = nbt.get("item").getString("id");
			nbt.get("BalmData").putString("pa2_realId", item);
			nbt.get("item").putString("id", "mekanism:structural_glass");
			nbt.putBoolean("Invulnerable", true);
		}
		else
		{
			let item = nbt.get("BalmData").getString("pa2_realId");
			nbt.get("item").putString("id", item);
			nbt.get("BalmData").putString("realId", "minecraft:air");
			nbt.putBoolean("Invulnerable", false);
		}
		
		nbt.get("BalmData").putBoolean("pa2_locked", true);
		entity.setNbt(nbt);
		
		if (block.getId().startsWith("integrateddynamics"))
		{
			server.schedule(1, callback => {
				block.getEntity().onUpdateReceived();
			});
		}
		
		event.cancel();
		return;
	}
});

// Trigger on block right click
BlockEvents.rightClicked(event => {
	// Only works when sneaking
	if (!event.getEntity().isCrouching())
		return;
	
	// Get Constants
	const player = event.getEntity();
	const server = player.getServer();
	const block = event.getBlock();
	
	const held = event.getItem();
	const hand = event.getHand();
	
	const world = event.getLevel();
	const aabb = new $AABB(block.getPos());
	const entity = world.getEntitiesWithin(aabb).find(e => e.getType() === "minecraft:item_display" && e.getTags().contains("pa2_addons.camo"));
	
	// Check if the target is valid
	let valid = false;
	allowedTargets.forEach(target => {
		if (block.getId().match(target) != null)
			valid = true;
	});
	
	if (!valid)
		return;
	
	// Check for Removal
	if (checkTool(held) && entity !== undefined)
	{
		let nbt = entity.getNbt();
		let item = nbt.getBoolean("Invulnerable") ? nbt.get("BalmData").getString("pa2_realId") : nbt.get("item").getString("id");
		
		if (!player.creative)
		{
			block.popItem(Item.of(item === camoBaseBlock ? camoItem : item, 1));
			
			if (item !== camoBaseBlock)
				block.popItem(Item.of(camoItem, 1));
		}
		
		entity.kill();
		
		event.success();
		return;
	}
	
	// Check for Masking
	const heldBlock = Block.getBlock(held.getId());
	const validateBE = allowEntityBlocks || !heldBlock.defaultBlockState().hasBlockEntity();
	if (heldBlock !== null && entity !== undefined && heldBlock.defaultBlockState().isSolid())
	{
		if (!validateBE)
		{
			player.tell(Text.of("You cannot use block entities on camo blocks!").red());
			event.cancel();
			return;
		}
		
		let nbt = entity.getNbt();
		let oldId = nbt.get("item").getString("id");
		
		if (oldId === held.getId())
			return;
		
		nbt.get("item").putString("id", heldBlock.getId());
		entity.setNbt(nbt);
		
		if (!player.creative && oldId !== camoBaseBlock)
			block.popItem(Item.of(oldId, 1));
		
		if (!player.creative)
			held.shrink(1);
		
		event.success();
		return;
	}
	
	// Add the block
	if (held.getId() === camoItem && entity === undefined)
	{	
		let pos = `${block.getX()} ${block.getY()+0.5} ${block.getZ()}`;
		server.runCommandSilent(`execute in ${world.dimension} run summon minecraft:item_display ${pos} {item: {id: "${camoBaseBlock}", Count: 1b}, Tags: ["pa2_addons.camo"], transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[0f,0f,0f],scale:[0.999f,0.999f,0.999f]}}`);
		
		if (!player.creative)
			held.shrink(1);
		
		event.success();
		return;
	}
});