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
        event.add('kubejs:archimeat', ["§eJust Getting Started", "§bBlobs Eat MEAT ;D"])
        event.add('biggerreactors:cyanite_ingot', ["§dProcessed in a Cyanite Reprocessor"])
        event.add('biggerreactors:blutonium_ingot', ["§dProcessed from Cyanite in a Cyanite Reprocessor"])
        event.add('kubejs:archiveau', ["§dCheck Uses In JEI"])
        event.add('kubejs:architron', ["§dCheck Uses In JEI"])
        event.add('kubejs:archilution', ["§dCheck Uses In JEI"])
        event.add('create:chromatic_compound', ["§bUsed to make Shadow Steel & Refined Radiance"])
        event.add('create:shadow_steel', ["§bDrop Chromatic Compound into the VOID"])
        event.add('create:refined_radiance', ["§bDrop Chromatic Compound into a Beacon Beam"])
    })