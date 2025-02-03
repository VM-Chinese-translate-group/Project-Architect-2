Platform.mods.kubejs.name = 'Chosen';
Platform.mods.jaopca.name = 'Mekanism';
/*event.create('warden_head', 'cardinal')
        .displayName('Warden Head')
        .soundType('sculk')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .tagBlock('mineable/pickaxe')
        .texture('particle', 'kubejs:blocks/warden_head')
        .model('kubejs:block/warden_head')
        .box(0, 0, 3, 16, 16, 13, true)
        .fullBlock(false)
        .defaultTranslucent();
    */

StartupEvents.registry('block', event => {
	
	event.create('blaze_block')
		.displayName('烈焰块')
		.soundType('shroomlight')
		.hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
		.tagBlock('mineable/pickaxe')
    
    event.create('archimeat')
        .displayName('§4§lArchimeat')
        .soundType('slime_block')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .defaultTranslucent()
        .tagBlock('mineable/pickaxe')
        .property(BlockProperties.FACING)
        .placementState(event => event.set(BlockProperties.FACING, event.clickedFace));

    event.create('archiveau')
        .displayName('§d§lArchiveau')
        .soundType('shroomlight')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.5)
        .defaultTranslucent()
        .tagBlock('mineable/pickaxe');
    
    event.create('architron')
        .displayName('§c§lArchitron')
        .soundType('shroomlight')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.6)
        .defaultTranslucent()
        .tagBlock('mineable/pickaxe');

    event.create('archimorph')
        .displayName('§6§lArchimorph')
        .soundType('shroomlight')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.7)
        .defaultTranslucent()
        .tagBlock('mineable/pickaxe');
    
    createArchilution(event);
    createArchium(event);
})

function createArchilution(event) {
    event.create('archilution')
        .displayName('§b§lArchilution')
        .soundType('bamboo_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.85)
        .defaultTranslucent()
        .box(3, 0, 3, 13, 10, 13)
        .tagBlock('mineable/pickaxe')
        .property(BlockProperties.FACING)
		.placementState(event => event.set(BlockProperties.FACING, event.clickedFace))
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archilution/archilution' })
		});;

    event.create('archilution_d')
        .displayName('§b§lArchilution')
        .soundType('bamboo_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.85)
        .defaultTranslucent()
        .box(3, 6, 3, 13, 16, 13)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archilution/archilution' })
		});;

    event.create('archilution_n')
        .displayName('§b§lArchilution')
        .soundType('bamboo_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.85)
        .defaultTranslucent()
        .box(3, 3, 6, 13, 13, 16)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archilution/archilution' })
		});;

    event.create('archilution_s')
        .displayName('§b§lArchilution')
        .soundType('bamboo_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.85)
        .defaultTranslucent()
        .box(3, 3, 0, 13, 13, 10)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archilution/archilution' })
		});;

    event.create('archilution_e')
        .displayName('§b§lArchilution')
        .soundType('bamboo_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.85)
        .defaultTranslucent()
        .box(0, 3, 3, 10, 13, 13)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archilution/archilution' })
		});;

    event.create('archilution_w')
        .displayName('§b§lArchilution')
        .soundType('bamboo_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.85)
        .defaultTranslucent()
        .box(6, 3, 3, 16, 13, 13)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archilution/archilution' })
		});;
}

function createArchium(event) {
    event.create('archium')
        .displayName('§5§lArchium')
        .soundType('nether_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.95)
        .defaultTranslucent()
        .box(1, 0, 1, 15, 14, 15)
        .tagBlock('mineable/pickaxe')
        .property(BlockProperties.FACING)
		.placementState(event => event.set(BlockProperties.FACING, event.clickedFace))
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archium/archium' })
		});;

        event.create('archium_d')
        .displayName('§5§lArchium')
        .soundType('nether_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.95)
        .defaultTranslucent()
        .box(1, 3, 1, 15, 16, 15)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archium/archium' })
		});;

        event.create('archium_n')
        .displayName('§5§lArchium')
        .soundType('nether_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.95)
        .defaultTranslucent()
        .box(1, 1, 2, 15, 15, 16)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archium/archium' })
		});;

        event.create('archium_s')
        .displayName('§5§lArchium')
        .soundType('nether_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.95)
        .defaultTranslucent()
        .box(1, 1, 0, 15, 15, 14)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archium/archium' })
		});;

        event.create('archium_e')
        .displayName('§5§lArchium')
        .soundType('nether_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.95)
        .defaultTranslucent()
        .box(0, 1, 1, 14, 15, 15)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archium/archium' })
		});;

        event.create('archium_w')
        .displayName('§5§lArchium')
        .soundType('nether_wood_hanging_sign')
        .hardness(1.0)
        .resistance(-1)
        .requiresTool(false)
        .tagBlock('mineable/axe')
        .lightLevel(0.95)
        .defaultTranslucent()
        .box(2, 1, 1, 16, 15, 15)
        .tagBlock('mineable/pickaxe')
        .item((item) => {
			item.modelJson( { parent: 'kubejs:block/archium/archium' })
		});;
}
