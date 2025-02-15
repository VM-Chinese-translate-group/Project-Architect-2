//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Godforge Infusion
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
//
// A simple mechanic to allow infusing enchantments into non-enchantable items. Gem Armor, Meka-Suit, etc. should be able to have some enchants
// that are more utilitarian.
//
// Uses Ars Noveau and Apotheosis to make a ritual that is interesting to do while still allowing for a balanced mechanic.
//------------------------------------------------------------------------------------------------------------------------------------------------

// The Catalyst (one of the ingredients)
const catalyst = "apotheosis:mythic_material";

// The Infuser (the other ingredient needed)
const infuser = "apotheosis:infused_breath";

// The driving item (doesn't get consumed)
const driver = "pa2_extras:inf_archiveau";

// The amount of source required
// - The ritual always uses at least two jars
// - The amount value is multiplied by enchant
// - And then added onto the base value (which is the base cost)
// - Extra jars can be added up to a total of 5 for 50k source cap
//
// If the cap is reached the infusion won't work
const sourceBase = 5000;
const sourceAmount = 1500;

// The amount of levels per enchant
const levelCost = 15;

// Items that can be infused
// - The key is the id, the value is the type
const infuseable = {
	// Mekanism
	"mekaweapons:mekatana": "sword",
	"mekaweapons:mekabow": "bow",
	"mekanism:electric_bow": "bow",
	
	"mekanism:mekasuit_helmet": "helmet",
	"mekanism:mekasuit_bodyarmor": "chestplate",
	"mekanism:mekasuit_pants": "leggings",
	"mekanism:mekasuit_boots": "boots",
	
	"mekanism:free_runners_armored": "boots",
	"mekanism:jetpack_armored": "chestplate",
	"mekanism:hdpe_elytra": "elytra",
	
	"mekanism:atomic_disassembler": "tool",
	"mekanism:meka_tool": "tool",
	
	// ProjectE
	"projecte:gem_helmet": "helmet",
	"projecte:gem_chestplate": "chestplate",
	"projecte:gem_leggings": "leggings",
	"projecte:gem_boots": "boots",
	
	"projecte:rm_helmet": "helmet",
	"projecte:rm_chestplate": "chestplate",
	"projecte:rm_leggings": "leggings",
	"projecte:rm_boots": "boots",
	
	"projecte:dm_helmet": "helmet",
	"projecte:dm_chestplate": "chestplate",
	"projecte:dm_leggings": "leggings",
	"projecte:dm_boots": "boots",
	
	"projecte:rm_katar": "sword",
	"projecte:rm_sword": "sword",
	"projecte:rm_morning_star": "tool",
	"projecte:rm_pick": "pickaxe",
	"projecte:rm_axe": "axe",
	"projecte:rm_shovel": "shovel",
	"projecte:rm_hoe": "hoe",
	"projecte:rm_shears": "shears",
	"projecte:rm_hammer": "hammer",
	
	"projecte:dm_sword": "sword",
	"projecte:dm_pick": "pickaxe",
	"projecte:dm_axe": "axe",
	"projecte:dm_shovel": "shovel",
	"projecte:dm_hoe": "hoe",
	"projecte:dm_shears": "shears",
	"projecte:dm_hammer": "hammer",

    // Advanced AE
    "advanced_ae:quantum_helmet": "helmet",
    "advnaced_ae:quantum_chestplate": "chestplate",
    "advanced_ae:quantum_leggings": "leggings",
    "advanced_ae:quantum_boots": "boots",

    // Draconic Evolution
    "draconicevolution:chaotic_axe": "axe",
    "draconicevolution:chaotic_bow": "bow",
    "draconicevolution:chaotic_chestpiece": "chestplate",
    "draconicevolution:chaotic_hoe": "hoe",
    "draconicevolution:chaotic_pickaxe": "pickaxe",
    "draconicevolution:chaotic_shovel": "shovel",
    "draconicevolution:chaotic_staff": "tool",
    "draconicevolution:chaotic_sword": "sword"
};

// Structure Definition
// - Contains a list of items used to build the structure
// - 'source' contains the recepients that contain source in them, such need to have a {source} NBT tag to be valid
// - 'creativeSource' contains the recepients that count as creative sources
// - 'holder' contains the blocks that hold the items to use for the infusion
// - 'lowerHolder' the holders that contain the item inside their own block space instead of above
// - 'core' the block that needs to be under the center platform
// - 'platform' the block that works as the center platform
// - 'isPlatformLower' is set to 'true' if the platform holds the item within its own block space
const structure = {
    source: ["ars_nouveau:source_jar", "arseng:me_source_jar", "ars_nouveau:creative_source_jar"],
    creativeSource: ["ars_nouveau:creative_source_jar"],
    holder: ["ars_nouveau:arcane_pedestal", "ars_nouveau:arcane_platform"],
    lowerHolder: ["ars_nouveau:arcane_platform"],
    core: "ars_nouveau:arcane_core",
    platform: "ars_nouveau:arcane_platform",
    isPlatformLower: true
};

// Items that can Hold enchants to enchant others
// - Some mods add custom enchanted books or enchantment holders, this allows to account for that
const enchantHolder = ["minecraft:enchanted_book"];

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// Load needed classes
const $Enchants = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries").ENCHANTMENT;

// Test items
const testItem = {
	helmet: "minecraft:netherite_helmet",
	chestplate: "minecraft:netherite_chestplate",
	leggings: "minecraft:netherite_leggings",
	boots: "minecraft:netherite_boots",
	sword: "minecraft:netherite_sword",
	bow: "minecraft:bow",
	crossbow: "minecraft:crossbow",
	tool: "draconicevolution:draconic_staff", // Only logical tool that is all tools that has enchants
	shears: "minecraft:shears",
	axe: "minecraft:netherite_axe",
	shovel: "minecraft:netherite_shovel",
	hoe: "minecraft:netherite_hoe",
	pickaxe: "minecraft:netherite_pickaxe",
	hammer: "minecraft:netherite_pickaxe",
	elytra: "minecraft:elytra"
};

// Check what block is in the place
function checkBlock(block)
{
	let id = block.getId();
	
	if (structure.source.includes(id))
		return "source";
	
	if (structure.holder.includes(id))
		return "holder";
	
	return "empty";
}

// Check for block around
function checkAround(pos)
{
	// Object to return
	let result = { source: [], holder: [], totalSource: 0, driver: false, catalyst: false, infuser: false };
	
	// Check for the core
	if (pos.getDown().getId() !== structure.core)
		return false;
	
	// Get the blocks around
	for (let x = -1; x <= 1; x++)
	{
		for (let z = -1; z <= 1; z++)
		{
			if (x === 0 && z === 0)
				continue;
			
			let coords = pos.offset(x, 0, z);
			let type = checkBlock(coords);
			let data = coords.getEntityData();
			
			if (type === "empty")
				continue;
			
			if (type === "holder")
			{
				result.holder.push({ block: coords, data: data, item: data.itemStack.id });
				
				if (data.itemStack.id === infuser)
					result.infuser = true;
				
				if (data.itemStack.id === catalyst)
					result.catalyst = true;
				
				if (data.itemStack.id === driver)
					result.driver = true;
				
				continue;
			}
			
			if (type === "source")
			{
				result.source.push({ block: coords, data: data, creative: structure.creativeSource.includes(coords.getId()) ? true : false });
				result.totalSource += data.source;
				continue;
			}
		}
	}
	
	// Check conditions
	if (result.holder.length !== 3)
		return false;
	
	if (result.source.length < 2)
		return false;
	
	return result;
};

// Enchant function
function enchantItem(item, enchant)
{
	let inItem = item.hasEnchantment(enchant.id, 1);
	
	if (inItem)
	{
		let index = item.nbt.Enchantments.indexOf(item.nbt.Enchantments.find(ench => ench.id === enchant.id));
		
		if (item.nbt.Enchantments[index].lvl < enchant.lvl)
			item.nbt.Enchantments[index].lvl = enchant.lvl
		else
			return false;
	}
	else
	{
		item.nbt.Enchantments.push(enchant);
	}
	
	return true;
};

// Cancel with message
function fail(event, message)
{
	failComp(event, Text.of(message));
}

function failComp(event, comp)
{
	event.getPlayer().tell(comp);
	event.cancel();
}

// Validation Methods
function testEnchant(event, data, held)
{
    // Validate enchanting item
    let target = data.itemStack.id;
    if (!infuseable[target])
    {
        fail(event, "§c目标物品不能进行神锻灌注！");
        return false;
    }

    let type = infuseable[target];
    let targetEnchants = data.itemStack.tag && data.itemStack.tag.Enchantments ? data.itemStack.tag.Enchantments : [];
    let test = Item.of(testItem[type]).withNBT({ Enchantments: targetEnchants });

    // Validate the book
    if (!held.nbt || held.nbt.StoredEnchantments.length <= 0)
    {
        fail(event, "§c无效附魔书，上面没有附魔！");
        return false;
    }
    
    let heldEnchants = held.nbt.get("StoredEnchantments");

    // Gather the enchants that are valid and calculate costs
    let enchanted = false;
    let cost = sourceBase;
    let lvls = 0;
    
    heldEnchants.forEach(enchant => {		
        if ($Enchants.get(enchant.id).canEnchant(test))
        {
            let state = enchantItem(test, enchant);
            if (state)
            {
                enchanted = true;
                cost += sourceAmount;
                lvls += levelCost;
            }
        }
    });

    // Check if it would be enchanted
    if (!enchanted)
    {
        event.getPlayer().tell(Text.of("这本书没有能给目标物品的魔咒。").yellow());
        return false;
    }

    // Return the results
    return { cost: cost, lvls: lvls, enchants: test.nbt.Enchantments };
}

// Block left click for handling requirements
global.requirementShow = false;
BlockEvents.leftClicked(event => {
	// Get Constants
	const block = event.getBlock();
	const player = event.getPlayer();
	const held = event.getItem();
	const data = block.getEntityData();
    const server = player.getServer();
	
	// If player is sneaking ignore this
	if (player.isCrouching())
	{
		global.requirementShow = false;
		return;
	}
	
	// Triggers only when the platform is clicked and the item is an enchanted book
    const isInfusion = block.getId() === structure.platform && enchantHolder.includes(held.getId()) && data.itemStack.id !== "minecraft:air";
	if (isInfusion)
	{
		// Prevents double
		if (global.requirementShow)
		{
			global.requirementShow = false;
            server.schedule(0, _ => { block.getEntity().updateBlock(); });
			event.cancel();
			return;
		}
		
		// Test Enchant
        let test = testEnchant(event, data, held);
        if (test === false)
        {
            server.schedule(0, _ => { block.getEntity().updateBlock(); });
            event.cancel();
            return;
        }
		
		// Display the requirements
		player.tell(Text.of("§b§l灌注需求："));
		player.tell(Text.of(`§b- §e${test.cost} §d点魔源`));
		player.tell(Text.of(`§b- §e${test.lvls} §a级经验`));
		
		// Locks and cancels
		global.requirementShow = true;
        server.schedule(0, _ => { block.getEntity().updateBlock(); });
		event.cancel();
	}
	else
	{
		global.requirementShow = false;
	}
});

// Block click for handling the enchanting
BlockEvents.rightClicked(event => {
	// Get Constants
	const block = event.getBlock();
	const player = event.getPlayer();
	const server = player.getServer();
	const held = event.getItem();
	const data = block.getEntityData();
	const hand = event.getHand();
	
	// If player is sneaking ignore this
	if (player.isCrouching())
		return;
	
	// Triggers only when the platform is clicked and the item is an enchanted book
    const isInfusion = block.getId() === structure.platform && enchantHolder.includes(held.getId()) && data.itemStack.id !== "minecraft:air";
	if (isInfusion)
	{			
		// Validate structure
		let struct = checkAround(block);
		
		// If not valid structure ignore
		if (struct === false)
			return;
		
		// Test Enchant
        let test = testEnchant(event, data, held);
        if (test === false)
        {
            event.cancel();
            return;
        }
		
        let cost = test.cost;
        let lvls = test.lvls;

		// Check costs
		if (cost > 10000 * struct.source.length) // cap check
		{
			fail(event, `§c灌注消耗的魔源比目前存储的魔源要多，§b至少需要§e${cost}§b点魔源，但目前你的魔源罐只有§e${10000 * struct.source.length}点魔源。`);
			return;
		}
		
		if (cost > struct.totalSource) // current check
		{
			fail(event, `§c灌注消耗的魔源比目前可存储的魔源还要多，§b至少需要§e${cost}§b点魔源，但你目前只能存储§e${struct.totalSource}点魔源。`);
			return;
		}
		
		if (lvls > player.experienceLevel && !player.creative) // levels check
		{
			fail(event, `§c你的等级不足。§b至少需要§e${lvls}§b级经验，但你只有§e${player.experienceLevel}级经验。`);
			return;
		}
		
		if (!struct.infuser)
		{
			let ingredient = Item.of(infuser, 1);
			failComp(event, Text.of("§b你的基座上缺少§e一个").append(ingredient.getDisplayName()).append("§b！"));
			return;
		}
		
		if (!struct.catalyst)
		{
			let ingredient = Item.of(catalyst, 1);
			failComp(event, Text.of("§b你的基座上缺少§e一个").append(ingredient.getDisplayName()).append("§b！"));
			return;
		}
		
		if (!struct.driver)
		{
			let ingredient = Item.of(driver, 1);
			failComp(event, Text.of("§b你的基座上缺少§e一个").append(ingredient.getDisplayName()).append("§b！"));
			return;
		}
		
		// Transfer enchants
        if (!data.itemStack.tag)
            data.itemStack.tag = {};
        
        // Take levels
        if (!player.creative)
            player.addXPLevels(-lvls);
        
        // Take source
        struct.source.forEach(jar => {
            if (cost === 0)
                return;
            
            cost -= jar.data.source;
            
            if (jar.creative)
                return;
            
            jar.data.source = cost < 0 ? cost * -1 : 0;
            jar.block.setEntityData(jar.data);
            jar.block.getEntity().updateBlock();
            
            if (cost < 0)
                cost = 0;
        });
        
        // Take ingredients
        struct.holder.forEach(hold => {
            if (hold.item !== infuser && hold.item !== catalyst)
                return;
            
            hold.data.itemStack.id = "minecraft:air";
            hold.block.setEntityData(hold.data);
            hold.block.getEntity().updateBlock();
            
            let pos = "";
            
            if (structure.lowerHolder.includes(hold.block.getId()))
                pos = `${hold.block.getX()} ${hold.block.getY()+0.5} ${hold.block.getZ()}`;
            else
                pos = `${hold.block.getX()} ${hold.block.getY()+1} ${hold.block.getZ()}`;
            
            for (let i = 0; i < 19; i++)
                server.schedule(i, _ => server.runCommandSilent(`particle minecraft:dragon_breath ${pos} 0.2 0.2 0.2 0.01 2 normal`));
        });
        
        // Place enchantments
        let pos = structure.isPlatformLower ? `${block.getX()} ${block.getY()+0.75} ${block.getZ()}` : `${block.getX()} ${block.getY()+1.25} ${block.getZ()}`;
        for (let i = 0; i < 19; i++)
            server.schedule(i, _ => server.runCommandSilent(`particle minecraft:dragon_breath ${pos} 0.2 0.2 0.2 0.01 2 normal`));
        
        data.itemStack.tag.Enchantments = test.enchants;
        block.setEntityData(data);
        block.getEntity().updateBlock();
        
        // Take book
        if (!player.creative)
            held.shrink(1);

        player.tell(Text.of("物品附魔成功！").green());
		
		// Make the event succeed but cancels block interaction
		event.success();
	}
});