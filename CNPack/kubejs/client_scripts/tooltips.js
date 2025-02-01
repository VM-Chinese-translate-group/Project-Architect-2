ItemEvents.tooltip(event => {
    // Add tooltip to all of these items
    //event.add(['quark:backpack', 'quark:magnet', 'quark:crate'], 'Added by Quark Oddities')
    // You can also use any ingredient except #tag (due to tags loading much later than client scripts)
    //event.add(/refinedstorage:red_/, 'Can be any color')
    // Multiple lines with an array []. You can also escape ' by using other type of quotation marks
    // Use some data from the client to decorate this tooltip. name returns a component so we just append that.
    //event.add('minecraft:skeleton_skull', Text.of('This used to be ').append(Client.player.name).append("'s head"))
    //event.addAdvanced('thermal:latex_bucket', (item, advanced, text) => {
      //text.add(0, Text.of('Hello')) // Adds text in first line, pushing the items name down a line. If you want the line below the item name, the index must be 1
        event.add('kubejs:archimeat', [Component.translate('tooltip.kubejs.archimeat.1'), Component.translate('tooltip.kubejs.archimeat.2')])
        event.add('biggerreactors:cyanite_ingot', [Component.translate('tooltip.kubejs.cyanite_ingot.1')])
        event.add('biggerreactors:blutonium_ingot', [Component.translate('tooltip.kubejs.blutonium_ingot.1')])
        event.add('kubejs:archiveau', [Component.translate('tooltip.kubejs.archiveau.1')])
        event.add('kubejs:architron', [Component.translate('tooltip.kubejs.archiveau.1')])
        event.add('kubejs:archilution', [Component.translate('tooltip.kubejs.archiveau.1')])
        event.add('create:chromatic_compound', [Component.translate('tooltip.create.chromatic_compound.1')])
        event.add('create:shadow_steel', [Component.translate('tooltip.create.shadow.steel.1')])
        event.add('create:refined_radiance', [Component.translate('tooltip.create.refined_radiance.1')])
    })