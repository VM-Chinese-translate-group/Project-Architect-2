const warnings = [
    '§dWhat\'s you doing?',
    '§dNo! No! No!',
    '§dPlease stop.',
    '§dWhat did I do to you?',
    "§dI knew I should have stayed in the pen!",
    "§dEnjoy your pork chops!",
    "§dIs this the end of the swine?",
    "§dOink, oink, ouch! That hurts!",
    "§cLegends never die!",
    "§dCurse you and my deliciousness!",
    "§dThis is a boar-ing way to go...",
    "§dYou butcher!",
    "§dI was just hoofin' around and you do this?",
    "§dYou can’t eat me; I’m too cute!",
    "§dI have dreams too!",
    "§dYou’ll regret this when I’m in your stomach!",
    "§dWhatever they’re paying you, I’ll double it!",
    "§dYou could’ve just asked for a hug instead!",
    "§dSeriously? I thought we were cool, man!",
    "§dWhoa, buddy! Can’t we talk about this over a carrot?",
    "§dDo I look like a pork chop to you?",
    "§dTell my family I love them!",
    "§dI’m too young to be bacon!",
    "§dIs this really necessary?",
    "§dRemember me... in your next sandwich.",
    "§dWhat did I ever do to you?",   
    "§dI just wanted to be your pet!",
    "§dYou’ll never find another pig like me!",
    "§dI had plans for tomorrow...",
    "§dCan we at least talk this out?",
    "§d I have the power of God and Anime by my side!",
    "§dTake good care of my baby!",
    "§dI guess this is the end of my tail...",
    "§dI thought we were pals!",
    "§dI forgive you... I guess.",
    "§dPlease... think of the piglets!",
    "§dOink! I didn’t sign up for this!"
];

const $FakePlayer = Java.tryLoadClass('net.minecraftforge.common.util.FakePlayer');

EntityEvents.hurt( event => {
    if(event.entity.type == 'minecraft:pig' && checkForPlayer(event.source.player))
    {
        event.source.player.tell(warnings[getRandom(0, warnings.length - 1)]);
    }
});

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkForPlayer(player) {
    if($FakePlayer == null) {
        return player != null;
    }

    return player != null && !(player instanceof $FakePlayer);
}