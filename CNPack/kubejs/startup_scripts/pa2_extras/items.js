//------------------------------------------------------------------------------------------------------------------------------------------------
// PA2 Extras - Items
//------------------------------------------------------------------------------------------------------------------------------------------------
// Author: RicTheCoder
//
// Adds extra custom items, mainly to fix items that changed IDs, among other things.
//------------------------------------------------------------------------------------------------------------------------------------------------

// Java Classes
const $Locale = Java.loadClass("java.util.Locale");
const $TE_Items = Java.loadClass("mrthomas20121.thermal_extra.init.ThermalExtraItems");
const $TE_EnAug = Java.loadClass("mrthomas20121.thermal_extra.item.augment.EnumAugment");
const $TE_ExAug = Java.loadClass("mrthomas20121.thermal_extra.item.augment.ExtraAugment");
const $TE_ExAugType = Java.loadClass("mrthomas20121.thermal_extra.item.augment.ExtraAugmentType");
const $COFH_Tags = Java.loadClass("cofh.lib.util.constants.NBTTags");

// Creates Legacy versions of the Thermal Extras items with the old ID
global.teFixer = [
    { 
        old: "area_radius_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_AREA_EFFECT,
        augName: $TE_EnAug.AREA_RADIUS_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_RADIUS] = { value: 1.0, increment: 1.0 };
            return map;
        },
        maxIndex: 4,
        localFix: {},
        recipes: {},
        models: []
    },
    { 
        old: "dynamo_fuel_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_DYNAMO,
        augName: $TE_EnAug.DYNAMO_FUEL_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_DYNAMO_ENERGY] = { value: 1.1, increment: 0.02 };
            return map;
        },
        maxIndex: 4,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "rf_coil_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_RF,
        augName: $TE_EnAug.RF_COIL_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_RF_STORAGE] = { value: 4.0, increment: 4.0 };
            map[$COFH_Tags.TAG_AUGMENT_RF_XFER] = { value: 4.0, increment: 4.0 };
            return map;
        },
        maxIndex: 5,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "rf_coil_storage_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_RF,
        augName: $TE_EnAug.RF_COIL_STORAGE_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_RF_STORAGE] = { value: 6.0, increment: 4.0 };
            map[$COFH_Tags.TAG_AUGMENT_RF_XFER] = { value: 2.0, increment: 2.0 };
            return map;
        },
        maxIndex: 5,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "rf_coil_xfer_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_RF,
        augName: $TE_EnAug.RF_COIL_XFER_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_RF_STORAGE] = { value: 2.0, increment: 2.0 };
            map[$COFH_Tags.TAG_AUGMENT_RF_XFER] = { value: 6.0, increment: 4.0 };
            return map;
        },
        maxIndex: 5,
        localFix: {},
        recipes: {},
        models: []
    },
    { 
        old: "fluid_tank_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_FLUID,
        augName: $TE_EnAug.FLUID_TANK_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_FLUID_STORAGE] = { value: 4.0, increment: 4.0 };
            return map;
        },
        maxIndex: 6,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "machine_speed_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_MACHINE,
        augName: $TE_EnAug.MACHINE_SPEED_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_MACHINE_POWER] = { value: 1.1, increment: 0.0 };
            map[$COFH_Tags.TAG_AUGMENT_MACHINE_ENERGY] = { value: 1.1, increment: -0.1 };
            return map;
        },
        maxIndex: 4,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "machine_efficiency_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_MACHINE,
        augName: $TE_EnAug.MACHINE_EFFICIENCY_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_MACHINE_SPEED] = { value: -0.12, increment: 0.0 };
            map[$COFH_Tags.TAG_AUGMENT_MACHINE_ENERGY] = { value: 0.9, increment: -0.05 };
            return map;
        },
        maxIndex: 4,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "machine_output_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_MACHINE,
        augName: $TE_EnAug.MACHINE_OUTPUT_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_MACHINE_SECONDARY] = { value: 0.15, increment: 0.05 };
            map[$COFH_Tags.TAG_AUGMENT_MACHINE_ENERGY] = { value: 1.30, increment: 0.0 };
            return map;
        },
        maxIndex: 3,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "machine_catalyst_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_MACHINE,
        augName: $TE_EnAug.MACHINE_CATALYST_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_MACHINE_CATALYST] = { value: 0.80, increment: -0.02 };
            map[$COFH_Tags.TAG_AUGMENT_MACHINE_ENERGY] = { value: 1.25, increment: 0.0 };
            return map;
        },
        maxIndex: 3,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "dynamo_output_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_DYNAMO,
        augName: $TE_EnAug.DYNAMO_OUTPUT_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_DYNAMO_ENERGY] = { value: 0.9, increment: 0.0 };
            map[$COFH_Tags.TAG_AUGMENT_DYNAMO_POWER] = { value: 1.0, increment: 0.05 };
            return map;
        },
        maxIndex: 4,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "potion_amplifier_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_POTION,
        augName: $TE_EnAug.POTION_AMPLIFIER_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_POTION_AMPLIFIER] = { value: 1.0, increment: 0.25 };
            map[$COFH_Tags.TAG_AUGMENT_POTION_DURATION] = { value: -0.25, increment: 0.0 };
            return map;
        },
        maxIndex: 5,
        localFix: {},
        recipes: {},
        models: []
    },
    {
        old: "potion_duration_augment_%i",
        type: $COFH_Tags.TAG_AUGMENT_TYPE_POTION,
        augName: $TE_EnAug.POTION_DURATION_AUGMENT.name(),
        mods: () => {
            const map = {};
            map[$COFH_Tags.TAG_AUGMENT_POTION_DURATION] = { value: 1.0, increment: 0.1 };
            return map;
        },
        maxIndex: 5,
        localFix: {},
        recipes: {},
        models: []
    }
]

//---[CODE]---------------------------------------------------------------------------------------------------------------------------------------

// Item Registry
StartupEvents.registry("item", event => {
	global.teFixer.forEach(entry => {
        let i = 1;

        const values = Utils.newList();
        values.addAll($TE_ExAugType.VALUES);
        values.add(values.get(4));

        values.toArray().forEach(aug => {
            if (i > entry.maxIndex)
                return;

            const builder = $TE_ExAug.builder($TE_Items.ITEMS).type(entry.type).rarity(aug.getRarity());
            const newId = "thermal_extra:" + aug.name().toLowerCase($Locale.ROOT) + "_" + entry.augName.toLowerCase($Locale.ROOT);
            const id = entry.old.replace("%i", i.toString());
            const mods = entry.mods();

            Object.keys(mods).forEach(attr => {
                const info = mods[attr];
                builder.mod(attr, info.value + (info.increment * aug.getTier()));
            });

            
            builder.build(id);
            entry.models.push(["item/" + id, "item/" + aug.name().toLowerCase($Locale.ROOT) + "_" + entry.augName.toLowerCase($Locale.ROOT)]);
            entry.localFix[id] = ["item." + newId.replace(":", "."), aug.getRarity()];
            entry.recipes[id] = newId;

            i++;
        });
    });

    event.create("jaopca:dusts.zinc")
        .maxStackSize(64)
        .tooltip(Text.of("§aTo turn this into the new item just put in a crafting table"))
        .displayName("Zinc Dust (Legacy)")
        .modelJson({ parent: "thermal_extra:item/zinc_dust" });

    event.create("pa2_extras:gem_leggings", "leggings")
        .displayName("Gem Leggings")
        .tooltip(Text.of("§fNo Gravity"))
        .unstackable()
        .tier("fake_gem_armor")
        .modelJson({ parent: "projecte:item/gem_leggings" }); 
});

ItemEvents.armorTierRegistry(event => {
    event.add("fake_gem_armor", tier => {
        tier.durabilityMultiplier = 0;
        tier.slotProtections = [3, 6, 8, 3];
        tier.enchantmentValue = 0;
        tier.equipSound = "minecraft:item.armor.equip_diamond";
        tier.repairIngredient = "minecraft:air";
        tier.toughness = 2.0
        tier.knockbackResistance = 0.25
    });
})